import * as React from "react";
import { tr } from "../api/i18n";
import { useViewerLocale } from "../containers/hooks";
import { useElementContext } from "./elements/element-context";

/**
 * The About component displays information about this viewer
 */
export const About: React.FC = () => {
    const { Heading } = useElementContext();
    const locale = useViewerLocale();
    return <div className="component-about-dialog-content">
        <Heading level={4}>mapguide-react-layout</Heading>
        <hr />
        <p>{tr("ABOUT_HASH_LABEL", locale)} {__COMMITHASH__}</p>
        <hr />
        <p><a target="_blank" href="https://github.com/jumpinjackie/mapguide-react-layout">GitHub</a></p>
        <p><a target="_blank" href="https://github.com/jumpinjackie/mapguide-react-layout/issues">Issues</a></p>
        <p>Uses icons from the <a target="_blank" href="http://p.yusukekamiyamane.com/">Fugue icon set by Yusuke Kamiyamane</a></p>
    </div>;
};