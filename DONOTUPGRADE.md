# Packages which cannot be upgraded until further notice

## Blueprint

Current version used: `1.40.0`

Reason for staying at this version: While Blueprint v3 is a mostly seamless upgrade, it bloats our final viewer bundle to an unacceptable level due to bundling all SVG icons. Until a solution for [this](https://github.com/palantir/blueprint/issues/2193) is found, we cannot upgrade.

## OpenLayers

Current version used: `4.6.5`

Reason for staying at this version: We can no longer generate a usable `d.ts` for OpenLayers 5.x with [jsdoc-typescript-plugin](https://github.com/jumpinjackie/jsdoc-typescript-plugin). Hold off until OpenLayers 6.x where [TypeScript support should be integrated](https://github.com/openlayers/openlayers/pull/9178)

## react-redux

Current version used: `5.1.1`

Reason for staying at this version: Our viewer code makes usage of the legacy React Context API, which newer releases of `react-redux` have either removed or irreversably broken.

## react-measure

Current version used: `2.1.3`

Reason for staying at this version: Breaking API change in newer releases.

## ts-loader

Current version used: `5.3.3`

Reason for staying at this version: Newer versions break our build (https://github.com/TypeStrong/ts-loader/issues/919)