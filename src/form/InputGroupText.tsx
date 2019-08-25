import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { InputGroupTextTheme, inputGroupTextTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface InputGroupTextProps extends StyledThemeProps<InputGroupTextTheme> {
  sizeForm: keyof Size;
}

interface InputGroupProps extends Partial<InputGroupTextProps> {
  children?: React.ReactNode;
}

const InputGroupTextStyled = styled.span.attrs<InputGroupTextProps>(({ color }) => ({
  style: color && {
    color
  }
}))`
  display: flex;
  align-items: center;

  padding: ${({ theme, sizeForm }) => {
    const paddingSize = theme.padding[sizeForm];
    return paddingSize && layoutUtils.positioning(paddingSize);
  }};
  margin-bottom: ${({ theme }) => theme.margin.bottom};
  font-size: ${({ theme, sizeForm }) => {
    const fontSize = theme.font.size || {};
    return fontSize[sizeForm];
  }};
  font-weight: ${({ theme }) => theme.font.weight};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.color};
  text-align: center;
  white-space: nowrap;
  background-color: ${({ theme, sizeForm }) => theme.colors.backgroundColor};
  border: ${({ theme }) => `${theme.border} ${theme.colors.backgroundColor}`};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  & input[type='radio'],
  & input[type='checkbox'] {
    margin: ${({ theme }) => layoutUtils.positioning(theme.margin.radioCheckbox)};
  }
`;

export const InputGroupText = ({ children, theme: themeProps, ...attribs }: InputGroupProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.inputGroupText || inputGroupTextTheme;
  return (
    <InputGroupTextStyled theme={theme} {...attribs}>
      {children}
    </InputGroupTextStyled>
  );
};
