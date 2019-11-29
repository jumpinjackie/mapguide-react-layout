import * as React from "react";
import { tr } from '../api/i18n';
import { getViewer } from '../api/runtime';
import CopyToClipboard = require('react-copy-to-clipboard');
import { parseUrl, stringifyQuery } from "../utils/url";
import { TextArea, Checkbox } from '@blueprintjs/core';
import { useViewerLocale } from './hooks';

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerProps
 */
export interface IShareLinkToViewContainerProps {

}

function NOOP() {}

const ShareLinkToViewContainer = () => {
    const [showSession, setShowSession] = React.useState(false);
    const locale = useViewerLocale();
    const onShowSessionChanged = () => setShowSession(!showSession);
    const onCopied = () => {
        const v = getViewer();
        if (v) {
            v.toastSuccess("clipboard", tr("SHARE_LINK_COPIED", locale));
        }
    };
    const parsed = parseUrl(`${window.location}`);
    if (!showSession) {
        delete parsed.query.session;
    }
    const shareUrl = `${parsed.url}?${stringifyQuery(parsed.query)}`;
    return <div>
        <TextArea fill={true} rows={16} readOnly value={shareUrl} onChange={NOOP} />
        <br />
        <div style={{ padding: 15 }}>
            <Checkbox checked={showSession} label={tr("SHARE_LINK_INCLUDE_SESSION", locale)} onChange={onShowSessionChanged} />
            <CopyToClipboard text={shareUrl} onCopy={onCopied}>
                <button className="pt-button">{tr("SHARE_LINK_COPY_CLIPBOARD", locale)}</button>
            </CopyToClipboard>
        </div>
    </div>;
};

export default ShareLinkToViewContainer;