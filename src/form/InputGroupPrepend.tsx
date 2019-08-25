import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { InputGroupPrependTheme, inputGroupPrependTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface InputGroupStyledProps extends StyledThemeProps<InputGroupPrependTheme> {
  sizeForm: keyof Size;
}

interface InputGroupProps extends Partial<InputGroupStyledProps> {
  children?: React.ReactNode;
}

const InputGroupPrependStyled = styled.div<InputGroupStyledProps>`
  display: flex;
  margin-right: -1px;
  & > button {
    position: relative;
    z-index: 2;
  }
  & > span,
  & > button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export const InputGroupPrepend = ({ children, theme: themeProps, ...attribs }: InputGroupProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.inputGroupPrepend || inputGroupPrependTheme;
  return (
    <InputGroupPrependStyled theme={theme} {...attribs}>
      {children}
    </InputGroupPrependStyled>
  );
};
