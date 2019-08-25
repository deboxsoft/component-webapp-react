---
to: "src/<%= path ? path + '/' + types : types %>.ts"
---

import { StyledThemeProps } from '../types';
import { Color, Font, Position, Size, SizeKey, ThemeType } from '../utils/types';

export interface <%= h.inflection.camelize(name) %>Theme {
  colors: Color;
  padding?: Position | string;
  height?: string;
}

export const <%= h.inflection.camelize(name, true) %>Theme: <%= h.inflection.camelize(name) %>Theme = {
  colors: {}
};

export interface <%= h.inflection.camelize(name) %>BaseProps {}

export type <%= h.inflection.camelize(name) %>StyledProps = StyledThemeProps<<%= h.inflection.camelize(name) %>Theme> & <%= h.inflection.camelize(name) %>BaseProps;
