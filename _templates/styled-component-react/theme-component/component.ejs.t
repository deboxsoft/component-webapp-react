---
to: "src/theme/<%=  path + '/' + h.inflection.camelize(name, true) %>.ts"
---
import { <%= h.inflection.camelize(name) %>Theme } from '../types';

export const <%= h.inflection.camelize(name, true) %>Theme: <%= h.inflection.camelize(name) %>Theme = {
  <%= h.inflection.camelize(name, true) %>: {}
};
