import { keyframes } from 'styled-components/macro';

export const fadeInPulse = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
  }

  100%,
  70% {
    transform: scale(1);
  }
`;
