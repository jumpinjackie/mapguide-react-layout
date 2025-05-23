import { Button } from "@blueprintjs/core";
import { ButtonProps } from "../../element-context";
import { iconName, variantToIntent } from "./utils";
import React from "react";

export const BpButton: React.FC<ButtonProps> = (props) => {
    return <Button type={props.type} className={props.className} icon={iconName(props.icon)} loading={props.loading} onClick={props.onClick} active={props.active} title={props.title} style={props.style} minimal={props.minimal} intent={variantToIntent(props.variant)} disabled={props.disabled}>
        {props.children}
    </Button>
}