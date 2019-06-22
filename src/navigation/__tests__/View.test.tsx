import React, { Component } from 'react';
import { createMemoryNavigation, mount, route } from 'navi';
import { render } from '@testing-library/react';
import { InnerViewProps, useUpdateRoute, View, InnerView } from '../View';
import { NavigationProvider } from '../NavigationContext';

describe('View test', () => {
  const navigation = createMemoryNavigation({
    url: '/test/',
    routes: mount({
      '/test': route({
        title: 'title',
        view: class TestClassComponent extends Component<any> {
          render() {
            const { props } = this;
            return props.route.title;
          }
        }
      })
    })
  });
  it('cek functional', async () => {
    await navigation.getRoute();

    const { container } = render(
      <NavigationProvider navigation={navigation}>
        <View />
      </NavigationProvider>
    );
    const output = container;

    expect(output).toEqual('<div>title</div>');
  });
});
