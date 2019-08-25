import { keyframes } from 'styled-components/macro';

export const scaleUp = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
