import React from 'react';
import styled, { css } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { FormTheme, defaultTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface InputGroupStyledProps extends StyledThemeProps<FormTheme> {
  sizeForm: keyof Size;
}

type DefaultProps = InputGroupStyledProps;

export const InputGroup = styled.div<InputGroupStyledProps>`
  & > input {
    border-radius: ${({ theme, sizeForm }) => theme.inputGroup.borderRadius[sizeForm]};
  }

  & > div > span,
  & > input {
    line-height: 1.5;
    font-size: ${({ theme, sizeForm }) => {
      const fontSize = theme.inputGroup.font.size || {};
      return fontSize[sizeForm];
    }};
    padding: ${({ theme }) => layoutUtils.space(theme.inputGroup.padding)};
`;

export const InputGroupAppend = styled.div<InputGroupStyledProps>`
  display: flex;
  margin-left: -1px;
  & > button {
    position: relative;
    z-index: 2;
  }
  & > span,
  & > button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:not(:last-child) {
      margin-right: -1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const InputGroupPrepend = styled.div<InputGroupStyledProps>`
  display: flex;
  margin-right: -1px;
  & > button {
    position: relative;
    z-index: 2;
  }
  & > span,
  & > button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export const InputGroupText = styled.span.attrs<InputGroupStyledProps>(({ color }) => ({
  style: color && {
    color
  }
}))`
  display: flex;
  align-items: center;

  padding: ${({ theme }) => layoutUtils.space(theme.inputGroup.text.padding)};
  margin-bottom: ${({ theme }) => theme.inputGroup.text.margin.bottom};
  font-size: ${({ theme }) => theme.inputGroup.text.font.size};
  font-weight: ${({ theme }) => theme.inputGroup.text.font.weight};
  line-height: 1.5;
  color: ${({ theme }) => theme.inputGroup.text.colors.color};
  text-align: center;
  white-space: nowrap;
  background-color: ${({ theme, sizeForm }) => theme.inputGroup.text.colors.backgroundColor};
  border: ${({ theme }) => `${theme.inputGroup.text.border} ${theme.inputGroup.text.colors.backgroundColor}`};
  border-radius: ${({ theme }) => theme.inputGroup.text.borderRadius};
  & input[type='radio'],
  & input[type='checkbox'] {
    margin: ${({ theme }) => layoutUtils.space(theme.inputGroup.text.margin.radioCheckbox)};
  }
`;

InputGroup.defaultProps = {
  theme: defaultTheme
};

InputGroupAppend.defaultProps = {
  theme: defaultTheme
};

InputGroupPrepend.defaultProps = {
  theme: defaultTheme
};

InputGroupText.defaultProps = {
  theme: defaultTheme
};
