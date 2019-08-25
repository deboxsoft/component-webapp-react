import uniqueId from 'lodash/uniqueId';

export const getId = (label: string) => {
  return uniqueId(
    label
      .split('[')
      .join('_')
      .replace(']', '_')
  );
};
