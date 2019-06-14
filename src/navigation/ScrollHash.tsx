import React, { createContext } from 'react';

export type ScrollHashBehavior = 'smooth' | 'auto';
interface ScrollHashProps {
  behavior?: ScrollHashBehavior;
  children: React.ReactNode;
}

export const ScrollHashContext = createContext<ScrollHashBehavior>('auto');

export const ScrollHash = ({ behavior, children }: ScrollHashProps) => {
  if (!behavior) {
    return <>{children}</>;
  }
  return <ScrollHashContext.Provider value={behavior}>{children}</ScrollHashContext.Provider>;
};

function scroll(left: number, top: number, behavior: ScrollHashBehavior) {
  if (behavior === 'auto') {
    window.scroll(left, top);
  } else {
    try {
      window.scroll({
        top,
        left,
        behavior
      });
    } catch (e) {
      window.scroll(left, top);
    }
  }
}

export function scrollToHash(
  hash: { slice: (arg0: number) => string },
  behavior: ScrollHashBehavior = 'auto'
) {
  if (hash) {
    const id = document.getElementById(hash.slice(1));
    if (id) {
      const { top, left } = id.getBoundingClientRect();
      scroll(left + window.pageXOffset, top + window.pageYOffset, behavior);

      // Focus the element, as default behavior is cancelled.
      // https://css-tricks.com/snippets/jquery/smooth-scrolling/
      id.focus();
    }
  } else {
    scroll(0, 0, behavior);
  }
}
