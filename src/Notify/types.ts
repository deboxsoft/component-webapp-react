import {IconSizeKey} from '../icon/types'

export interface Type<T = any> {
  info: T;
  warning: T;
  success: T;
  error: T;
}

export interface Notification {
  id?: string;
  /**
   * Title notification
   */
  title?: string;

  /**
   * message
   */
  message: string;

  /**
   * type
   */
  type: keyof Type;

  /**
   * Icon name from font awesome - default is bell-o
   */
  iconName?: string;

  /**
   * Size of the icon
   */
  iconSize?: IconSizeKey;

  /**
   * Icon color
   */
  iconColor?: string;

  onClose?: (notification: Notification, index?: number) => void;

  onClick?: (notificarion: Notification, index?: number) => void;
}
