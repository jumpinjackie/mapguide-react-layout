import { strStartsWith } from '../utils/string';
import { QueryMapFeaturesResponse } from './contracts/query';

/**
 * session-store.ts
 * 
 * A thin-wrapper layer over local storage for storing any data related to viewer sessions
 */

/**
 * @since 0.12
 */
export async function clearSessionStore(): Promise<void> {
    try {
        for (const key in window.localStorage) {
            if (strStartsWith(key, "selection_")) {
                window.localStorage.removeItem(key);
            }
        }
    } catch (e) {

    }
}

function encodeKey(sessionId: string, mapName: string) {
    return `selection_${sessionId}_${mapName}`;
}

export async function persistSelectionSetToLocalStorage(sessionId: string, mapName: string, resp: QueryMapFeaturesResponse): Promise<void> {
    const key = encodeKey(sessionId, mapName);
    const value = JSON.stringify(resp);
    try {
        window.localStorage.setItem(key, value);
    } catch (e) {

    }
}

export async function retrieveSelectionSetFromLocalStorage(sessionId: string, mapName: string): Promise<QueryMapFeaturesResponse | undefined> {
    const key = encodeKey(sessionId, mapName);
    const content = window.localStorage.getItem(key);
    if (content) {
        return JSON.parse(content);
    }
}