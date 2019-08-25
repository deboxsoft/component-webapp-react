import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { CardTitle } from './CardTitle';
import { StyledThemeTypeProps, ImagesResponsive } from '../types';
import { CardImageTheme, cardImageTheme } from './types';
import { Image } from '../image';

interface Overlay {
  title: string;
  subtitle: string;
}

interface CardImageStyledProps extends StyledThemeTypeProps<CardImageTheme> {
  noRadius?: boolean;
}

interface CardImageProps extends Partial<CardImageStyledProps> {
  overlay?: Overlay;
  src?: string;
  placeholder?: string;
  responsive?: ImagesResponsive;
}

const styledCardImage = (props: CardImageStyledProps) => css`
  position: relative;
  padding: 0;
  margin: 0;
  overflow: hidden;

  &:not(:first-child):last-child {
    padding-top: 16px;
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 16px;
    text-align: right;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    object-fit: cover;
  }
`;

const CardImageStyled = styled.div<CardImageStyledProps>`
  ${styledCardImage}
`;

/**
 * Cards header displays title information
 */

export const CardImage = ({
  theme: themeProps,
  src,
  responsive,
  placeholder,
  overlay: imageOverlay,
  ...attribs
}: CardImageProps) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.cardImage || cardImageTheme;
  const renderOverlay = () => {
    if (!imageOverlay || Object.keys(imageOverlay).length === 0) {
      return '';
    }
    return (
      <div className="image-overlay">
        <CardTitle {...attribs}>{imageOverlay.title || ''}</CardTitle>
        <CardTitle {...attribs} subtitle>
          {imageOverlay.subtitle || ''}
        </CardTitle>
      </div>
    );
  };

  return (
    <CardImageStyled theme={theme} {...attribs}>
      <Image responsive={responsive} placeholder={placeholder} src={src} />
      {renderOverlay()}
    </CardImageStyled>
  );
};
