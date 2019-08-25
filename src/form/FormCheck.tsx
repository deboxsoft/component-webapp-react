import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormCheckTheme, formCheckTheme } from './types';
import { Size } from '../utils/types';

interface FormCheckStyledProps extends StyledThemeProps<FormCheckTheme> {
  inline?: boolean;
}

interface FormCheckProps extends Partial<FormCheckStyledProps> {
  children?: React.ReactNode;
}

const FormCheckStyled = styled.div<FormCheckStyledProps>`
  position: relative;
  box-sizing: border-box;
  & > label {
    margin-bottom: ${({ theme }) => theme.margin.labelBottom};
  }
  & > input {
    position: relative;
    margin-top: ${({ theme }) => theme.margin.inputTop};
    margin-right: ${({ theme }) => theme.margin.inputRight};
    margin-left: ${({ theme }) => theme.margin.inputLeft};
  }
  display: ${({ inline }) => (inline ? 'inline-flex' : 'block')};
  ${({ inline, theme }) =>
    inline &&
    css`
      align-items: center;
      padding-left: ${theme.padding.inlineLeft};
      margin-right: ${theme.margin.inlineRight};
    `}
`;

export const FormCheck = ({ children, theme: themeProps, ...attribs }: FormCheckProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formCheck || formCheckTheme;
  return (
    <FormCheckStyled theme={theme} {...attribs}>
      {children}
    </FormCheckStyled>
  );
};
