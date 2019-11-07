# Introduction

`mapguide-react-layout` is a modern map viewer for [MapGuide Open Source](http://mapguide.osgeo.org) and [Autodesk Infrastructure Map Server](http://www.autodesk.com/products/infrastructure-map-server/overview)

This API documentation covers the `mapguide-react-layout` npm module (version **0.12.0**)

For an example of how this npm module is used, check out the [mapguide-react-layout-example](https://github.com/jumpinjackie/mapguide-react-layout-example)

# Browser Support

`mapguide-react-layout` is supported on all modern browsers
 * Chrome
 * Firefox
 * Safari
 * IE11
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

Modules in `mapguide-react-layout` can be imported in two ways

For all the modules referenced on the right hand side, prepend `mapguide-react-layout/lib` for the actual module name to import

For example the module ["api/common"](modules/_api_common_.html) should be imported as `mapguide-react-layout/lib/api/common`

For convenience you can also import whatever you require through the "catch-all" `mapguide-react-layout` module.

For example, the ["setCurrentView"](modules/_actions_map_.html#setcurrentview) action can be imported in two ways:

 * `import { setCurrentView } from "mapguide-react-layout/lib/actions/map";`
 * `import { setCurrentView } from "mapguide-react-layout";`