import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, StyledThemeTypeProps } from '../types';
import { defaultProps } from './Button';
import { ButtonTheme } from '../theme';
import { ThemeAllType, Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface ButtonGroupStyledProps extends StyledThemeTypeProps<ButtonTheme, ThemeAllType> {
  size: keyof Size;
  vertical?: boolean;
}

type DefaultProps = ButtonGroupStyledProps;
type ButtonGroupProps = Partial<ButtonGroupStyledProps>;

const sizeCss = ({ theme, size }: ButtonGroupStyledProps) => {
  const paddingSize = theme.buttonGroup.padding[size];
  const fontSize = theme.buttonGroup.font.size;
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

export const ButtonGroup = styled.div<ButtonGroupStyledProps>`
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

ButtonGroup.defaultProps = defaultProps;
