import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Chunk, HeadChunk, NaviError, Route, TitleChunk, ViewChunk } from 'navi';
import { NavigationContext, NavigationValue } from './NavigationContext';
import { scrollToHash, ScrollHashBehavior } from './ScrollHash';

export interface ViewProps {
  /**
   * A render function that will be used to render the selected Chunk.
   */
  children?: (view: any, route: Route) => React.ReactNode;

  disableScrolling?: boolean;
  scrolHashlBehavior?: ScrollHashBehavior;

  /**
   * The first Chunk that matches this will be consumed, along with
   * all Chunks before it.
   *
   * By default, looks for a page, a redirect, or a switch with content.
   */
  where?: (chunk: Chunk) => boolean;
}

export const View: React.SFC<ViewProps> = function View(props: ViewProps) {
  return (
    <NavigationContext.Consumer>
      {context => <InnerView {...props} context={context} />}
    </NavigationContext.Consumer>
  );
};
View.defaultProps = {
  scrolHashlBehavior: 'smooth',
  where: (chunk: Chunk) => chunk.type === 'view'
};

interface InnerViewProps extends ViewProps {
  context: NavigationValue;
}

interface InnerViewState {
  route?: Route;
  childContext: NavigationValue;
  chunk?: ViewChunk;
  headAndTitleChunks?: (HeadChunk | TitleChunk)[];
  error?: Error;
}

// Memoize these to stop a bizarre react-helmet infinite loop bug when titles
// are recreated on each render
const titles: Record<string, React.ReactNode> = {};
function createTitleElement(str: string) {
  let title = titles[str];
  if (!title) {
    title = titles[str] = <title>{str}</title>;
  }
  return title;
}

class InnerView extends React.Component<InnerViewProps, InnerViewState> {
  static getDerivedStateFromProps(
    props: InnerViewProps,
    state: InnerViewState
  ): Partial<InnerViewState> | null {
    const route = props.context.steadyRoute || props.context.busyRoute;

    // If there's no steady route, then we'll need to wait until a steady
    // route becomes available.
    if (!route) {
      return null;
    }

    // Bail if nothing has changed
    if (
      state.route === route &&
      state.childContext &&
      state.childContext.busyRoute === props.context.busyRoute
    ) {
      return null;
    }

    const unconsumedChunks = props.context.unconsumedSteadyRouteChunks || route.chunks;

    let index = (props.where && unconsumedChunks.findIndex(props.where)) || -1;
    const errorSearchChunks = index === -1 ? unconsumedChunks : unconsumedChunks.slice(0, index + 1);
    const errorChunk = errorSearchChunks.find(chunk => chunk.type === 'error');
    if (errorChunk) {
      return {
        error: errorChunk.error || new Error('Unknown routing error')
      };
    }
    if (index === -1) {
      return null;
    }
    const chunk = unconsumedChunks[index] as ViewChunk;

    // Find any unconsumed head content that comes before and after this
    // Chunk.
    const headAndTitleChunks = unconsumedChunks
      .slice(0, index)
      .filter(_chunk => _chunk.type === 'title' || _chunk.type === 'head') as ((HeadChunk | TitleChunk)[]);
    for (index += 1; index < unconsumedChunks.length; index++) {
      const _chunk = unconsumedChunks[index];
      if (_chunk.type === 'busy' || _chunk.type === 'error' || (props.where && props.where(_chunk))) {
        break;
      }
      if (_chunk.type === 'title' || _chunk.type === 'head') {
        headAndTitleChunks.push(_chunk);
      }
    }

    return {
      chunk,
      headAndTitleChunks,
      route,
      childContext: {
        ...props.context,
        busyRoute: props.context.busyRoute,
        unconsumedSteadyRouteChunks: unconsumedChunks.slice(index)
      }
    };
  }

  componentDidMount() {
    this.handleUpdate();
  }

  componentDidUpdate(prevProps: InnerViewProps, prevState: InnerViewState) {
    this.handleUpdate(prevState);
  }

  handleUpdate(prevState?: InnerViewState) {
    const { route } = this.state;
    if (route && (!prevState || !prevState.route || prevState.route !== route)) {
      const prevRoute = prevState && prevState.route;
      const nextRoute = route;

      if (nextRoute && nextRoute.type !== 'busy') {
        if (
          prevRoute &&
          nextRoute.url.pathname === prevRoute.url.pathname &&
          nextRoute.url.search === prevRoute.url.search &&
          nextRoute.url.hash === prevRoute.url.hash
        ) {
          return;
        }

        const { scrolHashlBehavior, disableScrolling } = this.props;
        if (
          !disableScrolling &&
          (!prevRoute ||
            !prevRoute.url ||
            prevRoute.url.hash !== nextRoute.url.hash ||
            prevRoute.url.pathname !== nextRoute.url.pathname)
        ) {
          scrollToHash(
            nextRoute.url.hash,
            prevRoute && prevRoute.url && prevRoute.url.pathname === nextRoute.url.pathname
              ? scrolHashlBehavior
              : 'auto'
          );
        }
      }
    }
  }

  render() {
    const { error, childContext, route: route1 } = this.state;
    if (error) {
      throw error;
    }

    const { chunk, headAndTitleChunks } = this.state;
    const { context, children } = this.props;
    if (!chunk || !chunk.view) {
      const { Suspense } = React as any;
      if (Suspense) {
        throw context.navigation.getRoute();
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `A Navi <View> component was rendered before your Navigation store's state had become steady. Consider waiting before rendering with "await navigation.getRoute()", or upgrading React to version 16.6 to handle this with Suspense.`
        );
        return null;
      }
    }

    const helmet =
      headAndTitleChunks &&
      headAndTitleChunks.length &&
      React.createElement(
        Helmet,
        null,
        ...headAndTitleChunks.map(_chunk =>
          _chunk.type === 'title'
            ? createTitleElement(_chunk.title)
            : _chunk.head.type === React.Fragment || _chunk.head.type === 'head'
            ? _chunk.head.props.children
            : _chunk.head
        )
      );
    let content: React.ReactNode;

    let render: undefined | ((view: any, route: Route) => React.ReactNode);
    if (children) {
      render = children as (view: any, route: Route) => React.ReactNode;
      if (typeof render !== 'function') {
        throw new Error(
          `A Navi <View> expects any children to be a function, but instead received "${render}".`
        );
      }
      content = route1 && children(chunk.view, route1);
    } else if (chunk.view) {
      if (typeof chunk.view === 'function') {
        content = React.createElement(chunk.view, { route: context.steadyRoute });
      } else if (typeof chunk.view === 'string' || React.isValidElement(chunk.view)) {
        content = chunk.view;
      }
    } else {
      throw new Error(
        "A Navi <View> was not able to find a `children` prop, and was unable to find any body or head content in the consumed Route Chunk's `content`."
      );
    }

    return (
      <NavigationContext.Provider value={childContext}>
        {helmet || null}
        {// Clone the content to force a re-render even if content hasn't
        // changed, as Provider is a PureComponent.
        React.isValidElement(content) ? React.cloneElement(content) : content}
      </NavigationContext.Provider>
    );
  }
}

export class MissingChunk extends NaviError {
  context: NavigationValue;

  constructor(context: NavigationValue) {
    super(
      `A Navi <View> component attempted to use a Chunk that couldn't be found. This is likely due to its "where" prop.`
    );
    this.context = context;
  }
}
