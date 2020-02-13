import * as React from "react";
import { LayerProperty, GenericEvent, Bounds } from '../../api/common';
import { ControlGroup, InputGroup, Button, Intent, NonIdealState, Spinner } from '@blueprintjs/core';
import { tr } from "../../api/i18n";
import { Error } from "../error";
import { Client } from "../../api/client";
import { WfsCapabilitiesParser, IWfsServiceCapabilities } from "./wfs-capabilities-parser";
import { WfsCapabilitiesPanel } from './wfs-capabilities-panel';
import olVectorSource, { LoadingStrategy } from "ol/source/Vector";
import olVectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { FeatureUrlFunction } from "ol/featureloader";
import { parseUrl } from '../../utils/url';
import { 
    setOLVectorLayerStyle,
    DEFAULT_POINT_CIRCLE_STYLE,
    DEFAULT_LINE_STYLE,
    DEFAULT_POLY_STYLE
} from '../../api/ol-style-helpers';
import { ensureProjection } from '../../api/registry/projections';
import { IAddLayerContentProps } from './add-layer';
import { getLayerInfo } from '../../api/layer-manager';
import { getViewer } from '../../api/runtime';

/**
 * @hidden
 */
export const AddWfsLayer = (props: IAddLayerContentProps) => {
    const { locale } = props;
    const [wfsUrl, setWfsUrl] = React.useState("");
    const [loadingCapabilities, setLoadingCapabilities] = React.useState(false);
    const [caps, setCaps] = React.useState<IWfsServiceCapabilities | undefined>(undefined);
    const [error, setError] = React.useState<Error | string | undefined>(undefined);
    const onAddLayer = (name: string, version: string, format: string, origCrs: string, epsgCode: number, wfsWgs84Bounds?: Bounds) => {
        const viewer = getViewer();
        if (caps && viewer) {
            ensureProjection(epsgCode, locale, origCrs).then(([, resolvedProj]) => {
                const sourceProj = viewer.getProjection();
                //TODO: For correctness, we should be using the URL from the ows:Get element of the
                //GetFeature operations metadata instead of just re-computing the WFS GetFeature URL
                //relative to the capabilities URL that was entered
                const parsed = parseUrl(wfsUrl);
                let typeNameKey = "typename";
                if (version == "2.0.0") { //WFS 2.0.0 want typename(s) over typename
                    typeNameKey = "typenames";
                }
                let urlTemplate = `${parsed.url}?service=WFS&version=${version}&request=GetFeature&${typeNameKey}=${encodeURIComponent(name)}&outputFormat=${encodeURIComponent(format)}&srsName=${encodeURIComponent(origCrs)}`;
                let sourceUrl: string | FeatureUrlFunction;
                let strategy: LoadingStrategy | undefined;
                const vectorFmt = new GeoJSON({
                    dataProjection: resolvedProj,
                    featureProjection: sourceProj
                });
                // FIXME: I can't seem to get bbox strategy working in general :(
                if (false) {
                /*if (repsg == 4326 || repsg == 3857) {
                    urlTemplate += `&bbox={view_extent}`;
                    sourceUrl = function (extent) {
                        const xfextent = transformExtent(extent, sourceProj, resolvedProj);
                        const reqUrl = strReplaceAll(urlTemplate, "{view_extent}", xfextent.join(','));
                        return reqUrl;
                    }
                    strategy = bbox;
                    // We need to "decorate" the underlying loadFeaturesXhr loader so that
                    // we have the means to call busy worker incrementing/decrementing
                    innerLoader = loadFeaturesXhr(sourceUrl, vectorFmt, () => { //success
                        viewer.addImageLoaded();
                        props.onRemoveLayerBusyWorker(name);
                    }, () => { //failure
                        viewer.addImageLoaded();
                        props.onRemoveLayerBusyWorker(name);
                    });*/
                } else {
                    sourceUrl = urlTemplate;
                }
                const source = new olVectorSource({
                    format: vectorFmt,
                    url: sourceUrl,
                    strategy: strategy/*,
                    loader: innerLoader ? (function() {
                        viewer.addImageLoading();
                        props.onAddLayerBusyWorker(name);
                        innerLoader?.apply(source, arguments);
                    }) : undefined*/
                });
                const layer = new olVectorLayer({
                    source: source,
                    className: "external-vector-layer" //This is to avoid false positives for map.forEachLayerAtPixel
                });
                layer.set(LayerProperty.LAYER_TYPE, "WFS");
                layer.set(LayerProperty.IS_EXTERNAL, true);
                layer.set(LayerProperty.IS_SELECTABLE, true);
                layer.set(LayerProperty.IS_GROUP, false);
                if (wfsWgs84Bounds) {
                    layer.set(LayerProperty.WGS84_BBOX, wfsWgs84Bounds);
                }
                setOLVectorLayerStyle(layer, {
                    point: DEFAULT_POINT_CIRCLE_STYLE,
                    line: DEFAULT_LINE_STYLE,
                    polygon: DEFAULT_POLY_STYLE
                });
                viewer.getLayerManager().addLayer(name, layer);
                viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name: name }));
                props.onLayerAdded(getLayerInfo(layer, true));
            });
        }
    };
    const onLoadCaps = () => {
        setCaps(undefined);
        setLoadingCapabilities(true);
        const client = new Client("", "mapagent");
        client.getText(wfsUrl).then(s => {
            const parser = new WfsCapabilitiesParser();
            const caps = parser.parse(s);
            setLoadingCapabilities(false);
            setCaps(caps);
            setError(undefined);
        }).catch(err => {
            setLoadingCapabilities(false);
            setCaps(undefined);
            setError(err);
        });
    };
    const onWmsUrlChange = (e: GenericEvent) => {
        setWfsUrl(e.target.value);
    };
    return <div>
        <ControlGroup fill>
            <InputGroup leftIcon="geosearch"
                placeholder={tr("ADD_WFS_LAYER_URL", locale)}
                value={wfsUrl}
                onChange={onWmsUrlChange}
                readOnly={loadingCapabilities}
                rightElement={<Button intent={Intent.PRIMARY} icon="arrow-right" onClick={onLoadCaps} disabled={loadingCapabilities} />} />
        </ControlGroup>
        <br />
        <div>
            {(() => {
                if (loadingCapabilities) {
                    return <NonIdealState
                        icon={<Spinner intent={Intent.NONE} size={Spinner.SIZE_LARGE} />}
                        title={tr("ADD_WFS_LAYER_LOADING", locale)}
                        description={tr("ADD_WFS_LAYER_LOADING_DESC", locale)} />;
                } else {
                    if (caps) {
                        return <WfsCapabilitiesPanel onAddLayer={onAddLayer} capabilities={caps} locale={locale} />;
                    } else if (error) {
                        return <Error error={error} />;
                    } else {
                        return <NonIdealState
                            icon="issue"
                            title={tr("ADD_WFS_LAYER_NO_LAYERS", locale)}
                            description={tr("WFS_NO_LAYER_DESCRIPTION", locale)} />;
                    }
                }
            })()}
        </div>
    </div>;
}