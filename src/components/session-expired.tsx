import * as React from "react";
import { tr } from "../api/i18n";
import { GenericEvent } from "../api/common";

function reload(e: GenericEvent) {
    e.preventDefault();
    //TODO: This is obviously the nuclear solution.
    //
    //The more graceful solution is to re-create the runtime map and interleave the response
    //into the current redux store and preserve the existing view and layer/group state and
    //we should be able to continue where we left off
    window.location.reload();
    return false;
}

export interface ISessionExpiredProps {
    locale: string;
}

/**
 * Displays the "session expired" error message with possible recovery actions
 * @param props
 */
export const SessionExpired = (props: ISessionExpiredProps) => {
    return <div className="component-session-expired">
        <p>{tr("SESSION_EXPIRED_DETAILED", props.locale)}</p>
        <p><strong>{tr("SESSION_EXPIRED_AVAILABLE_ACTIONS", props.locale)}</strong></p>
        <ul>
            <li><a href="#" onClick={reload}>{tr("SESSION_EXPIRED_RELOAD_VIEWER", props.locale)}</a></li>
        </ul>
    </div>;
};