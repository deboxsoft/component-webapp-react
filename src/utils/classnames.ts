type ClassName = string | object | [] | undefined | null;

export const classNames = (...args: ClassName[]) => {
  const classes: string[] = [];
  args.forEach(arg => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      const inner = classNames(...arg);
    } else if ((arg as object) && arg) {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
};
