import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { StyledThemeTypeProps, ImagesResponsive } from '../types';
import { CardTitleTheme, cardTitleTheme } from './types';

type CardTitleStyledProps = StyledThemeTypeProps<CardTitleTheme>;

interface CardTitleProps extends Partial<CardTitleStyledProps> {
  children?: React.ReactNode;
  subtitle?: boolean;
}

const CardTitleStyled = styled.div<CardTitleStyledProps>`
  font-size: 20px;
  line-height: 32px;
  font-weight: 500;
  color: ${({ theme, themeType }) => {
    const colors = theme.colors[themeType];
    return colors && colors.color;
  }};
  margin: 0;
`;

const CardSubtitleStyled = styled(CardTitleStyled)`
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
  color: ${({ theme, themeType }) => {
    const colors = theme.subtitle.colors[themeType];
    return colors && colors.color;
  }};
`;

const defaultProps: Partial<CardTitleStyledProps> = {
  themeType: 'default'
};

CardTitleStyled.defaultProps = defaultProps;
CardSubtitleStyled.defaultProps = defaultProps;

const BaseComp = ({}) => {};

export const CardTitle = ({ children, theme: themeProps, subtitle, ...attribs }: CardTitleProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.cardTitle || cardTitleTheme;
  const Comp = subtitle ? CardSubtitleStyled : CardTitleStyled;
  return (
    <Comp theme={theme} {...attribs}>
      {children}
    </Comp>
  );
};
