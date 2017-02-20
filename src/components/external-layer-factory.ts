import { MgError } from "../api/error";
import { IExternalBaseLayer } from "../api/common";
import Source from "ol/source/source";
import XYZ from "ol/source/xyz";
import OSM from "ol/source/osm";
import Stamen from "ol/source/stamen";

interface OLSourceCtor {
    new (options?: any): Source;
}

export function createExternalSource(layer: IExternalBaseLayer) {
    let sourceCtor: OLSourceCtor;

    switch (layer.kind) {
        case "XYZ":
            sourceCtor = XYZ;
            break;
        case "OSM":
            sourceCtor = OSM;
            break;
        case "Stamen":
            sourceCtor = Stamen;
            break;
        default:
            throw new MgError(`Unknown external base layer provider: ${layer.kind}`);
    }
    if (typeof(layer.options) != 'undefined')
        return new sourceCtor(layer.options);
    else
        return new sourceCtor();
}