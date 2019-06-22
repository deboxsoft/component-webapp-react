import { ImagesResponsive, StyledThemeProps } from '../types';
import { NavLinkTheme, NavLinkStyledProps, navLinkTheme } from '../navigation/types';
import { Color, Font, Position, Size, SizeKey, ThemeType } from '../utils/types';

export interface NavbarTheme {
  colors: Color;
  padding?: Position | string;
  height?: string;
}

export interface NavbarLinkTheme extends NavLinkTheme {
  brands: {
    font: Font;
    paddingTop?: string;
    paddingBottom?: string;
  };
}

export const navbarTheme: NavbarTheme = {
  colors: {}
};

export const navbarLinkTheme: NavbarLinkTheme = Object.assign({
  navLinkTheme,
  brands: {
    font: {}
  }
});

export interface NavbarStyledProps extends StyledThemeProps<NavbarTheme> {
  expand?: SizeKey;
}

export interface NavbarLinkStyledProps
  extends Partial<Omit<NavLinkStyledProps, 'theme'>>,
    StyledThemeProps<NavbarLinkTheme> {
  brand?: boolean;
}
