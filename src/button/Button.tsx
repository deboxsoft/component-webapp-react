import React from 'react';
import styled, { css } from 'styled-components/macro';
import * as keyframes from '../keyframes';
import { FunctionComponentWithDefault, OnClickedProps, StyledThemeTypeProps } from '../types';
import { classNames, Devices, screenMaxWidth, layoutUtils } from '../utils';
import { ThemeAllType, Size } from '../utils/types';
import { ButtonTheme } from '../theme';

interface ButtonStyledProps extends StyledThemeTypeProps<ButtonTheme, ThemeAllType> {
  active?: boolean;
  badge?: { color?: string; value?: string | number };
  block?: boolean;
  disabled?: boolean;
  expandScreen?: Devices;
  noRadius?: boolean;
  outline?: boolean;
  pill?: boolean;
  size: keyof Size;
  split?: boolean;
  toggleCollapse?: boolean;
}

export interface ButtonProps extends Partial<ButtonStyledProps>, OnClickedProps {
  className?: string;
  type: 'reset' | 'button' | 'submit';
  dropdownToggle?: boolean;
  clicked?: boolean;
}

type DefaultProps = ButtonStyledProps;

const displayCss = ({ block, theme }: ButtonStyledProps) => {
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

const boxShadowCss = ({ themeType, theme }: ButtonStyledProps) => {
  const colors = theme.button.colors[themeType];
  return css`
    box-shadow: 0 0 0 0.2rem ${colors && colors.boxShadow};
  `;
};

const paddingCss = ({ split, size, theme }: ButtonStyledProps) => {
  const paddingTheme = theme.button.padding;
  if (split && paddingTheme.split) {
    const paddingSplit = paddingTheme.split[size];
    return css`
      padding: ${paddingSplit && layoutUtils.positioning(paddingSplit)};
      &::after {
        margin-left: 0;
      }
    `;
  }
  const padding = paddingTheme[size];
  return css`
    padding: ${padding && layoutUtils.positioning(padding)};
  `;
};

const blockDisplay = ({ block, theme }: ButtonStyledProps) => {
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

const cursor = ({ disabled }: ButtonStyledProps) =>
  !disabled &&
  css`
    cursor: pointer;
  `;

const color = ({ themeType, outline, theme, disabled }: ButtonStyledProps) => {
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

const fontSizeCss = ({ size = 'default', theme }: ButtonStyledProps) => {
  const fontSize = theme.button.font.size;
  return css`
    font-size: ${fontSize && fontSize[size]};
  `;
};

const border = ({ active, disabled, outline, theme, themeType }: ButtonStyledProps) => {
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

const borderRadiusCss = ({ pill, noRadius, theme }: ButtonStyledProps) => {
  if (pill) {
    return css`
      border-radius: ${theme.button.borderRadius.pill};
    `;
  } else if (noRadius) {
    return css`
      border-radius: 0;
    `;
  }
  return css`
    border-radius: ${theme.button.borderRadius.default};
  `;
};

const buttonToggleCollapseCss = ({ expandScreen = 'tablet', toggleCollapse, theme }: ButtonStyledProps) => {
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

const backgroundColorCss = ({ themeType, active, outline, disabled, theme }: ButtonStyledProps) => {
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

const ButtonStyled = styled.button<ButtonStyledProps>`
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
    ${props => boxShadowCss(props)}
  }
    &:hover,
  &:focus {
    text-decoration: none;
    ${props => border(props)}
    ${props => backgroundColorCss(props)}
    ${props => color(props)}
    ${props => cursor(props)}
  };
  ${props => border(props)}
  ${props => backgroundColorCss(props)}
  ${props => borderRadiusCss(props)}
  ${props => displayCss(props)}
  ${props => buttonToggleCollapseCss(props)}
  ${props => fontSizeCss(props)}
  ${props => color(props)}
  ${props => paddingCss(props)}

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
    border: 0 solid ${_props => {
      const colors = _props.theme.button.colors.default;
      return colors && colors.borderColor;
    }};
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
    border: 2px solid ${props => {
      const colors = props.theme.button.colors.default;
      return colors && colors.borderColor;
    }};
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

export const defaultProps: DefaultProps = {
  themeType: 'default',
  size: 'default',
  theme: {
    button: {
      font: {
        size: {},
        weight: {}
      },
      borderRadius: {},
      colors: {},
      margin: {},
      padding: {},
      border: {}
    },
    buttonGroup: {
      font: {
        size: {},
        weight: {}
      },
      colors: {},
      borderRadius: {},
      margin: {},
      padding: {},
      border: {}
    }
  }
};

ButtonStyled.defaultProps = defaultProps;
Button.defaultProps = {
  type: 'button'
};
