import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormControlFileTheme, formControlFileTheme } from './types';
import { Size } from '../utils/types';

type FormControlFileStyledProps = StyledThemeProps<FormControlFileTheme>;

interface FormControlFileProps extends Partial<FormControlFileStyledProps> {
  children: React.ReactNode;
}

const FormControlFileStyled = styled.input<FormControlFileStyledProps>`
  display: block;
  width: 100%;
  box-sizing: border-box;
`;

export const FormControlFile = ({ children, theme: themeProps, ...attribs }: FormControlFileProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formControlFile || formControlFileTheme;
  return (
    <FormControlFileStyled theme={theme} {...attribs}>
      {children}
    </FormControlFileStyled>
  );
};
