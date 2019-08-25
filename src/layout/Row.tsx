import React, { useContext } from 'react';
import styled, { css, ThemeProps, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive } from '../types';
import { Size } from '../utils/types';
import { GridTheme, gridTheme } from './types';

type RowStyledProps = ThemeProps<GridTheme>;

type DefaultProps = RowStyledProps;

interface RowProps extends Partial<RowStyledProps> {
  children: React.ReactNode;
}

const styledRow = (props: RowStyledProps) => css`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const RowStyled = styled.div<RowStyledProps>`
  ${styledRow}
`;

RowStyled.defaultProps = {
  theme: gridTheme
};

export const Row = ({ children, theme: themeProps, ...attribs }: RowProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext;
  return (
    <RowStyled theme={theme} {...attribs}>
      {children}
    </RowStyled>
  );
};
