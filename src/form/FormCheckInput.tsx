import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormCheckInputTheme, formCheckInputTheme } from './types';
import { Size } from '../utils/types';

interface FormCheckInputStyledProps extends StyledThemeProps<FormCheckInputTheme> {
  disabled?: boolean;
}

interface FormCheckInputProps extends Partial<FormCheckInputStyledProps> {
  children?: React.ReactNode;
}

const FormCheckInputStyled = styled.input<FormCheckInputStyledProps>`
  position: absolute;
  margin-top: ${({ theme }) => theme.margin.top};
  margin-left: ${({ theme }) => theme.margin.left};
  box-sizing: border-box;

  ${({ disabled, theme }) => {
    const { colors } = theme;
    return (
      disabled &&
      css`
        color: ${colors && colors.colorDisabled};
        & + label {
          color: ${colors && colors.colorLabelDisabled};
        }
      `
    );
  }}
`;

export const FormCheckInput = ({ children, theme: themeProps, ...attribs }: FormCheckInputProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formCheckInput || formCheckInputTheme;
  return (
    <FormCheckInputStyled theme={theme} {...attribs}>
      {children}
    </FormCheckInputStyled>
  );
};
