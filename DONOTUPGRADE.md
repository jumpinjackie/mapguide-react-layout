# Packages which cannot be upgraded until further notice

## storybook

Current Version: `8.6.14`
Latest Version: `9.x`

We need to migrate away from the knobs addon

## @testing/library 

Current Version: `12.1.5`
Latest Version: `16.3.0`

Newer versions do not work with React 17

## react, react-dom

Current Version: `17.0.2`
Latest Version: `19.x.x`

Reasons for not upgrading: It's not so much the package itself may break our library, but rather the ecosystem of supplemental libraries surrounding it that may still require react 17

React 19 looks too new for our ecosystem

React 18 is the safest bet. We can upgrade to react 18 once we have fully decoupled ourselves from blueprint.js