//import '@storybook/addon-console';
//import { configure, addParameters } from '@storybook/react';
//import { INITIAL_VIEWPORTS, DEFAULT_VIEWPORT } from "@storybook/addon-viewport";
import * as React from "react";
import {
  Description,
  Subtitle,
  Title,
} from "@storybook/blocks";
import "../src/stories/story-bootstrap";
import "../src/styles/index.css";
/*
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: DEFAULT_VIEWPORT,
  },
});

const req = require.context("../src/stories", true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}
configure(loadStories, module);
*/

/**
 * Custom docs page that includes markdown content via description
 */
const CustomDocsPage = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Title),
    React.createElement(Subtitle),
    React.createElement(Description)
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    page: CustomDocsPage,
  },
}