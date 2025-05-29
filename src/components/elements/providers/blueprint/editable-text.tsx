import { EditableText } from "@blueprintjs/core";
import { EditableTextProps } from "../../element-context";
import React from "react";

export const BpEditableText: React.FC<EditableTextProps> = ({ value, onChange }) => {
    return <EditableText value={value} onChange={onChange} />;
}