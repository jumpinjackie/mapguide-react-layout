import * as React from "react";

/**
 * The About component displays information about this viewer
 * @param props
 */
export const About: React.StatelessComponent<any> = (props) => {
    return <div className="component-about-dialog-content">
        <h4>mapguide-react-layout</h4>
        <hr />
        <p>Hash: {__COMMITHASH__}</p>
        <hr />
        <p><a target="_blank" href="https://github.com/jumpinjackie/mapguide-react-layout">GitHub</a></p>
        <p><a target="_blank" href="https://github.com/jumpinjackie/mapguide-react-layout/issues">Issues</a></p>
        <p>Uses icons from the <a target="_blank" href="http://p.yusukekamiyamane.com/">Fugue icon set by Yusuke Kamiyamane</a></p>
    </div>;
};