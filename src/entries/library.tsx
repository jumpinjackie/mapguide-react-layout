import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "../components/app-layout";
import "../styles/index.css";

export = {
    __DEV__: __DEV__,
    Externals: {
        React: React,
        ReactDOM: ReactDOM
    },
    Viewer: App.AppLayoutViewModel
};