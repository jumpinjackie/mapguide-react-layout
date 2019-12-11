import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import MapViewerContainer from '../containers/map-viewer';
import { MapDebugContext } from '../components/map-viewer-context';

storiesOf("Map Viewer", module)
    .addDecorator(withKnobs)
    .add("Default", () => {
        return <FakeApp>
            <MapDebugContext.Provider value={{ mock: true }}>
                <div style={{ width: 640, height: 480 }}>
                    <MapViewerContainer />
                </div>
            </MapDebugContext.Provider>
        </FakeApp>;
    });