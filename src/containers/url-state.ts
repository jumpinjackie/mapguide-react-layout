import { UrlQueryParamTypes } from 'react-url-query';

export const urlPropsQueryConfig = {
    urlX: { type: UrlQueryParamTypes.number, queryParam: "x" },
    urlY: { type: UrlQueryParamTypes.number, queryParam: "y" },
    urlScale: { type: UrlQueryParamTypes.number, queryParam: "scale" },
    urlResource: { type: UrlQueryParamTypes.string, queryParam: "resource" },
    urlLocale: { type: UrlQueryParamTypes.string, queryParam: "locale" },
    urlSession: { type: UrlQueryParamTypes.string, queryParam: "session" },
    urlMap: { type: UrlQueryParamTypes.string, queryParam: "map" },
    urlShowLayers: { type: UrlQueryParamTypes.array, queryParam: "sl" },
    urlHideLayers: { type: UrlQueryParamTypes.array, queryParam: "hl" },
    urlShowGroups: { type: UrlQueryParamTypes.array, queryParam: "sg" },
    urlHideGroups: { type: UrlQueryParamTypes.array, queryParam: "hg" },
}

/**
 * Props exposed to URL state
 */
export interface IAppUrlStateProps {
    urlLocale?: string;
    urlSession?: string;
    urlResource: string;
    urlX?: number;
    urlY?: number;
    urlScale?: number;
    urlMap?: string;
    urlShowLayers?: string[];
    urlHideLayers?: string[];
    urlShowGroups?: string[];
    urlHideGroups?: string[];
}

export type UrlValueChangeCallback = (value: any) => void;