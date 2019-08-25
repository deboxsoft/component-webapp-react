interface Position {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

export const positioning = (position: Position | string) =>
  typeof position === 'string'
    ? position
    : `${position.top || '0'} ${position.right || '0'} ${position.bottom || '0'} ${position.left || '0'}`;
