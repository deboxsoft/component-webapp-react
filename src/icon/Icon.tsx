import React from 'react';
import styled, { css } from 'styled-components/macro';
import { OnClickedProps, StyledThemeProps } from '../types';
import { IconSize } from './types';
import { IconTheme } from '../theme';

interface IconStyledProps extends StyledThemeProps<IconTheme> {
  size: keyof IconSize;
  color?: string;
  className?: string;
}

interface IconProps extends IconStyledProps, OnClickedProps {
  /**
   * The name of the icon - refer font awesome for list of supported icons
   */
  name: string;
}

type DefaultProps = IconStyledProps;

const IconStyled = styled.i.attrs(({ color }) => ({
  style: color && {
    color
  }
}))<IconStyledProps>`
  position: relative;
  cursor: pointer;
  text-align: center;

  ${props => {
    const { theme, size } = props;
    return (
      size &&
      css`
        height: ${theme.icon.height && theme.icon.height[size]};
        width: ${theme.icon.width && theme.icon.width[size]};
        font-size: ${theme.icon.fontSize && theme.icon.fontSize[size]};
      `
    );
  }} ${props =>
    props.color &&
    css`
      color: ${props.color};
    `};
`;

/**
 * This component will render font awesome icons only, include font awesome in your project.
 *
 * @example ./../../docs/components/Icon.md
 */
export const Icon = ({ name, className, theme: themeProps, ...props }: IconProps) => {
  return <IconStyled {...props} className={`fa fa-${name} ${className || ''}`} aria-hidden="true" />;
};

Icon.defaultProps = {
  size: 'default',
  theme: { icon: {} }
};
