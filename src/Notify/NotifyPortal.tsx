import React, { useMemo, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { StyledNotifyWrapper, NotifyStyledProps, defaultTheme } from './styles';
import { NotifyTheme, Theme } from '../theme';

interface NotifyPortalProps extends Partial<NotifyStyledProps> {
  children: React.ReactNode;
  portalId?: string;
  position?: 'top' | 'bottom';
}

type DefaultProps = NotifyStyledProps;

/**
 * Notification Portal Component
 */
export const NotifyPortal = forwardRef(
  ({ children, portalId, position, ...attribs }: NotifyPortalProps, ref: React.Ref<HTMLDivElement>) => {
    const notifyNode = useMemo(() => {
      let portal = portalId && document.getElementById(portalId);
      if (!portal) {
        portal = document.createElement('div');
        if (portalId) portal.id = portalId;
        portal.style.position = 'fixed';
        if (position) portal.style[position] = '10px';
        portal.style.right = '10px';
        portal.style.overflow = 'hidden';
        document.body.appendChild(portal);
      }
      const _portal = portal;
      return (): HTMLElement => _portal;
    }, [portalId, position]);

    return createPortal(
      <StyledNotifyWrapper theme={defaultTheme} ref={ref} {...attribs}>
        {children}
      </StyledNotifyWrapper>,
      notifyNode()
    );
  }
);
