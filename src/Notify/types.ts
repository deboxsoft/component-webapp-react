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
  type?: string;

  /**
   * Icon name from font awesome - default is bell-o
   */
  iconName?: string;

  /**
   * Size of the icon
   */
  iconSize?: 'xsmall' | 'small' | 'normal' | 'large' | 'xlarge';

  /**
   * Icon color
   */
  iconColor?: string;

  onClose?: (notification: Notification) => void;

  onClick?: (notificarion: Notification) => void;
}
export default Notification;
