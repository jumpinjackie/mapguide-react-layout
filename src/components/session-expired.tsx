import * as React from "react";

function reload(e) {
    e.preventDefault();
    //TODO: This is obviously the nuclear solution.
    //
    //The more graceful solution is to re-create the runtime map and interleave the response
    //into the current redux store and preserve the existing view and layer/group state and
    //we should be able to continue where we left off
    window.location.reload();
    return false;
}

export const SessionExpired = (props) => {
    return <div style={{ padding: 5 }}>
        <p>Your current MapGuide session has expired.</p>
        <p><strong>Available Actions:</strong></p>
        <ul>
            <li><a href="#" onClick={reload}>Reload the viewer</a></li>
        </ul>
    </div>;
};