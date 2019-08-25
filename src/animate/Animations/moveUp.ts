import { keyframes } from 'styled-components/macro';

export const moveUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(200px);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
