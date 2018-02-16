import * as React from "react";
import { connect } from "react-redux";
import { 
    IApplicationState,
    ReduxDispatch
} from '../api/common';
import { addUrlProps } from 'react-url-query';
import { urlPropsQueryConfig, IAppUrlStateProps } from './url-state';
import { Checkbox, TextArea } from '@blueprintjs/core';
import queryString = require("query-string");

export interface IShareLinkToViewContainerProps {

}

export interface IShareLinkToViewContainerState {

}

export interface IShareLinkToViewContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IShareLinkToViewContainerState> {
    return {

    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IShareLinkToViewContainerDispatch> {
    return { };
}

function NOOP() {}

export type ShareLinkToViewContainerProps = IShareLinkToViewContainerProps & Partial<IAppUrlStateProps> & Partial<IShareLinkToViewContainerState> & Partial<IShareLinkToViewContainerDispatch>;

export class ShareLinkToViewContainer extends React.Component<ShareLinkToViewContainerProps, any> {
    constructor(props: ShareLinkToViewContainerProps) {
        super(props);
        this.state = {
            showSession: false
        };
    }
    private onShowSessionChanged = (e: any) => {
        this.setState({ showSession: !this.state.showSession });
    }
    render(): JSX.Element {
        const parsed = queryString.parseUrl(`${window.location}`);
        if (!this.state.showSession) {
            delete parsed.query.session;
        }
        return <div>
            <TextArea fill={true} rows={16} readOnly value={`${parsed.url}?${queryString.stringify(parsed.query)}`} onChange={NOOP} />
            <br />
            <Checkbox checked={this.state.showSession} label="Include Session ID" onChange={this.onShowSessionChanged} />
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addUrlProps<ShareLinkToViewContainer>({ urlPropsQueryConfig })(ShareLinkToViewContainer));