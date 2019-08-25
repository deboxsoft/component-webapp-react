import React, { useEffect, useState, useRef } from 'react';
import { StyledThemeTypeProps } from '../types';
import { Animate } from '../animate';
import { StyledDropdown, slideDown, slideUp } from './styles';

interface DropdownProps {
  children?: React.ReactNode;
  open?: boolean;
  /**
   * Dropdown component to be toggled eg. List
   */
  component?: React.ReactElement;

  /**
   * Open dropdown dropdown callback function
   */
  openDropdown?: Function;

  /**
   * Close dropdown dropdown callback function
   */
  closeDropdown?: Function;

  /**
   * Toggle dropdown callback function
   */
  toggleDropdown?: Function;
}

/**
 * Simple Dropdown component
 *
 * @example ./../../docs/components/Dropdown.md
 */
export const Dropdown = ({
  openDropdown,
  component,
  closeDropdown,
  toggleDropdown,
  open,
  children,
  ...props
}: DropdownProps) => {
  const dropdown = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [isOpened, setOpened] = useState(open);

  const handleCloseDropdown = () => {
    setOpened(false);
    if (typeof closeDropdown === 'function') closeDropdown();
  };

  const handleOpenDropdown = () => {
    setOpened(true);
    if (typeof openDropdown === 'function') {
      openDropdown();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const outsideDropdown = dropdown.current && !dropdown.current.contains(event.target as Node);
    const outsideWrapper = wrapper.current && !wrapper.current.contains(event.target as Node);

    if (outsideDropdown && outsideWrapper) {
      handleCloseDropdown();
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  });

  const handleToggleDropdown = () => {
    if (isOpened) handleCloseDropdown();
    else handleOpenDropdown();
    if (typeof toggleDropdown === 'function') {
      toggleDropdown(isOpened);
    }
  };

  const renderDropDown = () => {
    return (
      <Animate
        component={component}
        keyframe={isOpened ? slideDown : slideUp}
        animation={{
          duration: '300ms',
          iterationCount: 1,
          timingFunction: 'linear',
          fillMode: 'forwards'
        }}
      />
    );
  };

  return (
    <StyledDropdown ref={wrapper} {...props}>
      <div onClick={() => {}} onKeyDown={handleToggleDropdown} role="button" tabIndex={0}>
        {children}
      </div>
      <div className="dropdown" ref={dropdown}>
        {renderDropDown()}
      </div>
    </StyledDropdown>
  );
};
