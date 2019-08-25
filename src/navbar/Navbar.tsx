import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { NavbarTheme, navbarTheme } from './types';
import { StyledThemeProps, StyledThemeTypeProps } from '../types';
import { layoutUtils, screenMaxWidth } from '../utils';
import { SizeKey } from '../utils/types';

export interface NavbarStyledProps extends StyledThemeProps<NavbarTheme> {
  expand?: SizeKey;
}

interface NavbarProps extends Partial<NavbarStyledProps> {
  children: React.ReactNode;
}

export const NavbarStyled = styled.nav<NavbarStyledProps>`
  position: relative;
  background-color: ${({ theme }) => {
    const { colors } = theme;
    return colors && colors.backgroundColor;
  }};
  border-color: ${({ theme }) => {
    const { colors } = theme;
    return colors && colors.borderColor;
  }};
  color: ${({ theme }) => {
    const { colors } = theme;
    return colors && colors.color;
  }};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding && layoutUtils.positioning(theme.padding)};
  ${({ expand }) =>
    expand &&
    css`
      ${screenMaxWidth[expand]`
        & > nav:not(:last-child) {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
      `}
    `}
`;

NavbarStyled.defaultProps = {
  theme: navbarTheme
};

export const Navbar = ({ theme: themeProps, children, ...attribs }: NavbarProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.navbar;
  return (
    <NavbarStyled theme={theme} {...attribs}>
      {children}
    </NavbarStyled>
  );
};
