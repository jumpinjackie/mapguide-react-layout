import { Collapse } from "@blueprintjs/core";
import React from "react";
import { CollapsibleProps } from "../../element-context";

export const BpCollapsible: React.FC<CollapsibleProps> = (props) => {
    return <Collapse isOpen={props.isOpen}>{props.children}</Collapse>
};