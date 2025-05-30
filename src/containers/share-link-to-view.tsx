import * as React from "react";
import { tr } from '../api/i18n';
import CopyToClipboard from 'react-copy-to-clipboard';
import { parseUrl, stringifyQuery } from "../utils/url";
import { useViewerLocale } from './hooks';
import { useActiveMapState } from "./hooks-mapguide";
import { useElementContext } from "../components/elements/element-context";
import { useMapProviderContext } from "../components/map-providers/context";

/**
 * 
 * @since 0.11
 * @interface IShareLinkToViewContainerProps
 */
export interface IShareLinkToViewContainerProps {

}

function NOOP() {}

export const ShareLinkToViewContainer = () => {
    const { Checkbox, Button } = useElementContext();
    const [showSession, setShowSession] = React.useState(false);
    const locale = useViewerLocale();
    const map = useActiveMapState();
    const onShowSessionChanged = () => setShowSession(!showSession);
    const v = useMapProviderContext();
    const onCopied = () => {
        if (v.isReady()) {
            v.toastSuccess("clipboard", tr("SHARE_LINK_COPIED", locale));
        }
    };
    const parsed = parseUrl(`${window.location}`);
    if (!showSession) {
        delete parsed.query.session;
    }
    const shareUrl = `${parsed.url}?${stringifyQuery(parsed.query)}`;
    return <div>
        <textarea style={{ width: "100%" }} rows={16} readOnly value={shareUrl} onChange={NOOP} />
        <br />
        <div style={{ padding: 15 }}>
            {map && <Checkbox checked={showSession} label={tr("SHARE_LINK_INCLUDE_SESSION", locale)} onChange={onShowSessionChanged} />}
            <CopyToClipboard text={shareUrl} onCopy={onCopied}>
                <Button variant="primary">{tr("SHARE_LINK_COPY_CLIPBOARD", locale)}</Button>
            </CopyToClipboard>
        </div>
    </div>;
};