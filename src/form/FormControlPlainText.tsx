import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { Size } from '../utils/types';

interface FormControlPlainTextStyledProps extends StyledThemeProps<FormTheme> {
  sizeForm: keyof Size;
  inline: boolean;
  nomb: boolean;
}

type DefaultProps = FormControlPlainTextStyledProps;

export const FormControlPlainText = styled.input<FormControlPlainTextStyledProps>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  width: 100%;
  padding: ${({ theme, sizeForm }) => {
    const padding = theme.formControlPlainText.padding[sizeForm];
    return padding && `${padding.top || 0} ${padding.right || 0} ${padding.bottom || 0} ${padding.left || 0}`;
  }};
  margin-bottom: ${({ theme, nomb }) => nomb && theme.formControlPlainText.margin.nomb};
  line-height: 1.5;
  background-color: ${({ theme }) => theme.formControlPlainText.colors.backgroundColor};
  border: solid ${({ theme }) => theme.formControlPlainText.colors.borderColor};
  border-width: 1px 0;
  box-sizing: border-box;
`;

FormControlPlainText.defaultProps = {
  theme: defaultTheme,
  sizeForm: 'default',
  inline: false
};
