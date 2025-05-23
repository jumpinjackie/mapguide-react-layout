import { InputGroup } from "@blueprintjs/core";
import { InputGroupProps } from "../../element-context";
import { iconName } from "./utils";
import React from "react";

export const BpInputGroup: React.FC<InputGroupProps> = (props) => {
    return <InputGroup round={props.round}
        autoFocus={props.autoFocus}
        leftIcon={iconName(props.leftIcon)}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        rightElement={props.rightElement}
        style={props.style}
        value={props.value}
        onClick={props.onClick}
        onChange={props.onChange} />;
}