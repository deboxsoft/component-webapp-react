---
to: "src/theme/<%= path %>/index.ts"
inject: true
after: export
skip_if: <%= h.inflection.camelize(name) %>
---
  <%= h.inflection.camelize(name, true) %>: <%= h.inflection.camelize(name, true) %>Theme.<%= h.inflection.camelize(name, true) %>,