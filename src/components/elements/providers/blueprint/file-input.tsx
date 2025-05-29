import { FileInput } from "@blueprintjs/core";
import { FileInputProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpFileInput: React.FC<FileInputProps> = ({ fill, text, buttonText, onInputChange }) => {
    return <FileInput
        fill={fill}
        text={text}
        buttonText={buttonText}
        onInputChange={onInputChange} />;
}