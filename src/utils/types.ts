export interface Size<V = string> {
  sm?: V;
  md?: V;
  default?: V;
  lg?: V;
}

export type DeviceKey = 'giant' | 'desktop' | 'tablet' | 'phone';
export type SizeKey = keyof Size;

export interface Font<V = string> {
  family?: string;
  size?: V;
  weight?: string;
}

export interface Color {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
}

export interface LinkColor extends Color {
  backgroundColorActive?: string;
  backgroundColorHoverFocus?: string;
  backgroundColorDisabled?: string;
  borderColorActive?: string;
  borderColorDisabled?: string;
  borderColorHoverFocus?: string;
  colorActive?: string;
  colorActiveHoverFocus?: string;
  colorDisabled?: string;
  colorDisabledHoverFocus?: string;
  colorHoverFocus?: string;
}

export interface Position {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export interface ThemeType<T = {}> {
  default?: T;
  dark?: T;
}

export interface ThemeAllType<T = {}> extends ThemeType<T> {
  primary?: T;
  secondary?: T;
  success?: T;
  danger?: T;
  warning?: T;
  info?: T;
  error?: T;
}
