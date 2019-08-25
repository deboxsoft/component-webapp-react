import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeTypeProps } from '../types';
import { screenMinWidth, sizes } from '../utils';
import { Size } from '../utils/types';
import { gridTheme, GridTheme } from './types';

interface ColumnStyledProps extends StyledThemeTypeProps<GridTheme, { default: string }> {
  size?: keyof Size;
  numberColumn?: number;
}

interface ColumnProps extends Partial<ColumnStyledProps> {
  children: React.ReactNode;
}

const percentage = (value: number) => `${100 * value}%`;
export const columnStyleForSize = (columns: number, numberColumn?: number) => {
  const _numColumn = numberColumn && (numberColumn > columns || numberColumn < 1) ? columns : numberColumn;
  return css`
    flex: 0 0 ${(_numColumn && percentage(_numColumn / columns)) || 'auto'};
    max-width: ${_numColumn && percentage(_numColumn / columns)};
  `;
};

const styledColumn = css<ColumnStyledProps>`
  box-sizing: border-box;
  padding-right: 15px;
  padding-left: 15px;
  overflow: hidden;
  word-break: break-all;
  ${({ size, numberColumn, theme }) =>
    size
      ? css`
          width: 100%;
          @media (min-width: ${sizes[size]}) {
            ${columnStyleForSize(theme.columns, numberColumn)}
          }
        `
      : css`
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        `}
`;

const ColumnStyled = styled.div<ColumnStyledProps>`
  ${styledColumn}
`;

ColumnStyled.defaultProps = {
  children: undefined,
  theme: gridTheme
};

export const Column = ({ children, theme: themeProps, ...attribs }: ColumnProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.grid;
  return (
    <ColumnStyled theme={theme} {...attribs}>
      {children}
    </ColumnStyled>
  );
};
