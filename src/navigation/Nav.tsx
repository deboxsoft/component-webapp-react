import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { FunctionComponentWithDefault, ImagesResponsive, StyledThemeProps } from '../types';
import { NavStyledProps, navTheme, NavTheme } from './types';
import { layoutUtils, screenMaxWidth } from '../utils';

interface NavProps extends Partial<NavStyledProps> {
  children: React.ReactNode;
}

const collapseCss = ({ theme, collapse, expand, hidden }: NavStyledProps) => {
  if (expand && collapse) {
    if (!hidden) {
      return screenMaxWidth[expand]`
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        & > a {
          padding: ${theme.collapse.padding && layoutUtils.positioning(theme.collapse.padding)};
          flex: 1;
          text-align: left;
        };
    `;
    } else {
      return screenMaxWidth[expand]`
        display: none;
        flex-basis: auto;
        flex-direction: column;
      `;
    }
  }
  return '';
};

const VerticalCss = ({ type }: NavStyledProps) =>
  type === 'vertical' &&
  css`
    flex-direction: column;
  `;

export const NavStyled = styled.nav<NavStyledProps>`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ theme, size }) => {
    const padding = theme.padding[size];
    return padding && layoutUtils.positioning(padding);
  }};
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
      if (type === 'center') {
        return 'center';
      } else if (type === 'end') {
        return 'flex-end';
      } else {
        return 'flex-start';
      }
    }};
    text-align: ${({ theme, type }) => (type === 'justified' || type === 'fill') && 'center'};
  }

  &:last-child {
    flex: 1;
  }
  ${collapseCss}
  ${VerticalCss}
`;

NavStyled.defaultProps = {
  theme: navTheme,
  size: 'default'
};
export const Nav = ({ children, theme: themeProps, ...attribs }: NavProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.nav;
  return (
    <NavStyled theme={theme} {...attribs}>
      {children}
    </NavStyled>
  );
};
