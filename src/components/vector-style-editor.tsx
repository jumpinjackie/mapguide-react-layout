import * as React from "react";
import { IVectorFeatureStyle, IBasicVectorPointStyle, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IBasicPointCircleStyle, DEFAULT_POINT_CIRCLE_STYLE, DEFAULT_LINE_STYLE, DEFAULT_POLY_STYLE, IPointIconStyle, DEFAULT_POINT_ICON_STYLE } from '../api/ol-style-helpers';
import { NonIdealState, Tabs, Tab, FormGroup, NumericInput, Slider, RadioGroup, Radio, InputGroup, Switch } from '@blueprintjs/core';
import { tr } from "../api/i18n";
import { ColorPicker } from './color-picker';

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
            <InputGroup value={localSrc} onChange={(e: any) => setLocalSrc(e.target.value)} onBlur={onSrcChange} />
            <img src={style.src} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_ICON_ANCHOR", locale)}>
            {tr("VSED_PT_ICON_ANCHOR_H", locale)} <NumericInput value={style.anchor[0]} min={0} onValueChange={e => onChange({ ...style, anchor: [e, style.anchor[1]] })} />
            {tr("VSED_PT_ICON_ANCHOR_V", locale)} <NumericInput value={style.anchor[1]} min={0} onValueChange={e => onChange({ ...style, anchor: [style.anchor[0], e] })} />
        </FormGroup>
        <Switch label={tr("VSED_PT_ICON_ROTATE_WITH_VIEW", locale)} checked={style.rotateWithView} onChange={e => onChange({ ...style, rotateWithView: !style.rotateWithView })} />
        <FormGroup label={tr("VSED_PT_ICON_ROTATION", locale)}>
            <Slider min={0} max={360} labelStepSize={360} value={style.rotation} onChange={n => onChange({ ...style, rotation: n })} />
        </FormGroup>
        {/*<FormGroup label={tr("VSED_PT_ICON_OPACITY", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.opacity} onChange={n => onChange({ ...style, opacity: n })} />
        </FormGroup>*/}
        <FormGroup label={tr("VSED_PT_ICON_SCALE", locale)}>
            <NumericInput fill value={style.scale} min={1} onValueChange={e => onChange({ ...style, scale: e })} />
        </FormGroup>
    </div>;
};

const PointCircleStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicPointCircleStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_PT_FILL_COLOR", locale)}>
            <ColorPicker locale={locale} value={style.fill.color} onChange={c => onChange({ ...style, fill: { color: c, alpha: style.fill.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_FILL_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.fill.alpha} onChange={n => onChange({ ...style, fill: { color: style.fill.color, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_RADIUS", locale)}>
            <NumericInput fill value={style.radius} min={1} onValueChange={n => onChange({ ...style, radius: n })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_COLOR", locale)}>
            <ColorPicker locale={locale} value={style.stroke.color} onChange={c => onChange({ ...style, stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.stroke.alpha} onChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_WIDTH", locale)}>
            <NumericInput fill value={style.stroke.width} min={1} onValueChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })} />
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
    const onStyleChange = (style: IBasicVectorPointStyle) => {
        applyCurrentStyle(style);
        onChange(style);
    };
    const onStyleTypeChange = (type: "Icon" | "Circle") => {
        switch(type) {
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
    </div>
}

const LineStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorLineStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_LN_OUTLINE_COLOR", locale)}>
            <ColorPicker locale={locale} value={style.color} onChange={c => onChange({ color: c, width: style.width, alpha: style.alpha })} />
        </FormGroup>
        <FormGroup label={tr("VSED_LN_OUTLINE_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.alpha} onChange={n => onChange({ color: style.color, width: style.width, alpha: n })} />
        </FormGroup>
        <FormGroup label={tr("VSED_LN_OUTLINE_THICKNESS", locale)}>
            <NumericInput fill value={style.width} min={1} onValueChange={n => onChange({ color: style.color, width: n, alpha: style.alpha })} />
        </FormGroup>
    </div>;
}

const PolygonStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorPolygonStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_PL_FILL_COLOR", locale)}>
            <ColorPicker locale={locale} value={style.fill.color} onChange={c => onChange({ ...style, fill: { color: c, alpha: style.fill.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_FILL_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.fill.alpha} onChange={n => onChange({ ...style, fill: { color: style.fill.color, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_COLOR", locale)}>
            <ColorPicker locale={locale} value={style.stroke.color} onChange={c => onChange({ ...style, stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.stroke.alpha} onChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_THICKNESS", locale)}>
            <NumericInput fill value={style.stroke.width} min={1} onValueChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })} />
        </FormGroup>
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