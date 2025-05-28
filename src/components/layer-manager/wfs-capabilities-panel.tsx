import * as React from "react";
import { IWfsServiceCapabilities, IWfsServiceInfo, IWfsLayerInfo } from './wfs-capabilities-parser';
import { tr } from '../../api/i18n';
import { Bounds } from '../../api/common';
import { ElementGroup, useElementContext } from "../elements/element-context";

/**
 * Attempts to extract an EPSG code from the given CRS identifier
 *
 * @param {string | undefined} crs
 * @returns {(number | undefined)}
 * @since 0.13
 */
export function parseEpsgCodeFromCRS(crs: string | undefined): number | undefined {
    if (crs == "urn:ogc:def:crs:OGC:1.3:CRS84") {
        return 4326;
    }
    let res = crs?.match(/urn:ogc:def:crs:EPSG::(\d+)/);
    if (res?.length == 2) {
        return parseInt(res[1], 10);
    }
    res = crs?.match(/EPSG:(\d+)/);
    if (res?.length == 2) {
        return parseInt(res[1], 10);
    }
    return undefined;
}

function isGeoJsonMimeType(mimeType: string): boolean {
    const lmt = mimeType?.toLowerCase() ?? "";
    if (lmt.indexOf("application/vnd.geo+json") >= 0 ||
        lmt.indexOf("application/json") >= 0 ||
        lmt.indexOf("geojson") >= 0) {
        return true;
    }
    return false;
}

function getGeoJsonFormat(serviceInfo: IWfsServiceInfo, layer: IWfsLayerInfo): string | undefined {
    const lformats = (layer.formats ?? []).filter(f => isGeoJsonMimeType(f))?.[0];
    // NOTE: Some WFS services advertise GeoJSON support as an allowed outputFormat parameter at the service-level, 
    // but not as an advertised outputFormat for the layer in question. Without fully reading the spec, I don't know
    // if using GetFeature for a layer with a service-level outputFormat for such layers is formally allowed. Based
    // on my sample WFS services, this appears to be allowed, so if geojson is supported at the service-level, but
    // not at the layer level, we'll still consider geojson as being "supported"
    const sformats = (serviceInfo.allowedOutputFormats ?? []).filter(f => isGeoJsonMimeType(f))?.[0];
    return lformats ?? sformats;
}

function getLayerCrs(layer: IWfsLayerInfo): [number | undefined, string] {
    let pdc: [number | undefined, string] = [parseEpsgCodeFromCRS(layer.defaultCrs), layer.defaultCrs];
    // We strongly prefer 4326/3857 projections over others
    if (!(pdc[0] == 4326 || pdc[0] == 3857)) {
        if (layer.otherCrs) {
            const matches = layer.otherCrs.filter(c => {
                const poc = parseEpsgCodeFromCRS(c);
                return (poc == 4326 || poc == 3857);
            });
            if (matches.length > 0) {
                pdc = [parseEpsgCodeFromCRS(matches[0]), matches[0]];
            }
        }
    }
    return pdc;
}

/**
 * @hidden
 */
export interface IWfsCapabilitiesPanelProps {
    capabilities: IWfsServiceCapabilities;
    locale: string;
    onAddLayer: (name: string, version: string, format: string, origCrs: string, epsgCode: number, wfsWgs84Bounds?: Bounds) => void;
}

/**
 * @hidden
 */
export const WfsCapabilitiesPanel = (props: IWfsCapabilitiesPanelProps) => {
    const { Card, Icon, Button } = useElementContext();
    const { locale, capabilities, onAddLayer } = props;
    const { layers, info } = capabilities;
    return <>
        <Card>
            <h5 className="bp3-heading"><a href="#">{tr("WFS_SERVICE_INFO", locale)}</a></h5>
            <p>{tr("WFS_VERSION", locale, { version: info.version })}</p>
            <p>{tr("OWS_SERVICE_TITLE", locale, { title: info.title })}</p>
            <p>{tr("OWS_SERVICE_ABSTRACT", locale, { abstract: info.abstract })}</p>
        </Card>
        <Card style={{ marginBottom: 10 }}>
            <h5 className="bp3-heading"><a href="#">{tr("WFS_AVAILABLE_LAYERS", locale)}</a></h5>
            {layers.map(layer => {
                const geoJsonFmt = getGeoJsonFormat(info, layer);
                const [epsgCode, origCrs] = getLayerCrs(layer);
                //Only include layers whose CRS was able to be parsed into an epsg code
                if (epsgCode && geoJsonFmt) {
                    const otherActions = <></>;
                    return <Card key={layer.name} style={{ padding: 15, paddingTop: 5 }}>
                        <h4><Icon icon="layer" /> {layer.name}</h4>
                        <p>{tr("OWS_LAYER_TITLE", locale, { title: layer.title })}</p>
                        <p>{tr("OWS_LAYER_CRS", locale, { crs: `EPSG:${epsgCode}` })}</p>
                        {/*<p>{tr("OWS_LAYER_ABSTRACT", locale, { abstract: layer.abstract })}</p>*/}
                        <ElementGroup>
                            <Button onClick={() => onAddLayer(layer.name, info.version, geoJsonFmt, origCrs, epsgCode, layer.wgs84Bounds)} variant="primary" icon="new-layer">{tr("ADD_LAYER", locale)}</Button>
                            {otherActions}
                        </ElementGroup>
                    </Card>
                }
            }).filter(c => c)}
        </Card>
    </>
}