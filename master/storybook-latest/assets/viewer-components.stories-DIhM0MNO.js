import{l as e}from"./iframe-CoO1VusB.js";import{t}from"./react-DB_eTEe3.js";import{t as n}from"./jsx-runtime-F6BxBKY_.js";/* empty css               */import{A as r,Q as i,c as a,i as o,o as s,t as c}from"./dist-CSA4HyuH.js";import{t as l}from"./dist-BNmPr1xU.js";import{o as u,r as d}from"./cjs-B8mJDo96.js";import{t as f}from"./map-load-indicator-DBI47WrG.js";import{t as p}from"./modal-dialog-DYebPEsZ.js";var m=c(),h=e(t()),g=n();function _(e){return e.preventDefault(),window.location.reload(),!1}var v=e=>(0,g.jsxs)(`div`,{className:`component-session-expired`,children:[(0,g.jsx)(`p`,{children:r(`SESSION_EXPIRED_DETAILED`,e.locale)}),(0,g.jsx)(`p`,{children:(0,g.jsx)(`strong`,{children:r(`SESSION_EXPIRED_AVAILABLE_ACTIONS`,e.locale)})}),(0,g.jsx)(`ul`,{children:(0,g.jsx)(`li`,{children:(0,g.jsx)(`a`,{href:`#`,onClick:_,children:r(`SESSION_EXPIRED_RELOAD_VIEWER`,e.locale)})})})]}),y=e=>(0,g.jsx)(`div`,{className:`status-bar-component component-pbmg`,...e,children:(0,g.jsx)(a,{style:{display:`block`},spriteClass:`PoweredBy_en`})}),b=e=>{let{MenuComponent:t}=o(),n=h.useRef(null),r=!!e.flyoutConf?.[i]?.open;return h.useEffect(()=>{if(!r)return;let t=t=>{let r=t.target;r instanceof Node&&(n.current?.contains(r)||r instanceof Element&&r.closest(`.layout-splitter`)||e.onCloseFlyout(i))};return document.addEventListener(`mousedown`,t,!0),document.addEventListener(`touchstart`,t,!0),()=>{document.removeEventListener(`mousedown`,t,!0),document.removeEventListener(`touchstart`,t,!0)}},[r,e.onCloseFlyout]),(0,g.jsx)(`div`,{children:(()=>{let r=[];for(let i in e.flyoutConf){let a=e.flyoutConf[i];if(a.open){let o=a.childItems||[],s={};if(s.zIndex=2e3,a.metrics){let e=a.metrics;i==`MapContextMenu`?(s.top=e.posY-40,s.left=e.posX+20):(a.metrics.vertical===!0?s.top=e.posY:s.top=e.posY+e.height,i==`TaskMenu`?s.right=window.innerWidth-(e.posX+e.width):(s.left=e.posX,a.metrics.vertical===!0&&(s.left+=e.width)))}let c=()=>{e.onCloseFlyout(i)},l=`mg-flyout-menu-container`;a.componentName&&(l=`mg-flyout-component-container`),r.push((0,g.jsxs)(`div`,{ref:i===`MapContextMenu`?n:void 0,className:l,style:s,children:[a.componentName?(0,g.jsx)(d,{id:a.componentName,componentProps:a.componentProps,locale:e.locale}):(0,g.jsx)(t,{items:o,onInvoked:c}),(()=>{if(i===`TaskMenu`)return(0,g.jsx)(`iframe`,{src:`about:blank`,className:`iframe-iehack-zindex`})})()]},i))}}return r})()})},x=e=>{let t=e.size||0,n=e.percentage?`%`:`px`,r=`layout-pane`,i={};return e.primary?r+=` layout-pane-primary`:e.vertical?i.height=`${t}${n}`:i.width=`${t}${n}`,(0,g.jsx)(`div`,{className:r,style:i,children:e.children})};function S(){if(window.getSelection){let e=window.getSelection();e&&(e.empty?e.empty():e.removeAllRanges&&e.removeAllRanges())}}var C=4,w=e=>{let[t,n]=h.useState(!1),[r,i]=h.useState(0),a=h.useRef(null),o=h.useRef(null),s=h.useCallback((t,n,r,i)=>{let a,o,s;e.vertical?(a=t.height,o=n.height,s=r.top-t.top):(a=t.width,o=n.width,s=r.left-t.left),i&&(s-=o/2),s<0?s=0:s>a-o&&(s=a-o);let c;c=e.primaryIndex===1?s:a-o-s;let l=a-o-c;e.percentage&&(c=c*100/a,l=l*100/a,o=o*100/a,a=100);let u=e.primaryMinSize??0,d=e.secondaryMinSize??0;return l<u?c=Math.max(c-(u-l),0):c<d&&(c=Math.min(a-o-u,d)),c},[e.vertical,e.primaryIndex,e.percentage,e.primaryMinSize,e.secondaryMinSize]);h.useEffect(()=>{let t=0;if(e.secondaryInitialSize!==void 0)t=e.secondaryInitialSize;else if(a.current){let e=a.current.getBoundingClientRect(),n;n=o.current?o.current.getBoundingClientRect():{width:C,height:C},t=s(e,n,{left:e.left+(e.width-n.width)/2,top:e.top+(e.height-n.height)/2},!1)}i(t)},[]),h.useEffect(()=>{function t(){if(o.current&&a.current&&!e.percentage){let e=a.current.getBoundingClientRect(),t=o.current.getBoundingClientRect();i(s(e,t,{left:t.left,top:t.top},!1))}}return window.addEventListener(`resize`,t),()=>window.removeEventListener(`resize`,t)},[s,e.percentage]),h.useEffect(()=>{function e(e){if(t&&a.current&&o.current){let t=s(a.current.getBoundingClientRect(),o.current.getBoundingClientRect(),{left:e.clientX??e.clientX,top:e.clientY??e.clientY},!0);S(),i(t)}}function r(t){e(t.changedTouches[0])}function c(){n(!1)}function l(){n(!1)}return document.addEventListener(`mousemove`,e),document.addEventListener(`mouseup`,c),document.addEventListener(`touchmove`,r),document.addEventListener(`touchend`,l),()=>{document.removeEventListener(`mousemove`,e),document.removeEventListener(`mouseup`,c),document.removeEventListener(`touchmove`,r),document.removeEventListener(`touchend`,l)}},[t,s]),h.useEffect(()=>{e.onSecondaryPaneSizeChange&&e.onSecondaryPaneSizeChange(r)},[r]),h.useEffect(()=>{t&&e.onDragStart?e.onDragStart():!t&&e.onDragEnd&&e.onDragEnd()},[t]);let c=h.useCallback(e=>{e.stopPropagation(),e.preventDefault(),S(),n(!0)},[]),l=h.useCallback(e=>{e.stopPropagation()},[]),u=`splitter-layout`;e.customClassName&&(u+=` ${e.customClassName}`),e.vertical&&(u+=` splitter-layout-vertical`),t&&(u+=` layout-changing`);let d=h.Children.toArray(e.children).slice(0,2);d.length===0&&d.push((0,g.jsx)(`div`,{}));let f=[],p=e.primaryIndex!==0&&e.primaryIndex!==1?0:e.primaryIndex;for(let t=0;t<d.length;++t){let n=!0,i=null;d.length>1&&t!==p&&(n=!1,i=r),f.push((0,g.jsx)(x,{vertical:e.vertical,percentage:e.percentage,primary:n,size:i,children:d[t]},t))}return(0,g.jsxs)(`div`,{className:u,ref:a,children:[f[0],f.length>1&&(0,g.jsx)(`div`,{role:`separator`,className:`layout-splitter`,ref:o,onMouseDown:c,onTouchStart:c,onClick:l}),f.length>1&&f[1]]})},T={title:`Viewer Components`,decorators:[m.withKnobs],parameters:{docs:{description:{component:`This group covers miscellaneous viewer-facing components that are not map-provider specific (can be used in MapGuide or Generic context).

## Included areas
- Error and session messaging components
- Branding and status indicators
- Generic layout and modal primitives
- Toolbar and flyout interaction patterns

## Why this matters
These stories are ideal for validating cross-map-provider UI behaviors that appear throughout the viewer shell.
`}}}},E={render:()=>{if((0,m.select)(`Error type`,[`string`,`Error object`],`string`)===`string`)return(0,g.jsx)(u,{error:`Something went wrong: could not connect to the server.`});let e=window.Error(`Unexpected error occurred`);return e.stack=`Error: Unexpected error occurred
    at Object.<anonymous> (app.js:42)
    at Module._compile (module.js:569)`,(0,g.jsx)(u,{error:e})},name:`Error`},D={render:()=>(0,g.jsx)(v,{locale:(0,m.select)(`Locale`,[`en`,`fr`],`en`)}),name:`Session Expired`},O={render:()=>(0,g.jsx)(y,{}),name:`Powered By MapGuide`},k={render:()=>(0,g.jsxs)(`div`,{style:{position:`relative`,width:400,height:40,background:`#eee`},children:[(0,g.jsx)(f,{loaded:(0,m.number)(`Loaded tiles`,3),loading:(0,m.number)(`Total tiles`,10),color:(0,m.text)(`Color`,`#ff0000`),position:(0,m.select)(`Position`,[`top`,`bottom`],`top`)}),(0,g.jsx)(`div`,{style:{padding:8},children:`Map area (indicator shown above)`})]}),name:`Map Load Indicator (Loading)`},A={render:()=>(0,g.jsxs)(`div`,{style:{position:`relative`,width:400,height:40,background:`#eee`},children:[(0,g.jsx)(f,{loaded:10,loading:10,color:(0,m.text)(`Color`,`#00aa00`),position:(0,m.select)(`Position`,[`top`,`bottom`],`top`)}),(0,g.jsx)(`div`,{style:{padding:8},children:`Map area (indicator hidden – fully loaded)`})]}),name:`Map Load Indicator (Complete)`},j={render:()=>(0,g.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`,alignItems:`center`},children:[(0,g.jsx)(a,{spriteClass:`zoom-in`}),(0,g.jsx)(a,{spriteClass:`zoom-out-fixed`}),(0,g.jsx)(a,{spriteClass:`select`}),(0,g.jsx)(a,{spriteClass:`pan`})]}),name:`ImageIcon (sprite)`},M=[{label:`Home`,tooltip:`Go to home view`,svgIconName:`home`,invoke:l(`Home invoked`)},{label:`Search`,tooltip:`Search features`,svgIconName:`search`,invoke:l(`Search invoked`)},{label:`Print`,tooltip:`Print map`,svgIconName:`print`,invoke:l(`Print invoked`)},{isSeparator:!0},{label:`Select`,tooltip:`Select features`,svgIconName:`select`,invoke:l(`Select invoked`)},{label:`Clear`,tooltip:`Clear selection`,svgIconName:`delete`,enabled:!1,invoke:l(`Clear invoked`)}],N=[{label:`Home`,tooltip:`Go to home view`,svgIconName:`home`,invoke:l(`Home invoked`)},{label:`Search`,tooltip:`Search features`,svgIconName:`search`,invoke:l(`Search invoked`)},{label:`Print`,tooltip:`Print map`,svgIconName:`print`,invoke:l(`Print invoked`)},{isSeparator:!0},{label:`Select`,tooltip:`Select features`,svgIconName:`select`,selected:!0,invoke:l(`Select invoked`)},{label:`Clear`,tooltip:`Clear selection`,svgIconName:`delete`,invoke:l(`Clear invoked`)}],P={render:()=>(0,g.jsx)(s,{childItems:M,containerStyle:{height:32,background:`#f0f0f0`},vertical:(0,m.boolean)(`Vertical`,!1),hideVerticalLabels:(0,m.boolean)(`Hide vertical labels`,!1)}),name:`Toolbar`},F={render:()=>(0,g.jsx)(s,{childItems:N,containerStyle:{height:32,background:`#f0f0f0`},vertical:(0,m.boolean)(`Vertical`,!1),hideVerticalLabels:(0,m.boolean)(`Hide vertical labels`,!1)}),name:`Toolbar (with selected item)`},I=[{label:`Home`,tooltip:`Home`,svgIconName:`home`,invoke:l(`Home`)},{label:`Search`,tooltip:`Search`,svgIconName:`search`,invoke:l(`Search`)},{label:`Print`,tooltip:`Print`,svgIconName:`print`,invoke:l(`Print`)},{isSeparator:!0},{label:`Select`,tooltip:`Select`,svgIconName:`select`,invoke:l(`Select`)},{label:`Multi`,tooltip:`Multi-select`,svgIconName:`multi-select`,invoke:l(`Multi-select`)},{label:`Clear`,tooltip:`Clear`,svgIconName:`delete`,invoke:l(`Clear`)},{isSeparator:!0},{label:`Layers`,tooltip:`Layers`,svgIconName:`layers`,invoke:l(`Layers`)},{label:`New Layer`,tooltip:`New Layer`,svgIconName:`new-layer`,invoke:l(`New Layer`)},{label:`Properties`,tooltip:`Properties`,svgIconName:`properties`,invoke:l(`Properties`)},{isSeparator:!0},{label:`Map`,tooltip:`Map`,svgIconName:`map`,invoke:l(`Map`)},{label:`GeoSearch`,tooltip:`GeoSearch`,svgIconName:`geosearch`,invoke:l(`GeoSearch`)},{label:`Path`,tooltip:`Path Search`,svgIconName:`path-search`,invoke:l(`Path Search`)},{isSeparator:!0},{label:`Upload`,tooltip:`Upload`,svgIconName:`upload`,invoke:l(`Upload`)},{label:`Edit`,tooltip:`Edit`,svgIconName:`edit`,invoke:l(`Edit`)},{label:`Trash`,tooltip:`Trash`,svgIconName:`trash`,invoke:l(`Trash`)},{label:`Settings`,tooltip:`Settings`,svgIconName:`cog`,invoke:l(`Settings`)}],L={render:()=>(0,g.jsx)(`div`,{style:{width:300,border:`1px solid #ccc`},children:(0,g.jsx)(s,{childItems:I,containerStyle:{height:29,background:`#f0f0f0`}})}),name:`Toolbar (horizontal overflow)`},R={render:()=>(0,g.jsx)(`div`,{style:{height:200,border:`1px solid #ccc`,display:`inline-flex`},children:(0,g.jsx)(s,{childItems:I,containerStyle:{width:29,background:`#f0f0f0`},vertical:!0,hideVerticalLabels:!0})}),name:`Toolbar (vertical overflow)`},z={render:()=>{let[e,t]=h.useState(!0),n=(0,m.text)(`Title`,`My Dialog`),r=(0,m.boolean)(`Enable interaction mask`,!0);return(0,g.jsxs)(`div`,{style:{position:`relative`,width:640,height:480,background:`#ddd`},children:[!e&&(0,g.jsx)(`button`,{onClick:()=>t(!0),style:{margin:8},children:`Open dialog`}),(0,g.jsx)(p,{x:50,y:50,width:320,height:240,title:n,isOpen:e,icon:`info-sign`,locale:`en`,enableInteractionMask:r,onClose:()=>t(!1),onChange:l(`dialog changed`),children:([e,t])=>(0,g.jsxs)(`div`,{style:{width:e,height:t,padding:8},children:[(0,g.jsxs)(`p`,{children:[`Dialog content (`,e,`×`,t,`)`]}),(0,g.jsx)(`p`,{children:`Drag the title bar to move, drag the corners to resize.`})]})})]})},name:`Rnd Modal Dialog`},B={render:()=>{let[e,t]=h.useState({menu1:{open:!0,metrics:{posX:10,posY:40,width:120,height:32},childItems:[{label:`Item One`,invoke:l(`Item One invoked`)},{label:`Item Two`,invoke:l(`Item Two invoked`)},{isSeparator:!0},{label:`Item Three (disabled)`,enabled:!1,invoke:l(`Item Three invoked`)}]}});return(0,g.jsxs)(`div`,{style:{position:`relative`,width:400,height:200,background:`#eee`},children:[(0,g.jsx)(`button`,{style:{position:`absolute`,left:10,top:8},onClick:()=>t(e=>({...e,menu1:{...e.menu1,open:!0}})),children:`Open flyout`}),(0,g.jsx)(b,{flyoutConf:e,locale:`en`,onCloseFlyout:e=>{l(`close flyout`)(e),t(t=>({...t,[e]:{...t[e],open:!1}}))}})]})},name:`Flyout Region`},V={render:()=>(0,g.jsx)(`div`,{style:{width:600,height:400},children:(0,g.jsxs)(w,{vertical:(0,m.boolean)(`Vertical`,!1),secondaryInitialSize:(0,m.number)(`Secondary initial size (px)`,200),onSecondaryPaneSizeChange:l(`secondary pane size changed`),children:[(0,g.jsx)(`div`,{style:{background:`#b3d9ff`,width:`100%`,height:`100%`,padding:8},children:`Primary pane`}),(0,g.jsx)(`div`,{style:{background:`#ffd9b3`,width:`100%`,height:`100%`,padding:8},children:`Secondary pane`})]})}),name:`Splitter Layout`};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const locale = select("Locale", ["en", "fr"], "en");
    return <SessionExpired locale={locale} />;
  },
  name: "Session Expired"
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <PoweredByMapGuide />;
  },
  name: "Powered By MapGuide"
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const vertical = boolean("Vertical", false);
    const hideLabels = boolean("Hide vertical labels", false);
    return <Toolbar childItems={TOOLBAR_ITEMS} containerStyle={{
      height: 32,
      background: "#f0f0f0"
    }} vertical={vertical} hideVerticalLabels={hideLabels} />;
  },
  name: "Toolbar"
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const vertical = boolean("Vertical", false);
    const hideLabels = boolean("Hide vertical labels", false);
    return <Toolbar childItems={TOOLBAR_ITEMS_WITH_SELECTED} containerStyle={{
      height: 32,
      background: "#f0f0f0"
    }} vertical={vertical} hideVerticalLabels={hideLabels} />;
  },
  name: "Toolbar (with selected item)"
}`,...F.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}};var H=[`_Error`,`_SessionExpired`,`_PoweredByMapGuide`,`_MapLoadIndicatorLoading`,`_MapLoadIndicatorComplete`,`_ImageIconSprite`,`_Toolbar`,`_ToolbarWithSelectedItem`,`_ToolbarHorizontalOverflow`,`_ToolbarVerticalOverflow`,`_RndModalDialog`,`_FlyoutRegion`,`_SplitterLayout`];export{E as _Error,B as _FlyoutRegion,j as _ImageIconSprite,A as _MapLoadIndicatorComplete,k as _MapLoadIndicatorLoading,O as _PoweredByMapGuide,z as _RndModalDialog,D as _SessionExpired,V as _SplitterLayout,P as _Toolbar,L as _ToolbarHorizontalOverflow,R as _ToolbarVerticalOverflow,F as _ToolbarWithSelectedItem,H as __namedExportsOrder,T as default};