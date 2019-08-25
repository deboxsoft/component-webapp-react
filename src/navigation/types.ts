import { Font, LinkColor, Size, Position, SizeKey } from '../utils/types';
import { URLDescriptor } from 'navi';

import { StyledThemeProps } from '../types';
import * as React from 'react';

export interface NavLinkTheme {
  colors: LinkColor;
  padding: Position | string;
  font: Font<Size>;
}

export interface NavTheme {
  padding: Size<Position | string>;
  margin?: Position | string;
  collapse: {
    padding?: Position | string;
  };
}

export const navLinkTheme: NavLinkTheme = { colors: {}, font: {}, padding: {} };
export const navTheme: NavTheme = { margin: {}, padding: {}, collapse: {} };



export interface NavLinkStyledProps extends  StyledThemeProps<NavLinkTheme> {
  disabled?: boolean;
  active?: boolean;
}

export interface NavStyledProps extends StyledThemeProps<NavTheme> {
  collapse?: boolean;
  hidden?: boolean;
  expand?: SizeKey;
  size: SizeKey;
  type?: 'start' | 'center' | 'end' | 'vertical' | 'justified' | 'fill';
}
