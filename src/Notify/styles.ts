/* eslint-disable no-shadow */
import styled, { css } from 'styled-components/macro';
import * as animations from '../animate/Animations';
import { StyledThemeProps } from '../types';
import { NotifyTheme } from '../theme';
import { Type } from './types';

export type NotifyStyledProps = StyledThemeProps<NotifyTheme>;

export const StyledNotifyWrapper = styled.div<NotifyStyledProps>`
  display: flex;
  margin: 5px;
`;

export const StyledNotify = styled.div<NotifyStyledProps & { type: keyof Type }>`
  display: table;
  background: ${({ theme, type = 'info' }) => theme.notify.colors[type].backgroundColor};
  border-radius: 4px;
  padding: 3px;
  height: 100%;
  min-height: 60px;
  min-width: 250px;
  max-width: 350px;
  cursor: pointer;
  animation: ${animations.slideInRight} 500ms ease-in;

  &.close {
    animation: ${animations.slideRight} 500ms ease-in forwards;
  }

  .notification-icon {
    animation: ${animations.shake} 1s linear;
    height: 100%;
    width: 60px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notification-body {
    position: relative;
    height: 100%;
    width: calc(100% - 68px);
    float: left;
    border-radius: 4px;
    padding: 4px;
    background-color: ${({ theme, type = 'info' }) => theme.notify.colors[type].backgroundColor};
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  }

  .notification-close {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 18px;
    cursor: pointer;
  }
  .notification-close:before {
    content: '\00d7';
    color: ${({ theme, type = 'info' }) => theme.notify.colors[type].color}};
  }

  &.notification-title {
    font-size: 16px;
    padding: 5px;
    margin: 0;
    color:  ${({ theme, type = 'info' }) => {
      return theme.notify.colors[type].color;
    }};
  }

  .notification-message {
    padding: 0 5px;
    margin: 0;
    font-size: 14px;
    color: ${({ theme, type = 'info' }) => theme.notify.colors[type].color};
  };
  }
`;

export const defaultTheme: NotifyTheme = {
  notify: {
    colors: {
      info: {},
      warning: {},
      error: {},
      success: {}
    }
  }
};
