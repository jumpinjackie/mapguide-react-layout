import { ActionType } from "../constants/actions";
import { ISetAppSettingAction } from "./defs";

/**
 * Sets an app setting to the given value
 * 
 * @param key 
 * @param value 
 * @since 0.14.8
 */
export function setAppSetting(key: string, value: string): ISetAppSettingAction {
    return {
        type: ActionType.SET_APP_SETTING,
        payload: {
            key,
            value
        }
    }
}