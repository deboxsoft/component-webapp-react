import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeTypeProps } from '../types';
import { Size } from '../utils/types';
import { screenMaxWidth } from '../utils';
import { TableTheme } from '../theme';

interface TableStyledProps extends StyledThemeTypeProps<TableTheme> {
  bordered?: boolean;
  striped?: boolean;
  hovered?: boolean;
  responsive?: keyof Size;
  size?: keyof Size;
}

interface TableProps extends TableStyledProps {
  children: React.ReactNode;
}

const borderedCss = ({ theme, bordered, themeType }: TableStyledProps) => {
  const colors = theme.table.colors[themeType];
  return (
    bordered &&
    css`
      border: ${colors && colors.borderedBorderColor};
      & th,
      & td {
        border: ${colors && colors.borderedBorderColor};
      }
      & thead th,
      & thead td {
        border-bottom-width: 2px;
      }
    `
  );
};

const stripedCss = ({ theme, striped, themeType }: TableStyledProps) => {
  const colors = theme.table.colors[themeType];
  return (
    striped &&
    css`
      & tbody tr:nth-of-type(odd) {
        background-color: ${colors && colors.stripedBackgroundColor};
      }
    `
  );
};

const hoveredCss = ({ theme, themeType, hovered }: TableStyledProps) => {
  const colors = theme.table.colors[themeType];
  return (
    hovered &&
    css`
      & tbody tr:hover {
        background-color: ${colors && colors.backgroundColorHoverFocus};
      }
    `
  );
};

const headCss = ({ theme, themeType }: TableStyledProps) => {
  const colors = theme.table.colors[themeType];
  return (
    colors &&
    css`
      & thead th {
        color: ${colors.head.color};
        background-color: ${colors.head.backgroundColor};
        border-color: ${colors.head.borderColor};
      }
    `
  );
};

const responsiveCss = ({ theme, responsive }: TableStyledProps) =>
  responsive &&
  screenMaxWidth[responsive]`
      display: block;
      width: 100%;
      overflow-x: auto;
      border: 0;
    `;

const TableStyled = styled.table<TableStyledProps>`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  & th,
  & td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: ${({ theme, themeType }) => {
      const colors = theme.table.colors[themeType];
      return colors && `${theme.table.border.top} ${colors.borderColor}`;
    }};
  }

  & thead th {
    vertical-align: bottom;
    border-bottom: ${({ theme, themeType }) => {
      const colors = theme.table.colors[themeType];
      return colors && `${theme.table.border.theadBottom} ${colors.borderColor}`;
    }};
  }
  & tbody + tbody {
    border-top: ${({ theme, themeType }) => {
      const colors = theme.table.colors[themeType];
      return colors && `${theme.table.border.tbodyTop} ${colors.borderColor}`;
    }};
  }
  & + & {
    background-color: ${({ theme, themeType }) => {
      const colors = theme.table.colors[themeType];
      return colors && colors.backgroundColor;
    }};
  }

  ${borderedCss}
  ${stripedCss} 
  ${hoveredCss} 
  ${headCss}
  ${responsiveCss}
`;

export const Table = ({ children, theme: themeProps, ...attribs }: TableProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.table;
  return (
    <TableStyled theme={theme} {...attribs}>
      {children}
    </TableStyled>
  );
};

export const defaultTheme: TableTheme = {
  table: {
    colors: {},
    border: {}
  },
  tr: {
    colors: {
      default: {},
      error: {},
      success: {},
      warning: {}
    }
  }
};

Table.defaultProps = {
  themeType: 'default',
  theme: defaultTheme
};
