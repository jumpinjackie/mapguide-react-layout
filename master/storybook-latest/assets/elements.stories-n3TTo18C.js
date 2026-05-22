import{j as e}from"./jsx-runtime-K9eJqVHq.js";import{R as p}from"./index-ENwCdwpH.js";import{p as a,K as c,E as fe,k as ye}from"./index-CNuHfLfL.js";import{a as l}from"./index-Br0BFi8U.js";import{a as C}from"./string-Bp5eyemB.js";import"./index-BJqvPe6D.js";import"./iframe-BzySJZKT.js";import"./v4-CtRu48qb.js";function b(){return["application","arrow-left","arrow-right","arrows-horizontal","caret-down","caret-up","chevron-down","chevron-left","chevron-right","chevron-up","cog","comment","comparison","cross","delete","edit","error","folder-close","geosearch","hand","home","info-sign","issue","layer","layers","map","media","menu-closed","menu-open","minus","multi-select","new-layer","path-search","play","plus","print","properties","search","select","small-cross","stop","th","tick","trash","upload","warning-sign","zoom-to-fit"]}const Ie=`This group documents the abstract UI element layer used across the application.

Abstract UI elements are backed by a particular UI toolkit implementation of this abstraction. Currently, that toolkit is Blueprint.js.

## What these stories validate
- Element contracts exposed by the element context
- Visual consistency across providers
- Common interaction states (active, disabled, loading)
- Composition patterns for forms, menus, and layout primitives

## Usage guidance
Use these stories as the baseline reference when building new UI so feature screens stay aligned with shared element behavior and styling.
`,Re={title:"Common Elements",decorators:[a.withKnobs],parameters:{docs:{description:{component:Ie}}}},v={render:()=>{const{Heading:n}=c();return e.jsxs(e.Fragment,{children:[e.jsx(n,{level:1,children:"Heading 1"}),e.jsx(n,{level:2,children:"Heading 2"}),e.jsx(n,{level:3,children:"Heading 3"}),e.jsx(n,{level:4,children:"Heading 4"}),e.jsx(n,{level:5,children:"Heading 5"}),e.jsx(n,{level:6,children:"Heading 6"})]})}},S={render:()=>{const{Text:n}=c(),t=a.select("Component",["span","p","div"],"span"),o=a.text("Content","This is some text content");return e.jsxs(e.Fragment,{children:[e.jsx(n,{component:t,children:o}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("p",{children:"This is an unstyled p"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("span",{children:"This is an unstyled span"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{children:"This is an unstyled div"}),e.jsx("br",{}),e.jsx("br",{})]})}},f={render:()=>{const{Button:n}=c(),t=a.text("Label","Click me");let o=a.select("Icon name",b(),void 0);const s=a.select("Variant",["primary","warning","success","danger"],"primary"),r=a.boolean("Disabled",!1),i=a.boolean("Loading",!1),d=a.boolean("Minimal",!1),m=a.boolean("Active",!1),h=a.text("title","Click me to do stuff");return C(o)&&(o=void 0),e.jsx(e.Fragment,{children:e.jsx(n,{variant:s,icon:o,title:h,loading:i,disabled:r,minimal:d,active:m,onClick:l("clicked"),children:t})})},name:"Button"},y={render:()=>{const{Button:n,Heading:t}=c();return e.jsxs(e.Fragment,{children:[e.jsx(t,{level:3,children:"Standard Variants"}),e.jsxs("div",{children:[e.jsx(n,{variant:"primary",children:"Primary"}),e.jsx(n,{variant:"danger",children:"Danger"}),e.jsx(n,{variant:"warning",children:"Warning"}),e.jsx(n,{variant:"success",children:"Success"})]}),e.jsx(t,{level:3,children:"With Icons"}),e.jsxs("div",{children:[e.jsx(n,{icon:"chevron-up",variant:"primary",children:"Primary"}),e.jsx(n,{icon:"chevron-down",variant:"danger",children:"Danger"}),e.jsx(n,{icon:"cog",variant:"warning",children:"Warning"}),e.jsx(n,{icon:"info-sign",variant:"success",children:"Success"})]})]})},name:"Button Variants"},I={render:()=>{const{Radio:n}=c();return e.jsxs(e.Fragment,{children:[e.jsx(n,{label:"Foo",name:"setting",value:"foo",onChange:l("Value changed")}),e.jsx(n,{label:"Bar",name:"setting",value:"bar",onChange:l("Value changed")})]})}},j={render:()=>{const{Slider:n}=c(),t=a.number("Min",0),o=a.number("Max",100),s=a.number("Step size",1),r=a.number("Label step size",5),[i,d]=p.useState(10),m=a.boolean("Disabled",!1),h=l("Value changed"),x=g=>{h(g),d(g)};return e.jsx(n,{min:t,max:o,stepSize:s,labelStepSize:r,value:i,disabled:m,onChange:x})},name:"Slider"},k={render:()=>{const{Button:n,Collapsible:t}=c(),[o,s]=p.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:r=>s(!o),children:"Click me to toggle"}),e.jsx(t,{isOpen:o,children:e.jsx("p",{children:"Toggled content"})})]})},name:"Collapsible"},T={render:()=>{const{Callout:n}=c(),t=a.select("Variant",["primary","warning","success","danger"],"primary");return e.jsx(n,{variant:t,title:"Attention!",children:e.jsx("p",{children:"This is a callout. Thank you for your attention."})})},name:"Callout"},B={render:()=>{const{Checkbox:n}=c(),[t,o]=p.useState(!1);let s=a.text("Label","My Checkbox");const r=a.boolean("Disabled",!1),i=l("Value changed"),d=m=>{i(m),o(m.target.checked)};return e.jsx(n,{checked:t,label:s,disabled:r,onChange:d})},name:"Checkbox"},V={render:()=>{const{Card:n,Heading:t}=c();return e.jsxs(n,{children:[e.jsx(t,{level:3,children:"Card Title"}),e.jsx("p",{children:"This is some card content"})]})},name:"Card"},D={render:()=>{const{Icon:n}=c();return e.jsx("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:20},children:b().map(t=>e.jsxs("div",{style:{width:120,display:"inline-flex",flexDirection:"column",alignItems:"center"},children:[e.jsx(n,{icon:t,iconSize:30}),t]}))})},name:"Icon"},w={render:()=>{const{InputGroup:n}=c(),t=a.boolean("Round",!1),o=a.text("Placeholder","Type some text here ..."),[s,r]=p.useState("");let i=a.select("Icon name",b(),"error");C(i)&&(i=void 0);const d=l("Value changed"),m=h=>{d(h),r(h.target.value)};return e.jsx(n,{round:t,leftIcon:i,value:s,placeholder:o,onChange:m})},name:"InputGroup"},F={render:()=>{const{InputGroup:n,Button:t}=c(),o=a.boolean("Round",!1),s=a.text("Placeholder","Type some text here ..."),[r,i]=p.useState("");let d=a.select("Icon name",b(),"error");C(d)&&(d=void 0);const m=l("Value changed"),h=x=>{m(x),i(x.target.value)};return e.jsx(n,{round:o,leftIcon:d,value:r,placeholder:s,onChange:h,rightElement:e.jsx(t,{variant:"primary",icon:"edit",onClick:l("clicked")})})},name:"InputGroup with right element"},R={render:()=>{const{NonIdealState:n}=c(),t=a.text("Title","Title"),o=a.text("Description","Some description");let s=a.select("Icon name",b(),"error");return C(s)&&(s=void 0),e.jsx(n,{icon:s,title:t,description:o})},name:"NonIdealState"},E={render:()=>{const{NonIdealState:n,Button:t}=c(),o=a.text("Title","Title"),s=a.text("Description","Some description");let r=a.select("Icon name",b(),"error");return C(r)&&(r=void 0),e.jsx(n,{icon:r,title:o,description:s,action:e.jsx(t,{variant:"primary",onClick:l("clicked"),children:"My Action"})})},name:"NonIdealState with action"},P={render:()=>{const{NumericInput:n}=c(),[t,o]=p.useState(10),s=a.number("Min",0),r=a.number("Max",100),i=a.boolean("Disabled",!1),d=l("Value changed"),m=h=>{d(h),o(h)};return e.jsx(n,{value:t,onChange:m,min:s,max:r,disabled:i})},name:"NumericInput"},N={render:()=>{const{Switch:n}=c(),[t,o]=p.useState(!1);let s=a.text("Label","My Switch");const r=a.boolean("Disabled",!1),i=l("Value changed"),d=m=>{i(m),o(m.target.checked)};return e.jsx(n,{checked:t,label:s,disabled:r,onChange:d})},name:"Switch"},_={render:()=>{const{Select:n}=c(),[t,o]=p.useState("foo"),s=l("Value changed"),r=a.boolean("Fill",!1),i=m=>{s(m),o(m)},d=[{value:"foo",label:"Foo"},{value:"bar",label:"Bar"},{value:"baz",label:"Baz"}];return e.jsx(n,{fill:r,value:t,onChange:i,items:d})},name:"Select"},H={render:()=>{const[n,t]=p.useState(void 0),o=l("Value changed"),s=a.boolean("Fill",!1),r=d=>{o(d),t(d)},i=[{value:"foo",label:"Foo"},{value:"bar",label:"Bar"},{value:"baz",label:"Baz"}];return e.jsx(ye,{fill:s,placeholder:"Choose one ...",value:n,onChange:r,items:i})},name:"Select with placeholder"},G={render:()=>{const{Spinner:n}=c(),t=a.select("Variant",["primary","warning","success","danger"],"primary"),o=a.select("Size Preset",["small","standard","large"],"standard");return e.jsx(n,{variant:t,sizePreset:o})},name:"Spinner"},O={render:()=>{const{Button:n}=c(),t=a.boolean("Vertical Orientation",!1);return e.jsx(e.Fragment,{children:e.jsxs(fe,{vertical:t,children:[e.jsx(n,{variant:"primary",onClick:l("clicked"),children:"Primary"}),e.jsx(n,{variant:"danger",onClick:l("clicked"),children:"Danger"}),e.jsx(n,{variant:"warning",onClick:l("clicked"),children:"Warning"}),e.jsx(n,{variant:"success",onClick:l("clicked"),children:"Success"})]})})},name:"Element Group"},A={render:()=>{const{Toaster:n,Button:t}=c(),o=p.useRef(null),s=a.select("Variant",["primary","warning","success","danger"],"primary"),r=a.text("Message","This is a toast notification");let i=a.select("Icon name",b(),"info-sign");C(i)&&(i=void 0);const d=()=>{o.current?.show({message:r,variant:s,icon:i})};return e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"primary",onClick:d,children:"Show Toast"}),e.jsx(n,{usePortal:!1,position:"top",ref:o})]})},name:"Toaster"},M={render:()=>{const{Dialog:n,Button:t,DialogBody:o,DialogFooter:s,DialogFooterActions:r}=c(),[i,d]=p.useState(!1),m=a.text("Title","Dialog Title");let h=a.select("Icon name",b(),"info-sign");return C(h)&&(h=void 0),e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"primary",onClick:()=>d(!0),children:"Open Dialog"}),e.jsxs(n,{isOpen:i,title:m,icon:h,usePortal:!1,onClose:()=>d(!1),children:[e.jsx(o,{children:e.jsx("p",{children:"This is the dialog body content."})}),e.jsx(s,{children:e.jsx(r,{children:e.jsx(t,{variant:"primary",onClick:()=>d(!1),children:"Close"})})})]})]})},name:"Dialog"},z={render:()=>{const{FileInput:n}=c(),t=a.boolean("Fill",!1),o=a.text("Text","Choose file..."),s=a.text("Button text","Browse");return e.jsx(n,{fill:t,text:o,buttonText:s,onInputChange:l("Input changed")})},name:"FileInput"},L={render:()=>{const{EditableText:n}=c(),[t,o]=p.useState("Click to edit me"),s=l("Value changed"),r=i=>{s(i),o(i)};return e.jsx(n,{value:t,onChange:r})},name:"EditableText"},W={render:()=>{const{MenuComponent:n}=c(),t={label:"Recent Files",iconClass:"folder-close",childItems:[{label:"Parcels.geojson",invoke:l("Parcels clicked")},{label:"Roads.geojson",invoke:l("Roads clicked")},{label:"Utilities.sdf",enabled:!1}]},o=[{label:"Open",iconClass:"folder-horizontal-open",invoke:l("Open clicked")},{label:"Save",iconClass:"file-save",invoke:l("Save clicked")},t,{isSeparator:!0},{label:"Disabled item",enabled:!1}];return e.jsx("div",{style:{width:260},children:e.jsx(n,{items:o,onInvoked:l("Menu item invoked")})})},name:"MenuComponent"},Q={render:()=>{const{TabSet:n}=c(),[t,o]=p.useState("tab-1"),s=l("Tab changed"),r=i=>{s(i),o(i)};return e.jsx(n,{id:"demo-tabs",activeTabId:t,onTabChanged:r,tabs:[{id:"tab-1",title:"Overview",content:e.jsx("p",{children:"This is the overview tab content."})},{id:"tab-2",title:"Details",content:e.jsx("p",{children:"This is the details tab content."})},{id:"tab-3",title:"Settings",content:e.jsx("p",{children:"This is the settings tab content."})}]})},name:"TabSet"},U={render:()=>{const{Popover:n,Button:t,Card:o}=c(),s=a.select("Position",["left","bottom","right","top"],"right"),r=a.boolean("Minimal",!1);return e.jsxs(n,{usePortal:!1,minimal:r,position:s,children:[e.jsx(t,{variant:"primary",children:"Toggle Popover"}),e.jsx(o,{children:e.jsx("p",{style:{margin:0},children:"This is popover content."})})]})},name:"Popover"},q={render:()=>{const{Drawer:n,Button:t}=c(),[o,s]=p.useState(!1),r=a.select("Position",["left","bottom","right","top"],"right");let i=a.select("Icon name",b(),"cog");return C(i)&&(i=void 0),e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"primary",onClick:()=>s(!0),children:"Open Drawer"}),e.jsxs(n,{isOpen:o,position:r,title:"Drawer Title",icon:i,onClose:()=>s(!1),children:[e.jsx("p",{children:"This is the drawer content."}),e.jsx(t,{variant:"primary",onClick:()=>s(!1),children:"Close Drawer"})]})]})},name:"Drawer"},J={render:()=>{const{HtmlTable:n}=c(),t=a.boolean("Condensed",!1),o=a.boolean("Bordered",!1);return e.jsxs(n,{condensed:t,bordered:o,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Type"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Main Roads"}),e.jsx("td",{children:"Visible"}),e.jsx("td",{children:"Vector"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Parcels"}),e.jsx("td",{children:"Hidden"}),e.jsx("td",{children:"Vector"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Aerial"}),e.jsx("td",{children:"Visible"}),e.jsx("td",{children:"Raster"})]})]})]})},name:"HtmlTable"},K={render:()=>{const{Button:n,DialogContainer:t,DialogShell:o,DialogHeader:s,DialogBody:r,DialogFooter:i,DialogFooterActions:d}=c();return e.jsx(t,{style:{position:"relative",minHeight:280},children:e.jsxs(o,{style:{width:460,margin:"0 auto"},children:[e.jsx(s,{children:e.jsx("h5",{style:{margin:0},children:"Composed Dialog Layout"})}),e.jsx(r,{children:e.jsx("p",{children:"This story demonstrates the low-level dialog composition primitives."})}),e.jsx(i,{children:e.jsxs(d,{children:[e.jsx(n,{minimal:!0,onClick:l("Cancel clicked"),children:"Cancel"}),e.jsx(n,{variant:"primary",onClick:l("Save clicked"),children:"Save"})]})})]})})},name:"Dialog composition"},X={render:()=>{const{FormGroup:n,InputGroup:t,NumericInput:o,Checkbox:s,Radio:r,Switch:i,Select:d,FileInput:m,EditableText:h,Slider:x}=c(),g=a.boolean("Inline FormGroup Layout",!1),[$,ee]=p.useState("Jane Doe"),[ne,te]=p.useState(28),[ae,oe]=p.useState(!0),[se,re]=p.useState(!1),[ie,le]=p.useState("light"),[ce,de]=p.useState("Click to edit biography"),[ue,me]=p.useState(75),[Y,pe]=p.useState("basic"),he=u=>{l("Name changed")(u.target.value),ee(u.target.value)},ge=u=>{l("Age changed")(u),te(u)},be=u=>{l("Subscribe changed")(u.target.checked),oe(u.target.checked)},Z=u=>{l("Plan changed")(u.target.value),pe(u.target.value)},Ce=u=>{l("Advanced mode changed")(u.target.checked),re(u.target.checked)},xe=u=>{l("Theme changed")(u),le(u)},ve=u=>{l("Bio changed")(u),de(u)},Se=u=>{l("Quality changed")(u),me(u)};return e.jsxs("div",{style:{maxWidth:480},children:[e.jsx(n,{label:"Name",labelFor:"fg-name",inline:g,children:e.jsx(t,{id:"fg-name",value:$,onChange:he})}),e.jsx(n,{label:"Age",inline:g,children:e.jsx(o,{min:0,max:120,value:ne,onChange:ge})}),e.jsx(n,{label:"Theme",labelFor:"fg-theme",inline:g,children:e.jsx(d,{id:"fg-theme",value:ie,onChange:xe,items:[{value:"light",label:"Light"},{value:"dark",label:"Dark"},{value:"contrast",label:"High Contrast"}]})}),e.jsxs(n,{label:"Plan",inline:g,children:[e.jsx(r,{name:"plan",value:"basic",label:"Basic",checked:Y==="basic",onChange:Z}),e.jsx(r,{name:"plan",value:"pro",label:"Pro",checked:Y==="pro",onChange:Z})]}),e.jsx(n,{label:"Subscribe",labelFor:"fg-subscribe",inline:g,children:e.jsx(s,{id:"fg-subscribe",checked:ae,onChange:be,label:"Subscribe to newsletter"})}),e.jsx(n,{label:"Advanced mode",inline:g,children:e.jsx(i,{checked:se,onChange:Ce,label:"Enable advanced features"})}),e.jsx(n,{label:"Attachment",inline:g,children:e.jsx(m,{text:"No file chosen",buttonText:"Select file",onInputChange:l("Attachment changed")})}),e.jsx(n,{label:"Biography",inline:g,children:e.jsx(h,{value:ce,onChange:ve})}),e.jsx(n,{label:"Quality",inline:g,children:e.jsx(x,{min:0,max:100,stepSize:5,labelStepSize:20,value:ue,onChange:Se})})]})},name:"FormGroup with common fields"};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Heading
    } = useElementContext();
    return <>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </>;
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Text
    } = useElementContext();
    const component = select("Component", ["span", "p", "div"], "span");
    const content = text("Content", "This is some text content");
    return <>
        <Text component={component}>{content}</Text>
        <br />
        <br />
        <p>This is an unstyled p</p>
        <br />
        <br />
        <span>This is an unstyled span</span>
        <br />
        <br />
        <div>This is an unstyled div</div>
        <br />
        <br />
      </>;
  }
}`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Button
    } = useElementContext();
    const label = text("Label", "Click me");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), undefined);
    const variant = select("Variant", ["primary", "warning", "success", "danger"], "primary");
    const disabled = boolean("Disabled", false);
    const loading = boolean("Loading", false);
    const minimal = boolean("Minimal", false);
    const active = boolean("Active", false);
    const title = text("title", "Click me to do stuff");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return <>
        <Button variant={variant} icon={icon} title={title} loading={loading} disabled={disabled} minimal={minimal} active={active} onClick={action("clicked")}>
          {label}
        </Button>
      </>;
  },
  name: "Button"
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Button,
      Heading
    } = useElementContext();
    return <>
        <Heading level={3}>Standard Variants</Heading>
        <div>
          <Button variant="primary">Primary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="success">Success</Button>
        </div>
        <Heading level={3}>With Icons</Heading>
        <div>
          <Button icon="chevron-up" variant="primary">
            Primary
          </Button>
          <Button icon="chevron-down" variant="danger">
            Danger
          </Button>
          <Button icon="cog" variant="warning">
            Warning
          </Button>
          <Button icon="info-sign" variant="success">
            Success
          </Button>
        </div>
      </>;
  },
  name: "Button Variants"
}`,...y.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Radio
    } = useElementContext();
    return <>
        <Radio label="Foo" name="setting" value="foo" onChange={action("Value changed")} />
        <Radio label="Bar" name="setting" value="bar" onChange={action("Value changed")} />
      </>;
  }
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Slider
    } = useElementContext();
    const min = number("Min", 0);
    const max = number("Max", 100);
    const stepSize = number("Step size", 1);
    const labelStepSize = number("Label step size", 5);
    const [localValue, setLocalValue] = React.useState(10);
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof Slider>["onChange"] = e => {
      act(e);
      setLocalValue(e);
    };
    return <Slider min={min} max={max} stepSize={stepSize} labelStepSize={labelStepSize} value={localValue} disabled={disabled} onChange={onChange} />;
  },
  name: "Slider"
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Button,
      Collapsible
    } = useElementContext();
    const [isOpen, setIsOpen] = React.useState(false);
    return <>
        <Button onClick={e => setIsOpen(!isOpen)}>Click me to toggle</Button>
        <Collapsible isOpen={isOpen}>
          <p>Toggled content</p>
        </Collapsible>
      </>;
  },
  name: "Collapsible"
}`,...k.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Callout
    } = useElementContext();
    const variant = select("Variant", ["primary", "warning", "success", "danger"], "primary");
    return <Callout variant={variant} title="Attention!">
        <p>This is a callout. Thank you for your attention.</p>
      </Callout>;
  },
  name: "Callout"
}`,...T.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Checkbox
    } = useElementContext();
    const [isChecked, setIsChecked] = React.useState(false);
    let label = text("Label", "My Checkbox");
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof Checkbox>["onChange"] = e => {
      act(e);
      setIsChecked(e.target.checked);
    };
    return <Checkbox checked={isChecked} label={label} disabled={disabled} onChange={onChange} />;
  },
  name: "Checkbox"
}`,...B.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Card,
      Heading
    } = useElementContext();
    return <Card>
        <Heading level={3}>Card Title</Heading>
        <p>This is some card content</p>
      </Card>;
  },
  name: "Card"
}`,...V.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Icon
    } = useElementContext();
    return <div style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 20
    }}>
        {getIconNames().map(iconName => <div style={{
        width: 120,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
            <Icon icon={iconName} iconSize={30} />
            {iconName}
          </div>)}
      </div>;
  },
  name: "Icon"
}`,...D.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      InputGroup
    } = useElementContext();
    const round = boolean("Round", false);
    const placeholder = text("Placeholder", "Type some text here ...");
    const [localValue, setLocalValue] = React.useState("");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof InputGroup>["onChange"] = e => {
      act(e);
      setLocalValue(e.target.value);
    };
    return <InputGroup round={round} leftIcon={icon} value={localValue} placeholder={placeholder} onChange={onChange} />;
  },
  name: "InputGroup"
}`,...w.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      InputGroup,
      Button
    } = useElementContext();
    const round = boolean("Round", false);
    const placeholder = text("Placeholder", "Type some text here ...");
    const [localValue, setLocalValue] = React.useState("");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof InputGroup>["onChange"] = e => {
      act(e);
      setLocalValue(e.target.value);
    };
    return <InputGroup round={round} leftIcon={icon} value={localValue} placeholder={placeholder} onChange={onChange} rightElement={<Button variant="primary" icon="edit" onClick={action("clicked")} />} />;
  },
  name: "InputGroup with right element"
}`,...F.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      NonIdealState
    } = useElementContext();
    const title = text("Title", "Title");
    const desc = text("Description", "Some description");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return <NonIdealState icon={icon} title={title} description={desc} />;
  },
  name: "NonIdealState"
}`,...R.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      NonIdealState,
      Button
    } = useElementContext();
    const title = text("Title", "Title");
    const desc = text("Description", "Some description");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return <NonIdealState icon={icon} title={title} description={desc} action={<Button variant="primary" onClick={action("clicked")}>
            My Action
          </Button>} />;
  },
  name: "NonIdealState with action"
}`,...E.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      NumericInput
    } = useElementContext();
    const [localValue, setLocalValue] = React.useState(10);
    const min = number("Min", 0);
    const max = number("Max", 100);
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof NumericInput>["onChange"] = e => {
      act(e);
      setLocalValue(e);
    };
    return <NumericInput value={localValue} onChange={onChange} min={min} max={max} disabled={disabled} />;
  },
  name: "NumericInput"
}`,...P.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Switch
    } = useElementContext();
    const [isChecked, setIsChecked] = React.useState(false);
    let label = text("Label", "My Switch");
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof Switch>["onChange"] = e => {
      act(e);
      setIsChecked(e.target.checked);
    };
    return <Switch checked={isChecked} label={label} disabled={disabled} onChange={onChange} />;
  },
  name: "Switch"
}`,...N.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Select
    } = useElementContext();
    const [localValue, setLocalValue] = React.useState<string | undefined>("foo");
    const act = action("Value changed");
    const fill = boolean("Fill", false);
    const onChange: React.ComponentProps<typeof Select>["onChange"] = e => {
      act(e);
      setLocalValue(e);
    };
    const items = [{
      value: "foo",
      label: "Foo"
    }, {
      value: "bar",
      label: "Bar"
    }, {
      value: "baz",
      label: "Baz"
    }];
    return <Select fill={fill} value={localValue} onChange={onChange} items={items} />;
  },
  name: "Select"
}`,..._.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [localValue, setLocalValue] = React.useState<string | undefined>(undefined);
    const act = action("Value changed");
    const fill = boolean("Fill", false);
    const onChange: React.ComponentProps<typeof TypedSelect<string, true>>["onChange"] = e => {
      act(e);
      setLocalValue(e);
    };
    const items = [{
      value: "foo",
      label: "Foo"
    }, {
      value: "bar",
      label: "Bar"
    }, {
      value: "baz",
      label: "Baz"
    }];
    return <TypedSelect<string, true> fill={fill} placeholder="Choose one ..." value={localValue} onChange={onChange} items={items} />;
  },
  name: "Select with placeholder"
}`,...H.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Spinner
    } = useElementContext();
    const variant = select("Variant", ["primary", "warning", "success", "danger"], "primary");
    const size = select("Size Preset", ["small", "standard", "large"], "standard");
    return <Spinner variant={variant} sizePreset={size} />;
  },
  name: "Spinner"
}`,...G.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Button
    } = useElementContext();
    const vertical = boolean("Vertical Orientation", false);
    return <>
        <ElementGroup vertical={vertical}>
          <Button variant="primary" onClick={action("clicked")}>
            Primary
          </Button>
          <Button variant="danger" onClick={action("clicked")}>
            Danger
          </Button>
          <Button variant="warning" onClick={action("clicked")}>
            Warning
          </Button>
          <Button variant="success" onClick={action("clicked")}>
            Success
          </Button>
        </ElementGroup>
      </>;
  },
  name: "Element Group"
}`,...O.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Toaster,
      Button
    } = useElementContext();
    const toasterRef = React.useRef<IToasterRef>(null);
    const variant = select("Variant", ["primary", "warning", "success", "danger"], "primary");
    const message = text("Message", "This is a toast notification");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "info-sign");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    const onShow = () => {
      toasterRef.current?.show({
        message,
        variant,
        icon
      });
    };
    return <>
        <Button variant="primary" onClick={onShow}>
          Show Toast
        </Button>
        <Toaster usePortal={false} position="top" ref={toasterRef} />
      </>;
  },
  name: "Toaster"
}`,...A.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Dialog,
      Button,
      DialogBody,
      DialogFooter,
      DialogFooterActions
    } = useElementContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const title = text("Title", "Dialog Title");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "info-sign");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return <>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>
        <Dialog isOpen={isOpen} title={title} icon={icon} usePortal={false} onClose={() => setIsOpen(false)}>
          <DialogBody>
            <p>This is the dialog body content.</p>
          </DialogBody>
          <DialogFooter>
            <DialogFooterActions>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </DialogFooterActions>
          </DialogFooter>
        </Dialog>
      </>;
  },
  name: "Dialog"
}`,...M.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      FileInput
    } = useElementContext();
    const fill = boolean("Fill", false);
    const fileText = text("Text", "Choose file...");
    const buttonText = text("Button text", "Browse");
    return <FileInput fill={fill} text={fileText} buttonText={buttonText} onInputChange={action("Input changed")} />;
  },
  name: "FileInput"
}`,...z.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      EditableText
    } = useElementContext();
    const [localValue, setLocalValue] = React.useState("Click to edit me");
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof EditableText>["onChange"] = value => {
      act(value);
      setLocalValue(value);
    };
    return <EditableText value={localValue} onChange={onChange} />;
  },
  name: "EditableText"
}`,...L.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      MenuComponent
    } = useElementContext();
    const recentFilesSubMenu: IInlineMenu = {
      label: "Recent Files",
      iconClass: "folder-close",
      childItems: [{
        label: "Parcels.geojson",
        invoke: action("Parcels clicked")
      }, {
        label: "Roads.geojson",
        invoke: action("Roads clicked")
      }, {
        label: "Utilities.sdf",
        enabled: false
      }]
    };
    const items: IItem[] = [{
      label: "Open",
      iconClass: "folder-horizontal-open",
      invoke: action("Open clicked")
    }, {
      label: "Save",
      iconClass: "file-save",
      invoke: action("Save clicked")
    }, recentFilesSubMenu, {
      isSeparator: true
    }, {
      label: "Disabled item",
      enabled: false
    }];
    return <div style={{
      width: 260
    }}>
        <MenuComponent items={items} onInvoked={action("Menu item invoked")} />
      </div>;
  },
  name: "MenuComponent"
}`,...W.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      TabSet
    } = useElementContext();
    const [activeTabId, setActiveTabId] = React.useState<string | number>("tab-1");
    const act = action("Tab changed");
    const onTabChanged: React.ComponentProps<typeof TabSet>["onTabChanged"] = tabId => {
      act(tabId);
      setActiveTabId(tabId);
    };
    return <TabSet id="demo-tabs" activeTabId={activeTabId} onTabChanged={onTabChanged} tabs={[{
      id: "tab-1",
      title: "Overview",
      content: <p>This is the overview tab content.</p>
    }, {
      id: "tab-2",
      title: "Details",
      content: <p>This is the details tab content.</p>
    }, {
      id: "tab-3",
      title: "Settings",
      content: <p>This is the settings tab content.</p>
    }]} />;
  },
  name: "TabSet"
}`,...Q.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Popover,
      Button,
      Card
    } = useElementContext();
    const position = select("Position", ["left", "bottom", "right", "top"], "right");
    const minimal = boolean("Minimal", false);
    return <Popover usePortal={false} minimal={minimal} position={position}>
        <Button variant="primary">Toggle Popover</Button>
        <Card>
          <p style={{
          margin: 0
        }}>This is popover content.</p>
        </Card>
      </Popover>;
  },
  name: "Popover"
}`,...U.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Drawer,
      Button
    } = useElementContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const position = select("Position", ["left", "bottom", "right", "top"], "right");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "cog");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return <>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button>
        <Drawer isOpen={isOpen} position={position} title="Drawer Title" icon={icon} onClose={() => setIsOpen(false)}>
          <p>This is the drawer content.</p>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Close Drawer
          </Button>
        </Drawer>
      </>;
  },
  name: "Drawer"
}`,...q.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      HtmlTable
    } = useElementContext();
    const condensed = boolean("Condensed", false);
    const bordered = boolean("Bordered", false);
    return <HtmlTable condensed={condensed} bordered={bordered}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Main Roads</td>
            <td>Visible</td>
            <td>Vector</td>
          </tr>
          <tr>
            <td>Parcels</td>
            <td>Hidden</td>
            <td>Vector</td>
          </tr>
          <tr>
            <td>Aerial</td>
            <td>Visible</td>
            <td>Raster</td>
          </tr>
        </tbody>
      </HtmlTable>;
  },
  name: "HtmlTable"
}`,...J.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Button,
      DialogContainer,
      DialogShell,
      DialogHeader,
      DialogBody,
      DialogFooter,
      DialogFooterActions
    } = useElementContext();
    return <DialogContainer style={{
      position: "relative",
      minHeight: 280
    }}>
        <DialogShell style={{
        width: 460,
        margin: "0 auto"
      }}>
          <DialogHeader>
            <h5 style={{
            margin: 0
          }}>Composed Dialog Layout</h5>
          </DialogHeader>
          <DialogBody>
            <p>This story demonstrates the low-level dialog composition primitives.</p>
          </DialogBody>
          <DialogFooter>
            <DialogFooterActions>
              <Button minimal={true} onClick={action("Cancel clicked")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={action("Save clicked")}>
                Save
              </Button>
            </DialogFooterActions>
          </DialogFooter>
        </DialogShell>
      </DialogContainer>;
  },
  name: "Dialog composition"
}`,...K.parameters?.docs?.source}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      FormGroup,
      InputGroup,
      NumericInput,
      Checkbox,
      Radio,
      Switch,
      Select,
      FileInput,
      EditableText,
      Slider
    } = useElementContext();
    const inline = boolean("Inline FormGroup Layout", false);
    const [nameValue, setNameValue] = React.useState("Jane Doe");
    const [ageValue, setAgeValue] = React.useState(28);
    const [subscribed, setSubscribed] = React.useState(true);
    const [advancedMode, setAdvancedMode] = React.useState(false);
    const [theme, setTheme] = React.useState<string | undefined>("light");
    const [bio, setBio] = React.useState("Click to edit biography");
    const [quality, setQuality] = React.useState(75);
    const [plan, setPlan] = React.useState("basic");
    const onNameChanged: React.ComponentProps<typeof InputGroup>["onChange"] = e => {
      action("Name changed")(e.target.value);
      setNameValue(e.target.value);
    };
    const onAgeChanged: React.ComponentProps<typeof NumericInput>["onChange"] = value => {
      action("Age changed")(value);
      setAgeValue(value);
    };
    const onSubscribedChanged: React.ComponentProps<typeof Checkbox>["onChange"] = e => {
      action("Subscribe changed")(e.target.checked);
      setSubscribed(e.target.checked);
    };
    const onPlanChanged: React.ComponentProps<typeof Radio>["onChange"] = e => {
      action("Plan changed")(e.target.value);
      setPlan(e.target.value);
    };
    const onAdvancedModeChanged: React.ComponentProps<typeof Switch>["onChange"] = e => {
      action("Advanced mode changed")(e.target.checked);
      setAdvancedMode(e.target.checked);
    };
    const onThemeChanged: React.ComponentProps<typeof Select>["onChange"] = value => {
      action("Theme changed")(value);
      setTheme(value);
    };
    const onBioChanged: React.ComponentProps<typeof EditableText>["onChange"] = value => {
      action("Bio changed")(value);
      setBio(value);
    };
    const onQualityChanged: React.ComponentProps<typeof Slider>["onChange"] = value => {
      action("Quality changed")(value);
      setQuality(value);
    };
    return <div style={{
      maxWidth: 480
    }}>
        <FormGroup label="Name" labelFor="fg-name" inline={inline}>
          <InputGroup id="fg-name" value={nameValue} onChange={onNameChanged} />
        </FormGroup>

        <FormGroup label="Age" inline={inline}>
          <NumericInput min={0} max={120} value={ageValue} onChange={onAgeChanged} />
        </FormGroup>

        <FormGroup label="Theme" labelFor="fg-theme" inline={inline}>
          <Select id="fg-theme" value={theme} onChange={onThemeChanged} items={[{
          value: "light",
          label: "Light"
        }, {
          value: "dark",
          label: "Dark"
        }, {
          value: "contrast",
          label: "High Contrast"
        }]} />
        </FormGroup>

        <FormGroup label="Plan" inline={inline}>
          <Radio name="plan" value="basic" label="Basic" checked={plan === "basic"} onChange={onPlanChanged} />
          <Radio name="plan" value="pro" label="Pro" checked={plan === "pro"} onChange={onPlanChanged} />
        </FormGroup>

        <FormGroup label="Subscribe" labelFor="fg-subscribe" inline={inline}>
          <Checkbox id="fg-subscribe" checked={subscribed} onChange={onSubscribedChanged} label="Subscribe to newsletter" />
        </FormGroup>

        <FormGroup label="Advanced mode" inline={inline}>
          <Switch checked={advancedMode} onChange={onAdvancedModeChanged} label="Enable advanced features" />
        </FormGroup>

        <FormGroup label="Attachment" inline={inline}>
          <FileInput text="No file chosen" buttonText="Select file" onInputChange={action("Attachment changed")} />
        </FormGroup>

        <FormGroup label="Biography" inline={inline}>
          <EditableText value={bio} onChange={onBioChanged} />
        </FormGroup>

        <FormGroup label="Quality" inline={inline}>
          <Slider min={0} max={100} stepSize={5} labelStepSize={20} value={quality} onChange={onQualityChanged} />
        </FormGroup>
      </div>;
  },
  name: "FormGroup with common fields"
}`,...X.parameters?.docs?.source}}};const Ee=["_Heading","_Text","_Button","_ButtonVariants","_Radio","_Slider","_Collapsible","_Callout","_Checkbox","_Card","_Icon","_InputGroup","_InputGroupWithRightElement","_NonIdealState","_NonIdealStateWithAction","_NumericInput","_Switch","_Select","_SelectWithPlaceholder","_Spinner","_ElementGroup","_Toaster","_Dialog","_FileInput","_EditableText","_MenuComponent","_TabSet","_Popover","_Drawer","_HtmlTable","_DialogComposition","_FormGroupWithCommonFields"];export{f as _Button,y as _ButtonVariants,T as _Callout,V as _Card,B as _Checkbox,k as _Collapsible,M as _Dialog,K as _DialogComposition,q as _Drawer,L as _EditableText,O as _ElementGroup,z as _FileInput,X as _FormGroupWithCommonFields,v as _Heading,J as _HtmlTable,D as _Icon,w as _InputGroup,F as _InputGroupWithRightElement,W as _MenuComponent,R as _NonIdealState,E as _NonIdealStateWithAction,P as _NumericInput,U as _Popover,I as _Radio,_ as _Select,H as _SelectWithPlaceholder,j as _Slider,G as _Spinner,N as _Switch,Q as _TabSet,S as _Text,A as _Toaster,Ee as __namedExportsOrder,Re as default};
