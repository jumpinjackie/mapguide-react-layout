import { SourceProperty } from './common';
import { defaultImageLoadFunction } from "ol/source/Image";
import olMapGuideSource from "ol/source/ImageMapGuide";
import olImageLayer from "ol/layer/Image";
import { assertNever } from '../utils/never';
import { LayerSetGroupBase } from './layer-set-group-base';
import { IMgLayerSetProps, IMgLayerSetCallback, MgInnerLayerSetFactory, mockMapGuideImageLoadFunction, blankImageLoadFunction, MgLayerSetMode } from './layer-set';
import { MapGuideMockMode } from '../components/mapguide-debug-context';
export class MgLayerSetGroup extends LayerSetGroupBase {
    constructor(props: IMgLayerSetProps, callback: IMgLayerSetCallback) {
        super(callback);
        const factory = new MgInnerLayerSetFactory(callback, props.map, props.agentUri, props.imageFormat, props.selectionImageFormat, props.selectionColor);
        //NOTE: MapGuide does not like concurrent map rendering operations of the same mapname/session pair, which
        //this will do when the MG overlay is shared between the main viewer and the overview map. This is probably
        //because the concurrent requests both have SET[X/Y/SCALE/DPI/etc] parameters attached, so there is concurrent
        //requests to modify and persist the runtime map state (in addition to the rendering) and there is most likely
        //server-side lock contention to safely update the map state. Long story short: re-using the main overlay for the
        //OverviewMap control IS A BAD THING. Same thing happens with selection overlays
        //
        //As of OL6, this unwanted behavior from shared layers extends to all layer types, so what this means is that
        //we have to create 2 sets of layers, one for the main map and one for the overview map. We CANNOT and DO NOT share
        //any of these layer instances between the main map and the overview map!
        this.mainSet = factory.create(props.locale, props.externalBaseLayers, props.stateless ? MgLayerSetMode.Stateless : MgLayerSetMode.Stateful);
        this.overviewSet = factory.create(props.locale, props.externalBaseLayers, MgLayerSetMode.OverviewMap);
        const progressNotifySources = this.mainSet.getSourcesForProgressTracking();
        /*
        console.log("Draw Order:");
        for (let i = 0; i < layers.length; i++) {
            console.log(" " + layers[i].get(LayerProperty.LAYER_NAME));
        }
        */
        for (const src of progressNotifySources) {
            const suppress: boolean | undefined = src.get(SourceProperty.SUPPRESS_LOAD_EVENTS);
            if (!(suppress == true))
                this.registerSourceEvents(src);
        }
    }
    /**
     * @override
     * @returns
     * @memberof MgLayerSetGroup
     */
    public tryGetWmsSource() {
        return undefined;
    }
    public updateSelectionColor = (color: string) => this.mainSet.updateSelectionColor(color);
    public setMapGuideMocking(mock: MapGuideMockMode | undefined) {
        const allLayers = this.mainSet.getLayers();
        for (const layer of allLayers) {
            if (layer instanceof olImageLayer) {
                const source = layer.getSource();
                if (source instanceof olMapGuideSource) {
                    if (typeof (mock) != 'undefined') {
                        switch (mock) {
                            case MapGuideMockMode.RenderPlaceholder:
                                source.setImageLoadFunction(mockMapGuideImageLoadFunction);
                                break;
                            case MapGuideMockMode.DoNotRender:
                                source.setImageLoadFunction(blankImageLoadFunction);
                                break;
                            default:
                                assertNever(mock);
                                break;
                        }
                    }
                    else {
                        source.setImageLoadFunction(defaultImageLoadFunction);
                    }
                }
            }
        }
    }
    public update = (showGroups: string[] | undefined, showLayers: string[] | undefined, hideGroups: string[] | undefined, hideLayers: string[] | undefined) => this.mainSet.update(showGroups, showLayers, hideGroups, hideLayers);
}
