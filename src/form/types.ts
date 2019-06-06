/* eslint-disable */
import { Color, Size, ThemeType, Font, Position } from '../utils/types';

export interface FormCheck {
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
export interface FormCheckInput {
  colors: {
    colorDisabled?: string;
    colorDisabledLabel?: string;
  };
  margin: {
    top: string;
    left: string;
  };
}
export interface FormControl {
  colors: Color & {
    borderFocusColor?: string;
    boxShadowFocus?: string;
    placeholderColor?: string;
    backgroundDisabledReadonlyColor?: string;
    borderValidColor?: string;
    formControlBoxShadowValidColor?: string;
    formControlBoxShadowInvalidColor?: string;
    borderInvalidColor?: string;
  };
  borderRadius: Size;
  border: Size;
  boxShadow?: string;
  padding: Size<Position>;
  font: Font<Size>;
  height: Size;
}
export interface FormControlPlainText {
  colors: Color;
  padding: Size<Position>;
  margin: {
    nomb?: string;
  };
}
export interface FormControlFile {}
export interface FormGroup {
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

export interface FormText {
  colors: {
    colorMuted?: string;
  };
  marginTop?: string;
}

export interface FormInline {}
export interface InputGroup {
  borderRadius: Size;
  font: Font<Size>;
  padding: Position;
  text: {
    border?: string;
    borderRadius?: string;
    padding: Position;
    margin: {
      bottom?: string;
      radioCheckbox: Position;
    };
    font: Font;
    colors: Color;
  };
}
export interface InputGroupText {}
export interface InputGroupAppend {}
export interface InputGroupPrepend {}

export interface FormTheme {
  formCheck: FormCheck;
  formCheckInput: FormCheckInput;
  formControl: FormControl;
  formControlPlainText: FormControlPlainText;
  formControlFile: FormControlFile;
  formGroup: FormGroup;
  formText: FormText;
  formInline: FormInline;
  inputGroup: InputGroup;
  inputGroupText: InputGroupText;
  inputGroupAppend: InputGroupAppend;
  inputGroupPrepend: InputGroupPrepend;
}

export const defaultTheme: FormTheme = {
  formCheck: {
    margin: {},
    padding: {}
  },
  formCheckInput: {
    colors: {},
    margin: {
      left: '',
      top: ''
    }
  },
  formControl: {
    border: {},
    borderRadius: {},
    colors: {},
    font: { weight: {}, size: {} },
    height: {},
    padding: {}
  },
  formControlPlainText: { colors: {}, padding: {}, margin: {} },
  formControlFile: {},
  formGroup: { margin: {}, borderRadius: {}, padding: {}, font: { size: {}, weight: {} } },
  formText: { colors: {} },
  formInline: {},
  inputGroup: {
    padding: {},
    font: { size: {} },
    borderRadius: {},
    text: {
      margin: {
        radioCheckbox: {}
      },
      colors: {},
      font: {},
      padding: {}
    }
  },
  inputGroupText: {},
  inputGroupAppend: {},
  inputGroupPrepend: {}
};
