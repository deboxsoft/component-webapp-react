import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { InputGroupAppendTheme, inputGroupAppendTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface InputGroupStyledProps extends StyledThemeProps<InputGroupAppendTheme> {
  sizeForm: keyof Size;
}

interface InputGroupProps extends Partial<InputGroupStyledProps> {
  children?: React.ReactNode;
}

const InputGroupAppendStyled = styled.div<InputGroupStyledProps>`
  display: flex;
  margin-left: -1px;
  & > button {
    position: relative;
    z-index: 2;
  }
  & > span,
  & > button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:not(:last-child) {
      margin-right: -1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const InputGroupAppend = ({ children, theme: themeProps, ...attribs }: InputGroupProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.inputGroupAppend || inputGroupAppendTheme;
  return (
    <InputGroupAppendStyled theme={theme} {...attribs}>
      {children}
    </InputGroupAppendStyled>
  );
};
