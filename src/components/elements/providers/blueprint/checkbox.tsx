import { Checkbox } from "@blueprintjs/core";
import { CheckboxProps } from "../../element-context";
import React from "react";

export const BpCheckbox: React.FC<CheckboxProps> = (props) => {
    return <Checkbox checked={props.checked} label={props.label} onChange={props.onChange} disabled={props.disabled} />;
}