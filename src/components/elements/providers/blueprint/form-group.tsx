import { FormGroup } from "@blueprintjs/core";
import { FormGroupProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpFormGroup: React.FC<FormGroupProps> = ({ label, inline, children }) => {
    return <FormGroup label={label} inline={inline}>
        {children}
    </FormGroup>
}