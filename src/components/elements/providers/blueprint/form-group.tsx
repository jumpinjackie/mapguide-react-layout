import { FormGroup } from "@blueprintjs/core";
import { FormGroupProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpFormGroup: React.FC<React.PropsWithChildren<FormGroupProps>> = ({ label, labelFor, inline, children }) => {
    return <FormGroup label={label} labelFor={labelFor} inline={inline}>
        {children}
    </FormGroup>
}