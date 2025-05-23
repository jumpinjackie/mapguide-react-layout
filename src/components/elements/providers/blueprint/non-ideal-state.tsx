import { NonIdealState } from "@blueprintjs/core";
import { NonIdealStateProps } from "../../element-context";
import React from "react";
import { iconName } from "./utils";

export const BpNonIdealState: React.FC<NonIdealStateProps> = ({ icon, title, description, action }) => {
    return <NonIdealState icon={typeof(icon) === 'string' ? iconName(icon) : icon} title={title} description={description} action={action} />
}