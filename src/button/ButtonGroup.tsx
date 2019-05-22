import styled, { css } from 'styled-components/macro';
import { StyledProps } from '../types';
import { ButtonGroupTheme } from '../theme';

interface Props extends StyledProps<ButtonGroupTheme> {
  lg?: boolean;
  sm?: boolean;
  vertical?: boolean;
}

const size = (props: Props) => {
  const { font, padding } = props.theme.buttonGroup;
  if (props.lg) {
    return css`
      padding: ${padding.lg};
      font-size: ${font.size.lg};
      line-height: 1.5;
    `;
  } else if (props.sm) {
    return css`
      padding: ${padding.sm};
      font-size: ${font.size.sm};
      line-height: 1.5;
    `;
  }

  return css`
    padding: ${padding.default};
    font-size: ${font.size.default};
    line-height: 1.5;
  `;
};

const vertical = (props: Props) => {
  if (props.vertical) {
    return css`
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      & > button {
        width: 100%;
        &:not(:last-child) {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        &:not(:first-child) {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    `;
  }

  return css`
    & > button {
      &:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  `;
};

export const ButtonGroup = styled.div<Props>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  & > button {
    line-height: 1.5;
    position: relative;
    flex: 0 1 auto;
    &:hover {
      z-index: 1;
    }
    ${props => size(props)};
  }
  ${props => vertical(props)};
`;

ButtonGroup.defaultProps = {};
