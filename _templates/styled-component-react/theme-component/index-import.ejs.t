---
to: "src/theme/<%= path %>/index.ts"
inject: true
after: import
skip_if: "import { <%= h.inflection.camelize(name, true) %>Theme } from './<%= h.inflection.camelize(name, true) %>'"
---
import { <%= h.inflection.camelize(name, true) %>Theme } from './<%= h.inflection.camelize(name, true) %>'