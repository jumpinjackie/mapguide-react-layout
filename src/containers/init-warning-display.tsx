import * as React from "react";
import { acknowledgeInitWarnings } from "../actions/init";
import { tr } from "../api/i18n";
import { Dialog } from '@blueprintjs/core';
import { useInitWarnings, useViewerLocale } from './hooks';
import { useReduxDispatch } from "../components/map-providers/context";
import { useElementContext } from "../components/elements/element-context";

export interface IInitWarningDisplayProps {

}


export const InitWarningDisplay = () => {
    const { Button } = useElementContext();
    const dispatch = useReduxDispatch();
    const acknowledge = () => dispatch(acknowledgeInitWarnings());
    const warnings = useInitWarnings();
    const locale = useViewerLocale();
    if (warnings && warnings.length && acknowledge) {
        return <Dialog
            icon="warning-sign"
            isOpen={true}
            usePortal={false}
            onClose={acknowledge}
            title={tr("WARNING", locale)}>
            <div className="bp3-dialog-body">
                <p>{tr("INIT_WARNINGS_FOUND", locale)}</p>
                <ul>
                    {warnings.map(w => <li key={w}>{w}</li>)}
                </ul>
            </div>
            <div className="bp3-dialog-footer">
                <div className="bp3-dialog-footer-actions">
                    <Button
                        variant="primary"
                        onClick={acknowledge}>{tr("OK", locale)}</Button>
                </div>
            </div>
        </Dialog>
    } else {
        return <noscript />;
    }
}