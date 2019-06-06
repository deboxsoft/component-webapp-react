import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { classNames, screenMinWidth } from '../utils';
import { Size } from '../utils/types';

interface FormControlStyledProps extends StyledThemeProps<FormTheme> {
  status: 'valid' | 'invalid' | undefined | false;
  disabled: boolean;
  readonly: boolean;
  inline: boolean;
  multiple: boolean;
  select: boolean;
  textarea: boolean;
  sizeForm: keyof Size;
  noRadius: boolean;
}

type DefaultProps = FormControlStyledProps;

interface FormControlProps extends FormControlStyledProps {
  children: React.ReactNode;
}

const backgroundColorCss = ({ theme, disabled, readonly }: FormControlStyledProps) => {
  if (disabled || readonly) {
    return css`
      background-color: ${theme.formControl.colors.backgroundDisabledReadonlyColor};
      &:focus {
        background-color: ${theme.formControl.colors.backgroundDisabledReadonlyColor};
      }
    `;
  }
  return css`
    background-color: ${theme.formControl.colors.backgroundColor};
    &:focus {
      background-color: ${theme.formControl.colors.backgroundColor};
    }
  `;
};

const borderCss = ({ theme, status, sizeForm = 'default' }: FormControlStyledProps) => {
  if (status === 'valid') {
    return css`
      border-color: ${theme.formControl.colors.borderValidColor};
      &:focus {
        border-color: ${theme.formControl.colors.borderValidColor};
      }
    `;
  } else if (status === 'invalid') {
    return css`
      border-color: ${theme.formControl.colors.borderInvalidColor};
      &:focus {
        border-color: ${theme.formControl.colors.borderInvalidColor};
      }
    `;
  }
  return css`
    border: ${theme.formControl.border[sizeForm]} ${theme.formControl.colors.borderColor};
    &:focus {
      border-color: ${theme.formControl.colors.borderFocusColor};
    }
  `;
};

const boxShadowCss = ({ status, theme }: FormControlStyledProps) => {
  if (status === 'valid') {
    return css`
      &:focus {
        box-shadow: ${theme.formControl.boxShadow} ${theme.formControl.colors.formControlBoxShadowValidColor};
      }
    `;
  } else if (status === 'invalid') {
    return css`
      &:focus {
        box-shadow: ${theme.formControl.boxShadow}
          ${theme.formControl.colors.formControlBoxShadowInvalidColor};
      }
    `;
  }
  return css`
    &:focus {
      box-shadow: ${theme.formControl.boxShadow};
    }
  `;
};

const opacityCss = ({ disabled, readonly }: FormControlStyledProps) => {
  if (disabled || readonly) {
    return css`
      opacity: 1;
      &:focus {
        opacity: 1;
      }
    `;
  }
  return '';
};

const formInlineCss = ({ inline }: FormControlStyledProps) =>
  inline &&
  screenMinWidth.phone`
      display: inline-block;
      width: auto;
      vertical-align: middle;
`;

export const FormControl = styled.input<FormControlStyledProps>`
  background-clip: padding-box;
  border-radius: ${({ theme, noRadius, sizeForm }) => {
    return !noRadius ? theme.formControl.borderRadius[sizeForm] : '0';
  }};
  box-sizing: border-box;
  color: ${({ theme }) => theme.formControl.colors.color};
  display: block;
  font-size: ${({ theme, sizeForm }) => {
    const fontSize = theme.formControl.font.size || {};
    return fontSize[sizeForm];
  }};
  height: ${({ theme, select, multiple, sizeForm }) =>
    select && !multiple && theme.formControl.height[sizeForm]};
  line-height: 1.5;
  padding: ${({ theme, sizeForm }) => {
    const padding = theme.formControl.padding.default;
    return padding && `${padding.top || 0} ${padding.right || 0} ${padding.bottom || 0} ${padding.left || 0}`;
  }};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
  &::-ms-expand {
    background-color: transparent;
    border: 0;
  }
  &:focus {
    color: ${({ theme }) => theme.formControl.colors.color};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.formControl.colors.boxShadowFocus};
  }
  &::placeholder {
    color: ${({ theme }) => theme.formControl.colors.placeholderColor};
    opacity: 1;
  }
  
  ${backgroundColorCss}
  ${borderCss}
  ${boxShadowCss}
  ${opacityCss}
  ${formInlineCss}
`;

FormControl.defaultProps = {
  theme: defaultTheme,
  sizeForm: 'default'
};
