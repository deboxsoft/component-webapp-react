import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { ImagesResponsive, StyledThemeProps } from '../types';
import { ContainerTheme, containerTheme } from './types';
import { screenMinWidth } from '../utils';
import { Size } from '../utils/types';

interface StyledContainerProps extends StyledThemeProps<ContainerTheme> {
  size: keyof Size;
  fluid?: boolean;
}

type DefaultProps = StyledContainerProps;

interface ContainerProps extends Partial<StyledContainerProps> {
  children: React.ReactNode;
}

const widthCss = ({ theme, size, fluid }: StyledContainerProps) => {
  if (fluid) {
    return css`
      width: ${theme.fluid};
    `;
  }
};

const ContainerStyled = styled.div<StyledContainerProps>`
  font-family: ${({ theme }) => theme.font.family};
  width: ${({ theme, size }) => theme.width};
  margin-right: auto;
  margin-left: auto;
  font-size: ${({ theme, size }) => {
    const fontSize = theme.font.size;
    return fontSize && fontSize[size];
  }};
  font-weight: ${({ theme, size }) => theme.font.weight};
  line-height: 1.5;
  box-sizing: border-box;

  ${({ size }) => {
    return screenMinWidth[size]`
        max-width: ${({ theme, fluid }: StyledContainerProps) =>
          fluid ? theme.maxWidth : theme.fluid.maxWidth}
    `;
  }}
`;

ContainerStyled.defaultProps = {
  size: 'default'
};

export const Container = ({ children, theme: themeProps, ...attribs }: ContainerProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.container || containerTheme;
  return (
    <ContainerStyled theme={theme} {...attribs}>
      {children}
    </ContainerStyled>
  );
};
