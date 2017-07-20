import * as React from "react";
import { Icon } from "./icon";

/**
 * "Powered by MapGuide" logo
 * @param props
 */
export const PoweredByMapGuide = (props: any) => {
    return <div className="component-pbmg" {...props}>
        <Icon style={{display: "block"}} spriteClass="PoweredBy_en" />
    </div>;
};