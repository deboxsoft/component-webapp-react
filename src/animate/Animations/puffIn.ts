import { keyframes } from 'styled-components/macro';

export const puffIn = keyframes`
  0% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(2,2);
    filter: blur(2px);
  }

  100% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1,1);
    filter: blur(0px);
  }
`;