import { Switch } from "@blueprintjs/core";
import { SwitchProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpSwitch: React.FC<SwitchProps> = (props) => {
    return <Switch style={props.style}
        disabled={props.disabled}
        checked={props.checked}
        label={props.label}
        labelElement={props.labelElement}
        onChange={props.onChange} />
}