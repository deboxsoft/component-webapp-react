import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { OnClickedProps, StyledThemeTypeProps } from '../types';
import { CardTheme, cardTheme } from './types';
import { Size } from '../utils/types';

interface CardStyledProps extends StyledThemeTypeProps<CardTheme> {
  noRadius?: boolean;
  size: keyof Size;
}

interface CardProps extends Partial<CardStyledProps>, OnClickedProps {
  children?: React.ReactNode;
}

const borderRadius = ({ noRadius, theme, size }: CardStyledProps) => {
  if (noRadius) {
    return css`
      border-radius: 0;
    `;
  }
  return css`
    border-radius: ${theme.borderRadius[size]};
  `;
};

const cardStyled = (props: CardStyledProps) => {
  const { theme, themeType, size } = props;
  const colors = theme.colors[themeType];
  return css`
    background-color: ${colors && colors.backgroundColor};
    border: ${theme.border[size]};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.1);

    &:focus {
      text-decoration: none;
    }

    &:hover {
      text-decoration: none;
    }

    ${borderRadius(props)}
  `;
};

export const CardStyled = styled.div<CardStyledProps>`
  ${cardStyled}
`;

CardStyled.defaultProps = {
  themeType: 'default',
  size: 'default'
};

export const Card = ({ children, theme: themeProps, ...attribs }: CardProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.card || cardTheme;
  return <CardStyled theme={theme} {...attribs}>{children}</CardStyled>;
};
