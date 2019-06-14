/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Route, Matcher, createBrowserNavigation } from 'navi';
import { NavigationProvider, NavigationValue } from './NavigationContext';
import { ScrollHashBehavior } from './ScrollHash';
import { shallowCompare } from '../utils';

export interface RouterProps<Context extends object> {
  basename?: string;
  children?: React.ReactNode;
  context?: Context;
  scrollHashBehavior?: ScrollHashBehavior;
  history?: any;
  navigation?: Navigation<Context>;
  routes?: Matcher<Context>;
}

export const Router = <Context extends object = {}>({
  children,
  navigation: navigationProps,
  basename,
  context,
  history,
  routes
}: RouterProps<Context>) => {
  if (process.env.NODE_ENV !== 'production' && navigationProps) {
    if (basename) {
      console.warn(
        `Warning: <Router> can't receive both a "basename" and a "navigation" prop. Proceeding by ignoring "basename".`
      );
    }
    if (routes) {
      console.warn(
        `Warning: <Router> can't receive both a "routes" and a "navigation" prop. Proceeding by ignoring "routes".`
      );
    }
    if (history) {
      console.warn(
        `Warning: <Router> can't receive both a "history" and a "navigation" prop. Proceeding by ignoring "history".`
      );
    }
  }
  const navigation =
    navigationProps ||
    createBrowserNavigation({
      basename,
      history,
      routes,
      context
    });
  context && navigation.setContext(context);
  useEffect(() => {
    context && navigationProps && navigationProps.setContext(context);
  }, [navigationProps, context]);

  return <NavigationProvider navigation={navigation}>{children}</NavigationProvider>;
};
