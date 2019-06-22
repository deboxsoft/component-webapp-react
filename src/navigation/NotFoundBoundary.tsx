/* eslint-disable react/no-unused-state */
import React from 'react';
import { NotFoundError } from 'navi';
import { NavigationContext, NavigationValue } from './NavigationContext';

interface NotFoundProps {
  children?: React.ReactNode;
  render: (error: NotFoundError) => React.ReactNode;
}

interface InnerNotFoundBoundaryProps extends NotFoundProps {
  context: NavigationValue;
}

export const InnerNotFoundBoundary: React.FunctionComponent<InnerNotFoundBoundaryProps> = (
  props: InnerNotFoundBoundaryProps
) => {
  const { context, children, render } = props;
  const { steadyRoute } = context;
  if (steadyRoute && steadyRoute.error instanceof NotFoundError) {
    return <>{render(steadyRoute.error)}</>;
  }
  return <>{children}</>;
};

export const NotFoundBoundary = (props: NotFoundProps) => (
  <NavigationContext.Consumer>
    {context => context && <InnerNotFoundBoundary context={context} {...props} />}
  </NavigationContext.Consumer>
);
