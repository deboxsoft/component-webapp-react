import React, { useState } from 'react';
import styled, { css, ThemeProps } from 'styled-components/macro';
import { ImagesResponsive } from '../types';
import { ImageTheme } from '../theme';

interface StyledImageWrapperProps {
  inline?: boolean;
}

interface StyledImageProps extends ThemeProps<ImageTheme> {
  rounded?: boolean;
}

interface ImageProps extends StyledImageProps {
  className?: string;
  responsive?: ImagesResponsive;
  placeholder?: string;
  inline?: true;
  src?: string;
}

const ImageWrapperStyled = styled.div<StyledImageWrapperProps>`
  position: relative;
  overflow: hidden;

  ${props =>
    props.inline &&
    css`
      display: inline-flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    `};
`;

const ImageStyled = styled.img<StyledImageProps>`
  display: block;
  height: auto;
  width: 100%;
  margin: 0 auto;
  object-fit: cover;

  ${props => {
    const { theme, rounded } = props;
    return (
      rounded &&
      css`
        border-radius: ${theme.image && theme.image.borderRadius};
      `
    );
  }}
`;

/**
 * Progressive Image Loading with a blur effect option to reduce the page load time
 *
 * @example ./../../docs/components/Image.md
 */
export const Image = ({
  responsive,
  placeholder = '',
  className,
  inline,
  ...attribs
}: ImageProps) => {
  const [state, setState] = useState({
    placeholderHeight: 0,
    placeholderWidth: 0,
    imageLoaded: false
  });
  const handleImageLoaded = () => {
    setState({
      placeholderHeight: 0,
      placeholderWidth: 0,
      imageLoaded: true
    });
  };

  const handleImageErrored = () => {
    // TODO - Should re-fetch the image
  };

  const renderResponsiveImages = (images: ImagesResponsive = []) => {
    return images.map(image => {
      return <source srcSet={image.src} media={image.media} />;
    });
  };

  const placeholderOnLoad = (element: React.SyntheticEvent<HTMLImageElement>) => {
    if (!state.imageLoaded) {
      setState(_prev =>
        Object.assign(_prev, {
          placeholderHeight: element.currentTarget.offsetHeight,
          placeholderWidth: element.currentTarget.offsetWidth
        })
      );
    }
  };

  const renderPlaceholder = () => {
    if (placeholder)
      return (
        <ImageStyled
          src={placeholder}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: state.imageLoaded ? 0 : 1,
            filter: 'blur(5px)',
            transform: 'scale(1)',
            transition: 'opacity 1s linear'
          }}
          onLoad={placeholderOnLoad}
          {...attribs}
        />
      );
    return '';
  };

  return (
    <ImageWrapperStyled inline={inline} className={className}>
      <img placeholder={placeholder} alt="" />
      <div
        style={{
          height: `${state.placeholderHeight}px`,
          width: `${state.placeholderWidth}px`
        }}
      />
      <picture>
        {renderResponsiveImages(responsive)}
        <ImageStyled {...attribs} onLoad={handleImageLoaded} onError={handleImageErrored} />
      </picture>
      {renderPlaceholder()}
    </ImageWrapperStyled>
  );
};

Image.defaultProps = {
  theme: {
    image: {
      borderRadius: '50%'
    }
  }
};
