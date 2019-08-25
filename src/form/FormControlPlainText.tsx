import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormControlPlainTextTheme, formControlPlainTextTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface FormControlPlainTextStyledProps extends StyledThemeProps<FormControlPlainTextTheme> {
  inline: boolean;
  nomb: boolean;
}

interface FormControlPlainTextProps extends Partial<FormControlPlainTextStyledProps> {
  children?: React.ReactNode;
}

const FormControlPlainTextStyled = styled.input<FormControlPlainTextStyledProps>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  width: 100%;
  padding: ${({ theme }) => layoutUtils.positioning(theme.padding)};
  margin-bottom: ${({ theme, nomb }) => nomb && '0'};
  line-height: 1.5;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border: solid ${({ theme }) => theme.colors.borderColor};
  border-width: 1px 0;
  box-sizing: border-box;
`;

FormControlPlainTextStyled.defaultProps = {
  inline: false
};

export const FormControlPlainText = ({
  children,
  theme: themeProps,
  ...attribs
}: FormControlPlainTextProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formControlPlainText || formControlPlainTextTheme;
  return (
    <FormControlPlainTextStyled theme={theme} {...attribs}>
      {children}
    </FormControlPlainTextStyled>
  );
};
