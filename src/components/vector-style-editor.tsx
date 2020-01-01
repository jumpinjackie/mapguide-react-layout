import * as React from "react";
import { IVectorFeatureStyle, IBasicVectorPointStyle, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IBasicPointCircleStyle, DEFAULT_POINT_STYLE, DEFAULT_LINE_STYLE, DEFAULT_POLY_STYLE } from '../api/ol-style-helpers';
import { NonIdealState, Tabs, Tab, FormGroup, NumericInput, Slider } from '@blueprintjs/core';
import { tr } from "../api/i18n";
import { ColorPicker } from './color-picker';

interface ISubStyleEditorProps<TStyle> {
    style: TStyle;
    locale: string;
    onChange: (style: TStyle) => void;
}

const PointStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorPointStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_PT_FILL_COLOR", locale)}>
            <ColorPicker value={style.fill.color} onChange={c => onChange({ ...style, fill: { color: c, alpha: style.fill.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_FILL_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.fill.alpha} onChange={n => onChange({ ...style, fill: { color: style.fill.color, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_RADIUS", locale)}>
            <NumericInput fill value={style.radius} min={1} onValueChange={n => onChange({ ...style, radius: n })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_COLOR")}>
            <ColorPicker value={style.stroke.color} onChange={c => onChange({ ...style, stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_COLOR_ALPHA")}>
            <Slider min={0} max={255} labelStepSize={255} value={style.stroke.alpha} onChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PT_OUTLINE_WIDTH", locale)}>
            <NumericInput fill value={style.stroke.width} min={1} onValueChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })} />
        </FormGroup>
    </div>;
}

const LineStyleEditor = ({ style, onChange, locale }: ISubStyleEditorProps<IBasicVectorLineStyle>) => {
    return <div>
        <FormGroup label={tr("VSED_LN_OUTLINE_COLOR", locale)}>
            <ColorPicker value={style.color} onChange={c => onChange({ color: c, width: style.width, alpha: style.alpha })} />
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
            <ColorPicker value={style.fill.color} onChange={c => onChange({ ...style, fill: { color: c, alpha: style.fill.alpha } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_FILL_COLOR_ALPHA", locale)}>
            <Slider min={0} max={255} labelStepSize={255} value={style.fill.alpha} onChange={n => onChange({ ...style, fill: { color: style.fill.color, alpha: n } })} />
        </FormGroup>
        <FormGroup label={tr("VSED_PL_OUTLINE_COLOR", locale)}>
            <ColorPicker value={style.stroke.color} onChange={c => onChange({ ...style, stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })} />
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
 * @since 0.13
 */
export const VectorStyleEditor = (props: IVectorStyleEditorProps) => {
    const { locale, style, onChange, enableLine, enablePoint, enablePolygon } = props;
    const [selectedTab, setSelectedTab] = React.useState<TabId | undefined>(undefined);
    const [pointStyle, setPointStyle] = React.useState(style?.point ?? DEFAULT_POINT_STYLE);
    const [lineStyle, setLineStyle] = React.useState(style?.line ?? DEFAULT_LINE_STYLE);
    const [polyStyle, setPolyStyle] = React.useState(style?.polygon ?? DEFAULT_POLY_STYLE);
    React.useEffect(() => {
        setPointStyle(style?.point ?? DEFAULT_POINT_STYLE);
        setLineStyle(style?.line ?? DEFAULT_LINE_STYLE);
        setPolyStyle(style?.polygon ?? DEFAULT_POLY_STYLE);
    }, [style]);
    const onStyleChanged = (point: IBasicPointCircleStyle, line: IBasicVectorLineStyle, poly: IBasicVectorPolygonStyle) => {
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