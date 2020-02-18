import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, color, select } from '@storybook/addon-knobs';
import { action } from "@storybook/addon-actions";
import { Viewer, ExternalBaseLayer } from '../components/viewer';
import { ActiveMapTool, IMapView } from '../api/common';

storiesOf("New Map Viewer Components", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
        {storyFn()}
    </div>)
    .add("New Map Viewer", () => {
        const groupId = 'GROUP-ID1';
        const toolOpts: any = {
            "Pan": ActiveMapTool.Pan,
            "Select": ActiveMapTool.Select,
            "WMS Query": ActiveMapTool.WmsQueryFeatures,
            "Zoom": ActiveMapTool.Zoom
        };
        const tool = select("Active Tool", toolOpts, ActiveMapTool.Pan, groupId);
        const indicatorColor = color("Color", "#0000ff", groupId);
        const [view, setView] = React.useState<IMapView | undefined>(undefined);
        const hZoomToView = action("onRequestZoomToView");
        const onRequestZoomToView = (v: IMapView) => {
            hZoomToView(v);
            setView(v);
        }
        return <Viewer
            tool={tool}
            view={view}
            mapName="Test"
            indicatorColor={indicatorColor}
            indicatorPosition="top"
            onRequestZoomToView={onRequestZoomToView}
            onContextMenu={action("onContextMenu")}>
            <ExternalBaseLayer name="OpenStreetMap" kind="OSM" />
        </Viewer>;
    })
    .add("Orphaned ExternalBaseLayer", () => <ExternalBaseLayer name="OpenStreetMap" kind="OSM" />)