import { keyframes } from 'styled-components/macro';

export const buttonEffect = keyframes`
  to {
    opacity: 0;
    top: -6px;
    left: -6px;
    bottom: -6px;
    right: -6px;
    border-width: 6px;
  }
`;

export const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
