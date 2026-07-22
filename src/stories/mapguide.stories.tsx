import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { FakeApp } from "./fake-app";
import { LegendContainer } from "../containers/legend";
import { SelectedFeatureCountContainer } from "../containers/selected-feature-count";
import { SelectionPanelContainer } from "../containers/selection-panel";
import { MapGuideMockMode } from "../components/mapguide-debug-context";
import { MapStoryFrame } from "./map-story-frame";
import { useElementContext } from "../components/elements/element-context";
import { About } from "../components/about";
import mapGuideSpecificDocs from "./docs/mapguide-specific.md";

export default {
  title: "Map and Map Interaction Components / MapGuide-specific",
  tags: ['no-visual-regression'],
  parameters: {
    docs: {
      description: {
        component: mapGuideSpecificDocs,
      },
    },
  },

  decorators: [
    withKnobs,
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
      <FakeApp mgMockMode={MapGuideMockMode.RenderPlaceholder}>
        <MapStoryFrame includeSelect={true}>{storyFn()}</MapStoryFrame>
      </FakeApp>
    ),
  ],
};

export const Legend = () => <LegendContainer />;

export const LegendWithBaseLayerSwitcher = {
  render: () => <LegendContainer inlineBaseLayerSwitcher={true} />,

  name: "Legend - with base layer switcher",
};

export const SelectedFeatureCount = () => {
  const { Card, Heading } = useElementContext();
  return <>
    <Card>
      <Heading level={5}>
        <a href="#">Selected Feature Count</a>
      </Heading>
      <p>
        Click the test select button to simulate a map selection request. The
        selection count should display below
      </p>
    </Card>
    <SelectedFeatureCountContainer />
  </>
};

export const SelectionPanel = () => <SelectionPanelContainer />;

export const AboutViewer = {
  render: () => <About />,
  name: "About",
};
