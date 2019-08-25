import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { FormGroupTheme, formGroupTheme } from './types';
import { screenMinWidth, layoutUtils } from '../utils';

import { Size } from '../utils/types';

interface FormGroupStyledProps extends StyledThemeProps<FormGroupTheme> {
  sizeForm: keyof Size;
  inline: boolean;
  row: boolean;
  nomb: boolean;
  justify: boolean;
  noRadius: boolean;
}

interface FormGroupProps extends Partial<FormGroupStyledProps> {
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
      margin-bottom: ${theme.margin.inlineBottom};
    `
    : '';

const marginCss = ({ nomb, theme, row }: FormGroupStyledProps) => {
  const { margin } = theme;
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
      margin-right: ${margin.rowRight};
      margin-left: ${margin.rowLeft};
      margin-bottom: ${margin.bottom};
      & > div > label {
        margin-bottom: ${margin.rowDivLabelBottom};
      }
    `;
  }
  return css`
    margin-bottom: ${theme.margin.bottom};
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
      border-radius: ${noRadius ? '0' : theme.borderRadius[sizeForm]};
    }
  `;

const fontSizeCss = ({ theme, sizeForm }: FormGroupStyledProps) => {
  const fontSize = theme.font.size;
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
  const padding = theme.padding[sizeForm];
  return css`
    & > label,
    & > div > label {
      padding-top: ${padding && padding.labelTop};
      padding-bottom: ${padding && padding.labelBottom};
    }
    & > input,
    & > div > input {
      padding: ${layoutUtils.positioning({
        top: padding && padding.inputTopBottom,
        right: padding && padding.inputRight,
        bottom: padding && padding.inputTopBottom,
        left: padding && padding.inputLeft
      })};
    }
  `;
};

const FormGroupStyled = styled.div<FormGroupStyledProps>`
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

FormGroupStyled.defaultProps = {
  sizeForm: 'default'
};

export const FormGroup = ({ children, theme: themeProps, ...attribs }: FormGroupProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.formGroup || formGroupTheme;
  return (
    <FormGroupStyled theme={theme} {...attribs}>
      {children}
    </FormGroupStyled>
  );
};
