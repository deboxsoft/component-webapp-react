import { keyframes } from 'styled-components/macro';

export const perspectiveUp = keyframes`
  0% {
    transform-origin: 100% 0;
    transform: perspective(800px) rotateY(0deg);
  }

  100% {
    transform-origin: 100% 0;
    transform: perspective(800px) rotateY(180deg);
  }
`;
