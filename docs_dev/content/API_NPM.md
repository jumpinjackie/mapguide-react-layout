# Introduction

`mapguide-react-layout` is a modern map viewer for [MapGuide Open Source](http://mapguide.osgeo.org) and [Autodesk Infrastructure Map Server](http://www.autodesk.com/products/infrastructure-map-server/overview)

This API documentation covers the `mapguide-react-layout` npm module (version **0.14.10**)

For an example of how this npm module is used, check out the [mapguide-react-layout-example](https://github.com/jumpinjackie/mapguide-react-layout-example)

# Browser Support

`mapguide-react-layout` is supported on all modern browsers
 * Chrome
 * Firefox
 * Safari
 * Microsoft Edge

# Usage

`mapguide-react-layout` is available as:

 * A pre-built bundle (`viewer.js`)
 * A set of transpiled CommonJS modules on [npm](https://www.npmjs.com/package/mapguide-react-layout)

# TypeScript

`mapguide-react-layout` is written in [TypeScript](https://www.typescriptlang.org/) and `.d.ts` type definitions are included with the npm package.

Although you can consume this package with vanilla JavaScript, the API documentation assumes you are also using TypeScript

# Installation

With npm: `npm install --save mapguide-react-layout`

With yarn: `yarn add mapguide-react-layout`

# Importing Modules

All APIs provided/documented by this library are importable from the main `mapguide-react-layout`

> Previous releases allowed you to "piecemeal" import what you want by importing from `mapguide-react-layout/lib/path/to/module`. This style of import is no longer supported and you should just import whatever you require from `mapguide-react-layout` itself