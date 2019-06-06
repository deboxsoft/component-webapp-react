import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { Size } from '../utils/types';

type FormControlFileStyledProps = StyledThemeProps<FormTheme>;

type DefaultProps = FormControlFileStyledProps;

interface FormControlFileProps extends FormControlFileStyledProps {
  children: React.ReactNode;
}

export const FormControlFile = styled.input<FormControlFileStyledProps>`
  display: block;
  width: 100%;
  box-sizing: border-box;
`;

FormControlFile.defaultProps = {
  theme: defaultTheme
};
