/* eslint-disable no-param-reassign */
import React, { useCallback, useState, forwardRef, useImperativeHandle } from 'react';
import uniqueId from 'lodash/uniqueId';
import { List } from 'immutable';
import { NotifyPortal } from './NotifyPortal';
import { NotifyPanel } from './NotifyPanel';
import { Notification } from './types';
import { defaultTheme } from './styles';

interface NotifyProps extends Notification {
  /**
   * Unique id for the notification wrapper
   */
  id?: string;

  position?: 'top' | 'bottom';

  /**
   * A callback function that will be called when the notification is successfully added. The first argument is the original notification e.g. `function (notification) { console.log(notification.title + 'was added'); }`
   */
  onAdd?: (notification: Notification) => void;

  autoClose?: number;
}

/**
 * Notification system for application with customizable features
 *
 * @example ./../../docs/components/Notify.md
 */
export const Notify = forwardRef(({ id, position, onAdd, onClose, ...attribs }: NotifyProps, ref) => {
  const [notifications, setNotifications] = useState(List<Notification>());

  const guid = useCallback(() => {
    return uniqueId('_notify__');
  }, []);

  const add = (notification: Notification) => {
    notification.id = notification.id || guid();
    notification.type = notification.type || 'info';
    // onAdd callback
    if (onAdd) onAdd(notification);
    setNotifications(notifications.push(notification));
  };

  useImperativeHandle(ref, () => ({
    add
  }));

  const handleClose = (notification: Notification, index?: number) => {
    if (index) {
      setNotifications(notifications.remove(index));
    } else {
      setNotifications(notifications.filter(_notification => _notification.id != notification.id));
    }
    if (onClose) onClose(notification);
  };

  const renderNotification = () => {
    return notifications.map((notification, index) => {
      const _props = Object.assign(attribs, notification);

      return (
        <NotifyPanel
          key={notification.id}
          index={index}
          notification={notification}
          onClose={handleClose}
          {..._props}
        />
      );
    });
  };

  return (
    <NotifyPortal portalId={id} position={position}>
      {renderNotification()}
    </NotifyPortal>
  );
});

Notify.defaultProps = {
  id: '__notify-container',
  type: 'info',
  title: '',
  message: '',
  autoClose: 5,
  iconName: 'bell-o',
  iconColor: 'dark gray',
  iconSize: 'xs'
};
