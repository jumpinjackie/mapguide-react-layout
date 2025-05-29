import { Card } from "@blueprintjs/core";
import { CardProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpCard: React.FC<CardProps> = (props) => {
    return <Card style={props.style}>
        {props.children}
    </Card>;
};