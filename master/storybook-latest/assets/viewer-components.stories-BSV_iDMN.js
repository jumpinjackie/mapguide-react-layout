import{j as n}from"./jsx-runtime-K9eJqVHq.js";import{r as V,R as f}from"./index-ENwCdwpH.js";import{a as t}from"./index-Br0BFi8U.js";import{J as W,c as w,K as Q,W as k,l as X,p as u,D as J,j as U}from"./index-CNuHfLfL.js";import{P as ee,E as Y}from"./cjs-BOIEizDr.js";import{M as Z}from"./map-load-indicator-FVdSahSb.js";import{R as ne}from"./modal-dialog-Cx9xPEvu.js";/* empty css              */import"./v4-CtRu48qb.js";import"./string-Bp5eyemB.js";import"./index-BJqvPe6D.js";import"./iframe-BzySJZKT.js";function te(e){return e.preventDefault(),window.location.reload(),!1}const oe=e=>n.jsxs("div",{className:"component-session-expired",children:[n.jsx("p",{children:W("SESSION_EXPIRED_DETAILED",e.locale)}),n.jsx("p",{children:n.jsx("strong",{children:W("SESSION_EXPIRED_AVAILABLE_ACTIONS",e.locale)})}),n.jsx("ul",{children:n.jsx("li",{children:n.jsx("a",{href:"#",onClick:te,children:W("SESSION_EXPIRED_RELOAD_VIEWER",e.locale)})})})]}),re=e=>n.jsx("div",{className:"status-bar-component component-pbmg",...e,children:n.jsx(w,{style:{display:"block"},spriteClass:"PoweredBy_en"})}),ae=e=>{const{MenuComponent:o}=Q(),p=V.useRef(null),s=!!e.flyoutConf?.[k]?.open;return V.useEffect(()=>{if(!s)return;const r=l=>{const a=l.target;a instanceof Node&&(p.current?.contains(a)||e.onCloseFlyout(k))};return document.addEventListener("mousedown",r,!0),document.addEventListener("touchstart",r,!0),()=>{document.removeEventListener("mousedown",r,!0),document.removeEventListener("touchstart",r,!0)}},[s,e.onCloseFlyout]),n.jsx("div",{children:(()=>{const r=[];for(const l in e.flyoutConf){const a=e.flyoutConf[l];if(!!a.open){const C=a.childItems||[],h={};if(h.zIndex=2e3,a.metrics){const y=a.metrics;l==k?(h.top=y.posY-40,h.left=y.posX+20):(a.metrics.vertical===!0?h.top=y.posY:h.top=y.posY+y.height,l==X?h.right=window.innerWidth-(y.posX+y.width):(h.left=y.posX,a.metrics.vertical===!0&&(h.left+=y.width)))}const I=()=>{e.onCloseFlyout(l)};let S="mg-flyout-menu-container";a.componentName&&(S="mg-flyout-component-container"),r.push(n.jsxs("div",{ref:l===k?p:void 0,className:S,style:h,children:[a.componentName?n.jsx(ee,{id:a.componentName,componentProps:a.componentProps,locale:e.locale}):n.jsx(o,{items:C,onInvoked:I}),(()=>{if(l===X)return n.jsx("iframe",{src:"about:blank",className:"iframe-iehack-zindex"})})()]},l))}}return r})()})},ie=e=>{const o=e.size||0,p=e.percentage?"%":"px";let s="layout-pane";const r={};return e.primary?s+=" layout-pane-primary":e.vertical?r.height=`${o}${p}`:r.width=`${o}${p}`,n.jsx("div",{className:s,style:r,children:e.children})};function $(){if(window.getSelection){const e=window.getSelection();e&&(e.empty?e.empty():e.removeAllRanges&&e.removeAllRanges())}}const K=4,se=e=>{const[o,p]=f.useState(!1),[s,r]=f.useState(0),l=f.useRef(null),a=f.useRef(null),x=f.useCallback((i,m,c,E)=>{let d,g,b;e.vertical?(d=i.height,g=m.height,b=c.top-i.top):(d=i.width,g=m.width,b=c.left-i.left),E&&(b-=g/2),b<0?b=0:b>d-g&&(b=d-g);let v;e.primaryIndex===1?v=b:v=d-g-b;let L=d-g-v;e.percentage&&(v=v*100/d,L=L*100/d,g=g*100/d,d=100);const H=e.primaryMinSize??0,G=e.secondaryMinSize??0;return L<H?v=Math.max(v-(H-L),0):v<G&&(v=Math.min(d-g-H,G)),v},[e.vertical,e.primaryIndex,e.percentage,e.primaryMinSize,e.secondaryMinSize]);f.useEffect(()=>{let i=0;if(typeof e.secondaryInitialSize<"u")i=e.secondaryInitialSize;else if(l.current){const m=l.current.getBoundingClientRect();let c;a.current?c=a.current.getBoundingClientRect():c={width:K,height:K},i=x(m,c,{left:m.left+(m.width-c.width)/2,top:m.top+(m.height-c.height)/2},!1)}r(i)},[]),f.useEffect(()=>{function i(){if(a.current&&l.current&&!e.percentage){const m=l.current.getBoundingClientRect(),c=a.current.getBoundingClientRect(),E=x(m,c,{left:c.left,top:c.top},!1);r(E)}}return window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[x,e.percentage]),f.useEffect(()=>{function i(d){if(o&&l.current&&a.current){const g=l.current.getBoundingClientRect(),b=a.current.getBoundingClientRect(),v=x(g,b,{left:d.clientX??d.clientX,top:d.clientY??d.clientY},!0);$(),r(v)}}function m(d){i(d.changedTouches[0])}function c(){p(!1)}function E(){p(!1)}return document.addEventListener("mousemove",i),document.addEventListener("mouseup",c),document.addEventListener("touchmove",m),document.addEventListener("touchend",E),()=>{document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",c),document.removeEventListener("touchmove",m),document.removeEventListener("touchend",E)}},[o,x]),f.useEffect(()=>{e.onSecondaryPaneSizeChange&&e.onSecondaryPaneSizeChange(s)},[s]),f.useEffect(()=>{o&&e.onDragStart?e.onDragStart():!o&&e.onDragEnd&&e.onDragEnd()},[o]);const C=f.useCallback(()=>{$(),p(!0)},[]);let h="splitter-layout";e.customClassName&&(h+=` ${e.customClassName}`),e.vertical&&(h+=" splitter-layout-vertical"),o&&(h+=" layout-changing");const I=f.Children.toArray(e.children).slice(0,2);I.length===0&&I.push(n.jsx("div",{}));const S=[],y=e.primaryIndex!==0&&e.primaryIndex!==1?0:e.primaryIndex;for(let i=0;i<I.length;++i){let m=!0,c=null;I.length>1&&i!==y&&(m=!1,c=s),S.push(n.jsx(ie,{vertical:e.vertical,percentage:e.percentage,primary:m,size:c,children:I[i]},i))}return n.jsxs("div",{className:h,ref:l,children:[S[0],S.length>1&&n.jsx("div",{role:"separator",className:"layout-splitter",ref:a,onMouseDown:C,onTouchStart:C}),S.length>1&&S[1]]})},le=`This group covers miscellaneous viewer-facing components that are not map-provider specific (can be used in MapGuide or Generic context).

## Included areas
- Error and session messaging components
- Branding and status indicators
- Generic layout and modal primitives
- Toolbar and flyout interaction patterns

## Why this matters
These stories are ideal for validating cross-map-provider UI behaviors that appear throughout the viewer shell.
`,Ee={title:"Viewer Components",decorators:[u.withKnobs],parameters:{docs:{description:{component:le}}}},T={render:()=>{if(u.select("Error type",["string","Error object"],"string")==="string")return n.jsx(Y,{error:"Something went wrong: could not connect to the server."});const o=window.Error("Unexpected error occurred");return o.stack=`Error: Unexpected error occurred
    at Object.<anonymous> (app.js:42)
    at Module._compile (module.js:569)`,n.jsx(Y,{error:o})},name:"Error"},M={render:()=>{const e=u.select("Locale",["en","fr"],"en");return n.jsx(oe,{locale:e})},name:"Session Expired"},j={render:()=>n.jsx(re,{}),name:"Powered By MapGuide"},_={render:()=>{const e=u.number("Loaded tiles",3),o=u.number("Total tiles",10),p=u.text("Color","#ff0000"),s=u.select("Position",["top","bottom"],"top");return n.jsxs("div",{style:{position:"relative",width:400,height:40,background:"#eee"},children:[n.jsx(Z,{loaded:e,loading:o,color:p,position:s}),n.jsx("div",{style:{padding:8},children:"Map area (indicator shown above)"})]})},name:"Map Load Indicator (Loading)"},O={render:()=>{const e=u.text("Color","#00aa00"),o=u.select("Position",["top","bottom"],"top");return n.jsxs("div",{style:{position:"relative",width:400,height:40,background:"#eee"},children:[n.jsx(Z,{loaded:10,loading:10,color:e,position:o}),n.jsx("div",{style:{padding:8},children:"Map area (indicator hidden – fully loaded)"})]})},name:"Map Load Indicator (Complete)"},R={render:()=>n.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[n.jsx(w,{spriteClass:"zoom-in"}),n.jsx(w,{spriteClass:"zoom-out-fixed"}),n.jsx(w,{spriteClass:"select"}),n.jsx(w,{spriteClass:"pan"})]}),name:"ImageIcon (sprite)"},ce=[{label:"Home",tooltip:"Go to home view",svgIconName:"home",invoke:t("Home invoked")},{label:"Search",tooltip:"Search features",svgIconName:"search",invoke:t("Search invoked")},{label:"Print",tooltip:"Print map",svgIconName:"print",invoke:t("Print invoked")},{isSeparator:!0},{label:"Select",tooltip:"Select features",svgIconName:"select",invoke:t("Select invoked")},{label:"Clear",tooltip:"Clear selection",svgIconName:"delete",enabled:!1,invoke:t("Clear invoked")}],de=[{label:"Home",tooltip:"Go to home view",svgIconName:"home",invoke:t("Home invoked")},{label:"Search",tooltip:"Search features",svgIconName:"search",invoke:t("Search invoked")},{label:"Print",tooltip:"Print map",svgIconName:"print",invoke:t("Print invoked")},{isSeparator:!0},{label:"Select",tooltip:"Select features",svgIconName:"select",selected:!0,invoke:t("Select invoked")},{label:"Clear",tooltip:"Clear selection",svgIconName:"delete",invoke:t("Clear invoked")}],z={render:()=>{const e=u.boolean("Vertical",!1),o=u.boolean("Hide vertical labels",!1);return n.jsx(U,{childItems:ce,containerStyle:{height:32,background:"#f0f0f0"},vertical:e,hideVerticalLabels:o})},name:"Toolbar"},N={render:()=>{const e=u.boolean("Vertical",!1),o=u.boolean("Hide vertical labels",!1);return n.jsx(U,{childItems:de,containerStyle:{height:32,background:"#f0f0f0"},vertical:e,hideVerticalLabels:o})},name:"Toolbar (with selected item)"},q=[{label:"Home",tooltip:"Home",svgIconName:"home",invoke:t("Home")},{label:"Search",tooltip:"Search",svgIconName:"search",invoke:t("Search")},{label:"Print",tooltip:"Print",svgIconName:"print",invoke:t("Print")},{isSeparator:!0},{label:"Select",tooltip:"Select",svgIconName:"select",invoke:t("Select")},{label:"Multi",tooltip:"Multi-select",svgIconName:"multi-select",invoke:t("Multi-select")},{label:"Clear",tooltip:"Clear",svgIconName:"delete",invoke:t("Clear")},{isSeparator:!0},{label:"Layers",tooltip:"Layers",svgIconName:"layers",invoke:t("Layers")},{label:"New Layer",tooltip:"New Layer",svgIconName:"new-layer",invoke:t("New Layer")},{label:"Properties",tooltip:"Properties",svgIconName:"properties",invoke:t("Properties")},{isSeparator:!0},{label:"Map",tooltip:"Map",svgIconName:"map",invoke:t("Map")},{label:"GeoSearch",tooltip:"GeoSearch",svgIconName:"geosearch",invoke:t("GeoSearch")},{label:"Path",tooltip:"Path Search",svgIconName:"path-search",invoke:t("Path Search")},{isSeparator:!0},{label:"Upload",tooltip:"Upload",svgIconName:"upload",invoke:t("Upload")},{label:"Edit",tooltip:"Edit",svgIconName:"edit",invoke:t("Edit")},{label:"Trash",tooltip:"Trash",svgIconName:"trash",invoke:t("Trash")},{label:"Settings",tooltip:"Settings",svgIconName:"cog",invoke:t("Settings")}],P={render:()=>n.jsx("div",{style:{width:300,border:"1px solid #ccc"},children:n.jsx(U,{childItems:q,containerStyle:{height:29,background:"#f0f0f0"}})}),name:"Toolbar (horizontal overflow)"},D={render:()=>n.jsx("div",{style:{height:200,border:"1px solid #ccc",display:"inline-flex"},children:n.jsx(U,{childItems:q,containerStyle:{width:29,background:"#f0f0f0"},vertical:!0,hideVerticalLabels:!0})}),name:"Toolbar (vertical overflow)"},A={render:()=>{const[e,o]=V.useState(!0),p=u.text("Title","My Dialog"),s=u.boolean("Enable interaction mask",!0);return n.jsxs("div",{style:{position:"relative",width:640,height:480,background:"#ddd"},children:[!e&&n.jsx("button",{onClick:()=>o(!0),style:{margin:8},children:"Open dialog"}),n.jsx(ne,{x:50,y:50,width:320,height:240,title:p,isOpen:e,icon:"info-sign",locale:J,enableInteractionMask:s,onClose:()=>o(!1),onChange:t("dialog changed"),children:([r,l])=>n.jsxs("div",{style:{width:r,height:l,padding:8},children:[n.jsxs("p",{children:["Dialog content (",r,"×",l,")"]}),n.jsx("p",{children:"Drag the title bar to move, drag the corners to resize."})]})})]})},name:"Rnd Modal Dialog"},F={render:()=>{const[e,o]=V.useState({menu1:{open:!0,metrics:{posX:10,posY:40,width:120,height:32},childItems:[{label:"Item One",invoke:t("Item One invoked")},{label:"Item Two",invoke:t("Item Two invoked")},{isSeparator:!0},{label:"Item Three (disabled)",enabled:!1,invoke:t("Item Three invoked")}]}}),p=s=>{t("close flyout")(s),o(r=>({...r,[s]:{...r[s],open:!1}}))};return n.jsxs("div",{style:{position:"relative",width:400,height:200,background:"#eee"},children:[n.jsx("button",{style:{position:"absolute",left:10,top:8},onClick:()=>o(s=>({...s,menu1:{...s.menu1,open:!0}})),children:"Open flyout"}),n.jsx(ae,{flyoutConf:e,locale:J,onCloseFlyout:p})]})},name:"Flyout Region"},B={render:()=>{const e=u.boolean("Vertical",!1),o=u.number("Secondary initial size (px)",200);return n.jsx("div",{style:{width:600,height:400},children:n.jsxs(se,{vertical:e,secondaryInitialSize:o,onSecondaryPaneSizeChange:t("secondary pane size changed"),children:[n.jsx("div",{style:{background:"#b3d9ff",width:"100%",height:"100%",padding:8},children:"Primary pane"}),n.jsx("div",{style:{background:"#ffd9b3",width:"100%",height:"100%",padding:8},children:"Secondary pane"})]})})},name:"Splitter Layout"};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const variant = select("Error type", ["string", "Error object"], "string");
    if (variant === "string") {
      return <ErrorComponent error="Something went wrong: could not connect to the server." />;
    }
    const err = window.Error("Unexpected error occurred");
    err.stack = "Error: Unexpected error occurred\\n    at Object.<anonymous> (app.js:42)\\n    at Module._compile (module.js:569)";
    return <ErrorComponent error={err} />;
  },
  name: "Error"
}`,...T.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const locale = select("Locale", ["en", "fr"], "en");
    return <SessionExpired locale={locale} />;
  },
  name: "Session Expired"
}`,...M.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <PoweredByMapGuide />;
  },
  name: "Powered By MapGuide"
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const loaded = number("Loaded tiles", 3);
    const loading = number("Total tiles", 10);
    const color = text("Color", "#ff0000");
    const position = select<MapLoadIndicatorPositioning>("Position", ["top", "bottom"], "top");
    return <div style={{
      position: "relative",
      width: 400,
      height: 40,
      background: "#eee"
    }}>
            <MapLoadIndicator loaded={loaded} loading={loading} color={color} position={position} />
            <div style={{
        padding: 8
      }}>Map area (indicator shown above)</div>
         </div>;
  },
  name: "Map Load Indicator (Loading)"
}`,..._.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const color = text("Color", "#00aa00");
    const position = select<MapLoadIndicatorPositioning>("Position", ["top", "bottom"], "top");
    return <div style={{
      position: "relative",
      width: 400,
      height: 40,
      background: "#eee"
    }}>
            <MapLoadIndicator loaded={10} loading={10} color={color} position={position} />
            <div style={{
        padding: 8
      }}>Map area (indicator hidden – fully loaded)</div>
         </div>;
  },
  name: "Map Load Indicator (Complete)"
}`,...O.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      alignItems: "center"
    }}>
            <ImageIcon spriteClass="zoom-in" />
            <ImageIcon spriteClass="zoom-out-fixed" />
            <ImageIcon spriteClass="select" />
            <ImageIcon spriteClass="pan" />
         </div>;
  },
  name: "ImageIcon (sprite)"
}`,...R.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const vertical = boolean("Vertical", false);
    const hideLabels = boolean("Hide vertical labels", false);
    return <Toolbar childItems={TOOLBAR_ITEMS} containerStyle={{
      height: 32,
      background: "#f0f0f0"
    }} vertical={vertical} hideVerticalLabels={hideLabels} />;
  },
  name: "Toolbar"
}`,...z.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const vertical = boolean("Vertical", false);
    const hideLabels = boolean("Hide vertical labels", false);
    return <Toolbar childItems={TOOLBAR_ITEMS_WITH_SELECTED} containerStyle={{
      height: 32,
      background: "#f0f0f0"
    }} vertical={vertical} hideVerticalLabels={hideLabels} />;
  },
  name: "Toolbar (with selected item)"
}`,...N.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 300,
    border: "1px solid #ccc"
  }}>
         <Toolbar childItems={OVERFLOW_TOOLBAR_ITEMS} containerStyle={{
      height: 29,
      background: "#f0f0f0"
    }} />
      </div>,
  name: "Toolbar (horizontal overflow)"
}`,...P.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 200,
    border: "1px solid #ccc",
    display: "inline-flex"
  }}>
         <Toolbar childItems={OVERFLOW_TOOLBAR_ITEMS} containerStyle={{
      width: 29,
      background: "#f0f0f0"
    }} vertical={true} hideVerticalLabels={true} />
      </div>,
  name: "Toolbar (vertical overflow)"
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const title = text("Title", "My Dialog");
    const enableInteractionMask = boolean("Enable interaction mask", true);
    return <div style={{
      position: "relative",
      width: 640,
      height: 480,
      background: "#ddd"
    }}>
            {!isOpen && <button onClick={() => setIsOpen(true)} style={{
        margin: 8
      }}>
                  Open dialog
               </button>}
            <RndModalDialog x={50} y={50} width={320} height={240} title={title} isOpen={isOpen} icon="info-sign" locale={DEFAULT_LOCALE} enableInteractionMask={enableInteractionMask} onClose={() => setIsOpen(false)} onChange={action("dialog changed")}>
               {([w, h]) => <div style={{
          width: w,
          height: h,
          padding: 8
        }}>
                     <p>Dialog content ({w}×{h})</p>
                     <p>Drag the title bar to move, drag the corners to resize.</p>
                  </div>}
            </RndModalDialog>
         </div>;
  },
  name: "Rnd Modal Dialog"
}`,...A.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [flyoutConf, setFlyoutConf] = React.useState<React.ComponentProps<typeof FlyoutRegion>["flyoutConf"]>({
      "menu1": {
        open: true,
        metrics: {
          posX: 10,
          posY: 40,
          width: 120,
          height: 32
        },
        childItems: [{
          label: "Item One",
          invoke: action("Item One invoked")
        }, {
          label: "Item Two",
          invoke: action("Item Two invoked")
        }, {
          isSeparator: true
        }, {
          label: "Item Three (disabled)",
          enabled: false,
          invoke: action("Item Three invoked")
        }]
      }
    });
    const onCloseFlyout = (id: string) => {
      action("close flyout")(id);
      setFlyoutConf(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          open: false
        }
      }));
    };
    return <div style={{
      position: "relative",
      width: 400,
      height: 200,
      background: "#eee"
    }}>
            <button style={{
        position: "absolute",
        left: 10,
        top: 8
      }} onClick={() => setFlyoutConf(prev => ({
        ...prev,
        menu1: {
          ...prev["menu1"],
          open: true
        }
      }))}>
               Open flyout
            </button>
            <FlyoutRegion flyoutConf={flyoutConf} locale={DEFAULT_LOCALE} onCloseFlyout={onCloseFlyout} />
         </div>;
  },
  name: "Flyout Region"
}`,...F.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const vertical = boolean("Vertical", false);
    const secondaryInitialSize = number("Secondary initial size (px)", 200);
    return <div style={{
      width: 600,
      height: 400
    }}>
            <SplitterLayout vertical={vertical} secondaryInitialSize={secondaryInitialSize} onSecondaryPaneSizeChange={action("secondary pane size changed")}>
               <div style={{
          background: "#b3d9ff",
          width: "100%",
          height: "100%",
          padding: 8
        }}>
                  Primary pane
               </div>
               <div style={{
          background: "#ffd9b3",
          width: "100%",
          height: "100%",
          padding: 8
        }}>
                  Secondary pane
               </div>
            </SplitterLayout>
         </div>;
  },
  name: "Splitter Layout"
}`,...B.parameters?.docs?.source}}};const we=["_Error","_SessionExpired","_PoweredByMapGuide","_MapLoadIndicatorLoading","_MapLoadIndicatorComplete","_ImageIconSprite","_Toolbar","_ToolbarWithSelectedItem","_ToolbarHorizontalOverflow","_ToolbarVerticalOverflow","_RndModalDialog","_FlyoutRegion","_SplitterLayout"];export{T as _Error,F as _FlyoutRegion,R as _ImageIconSprite,O as _MapLoadIndicatorComplete,_ as _MapLoadIndicatorLoading,j as _PoweredByMapGuide,A as _RndModalDialog,M as _SessionExpired,B as _SplitterLayout,z as _Toolbar,P as _ToolbarHorizontalOverflow,D as _ToolbarVerticalOverflow,N as _ToolbarWithSelectedItem,we as __namedExportsOrder,Ee as default};
