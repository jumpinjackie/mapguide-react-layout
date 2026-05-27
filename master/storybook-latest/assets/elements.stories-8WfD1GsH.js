import{l as e}from"./iframe-Cu2185gL.js";import{t}from"./react-DVP1uK4K.js";import{t as n}from"./jsx-runtime-CEIc628J.js";import{i as r}from"./string-BSenxJ_f.js";import{i,n as a,r as o,t as s}from"./dist-EjAQLVC2.js";import{t as c}from"./dist-BNmPr1xU.js";var l=e(t()),u=s();function d(){return`application.arrow-left.arrow-right.arrows-horizontal.caret-down.caret-up.chevron-down.chevron-left.chevron-right.chevron-up.cog.comment.comparison.cross.delete.edit.error.folder-close.geosearch.hand.home.info-sign.issue.layer.layers.map.media.menu-closed.menu-open.minus.multi-select.new-layer.path-search.play.plus.print.properties.search.select.small-cross.stop.th.tick.trash.upload.warning-sign.zoom-to-fit`.split(`.`)}var f=`This group documents the abstract UI element layer used across the application.

Abstract UI elements are backed by a particular UI toolkit implementation of this abstraction. Currently, that toolkit is Blueprint.js.

## What these stories validate
- Element contracts exposed by the element context
- Visual consistency across providers
- Common interaction states (active, disabled, loading)
- Composition patterns for forms, menus, and layout primitives

## Usage guidance
Use these stories as the baseline reference when building new UI so feature screens stay aligned with shared element behavior and styling.
`,p=n(),m={title:`Common Elements`,decorators:[u.withKnobs],parameters:{docs:{description:{component:f}}}},h={render:()=>{let{Heading:e}=i();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(e,{level:1,children:`Heading 1`}),(0,p.jsx)(e,{level:2,children:`Heading 2`}),(0,p.jsx)(e,{level:3,children:`Heading 3`}),(0,p.jsx)(e,{level:4,children:`Heading 4`}),(0,p.jsx)(e,{level:5,children:`Heading 5`}),(0,p.jsx)(e,{level:6,children:`Heading 6`})]})}},g={render:()=>{let{Text:e}=i();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(e,{component:(0,u.select)(`Component`,[`span`,`p`,`div`],`span`),children:(0,u.text)(`Content`,`This is some text content`)}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`p`,{children:`This is an unstyled p`}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`span`,{children:`This is an unstyled span`}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`div`,{children:`This is an unstyled div`}),(0,p.jsx)(`br`,{}),(0,p.jsx)(`br`,{})]})}},_={render:()=>{let{Button:e}=i(),t=(0,u.text)(`Label`,`Click me`),n=(0,u.select)(`Icon name`,d(),void 0),a=(0,u.select)(`Variant`,[`primary`,`warning`,`success`,`danger`],`primary`),o=(0,u.boolean)(`Disabled`,!1),s=(0,u.boolean)(`Loading`,!1),l=(0,u.boolean)(`Minimal`,!1),f=(0,u.boolean)(`Active`,!1),m=(0,u.text)(`title`,`Click me to do stuff`);return r(n)&&(n=void 0),(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(e,{variant:a,icon:n,title:m,loading:s,disabled:o,minimal:l,active:f,onClick:c(`clicked`),children:t})})},name:`Button`},v={render:()=>{let{Button:e,Heading:t}=i();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t,{level:3,children:`Standard Variants`}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(e,{variant:`primary`,children:`Primary`}),(0,p.jsx)(e,{variant:`danger`,children:`Danger`}),(0,p.jsx)(e,{variant:`warning`,children:`Warning`}),(0,p.jsx)(e,{variant:`success`,children:`Success`})]}),(0,p.jsx)(t,{level:3,children:`With Icons`}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(e,{icon:`chevron-up`,variant:`primary`,children:`Primary`}),(0,p.jsx)(e,{icon:`chevron-down`,variant:`danger`,children:`Danger`}),(0,p.jsx)(e,{icon:`cog`,variant:`warning`,children:`Warning`}),(0,p.jsx)(e,{icon:`info-sign`,variant:`success`,children:`Success`})]})]})},name:`Button Variants`},y={render:()=>{let{Radio:e}=i();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(e,{label:`Foo`,name:`setting`,value:`foo`,onChange:c(`Value changed`)}),(0,p.jsx)(e,{label:`Bar`,name:`setting`,value:`bar`,onChange:c(`Value changed`)})]})}},b={render:()=>{let{Slider:e}=i(),t=(0,u.number)(`Min`,0),n=(0,u.number)(`Max`,100),r=(0,u.number)(`Step size`,1),a=(0,u.number)(`Label step size`,5),[o,s]=l.useState(10),d=(0,u.boolean)(`Disabled`,!1),f=c(`Value changed`);return(0,p.jsx)(e,{min:t,max:n,stepSize:r,labelStepSize:a,value:o,disabled:d,onChange:e=>{f(e),s(e)}})},name:`Slider`},x={render:()=>{let{Button:e,Collapsible:t}=i(),[n,r]=l.useState(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(e,{onClick:e=>r(!n),children:`Click me to toggle`}),(0,p.jsx)(t,{isOpen:n,children:(0,p.jsx)(`p`,{children:`Toggled content`})})]})},name:`Collapsible`},S={render:()=>{let{Callout:e}=i();return(0,p.jsx)(e,{variant:(0,u.select)(`Variant`,[`primary`,`warning`,`success`,`danger`],`primary`),title:`Attention!`,children:(0,p.jsx)(`p`,{children:`This is a callout. Thank you for your attention.`})})},name:`Callout`},C={render:()=>{let{Checkbox:e}=i(),[t,n]=l.useState(!1),r=(0,u.text)(`Label`,`My Checkbox`),a=(0,u.boolean)(`Disabled`,!1),o=c(`Value changed`);return(0,p.jsx)(e,{checked:t,label:r,disabled:a,onChange:e=>{o(e),n(e.target.checked)}})},name:`Checkbox`},w={render:()=>{let{Card:e,Heading:t}=i();return(0,p.jsxs)(e,{children:[(0,p.jsx)(t,{level:3,children:`Card Title`}),(0,p.jsx)(`p`,{children:`This is some card content`})]})},name:`Card`},T={render:()=>{let{Icon:e}=i();return(0,p.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`center`,gap:20},children:d().map(t=>(0,p.jsxs)(`div`,{style:{width:120,display:`inline-flex`,flexDirection:`column`,alignItems:`center`},children:[(0,p.jsx)(e,{icon:t,iconSize:30}),t]}))})},name:`Icon`},E={render:()=>{let{InputGroup:e}=i(),t=(0,u.boolean)(`Round`,!1),n=(0,u.text)(`Placeholder`,`Type some text here ...`),[a,o]=l.useState(``),s=(0,u.select)(`Icon name`,d(),`error`);r(s)&&(s=void 0);let f=c(`Value changed`);return(0,p.jsx)(e,{round:t,leftIcon:s,value:a,placeholder:n,onChange:e=>{f(e),o(e.target.value)}})},name:`InputGroup`},D={render:()=>{let{InputGroup:e,Button:t}=i(),n=(0,u.boolean)(`Round`,!1),a=(0,u.text)(`Placeholder`,`Type some text here ...`),[o,s]=l.useState(``),f=(0,u.select)(`Icon name`,d(),`error`);r(f)&&(f=void 0);let m=c(`Value changed`);return(0,p.jsx)(e,{round:n,leftIcon:f,value:o,placeholder:a,onChange:e=>{m(e),s(e.target.value)},rightElement:(0,p.jsx)(t,{variant:`primary`,icon:`edit`,onClick:c(`clicked`)})})},name:`InputGroup with right element`},O={render:()=>{let{NonIdealState:e}=i(),t=(0,u.text)(`Title`,`Title`),n=(0,u.text)(`Description`,`Some description`),a=(0,u.select)(`Icon name`,d(),`error`);return r(a)&&(a=void 0),(0,p.jsx)(e,{icon:a,title:t,description:n})},name:`NonIdealState`},k={render:()=>{let{NonIdealState:e,Button:t}=i(),n=(0,u.text)(`Title`,`Title`),a=(0,u.text)(`Description`,`Some description`),o=(0,u.select)(`Icon name`,d(),`error`);return r(o)&&(o=void 0),(0,p.jsx)(e,{icon:o,title:n,description:a,action:(0,p.jsx)(t,{variant:`primary`,onClick:c(`clicked`),children:`My Action`})})},name:`NonIdealState with action`},A={render:()=>{let{NumericInput:e}=i(),[t,n]=l.useState(10),r=(0,u.number)(`Min`,0),a=(0,u.number)(`Max`,100),o=(0,u.boolean)(`Disabled`,!1),s=c(`Value changed`);return(0,p.jsx)(e,{value:t,onChange:e=>{s(e),n(e)},min:r,max:a,disabled:o})},name:`NumericInput`},j={render:()=>{let{Switch:e}=i(),[t,n]=l.useState(!1),r=(0,u.text)(`Label`,`My Switch`),a=(0,u.boolean)(`Disabled`,!1),o=c(`Value changed`);return(0,p.jsx)(e,{checked:t,label:r,disabled:a,onChange:e=>{o(e),n(e.target.checked)}})},name:`Switch`},M={render:()=>{let{Select:e}=i(),[t,n]=l.useState(`foo`),r=c(`Value changed`),a=(0,u.boolean)(`Fill`,!1);return(0,p.jsx)(e,{fill:a,value:t,onChange:e=>{r(e),n(e)},items:[{value:`foo`,label:`Foo`},{value:`bar`,label:`Bar`},{value:`baz`,label:`Baz`}]})},name:`Select`},N={render:()=>{let[e,t]=l.useState(void 0),n=c(`Value changed`),r=(0,u.boolean)(`Fill`,!1);return(0,p.jsx)(o,{fill:r,placeholder:`Choose one ...`,value:e,onChange:e=>{n(e),t(e)},items:[{value:`foo`,label:`Foo`},{value:`bar`,label:`Bar`},{value:`baz`,label:`Baz`}]})},name:`Select with placeholder`},P={render:()=>{let{Spinner:e}=i();return(0,p.jsx)(e,{variant:(0,u.select)(`Variant`,[`primary`,`warning`,`success`,`danger`],`primary`),sizePreset:(0,u.select)(`Size Preset`,[`small`,`standard`,`large`],`standard`)})},name:`Spinner`},F={render:()=>{let{Button:e}=i();return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(a,{vertical:(0,u.boolean)(`Vertical Orientation`,!1),children:[(0,p.jsx)(e,{variant:`primary`,onClick:c(`clicked`),children:`Primary`}),(0,p.jsx)(e,{variant:`danger`,onClick:c(`clicked`),children:`Danger`}),(0,p.jsx)(e,{variant:`warning`,onClick:c(`clicked`),children:`Warning`}),(0,p.jsx)(e,{variant:`success`,onClick:c(`clicked`),children:`Success`})]})})},name:`Element Group`},I={render:()=>{let{Toaster:e,Button:t}=i(),n=l.useRef(null),a=(0,u.select)(`Variant`,[`primary`,`warning`,`success`,`danger`],`primary`),o=(0,u.text)(`Message`,`This is a toast notification`),s=(0,u.select)(`Icon name`,d(),`info-sign`);return r(s)&&(s=void 0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t,{variant:`primary`,onClick:()=>{n.current?.show({message:o,variant:a,icon:s})},children:`Show Toast`}),(0,p.jsx)(e,{usePortal:!1,position:`top`,ref:n})]})},name:`Toaster`},L={render:()=>{let{Dialog:e,Button:t,DialogBody:n,DialogFooter:a,DialogFooterActions:o}=i(),[s,c]=l.useState(!1),f=(0,u.text)(`Title`,`Dialog Title`),m=(0,u.select)(`Icon name`,d(),`info-sign`);return r(m)&&(m=void 0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t,{variant:`primary`,onClick:()=>c(!0),children:`Open Dialog`}),(0,p.jsxs)(e,{isOpen:s,title:f,icon:m,usePortal:!1,onClose:()=>c(!1),children:[(0,p.jsx)(n,{children:(0,p.jsx)(`p`,{children:`This is the dialog body content.`})}),(0,p.jsx)(a,{children:(0,p.jsx)(o,{children:(0,p.jsx)(t,{variant:`primary`,onClick:()=>c(!1),children:`Close`})})})]})]})},name:`Dialog`},R={render:()=>{let{FileInput:e}=i();return(0,p.jsx)(e,{fill:(0,u.boolean)(`Fill`,!1),text:(0,u.text)(`Text`,`Choose file...`),buttonText:(0,u.text)(`Button text`,`Browse`),onInputChange:c(`Input changed`)})},name:`FileInput`},z={render:()=>{let{EditableText:e}=i(),[t,n]=l.useState(`Click to edit me`),r=c(`Value changed`);return(0,p.jsx)(e,{value:t,onChange:e=>{r(e),n(e)}})},name:`EditableText`},B={render:()=>{let{MenuComponent:e}=i(),t={label:`Recent Files`,iconClass:`folder-close`,childItems:[{label:`Parcels.geojson`,invoke:c(`Parcels clicked`)},{label:`Roads.geojson`,invoke:c(`Roads clicked`)},{label:`Utilities.sdf`,enabled:!1}]};return(0,p.jsx)(`div`,{style:{width:260},children:(0,p.jsx)(e,{items:[{label:`Open`,iconClass:`folder-horizontal-open`,invoke:c(`Open clicked`)},{label:`Save`,iconClass:`file-save`,invoke:c(`Save clicked`)},t,{isSeparator:!0},{label:`Disabled item`,enabled:!1}],onInvoked:c(`Menu item invoked`)})})},name:`MenuComponent`},V={render:()=>{let{TabSet:e}=i(),[t,n]=l.useState(`tab-1`),r=c(`Tab changed`);return(0,p.jsx)(e,{id:`demo-tabs`,activeTabId:t,onTabChanged:e=>{r(e),n(e)},tabs:[{id:`tab-1`,title:`Overview`,content:(0,p.jsx)(`p`,{children:`This is the overview tab content.`})},{id:`tab-2`,title:`Details`,content:(0,p.jsx)(`p`,{children:`This is the details tab content.`})},{id:`tab-3`,title:`Settings`,content:(0,p.jsx)(`p`,{children:`This is the settings tab content.`})}]})},name:`TabSet`},H={render:()=>{let{Popover:e,Button:t,Card:n}=i(),r=(0,u.select)(`Position`,[`left`,`bottom`,`right`,`top`],`right`);return(0,p.jsxs)(e,{usePortal:!1,minimal:(0,u.boolean)(`Minimal`,!1),position:r,children:[(0,p.jsx)(t,{variant:`primary`,children:`Toggle Popover`}),(0,p.jsx)(n,{children:(0,p.jsx)(`p`,{style:{margin:0},children:`This is popover content.`})})]})},name:`Popover`},U={render:()=>{let{Drawer:e,Button:t}=i(),[n,a]=l.useState(!1),o=(0,u.select)(`Position`,[`left`,`bottom`,`right`,`top`],`right`),s=(0,u.select)(`Icon name`,d(),`cog`);return r(s)&&(s=void 0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t,{variant:`primary`,onClick:()=>a(!0),children:`Open Drawer`}),(0,p.jsxs)(e,{isOpen:n,position:o,title:`Drawer Title`,icon:s,onClose:()=>a(!1),children:[(0,p.jsx)(`p`,{children:`This is the drawer content.`}),(0,p.jsx)(t,{variant:`primary`,onClick:()=>a(!1),children:`Close Drawer`})]})]})},name:`Drawer`},W={render:()=>{let{HtmlTable:e}=i();return(0,p.jsxs)(e,{condensed:(0,u.boolean)(`Condensed`,!1),bordered:(0,u.boolean)(`Bordered`,!1),children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{children:`Name`}),(0,p.jsx)(`th`,{children:`Status`}),(0,p.jsx)(`th`,{children:`Type`})]})}),(0,p.jsxs)(`tbody`,{children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:`Main Roads`}),(0,p.jsx)(`td`,{children:`Visible`}),(0,p.jsx)(`td`,{children:`Vector`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:`Parcels`}),(0,p.jsx)(`td`,{children:`Hidden`}),(0,p.jsx)(`td`,{children:`Vector`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{children:`Aerial`}),(0,p.jsx)(`td`,{children:`Visible`}),(0,p.jsx)(`td`,{children:`Raster`})]})]})]})},name:`HtmlTable`},G={render:()=>{let{Button:e,DialogContainer:t,DialogShell:n,DialogHeader:r,DialogBody:a,DialogFooter:o,DialogFooterActions:s}=i();return(0,p.jsx)(t,{style:{position:`relative`,minHeight:280},children:(0,p.jsxs)(n,{style:{width:460,margin:`0 auto`},children:[(0,p.jsx)(r,{children:(0,p.jsx)(`h5`,{style:{margin:0},children:`Composed Dialog Layout`})}),(0,p.jsx)(a,{children:(0,p.jsx)(`p`,{children:`This story demonstrates the low-level dialog composition primitives.`})}),(0,p.jsx)(o,{children:(0,p.jsxs)(s,{children:[(0,p.jsx)(e,{minimal:!0,onClick:c(`Cancel clicked`),children:`Cancel`}),(0,p.jsx)(e,{variant:`primary`,onClick:c(`Save clicked`),children:`Save`})]})})]})})},name:`Dialog composition`},K={render:()=>{let{FormGroup:e,InputGroup:t,NumericInput:n,Checkbox:r,Radio:a,Switch:o,Select:s,FileInput:d,EditableText:f,Slider:m}=i(),h=(0,u.boolean)(`Inline FormGroup Layout`,!1),[g,_]=l.useState(`Jane Doe`),[v,y]=l.useState(28),[b,x]=l.useState(!0),[S,C]=l.useState(!1),[w,T]=l.useState(`light`),[E,D]=l.useState(`Click to edit biography`),[O,k]=l.useState(75),[A,j]=l.useState(`basic`),M=e=>{c(`Name changed`)(e.target.value),_(e.target.value)},N=e=>{c(`Age changed`)(e),y(e)},P=e=>{c(`Subscribe changed`)(e.target.checked),x(e.target.checked)},F=e=>{c(`Plan changed`)(e.target.value),j(e.target.value)};return(0,p.jsxs)(`div`,{style:{maxWidth:480},children:[(0,p.jsx)(e,{label:`Name`,labelFor:`fg-name`,inline:h,children:(0,p.jsx)(t,{id:`fg-name`,value:g,onChange:M})}),(0,p.jsx)(e,{label:`Age`,inline:h,children:(0,p.jsx)(n,{min:0,max:120,value:v,onChange:N})}),(0,p.jsx)(e,{label:`Theme`,labelFor:`fg-theme`,inline:h,children:(0,p.jsx)(s,{id:`fg-theme`,value:w,onChange:e=>{c(`Theme changed`)(e),T(e)},items:[{value:`light`,label:`Light`},{value:`dark`,label:`Dark`},{value:`contrast`,label:`High Contrast`}]})}),(0,p.jsxs)(e,{label:`Plan`,inline:h,children:[(0,p.jsx)(a,{name:`plan`,value:`basic`,label:`Basic`,checked:A===`basic`,onChange:F}),(0,p.jsx)(a,{name:`plan`,value:`pro`,label:`Pro`,checked:A===`pro`,onChange:F})]}),(0,p.jsx)(e,{label:`Subscribe`,labelFor:`fg-subscribe`,inline:h,children:(0,p.jsx)(r,{id:`fg-subscribe`,checked:b,onChange:P,label:`Subscribe to newsletter`})}),(0,p.jsx)(e,{label:`Advanced mode`,inline:h,children:(0,p.jsx)(o,{checked:S,onChange:e=>{c(`Advanced mode changed`)(e.target.checked),C(e.target.checked)},label:`Enable advanced features`})}),(0,p.jsx)(e,{label:`Attachment`,inline:h,children:(0,p.jsx)(d,{text:`No file chosen`,buttonText:`Select file`,onInputChange:c(`Attachment changed`)})}),(0,p.jsx)(e,{label:`Biography`,inline:h,children:(0,p.jsx)(f,{value:E,onChange:e=>{c(`Bio changed`)(e),D(e)}})}),(0,p.jsx)(e,{label:`Quality`,inline:h,children:(0,p.jsx)(m,{min:0,max:100,stepSize:5,labelStepSize:20,value:O,onChange:e=>{c(`Quality changed`)(e),k(e)}})})]})},name:`FormGroup with common fields`};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Radio
    } = useElementContext();
    return <>
        <Radio label="Foo" name="setting" value="foo" onChange={action("Value changed")} />
        <Radio label="Bar" name="setting" value="bar" onChange={action("Value changed")} />
      </>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      Spinner
    } = useElementContext();
    const variant = select("Variant", ["primary", "warning", "success", "danger"], "primary");
    const size = select("Size Preset", ["small", "standard", "large"], "standard");
    return <Spinner variant={variant} sizePreset={size} />;
  },
  name: "Spinner"
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}};var q=`_Heading._Text._Button._ButtonVariants._Radio._Slider._Collapsible._Callout._Checkbox._Card._Icon._InputGroup._InputGroupWithRightElement._NonIdealState._NonIdealStateWithAction._NumericInput._Switch._Select._SelectWithPlaceholder._Spinner._ElementGroup._Toaster._Dialog._FileInput._EditableText._MenuComponent._TabSet._Popover._Drawer._HtmlTable._DialogComposition._FormGroupWithCommonFields`.split(`.`);export{_ as _Button,v as _ButtonVariants,S as _Callout,w as _Card,C as _Checkbox,x as _Collapsible,L as _Dialog,G as _DialogComposition,U as _Drawer,z as _EditableText,F as _ElementGroup,R as _FileInput,K as _FormGroupWithCommonFields,h as _Heading,W as _HtmlTable,T as _Icon,E as _InputGroup,D as _InputGroupWithRightElement,B as _MenuComponent,O as _NonIdealState,k as _NonIdealStateWithAction,A as _NumericInput,H as _Popover,y as _Radio,M as _Select,N as _SelectWithPlaceholder,b as _Slider,P as _Spinner,j as _Switch,V as _TabSet,g as _Text,I as _Toaster,q as __namedExportsOrder,m as default};