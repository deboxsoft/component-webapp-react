import { keyframes } from 'styled-components/macro';

export const slideIn = keyframes`
  0% {
    transform-origin: 0 0;
    transform: translateX(-100%);
  }

  100% {
    transform-origin: 0 0;
    transform: translateX(0%);
  }
`;
