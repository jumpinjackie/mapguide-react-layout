import{s as e}from"./iframe-yi3XRi0_.js";import{t}from"./react-CV1DqC-d.js";import{t as n}from"./dist-BNmPr1xU.js";import{a as r,c as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./vector-style-editor-Cjl6f2iU.js";import{t as d}from"./dist-BwusgkfG.js";import{Y as f,n as p,t as m}from"./color-brewer-BmXhJE50.js";import{t as h}from"./jsx-runtime-C-yGX20h.js";var g=e(t()),_=d(),v=`A collection of reusable UI components used throughout the application.`,y=h(),b={title:`Common Components`,decorators:[_.withKnobs],parameters:{docs:{description:{component:v}}}},x=()=>{let e=n(`Value changed`),[t,r]=g.useState(void 0);return(0,y.jsx)(l,{locale:`en`,value:t,onChange:t=>{e(t),r(t)}})},S=()=>{let e=n(`Value changed`),[t,i]=g.useState(void 0);return(0,y.jsx)(r,{locale:`en`,value:t,onChange:t=>{e(t),i(t)}})},C=()=>{let e=n(`Value changed`),t=(0,_.number)(`Min Value`,0),r=(0,_.number)(`Max Value`,100),[i,a]=g.useState(void 0);return(0,y.jsx)(s,{min:t,max:r,labelStepSize:r,locale:`en`,value:i,onChange:t=>{e(t),a(t)}})},w=()=>{let e=n(`Value changed`),[t,r]=g.useState(void 0);return(0,y.jsx)(a,{locale:`en`,value:t,onChange:t=>{e(t),r(t)}})},T=()=>{let e=n(`Value changed`),[t,r]=g.useState(void 0);return(0,y.jsx)(c,{locale:`en`,value:t,onChange:t=>{e(t),r(t)}})},E=()=>{let e=n(`color changed`),[t,r]=g.useState(void 0);return(0,y.jsx)(i,{locale:`en`,value:t,onChange:t=>{e(t),r(t)}})},D=()=>(0,y.jsx)(o,{onChange:n(`style changed`),locale:`en`,enablePoint:(0,_.boolean)(`Enable Point`,!0),enableLine:(0,_.boolean)(`Enable Line`,!0),enablePolygon:(0,_.boolean)(`Enable Polygon`,!0)}),O=()=>{let[e,t]=g.useState(f),r=n(`Style changed`);return(0,y.jsx)(u,{style:e,onChange:e=>{t(e),r(e)},enablePoint:(0,_.boolean)(`Enable Point`,!0),enableLine:(0,_.boolean)(`Enable Line`,!0),enablePolygon:(0,_.boolean)(`Enable Polygon`,!0),locale:`en`})},k={render:()=>{let e=p(),t,n={};for(let r of e)t||(t=r.scheme),n[r.displayName]=r.scheme;let r=(0,_.select)(`ColorBrewer Theme`,n,t);return(0,y.jsx)(m,{theme:r})},name:`ColorBrewer Swatch`};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
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