import * as React from "react";
import { IApplicationState } from "../api/common";
import { acknowledgeInitWarnings } from "../actions/init";
import { useDispatch, useSelector } from "react-redux";
import { tr } from "../api/i18n";
import { Dialog, Button, Intent } from '@blueprintjs/core';

export interface IInitWarningDisplayProps {

}

interface IWDState {
    warnings: string[];
    locale: string;
}

const InitWarningDisplay = () => {
    const dispatch = useDispatch();
    const acknowledge = () => dispatch(acknowledgeInitWarnings());
    const { warnings, locale } = useSelector<IApplicationState, IWDState>(state => {
        return {
            warnings: state.initError.warnings,
            locale: state.config.locale
        };
    });
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

export default InitWarningDisplay;