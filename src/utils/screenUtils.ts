/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from 'styled-components/macro';
import { CSSObject } from 'styled-components/macro';
import { SizeKey, DeviceKey } from './types';

export type Screen = SizeKey | DeviceKey;

const screenSizes: Screen[] = ['giant', 'lg', 'desktop', 'default', 'tablet', 'md', 'phone', 'sm'];

// sizes for devices
export const sizes: Record<Screen, number> = {
  giant: 1440,
  lg: 1200,
  desktop: 1024,
  default: 992,
  tablet: 768,
  md: 768,
  sm: 576,
  phone: 420
};

const accumulatorInitial = {
  giant: () => ({}),
  lg: () => ({}),
  desktop: () => ({}),
  default: () => ({}),
  tablet: () => ({}),
  md: () => ({}),
  phone: () => ({}),
  sm: () => ({})
};

export const screenMaxWidth = screenSizes.reduce<Record<Screen, Function>>((accumulator, label) => {
  accumulator[label] = (first: CSSObject | TemplateStringsArray, ...args: any) => {
    return css`
      @media (max-width: ${sizes[label]}px) {
        ${css(first, ...args)};
      }
    `;
  };
  return accumulator;
}, accumulatorInitial);

export const screenMinWidth = screenSizes.reduce<Record<Screen, Function>>((accumulator, label) => {
  const acc = (first: CSSObject | TemplateStringsArray, ...args: any) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(first, ...args)};
    }
  `;
  return accumulator;
}, accumulatorInitial);
