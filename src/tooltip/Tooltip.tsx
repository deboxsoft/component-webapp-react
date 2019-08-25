import React from 'react';
import styled from 'styled-components/macro';
import { defaultTheme, TooltipStyled, TooltipStyledProps } from './styles';

interface TooltipProps extends TooltipStyledProps {
  children: React.ReactNode;
  /**
   * Title
   */
  title?: string;

  /**
   * Position - default is `bottom`
   */
  position: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Animation effect - default is `fade`
   */
  effect: 'fade' | 'expand';
}

type DefaultProps = TooltipStyledProps & Pick<TooltipProps, 'effect'>;

/**
 * Description
 *
 * @example ./../../docs/components/Tooltip.md
 */
export const Tooltip = ({
  className,
  children,
  title,
  effect,
  ...attribs
}: TooltipProps) => {
  return (
    <TooltipStyled className={`${effect} ${className}`} data-title={title} {...attribs}>
      {children}
    </TooltipStyled>
  );
};

Tooltip.defaultProps = {
  width: undefined,
  effect: 'fade',
  position: 'bottom',
  theme: defaultTheme
};
