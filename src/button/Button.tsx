import React from 'react';
import styled, { css } from 'styled-components/macro';
import * as keyframes from '../keyframes';
import { OnClickedProps, StyledProps, FunctionComponentWithDefault } from '../types';
import { classNames, Devices, screenMaxWidth } from '../utils';
import { ButtonTheme, ThemeAllType } from '../theme';

interface StyleButtonProps extends StyledProps<ButtonTheme, ThemeAllType> {
  active?: boolean;
  outline?: boolean;
  disabled?: boolean;
  pill?: boolean;
  sm?: boolean;
  noRadius?: boolean;
  split?: boolean;
  lg?: boolean;
  block?: boolean;
  toggleCollapse?: boolean;
  badge?: { color?: string; value?: string | number };
  expandScreen?: Devices;
}

export interface ButtonProps extends StyleButtonProps, OnClickedProps {
  className?: string;
  type: 'reset' | 'button' | 'submit';
  dropdownToggle?: boolean;
  clicked?: boolean;
  disabled?: boolean;
}

const display = ({ block, theme }: StyleButtonProps) => {
  if (block) {
    return css`
      display: block;
      width: 100%;
      & + & {
        margin-top: ${theme.button.margin.blockTop};
      }
    `;
  }

  return css`
    display: inline-block;
  `;
};

const boxShadow = ({ themeType, theme }: StyleButtonProps) => {
  const colors = theme.button.colors[themeType];
  return css`
    box-shadow: 0 0 0 0.2rem ${colors && colors.boxShadow};
  `;
};

const padding = ({ split, sm, lg, theme }: StyleButtonProps) => {
  const paddingTheme = theme.button.padding;
  if (split && paddingTheme.split) {
    if (sm && paddingTheme.split.sm) {
      return css`
        padding: 0;
        padding-right: ${paddingTheme.split.sm.right};
        padding-left: ${paddingTheme.split.sm.left};
        &::after {
          margin-left: 0;
        }
      `;
    } else if (lg && paddingTheme.split.lg) {
      return css`
        padding: 0;
        padding-right: ${paddingTheme.split.lg.right};
        padding-left: ${paddingTheme.split.lg.left};
        &::after {
          margin-left: 0;
        }
      `;
    } else if (paddingTheme.split.default) {
      // @ts-ignore
      return css`
        padding: 0;
        padding-right: ${paddingTheme.split.default.right};
        padding-left: ${paddingTheme.split.default.left};
        &::after {
          margin-left: 0;
        }
      `;
    }
  } else if (lg) {
    return css`
      padding: ${paddingTheme.lg};
    `;
  } else if (sm) {
    return css`
      padding: ${paddingTheme.sm};
    `;
  }

  return css`
    padding: ${paddingTheme.default};
  `;
};

const blockDisplay = ({ block, theme }: StyleButtonProps) => {
  if (block) {
    return css`
      display: block;
      width: 100%;
      & + & {
        margin-top: ${theme.button.margin.blockTop};
      }
    `;
  }

  return css`
    display: inline-block;
  `;
};

const cursor = ({ disabled }: StyleButtonProps) =>
  !disabled &&
  css`
    cursor: pointer;
  `;

const color = ({ themeType, outline, theme, disabled }: StyleButtonProps) => {
  const colors = theme.button.colors[themeType];
  if (outline) {
    if (disabled) {
      return css`
        color: ${colors && colors.colorOutline};
      `;
    }
    return css`
      color: ${colors && colors.colorOutline};
      &:hover {
        color: ${colors && colors.colorOutlineHover};
      }
    `;
  }
  return css`
    color: ${colors && colors.color};
  `;
};

const fontSize = ({ sm, lg, theme }: StyleButtonProps) => {
  if (lg) {
    return css`
      font-size: ${theme.button.font.size.lg};
    `;
  } else if (sm) {
    return css`
      font-size: ${theme.button.font.size.sm};
    `;
  }

  return css`
    font-size: ${theme.button.font.size.default};
  `;
};

const border = ({ active, disabled, outline, theme, themeType }: StyleButtonProps) => {
  const colors = theme.button.colors[themeType];
  if (active) {
    return css`
      border: ${theme.button.border.default} ${colors && colors.borderColorActive};
    `;
  } else if (disabled) {
    return css`
      border: ${theme.button.border.default} ${colors && colors.borderColorDisabled};
    `;
  }

  return css`
    border: 1px solid ${colors && colors.borderColor};
    ${!outline &&
      css`
        &:focus,
        &:hover {
          border: 1px solid ${colors && colors.borderColorHoverFocus};
        }
      `}
  `;
};

const borderRadius = ({ pill, noRadius, theme, sm, lg }: StyleButtonProps) => {
  if (pill) {
    return css`
      border-radius: ${theme.button.borderRadius.pill};
    `;
  } else if (noRadius) {
    return css`
      border-radius: ${theme.button.borderRadius.noRadius};
    `;
  } else if (sm) {
    return css`
      border-radius: ${theme.button.borderRadius.sm};
    `;
  } else if (lg) {
    return css`
      border-radius: ${theme.button.borderRadius.lg};
    `;
  }

  return css`
    border-radius: ${theme.button.borderRadius.default};
  `;
};

const buttonToggleCollapse = ({ expandScreen = 'tablet', toggleCollapse, theme }: StyleButtonProps) => {
  if (toggleCollapse) {
    const { toggle } = theme.button.font;
    return css`
      display: none;
      ${screenMaxWidth[expandScreen]`
        display: block;
        font-size: ${toggle && toggle.size}
      `}
    `;
  }
  return '';
};

const backgroundColor = ({ themeType, active, outline, disabled, theme }: StyleButtonProps) => {
  const colors = theme.button.colors[themeType];
  if (active) {
    return css`
      background-image: none;
      background-color: ${colors && colors.backgroundColorActive};
    `;
  } else if (outline) {
    return css`
      background-image: none;
      background-color: transparent;
      &:focus,
      &:hover {
        background-color: ${disabled ? 'transparent' : colors && colors.backgroundColor};
      }
    `;
  } else if (disabled) {
    return css`
      background-image: none;
      background-color: ${colors && colors.backgroundColorDisabled};
    `;
  }

  return css`
    background-color: ${colors && colors.backgroundColor};
    &:focus,
    &:hover {
      background-color: ${colors && colors.backgroundColorHoverFocus};
    }
  `;
};

export const buttonStyled = (props: StyleButtonProps) => css`
  position: relative;
  font-weight: 400;
  line-height: 1.5;
  appearance: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  &:focus {
    outline: 0;
    ${boxShadow(props)}
  }
    &:hover,
  &:focus {
    text-decoration: none;
    ${border(props)}
    ${backgroundColor(props)}
    ${color(props)}
    ${cursor(props)}
  };
  ${border(props)}
  ${backgroundColor(props)}
  ${borderRadius(props)}
  ${display(props)}
  ${buttonToggleCollapse(props)}
  ${fontSize(props)}
  ${color(props)}
  ${padding(props)}

  &.disabled {
    opacity: 0.65;
  }

  &.clicked:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border-radius: inherit;
    border: 0 solid ${_props => _props.theme.primaryColor};
    opacity: 0.4;
    animation: ${keyframes.buttonEffect} 0.4s;
    display: block;
  }

  &.dropdown-toggle {
    &::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: ${({ theme }) => theme.button.margin.dropdownToggleLeft};
      vertical-align: 0.255em;
      content: '';
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
    &:empty::after {
      margin-left: 0;
    }
    &::after {
      margin-left: 0.255em;
    }
  }

  &.loading {
    color: transparent !important;
    pointer-events: none;
  }

  &.loading::after {
    animation: ${keyframes.loading} 500ms infinite linear;
    border: 2px solid ${_props => _props.theme.primaryColorDark};
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
    content: '';
    display: block;
    height: 14px;
    left: 50%;
    margin-left: -9px;
    margin-top: -9px;
    position: absolute;
    top: 50%;
    width: 14px;
    z-index: 1;
  }
`;

const ButtonStyled = styled.button<StyleButtonProps>`
  ${buttonStyled}
`;

export const Button: FunctionComponentWithDefault<ButtonProps> = ({
  disabled,
  dropdownToggle,
  className,
  clicked,
  type,
  ...attribs
}: ButtonProps) => {
  return (
    <ButtonStyled
      className={classNames(className, {
        disabled,
        'dropdown-toggle': dropdownToggle,
        clicked
      })}
      type={type}
      {...attribs}
    />
  );
};

Button.defaultProps = {
  type: 'button',
  themeType: 'default',
  theme: {
    button: {
      font: {
        size: {}
      },
      borderRadius: {},
      colors: {},
      margin: {},
      padding: {},
      border: {}
    }
  }
};
