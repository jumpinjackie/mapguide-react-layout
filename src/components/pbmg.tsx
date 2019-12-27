import * as React from "react";
import { ImageIcon } from "./icon";

/**
 * "Powered by MapGuide" logo
 * @param props
 */
export const PoweredByMapGuide = (props: any) => {
    return <div className="status-bar-component component-pbmg" {...props}>
        <ImageIcon style={{ display: "block" }} spriteClass="PoweredBy_en" />
    </div>;
};