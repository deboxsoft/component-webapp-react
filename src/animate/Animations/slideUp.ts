import { keyframes } from 'styled-components/macro';

export const slideUp = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateY(0%);
  }

  100% {
    transform-origin: 0 0;
    transform: translateY(-100%);
  }
`;
