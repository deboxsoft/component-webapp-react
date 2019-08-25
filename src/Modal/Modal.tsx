import React, { useState, useRef, useContext, useEffect, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { Context } from './ModalProvider';
import { StyledThemeProps } from '../types';
import { ModalTheme } from '../theme';
import { ModalStyled } from './styles';

interface ModalStyledProps extends StyledThemeProps {
  children: React.ReactNode;
  isOpen?: false;
  WrapperComponent?: React.ElementType;
  backgroundProps?: object;
  onBackgroundClick?: (event: React.SyntheticEvent) => void;
  onEscapeKeydown?: (event: KeyboardEvent) => void;
  onKeydown?: (event: KeyboardEvent) => void;
  allowScroll?: boolean;
  afterOpen?: (target?: HTMLElement | null) => void;
  beforeOpen?: (target?: HTMLElement | null) => void;
  afterClose?: (target?: HTMLElement | null) => void;
  beforeClose?: (target?: HTMLElement | null) => void;
  isEscapedClose?: boolean;
}

interface State {
  show: boolean;
}

export const Modal = forwardRef(
  (
    {
      children,
      WrapperComponent = ModalStyled,
      isOpen: _isOpen = false,
      backgroundProps = {},
      onBackgroundClick,
      onEscapeKeydown,
      onKeydown,
      allowScroll,
      afterOpen,
      beforeOpen,
      afterClose,
      beforeClose,
      isEscapedClose,
      ...props
    }: ModalStyledProps,
    ref
  ) => {
    const { BackgroundComponent, modalNode } = useContext(Context);
    const node = useRef<HTMLElement>(null);
    const [isOpen, setOpen] = useState<boolean>(_isOpen);

    const handleOnKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escaped') {
        // eslint-disable-next-line no-use-before-define
        if (isEscapedClose) hide();
        if (onEscapeKeydown) onEscapeKeydown(event);
      }
      if (onKeydown) onKeydown(event);
    };

    const cleanUp = () => {
      document.removeEventListener('keydown', handleOnKeydown);
    };

    const overflow = useRef<string | null>('');

    useEffect(() => {
      if (isOpen) {
        if (allowScroll && overflow) {
          overflow.current = document.body.style.overflow;
          document.body.style.overflow = 'scroll';
        }
        if (afterOpen) afterOpen(node.current);
      } else {
        if (allowScroll) {
          document.body.style.overflow = overflow.current;
        }
        afterClose && afterClose(node.current);
      }

      return cleanUp;
    });

    const open = () => {
      setOpen(_prevOpen => {
        if (!_prevOpen && beforeOpen) {
          beforeOpen(node.current);
        }
        return true;
      });
    };

    const hide = () => {
      setOpen(_prevOpen => {
        if (_prevOpen && beforeClose) {
          beforeClose(node.current);
        }
        return false;
      });
    };

    useImperativeHandle(ref, () => ({
      open,
      hide
    }));

    const handleBackgroundClick = (event: React.SyntheticEvent) => {
      if (event.target === node.current) {
        if (onBackgroundClick) onBackgroundClick(event);
        hide();
      }
    };

    const renderContent = () => <WrapperComponent {...props}>{children}</WrapperComponent>;

    if (modalNode && BackgroundComponent && isOpen) {
      return createPortal(
        <BackgroundComponent onClick={handleBackgroundClick} ref={node} {...backgroundProps}>
          {renderContent()}
        </BackgroundComponent>,
        modalNode
      );
    }
    return null;
  }
);
