import { keyframes } from 'styled-components/macro';

export const perspectiveLeft = keyframes`
  0% {
    transform-origin: 0 100%;
    transform: perspective(800px) rotateX(0deg);
  }

  100% {
    transform-origin: 0 100%;
    transform: perspective(800px) rotateX(-180deg);
  }
`;
