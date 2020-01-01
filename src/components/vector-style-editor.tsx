import * as React from "react";
import { IVectorFeatureStyle, IBasicVectorPointStyle, IBasicVectorLineStyle, IBasicVectorPolygonStyle, IBasicPointCircleStyle } from '../api/common';
import { NonIdealState, Tabs, Tab, FormGroup, NumericInput } from '@blueprintjs/core';
import { tr } from "../api/i18n";
import { ColorPicker } from './color-picker';

const DEFAULT_POINT_STYLE: IBasicVectorPointStyle = {
    fill: {
        color: "#0000ff"
    },
    radius: 5,
    stroke: {
        color: "#0100ff",
        width: 1
    }
};

const DEFAULT_LINE_STYLE: IBasicVectorLineStyle = {
    color: "#0100ff",
    width: 1
};

const DEFAULT_POLY_STYLE: IBasicVectorPolygonStyle = {
    fill: {
        color: "#0000ff"
    },
    stroke: {
        color: "#0100ff",
        width: 1
    }
};

interface ISubStyleEditorProps<TStyle> {
    style: TStyle;
    onChange: (style: TStyle) => void;
}

const PointStyleEditor = ({ style, onChange }: ISubStyleEditorProps<IBasicVectorPointStyle>) => {
    return <>
        <FormGroup label="Fill Color">
            <ColorPicker value={style.fill.color} onChange={c => onChange({ ...style, fill: { color: c } })} />
        </FormGroup>
        <FormGroup label="Radius">
            <NumericInput value={style.radius} min={1} onValueChange={n => onChange({ ...style, radius: n })} />
        </FormGroup>
        <FormGroup label="Stroke Color">
            <ColorPicker value={style.stroke.color} onChange={c => onChange({ ...style, stroke: { color: c, width: style.stroke.width } })} />
        </FormGroup>
        <FormGroup label="Stroke Width">
            <NumericInput value={style.stroke.width} min={1} onValueChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: n } })} />
        </FormGroup>
    </>;
}

const LineStyleEditor = ({ style, onChange }: ISubStyleEditorProps<IBasicVectorLineStyle>) => {
    return <>
        <FormGroup label="Line Color">
            <ColorPicker value={style.color} onChange={c => onChange({ color: c, width: style.width })} />
        </FormGroup>
        <FormGroup label="Line Thickness">
            <NumericInput value={style.width} min={1} onValueChange={n => onChange({ color: style.color, width: n })} />
        </FormGroup>
    </>;
}

const PolygonStyleEditor = ({ style, onChange }: ISubStyleEditorProps<IBasicVectorPolygonStyle>) => {
    return <>
        <FormGroup label="Fill Color">
            <ColorPicker value={style.fill.color} onChange={c => onChange({ ...style, fill: { color: c } })} />
        </FormGroup>
        <FormGroup label="Outline Color">
            <ColorPicker value={style.stroke.color} onChange={c => onChange({ ...style, stroke: { color: c, width: style.stroke.width } })} />
        </FormGroup>
        <FormGroup label="Outline Width">
            <NumericInput value={style.stroke.width} min={1} onValueChange={n => onChange({ ...style, stroke: { color: style.stroke.color, width: n } })} />
        </FormGroup>
    </>;
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
            {enablePoint && <Tab id="pointStyle" title="Point" panel={<PointStyleEditor style={pointStyle} onChange={onPointStyleChanged} />} />}
            {enableLine && <Tab id="lineStyle" title="Line" panel={<LineStyleEditor style={lineStyle} onChange={onLineStyleChanged} />} />}
            {enablePolygon && <Tab id="polyStyle" title="Polygon" panel={<PolygonStyleEditor style={polyStyle} onChange={onPolygonStyleChanged} />} />}
        </Tabs>
    }
}