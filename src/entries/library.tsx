import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "../components/app-layout";
import "../styles/index.css";

require("es6-promise").polyfill();
require('isomorphic-fetch');

export = {
    __DEV__: __DEV__,
    Application: App.ApplicationViewModel,
    Externals: {
        React: React,
        ReactDOM: ReactDOM
    }
};