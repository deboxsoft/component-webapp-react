import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { Size } from '../utils/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormInlineStyledProps extends StyledThemeProps<FormTheme> {}

type DefaultProps = FormInlineStyledProps;

export const FormInline = styled.div<FormInlineStyledProps>`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  box-sizing: border-box;
`;

FormInline.defaultProps = {
  theme: defaultTheme
};
