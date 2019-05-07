<p align="center">
<a href="https://ajainvivek.github.io/preact-fluid/" target="_blank">
<img alt="Preact Fluid" title="Preact Fluid" src="https://i.imgur.com/pZZG2Cm.png" width="550">
</a>
</p>
<p align="center">Minimal <b>UI Kit</b> for Preact, with reusable components.</p>

[![Build Status](https://travis-ci.org/ajainvivek/preact-fluid.svg?branch=master)](https://travis-ci.org/ajainvivek/preact-fluid)
[![Dependencies](https://img.shields.io/david/ajainvivek/preact-fluid.svg)](https://david-dm.org/ajainvivek/preact-fluid)
[![DevDependencies](https://img.shields.io/david/dev/ajainvivek/preact-fluid.svg)](https://david-dm.org/ajainvivek/preact-fluid#info=devDependencies&view=list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![HitCount](http://hits.dwyl.io/ajainvivek/preact-fluid.svg)](http://hits.dwyl.io/ajainvivek/preact-fluid)

## Installation

Preact Fluid is available as an [npm package](https://www.npmjs.com/package/preact-fluid).

```sh
npm install preact-fluid --save
```

## Usage

Here is a quick example to get you started, it's all you need:

```jsx
import { render } from 'preact';
import { Button } from '@deboxsoft/component-web-react';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```

## Documentation

Check out our [documentation website](https://ajainvivek.github.io/preact-fluid/).
