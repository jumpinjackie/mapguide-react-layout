import { IApplicationState, IMapView, UnitOfMeasure, getCurrentView, IExternalBaseLayer, Coordinate2D } from '../api/common';
import { useSelector } from 'react-redux';
import { getExternalBaseLayers, INameValuePair, QueryMapFeaturesResponse, ActiveMapTool, ClientKind, ImageFormat, MapLoadIndicatorPositioning, getSelectionSet, IViewerCapabilities, InitError, IBranchedMapState, IBranchedMapSubState, IToolbarAppState, reduceAppToToolbarState, ILayerInfo } from '../api';
import { WEBLAYOUT_CONTEXTMENU } from '../constants';
import { useRef, useEffect } from "react";
import { areArraysDifferent } from "../utils/array";
import { IInitialExternalLayer } from '../actions/defs';

// From: https://usehooks.com/usePrevious/

export function usePrevious<T>(value: T) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef<T>();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

export function useActiveMapName() {
    return useSelector<IApplicationState, string | undefined>(state => state.config.activeMapName);
}

export function useActiveMapInitialExternalLayers() {
    return useSelector<IApplicationState, IInitialExternalLayer[]>(state => {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].initialExternalLayers;
        }
        return [];
    });
}

export function useActiveMapLayers() {
    return useSelector<IApplicationState, ILayerInfo[] | undefined>(state => {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].layers;
        }
        return undefined;
    }, (left, right) => !areArraysDifferent(left, right, (l, r) => {
        return l.name == r.name
            && l.opacity == r.opacity
            && l.visible == r.visible
            && l.vectorStyle == r.vectorStyle;
    }));
}

export function useViewerLocale() {
    return useSelector<IApplicationState, string>(state => state.config.locale);
}

export function useActiveMapView() {
    return useSelector<IApplicationState, IMapView | undefined>(state => {
        return getCurrentView(state);
    });
}

export function useActiveMapWidth() {
    return useSelector<IApplicationState, number | undefined>(state => state.viewer?.size?.[0]);
}

export function useActiveMapHeight() {
    return useSelector<IApplicationState, number | undefined>(state => state.viewer?.size?.[1]);
}

export function useViewerSizeUnits() {
    return useSelector<IApplicationState, UnitOfMeasure>(state => state.config.viewSizeUnits);
}

export function useActiveMapExternalBaseLayers() {
    return useSelector<IApplicationState, IExternalBaseLayer[] | undefined>(state => getExternalBaseLayers(state));
}

export function useCurrentMouseCoordinates() {
    return useSelector<IApplicationState, Coordinate2D | undefined>(state => state.mouse.coords);
}

export function useViewerFlyouts() {
    return useSelector<IApplicationState, any>(state => state.toolbar.flyouts);
}

export function useInitWarnings() {
    return useSelector<IApplicationState, string[]>(state => state.initError.warnings);
}

export function useInitError() {
    return useSelector<IApplicationState, InitError | undefined>(state => state.initError.error);
}

export function useInitErrorStack() {
    return useSelector<IApplicationState, boolean>(state => state.initError.includeStack)
}

export function useInitErrorOptions() {
    return useSelector<IApplicationState, any>(state => state.initError.options);
}

export function getActiveMapBranch(state: IApplicationState) {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName];
    }
    return undefined;
}

export function useActiveMapBranch() {
    return useSelector<IApplicationState, IBranchedMapSubState | undefined>(state => getActiveMapBranch(state));
}

export function useActiveMapSelectionSet() {
    return useSelector<IApplicationState, QueryMapFeaturesResponse | null>(state => getSelectionSet(state) ?? null);
}

export function useActiveMapInitialView() {
    return useSelector<IApplicationState, IMapView | undefined>(state => getActiveMapBranch(state)?.initialView);
}

export function useAvailableMaps() {
    return useSelector<IApplicationState, INameValuePair[] | undefined>(state => state.config.availableMaps);
}

export function useViewerBusyCount() {
    return useSelector<IApplicationState, number>(state => state.viewer.busyCount);
}

export function useViewerViewRotation() {
    return useSelector<IApplicationState, number>(state => state.config.viewRotation);
}

export function useViewerActiveTool() {
    return useSelector<IApplicationState, ActiveMapTool>(state => state.viewer.tool);
}

export function useViewerViewRotationEnabled() {
    return useSelector<IApplicationState, boolean>(state => state.config.viewRotationEnabled);
}

export function useConfiguredCoordinateProjection() {
    return useSelector<IApplicationState, string>(state => state.config.coordinates.projection);
}

export function useConfiguredCoordinateDecimals() {
    return useSelector<IApplicationState, number>(state => state.config.coordinates.decimals);
}

export function useConfiguredCoordinateFormat() {
    return useSelector<IApplicationState, string | undefined>(state => state.config.coordinates.format);
}

export function useConfiguredAgentUri() {
    return useSelector<IApplicationState, string | undefined>(state => state.config.agentUri);
}

export function useConfiguredAgentKind() {
    return useSelector<IApplicationState, ClientKind>(state => state.config.agentKind);
}

export function useIsContextMenuOpen() {
    return useSelector<IApplicationState, boolean>(state => {
        let isContextMenuOpen = false;
        if (state?.toolbar?.flyouts?.[WEBLAYOUT_CONTEXTMENU]?.open === true) {
            isContextMenuOpen = true;
        }
        return isContextMenuOpen;
    })
}

export function useViewerImageFormat() {
    return useSelector<IApplicationState, ImageFormat>(state => state.config.viewer.imageFormat);
}

export function useViewerSelectionImageFormat() {
    return useSelector<IApplicationState, ImageFormat>(state => state.config.viewer.selectionImageFormat);
}

export function useViewerSelectionColor() {
    return useSelector<IApplicationState, string>(state => state.config.viewer.selectionColor);
}

export function useViewerActiveFeatureSelectionColor() {
    return useSelector<IApplicationState, string>(state => state.config.viewer.activeSelectedFeatureColor);
}

export function useViewerPointSelectionBuffer() {
    return useSelector<IApplicationState, number>(state => state.config.viewer.pointSelectionBuffer);
}

export function useViewerFeatureTooltipsEnabled() {
    return useSelector<IApplicationState, boolean>(state => state.viewer.featureTooltipsEnabled);
}

export function useConfiguredManualFeatureTooltips() {
    return useSelector<IApplicationState, boolean>(state => state.config.manualFeatureTooltips);
}

export function useConfiguredLoadIndicatorPositioning() {
    return useSelector<IApplicationState, MapLoadIndicatorPositioning>(state => state.config.viewer.loadIndicatorPositioning);
}

export function useConfiguredLoadIndicatorColor() {
    return useSelector<IApplicationState, string>(state => state.config.viewer.loadIndicatorColor);
}

export function useConfiguredCancelDigitizationKey() {
    return useSelector<IApplicationState, number>(state => state.config.cancelDigitizationKey);
}

export function useConfiguredUndoLastPointKey() {
    return useSelector<IApplicationState, number>(state => state.config.undoLastPointKey);
}

export function useConfiguredCapabilities() {
    return useSelector<IApplicationState, IViewerCapabilities>(state => state.config.capabilities);
}

export function useTemplateLegendVisible() {
    return useSelector<IApplicationState, boolean>(state => state.template.legendVisible);
}

export function useTemplateTaskPaneVisible() {
    return useSelector<IApplicationState, boolean>(state => state.template.taskPaneVisible);
}

export function useTemplateSelectionVisible() {
    return useSelector<IApplicationState, boolean>(state => state.template.selectionPanelVisible);
}

export function useTemplateInitialInfoPaneWidth() {
    return useSelector<IApplicationState, number>(state => state.template.initialInfoPaneWidth);
}

export function useTemplateInitialTaskPaneWidth() {
    return useSelector<IApplicationState, number>(state => state.template.initialTaskPaneWidth);
}

export function useTaskPaneInitialUrl() {
    return useSelector<IApplicationState, string | undefined>(state => state.taskpane.initialUrl);
}

export function useTaskPaneNavigationIndex() {
    return useSelector<IApplicationState, number>(state => state.taskpane.navIndex);
}

export function useTaskPaneLastUrlPushed() {
    return useSelector<IApplicationState, boolean>(state => state.taskpane.lastUrlPushed);
}

export function useTaskPaneNavigationStack() {
    return useSelector<IApplicationState, string[]>(state => state.taskpane.navigation);
}

export function useLastDispatchedAction() {
    return useSelector<IApplicationState, any>(state => state.lastaction);
}

export function useReducedToolbarAppState() {
    return useSelector<IApplicationState, IToolbarAppState>(state => reduceAppToToolbarState(state), (left, right) => {
        return left?.busyWorkerCount == right?.busyWorkerCount
            && left?.hasNextView == right?.hasNextView
            && left?.hasPreviousView == right?.hasPreviousView
            && left?.hasSelection == right?.hasSelection
            && left?.featureTooltipsEnabled == right?.featureTooltipsEnabled
            && left?.activeTool == right?.activeTool;
    });
}