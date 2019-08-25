import React, { useContext } from 'react';
import styled, { css, ThemeContext, ThemeProvider, ThemeProviderProps } from 'styled-components/macro';
import { useActive, useLinkProps } from 'react-navi';
import { LinkProps } from 'react-navi/dist/types/Link';
import { navbarLinkTheme, NavbarLinkTheme } from './types';
import { NavLinkStyled } from '../navigation/NavLink';
import { NavLinkStyledProps } from '@deboxsoft/component-webapp-react/navigation/types';
import { StyledThemeProps } from '@deboxsoft/component-webapp-react/types';

export interface NavbarLinkStyledProps
  extends Partial<Omit<NavLinkStyledProps, 'theme'>>,
    StyledThemeProps<NavbarLinkTheme> {
  brand?: boolean;
}

interface NavbarLinkProps extends Partial<Omit<NavbarLinkStyledProps, keyof LinkProps>>, LinkProps {
  children?: string;
}

const colorCss = ({ theme, disabled, active }: NavbarLinkStyledProps) => {
  const themeColors = theme.colors || navbarLinkTheme.colors;
  const colors = themeColors || {};
};

const brandCss = ({ theme, brand }: NavbarLinkStyledProps) => {
  const themeBrands = theme.brands;
  const font = themeBrands.font || navbarLinkTheme.brands.font;
  return (
    brand &&
    css`
      display: inline-block;
      padding-top: ${themeBrands.paddingTop};
      padding-bottom: ${themeBrands.paddingBottom};
      font-size: ${font.size};
      line-height: inherit;
      white-space: nowrap;
    `
  );
};

const NavbarLinkStyled = styled(NavLinkStyled).attrs<NavbarLinkStyledProps>(props => {
  return { brand: props.brand };
})`
  ${brandCss}
`;

export const NavbarLink = ({ theme: themeProps, href, active, ...attribs }: NavbarLinkProps) => {
  const linkActive = useActive(href);
  const linkProps = useLinkProps({ href });
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.navbarLink;
  return <NavbarLink active={active || (active === undefined && linkActive) } {...attribs} {...linkProps} />;
};

NavbarLinkStyled.defaultProps = {
  theme: navbarLinkTheme
};
