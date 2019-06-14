import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { navLinkTheme, NavLinkStyledProps } from './types';
import { Link } from './Link';
import { layoutUtils } from '../utils';

type NavLinkProps = Partial<NavLinkStyledProps>;

const colorsCss = ({ theme, disabled, active }: NavLinkStyledProps) => {
  const { colors } = theme;
  if (disabled) {
    return css`
      color: ${colors.colorDisabled};
      background-color: ${colors.backgroundColorDisabled};
      &:hover,
      &:focus {
        color: ${colors.colorDisabledHoverFocus};
        background-color: ${colors.backgroundColorDisabled};
      }
    `;
  } else if (active) {
    return css`
      color: ${colors.colorActive};
      background-color: ${colors.backgroundColorActive};
      &:hover,
      &:focus {
        color: ${colors.colorActiveHoverFocus};
      }
    `;
  }
  return css`
    color: ${colors.color};
    background-color: ${colors.backgroundColor};
    &:hover,
    &:focus {
      color: ${colors.colorHoverFocus};
      background-color: ${colors.backgroundColorHoverFocus};
    }
  `;
};

export const NavLinkStyled = styled(Link)<NavLinkStyledProps>`
  display: block;
  padding: ${({ theme }) => layoutUtils.positioning(theme.padding)};
  &:hover,
  &:focus {
    text-decoration: none;
  }
  ${colorsCss}
`;

NavLinkStyled.defaultProps = {
  theme: navLinkTheme
};

export const NavLink = ({ theme: _theme, ...attribs }: NavLinkProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = _theme || themeContext.navLink;
  return <NavLinkStyled theme={theme} {...attribs} />;
};
