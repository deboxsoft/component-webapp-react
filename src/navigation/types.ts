import { Font, LinkColor, Size, Position, SizeKey } from '../utils/types';
import { URLDescriptor } from 'navi';
import { StyledThemeProps } from '../types';
import * as React from 'react';
import { LinkContext } from './Link';

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

export interface LinkProps {
  active?: boolean;
  activeClassName?: string;
  activeStyle?: object;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  exact?: boolean;
  hidden?: boolean;
  href: string | Partial<URLDescriptor>;
  id?: string;
  lang?: string;
  prefetch?: boolean;
  ref?: React.Ref<HTMLAnchorElement>;
  rel?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  target?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;

  render?: (props: LinkRendererProps) => any;
}

export interface LinkRendererProps {
  anchorProps: LinkContext;
  active: boolean;
  activeClassName?: string;
  activeStyle?: object;
  children: any;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  hidden?: boolean;
  href: string;
  id?: string;
  lang?: string;
  style?: React.CSSProperties;
  target?: string;
  title?: string;
  onClick: React.MouseEventHandler<any>;
}

export interface NavLinkStyledProps extends LinkProps, StyledThemeProps<NavLinkTheme> {
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
