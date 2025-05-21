import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import { LegendContainer } from '../containers/legend';
import { SelectedFeatureCountContainer } from '../containers/selected-feature-count';
import { SelectionPanelContainer } from '../containers/selection-panel';
import { Card } from '@blueprintjs/core';
import { MapGuideMockMode } from '../components/mapguide-debug-context';
import { MapStoryFrame } from "./map-story-frame";

storiesOf("Map and Map Interaction Components / MapGuide-specific", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <FakeApp mgMockMode={MapGuideMockMode.RenderPlaceholder}>
        <MapStoryFrame includeSelect={true}>
            {storyFn()}
        </MapStoryFrame>
    </FakeApp>)
    .add("Legend", () => <LegendContainer />)
    .add("Legend - with base layer switcher", () => <LegendContainer inlineBaseLayerSwitcher={true} />)
    .add("Selected Feature Count", () => <>
        <Card>
            <h5 className="bp3-heading"><a href="#">Selected Feature Count</a></h5>
            <p>Click the test select button to simulate a map selection request. The selection count should display below</p>
        </Card>
        <SelectedFeatureCountContainer />
    </>)
    .add("Selection Panel", () => <SelectionPanelContainer />)