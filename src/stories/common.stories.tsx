import * as React from "react";
import { action } from "@storybook/addon-actions";
import { ColorPicker } from "../components/color-picker";
import { withKnobs, boolean, number, select } from "@storybook/addon-knobs";
import {
  VectorLayerStyleEditor,
  VectorStyleEditor,
} from "../components/vector-style-editor";
import {
  BooleanExprEditor,
  ColorExprEditor,
  NumberExprEditor,
  SliderExprEditor,
  StringExprEditor,
} from "../components/layer-manager/common";
import {
  DEFAULT_VECTOR_LAYER_STYLE,
  ExprOr,
  IVectorLayerStyle,
} from "../api/ol-style-contracts";
import { DEFAULT_LOCALE } from "../api/i18n";
import {
  ColorBrewerSwatch,
  getColorBrewerRamps,
} from "../components/layer-manager/color-brewer";

export default {
  title: "Common Components",
  decorators: [withKnobs],
};

export const _StringExprEditor = () => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof StringExprEditor>["onChange"] = (e) => {
    act(e);
    setExpr(e);
  }
  return (
    <StringExprEditor
      locale={locale}
      value={expr}
      onChange={onChange}
    />
  );
};

export const _NumberExprEditor = () => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof NumberExprEditor>["onChange"] = (e) => {
    act(e);
    setExpr(e);
  }
  return (
    <NumberExprEditor
      locale={locale}
      value={expr}
      onChange={onChange}
    />
  );
};

export const _SliderExprEditor = () => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const min = number("Min Value", 0);
  const max = number("Max Value", 100);
  const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof SliderExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  }
  return (
    <SliderExprEditor
      min={min}
      max={max}
      labelStepSize={max}
      locale={locale}
      value={expr}
      onChange={onChange}
    />
  );
};

export const _ColorExprEditor = () => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof ColorExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return (
    <ColorExprEditor
      locale={locale}
      value={expr}
      onChange={onChange}
    />
  );
};

export const _BooleanExprEditor = () => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<boolean> | undefined>(
    undefined,
  );
  const onChange: React.ComponentProps<typeof BooleanExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return (
    <BooleanExprEditor
      locale={locale}
      value={expr}
      onChange={onChange}
    />
  );
};

export const _ColorPicker = () => {
  const act = action("color changed");
  const [color, setColor] = React.useState<string | undefined>(undefined);
  const onSetColor = (val: string) => {
    act(val);
    setColor(val);
  };
  return <ColorPicker locale="en" value={color} onChange={onSetColor} />;
};

export const _VectorStyleEditor = () => {
  return (
    <VectorStyleEditor
      onChange={action("style changed")}
      locale="en"
      enablePoint={boolean("Enable Point", true)}
      enableLine={boolean("Enable Line", true)}
      enablePolygon={boolean("Enable Polygon", true)}
    />
  );
};

export const _VectorLayerStyleEditor = () => {
  const [layerStyle, setLayerStyle] = React.useState<IVectorLayerStyle>(
    DEFAULT_VECTOR_LAYER_STYLE,
  );
  const act = action("Style changed");
  const onChange = (st: IVectorLayerStyle) => {
    setLayerStyle(st);
    act(st);
  };
  return (
    <VectorLayerStyleEditor
      style={layerStyle}
      onChange={onChange}
      enablePoint={boolean("Enable Point", true)}
      enableLine={boolean("Enable Line", true)}
      enablePolygon={boolean("Enable Polygon", true)}
      locale={DEFAULT_LOCALE}
    />
  );
};

export const _ColorBrewerSwatch = {
  render: () => {
    const ramps = getColorBrewerRamps();
    let defaultValue;
    const options: any = {};
    for (const r of ramps) {
      if (!defaultValue) {
        defaultValue = r.scheme;
      }
      options[r.displayName] = r.scheme;
    }
    const scheme = select("ColorBrewer Theme", options, defaultValue);
    return <ColorBrewerSwatch theme={scheme!} />;
  },

  name: "ColorBrewer Swatch",
};