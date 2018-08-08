import * as React from "react";
import { IApplicationState, ReduxDispatch } from "../api/common";
import { acknowledgeInitWarnings } from "../actions/init";
import { connect } from "react-redux";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { Dialog } from '@blueprintjs/core/lib/esm/components/dialog/dialog';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { Intent } from '@blueprintjs/core/lib/esm/common/intent';

export interface IInitWarningDisplayProps {
    
}

export interface IInitWarningDisplayState { 
    warnings: string[];
    locale: string;
}

export interface IInitWarningDisplayDispatch {
    acknowledge: () => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IInitWarningDisplayState> {
    return {
        warnings: state.initError.warnings,
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IInitWarningDisplayDispatch> {
    return {
        acknowledge: () => dispatch(acknowledgeInitWarnings())
    };
}

export type InitWarningDisplayProps = Partial<IInitWarningDisplayProps> & Partial<IInitWarningDisplayState> & Partial<IInitWarningDisplayDispatch>;

export class InitWarningDisplay extends React.Component<InitWarningDisplayProps, any> {
    constructor(props: IInitWarningDisplayProps) {
        super(props);
    }
    render(): JSX.Element {
        const { warnings, acknowledge } = this.props;
        const locale = this.props.locale || DEFAULT_LOCALE;
        if (warnings && warnings.length && acknowledge) {
            return <Dialog
                icon="warning-sign"
                isOpen={true}
                onClose={acknowledge}
                title={tr("WARNING", locale)}>
                <div className="pt-dialog-body">
                    <p>{tr("INIT_WARNINGS_FOUND", locale)}</p>
                    <ul>
                        {warnings.map(w => <li key={w}>{w}</li>)}
                    </ul>
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
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
}

export default connect(mapStateToProps, mapDispatchToProps)(InitWarningDisplay);