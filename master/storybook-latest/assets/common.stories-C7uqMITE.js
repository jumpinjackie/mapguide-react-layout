import{j as c}from"./jsx-runtime-K9eJqVHq.js";import{r as i}from"./index-ENwCdwpH.js";import{a as l}from"./index-Br0BFi8U.js";import{B as L,C as f,a as _,N as V,S as P,b as v,V as A,c as R}from"./vector-style-editor-CIEgWZWV.js";import{p as s,D as p}from"./index-CNuHfLfL.js";import{u as w,b as B,k as O}from"./color-brewer-cOyr5rJR.js";import"./v4-CtRu48qb.js";import"./string-Bp5eyemB.js";import"./Polygon-B8oXxD8-.js";import"./index-BJqvPe6D.js";import"./iframe-BzySJZKT.js";const T="A collection of reusable UI components used throughout the application.",q={title:"Common Components",decorators:[s.withKnobs],parameters:{docs:{description:{component:T}}}},u=()=>{const t=p,o=l("Value changed"),[n,r]=i.useState(void 0),e=a=>{o(a),r(a)};return c.jsx(v,{locale:t,value:n,onChange:e})},d=()=>{const t=p,o=l("Value changed"),[n,r]=i.useState(void 0),e=a=>{o(a),r(a)};return c.jsx(V,{locale:t,value:n,onChange:e})},E=()=>{const t=p,o=l("Value changed"),n=s.number("Min Value",0),r=s.number("Max Value",100),[e,a]=i.useState(void 0),y=b=>{o(b),a(b)};return c.jsx(P,{min:n,max:r,labelStepSize:r,locale:t,value:e,onChange:y})},m=()=>{const t=p,o=l("Value changed"),[n,r]=i.useState(void 0),e=a=>{o(a),r(a)};return c.jsx(f,{locale:t,value:n,onChange:e})},x=()=>{const t=p,o=l("Value changed"),[n,r]=i.useState(void 0),e=a=>{o(a),r(a)};return c.jsx(L,{locale:t,value:n,onChange:e})},g=()=>{const t=l("color changed"),[o,n]=i.useState(void 0),r=e=>{t(e),n(e)};return c.jsx(_,{locale:"en",value:o,onChange:r})},C=()=>c.jsx(R,{onChange:l("style changed"),locale:"en",enablePoint:s.boolean("Enable Point",!0),enableLine:s.boolean("Enable Line",!0),enablePolygon:s.boolean("Enable Polygon",!0)}),h=()=>{const[t,o]=i.useState(O),n=l("Style changed"),r=e=>{o(e),n(e)};return c.jsx(A,{style:t,onChange:r,enablePoint:s.boolean("Enable Point",!0),enableLine:s.boolean("Enable Line",!0),enablePolygon:s.boolean("Enable Polygon",!0),locale:p})},S={render:()=>{const t=w();let o;const n={};for(const e of t)o||(o=e.scheme),n[e.displayName]=e.scheme;const r=s.select("ColorBrewer Theme",n,o);return c.jsx(B,{theme:r})},name:"ColorBrewer Swatch"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof StringExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <StringExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof NumberExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <NumberExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...d.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const min = number("Min Value", 0);
  const max = number("Max Value", 100);
  const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof SliderExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <SliderExprEditor min={min} max={max} labelStepSize={max} locale={locale} value={expr} onChange={onChange} />;
}`,...E.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof ColorExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <ColorExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<boolean> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof BooleanExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <BooleanExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const act = action("color changed");
  const [color, setColor] = React.useState<string | undefined>(undefined);
  const onSetColor = (val: string) => {
    act(val);
    setColor(val);
  };
  return <ColorPicker locale="en" value={color} onChange={onSetColor} />;
}`,...g.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  return <VectorStyleEditor onChange={action("style changed")} locale="en" enablePoint={boolean("Enable Point", true)} enableLine={boolean("Enable Line", true)} enablePolygon={boolean("Enable Polygon", true)} />;
}`,...C.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [layerStyle, setLayerStyle] = React.useState<IVectorLayerStyle>(DEFAULT_VECTOR_LAYER_STYLE);
  const act = action("Style changed");
  const onChange = (st: IVectorLayerStyle) => {
    setLayerStyle(st);
    act(st);
  };
  return <VectorLayerStyleEditor style={layerStyle} onChange={onChange} enablePoint={boolean("Enable Point", true)} enableLine={boolean("Enable Line", true)} enablePolygon={boolean("Enable Polygon", true)} locale={DEFAULT_LOCALE} />;
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
  name: "ColorBrewer Swatch"
}`,...S.parameters?.docs?.source}}};const G=["_StringExprEditor","_NumberExprEditor","_SliderExprEditor","_ColorExprEditor","_BooleanExprEditor","_ColorPicker","_VectorStyleEditor","_VectorLayerStyleEditor","_ColorBrewerSwatch"];export{x as _BooleanExprEditor,S as _ColorBrewerSwatch,m as _ColorExprEditor,g as _ColorPicker,d as _NumberExprEditor,E as _SliderExprEditor,u as _StringExprEditor,h as _VectorLayerStyleEditor,C as _VectorStyleEditor,G as __namedExportsOrder,q as default};
