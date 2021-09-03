import * as React from "react";
import { NonIdealState, Tabs, Tab, FormGroup, NumericInput, Slider, RadioGroup, Radio, InputGroup, Switch, Button, INumericInputProps, HTMLInputProps, ISliderProps, ISwitchProps, Intent, InputGroupProps2, ButtonGroup } from '@blueprintjs/core';
import { tr } from "../api/i18n";
import { ColorPicker, IColorPickerProps } from './color-picker';
import { ExprOr, isEvaluatable, IPointIconStyle, IBasicPointCircleStyle, IBasicVectorPointStyle, DEFAULT_POINT_CIRCLE_STYLE, DEFAULT_POINT_ICON_STYLE, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IVectorFeatureStyle, DEFAULT_LINE_STYLE, DEFAULT_POLY_STYLE, IVectorLayerStyle, IVectorLabelSettings, ILabelSettings, IBasicStroke, IBasicFill } from '../api/ol-style-contracts';
import { DEFAULT_STYLE_KEY } from '../api/ol-style-helpers';
import { Parser } from "expr-eval";
import { ColorExprEditor, NumberExprEditor, SliderExprEditor, StringExprEditor } from "./layer-manager/common";
import { STR_EMPTY } from "../utils/string";

interface IExprEditorProps<T> {
    converter: (value: string) => ExprOr<T>;
    expr: ExprOr<T>;
    onExprChanged: (value: ExprOr<T>) => void;
}

function assertValue<T>(val: ExprOr<T>): asserts val is T {
    if (isEvaluatable(val))
        throw new Error("Value is expression instead of a raw value");
}

function ExprEditor<T>(props: IExprEditorProps<T>) {
    assertValue(props.expr);
    return <>Expr: <input type="text" value={`${props.expr}`} onChange={e => props.onExprChanged(props.converter(e.target.value))} /></>;
}

const DynamicSwitch = (props: Omit<Omit<ISwitchProps, "checked">, "onChange"> & Omit<IExprEditorProps<boolean>, "converter">) => {
    if (isEvaluatable(props.expr)) {
        return <ExprEditor<boolean> {...props} converter={v => v?.toLowerCase() == "true"} />
    } else {
        const innerProps = {
            ...props,
            checked: props.expr,
            onChange: (e: any) => props.onExprChanged(e.target.checked)
        };
        return <Switch {...innerProps} />;
    }
}

interface ILabelStyleEditor {
    isLine?: boolean;
    style: IVectorLabelSettings;
    locale: string;
    onChange: (style: IVectorLabelSettings) => void;
}

//TODO: Either surface the font as another editable property or offload to configuration
const buildFont = (size: number, bold: boolean, italic: boolean, font = "sans-serif") =>
    `${bold ? "bold" : STR_EMPTY} ${italic ? "italic" : STR_EMPTY} ${size}px ${font}`;

function coalesceExpr<T>(expr: ExprOr<T> | undefined, defaultVal: T): T {
    if (isEvaluatable(expr)) {
        return defaultVal;
    }
    return expr ?? defaultVal;
}

const DEFAULT_FONT_SIZE = 14;

const LabelStyleEditor: React.FC<ILabelStyleEditor> = props => {
    const { style, locale, onChange, isLine } = props;
    const [bold, setBold] = React.useState(false);
    const [italic, setItalic] = React.useState(false);
    const [localBgColor, setLocalBgColor] = React.useState<ExprOr<string>>(style.label?.fill?.color ?? "#000000");
    const [localBgColorAlpha, setLocalColorAlpha] = React.useState<ExprOr<number>>(style.label?.fill?.alpha ?? 255);
    const [localStrokeColor, setLocalStrokeColor] = React.useState<ExprOr<string>>(style.label?.stroke?.color ?? "#ffffff");
    const [localStrokeWidth, setLocalStrokeWidth] = React.useState<ExprOr<number>>(style.label?.stroke?.width ?? 1);
    const [localFontSize, setLocalFontSize] = React.useState(DEFAULT_FONT_SIZE);
    const [localLabel, setLocalLabel] = React.useState({ font: buildFont(localFontSize, bold, italic), ...style.label });
    const [hasLabel, setHasLabel] = React.useState(style.label != null);
    const onToggleLinePlacement = React.useCallback(() => {
        if (localLabel.placement == "line") {
            const { placement, ...rest } = localLabel;
            setLocalLabel(rest);
        } else {
            setLocalLabel({ ...localLabel, placement: "line" });
        }
    }, [localLabel]);
    React.useEffect(() => {
        if (hasLabel) {
            onChange({ ...style, label: localLabel });
        } else {
            const { label, ...rest } = style;
            onChange(rest);
        }
    }, [localLabel, hasLabel]);
    React.useEffect(() => {
        setLocalLabel({ ...localLabel, font: buildFont(localFontSize, bold, italic) });
    }, [localFontSize, bold, italic]);
    React.useEffect(() => {
        setLocalLabel({
            ...localLabel,
            fill: { 
                ...localLabel.fill,
                color: localBgColor,
                alpha: localBgColorAlpha
            } as IBasicFill,
            stroke: {
                ...localLabel.stroke,
                color: localStrokeColor,
                width: localStrokeWidth
            } as IBasicStroke
        })
    }, [localStrokeColor, localStrokeWidth, localBgColorAlpha, localBgColor]);
    return <>
        <Switch checked={hasLabel} onChange={(e: any) => setHasLabel(e.target.checked)} label={tr("ENABLE_LABELS", locale)} />
        {hasLabel && <FormGroup label={tr("LABEL_TEXT", locale)}>
            <StringExprEditor locale={locale} value={localLabel.text} onChange={t => setLocalLabel({ ...localLabel, text: t })} />
        </FormGroup>}
        {hasLabel && <FormGroup label={tr("LABEL_SIZE", locale)}>
            <NumberExprEditor locale={locale} value={localFontSize} onChange={t => setLocalFontSize(coalesceExpr(t, DEFAULT_FONT_SIZE))} />
        </FormGroup>}
        {hasLabel && <ButtonGroup>
            <Button intent={Intent.PRIMARY} active={bold} onClick={e => setBold(!bold)}>{tr("LABEL_BOLD", locale)}</Button>
            <Button intent={Intent.PRIMARY} active={italic} onClick={e => setItalic(!italic)}>{tr("LABEL_ITALIC", locale)}</Button>
            {isLine && <Button intent={Intent.PRIMARY} active={localLabel.placement == "line"} onClick={e => onToggleLinePlacement()}>{tr("LABEL_LINE_PLACEMENT", locale)}</Button>}
        </ButtonGroup>}
        {hasLabel && <FormGroup label={tr("LABEL_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={localBgColor} onChange={(c: any) => setLocalBgColor(c)} />
        </FormGroup>}
        {hasLabel && <FormGroup label={tr("LABEL_OUTLINE_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={localStrokeColor} onChange={(c: any) => setLocalStrokeColor(c)} />
        </FormGroup>}
        {hasLabel && <FormGroup label={tr("LABEL_OUTLINE_THICKNESS", locale)}>
            <NumberExprEditor locale={locale} value={localStrokeWidth} onChange={t => setLocalStrokeWidth(t!)} />
        </FormGroup>}
    </>;
}

interface ISubStyleEditorProps<TStyle> {
    style: TStyle;
    locale: string;
    onChange: (style: TStyle) => void;
}

const PointIconStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IPointIconStyle>) => {
    const [localSrc, setLocalSrc] = React.useState(style.src);
    React.useEffect(() => {
        setLocalSrc(style.src);
    }, [style.src]);
    const onSrcChange = (e: any) => {
        onChange({
            ...style,
            src: localSrc
        });
    };
    return <div>
        <FormGroup label={tr("VSED_PT_ICON_SRC", locale)}>
            <StringExprEditor value={localSrc} onChange={e => setLocalSrc(e!)} locale={locale} />
            {!isEvaluatable(style.src) && <img src={style.src} />}
        </FormGroup>
        <FormGroup label={tr("VSED_PT_ICON_ANCHOR", locale)}>
            {tr("VSED_PT_ICON_ANCHOR_H", locale)} <NumericInput value={style.anchor[0]} min={0} onValueChange={e => onChange({ ...style, anchor: [e, style.anchor[1]] })} />
            {tr("VSED_PT_ICON_ANCHOR_V", locale)} <NumericInput value={style.anchor[1]} min={0} onValueChange={e => onChange({ ...style, anchor: [style.anchor[0], e] })} />
        </FormGroup>
        <DynamicSwitch label={tr("VSED_PT_ICON_ROTATE_WITH_VIEW", locale)} expr={style.rotateWithView} onExprChanged={(e: any) => onChange({ ...style, rotateWithView: e })} />
        <FormGroup label={tr("VSED_PT_ICON_ROTATION", locale)}>
            <SliderExprEditor locale={locale} min={0} max={360} labelStepSize={360} value={style.rotation} onChange={(n: any) => onChange({ ...style, rotation: n })} />
        </FormGroup>
        {/*<FormGroup label={tr("VSED_PT_ICON_OPACITY", locale)}>
            <DynamicSlider min={0} max={255} labelStepSize={255} expr={style.opacity} onExprChanged={(n: any) => onChange({ ...style, opacity: n })} />
        </FormGroup>*/}
        <FormGroup label={tr("VSED_PT_ICON_SCALE", locale)}>
            <NumberExprEditor value={style.scale} onChange={n => onChange({ ...style, scale: n! })} locale={locale} />
        </FormGroup>
    </div>;
};

const PointCircleStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicPointCircleStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_PT_FILL_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={style.fill.color} onChange={(c: any) => onChange({ ...style, fill: { color: c, alpha: style.fill.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_FILL_COLOR_ALPHA", locale)}>
            <SliderExprEditor locale={locale} min={0} max={255} labelStepSize={255} value={style.fill.alpha} onChange={(n: any) => onChange({ ...style, fill: { color: style.fill.color, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_RADIUS", locale)}>
            <NumberExprEditor locale={locale} value={style.radius} min={1} onChange={(n: any) => onChange({ ...style, radius: n })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={style.stroke.color} onChange={(c: any) => onChange({ ...style, stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_COLOR_ALPHA", locale)}>
            <SliderExprEditor locale={locale} min={0} max={255} labelStepSize={255} value={style.stroke.alpha} onChange={(n: any) => onChange({ ...style, stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_WIDTH", locale)}>
            <NumberExprEditor locale={locale} value={style.stroke.width} min={1} onChange={(n: any) => onChange({ ...style, stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })} />
        </FormGroup>
    </div>;
};

const PointStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorPointStyle>) => {
    const [iconStyle, setIconStyle] = React.useState<IPointIconStyle | undefined>(undefined);
    const [circleStyle, setCircleStyle] = React.useState<IBasicPointCircleStyle | undefined>(undefined);
    const [currentStyle, setCurrentStyle] = React.useState(style);
    const applyCurrentStyle = (s: IBasicVectorPointStyle) => {
        setCurrentStyle(s);
        switch (s.type) {
            case "Circle":
                setCircleStyle(s);
                break;
            case "Icon":
                setIconStyle(s);
                break;
        }
    }
    const onStyleTypeChange = (type: "Icon" | "Circle") => {
        switch (type) {
            case "Circle":
                if (circleStyle) {
                    setCurrentStyle(circleStyle);
                    onChange(circleStyle);
                } else {
                    const s = { ...DEFAULT_POINT_CIRCLE_STYLE };
                    setCircleStyle(s);
                    setCurrentStyle(s);
                    onChange(s);
                }
                break;
            case "Icon":
                if (iconStyle) {
                    setCurrentStyle(iconStyle);
                    onChange(iconStyle);
                } else {
                    const s = { ...DEFAULT_POINT_ICON_STYLE };
                    setIconStyle(s);
                    setCurrentStyle(s);
                    onChange(s);
                }
                break;
        }
    }
    React.useEffect(() => {
        applyCurrentStyle(style);
    }, [style]);
    return <div>
        <RadioGroup inline
            label={tr("VSED_PT_TYPE", locale)}
            onChange={(e: any) => onStyleTypeChange(e.target.value)}
            selectedValue={currentStyle.type}>
            <Radio label={tr("VSED_PT_TYPE_CIRCLE", locale)} value="Circle" />
            <Radio label={tr("VSED_PT_TYPE_ICON", locale)} value="Icon" />
        </RadioGroup>
        {currentStyle.type == "Icon" && <PointIconStyleEditor style={currentStyle} onChange={onChange} locale={locale} />}
        {currentStyle.type == "Circle" && <PointCircleStyleEditor style={currentStyle} onChange={onChange} locale={locale} />}
        <LabelStyleEditor style={currentStyle} locale={locale} onChange={onChange} />
    </div>
}

const LineStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorLineStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_LN_OUTLINE_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={style.color} onChange={(c: any) => onChange({ color: c, width: style.width, alpha: style.alpha })} />
        </FormGroup>
        <FormGroup label={tr("VSED_LN_OUTLINE_COLOR_ALPHA", locale)}>
            <SliderExprEditor locale={locale} min={0} max={255} labelStepSize={255} value={style.alpha} onChange={(n: any) => onChange({ color: style.color, width: style.width, alpha: n })} />
        </FormGroup>
        <FormGroup label={tr("VSED_LN_OUTLINE_THICKNESS", locale)}>
            <NumberExprEditor locale={locale} min={1} value={style.width} onChange={(n: any) => onChange({ color: style.color, width: n, alpha: style.alpha })} />
        </FormGroup>
        <LabelStyleEditor style={style} locale={locale} onChange={onChange} isLine />
    </div>;
}

const PolygonStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorPolygonStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_PL_FILL_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={style.fill.color} onChange={(c: any) => onChange({ ...style, fill: { color: c, alpha: style.fill.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_FILL_COLOR_ALPHA", locale)}>
            <SliderExprEditor locale={locale} min={0} max={255} labelStepSize={255} value={style.fill.alpha} onChange={(n: any) => onChange({ ...style, fill: { color: style.fill.color, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_COLOR", locale)}>
            <ColorExprEditor locale={locale} value={style.stroke.color} onChange={(c: any) => onChange({ ...style, stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_COLOR_ALPHA", locale)}>
            <SliderExprEditor locale={locale} min={0} max={255} labelStepSize={255} value={style.stroke.alpha} onChange={(n: any) => onChange({ ...style, stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_THICKNESS", locale)}>
            <NumberExprEditor locale={locale} value={style.stroke.width} min={1} onChange={(n: any) => onChange({ ...style, stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })} />
        </FormGroup>
        <LabelStyleEditor style={style} locale={locale} onChange={onChange} />
    </div>;
}

/**
 * Vector style editor props
 * @since 0.13
 */
export interface IVectorStyleEditorProps {
    style?: IVectorFeatureStyle;
    onChange?: (style: IVectorFeatureStyle) => void;
    enablePoint: boolean;
    enableLine: boolean;
    enablePolygon: boolean;
    locale: string;
}

type TabId = "pointStyle" | "lineStyle" | "polyStyle";

/**
 * A vector style editor component
 * 
 * @since 0.13
 */
export const VectorStyleEditor = (props: IVectorStyleEditorProps) => {
    const { locale, style, onChange, enableLine, enablePoint, enablePolygon } = props;
    const [selectedTab, setSelectedTab] = React.useState<TabId | undefined>(undefined);
    const [pointStyle, setPointStyle] = React.useState(style?.point ?? DEFAULT_POINT_CIRCLE_STYLE);
    const [lineStyle, setLineStyle] = React.useState(style?.line ?? DEFAULT_LINE_STYLE);
    const [polyStyle, setPolyStyle] = React.useState(style?.polygon ?? DEFAULT_POLY_STYLE);
    React.useEffect(() => {
        setPointStyle(style?.point ?? DEFAULT_POINT_CIRCLE_STYLE);
        setLineStyle(style?.line ?? DEFAULT_LINE_STYLE);
        setPolyStyle(style?.polygon ?? DEFAULT_POLY_STYLE);
    }, [style]);
    const onStyleChanged = (point: IBasicVectorPointStyle, line: IBasicVectorLineStyle, poly: IBasicVectorPolygonStyle) => {
        const newStyle: IVectorFeatureStyle = {};
        if (enablePoint) {
            newStyle.point = point;
        }
        if (enableLine) {
            newStyle.line = line;
        }
        if (enablePolygon) {
            newStyle.polygon = poly;
        }
        onChange?.(newStyle);
        if (newStyle.point) {
            setPointStyle(newStyle.point);
        }
        if (newStyle.line) {
            setLineStyle(newStyle.line);
        }
        if (newStyle.polygon) {
            setPolyStyle(newStyle.polygon);
        }
    };
    if (!enableLine && !enablePoint && !enablePolygon) {
        return <NonIdealState icon="warning-sign" title={tr("VSED_NO_STYLES_TITLE", locale)} description={tr("VSED_NO_STYLES_DESC", locale)} />
    } else {
        const onPointStyleChanged = (st: IBasicPointCircleStyle) => {
            onStyleChanged(st, lineStyle, polyStyle);
        };
        const onLineStyleChanged = (st: IBasicVectorLineStyle) => {
            onStyleChanged(pointStyle, st, polyStyle);
        };
        const onPolygonStyleChanged = (st: IBasicVectorPolygonStyle) => {
            onStyleChanged(pointStyle, lineStyle, st);
        };
        return <Tabs onChange={(t: any) => setSelectedTab(t)} selectedTabId={selectedTab}>
            {enablePoint && <Tab id="pointStyle" title={tr("VSED_TAB_POINT", locale)} panel={<PointStyleEditor style={pointStyle} locale={locale} onChange={onPointStyleChanged} />} />}
            {enableLine && <Tab id="lineStyle" title={tr("VSED_TAB_LINE", locale)} panel={<LineStyleEditor style={lineStyle} locale={locale} onChange={onLineStyleChanged} />} />}
            {enablePolygon && <Tab id="polyStyle" title={tr("VSED_TAB_POLY", locale)} panel={<PolygonStyleEditor style={polyStyle} locale={locale} onChange={onPolygonStyleChanged} />} />}
        </Tabs>
    }
}

/**
 * Vector layer style editor props
 * @since 0.14
 */
export interface IVectorLayerStyleEditorProps {
    style: IVectorLayerStyle;
    onChange?: (style: IVectorLayerStyle) => void;
    enablePoint: boolean;
    enableLine: boolean;
    enablePolygon: boolean;
    locale: string;
}

interface IFilterItemProps extends Omit<IVectorLayerStyleEditorProps, "onChange" | "style"> {
    onChange: (filter: string, style: IVectorFeatureStyle) => void;
    featureStyle: IVectorFeatureStyle;
    filter?: string;
    isDefault: boolean;
    isStyleEditorOpen: boolean;
    onToggleStyleEditor: (visible: boolean) => void;
}

const parser = new Parser();

const FilterItem = (props: IFilterItemProps) => {
    const { filter, isDefault, isStyleEditorOpen, featureStyle, onChange } = props;
    const [localFilter, setLocalFilter] = React.useState(filter ?? "");
    const [isLocalFilterValid, setIsLocalFilterValid] = React.useState(true);
    React.useEffect(() => {
        setLocalFilter(localFilter);
    }, [filter]);
    React.useEffect(() => {
        try {
            const expr: any = parser.parse(localFilter);
            let bHaveVar = false;
            let bHaveOperator = false;
            for (const t of expr.tokens) {
                switch (t.type) {
                    case "IVAR":
                        bHaveVar = true;
                        break;
                    case "IOP2":
                        bHaveOperator = true;
                        break;
                }
            }
            setIsLocalFilterValid(bHaveVar && bHaveOperator && expr.tokens.length == 3);
        } catch (e) {
            setIsLocalFilterValid(false);
        }
    }, [localFilter]);
    const onToggle = () => {
        props.onToggleStyleEditor(!isStyleEditorOpen);
    };
    const onInnerStyleChanged = (style: IVectorFeatureStyle) => {
        onChange?.(isDefault ? DEFAULT_STYLE_KEY : localFilter, style);
    }
    let iconTip;
    let outerModifier;
    if (!isLocalFilterValid) {
        outerModifier = Intent.DANGER;
        iconTip = "This filter is not valid";
    }
    return <>
        <tr>
            <td>{isDefault ? <strong>Default Style</strong> : <InputGroup intent={outerModifier} fill leftIcon={(isLocalFilterValid ? "tick" : "warning-sign")} title={localFilter} value={localFilter} onChange={e => setLocalFilter(e.target.value)} />}</td>
            <td><Button intent={Intent.PRIMARY} onClick={onToggle}>{isStyleEditorOpen ? "Hide" : "Show"}</Button></td>
        </tr>
        {isStyleEditorOpen && <tr>
            <td colSpan={2}>
                <VectorStyleEditor style={featureStyle}
                    onChange={onInnerStyleChanged}
                    enableLine={props.enableLine}
                    enablePoint={props.enablePoint}
                    enablePolygon={props.enablePolygon}
                    locale={props.locale} />
            </td>
        </tr>}
    </>
}

export const VectorLayerStyleEditor = (props: IVectorLayerStyleEditorProps) => {
    const filters = Object.keys(props.style).filter(k => k != DEFAULT_STYLE_KEY);
    const [openStyleEditors, setOpenStyleEditors] = React.useState<any>({});
    const onFeatureStyleChanged = (index: number | string, filter: string, style: IVectorFeatureStyle) => {
        const updatedStyle = {
            ...props.style
        };
        if (index == DEFAULT_STYLE_KEY) {
            updatedStyle.default = style;
        } else {
            const oldFilter = filters[index as number];
            delete updatedStyle[oldFilter];
            updatedStyle[filter] = style;
        }
        props.onChange?.(updatedStyle);
    };
    const onToggleStyleEditor = (index: number | string, visible: boolean) => {
        const opEds = { ...openStyleEditors };
        if (!visible) {
            delete opEds[index];
        } else {
            opEds[index] = true;
        }
        setOpenStyleEditors(opEds);
    };
    return <table style={{ width: "100%" }}>
        <tbody>
            {filters.map((f, i) => <FilterItem
                key={`filter-${i}`}
                filter={f}
                isDefault={false}
                onChange={(f, s) => onFeatureStyleChanged(i, f, s)}
                featureStyle={props.style[filters[i]]}
                isStyleEditorOpen={typeof (openStyleEditors[i]) != 'undefined'}
                onToggleStyleEditor={(v) => onToggleStyleEditor(i, v)}
                locale={props.locale}
                enableLine={props.enableLine}
                enablePoint={props.enablePoint}
                enablePolygon={props.enablePolygon} />)}
            <FilterItem
                isDefault
                onChange={(f, s) => onFeatureStyleChanged(DEFAULT_STYLE_KEY, f, s)}
                featureStyle={props.style.default}
                isStyleEditorOpen={typeof (openStyleEditors[DEFAULT_STYLE_KEY]) != 'undefined'}
                onToggleStyleEditor={(v) => onToggleStyleEditor(DEFAULT_STYLE_KEY, v)}
                locale={props.locale}
                enableLine={props.enableLine}
                enablePoint={props.enablePoint}
                enablePolygon={props.enablePolygon} />
        </tbody>
    </table>;
}