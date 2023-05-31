/**
 * defs.ts
 * 
 * Redux action definitions
 */

import { IDOMElementMetrics, IMapView, Dictionary, IExternalBaseLayer, IModalComponentDisplayOptions, IModalDisplayOptions, UnitOfMeasure, ActiveMapTool, ILayerInfo, Bounds, INameValuePair } from '../api/common';
import { ActionType } from '../constants/actions';
import { PreparedSubMenuSet } from '../api/registry/command-spec';
import { RuntimeMap } from '../api/contracts/runtime-map';
import { QueryMapFeaturesResponse } from '../api/contracts/query';
import { IVectorLayerStyle, IClusterSettings, VectorStyleSource } from '../api/ol-style-contracts';
import { Action } from 'redux';
import { ClientSelectionFeature } from '../api/contracts/common';

/**
 * Opens the context menu
 * 
 * @since 0.13
 */
export interface IOpenContextMenuAction {
    type: ActionType.CONTEXT_MENU_OPEN;
    payload: {
        x: number;
        y: number;
    }
}

export interface ICloseContextMenuAction {
    type: ActionType.CONTEXT_MENU_CLOSE;
}

/**
 * Opens a flyout menu
 * 
 * @since 0.12
 */
export interface IOpenFlyoutAction {
    type: ActionType.FLYOUT_OPEN;
    payload: {
        flyoutId: string;
        metrics: IDOMElementMetrics;
    }
}

/**
 * Closes a flyout menu
 * 
 * @since 0.12
 */
export interface ICloseFlyoutAction {
    type: ActionType.FLYOUT_CLOSE;
    payload: {
        flyoutId: string;
    }
}

/**
 * Opens a registered component in the given flyout
 * 
 * @since 0.12
 */
export interface IOpenComponentInFlyoutAction {
    type: ActionType.COMPONENT_OPEN;
    payload: {
        flyoutId: string;
        metrics: IDOMElementMetrics;
        name: string;
        props: any;
    }
}

/**
 * Closes a registered component in the given flyout
 *
 * @since 0.12
 */
export interface ICloseComponentInFlyoutAction {
    type: ActionType.COMPONENT_CLOSE;
    payload: {
        flyoutId: string;
    }
}

/**
 * Metadata about the generic subject layer
 * 
 * @export
 * @interface IGenericSubjectMapLayerMetadata
 * @since 0.14
 */
export interface IGenericSubjectMapLayerMetadata {
    /**
     * The bounds of this layer
     *
     * @type {Bounds}
     * @memberof IGenericSubjectMapLayerMetadata
     */
    extents: Bounds;
    /**
     * The projection of this layer
     *
     * @type {string}
     * @memberof IGenericSubjectMapLayerMetadata
     */
    projection: string;
    /**
     * An other arbitrary metadata properties
     */
    properties?: any;
    /**
     * If true, the GeoJSON layer will be loaded as a vector tile layer. Has no effect if this layer is not a GeoJSON layer
     */
    geojson_as_vt?: boolean;
}

/**
 * Valid generic subject layer types
 * 
 * @export
 * @enum {string}
 * @since 0.14
 */
export enum GenericSubjectLayerType {
    /**
     * A tiled WMS layer
     */
    TileWMS = "TileWMS",
    /**
     * A vector layer based on an external CSV file
     */
    CSV = "CSV",
    /**
     * A vector layer based on an external KML file
     */
    KML = "KML",
    /**
     * A vector layer based on an external GeoJSON file
     */
    GeoJSON = "GeoJSON",
    /**
     * A vector layer based on an inline GeoJSON fragment
     */
    GeoJSON_Inline = "GeoJSON_Inline",
    /**
     * A vector layer based on a custom-defined format whose driver was registered with {@link ExternalLayerFactoryRegistry.registerExternalVectorLayerCreator}
     */
    CustomVector = "CustomVector",
    /**
     * A vector layer based on a Mapbox Vector Tile set
     */
    MVT = "MVT",
    /**
     * A XYZ tileset
     * @since 0.14.3
     * @remarks A XYZ subject layer will not be added as a base layer. It will be considered as an "overlay" with respect to any existing base layers present
     */
    XYZ = "XYZ",
    /**
     * A static image layer
     * @since 0.14.3
     */
    StaticImage = "StaticImage",
    /**
     * A WFS layer
     * @since 0.14.4
     */
    WFS = "WFS"
}

/**
 * Defines an expression for a popup link
 */
export interface IPopupLinkExpression {
    expression: string;
    placeholderBegin?: string;
    placeholderEnd?: string;
}

/**
 * Popup link control options
 *
 * @export
 * @interface ISelectedFeaturePopupLinkProperty
 * @since 0.14
 */
export interface ISelectedFeaturePopupLinkProperty {
    /**
     * The feature property that contains the link
     *
     * @type {string}
     * @memberof ISelectedFeaturePopupLinkProperty
     */
    name: string | IPopupLinkExpression;
    /**
     * The anchor label to render
     *
     * @type {string}
     * @memberof ISelectedFeaturePopupLinkProperty
     */
    label: string;
    /**
     * The hyperlink target
     *
     * @type {string}
     * @memberof ISelectedFeaturePopupLinkProperty
     */
    linkTarget: string;
}

/**
 * Selected feature popup configuration for an external layer
 *
 * @export
 * @interface ISelectedFeaturePopupTemplateConfiguration
 * @since 0.14
 */
export interface ISelectedFeaturePopupTemplateConfiguration {
    /**
     * Custom popup title. If not set, the default title "Feature Properties" 
     * (string value dependent on your locale's string bundle) will be used
     *
     * @type {string}
     * @memberof ISelectedFeaturePopupTemplateConfiguration
     */
    title?: string;
    /**
     * The popup title for a selected cluster. If not set, the default title "Cluster Properties"
     * (string value dependent on your locale's string bundle) will be used
     * @since 0.14
     */
    clusteredTitle?: (size: number) => string;
    /**
     * If specified, restricts the display of feature properties only to what is
     * specified here. The value part determines the display label.
     *
     * @type {INameValuePair[]}
     * @memberof ISelectedFeaturePopupTemplateConfiguration
     */
    propertyMappings?: INameValuePair[];
    /**
     * If specified, controls link display for the popup
     *
     * @type {INameValuePair}
     * @memberof ISelectedFeaturePopupTemplateConfiguration
     */
    linkProperty?: ISelectedFeaturePopupLinkProperty;
}

/**
 * 
 * @export
 * @interface IGenericSubjectMapLayer
 * @since 0.14
 */
export interface IGenericSubjectMapLayer {
    type: GenericSubjectLayerType;
    meta: IGenericSubjectMapLayerMetadata | undefined;
    layerOptions: any;
    sourceParams: any;
    name: string;
    description?: string;
    displayName?: string;
    initiallyVisible: boolean;
    selectable: boolean;
    /**
     * Opt-out of hover highlight selection processing. Has no effect for non-vector layers
     * 
     * @since 0.14.5
     */
    disableHover?: boolean;
    vectorStyle?: IVectorLayerStyle;
    cluster?: IClusterSettings;
    attributions?: string[];
    popupTemplate?: ISelectedFeaturePopupTemplateConfiguration;
    /**
     * The driver name for custom external layers
     */
    driverName?: string;
}

export type IInitialExternalLayer = IGenericSubjectMapLayer;

export function isGenericSubjectMapLayer(map: RuntimeMap | IGenericSubjectMapLayer): map is IGenericSubjectMapLayer {
    return typeof((map as any)?.type) == 'string';
}

/**
 * @since 0.12
 */
export type MapInfo = {
    mapGroupId: string;
    map: RuntimeMap | IGenericSubjectMapLayer | undefined;
    initialView: IMapView | undefined;
    externalBaseLayers: IExternalBaseLayer[];
    /**
     * The initial set of external layers
     *
     * @type {IInitialExternalLayer[]}
     * @since 0.14
     */
    initialExternalLayers: IInitialExternalLayer[];
}

/**
 * @since 0.12
 */
export interface IRestoredSelectionSets {
    [mapName: string]: QueryMapFeaturesResponse;
}

/**
 * @since 0.12
 */
export interface IInitAppActionPayload {
    activeMapName: string;
    initialView?: IMapView;
    initialUrl: string;
    initialTaskPaneWidth?: number;
    initialInfoPaneWidth?: number;
    locale: string;
    maps: Dictionary<MapInfo>;
    config: any;
    capabilities: {
        hasTaskPane: boolean,
        hasTaskBar: boolean,
        hasStatusBar: boolean,
        hasNavigator: boolean,
        hasSelectionPanel: boolean,
        hasLegend: boolean,
        hasToolbar: boolean,
        hasViewSize: boolean
    },
    /**
     * @since 0.13
     */
    featureTooltipsEnabled?: boolean;
    initialShowLayers?: string[];
    initialShowGroups?: string[];
    initialHideLayers?: string[];
    initialHideGroups?: string[];
    toolbars: PreparedSubMenuSet;
    warnings: string[];
    /**
     * @since 0.12
     */
    initialSelections?: IRestoredSelectionSets;
    /**
     * @since 0.12.5
     */
    initialActiveTool?: ActiveMapTool;
    /**
     * @since 0.14.8
     */
    appSettings?: Dictionary<string> | undefined;
}

/**
 * Initializes the viewer application
 *
 * @since 0.12
 */
export interface IInitAppAction {
    type: ActionType.INIT_APP;
    payload: IInitAppActionPayload;
}

/**
 * @since 0.12.7
 */
export interface ISetLocaleAction {
    type: ActionType.SET_LOCALE;
    payload: string;
}

export interface IInitErrorAction {
    type: ActionType.INIT_ERROR,
    payload: {
        error: {
            message: string;
            stack: string[];
        },
        includeStack?: boolean;
        options: any;
    }
}

export interface IAcknowledgeStartupWarningsAction {
    type: ActionType.INIT_ACKNOWLEDGE_WARNINGS;
}

export interface IElementState {
    legendVisible: boolean;
    taskPaneVisible: boolean;
    selectionPanelVisible: boolean;
}

/**
 * @since 0.12
 */
export interface ITemplateSetElementStateAction {
    type: ActionType.FUSION_SET_ELEMENT_STATE;
    payload: IElementState;
}

/**
 * @since 0.12
 */
export interface ITemplateSetTaskPaneVisibilityAction {
    type: ActionType.FUSION_SET_TASK_PANE_VISIBILITY;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface ITemplateSetSelectionPanelVisibility {
    type: ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface ITemplateSetLegendVisibility {
    type: ActionType.FUSION_SET_LEGEND_VISIBILITY;
    payload: boolean;
}

/**
 * @since 0.14.8
 */
export interface ITemplateSetCustomDataAction {
    type: ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA,
    payload: {
        name: string;
        value: any;
    }
}

/**
 * @since 0.12
 */
export interface ITaskPaneBackAction {
    type: ActionType.TASK_PANE_BACK;
}

/**
 * @since 0.12
 */
export interface ITaskPaneForwardAction {
    type: ActionType.TASK_PANE_FORWARD;
}

/**
 * Pushes the given URL to the task pane navigation history stack
 * 
 * @since 0.12
 */
export interface ITaskPanePushUrlAction {
    type: ActionType.TASK_PANE_PUSH_URL;
    payload: {
        url: string;
        silent?: boolean;
    }
}

/**
 * @since 0.12
 */
export interface ITaskPaneInvokeUrlAction {
    type: ActionType.TASK_INVOKE_URL,
    payload: {
        url: string;
    }
}

/**
 * @since 0.12
 */
export interface ITaskPaneHomeAction {
    type: ActionType.TASK_PANE_HOME;
}

/**
 * @since 0.12
 * @since 0.14.8 If size/position is specified in modal settings, it will only be honored if the modal 
 * is to be shown for the first time. Otherwise, it will use the previous size/position the last time
 * a modal of this name was closed
 */
export interface IShowComponentInModalAction {
    type: ActionType.MODAL_SHOW_COMPONENT;
    payload: IModalComponentDisplayOptions;
}

/**
 * @since 0.12
 * @since 0.14.8 If size/position is specified in modal settings, it will only be honored if the modal 
 * is to be shown for the first time. Otherwise, it will use the previous size/position the last time
 * a modal of this name was closed
 */
export interface IShowModalUrlAction {
    type: ActionType.MODAL_SHOW_URL;
    payload: IModalDisplayOptions;
}

/**
 * @since 0.12
 */
export interface ICloseModalAction {
    type: ActionType.MODAL_CLOSE;
    payload: string;
}

/**
 * @since 0.14.8
 */
export type ModalChangeArgs = {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * @since 0.14.8
 */
export interface IUpdateModalDimensionsAction {
    type: ActionType.MODAL_UPDATE;
    payload: { 
        name: string;
        args: ModalChangeArgs;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetBusyCountAction {
    type: ActionType.MAP_SET_BUSY_COUNT;
    payload: number;
}

/**
 * @since 0.12
 */
export interface IMapSetBaseLayerAction {
    type: ActionType.MAP_SET_BASE_LAYER;
    payload: {
        mapName: string;
        layerName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetScaleAction {
    type: ActionType.MAP_SET_SCALE;
    payload: {
        mapName: string;
        scale: number;
        resolution?: number;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetMouseCoordinatesAction {
    type: ActionType.UPDATE_MOUSE_COORDINATES;
    payload: {
        mapName: string;
        coord: any;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetLayerTransparencyAction {
    type: ActionType.MAP_SET_LAYER_TRANSPARENCY;
    payload: {
        mapName: string;
        layerName: string;
        opacity: number;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetViewSizeUnitsAction {
    type: ActionType.MAP_SET_VIEW_SIZE_UNITS;
    payload: UnitOfMeasure;
}

/**
 * @since 0.12
 */
export interface IMapPreviousViewAction {
    type: ActionType.MAP_PREVIOUS_VIEW;
    payload: {
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapNextViewAction {
    type: ActionType.MAP_NEXT_VIEW;
    payload: {
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetSelectionAction {
    type: ActionType.MAP_SET_SELECTION;
    payload: {
        mapName: string;
        selection: QueryMapFeaturesResponse | undefined;
    }
}

/**
 * @since 0.12
 */
export interface IMapResizedAction {
    type: ActionType.MAP_RESIZED;
    payload: {
        width: number;
        height: number;
    }
}

/**
 * @since 0.12
 */
export interface IMapSetViewAction {
    type: ActionType.MAP_SET_VIEW;
    payload: {
        mapName: string;
        view: IMapView;
    }
}

/**
 * @since 0.12
 */
export interface ISetActiveMapToolAction {
    type: ActionType.MAP_SET_ACTIVE_TOOL;
    payload: ActiveMapTool;
}

/**
 * @since 0.12
 */
export interface ISetActiveMapAction {
    type: ActionType.MAP_SET_ACTIVE_MAP;
    payload: string;
}

/**
 * @since 0.12
 */
export interface ISetFeatureTooltipsEnabledAction {
    type: ActionType.MAP_SET_MAPTIP;
    payload: boolean;
}

/**
 * @since 0.14.2
 */
export interface IEnableSelectDragPanAction {
    type: ActionType.MAP_ENABLE_SELECT_DRAGPAN;
    payload: boolean;
}

/**
 * @since 0.14.8
 */
export interface ISetAppSettingAction {
    type: ActionType.SET_APP_SETTING;
    payload: {
        key: string;
        value: string;
    }
}

/**
 * @since 0.12
 */
export interface ISetManualFeatureTooltipsEnabledAction {
    type: ActionType.MAP_SET_MANUAL_MAPTIP;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface IMapSetViewRotationAction {
    type: ActionType.MAP_SET_VIEW_ROTATION;
    payload: number;
}

/**
 * @since 0.12
 */
export interface IMapSetViewRotationEnabledAction {
    type: ActionType.MAP_SET_VIEW_ROTATION_ENABLED;
    payload: boolean;
}

/**
 * @since 0.12
 */
export interface IShowSelectedFeatureAction {
    type: ActionType.MAP_SHOW_SELECTED_FEATURE;
    payload: {
        mapName: string;
        layerId: string;
        selectionKey: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetGroupVisibilityAction {
    type: ActionType.LEGEND_SET_GROUP_VISIBILITY;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetLayerVisibilityAction {
    type: ActionType.LEGEND_SET_LAYER_VISIBILITY;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetGroupExpandedAction {
    type: ActionType.LEGEND_SET_GROUP_EXPANDABLE;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface ILegendSetGroupSelectableAction {
    type: ActionType.LEGEND_SET_LAYER_SELECTABLE;
    payload: {
        id: string;
        value: boolean;
        mapName: string;
    }
}

/**
 * @since 0.12
 */
export interface IMapRefreshAction {
    type: ActionType.MAP_REFRESH;
    payload: {
        mapName: string,
        map: RuntimeMap
    }
}

/**
 * An action to signal that a new external layer has been added for a given map
 * 
 * @since 0.13
 * @since 0.14 payload.defaultStyle changed to IVectorLayerStyle
 */
export interface IAddedLayerAction {
    type: ActionType.LAYER_ADDED,
    payload: {
        mapName: string,
        layer: ILayerInfo,
        defaultStyle?: IVectorLayerStyle
    }
}

/**
 * @since 0.14
 */
export interface IExternalLayersReadyAction {
    type: ActionType.EXTERNAL_LAYERS_READY,
    payload: {
        mapName: string
    }
}

/**
 * Removes a given external layer for the given map
 * 
 * @since 0.13
 */
export interface IRemoveLayerAction {
    type: ActionType.REMOVE_LAYER,
    payload: {
        mapName: string,
        layerName: string
    }
}

/**
 * Sets the display order index for the given external layer for the given map
 * 
 * @since 0.13
 */
export interface ISetLayerIndexAction {
    type: ActionType.SET_LAYER_INDEX,
    payload: {
        mapName: string,
        layerName: string,
        index: number
    }
}

/**
 * Sets the opacity for the given external layer for the given map
 * 
 * @since 0.13
 */
export interface ISetLayerOpacityAction {
    type: ActionType.SET_LAYER_OPACITY,
    payload: {
        mapName: string,
        layerName: string,
        opacity: number
    }
}

/**
 * Sets the heatmap blur for the given external heatmap layer for the given map
 * 
 * @since 0.14
 */
export interface ISetHeatmapLayerBlurAction {
    type: ActionType.SET_HEATMAP_LAYER_BLUR,
    payload: {
        mapName: string,
        layerName: string,
        blur: number
    }
}

/**
 * Sets the heatmap radius for the given external heatmap layer for the given map
 * 
 * @since 0.14
 */
export interface ISetHeatmapLayerRadiusAction {
    type: ActionType.SET_HEATMAP_LAYER_RADIUS,
    payload: {
        mapName: string,
        layerName: string,
        radius: number
    }
}

/**
 * Sets the visibility for the given external layer for the given map
 * 
 * @since 0.13
 */
export interface ISetLayerVisibilityAction {
    type: ActionType.SET_LAYER_VISIBILITY,
    payload: {
        mapName: string,
        layerName: string,
        visible: boolean
    }
}

/**
 * Sets the vector style for the given external layer for the given map
 * 
 * @since 0.13
 * @since 0.14 payload.style changed to IVectorLayerStyle and which property added
 */
export interface ISetMapLayerVectorStyle {
    type: ActionType.SET_LAYER_VECTOR_STYLE,
    payload: {
        mapName: string,
        layerName: string,
        style: IVectorLayerStyle,
        which: VectorStyleSource
    }
}

/**
 * Adds a busy worker for the given external layer for the given map
 * 
 * @since 0.13
 */
export interface IAddMapLayerBusyWorkerAction {
    type: ActionType.ADD_LAYER_BUSY_WORKER,
    payload: {
        mapName: string,
        layerName: string
    }
}

/**
 * Removes a busy worker for the given external layer for the given map
 * 
 * @since 0.13
 */
export interface IRemoveMapLayerBusyWorkerAction {
    type: ActionType.REMOVE_LAYER_BUSY_WORKER,
    payload: {
        mapName: string,
        layerName: string
    }
}

/**
 * Adds a feature to the client selection set for the given map
 * 
 * @since 0.14
 */
export interface IAddClientSelectedFeatureAction {
    type: ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE,
    payload: {
        mapName: string;
        layerName: string;
        feature: ClientSelectionFeature;
    }
}

/**
 * Clears the client selection set for the given map
 */
export interface IClearClientSelectionAction {
    type: ActionType.MAP_CLEAR_CLIENT_SELECTION,
    payload: {
        mapName: string
    }
}

/**
 * @since 0.12
 */
export type ViewerAction = IOpenFlyoutAction 
    | ICloseFlyoutAction
    | IOpenContextMenuAction //@since 0.13
    | ICloseContextMenuAction //@since 0.13
    | IOpenComponentInFlyoutAction
    | ICloseComponentInFlyoutAction
    | IInitAppAction
    | IInitErrorAction
    | IAcknowledgeStartupWarningsAction
    | ITemplateSetElementStateAction
    | ITemplateSetTaskPaneVisibilityAction
    | ITemplateSetSelectionPanelVisibility
    | ITemplateSetLegendVisibility
    | ITaskPaneBackAction
    | ITaskPaneForwardAction
    | ITaskPanePushUrlAction
    | ITaskPaneInvokeUrlAction
    | ITaskPaneHomeAction
    | IShowComponentInModalAction
    | IShowModalUrlAction
    | ICloseModalAction
    | IMapSetBusyCountAction
    | IMapSetBaseLayerAction
    | IMapSetScaleAction
    | IMapSetMouseCoordinatesAction
    | IMapSetLayerTransparencyAction
    | IMapSetViewSizeUnitsAction
    | IMapPreviousViewAction
    | IMapNextViewAction
    | IMapSetSelectionAction
    | IMapResizedAction
    | IMapSetViewAction
    | ISetActiveMapToolAction
    | ISetActiveMapAction
    | ISetFeatureTooltipsEnabledAction
    | ISetManualFeatureTooltipsEnabledAction
    | IMapSetViewRotationAction
    | IMapSetViewRotationEnabledAction
    | IShowSelectedFeatureAction
    | ILegendSetGroupVisibilityAction
    | ILegendSetLayerVisibilityAction
    | ILegendSetGroupExpandedAction
    | ILegendSetGroupSelectableAction
    | IMapRefreshAction
    | ISetLocaleAction //@since 0.12.7
    | IAddedLayerAction //@since 0.13
    | IRemoveLayerAction //@since 0.13
    | ISetLayerIndexAction //@since 0.13
    | ISetLayerOpacityAction //@since 0.13
    | ISetLayerVisibilityAction //@since 0.13
    | ISetMapLayerVectorStyle //@since 0.13
    | IAddMapLayerBusyWorkerAction //@since 0.13
    | IRemoveMapLayerBusyWorkerAction //@since 0.13
    | IExternalLayersReadyAction //@since 0.14
    | IAddClientSelectedFeatureAction //@since 0.14
    | IClearClientSelectionAction //@since 0.14
    | ISetHeatmapLayerBlurAction //@since 0.14
    | ISetHeatmapLayerRadiusAction //@since 0.14
    | IEnableSelectDragPanAction //@since 0.14.2
    | ISetAppSettingAction //@since 0.14.8
    | IUpdateModalDimensionsAction //@since 0.14.8
    | ITemplateSetCustomDataAction //@since 0.14.8