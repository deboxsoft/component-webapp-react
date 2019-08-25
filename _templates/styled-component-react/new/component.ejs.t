---
to: "src/<%= path ? path + '/' + h.inflection.camelize(name) : h.inflection.camelize(name) %>.tsx"
---

import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components/macro';
import { StyledThemeProps } from '../types';
import { <%= h.inflection.camelize(name) %>Theme, <%= h.inflection.camelize(name, true) %>Theme } from '../theme';
import { <%= h.inflection.camelize(name) %>BaseProps, <%= h.inflection.camelize(name) %>StyledProps, <%= h.inflection.camelize(name) %>Theme, Theme } from './types';

interface <%= h.inflection.camelize(name) %>Props extends Partial<<%= h.inflection.camelize(name, true) %>>BaseProps {
  children: React.ReactNode;
  theme?: {
    <%= h.inflection.camelize(name, true) %>: <%= h.inflection.camelize(name) %>Theme;
  }
}


export const <%= h.inflection.camelize(name) %>Styled = styled.div<<%= h.inflection.camelize(name) %>StyledProps>`
`;


<%= h.inflection.camelize(name) %>Styled.defaultProps = {
};

const <%= h.inflection.camelize(name) %> = ({ theme: themeProps, children, ...attribs }: <%= h.inflection.camelize(name) %>Props) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeProps || themeContext.<%= h.inflection.camelize(name, true) %> || <%= h.inflection.camelize(name, true) %>Theme;
  return (
    <<%= h.inflection.camelize(name) %>Styled theme={theme.<%= h.inflection.camelize(name, true) %>} {...attribs}>
      {children}
    </<%= h.inflection.camelize(name) %>Styled>
  );
};
