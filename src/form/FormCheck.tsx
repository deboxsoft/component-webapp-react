import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { Size } from '../utils/types';

interface FormCheckStyledProps extends StyledThemeProps<FormTheme> {
  inline?: boolean;
}

type DefaultProps = FormCheckStyledProps;

export const FormCheck = styled.div<FormCheckStyledProps>`
  position: relative;
  box-sizing: border-box;
  & > label {
    margin-bottom: ${({ theme }) => theme.formCheck.margin.labelBottom};
  }
  & > input {
    position: relative;
    margin-top: ${({ theme }) => theme.formCheck.margin.inputTop};
    margin-right: ${({ theme }) => theme.formCheck.margin.inputRight};
    margin-left: ${({ theme }) => theme.formCheck.margin.inputLeft};
  }
  display: ${({ inline }) => (inline ? 'inline-flex' : 'block')};
  ${({ inline, theme }) =>
    inline &&
    css`
      align-items: center;
      padding-left: ${theme.formCheck.padding.inlineLeft};
      margin-right: ${theme.formCheck.margin.inlineRight};
    `}
`;

FormCheck.defaultProps = {
  theme: defaultTheme
};

const test = <FormCheck />;
