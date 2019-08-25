import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { StyledThemeTypeProps } from '../types';
import { ButtonGroupTheme, buttonGroupTheme } from './types';
import { ThemeAllType, Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface ButtonGroupStyledProps extends StyledThemeTypeProps<ButtonGroupTheme, ThemeAllType> {
  size: keyof Size;
  vertical?: boolean;
}

interface ButtonGroupProps extends Partial<ButtonGroupStyledProps> {
  children?: React.ReactNode;
}

const sizeCss = ({ theme, size }: ButtonGroupStyledProps) => {
  const paddingSize = theme.padding[size];
  const fontSize = theme.font.size;
  return css`
    padding: ${paddingSize && layoutUtils.positioning(paddingSize)};
    font-size: ${fontSize && fontSize[size]};
    line-height: 1.5;
  `;
};

const verticalCss = (props: ButtonGroupStyledProps) => {
  if (props.vertical) {
    return css`
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      & > button {
        width: 100%;
        &:not(:last-child) {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        &:not(:first-child) {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    `;
  }

  return css`
    & > button {
      &:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  `;
};

const ButtonGroupStyled = styled.div<ButtonGroupStyledProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  & > button {
    line-height: 1.5;
    position: relative;
    flex: 0 1 auto;
    &:hover {
      z-index: 1;
    }
    ${sizeCss};
  }
  ${verticalCss};
`;

export const ButtonGroup = ({ children, theme: themeProps, ...attribs }: ButtonGroupProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.buttonGroup || buttonGroupTheme;
  return (
    <ButtonGroupStyled theme={theme} {...attribs}>
      {children}
    </ButtonGroupStyled>
  );
};
