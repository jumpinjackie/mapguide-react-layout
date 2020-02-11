import {
    GenericEvent,
    Bounds,
    RefreshMode,
    ClientKind,
    Dictionary,
    Coordinate2D,
    ImageFormat,
    IExternalBaseLayer,
    ILayerManager,
    IMapViewer,
    CommandTarget
} from "../api/common";
import { Client } from '../api/client';
import { RuntimeMap } from "../api/contracts/runtime-map";
import { tr } from "../api/i18n";
import * as ReactDOM from "react-dom";
import olMap from "ol/Map";
import olView from "ol/View";
import olOverviewMap from "ol/control/OverviewMap";
import { BLANK_GIF_DATA_URI } from "../constants/index";
import { Size, BLANK_SIZE } from "../containers/map-capturer-context";
import { getSiteVersion, canUseQueryMapFeaturesV4 } from '../utils/site-version';
import { createContext } from "react";
import { MouseTrackingTooltip } from './tooltips/mouse';
import { FeatureQueryTooltip } from './tooltips/feature';
import { MgLayerSet } from '../api/layer-set';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import { SelectedFeaturesTooltip } from './tooltips/selected-features';

/**
 * @since 0.13
 */
export enum MapGuideMockMode {
    /**
     * Render a placeholder image showing the key mapagent parameters
     */
    RenderPlaceholder,
    /**
     * Do not render anything
     */
    DoNotRender
}

/**
 * The map debug context, used to check if request mocking should be enabled or not
 * @since 0.13
 */
export interface IMapDebugContext {
    mock?: MapGuideMockMode;
}

export const MapDebugContext = createContext<IMapDebugContext>({});

export interface IMapViewerContextProps {
    map: RuntimeMap;
    imageFormat: ImageFormat;
    selectionImageFormat?: ImageFormat;
    selectionColor?: string;
    agentUri: string;
    externalBaseLayers?: IExternalBaseLayer[];
    locale?: string;
    showGroups?: string[];
    showLayers?: string[];
    hideGroups?: string[];
    hideLayers?: string[];
}

export interface IMapViewerContextCallback {
    getMockMode(): MapGuideMockMode | undefined;
    incrementBusyWorker(): void;
    decrementBusyWorker(): void;
    addImageLoading(): void;
    addImageLoaded(): void;
    onImageError(e: GenericEvent): void;
    onSessionExpired(): void;
    getSelectableLayers(): string[];
    getClient(): Client;
    isContextMenuOpen(): boolean;
    getAgentUri(): string;
    getAgentKind(): ClientKind;
    getMapName(): string;
    getSessionId(): string;
    getLocale(): string | undefined;
    isFeatureTooltipEnabled(): boolean;
    getPointSelectionBox(point: Coordinate2D): Bounds;
    openTooltipLink(url: string): void;
    addFeatureToHighlight(feat: Feature | undefined, bAppend: boolean): void;
}

/**
 * Provides contextual information for a map viewer
 *
 * @export
 * @class MapViewerContext
 */
export class MapViewerContext {
    private _activeMapName: string;
    private _layerSets: Dictionary<MgLayerSet>;
    private _mouseTooltip: MouseTrackingTooltip;
    private _featureTooltip: FeatureQueryTooltip;
    private _selectTooltip: SelectedFeaturesTooltip;
    private _map: olMap;
    private _ovMap: olOverviewMap;
    private callback: IMapViewerContextCallback;
    constructor(map: olMap, callback: IMapViewerContextCallback) {
        this.callback = callback;
        this._map = map;
        this._layerSets = {};
        this._mouseTooltip = new MouseTrackingTooltip(this._map, this.callback.isContextMenuOpen);
        this._featureTooltip = new FeatureQueryTooltip(this._map, callback);
        this._selectTooltip = new SelectedFeaturesTooltip(this._map);
        //HACK: To avoid chicken-egg problem, we call this.isFeatureTooltipEnabled() instead
        //of callback.isFeatureTooltipEnabled() even though its impl merely forwards to this
        this._featureTooltip.setEnabled(this.isFeatureTooltipEnabled());
    }
    public initLayerSet(props: IMapViewerContextProps): MgLayerSet {
        const layerSet = new MgLayerSet(props, this.callback);
        this._layerSets[props.map.Name] = layerSet;
        if (!this._activeMapName) {
            this._activeMapName = props.map.Name;
        }
        layerSet.update(props.showGroups, props.showLayers, props.hideGroups, props.hideLayers);
        return layerSet;
    }
    public initContext(layerSet: MgLayerSet, locale?: string, overviewMapElementSelector?: () => (Element | null)) {
        // HACK: className property not documented. This needs to be fixed in OL api doc.
        const overviewMapOpts: any = {
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: layerSet.getLayersForOverviewMap(),
            view: new olView({
                projection: layerSet.getProjection()
            }),
            tipLabel: tr("OL_OVERVIEWMAP_TIP", locale),
            collapseLabel: String.fromCharCode(187), //'\u00BB',
            label: String.fromCharCode(171) //'\u00AB'
        };

        if (overviewMapElementSelector) {
            const el = overviewMapElementSelector();
            if (el) {
                overviewMapOpts.target = ReactDOM.findDOMNode(el);
                overviewMapOpts.collapsed = false;
                overviewMapOpts.collapsible = false;
            }
        }
        this._ovMap = new olOverviewMap(overviewMapOpts);
        this._map.addControl(this._ovMap);
        layerSet.setMapGuideMocking(this.callback.getMockMode());
        layerSet.attach(this._map, this._ovMap, false);
    }
    public updateOverviewMapElement(overviewMapElementSelector: () => (Element | null)) {
        const el = overviewMapElementSelector();
        if (el) {
            this._ovMap.setCollapsed(false);
            this._ovMap.setCollapsible(false);
            this._ovMap.setTarget(ReactDOM.findDOMNode(el) as any);
        } else {
            this._ovMap.setCollapsed(true);
            this._ovMap.setCollapsible(true);
            this._ovMap.setTarget(null as any);
        }
    }
    public getOverviewMap(): olOverviewMap {
        return this._ovMap;
    }
    public getLayerSet(name: string, bCreate: boolean = false, props?: IMapViewerContextProps): MgLayerSet {
        let layerSet = this._layerSets[name];
        if (!layerSet && props && bCreate) {
            layerSet = this.initLayerSet(props);
            this._layerSets[props.map.Name] = layerSet;
            this._activeMapName = props.map.Name;
        }
        return layerSet;
    }
    public get isMouseOverTooltip() { return this._featureTooltip.isMouseOver || this._selectTooltip.isMouseOver; }
    public clearMouseTooltip(): void {
        this._mouseTooltip.clear();
    }
    public setMouseTooltip(text: string) {
        this._mouseTooltip.setText(text);
    }
    public handleMouseTooltipMouseMove(e: GenericEvent) {
        this._mouseTooltip?.onMouseMove?.(e);
    }
    public hideSelectedVectorFeaturesTooltip() {
        this._selectTooltip?.hide();
    }
    public showSelectedVectorFeatures(features: Collection<Feature>, pixel: [number, number], locale?: string) {
        this._selectTooltip?.showSelectedVectorFeatures(features, pixel, locale);
    }
    public queryWmsFeatures(map: olMap, layerMgr: ILayerManager, coord: Coordinate2D) {
        const res = map.getView().getResolution();
        this._selectTooltip?.queryWmsFeatures(layerMgr, coord, res, this.callback);
    }
    public queryFeatureTooltip(pixel: [number, number]) {
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.raiseQueryFromPoint(pixel);
        }
    }
    public handleFeatureTooltipMouseMove(e: GenericEvent) {
        if (this._featureTooltip && this._featureTooltip.isEnabled()) {
            this._featureTooltip.onMouseMove(e);
        }
    }
    public isFeatureTooltipEnabled(): boolean {
        return this._featureTooltip.isEnabled();
    }
    public enableFeatureTooltips(enabled: boolean): void {
        this._featureTooltip.setEnabled(enabled);
    }
    public refreshOnStateChange(map: RuntimeMap, showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined): void {
        const layerSet = this.getLayerSet(map.Name);
        layerSet.setMapGuideMocking(this.callback.getMockMode());
        layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
    }
    public refreshMap(name: string, mode: RefreshMode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly): void {
        const layerSet = this.getLayerSet(name);
        layerSet.refreshMap(mode);
    }
    public async showSelectedFeature(mapExtent: Bounds, size: Size, map: RuntimeMap, selectionColor: string, featureXml: string | undefined) {
        const sv = getSiteVersion(map);
        // This operation requires v4.0.0 QUERYMAPFEATURES, so bail if this ain't the right version
        if (!canUseQueryMapFeaturesV4(sv)) {
            return;
        }
        const layerSet = this.getLayerSet(map.Name);
        try {
            if (featureXml) {
                const r = await this.callback.getClient().queryMapFeatures_v4({
                    mapname: map.Name,
                    session: map.SessionId,
                    selectionformat: "PNG",
                    featurefilter: featureXml,
                    selectioncolor: selectionColor,
                    requestdata: 2, //Inline selection
                    layerattributefilter: 0,
                    persist: 0 //IMPORTANT: This is a transient selection
                });
                if (r.InlineSelectionImage) {
                    const dataUri = `data:${r.InlineSelectionImage.MimeType};base64,${r.InlineSelectionImage.Content}`;
                    layerSet.showActiveSelectedFeature(mapExtent, size, dataUri);
                } else {
                    layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
                }
            } else {
                layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
            }
        } catch (e) {
            layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
        }
    }
}