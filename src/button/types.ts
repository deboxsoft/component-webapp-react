import { Font, LinkColor, Position, Size, ThemeAllType } from '../utils/types';

export interface ButtonTheme {
  colors: ThemeAllType<
    LinkColor & {
      boxShadow?: string;
      toggle?: LinkColor;
      colorOutline?: string;
      colorOutlineHover?: string;
    }
  >;
  margin: {
    blockTop?: string;
    dropdownToggleLeft?: string;
  };
  padding: Size<Position> & {
    split?: Size<Position>;
  };
  font: Font<Size> & {
    toggle?: Font<Size>;
  };
  border: Size;
  borderRadius: Size & {
    pill?: string;
  };
}

export interface ButtonGroupTheme extends ButtonTheme {
  font: Font<Size>;
}

export const buttonTheme: ButtonTheme = {
  font: {
    size: {}
  },
  borderRadius: {},
  colors: {},
  margin: {},
  padding: {},
  border: {}
};
export const buttonGroupTheme: ButtonGroupTheme = {
  font: {
    size: {}
  },
  colors: {},
  borderRadius: {},
  margin: {},
  padding: {},
  border: {}
};
