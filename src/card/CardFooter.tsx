import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { StyledThemeTypeProps } from '../types';
import { CardFooterTheme, cardFooterTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface CardFooterStyledProps extends StyledThemeTypeProps<CardFooterTheme> {
  noRadius?: boolean;
  size: keyof Size;
}

interface CardFooterProps extends Partial<CardFooterStyledProps> {
  children?: React.ReactNode;
}

export const CardFooterStyled = styled.div<CardFooterStyledProps>`
  padding: ${({ theme, size }) => {
    const paddingSize = theme.padding[size];
    return paddingSize && layoutUtils.positioning(paddingSize);
  }};
  background-color: ${({ theme, themeType }) => {
    const colors = theme.colors[themeType];
    return colors && colors.backgroundColor;
  }};
  border-top: ${({ theme }) => theme.border.top};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: -3px;
  &:last-child {
    border-radius: ${({ theme, noRadius, size }) => {
      const borderRadius = theme.borderRadius[size];
      return noRadius ? '0' : borderRadius;
    }};
  }
`;

CardFooterStyled.defaultProps = {
  themeType: 'default',
  size: 'default'
};

export const CardFooter = ({ children, theme: themeProps, ...attribs }: CardFooterProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.cardFooter || cardFooterTheme;
  return (
    <CardFooterStyled theme={theme} {...attribs}>
      {children}
    </CardFooterStyled>
  );
};
