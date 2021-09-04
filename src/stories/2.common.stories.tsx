import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ColorPicker } from '../components/color-picker';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { VectorLayerStyleEditor, VectorStyleEditor } from '../components/vector-style-editor';
import "../styles/index.css";
import { BooleanExprEditor, ColorExprEditor, NumberExprEditor, SliderExprEditor, StringExprEditor } from "../components/layer-manager/common";
import { DEFAULT_VECTOR_LAYER_STYLE, ExprOr, IVectorLayerStyle } from "../api/ol-style-contracts";
import { DEFAULT_LOCALE } from "../api/i18n";

storiesOf("Common Components", module)
    .addDecorator(withKnobs)
    .add("String Expr Editor", () => {
        const locale = DEFAULT_LOCALE;
        const act = action("Value changed");
        const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
        return <StringExprEditor locale={locale} value={expr} onChange={e => setExpr(e)} />;
    })
    .add("Number Expr Editor", () => {
        const locale = DEFAULT_LOCALE;
        const act = action("Value changed");
        const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
        return <NumberExprEditor locale={locale} value={expr} onChange={e => setExpr(e)} />;
    })
    .add("Slider Expr Editor", () => {
        const locale = DEFAULT_LOCALE;
        const act = action("Value changed");
        const min = number("Min Value", 0);
        const max = number("Max Value", 100);
        const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
        return <SliderExprEditor min={min} max={max} labelStepSize={max} locale={locale} value={expr} onChange={e => setExpr(e)} />;
    })
    .add("Color Expr Editor", () => {
        const locale = DEFAULT_LOCALE;
        const act = action("Value changed");
        const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
        return <ColorExprEditor locale={locale} value={expr} onChange={e => setExpr(e)} />;
    })
    .add("Boolean Expr Editor", () => {
        const locale = DEFAULT_LOCALE;
        const act = action("Value changed");
        const [expr, setExpr] = React.useState<ExprOr<boolean> | undefined>(undefined);
        return <BooleanExprEditor locale={locale} value={expr} onChange={e => setExpr(e)} />;
    })
    .add("Color Picker", () => {
        const act = action("color changed");
        const [color, setColor] = React.useState<string | undefined>(undefined);
        const onSetColor = (val: string) => {
            act(val);
            setColor(val);
        };
        return <ColorPicker locale="en" value={color} onChange={onSetColor} />;
    })
    .add("Vector Style Editor", () => {
        return <VectorStyleEditor onChange={action("style changed")}
            locale="en"
            enablePoint={boolean("Enable Point", true)}
            enableLine={boolean("Enable Line", true)}
            enablePolygon={boolean("Enable Polygon", true)} />;
    })
    .add("Vector Layer Style Editor", () => {
        const [layerStyle, setLayerStyle] = React.useState<IVectorLayerStyle>(DEFAULT_VECTOR_LAYER_STYLE);
        const act = action("Style changed");
        const onChange = (st: IVectorLayerStyle) => {
            setLayerStyle(st);
            act(st);
        }
        return <VectorLayerStyleEditor
            style={layerStyle}
            onChange={st => setLayerStyle(st)}
            enablePoint={boolean("Enable Point", true)}
            enableLine={boolean("Enable Line", true)}
            enablePolygon={boolean("Enable Polygon", true)}
            locale={DEFAULT_LOCALE} />;
    });