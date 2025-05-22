import { Card } from "@blueprintjs/core";
import { CardProps } from "../../element-context";
import React from "react";

export const BpCard: React.FC<CardProps> = (props) => {
    return <Card style={props.style}>
        {props.children}
    </Card>;
};