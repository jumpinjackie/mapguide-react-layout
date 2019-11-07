# Packages which cannot be upgraded until further notice

## OpenLayers

Current version used: `4.6.5`

Reason for staying at this version: We can no longer generate a usable `d.ts` for OpenLayers 5.x with [jsdoc-typescript-plugin](https://github.com/jumpinjackie/jsdoc-typescript-plugin). Hold off until OpenLayers 6.x where [TypeScript support should be integrated](https://github.com/openlayers/openlayers/pull/9178)

## react-redux

Current version used: `5.1.1`

Reason for staying at this version: Our viewer code makes usage of the legacy React Context API, which newer releases of `react-redux` have either removed or irreversably broken.