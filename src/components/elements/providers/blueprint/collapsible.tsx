import { Collapse } from "@blueprintjs/core";
import React from "react";
import { CollapsibleProps } from "../../element-context";

/**
 * @hidden
 */
export const BpCollapsible: React.FC<React.PropsWithChildren<CollapsibleProps>> = (props) => {
    return <Collapse isOpen={props.isOpen}>{props.children}</Collapse>
};