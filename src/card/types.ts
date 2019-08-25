import { Color, Font, Position, Size, ThemeType } from '../utils/types';

export interface CardTheme {
  colors: ThemeType<Color>;
  border: Size;
  borderRadius: Size;
}

export interface CardHeaderTheme {
  colors: ThemeType<Color>;
  padding: Size<
    Position & {
      lastChildBottom?: string;
    }
  >;
  border: Size;
  borderRadius: Size;
}

export interface CardBodyTheme {
  padding: Size<Position>;
  margin: {
    bottom?: string;
    lastChildBottom?: string;
  };
  colors: ThemeType<Color>;
  font: Font<Size>;
}

export interface CardFooterTheme {
  colors: ThemeType<Color>;
  padding: Size<Position>;
  border: Position;
  borderRadius: Size;
}

export interface CardImageTheme {
  borderRadius: Size;
  titleColor?: string;
  subtitleColor?: string;
}

export interface CardTextTheme {
  margin: {
    top?: string;
    bottom?: string;
    lastChildBottom?: string;
  };
}

export interface CardTitleTheme {
  colors: ThemeType<Color>;
  subtitle: {
    colors: ThemeType<Color>;
  };
  margin: {
    bottom?: string;
    subtitleTop?: string;
    subtitleBottom?: string;
  };
}

export const cardTheme: CardTheme = { colors: {}, border: {}, borderRadius: {} };
export const cardHeaderTheme: CardHeaderTheme = { colors: {}, border: {}, borderRadius: {}, padding: {} };
export const cardBodyTheme: CardBodyTheme = { margin: {}, padding: {}, font: { size: {} }, colors: {} };
export const cardFooterTheme: CardFooterTheme = { colors: {}, border: {}, borderRadius: {}, padding: {} };
export const cardImageTheme: CardImageTheme = { borderRadius: {} };
export const cardTextTheme: CardTextTheme = { margin: {} };
export const cardTitleTheme: CardTitleTheme = { colors: {}, margin: {}, subtitle: { colors: {} } };
