import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { CardTitle } from './CardTitle';
import { StyledThemeTypeProps, ImagesResponsive } from '../types';
import { CardHeaderTheme, cardHeaderTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface CardHeaderStyledProps extends StyledThemeTypeProps<CardHeaderTheme> {
  size: keyof Size;
}

interface CardHeaderProps extends Partial<CardHeaderStyledProps> {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const CardHeaderStyled = styled.div<CardHeaderStyledProps>`
  padding: ${({ theme, size }) => {
    const paddingSize = theme.padding[size];
    return paddingSize && layoutUtils.positioning(paddingSize);
  }};
  padding-bottom: 0;
  margin: 0;

  &:last-child {
    padding-bottom: ${({ theme, size }) => {
      const paddingSize = theme.padding[size];
      return paddingSize && paddingSize.lastChildBottom;
    }};
  }
`;

CardHeaderStyled.defaultProps = {
  theme: cardHeaderTheme,
  themeType: 'default',
  size: 'default'
};

/**
 * Cards header displays title information
 */
export const CardHeader = ({ children, title, subtitle, theme: themeProps, ...attribs }: CardHeaderProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.cardHeader || cardHeaderTheme;
  return (
    <CardHeaderStyled theme={theme} {...attribs}>
      <CardTitle {...attribs}>{title}</CardTitle>
      {subtitle && (
        <CardTitle subtitle {...attribs}>
          {subtitle}
        </CardTitle>
      )}
      {children}
    </CardHeaderStyled>
  );
};
