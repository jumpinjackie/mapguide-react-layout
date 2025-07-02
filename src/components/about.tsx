import * as React from "react";
import { useElementContext } from "./elements/element-context";

/**
 * The About component displays information about this viewer
 * @param props
 */
export const About: React.FC = () => {
    const { Heading } = useElementContext();
    return <div className="component-about-dialog-content">
        <Heading level={4}>mapguide-react-layout</Heading>
        <hr />
        <p>Hash: {__COMMITHASH__}</p>
        <hr />
        <p><a target="_blank" href="https://github.com/jumpinjackie/mapguide-react-layout">GitHub</a></p>
        <p><a target="_blank" href="https://github.com/jumpinjackie/mapguide-react-layout/issues">Issues</a></p>
        <p>Uses icons from the <a target="_blank" href="http://p.yusukekamiyamane.com/">Fugue icon set by Yusuke Kamiyamane</a></p>
    </div>;
};