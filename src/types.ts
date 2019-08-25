import React, { FunctionComponent, ComponentProps } from 'react';
import { ThemeProps, ThemeContext, ThemedStyledProps } from 'styled-components/macro';
import { Theme } from './theme';
import { ThemeType } from './utils/types';

export type StyledThemeProps<T = Theme> = ThemedStyledProps<
  {
    className?: string;
    style?: React.CSSProperties;
  },
  T
>;

export interface StyledThemeTypeProps<T = Theme, TT = ThemeType> extends StyledThemeProps<T> {
  themeType: keyof TT;
}

export interface OnClickedProps {
  /**
   * Gets called when the user clicks on the button
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClick?: (event?: React.SyntheticEvent) => void;
}

export interface OnChangeProps {
  /**
   * onChange
   */
  onChange?: (event?: React.SyntheticEvent) => void;
}

export type ImagesResponsive = {
  src: string;
  media: string;
}[];

// export type FunctionComponentWithDefault<
//   T,
//   D extends Partial<ComponentProps<FunctionComponent<T>>> = T
// > = Pick<FunctionComponent<T>, Exclude<keyof FunctionComponent<T>, 'defaultProps'>> & // remove defaultProps
//   (FunctionComponent<T> extends (...a: infer A) => infer R ? (...a: A) => R : never) & { defaultProps: D }; // keep signature
