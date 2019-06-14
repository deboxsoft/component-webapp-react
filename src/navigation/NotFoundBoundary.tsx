/* eslint-disable react/no-unused-state */
import React from 'react';
import { NotFoundError } from 'navi';
import { NavigationContext, NavigationValue } from './NavigationContext';

interface NotFoundProps {
  render: (error: NotFoundError) => React.ReactNode;
}

interface InnerNotFoundBoundaryProps extends NotFoundProps {
  context: NavigationValue;
}

interface InnerNotFoundBoundaryState {
  error?: NotFoundError;
  errorPathname?: string;
  errorInfo?: any;
}

class InnerNotFoundBoundary extends React.Component<InnerNotFoundBoundaryProps, InnerNotFoundBoundaryState> {
  static getDerivedStateFromProps(
    props: InnerNotFoundBoundaryProps,
    state: InnerNotFoundBoundaryState
  ): Partial<InnerNotFoundBoundaryState> | null {
    const { steadyRoute } = props.context;
    if (state.error && steadyRoute && steadyRoute.url.pathname !== state.errorPathname) {
      return {
        error: undefined,
        errorPathname: undefined,
        errorInfo: undefined
      };
    }
    return null;
  }

  constructor(props: InnerNotFoundBoundary) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps: InnerNotFoundBoundaryProps, prevState: InnerNotFoundBoundaryState) {
    const { state } = this;
    if (state.error && !prevState.error) {
      // TODO: scroll to top / render title if necessary
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (error instanceof NotFoundError) {
      const { context } = this.props;
      const { steadyRoute } = context;
      this.setState({
        error,
        errorInfo,
        errorPathname: steadyRoute && steadyRoute.url.pathname
      });
    } else {
      throw error;
    }
  }

  render() {
    const { props, state } = this;
    if (state.error) {
      return props.render(state.error);
    }
    return props.children;
  }
}

export const NotFoundBoundary = (props: NotFoundProps) => (
  <NavigationContext.Consumer>
    {context => <InnerNotFoundBoundary context={context} {...props} />}
  </NavigationContext.Consumer>
);
