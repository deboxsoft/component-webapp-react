import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { Size } from '../utils/types';

interface FormTextStyledProps extends StyledThemeProps<FormTheme> {
  muted: boolean;
}

type DefaultProps = FormTextStyledProps;

const mutedCss = ({ muted, theme }: FormTextStyledProps) => css`
  color: ${muted && theme.formText.colors.colorMuted};
`;

export const FormText = styled.small<FormTextStyledProps>`
  display: block;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.formText.marginTop};
  ${mutedCss}
`;

FormText.defaultProps = {
  theme: defaultTheme
};
