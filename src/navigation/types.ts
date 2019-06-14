import { Font, LinkColor, Size, Position } from '../utils/types';
import { StyledThemeProps } from '../types';

export interface NavLinkTheme {
  colors: LinkColor;
  padding: Position | string;
  font: Font<Size>;
}

export interface NavTheme {
  padding?: Position | string;
  margin?: Position | string;
}

export const navLinkTheme: NavLinkTheme = { colors: {}, font: {}, padding: {} };
export const navTheme: NavTheme = { margin: {}, padding: {} };

export interface NavLinkStyledProps extends StyledThemeProps<NavLinkTheme> {
  disabled?: boolean;
  active?: boolean;
}

export interface NavStyledProps extends StyledThemeProps<NavTheme> {
  type?: 'start' | 'center' | 'end' | 'vertical' | 'justified' | 'fill';
}
