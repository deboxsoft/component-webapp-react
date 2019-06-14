import React from 'react';
import styled, { css, ThemeConsumer } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { NavStyledProps, navTheme } from './types';
import { layoutUtils } from '../utils';

type DefaultProps = NavStyledProps;

export const Nav = styled.div<NavStyledProps>`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.padding && layoutUtils.positioning(theme.padding)};
  margin: ${({ theme }) => theme.margin && layoutUtils.positioning(theme.margin)};
  list-style: none;
  & > a {
    text-decoration: none;
  }
  &:nth-child(n) {
    margin-bottom: -1px;
    flex: ${({ theme, type }) => {
      if (type === 'justified') {
        return '1 1 0';
      } else if (type === 'fill') {
        return '1 1 auto';
      }
    }};
    justify-content: ${({ theme, type }) => {
      if (type === 'start') {
        return 'flex-start';
      } else if (type === 'center') {
        return 'center';
      } else if (type === 'end') {
        return 'flex-end';
      }
    }};
    text-align: ${({ theme, type }) => (type === 'justified' || type === 'fill') && 'center'};
  }

  &:last-child {
    flex: 1;
  }
`;

Nav.defaultProps = {
  theme: navTheme
};
