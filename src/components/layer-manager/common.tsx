import * as React from "react";
import { tr } from "../../api/i18n";
import { ExprOr, isEvaluatable } from "../../api/ol-style-contracts";
import { strIsNullOrEmpty, STR_EMPTY } from "../../utils/string";
import { ColorPicker } from "../color-picker";
import { ElementGroup, useElementContext } from "../elements/element-context";

interface RGB {
    b: number;
    g: number;
    r: number;
}
function rgbToYIQ({ r, g, b }: RGB): number {
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}
function hexToRgb(hex: string): RGB | undefined {
    if (!hex || hex === undefined || hex === '') {
        return undefined;
    }

    const result: RegExpExecArray | null =
        /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : undefined;
}
export function contrast(colorHex: string | undefined,
    threshold: number = 128): string {
    if (colorHex === undefined) {
        return '#000';
    }

    const rgb: RGB | undefined = hexToRgb(colorHex);

    if (rgb === undefined) {
        return '#000';
    }

    return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
}

export type ExprEditorProps<T> = {
    locale: string;
    value?: ExprOr<T>;
    onChange: (value: ExprOr<T> | undefined) => void;
}

type ExprEditorInnerProps<T> = ExprEditorProps<T> & {
    roStyle?: React.CSSProperties;
    renderValueEditor: (value: ExprOr<T> | undefined, onChange: (value: ExprOr<T> | undefined) => void, locale: string, disabled: boolean) => React.ReactNode;
};

function stringifyExpr<T>(expr: ExprOr<T> | undefined, locale: string): string {
    if (!expr) {
        return tr("EXPR_NOT_SET", locale);
    }
    if (isEvaluatable(expr)) {
        return "Expr: " + expr.expr;
    }
    return `${expr ?? STR_EMPTY}`;
}

function isStrTrue(s: string) {
    switch (s?.toLowerCase()) {
        case "true":
        case "1":
            return true;
        case "false":
        case "0":
            return false;
    }
    return false;
}

type EditMode = "edit-expr" | "edit-value";

function stringifyExprIf<T>(expr: ExprOr<T>, mode: EditMode): string {
    switch (mode) {
        case "edit-expr":
            return isEvaluatable(expr) ? expr.expr : STR_EMPTY;
        case "edit-value":
            return isEvaluatable(expr) ? STR_EMPTY : `${expr ?? STR_EMPTY}`;
    }
}

function useExprEditor<T>(props: ExprEditorProps<T>) {
    const { value, onChange } = props;
    const [editMode, setEditMode] = React.useState<EditMode>(isEvaluatable(value) ? "edit-expr" : "edit-value");
    const [localValue, setLocalValue] = React.useState(value);
    const [isEditing, setIsEditing] = React.useState(false);
    const [isEditValid, setIsEditValid] = React.useState(false);
    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);
    const onCancelEditing = React.useCallback(() => {
        setLocalValue(value);
        setIsEditing(false);
    }, [value]);
    const onApplyValue = () => {
        onChange(localValue);
        setIsEditing(false);
    };
    const onUpdateLocalValue = (val: ExprOr<T>) => {
        try {
            setLocalValue(val);
            setIsEditValid(true);
        } catch (e) {
            setIsEditValid(false);
        }
    };

    return {
        editMode,
        localValue,
        isEditValid,
        isEditing,
        setIsEditing,
        setEditMode,
        setLocalValue,
        onApplyValue,
        onCancelEditing,
        onUpdateLocalValue
    }
}

function ExprEditorInner<T>(props: ExprEditorInnerProps<T>) {
    const { Button, Collapsible, Card, Radio, InputGroup } = useElementContext();
    const { renderValueEditor, locale, roStyle } = props;
    const {
        isEditValid,
        isEditing,
        localValue,
        setIsEditing,
        editMode,
        setEditMode,
        onApplyValue,
        onCancelEditing,
        onUpdateLocalValue
    } = useExprEditor(props);
    const onEditClick = () => {
        if (isEditing) {
            onCancelEditing();
        } else {
            setIsEditing(true);
        }
    };
    const editButton = <Button icon="edit" minimal variant="primary" style={{ color: "white", backgroundColor: "#137cbd" }} onClick={(e: any) => onEditClick()} />
    return <>
        <InputGroup style={roStyle} readOnly value={stringifyExpr(props.value, locale)} rightElement={editButton} />
        <Collapsible isOpen={isEditing}>
            <Card>
                <h5 className="bp3-heading">Edit Value</h5>
                <Radio name="edit-mode" label="Value" value="edit-value" checked={editMode == "edit-value"} onChange={(e: any) => setEditMode(e.target.value)} />
                {renderValueEditor(localValue, onUpdateLocalValue, locale, editMode != "edit-value")}
                <br />
                <Radio name="edit-mode" label="Expression" value="edit-expr" checked={editMode == "edit-expr"} onChange={(e: any) => setEditMode(e.target.value)} />
                <input disabled={editMode != "edit-expr"} type="text" className="bp3-input" value={stringifyExprIf(localValue, "edit-expr")} onChange={e => onUpdateLocalValue({ expr: e.target.value })} />
                <br /><br />
                <ElementGroup>
                    <Button disabled={!isEditValid} variant="success" onClick={(e: any) => onApplyValue()}>Apply</Button>
                    <Button variant="danger" onClick={(e: any) => onCancelEditing()}>Cancel</Button>
                </ElementGroup>
            </Card>
        </Collapsible>
    </>;
}

export const NumberExprEditor: React.FC<ExprEditorProps<number> & { min?: number, max?: number }> = props => {
    const { NumericInput } = useElementContext();
    const { min, max } = props;
    return <ExprEditorInner<number>
        locale={props.locale}
        value={props.value}
        onChange={props.onChange}
        renderValueEditor={(v, oc, loc, disabled) => <NumericInput disabled={disabled} min={min} max={max} value={parseInt(stringifyExprIf(v, "edit-value"), 10)} onChange={e => oc(e)} />} />;
}

export const SliderExprEditor: React.FC<ExprEditorProps<number> & { min?: number, max?: number, labelStepSize?: number }> = props => {
    const { Slider } = useElementContext();
    const { min, max, labelStepSize } = props;
    return <ExprEditorInner<number>
        locale={props.locale}
        value={props.value}
        onChange={props.onChange}
        renderValueEditor={(v, oc, loc, disabled) => <Slider disabled={disabled} min={min} max={max} labelStepSize={labelStepSize} value={parseInt(stringifyExprIf(v, "edit-value"), 10)} onChange={e => oc(e)} />} />;
}

export const StringExprEditor: React.FC<ExprEditorProps<string>> = props => {
    return <ExprEditorInner<string>
        locale={props.locale}
        value={props.value}
        onChange={props.onChange}
        renderValueEditor={(v, oc, loc, disabled) => <input disabled={disabled} type="text" className="bp3-input" value={stringifyExprIf(v, "edit-value")} onChange={e => oc(e.target.value)} />} />;
}

export const BooleanExprEditor: React.FC<ExprEditorProps<boolean>> = props => {
    const { Switch } = useElementContext();
    return <ExprEditorInner<boolean>
        locale={props.locale}
        value={props.value}
        onChange={props.onChange}
        renderValueEditor={(v, oc, loc, disabled) => <Switch disabled={disabled} checked={isStrTrue(stringifyExprIf(v, "edit-value"))} onChange={(e: any) => oc(e.target.checked)} />} />;
}

export const ColorExprEditor: React.FC<ExprEditorProps<string>> = props => {
    const { value } = props;
    let roStyle: React.CSSProperties | undefined;
    if (!isEvaluatable(value) && !strIsNullOrEmpty(value)) {
        roStyle = {
            backgroundColor: value,
            color: contrast(value)
        };
    }
    return <ExprEditorInner<string>
        roStyle={roStyle}
        locale={props.locale}
        value={value}
        onChange={props.onChange}
        renderValueEditor={(v, oc, loc, disabled) => <ColorPicker locale={loc} value={stringifyExprIf(v, "edit-value")} onChange={e => oc(e)} />} />;
}