import * as React from "react";

/**
 * @since 0.13
 */
export interface IColorPickerProps {
    value?: string;
    onChange: (value: string) => void;
}

/**
 * @since 0.13
 */
export const ColorPicker = (props: IColorPickerProps) => {
    return <input type="color" value={props.value} onChange={e => props.onChange(e.target.value)} />;
}