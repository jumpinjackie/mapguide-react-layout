import * as React from "react";
import { acknowledgeInitWarnings } from "../actions/init";
import { useDispatch } from "react-redux";
import { tr } from "../api/i18n";
import { Dialog, Button, Intent } from '@blueprintjs/core';
import { useInitWarnings, useViewerLocale } from './hooks';

export interface IInitWarningDisplayProps {

}


export const InitWarningDisplay = () => {
    const dispatch = useDispatch();
    const acknowledge = () => dispatch(acknowledgeInitWarnings());
    const warnings = useInitWarnings();
    const locale = useViewerLocale();
    if (warnings && warnings.length && acknowledge) {
        return <Dialog
            icon="warning-sign"
            isOpen={true}
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
                        intent={Intent.PRIMARY}
                        onClick={acknowledge}
                        text={tr("OK", locale)}
                    />
                </div>
            </div>
        </Dialog>
    } else {
        return <noscript />;
    }
}