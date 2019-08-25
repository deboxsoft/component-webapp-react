import { Color, Font, Size, ThemeType } from '@deboxsoft/component-webapp-react/utils/types';

export interface GridTheme {
  columns: number;
  gutter: number;
}

export const gridTheme: GridTheme = {
  columns: 12,
  gutter: 15
};

export interface ContainerTheme {
  colors: ThemeType<Color>;
  width?: string;
  maxWidth?: string;
  font: Font<Size>;
  fluid: {
    maxWidth?: string;
    width?: string;
  };
}

export const containerTheme: ContainerTheme = {
  colors: {},
  font: { size: {} },
  fluid: {}
};
