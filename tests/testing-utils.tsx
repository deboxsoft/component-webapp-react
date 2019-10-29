import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components/macro';

const theme = {};

const MockComponent = ({ children }: { children: React.ReactChild }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const customRender = (ui, options) => {
  render(ui, { wrapper: MockComponent, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
