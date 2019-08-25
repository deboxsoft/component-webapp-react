import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormInlineTheme, formInlineTheme } from './types';
import { Size } from '../utils/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormInlineStyledProps extends StyledThemeProps<FormInlineTheme> {}

interface FormInlineProps extends Partial<FormInlineStyledProps> {
  children?: React.ReactNode;
}

const FormInlineStyled = styled.div<FormInlineStyledProps>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  box-sizing: border-box;
`;

export const FormInline = ({ children, theme: themeProps, ...attribs }: FormInlineProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formInline || formInlineTheme;
  return (
    <FormInlineStyled theme={theme} {...attribs}>
      {children}
    </FormInlineStyled>
  );
};
