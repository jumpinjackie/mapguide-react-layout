import { Button, Intent } from "@blueprintjs/core";
import * as React from "react";
import { setSelection } from "../actions/map";
import { CommandConditions } from "../api/registry/command";
import { useReduxDispatch, useMapProviderContext } from "../components/map-providers/context";
import { MapGuideMapProviderContext } from "../components/map-providers/mapguide";
import { MapDebugContext } from "../components/mapguide-debug-context";
import { useReducedToolbarAppState, useActiveMapName } from "../containers/hooks";
import { MapViewer } from "../containers/neo-map-viewer";
import { MapDependentContainer, getQueryMapFeaturesResponse } from "./map.stories";
import { ElementGroup } from "../components/elements/element-context";

export const MapStoryFrame = (props: MapDependentContainer) => {
    const SB_WIDTH = 350;
    const includeTools = !!props.includeSelect;
    const dispatch = useReduxDispatch();
    const state = useReducedToolbarAppState();
    const activeMapName = useActiveMapName();
    const context = useMapProviderContext() as MapGuideMapProviderContext;
    const doTestSelect = () => {
        if (activeMapName) {
            const q = setSelection(activeMapName, getQueryMapFeaturesResponse(activeMapName));
            dispatch(q);
        }
    };
    const doClearSelection = () => {
        if (activeMapName) {
            const q = setSelection(activeMapName, {});
            dispatch(q);
        }
    };
    return <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: SB_WIDTH, overflowY: "auto" }}>
            {props.children}
        </div>
        <div style={{ position: "absolute", left: SB_WIDTH, top: 0, bottom: 0, right: 0 }}>
            <MapDebugContext.Provider value={{ mock: context.mockMode }}>
                <MapViewer />
                {props.includeSelect && <ElementGroup style={{ position: "absolute", right: 15, top: 15 }}>
                    <Button intent={Intent.PRIMARY} onClick={() => doTestSelect()}>Test Select</Button>
                    <Button intent={Intent.DANGER} onClick={() => doClearSelection()} disabled={!CommandConditions.hasSelection(state)}>Clear Selection</Button>
                </ElementGroup>}
            </MapDebugContext.Provider>
        </div>
    </div>;
};
