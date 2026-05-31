import{l as e}from"./iframe-CI-dtkIK.js";import{t}from"./react-BaZxAKf1.js";import{t as n}from"./jsx-runtime-DFg_a16f.js";import{t as r}from"./dist-qLsfTqiM.js";import{t as i}from"./dist-BNmPr1xU.js";import{Y as a,n as o,t as s}from"./color-brewer-DPGnJszq.js";import{a as c,c as l,i as u,n as d,o as f,r as p,s as m,t as h}from"./vector-style-editor-gXTkgUf3.js";var g=e(t()),_=r(),v=`A collection of reusable UI components used throughout the application.`,y=n(),b={title:`Common Components`,decorators:[_.withKnobs],parameters:{docs:{description:{component:v}}}},x=()=>{let e=i(`Value changed`),[t,n]=g.useState(void 0);return(0,y.jsx)(m,{locale:`en`,value:t,onChange:t=>{e(t),n(t)}})},S=()=>{let e=i(`Value changed`),[t,n]=g.useState(void 0);return(0,y.jsx)(c,{locale:`en`,value:t,onChange:t=>{e(t),n(t)}})},C=()=>{let e=i(`Value changed`),t=(0,_.number)(`Min Value`,0),n=(0,_.number)(`Max Value`,100),[r,a]=g.useState(void 0);return(0,y.jsx)(f,{min:t,max:n,labelStepSize:n,locale:`en`,value:r,onChange:t=>{e(t),a(t)}})},w=()=>{let e=i(`Value changed`),[t,n]=g.useState(void 0);return(0,y.jsx)(u,{locale:`en`,value:t,onChange:t=>{e(t),n(t)}})},T=()=>{let e=i(`Value changed`),[t,n]=g.useState(void 0);return(0,y.jsx)(p,{locale:`en`,value:t,onChange:t=>{e(t),n(t)}})},E=()=>{let e=i(`color changed`),[t,n]=g.useState(void 0);return(0,y.jsx)(l,{locale:`en`,value:t,onChange:t=>{e(t),n(t)}})},D=()=>(0,y.jsx)(d,{onChange:i(`style changed`),locale:`en`,enablePoint:(0,_.boolean)(`Enable Point`,!0),enableLine:(0,_.boolean)(`Enable Line`,!0),enablePolygon:(0,_.boolean)(`Enable Polygon`,!0)}),O=()=>{let[e,t]=g.useState(a),n=i(`Style changed`);return(0,y.jsx)(h,{style:e,onChange:e=>{t(e),n(e)},enablePoint:(0,_.boolean)(`Enable Point`,!0),enableLine:(0,_.boolean)(`Enable Line`,!0),enablePolygon:(0,_.boolean)(`Enable Polygon`,!0),locale:`en`})},k={render:()=>{let e=o(),t,n={};for(let r of e)t||(t=r.scheme),n[r.displayName]=r.scheme;return(0,y.jsx)(s,{theme:(0,_.select)(`ColorBrewer Theme`,n,t)})},name:`ColorBrewer Swatch`};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof StringExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <StringExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<number> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof NumberExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <NumberExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<string> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof ColorExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <ColorExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const locale = DEFAULT_LOCALE;
  const act = action("Value changed");
  const [expr, setExpr] = React.useState<ExprOr<boolean> | undefined>(undefined);
  const onChange: React.ComponentProps<typeof BooleanExprEditor>["onChange"] = e => {
    act(e);
    setExpr(e);
  };
  return <BooleanExprEditor locale={locale} value={expr} onChange={onChange} />;
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const act = action("color changed");
  const [color, setColor] = React.useState<string | undefined>(undefined);
  const onSetColor = (val: string) => {
    act(val);
    setColor(val);
  };
  return <ColorPicker locale="en" value={color} onChange={onSetColor} />;
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  return <VectorStyleEditor onChange={action("style changed")} locale="en" enablePoint={boolean("Enable Point", true)} enableLine={boolean("Enable Line", true)} enablePolygon={boolean("Enable Polygon", true)} />;
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => {
  const [layerStyle, setLayerStyle] = React.useState<IVectorLayerStyle>(DEFAULT_VECTOR_LAYER_STYLE);
  const act = action("Style changed");
  const onChange = (st: IVectorLayerStyle) => {
    setLayerStyle(st);
    act(st);
  };
  return <VectorLayerStyleEditor style={layerStyle} onChange={onChange} enablePoint={boolean("Enable Point", true)} enableLine={boolean("Enable Line", true)} enablePolygon={boolean("Enable Polygon", true)} locale={DEFAULT_LOCALE} />;
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};var A=[`_StringExprEditor`,`_NumberExprEditor`,`_SliderExprEditor`,`_ColorExprEditor`,`_BooleanExprEditor`,`_ColorPicker`,`_VectorStyleEditor`,`_VectorLayerStyleEditor`,`_ColorBrewerSwatch`];export{T as _BooleanExprEditor,k as _ColorBrewerSwatch,w as _ColorExprEditor,E as _ColorPicker,S as _NumberExprEditor,C as _SliderExprEditor,x as _StringExprEditor,O as _VectorLayerStyleEditor,D as _VectorStyleEditor,A as __namedExportsOrder,b as default};