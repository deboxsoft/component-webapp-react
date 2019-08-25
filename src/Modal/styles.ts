/* eslint-disable @typescript-eslint/no-empty-interface */

import styled, { css } from 'styled-components/macro';
import { StyledThemeTypeProps } from '../types';
import { defaultTheme } from '../theme';

export interface ModalStyledProps extends StyledThemeTypeProps {
  position?: 'static' | 'fixed' | 'center' | 'relative' | 'absolute' | 'marker' | 'sticky';
}

export const ModalStyled = styled.div<ModalStyledProps>`
  ${props => css`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    display: fixed;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: ${props.position || 'fixed'};
    top: 0;
    width: 100vw;
  `}
`;

ModalStyled.defaultProps = {
  theme: defaultTheme
};
