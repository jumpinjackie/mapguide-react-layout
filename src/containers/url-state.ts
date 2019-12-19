import { appendParameters, parseUrlParameters } from '../utils';

/**
 * @since 0.13
 */
export interface IAppUrlState {
    x?: number;
    y?: number;
    scale?: number;
    resource?: string;
    locale?: string;
    session?: string;
    map?: string;
    sl?: string[];
    hl?: string[];
    sg?: string[];
    hg?: string[];
}

const S_DELIM = "_"; //This is the current layer/group name delimiter

/**
 * @since 0.13
 */
export function updateUrl(state: IAppUrlState): void {
    const st: any = {};
    for (const k in state) {
        const val: any = (state as any)[k];
        switch (k) {
            case "sl":
                st.sl = val?.join(S_DELIM);
                break;
            case "hl":
                st.hl = val?.join(S_DELIM);
                break;
            case "sg":
                st.sg = val?.join(S_DELIM);
                break;
            case "hg":
                st.hg = val?.join(S_DELIM);
                break;
            default:
                st[k] = val;
                break;
        }
    }
    const url = appendParameters(window.location.href, st, true, false);
    window.history.pushState(st, "", url);
}

/**
 * @since 0.13
 */
export function getStateFromUrl(): IAppUrlState {
    const st = parseUrlParameters(window.location.href);
    const state: IAppUrlState = {};
    for (const k in st) {
        const val = st[k];
        switch (k) {
            case "x":
                {
                    const n = parseFloat(val);
                    if (!isNaN(n)) {
                        state.x = n;
                    }
                }
                break;
            case "y":
                {
                    const n = parseFloat(val);
                    if (!isNaN(n)) {
                        state.y = n;
                    }
                }
                break;
            case "scale":
                {
                    const n = parseFloat(val);
                    if (!isNaN(n)) {
                        state.scale = n;
                    }
                }
                break;
            case "sl":
                state.sl = val?.split(S_DELIM);
                break;
            case "hl":
                state.hl = val?.split(S_DELIM);
                break;
            case "sg":
                state.sg = val?.split(S_DELIM);
                break;
            case "hg":
                state.hg = val?.split(S_DELIM);
                break;
            default:
                (state as any)[k] = val;
                break;
        }
    }
    return state;
}