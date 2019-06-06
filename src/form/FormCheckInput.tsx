import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme } from './types';
import { Size } from '../utils/types';

interface FormCheckInputStyledProps extends StyledThemeProps<FormTheme> {
  disabled?: boolean;
}

type DefaultProps = FormCheckInputStyledProps;

export const FormCheckInput = styled.input<FormCheckInputStyledProps>`
  position: absolute;
  margin-top: ${({ theme }) => theme.formCheckInput.margin.top};
  margin-left: ${({ theme }) => theme.formCheckInput.margin.left};
  box-sizing: border-box;

  ${({ disabled, theme }) => {
    const { colors } = theme.formCheckInput;
    return (
      disabled &&
      css`
        color: ${colors && colors.colorDisabled};
        & + label {
          color: ${colors && colors.colorDisabledLabel};
        }
      `
    );
  }}
`;
