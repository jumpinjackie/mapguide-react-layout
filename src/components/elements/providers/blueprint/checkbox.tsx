import { Checkbox } from "@blueprintjs/core";
import { CheckboxProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpCheckbox: React.FC<CheckboxProps> = (props) => {
    return <Checkbox id={props.id} name={props.name} checked={props.checked} label={props.label} onChange={props.onChange} disabled={props.disabled} />;
}