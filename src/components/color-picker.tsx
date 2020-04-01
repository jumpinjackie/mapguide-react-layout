import * as React from "react";
import { DEFAULT_COLOR } from '../api/ol-style-helpers';
import { tr } from "../api/i18n";
import { NBSP } from '../constants';
import Card, { CardContent } from "calcite-react/Card";
import Button from 'calcite-react/Button';
import ChevronUpIcon from "calcite-ui-icons-react/ChevronUpIcon";
const SimpleColorPicker = require("react-simple-colorpicker");

const Collapsible = ({ isOpen, children }: { isOpen: boolean, children: React.ReactNode }) => {
    if (isOpen) {
        return <div style={{ position: "relative" }}>{children}</div>;
    } else {
        return <></>;
    }
}

/**
 * Color picker props
 * 
 * @since 0.13
 */
export interface IColorPickerProps {
    value?: string;
    locale: string;
    onChange: (value: string) => void;
}

/**
 * A basic color picker component
 * 
 * @since 0.13
 */
export const ColorPicker = (props: IColorPickerProps) => {
    const [isPickerOpen, setIsPickerOpen] = React.useState(false);
    const onPickerToggle = () => {
        setIsPickerOpen(!isPickerOpen);
    };
    return <div>
        <button style={{ width: 80, borderRadius: 3, backgroundColor: props.value ?? DEFAULT_COLOR }} onClick={onPickerToggle}>{NBSP}{NBSP}{NBSP}</button>
        <Collapsible isOpen={isPickerOpen}>
            <Card>
                <CardContent>
                    <SimpleColorPicker color={props.value ?? DEFAULT_COLOR} onChange={(c: any) => props.onChange(c)} />
                    <br />
                    <Button icon={<ChevronUpIcon size={16} />} iconPosition="before" onClick={() => setIsPickerOpen(false)}>{tr("ACTION_CLOSE", props.locale)}</Button>
                </CardContent>
            </Card>
        </Collapsible>
    </div>
}