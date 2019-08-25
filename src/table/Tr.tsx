import React from 'react';
import styled, { css } from 'styled-components/macro';
import { defaultTheme } from './Table';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { TableTheme } from '../theme';

interface TrStyledProps extends StyledThemeProps<TableTheme> {
  active?: boolean;
  hovered?: boolean;
  themeType: 'error' | 'warning' | 'success' | 'default';
}

type DefaultProps = TrStyledProps;

interface TrProps extends TrStyledProps {
  children: React.ReactNode;
}

const hoveredCss = ({ theme, hovered, themeType }: TrStyledProps) => {
  const colors = theme.tr.colors[themeType];
  return (
    hovered &&
    css`
      &:hover > td,
      &:hover > th,
      & tbody tr:hover,
      & tbody tr:hover > th,
      & tbody tr:hover > td {
        background-color: ${colors.backgroundColorHoverFocus};
      }
    `
  );
};

const TrStyled = styled.div<TrStyledProps>`
  ${({ theme, active, hovered, themeType }) => {
    const colors = theme.tr.colors[themeType];
    if (active) {
      return css`
        & > th,
        & > td,
        & tbody tr:hover,
        & tbody tr:hover > th,
        & tbody tr:hover > td {
          background-color: ${colors.backgroundColorActive};
        }
      `;
    }
    return css<TrStyledProps>`
      & > th,
      & > td {
        background-color: ${colors.backgroundColor};
      }
      ${hoveredCss}
    `;
  }}
`;
TrStyled.defaultProps = {
  themeType: 'default',
  theme: defaultTheme
};
export const Tr = ({ children, ...attribs }: TrProps) => {
  return <TrStyled {...attribs}>{children}</TrStyled>;
};
