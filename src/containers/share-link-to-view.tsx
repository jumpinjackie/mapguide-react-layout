import * as React from "react";
import { tr } from '../api/i18n';
import { getViewer } from '../api/runtime';
import CopyToClipboard from 'calcite-react/CopyToClipboard';
import { parseUrl, stringifyQuery } from "../utils/url";
import { useViewerLocale } from './hooks';
import Button from 'calcite-react/Button';
import TextField from 'calcite-react/TextField';
import styled from "styled-components";
import Checkbox from 'calcite-react/Checkbox';

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerProps
 */
export interface IShareLinkToViewContainerProps {

}

const FullWidthTextField = styled(TextField)`
    width: 100%;
`;

function NOOP() {}

const ShareLinkToViewContainer = () => {
    const [showSession, setShowSession] = React.useState(false);
    const locale = useViewerLocale();
    const onShowSessionChanged = () => setShowSession(!showSession);
    const parsed = parseUrl(`${window.location}`);
    if (!showSession) {
        delete parsed.query.session;
    }
    const shareUrl = `${parsed.url}?${stringifyQuery(parsed.query)}`;
    return <div>
        <FullWidthTextField type="textarea" rows={8} readOnly value={shareUrl} onChange={NOOP} />
        <br />
        <div style={{ padding: 15 }}>
            <Checkbox checked={showSession} onChange={onShowSessionChanged}>{tr("SHARE_LINK_INCLUDE_SESSION", locale)}</Checkbox>
            <CopyToClipboard copyValue={shareUrl}>
                <Button>{tr("SHARE_LINK_COPY_CLIPBOARD", locale)}</Button>
            </CopyToClipboard>
        </div>
    </div>;
};

export default ShareLinkToViewContainer;