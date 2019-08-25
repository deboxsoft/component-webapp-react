import React, { useRef, useCallback, useState, createRef } from 'react';
import { Notification } from './types';
import { OnClickedProps } from '../types';
import { Icon } from '../icon';
import { StyledNotify, NotifyStyledProps, defaultTheme } from './styles';

export interface NotifyPanelProps extends NotifyStyledProps, Notification {
  notification: Notification;

  /**
   * Delay in seconds for the notification go away. Set this to 0 to not auto-close the notification.
   */
  autoClose?: number;
  index: number;
}

type DefaultProps = NotifyStyledProps;

/**
 * Notification panel
 */
export const NotifyPanel = ({
  notification,
  index,
  type = 'info',
  iconColor = 'darkgray',
  iconName = 'bell-o',
  className: _className,
  iconSize = 'sm',
  onClick,
  onClose,
  autoClose = 5,
  ...attribs
}: NotifyPanelProps) => {
  const node = createRef<HTMLDivElement>();
  const [className, setClassName] = useState<string | undefined>(_className);

  const handleClose = () => {
    if (onClose) onClose(notification, index);
  };

  const handleClick = () => {
    if (onClick) onClick(notification, index);
  };

  const close = useCallback(() => {
    const notificationElement = node.current;

    // close the notitication
    setClassName(`${className} close`);

    // destroy the notification after 500ms
    setTimeout(() => {
      notificationElement && notificationElement.remove();
    }, 500);
  }, [className, node]);

  if (autoClose > 0) {
    setTimeout(() => {
      close();
    }, autoClose * 1000);
  }

  return (
    <StyledNotify
      ref={node}
      type={notification.type || type}
      id={notification.id}
      onClick={handleClick}
      className={className}
      {...attribs}
    >
      <div className="notification-icon">
        <Icon
          name={notification.iconName || iconName}
          size={notification.iconSize || iconSize}
          color={notification.iconColor || iconColor}
        />
      </div>
      <div className="notification-body">
        <div
          className="notification-close"
          onClick={() => {}}
          onKeyDown={handleClose}
          role="button"
          tabIndex={0}
        />
        <h1 className="notification-title">{notification.title}</h1>
        <p className="notification-message">{notification.message}</p>
      </div>
    </StyledNotify>
  );
};

NotifyPanel.defaultProps = {
  theme: defaultTheme
};
