import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormTextTheme, formTextTheme } from './types';
import { Size } from '../utils/types';

interface FormTextStyledProps extends StyledThemeProps<FormTextTheme> {
  muted: boolean;
}

interface FormTextProps extends Partial<FormTextStyledProps> {
  children?: React.ReactNode;
}

const mutedCss = ({ muted, theme }: FormTextStyledProps) => css`
  color: ${muted && theme.colors.colorMuted};
`;

const FormTextStyled = styled.small<FormTextStyledProps>`
  display: block;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.margin.top};
  ${mutedCss}
`;

export const FormText = ({ children, theme: themeProps, ...attribs }: FormTextProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formText || formTextTheme;
  return (
    <FormTextStyled theme={theme} {...attribs}>
      {children}
    </FormTextStyled>
  );
};
