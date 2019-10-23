import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormControlTheme, formControlTheme } from './types';
import { classNames, screenMinWidth, layoutUtils } from '../utils';
import { Size } from '../utils/types';

interface FormControlStyledProps extends StyledThemeProps<FormControlTheme> {
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

interface FormControlProps
  extends Partial<FormControlStyledProps>,
    React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const backgroundColorCss = ({ theme, disabled, readonly }: FormControlStyledProps) => {
  if (disabled || readonly) {
    return css`
      background-color: ${theme.colors.backgroundDisabledReadonlyColor};
      &:focus {
        background-color: ${theme.colors.backgroundDisabledReadonlyColor};
      }
    `;
  }
  return css`
    background-color: ${theme.colors.backgroundColor};
    &:focus {
      background-color: ${theme.colors.backgroundColor};
    }
  `;
};

const borderCss = ({ theme, status, sizeForm = 'default' }: FormControlStyledProps) => {
  if (status === 'valid') {
    return css`
      border-color: ${theme.colors.borderValidColor};
      &:focus {
        border-color: ${theme.colors.borderValidColor};
      }
    `;
  } else if (status === 'invalid') {
    return css`
      border-color: ${theme.colors.borderInvalidColor};
      &:focus {
        border-color: ${theme.colors.borderInvalidColor};
      }
    `;
  }
  return css`
    border: ${theme.border} ${theme.colors.borderColor};
    &:focus {
      border-color: ${theme.colors.borderFocusColor};
    }
  `;
};

const boxShadowCss = ({ status, theme }: FormControlStyledProps) => {
  if (status === 'valid') {
    return css`
      &:focus {
        box-shadow: ${theme.boxShadow} ${theme.colors.boxShadowValidColor};
      }
    `;
  } else if (status === 'invalid') {
    return css`
      &:focus {
        box-shadow: ${theme.boxShadow} ${theme.colors.boxShadowInvalidColor};
      }
    `;
  }
  return css`
    &:focus {
      box-shadow: ${theme.boxShadow};
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

const FormControlStyled = styled.input<FormControlStyledProps>`
  background-clip: padding-box;
  border-radius: ${({ theme, noRadius, sizeForm }) => {
    return !noRadius ? theme.borderRadius[sizeForm] : '0';
  }};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.color};
  display: block;
  font-size: ${({ theme, sizeForm }) => {
    const fontSize = theme.font.size || {};
    return fontSize[sizeForm];
  }};
  height: ${({ theme, select, multiple, sizeForm }) =>
    select && !multiple ? theme.height.select[sizeForm] : theme.height.default};
  line-height: 1.5;
  padding: ${({ theme, sizeForm }) => {
    const padding = theme.padding[sizeForm];
    return padding && layoutUtils.positioning(padding);
  }};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;
  &::-ms-expand {
    background-color: transparent;
    border: 0;
  }
  &:focus {
    color: ${({ theme }) => theme.colors.color};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.boxShadowFocus};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderColor};
    opacity: 1;
  }
  
  ${backgroundColorCss}
  ${borderCss}
  ${boxShadowCss}
  ${opacityCss}
  ${formInlineCss}
`;

FormControlStyled.defaultProps = {
  sizeForm: 'default'
};

export const FormControl = ({ children, theme: themeProps, ...attribs }: FormControlProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formControl || formControlTheme;
  return (
    <FormControlStyled theme={theme} {...attribs}>
      {children}
    </FormControlStyled>
  );
};
