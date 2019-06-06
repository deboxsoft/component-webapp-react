import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { screenMinWidth, layoutUtils } from '../utils';

import { Size } from '../utils/types';

interface FormGroupStyledProps extends StyledThemeProps<FormTheme> {
  sizeForm: keyof Size;
  inline: boolean;
  row: boolean;
  nomb: boolean;
  justify: boolean;
  noRadius: boolean;
}

type DefaultProps = FormGroupStyledProps;

interface FormGroupProps extends FormGroupStyledProps {
  children: React.ReactNode;
}

const rowCss = ({ row }: FormGroupStyledProps) =>
  row
    ? css`
        display: flex;
        flex-wrap: wrap;
      `
    : '';

const inlineCss = ({ inline, theme }: FormGroupStyledProps) =>
  inline
    ? screenMinWidth.tablet`
      display: flex;
      flex: 0 0 auto;
      flex-flow: row wrap;
      align-items: center;
      margin-bottom: ${theme.formGroup.margin.inlineBottom};
    `
    : '';

const marginCss = ({ nomb, theme, row }: FormGroupStyledProps) => {
  const { margin } = theme.formGroup;
  if (nomb) {
    if (row) {
      return css`
        margin-right: ${margin.nomb && margin.nomb.rowRight};
        margin-left: ${margin.nomb && margin.nomb.rowLeft};
        margin-bottom: ${margin.nomb && margin.nomb.rowBottom};
        & > div > label {
          margin-bottom: ${margin.nomb && margin.nomb.rowDivLabelBottom};
        }
      `;
    }
    return css`
      margin-bottom: ${margin.nomb && margin.nomb.noRow};
    `;
  }
  if (row) {
    return css`
      margin-right: ${margin.nomb && margin.rowRight};
      margin-left: ${margin.nomb && margin.rowLeft};
      margin-bottom: ${margin.nomb && margin.bottom};
      & > div > label {
        margin-bottom: ${margin.nomb && margin.rowDivLabelBottom};
      }
    `;
  }
  return css`
    margin-bottom: ${theme.formGroup.margin.bottom};
  `;
};

const justifyCss = ({ justify }: FormGroupStyledProps) => css`
  justify-content: center;
  align-items: center;
`;

const borderRadiusCss = ({ theme, noRadius, sizeForm }: FormGroupStyledProps) =>
  css`
    & > input,
    & > div > input,
    & > :not(input[type='file']),
    & > div > :not(input[type='file']) {
      border-radius: ${noRadius ? '0' : theme.formGroup.borderRadius[sizeForm]};
    }
  `;

const fontSizeCss = ({ theme, sizeForm }: FormGroupStyledProps) => {
  const fontSize = theme.formGroup.font.size;
  return css`
    & > input,
    & > div > input,
    & > label,
    & > div > label {
      font-size: ${fontSize && fontSize[sizeForm]};
    }
  `;
};

const paddingCss = ({ theme, sizeForm }: FormGroupStyledProps) => {
  const padding = theme.formGroup.padding[sizeForm];
  return css`
    & > label,
    & > div > label {
      padding-top: ${padding && padding.labelTop};
      padding-bottom: ${padding && padding.labelBottom};
    }
    & > input,
    & > div > input {
      padding: ${layoutUtils.space({
        top: padding && padding.inputTopBottom,
        right: padding && padding.inputRight,
        bottom: padding && padding.inputTopBottom,
        left: padding && padding.inputLeft
      })};
    }
  `;
};

export const FormGroup = styled.div<FormGroupStyledProps>`
  box-sizing: border-box;
  & > input,
  & > div > input,
  & > label,
  & > div > label {
    line-height: 1.5;
  }
  ${rowCss}
  ${inlineCss}
  ${marginCss}
  ${justifyCss}
  ${borderRadiusCss}
  ${fontSizeCss}
  ${paddingCss}
`;

FormGroup.defaultProps = {
  theme: defaultTheme,
  sizeForm: 'default'
};
