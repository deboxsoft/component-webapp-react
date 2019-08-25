/* eslint-disable */
import { Color, Size, ThemeType, Font, Position } from '../utils/types';

export interface FormCheckTheme {
  margin: {
    labelBottom?: string;
    inputLeft?: string;
    inputTop?: string;
    inputRight?: string;
    inlineRight?: string;
  };
  padding: {
    inlineLeft?: string;
  };
}
export interface FormCheckInputTheme {
  colors: {
    colorDisabled?: string;
    colorLabelDisabled?: string;
  };
  margin: {
    top: string;
    left: string;
  };
}
export interface FormControlTheme {
  colors: Color & {
    borderFocusColor?: string;
    boxShadowFocus?: string;
    boxShadowValidColor?: string;
    boxShadowInvalidColor?: string;
    placeholderColor?: string;
    backgroundDisabledReadonlyColor?: string;
    borderValidColor?: string;
    borderInvalidColor?: string;
  };
  borderRadius: Size;
  border: string;
  boxShadow?: string;
  padding: Size<Position | string>;
  font: Font<Size>;
  height: {
    select: Size;
    default?: string;
  };
}
export interface FormControlPlainTextTheme {
  colors: Color;
  padding: Position | string;
  margin: Position | string;
}
export interface FormControlFileTheme {}
export interface FormGroupTheme {
  margin: {
    nomb?: {
      noRow?: string;
      rowLeft?: string;
      rowRight?: string;
      rowBottom?: string;
      rowDivLabelBottom?: string;
    }; // no margin bottom - 0
    rowLeft?: string;
    rowRight?: string;
    rowDivLabelBottom?: string;
    bottom?: string;
    inlineBottom?: string;
  };
  borderRadius: Size;
  font: Font<Size>;
  padding: Size<{
    labelTop?: string;
    labelBottom?: string;
    inputLeft?: string;
    inputRight?: string;
    inputTopBottom?: string;
  }>;
}

export interface FormTextTheme {
  colors: {
    colorMuted?: string;
  };
  margin: {
    top?: string;
  };
}

export interface FormInlineTheme {}
export interface InputGroupTheme {
  borderRadius: Size;
  font: Font<Size>;
  padding: Size<Position | string>;
  colors: Color;
}
export interface InputGroupTextTheme extends InputGroupTheme {
  border?: string;
  margin: {
    bottom?: string;
    radioCheckbox: Position | string;
  };
}
export interface InputGroupAppendTheme {}
export interface InputGroupPrependTheme {}

export const formCheckTheme: FormCheckTheme = {
  margin: {},
  padding: {}
};
export const formCheckInputTheme: FormCheckInputTheme = {
  colors: {},
  margin: {
    left: '',
    top: ''
  }
};
export const formControlTheme: FormControlTheme = {
  border: '0',
  borderRadius: {},
  colors: {},
  font: { size: {} },
  height: {
    select: {}
  },
  padding: {}
};
export const formControlPlainTextTheme: FormControlPlainTextTheme = {
  colors: {},
  padding: {},
  margin: {}
};
export const formControlFileTheme: FormControlFileTheme = {};
export const formGroupTheme: FormGroupTheme = {
  margin: {},
  borderRadius: {},
  padding: {},
  font: { size: {} }
};
export const formTextTheme: FormTextTheme = {
  colors: {},
  margin: {}
};
export const formInlineTheme: FormInlineTheme = {};
export const inputGroupTheme: InputGroupTheme = {
  padding: {},
  font: { size: {} },
  borderRadius: {},
  colors: {}
};
export const inputGroupTextTheme: InputGroupTextTheme = {
  padding: {},
  font: { size: {} },
  borderRadius: {},
  margin: {
    radioCheckbox: {}
  },
  colors: {}
};
export const inputGroupAppendTheme: InputGroupAppendTheme = {};
export const inputGroupPrependTheme: InputGroupPrependTheme = {};
