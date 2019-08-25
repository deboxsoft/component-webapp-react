import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { InputGroupTheme, inputGroupTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface InputGroupStyledProps extends StyledThemeProps<InputGroupTheme> {
  sizeForm: keyof Size;
}

interface InputGroupProps extends Partial<InputGroupStyledProps> {
  children?: React.ReactNode;
}

const InputGroupStyled = styled.div<InputGroupStyledProps>`
  & > input {
    border-radius: ${({ theme, sizeForm }) => theme.borderRadius[sizeForm]};
  }

  & > div > span,
  & > input {
    line-height: 1.5;
    font-size: ${({ theme, sizeForm }) => {
      const fontSize = theme.font.size || {};
      return fontSize[sizeForm];
    }};
    padding: ${({ theme, sizeForm }) => {
      const paddingSize = theme.padding[sizeForm];
      return paddingSize && layoutUtils.positioning(paddingSize);
    }};
`;

export const InputGroup = ({ children, theme: themeProps, ...attribs }: InputGroupProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.inputGroup || inputGroupTheme;
  return (
    <InputGroupStyled theme={theme} {...attribs}>
      {children}
    </InputGroupStyled>
  );
};
