import React, { cloneElement, useEffect, createRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { Keyframes } from 'styled-components/macro';
import * as Animations from './Animations';

type AnimationsType = typeof Animations;
type KeyAnimations = keyof AnimationsType;

interface Props {
  children?: React.ReactChildren;
  /**
   * Component to be animated
   */
  component?: React.ReactElement;

  keyframe?: Keyframes;

  /**
   * Animation properties
   */
  animation?: { name?: KeyAnimations } & Partial<{
    active?: boolean;
    duration?: number | string;
    timingFunction?: string;
    delay?: string;
    iterationCount?: number;
    direction?: string;
    fillMode?: string;
    playState?: string;
    onStart?: Function;
    onComplete?: Function;
    onIteration?: Function;
  }>;
}

/**
 * Wrapper for animating the external component
 *
 * @example ./../../docs/components/Animate.md
 */
export const Animate = ({ component = <div />, children, animation = {}, keyframe, ...props }: Props) => {
  const animateRef = createRef<HTMLElement>();
  const {
    name: nameAnimation,
    duration = '500ms',
    timingFunction = 'linear',
    delay = '0s',
    iterationCount = 0,
    direction = '',
    fillMode = '',
    playState = '',
    active = true
  } = animation;
  const Component = React.forwardRef((_props: object | React.RefAttributes<HTMLElement>, ref) => {
    return cloneElement(component, { ref, ..._props }, children);
  });
  const handleAnimationStart = () => {
    if (animation && typeof animation.onStart === 'function') {
      animation.onStart(animateRef, animation);
    }
  };
  const handleAnimationComplete = () => {
    if (animation && typeof animation.onComplete === 'function') {
      animation.onComplete(animateRef, animation);
    }
  };

  const handleAnimationIteration = () => {
    if (animation && typeof animation.onIteration === 'function') {
      animation.onIteration(animateRef, animation);
    }
  };

  useEffect(() => {
    if (animation && animateRef.current) {
      animateRef.current.addEventListener('animationstart', handleAnimationStart);
      animateRef.current.addEventListener('animationend', handleAnimationComplete);
      animateRef.current.addEventListener('animationiteration', handleAnimationIteration);
    }
  });

  const _keyframe = keyframe || nameAnimation;

  const AnimatedComponent = styled(Component).attrs({
    ...props
  })`
    ${active &&
      css`
        animation-name: ${_keyframe};
        animation-duration: ${duration};
        animation-timing-function: ${timingFunction};
        animation-delay: ${delay};
        animation-iteration-count: ${iterationCount};
        animation-direction: ${direction};
        animation-fill-mode: ${fillMode};
        animation-play-state: ${playState};
      `};
  `;

  return <AnimatedComponent ref={animateRef} />;
};
