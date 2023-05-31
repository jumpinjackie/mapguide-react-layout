import { IApplicationState, IMapView, UnitOfMeasure, getCurrentView, IExternalBaseLayer, Coordinate2D, ILayerInfo, getExternalBaseLayers, InitError, IBranchedMapSubState, getSelectionSet, INameValuePair, ActiveMapTool, ClientKind, ImageFormat, MapLoadIndicatorPositioning, IViewerCapabilities } from '../api/common';
import { WEBLAYOUT_CONTEXTMENU } from '../constants';
import { useRef, useEffect } from "react";
import { areArraysDifferent } from "../utils/array";
import { IInitialExternalLayer } from '../actions/defs';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { IToolbarAppState, reduceAppToToolbarState } from '../api/registry/command';
import { useAppState } from '../components/map-providers/context';
import { ClientSelectionSet } from '../api/contracts/common';
import { IHeatmapSettings } from '../api/ol-style-contracts';

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
    return useAppState<string | undefined>(state => state.config.activeMapName);
}

export function useActiveMapInitialExternalLayers() {
    return useAppState<IInitialExternalLayer[]>(state => {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].initialExternalLayers;
        }
        return [];
    });
}

function sameHeatmapSettings(left: IHeatmapSettings | undefined, right: IHeatmapSettings | undefined): boolean {
    if (left && right) {
        return left.blur == right.blur
            && left.radius == right.radius;
    }
    return false;
}


export function useActiveMapLayers() {
    return useAppState<ILayerInfo[] | undefined>(state => {
        if (state.config.activeMapName) {
            return state.mapState[state.config.activeMapName].layers;
        }
        return undefined;
    }, (left, right) => !areArraysDifferent(left, right, (l, r) => {
        return l.name == r.name
            && l.opacity == r.opacity
            && l.visible == r.visible
            && l.vectorStyle == r.vectorStyle
            && l.cluster == r.cluster
            && sameHeatmapSettings(l.heatmap, r.heatmap);
    }));
}

export function useViewerLocale() {
    return useAppState<string>(state => state.config.locale);
}

export function useActiveMapView() {
    return useAppState<IMapView | undefined>(state => {
        return getCurrentView(state);
    });
}

export function useActiveMapWidth() {
    return useAppState<number | undefined>(state => state.viewer?.size?.[0]);
}

export function useActiveMapHeight() {
    return useAppState<number | undefined>(state => state.viewer?.size?.[1]);
}

export function useViewerSizeUnits() {
    return useAppState<UnitOfMeasure>(state => state.config.viewSizeUnits);
}

/**
 * Gets the current set of available external base layers
 * 
 * @param includeNonVisual Include "non-visual" base layers like UTFGrid tile sets
 * @returns The current set of available external base layers
 * @since 0.14 New required includeNonVisual parameter
 */
export function useActiveMapExternalBaseLayers(includeNonVisual: boolean) {
    return useAppState<IExternalBaseLayer[] | undefined>(state => getExternalBaseLayers(state, includeNonVisual));
}

export function useCurrentMouseCoordinates() {
    return useAppState<Coordinate2D | undefined>(state => state.mouse.coords);
}

export function useViewerFlyouts() {
    return useAppState<any>(state => state.toolbar.flyouts);
}

export function useInitWarnings() {
    return useAppState<string[]>(state => state.initError.warnings);
}

export function useInitError() {
    return useAppState<InitError | undefined>(state => state.initError.error);
}

export function useInitErrorStack() {
    return useAppState<boolean>(state => state.initError.includeStack)
}

export function useInitErrorOptions() {
    return useAppState<any>(state => state.initError.options);
}

export function getActiveMapBranch(state: IApplicationState) {
    if (state.config.activeMapName) {
        return state.mapState[state.config.activeMapName];
    }
    return undefined;
}

export function useActiveMapBranch() {
    return useAppState<IBranchedMapSubState | undefined>(state => getActiveMapBranch(state));
}

export function useActiveMapSelectionSet() {
    return useAppState<QueryMapFeaturesResponse | null>(state => getSelectionSet(state) ?? null);
}

/**
 * Gets custom app settings
 * 
 * @returns 
 * @since 0.14
 */
export function useCustomAppSettings() {
    return useAppState(state => state.config.appSettings);
}

/**
 * Gets the client-side selection set
 * @since 0.14
 */
export function useActiveMapClientSelectionSet() {
    return useAppState<ClientSelectionSet | undefined>(state => getActiveMapBranch(state)?.clientSelection);
}

export function useActiveMapInitialView() {
    return useAppState<IMapView | undefined>(state => getActiveMapBranch(state)?.initialView);
}

export function useAvailableMaps() {
    return useAppState<INameValuePair[] | undefined>(state => state.config.availableMaps);
}

export function useViewerBusyCount() {
    return useAppState<number>(state => state.viewer.busyCount);
}

export function useViewerViewRotation() {
    return useAppState<number>(state => state.config.viewRotation);
}

export function useViewerActiveTool() {
    return useAppState<ActiveMapTool>(state => state.viewer.tool);
}

export function useViewerViewRotationEnabled() {
    return useAppState<boolean>(state => state.config.viewRotationEnabled);
}

export function useConfiguredCoordinateProjection() {
    return useAppState<string>(state => state.config.coordinates.projection);
}

export function useConfiguredCoordinateDecimals() {
    return useAppState<number>(state => state.config.coordinates.decimals);
}

export function useConfiguredCoordinateFormat() {
    return useAppState<string | undefined>(state => state.config.coordinates.format);
}

export function useConfiguredAgentUri() {
    return useAppState<string | undefined>(state => state.config.agentUri);
}

export function useConfiguredAgentKind() {
    return useAppState<ClientKind>(state => state.config.agentKind);
}

export function useIsContextMenuOpen() {
    return useAppState<boolean>(state => {
        let isContextMenuOpen = false;
        if (state?.toolbar?.flyouts?.[WEBLAYOUT_CONTEXTMENU]?.open === true) {
            isContextMenuOpen = true;
        }
        return isContextMenuOpen;
    })
}

/**
 * Gets whether the viewer is in stateless mode
 * @returns true if the viewer is in stateless mode
 * @since 0.14
 */
export function useViewerIsStateless() {
    return useAppState<boolean>(state => state.config.viewer.isStateless);
}

export function useViewerImageFormat() {
    return useAppState<ImageFormat>(state => state.config.viewer.imageFormat);
}

export function useViewerSelectionImageFormat() {
    return useAppState<ImageFormat>(state => state.config.viewer.selectionImageFormat);
}

export function useViewerSelectionColor() {
    return useAppState<string>(state => state.config.viewer.selectionColor);
}

export function useViewerActiveFeatureSelectionColor() {
    return useAppState<string>(state => state.config.viewer.activeSelectedFeatureColor);
}

export function useViewerPointSelectionBuffer() {
    return useAppState<number>(state => state.config.viewer.pointSelectionBuffer);
}

export function useViewerFeatureTooltipsEnabled() {
    return useAppState<boolean>(state => state.viewer.featureTooltipsEnabled);
}

/**
 * @since 0.14.2
 */
export function useViewerSelectCanDragPan() {
    return useAppState<boolean>(state => state.config.selectCanDragPan);
}

export function useConfiguredManualFeatureTooltips() {
    return useAppState<boolean>(state => state.config.manualFeatureTooltips);
}

export function useConfiguredLoadIndicatorPositioning() {
    return useAppState<MapLoadIndicatorPositioning>(state => state.config.viewer.loadIndicatorPositioning);
}

export function useConfiguredLoadIndicatorColor() {
    return useAppState<string>(state => state.config.viewer.loadIndicatorColor);
}

export function useConfiguredCancelDigitizationKey() {
    return useAppState<number>(state => state.config.cancelDigitizationKey);
}

export function useConfiguredUndoLastPointKey() {
    return useAppState<number>(state => state.config.undoLastPointKey);
}

export function useConfiguredCapabilities() {
    return useAppState<IViewerCapabilities>(state => state.config.capabilities);
}

export function useTemplateLegendVisible() {
    return useAppState<boolean>(state => state.template.legendVisible);
}

export function useTemplateTaskPaneVisible() {
    return useAppState<boolean>(state => state.template.taskPaneVisible);
}

export function useTemplateSelectionVisible() {
    return useAppState<boolean>(state => state.template.selectionPanelVisible);
}

export function useTemplateInitialInfoPaneWidth() {
    return useAppState<number>(state => state.template.initialInfoPaneWidth);
}

export function useTemplateInitialTaskPaneWidth() {
    return useAppState<number>(state => state.template.initialTaskPaneWidth);
}

/**
 * 
 * @param key 
 * @returns 
 * @since 0.14.8
 */
export function useTemplateCustomData(key: string) {
    return useAppState(state => state.template.templateData[key]);
}

export function useTaskPaneInitialUrl() {
    return useAppState<string | undefined>(state => state.taskpane.initialUrl);
}

export function useTaskPaneNavigationIndex() {
    return useAppState<number>(state => state.taskpane.navIndex);
}

export function useTaskPaneLastUrlPushed() {
    return useAppState<boolean>(state => state.taskpane.lastUrlPushed);
}

export function useTaskPaneNavigationStack() {
    return useAppState<string[]>(state => state.taskpane.navigation);
}

export function useLastDispatchedAction() {
    return useAppState<any>(state => state.lastaction);
}

export function useReducedToolbarAppState() {
    const selection = useActiveMapSelectionSet();
    const clientSelection = useActiveMapClientSelectionSet();
    const tbState = useAppState(state => reduceAppToToolbarState(state), (left, right) => {
        return left?.busyWorkerCount == right?.busyWorkerCount
            && left?.hasNextView == right?.hasNextView
            && left?.hasPreviousView == right?.hasPreviousView
            && left?.featureTooltipsEnabled == right?.featureTooltipsEnabled
            && left?.activeTool == right?.activeTool;
    });
    //Overwrite whatever selection flags from the reduceAppToToolbarState result
    let hasClientSelection = false;
    let hasSelection = false;
    if (selection) {
        if (selection.FeatureSet && selection.FeatureSet.Layer.length > 0) {
            hasSelection = true;
        }
        if (selection.SelectedFeatures && selection.SelectedFeatures.SelectedLayer.length > 0) {
            hasSelection = true;
        }
    }
    if (clientSelection && clientSelection.layers.length > 0) {
        hasClientSelection = true;
    }
    return {
        ...tbState,
        hasClientSelection,
        hasSelection
    };
}