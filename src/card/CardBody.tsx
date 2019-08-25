import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { StyledThemeTypeProps, ImagesResponsive } from '../types';
import { CardBodyTheme, cardBodyTheme } from './types';
import { Size } from '../utils/types';
import { layoutUtils } from '../utils';

interface CardBodyStyledProps extends StyledThemeTypeProps<CardBodyTheme> {
  size: keyof Size;
}

interface CardBodyProps extends Partial<CardBodyStyledProps> {
  children: React.ReactNode;
}

const CardBodyStyled = styled.div<CardBodyStyledProps>`
  font-size: ${({ theme, size }) => {
    const fontSize = theme.font.size;
    return fontSize && fontSize[size];
  }};
  line-height: 24px;
  padding: ${({ theme, size }) => {
    const paddingSize = theme.padding[size];
    return paddingSize && layoutUtils.positioning(paddingSize);
  }};
  margin: ${({ theme }) => {
    const marginSize = theme.margin;
    return layoutUtils.positioning({
      top: '0',
      right: '0',
      bottom: marginSize.bottom,
      left: '0'
    });
  }};
  color: ${({ theme, themeType }) => {
    const colors = theme.colors[themeType];
    return colors && colors.color;
  }};

  &:last-child {
    padding-bottom: ${({ theme, size }) => {
      const paddingSize = theme.padding[size];
      return paddingSize && layoutUtils.positioning(paddingSize);
    }};
    margin-bottom: ${({ theme }) => theme.margin.lastChildBottom};
  }
`;

CardBodyStyled.defaultProps = {
  size: 'default',
  themeType: 'default',
  children: undefined
};

export const CardBody = ({ children, theme: themeProps, ...attribs }: CardBodyProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.cardBody || cardBodyTheme;
  return (
    <CardBodyStyled theme={theme} {...attribs}>
      {children}
    </CardBodyStyled>
  );
};
