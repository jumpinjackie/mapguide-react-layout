import * as React from "react";
import { tr } from "../api/i18n";
import { NBSP } from '../constants';
import { DEFAULT_COLOR } from '../api/ol-style-contracts';
import { HexColorPicker } from "react-colorful";
import { useElementContext } from "./elements/element-context";

/**
 * Color picker props
 * 
 * @since 0.13
 */
export interface IColorPickerProps {
    value?: string;
    locale: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

/**
 * A basic color picker component
 * 
 * @since 0.13
 */
export const ColorPicker = (props: IColorPickerProps) => {
    const { Collapsible, Button, Card } = useElementContext();
    const [isPickerOpen, setIsPickerOpen] = React.useState(false);
    const onPickerToggle = () => {
        setIsPickerOpen(!isPickerOpen);
    };
    return <div>
        <button disabled={props.disabled} style={{ width: 80, borderRadius: 3, backgroundColor: props.value ?? DEFAULT_COLOR }} onClick={onPickerToggle}>{NBSP}{NBSP}{NBSP}</button>
        <Collapsible isOpen={isPickerOpen}>
            <Card>
                <HexColorPicker style={{ width: "100%" }} color={props.value ?? DEFAULT_COLOR} onChange={(c: any) => props.onChange(c)} />
                <Button icon="chevron-up" variant="primary" onClick={() => setIsPickerOpen(false)}>{tr("ACTION_CLOSE", props.locale)}</Button>
            </Card>
        </Collapsible>
    </div>
}