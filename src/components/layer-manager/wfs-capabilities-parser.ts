import { Bounds } from '../../api/common';
import { strIsNullOrEmpty } from '../../utils/string';

/**
 * The root WFS service capabilities
 * 
 * @interface IWfsServiceCapabilities
 * @since 0.13
 */
export interface IWfsServiceCapabilities {
    info: IWfsServiceInfo;
    layers: IWfsLayerInfo[];
}

/**
 * WFS service metadata
 * 
 * @interface IWfsServiceInfo
 * @since 0.13
 */
export interface IWfsServiceInfo {
    title: string;
    abstract: string;
    version: string;
    allowedOutputFormats?: string[];
}

/**
 * Metadata for a published WFS layer
 * 
 * @interface IWfsLayerInfo
 * @since 0.13
 */
export interface IWfsLayerInfo {
    name: string;
    title: string;
    abstract: string;
    wgs84Bounds?: Bounds;
    formats?: string[];
    defaultCrs: string;
    otherCrs?: string[];
}

function tryGetElementContent(el?: Element): string | undefined {
    if (el) {
        return el.textContent ?? (el as any).text;
    }
}

function getElements(root: Document | Element, tagName: string, ns?: string): Element[] {
    let els: HTMLCollectionOf<Element> | NodeListOf<Element>;
    if (ns) {
        els = root.getElementsByTagName(`${ns}:${tagName}`);
        if (els.length == 0) {
            //Try un-qualified
            els = root.getElementsByTagName(tagName);
        }
    } else {
        els = root.getElementsByTagName(tagName);
    }
    const elements = [] as Element[];
    if (els) {
        for (let i = 0; i < els.length; i++) {
            const el = els.item(i);
            if (el) {
                elements.push(el);
            }
        }
    }
    return elements;
}

function trySetProperty<T>(obj: T, setter: (o: T, v: string) => void, value: string | null | undefined) {
    if (value) {
        setter(obj, value);
    }
}

/**
 * A basic parser for WFS capabilities XML
 *
 * @class WfsCapabilitiesParser
 * @since 0.13
 */
export class WfsCapabilitiesParser {
    private xmlDoc: Document;
    constructor() {}
    public parse(xml: string): IWfsServiceCapabilities {
        const parser = new DOMParser();
        this.xmlDoc = parser.parseFromString(xml, "text/xml");
        const info = this.getServiceInfo();
        const layers = this.getLayers();
        return {
            info,
            layers
        };
    }
    private getServiceInfo(): IWfsServiceInfo {
        const els = getElements(this.xmlDoc, "ServiceIdentification", "ows");
        const info: IWfsServiceInfo = {
            title: "",
            abstract: "",
            version: ""
        };
        if (els.length == 1) {
            const t = tryGetElementContent(getElements(els[0], "Title", "ows")?.[0]);
            const a = tryGetElementContent(getElements(els[0], "Abstract", "ows")?.[0]);
            const ops = getElements(this.xmlDoc, "Operation", "ows");
            for (const op of ops) {
                if (op.getAttribute("name") == "GetFeature") {
                    const parms = getElements(op, "Parameter", "ows");
                    for (const parm of parms) {
                        if (parm.getAttribute("name") == "outputFormat") {
                            const allowedValues = getElements(parm, "Value", "ows")
                                .map(av => tryGetElementContent(av))
                                .filter(s => !strIsNullOrEmpty(s)) as string[];
                            if (allowedValues.length > 0) {
                                info.allowedOutputFormats = allowedValues;
                            }
                        }
                    }
                }
            }
            const v: string[] = getElements(els[0], "ServiceTypeVersion", "ows")
                .map(el => tryGetElementContent(el))
                .filter(s => !strIsNullOrEmpty(s)) as string[];
            v.sort();
            trySetProperty(info, (i, v) => i.title = v, t);
            trySetProperty(info, (i, v) => i.abstract = v, a);
            //Pick the last (highest) version
            if (v.length > 0) {
                info.version = v[v.length - 1];
            }
        }
        return info;
    }
    private getLayers(): IWfsLayerInfo[] {
        const els = getElements(this.xmlDoc, "FeatureType", "wfs");
        const layers = els.map(el => {
            const info: IWfsLayerInfo = {
                name: "",
                title: "",
                abstract: "",
                defaultCrs: ""
            };
            const n = tryGetElementContent(getElements(el, "Name", "wfs")?.[0]);
            const t = tryGetElementContent(getElements(el, "Title", "wfs")?.[0]);
            const a = tryGetElementContent(getElements(el, "Abstract", "wfs")?.[0]);
            const c = tryGetElementContent(
                getElements(el, "DefaultCRS", "wfs")?.[0] ?? // WFS 2.0.0
                getElements(el, "DefaultSRS", "wfs")?.[0]    // WFS older versions
            );
            const oc = getElements(el, "OtherCRS", "wfs")
                .map(fel => tryGetElementContent(fel))
                .filter(s => !strIsNullOrEmpty(s)) as string[];
            const os = getElements(el, "OtherSRS", "wfs")
                .map(fel => tryGetElementContent(fel))
                .filter(s => !strIsNullOrEmpty(s)) as string[];
            info.otherCrs = [...oc, ...os];
            const fmts = getElements(el, "Format", "wfs")
                .map(fel => tryGetElementContent(fel))
                .filter(s => !strIsNullOrEmpty(s)) as string[];
            const ll = tryGetElementContent(getElements(el, "LowerCorner", "ows")?.[0]);
            const ur = tryGetElementContent(getElements(el, "UpperCorner", "ows")?.[0]);
            trySetProperty(info, (i, v) => i.name = v, n);
            trySetProperty(info, (i, v) => i.title = v, t);
            trySetProperty(info, (i, v) => i.abstract = v, a);
            trySetProperty(info, (i, v) => i.defaultCrs = v, c);
            if (fmts.length > 0) {
                info.formats = fmts;
            }
            const llParts = ll?.split(' ').map(s => parseFloat(s));
            const urParts = ur?.split(' ').map(s => parseFloat(s));
            if (llParts?.length == 2 && urParts?.length == 2) {
                info.wgs84Bounds = [
                    llParts[0],
                    llParts[1],
                    urParts[0],
                    urParts[1]
                ];
            }
            return info;
        });
        return layers;
    }
}