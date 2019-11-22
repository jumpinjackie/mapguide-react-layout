import * as React from "react";
import { connect } from "react-redux";
import {
    IApplicationState
} from '../api/common';
import { addUrlProps } from 'react-url-query';
import { urlPropsQueryConfig, IAppUrlStateProps } from './url-state';
import { tr } from '../api/i18n';
import { getViewer } from '../api/runtime';
import { Checkbox, TextArea } from '@blueprintjs/core';
import CopyToClipboard = require('react-copy-to-clipboard');
import { parseUrl, stringifyQuery } from "../utils/url";

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerProps
 */
export interface IShareLinkToViewContainerProps {

}

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerState
 */
export interface IShareLinkToViewContainerState {
    locale: string;
}

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerDispatch
 */
export interface IShareLinkToViewContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IShareLinkToViewContainerState> {
    return {
        locale: state.config.locale
    };
}

function mapDispatchToProps(): Partial<IShareLinkToViewContainerDispatch> {
    return {};
}

function NOOP() { }

/**
 * @since 0.11
 */
export type ShareLinkToViewContainerProps = IShareLinkToViewContainerProps & Partial<IAppUrlStateProps> & Partial<IShareLinkToViewContainerState> & Partial<IShareLinkToViewContainerDispatch>;

/**
 * A component for sharing a link to the current view
 * @since 0.11
 * @export
 * @class ShareLinkToViewContainer
 * @extends {React.Component<ShareLinkToViewContainerProps, any>}
 */
export class ShareLinkToViewContainer extends React.Component<ShareLinkToViewContainerProps, any> {
    constructor(props: ShareLinkToViewContainerProps) {
        super(props);
        this.state = {
            showSession: false
        };
    }
    private onShowSessionChanged = () => {
        this.setState({ showSession: !this.state.showSession });
    }
    private onCopied = () => {
        const v = getViewer();
        if (v) {
            v.toastSuccess("clipboard", tr("SHARE_LINK_COPIED", this.props.locale));
        }
    }
    render(): JSX.Element {
        const parsed = parseUrl(`${window.location}`);
        if (!this.state.showSession) {
            delete parsed.query.session;
        }
        const shareUrl = `${parsed.url}?${stringifyQuery(parsed.query)}`;
        return <div>
            <TextArea fill={true} rows={16} readOnly value={shareUrl} onChange={NOOP} />
            <br />
            <div style={{ padding: 15 }}>
                <Checkbox checked={this.state.showSession} label={tr("SHARE_LINK_INCLUDE_SESSION", this.props.locale)} onChange={this.onShowSessionChanged} />
                <CopyToClipboard text={shareUrl} onCopy={this.onCopied}>
                    <button className="pt-button">{tr("SHARE_LINK_COPY_CLIPBOARD", this.props.locale)}</button>
                </CopyToClipboard>
            </div>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(addUrlProps<ShareLinkToViewContainer>({ urlPropsQueryConfig })(ShareLinkToViewContainer));