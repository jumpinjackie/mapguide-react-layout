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
import CoordinateTrackerContainer from '../containers/coordinate-tracker';
//import MeasureContainer from '../containers/measure';

const MapDependentContainer = (props: any) => {
    return <table>
        <colgroup>
            <col width={250} />
            <col width="*" />
        </colgroup>
        <tbody>
            <tr>
                <td valign="top">
                    {props.children}
                </td>
                <td valign="top">
                    <MapDebugContext.Provider value={{ mock: true }}>
                        <div style={{ width: 640, height: 480 }}>
                            <MapViewerContainer />
                        </div>
                    </MapDebugContext.Provider>
                </td>
            </tr>
        </tbody>
    </table>;
}

storiesOf("Container Components", module)
    .addDecorator(withKnobs)
    .add("Map Viewer", () => <FakeApp>
        <MapDebugContext.Provider value={{ mock: true }}>
            <div style={{ width: 640, height: 480 }}>
                <MapViewerContainer />
            </div>
        </MapDebugContext.Provider>
    </FakeApp>)
    .add("Legend", () => <FakeApp>
        <MapDependentContainer>
            <LegendContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Legend - with base layer switcher", () => <FakeApp>
        <MapDependentContainer>
            <LegendContainer inlineBaseLayerSwitcher={true} />
        </MapDependentContainer>
    </FakeApp>)
    .add("Task Pane", () => <FakeApp>
        <TaskPaneContainer />
    </FakeApp>)
    .add("Scale Display", () => <FakeApp>
        <MapDependentContainer>
            <ScaleDisplayContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Selected Feature Count", () => <FakeApp>
        <MapDependentContainer>
            <SelectedFeatureCountContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Selection Panel", () => <FakeApp>
        <MapDependentContainer>
            <SelectionPanelContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Navigator", () => <FakeApp>
        <MapDependentContainer>
            <NavigatorContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Map Menu", () => <FakeApp>
        <MapDependentContainer>
            <MapMenuContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Base Layer Switcher", () => <FakeApp>
        <MapDependentContainer>
            <BaseLayerSwitcherContainer />
        </MapDependentContainer>
    </FakeApp>)
    .add("Coordinate Tracker", () => <FakeApp>
        <MapDependentContainer>
            <CoordinateTrackerContainer projections={["EPSG:4326", "EPSG:3857"]} />
        </MapDependentContainer>
    </FakeApp>);
    /*
    .add("Measure", () => <FakeApp>
        <MapDependentContainer>
            <MeasureContainer />
        </MapDependentContainer>
    </FakeApp>);
    */