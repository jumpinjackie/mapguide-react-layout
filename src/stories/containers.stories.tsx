import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import { MapDebugContext } from '../components/map-viewer-context';
import LegendContainer from '../containers/legend';
import MapViewerContainer from '../containers/map-viewer';
import TaskPaneContainer from '../containers/task-pane';
import ScaleDisplayContainer from '../containers/scale-display';
import SelectedFeatureCountContainer from '../containers/selected-feature-count';
import SelectionPanelContainer from '../containers/selection-panel';
import NavigatorContainer from '../containers/navigator';
import MapMenuContainer from '../containers/map-menu';
import BaseLayerSwitcherContainer from '../containers/base-layer-switcher';

storiesOf("Container Components", module)
    .addDecorator(withKnobs)
    .add("Legend", () => <FakeApp>
        <LegendContainer />
    </FakeApp>)
    .add("Map Viewer", () => <FakeApp>
        <MapDebugContext.Provider value={{ mock: true }}>
            <div style={{ width: 640, height: 480 }}>
                <MapViewerContainer />
            </div>
        </MapDebugContext.Provider>
    </FakeApp>)
    .add("Task Pane", () => <FakeApp>
        <TaskPaneContainer />
    </FakeApp>)
    .add("Scale Display", () => <FakeApp>
        <ScaleDisplayContainer />
    </FakeApp>)
    .add("Selected Feature Count", () => <FakeApp>
        <SelectedFeatureCountContainer />
    </FakeApp>)
    .add("Selection Panel", () => <FakeApp>
        <SelectionPanelContainer />
    </FakeApp>)
    .add("Navigator", () => <FakeApp>
        <NavigatorContainer />
    </FakeApp>)
    .add("Map Menu", () => <FakeApp>
        <MapMenuContainer />
    </FakeApp>)
    .add("Base Layer Switcher", () => <FakeApp>
        <BaseLayerSwitcherContainer />
    </FakeApp>);