import React, { useState, useEffect, useRef } from 'react';
import { Chunk, Navigation, Route, Subscription } from 'navi';
import { ScrollHash, ScrollHashBehavior } from './ScrollHash';

export const NavigationContext = React.createContext<NavigationValue>({} as any);

export interface NavigationValue {
  navigation: Navigation;

  steadyRoute?: Route;
  busyRoute?: Route;

  // The routes that haven't been used yet. Initially identical to routingState.routes
  unconsumedSteadyRouteChunks?: Chunk[];
}

export interface NavigationProviderProps {
  children?: React.ReactNode;
  navigation: Navigation;
  scrollHashBehavior?: ScrollHashBehavior;
}

export interface NavigationConsumerProps {
  children: (navigation: Navigation) => React.ReactNode;
}

export interface LoadingRouteProps {
  children: (busyRoute?: Route) => React.ReactNode;
}

export interface CurrentRouteProps {
  /**
   * A render function that can be used to access the current route.
   */
  children: (route: Route) => React.ReactNode;
}

export type NavigationProviderState = NavigationValue;

const createNavigationState = <T extends any>(
  navigation: Navigation,
  route: Route<T>,
  steadyRoute?: Route<T>
): NavigationProviderState => {
  return route.type === 'busy'
    ? { steadyRoute, busyRoute: route, navigation }
    : { steadyRoute: route, busyRoute: undefined, navigation };
};

export const NavigationProvider = ({ children, navigation, scrollHashBehavior }: NavigationProviderProps) => {
  const subscription = useRef<Subscription>();
  const [navigationState, setNavigationState] = useState<NavigationProviderState>(() => {
    return createNavigationState(navigation, navigation.getCurrentValue());
  });

  useEffect(() => {
    if (!navigation) {
      throw new Error(`A <NavigationProvider> component must receive a "navigation" prop.`);
    }
    const handleNavigationSnapshot = (route: Route) => {
      setNavigationState(prevState =>
        createNavigationState(prevState.navigation, route, prevState.steadyRoute)
      );
    };

    const handleError = (error: any) => {
      throw error;
    };
    subscription.current = navigation.subscribe(handleNavigationSnapshot, handleError);
    setNavigationState(prevState =>
      createNavigationState(navigation, navigation.getCurrentValue(), prevState.steadyRoute)
    );

    return () => {
      if (subscription.current) {
        subscription.current.unsubscribe();
        subscription.current = undefined;
      }
    };
  }, [navigation]);

  return (
    <ScrollHash behavior={scrollHashBehavior}>
      <NavigationContext.Provider value={navigationState}>{children}</NavigationContext.Provider>;
    </ScrollHash>
  );
};

export const NavigationConsumer = ({ children }: NavigationConsumerProps) => (
  <NavigationContext.Consumer>{({ navigation }) => children(navigation)}</NavigationContext.Consumer>
);

export const LoadingRoute = ({ children }: LoadingRouteProps) => (
  <NavigationContext.Consumer>{({ busyRoute }) => children(busyRoute)}</NavigationContext.Consumer>
);

export function useLoadingRoute() {
  return React.useContext(NavigationContext).busyRoute;
}

export function CurrentRoute(props: CurrentRouteProps) {
  return (
    <NavigationContext.Consumer>
      {({ busyRoute, steadyRoute }) => {
        const route = steadyRoute || busyRoute;
        return route && props.children(route);
      }}
    </NavigationContext.Consumer>
  );
}

export function useCurrentRoute() {
  const { steadyRoute, busyRoute } = React.useContext(NavigationContext);
  return steadyRoute || busyRoute;
}
