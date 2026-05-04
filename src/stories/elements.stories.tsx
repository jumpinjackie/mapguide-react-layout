import React from "react";
import {
  ElementGroup,
  IToasterRef,
  TypedSelect,
  useElementContext,
} from "../components/elements/element-context";
import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { strIsNullOrEmpty } from "../utils/string";
import { getIconNames, SvgIconName } from "../components/icon-names";
import type { IItem } from "../components/toolbar";
import commonElementsDocs from "./docs/common-elements.md";

export default {
  title: "Common Elements",
  decorators: [withKnobs],
  parameters: {
    docs: {
      description: {
        component: commonElementsDocs,
      },
    },
  },
};

export const _Heading = {
  render: () => {
    const { Heading } = useElementContext();
    return (
      <>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </>
    );
  },
};

export const _Text = {
  render: () => {
    const { Text } = useElementContext();
    const component = select("Component", ["span", "p", "div"], "span");
    const content = text("Content", "This is some text content");
    return (
      <>
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
      </>
    );
  },
};

export const _Button = {
  render: () => {
    const { Button } = useElementContext();
    const label = text("Label", "Click me");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), undefined);
    const variant = select(
      "Variant",
      ["primary", "warning", "success", "danger"],
      "primary"
    );
    const disabled = boolean("Disabled", false);
    const loading = boolean("Loading", false);
    const minimal = boolean("Minimal", false);
    const active = boolean("Active", false);
    const title = text("title", "Click me to do stuff");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return (
      <>
        <Button
          variant={variant}
          icon={icon}
          title={title}
          loading={loading}
          disabled={disabled}
          minimal={minimal}
          active={active}
          onClick={action("clicked")}
        >
          {label}
        </Button>
      </>
    );
  },
  name: "Button",
};

export const _ButtonVariants = {
  render: () => {
    const { Button, Heading } = useElementContext();
    return (
      <>
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
      </>
    );
  },
  name: "Button Variants",
};

export const _Radio = {
  render: () => {
    const { Radio } = useElementContext();
    return (
      <>
        <Radio
          label="Foo"
          name="setting"
          value="foo"
          onChange={action("Value changed")}
        />
        <Radio
          label="Bar"
          name="setting"
          value="bar"
          onChange={action("Value changed")}
        />
      </>
    );
  },
};

export const _Slider = {
  render: () => {
    const { Slider } = useElementContext();
    const min = number("Min", 0);
    const max = number("Max", 100);
    const stepSize = number("Step size", 1);
    const labelStepSize = number("Label step size", 5);
    const [localValue, setLocalValue] = React.useState(10);
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof Slider>["onChange"] = (e) => {
      act(e);
      setLocalValue(e);
    };
    return (
      <Slider
        min={min}
        max={max}
        stepSize={stepSize}
        labelStepSize={labelStepSize}
        value={localValue}
        disabled={disabled}
        onChange={onChange}
      />
    );
  },
  name: "Slider",
};

export const _Collapsible = {
  render: () => {
    const { Button, Collapsible } = useElementContext();
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <Button onClick={(e) => setIsOpen(!isOpen)}>Click me to toggle</Button>
        <Collapsible isOpen={isOpen}>
          <p>Toggled content</p>
        </Collapsible>
      </>
    );
  },
  name: "Collapsible",
};

export const _Callout = {
  render: () => {
    const { Callout } = useElementContext();
    const variant = select(
      "Variant",
      ["primary", "warning", "success", "danger"],
      "primary"
    );
    return (
      <Callout variant={variant} title="Attention!">
        <p>This is a callout. Thank you for your attention.</p>
      </Callout>
    );
  },
  name: "Callout",
};

export const _Checkbox = {
  render: () => {
    const { Checkbox } = useElementContext();
    const [isChecked, setIsChecked] = React.useState(false);
    let label = text("Label", "My Checkbox");
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof Checkbox>["onChange"] = (e) => {
      act(e);
      setIsChecked(e.target.checked);
    };
    return (
      <Checkbox
        checked={isChecked}
        label={label}
        disabled={disabled}
        onChange={onChange}
      />
    );
  },
  name: "Checkbox",
};

export const _Card = {
  render: () => {
    const { Card, Heading } = useElementContext();
    return (
      <Card>
        <Heading level={3}>Card Title</Heading>
        <p>This is some card content</p>
      </Card>
    );
  },
  name: "Card",
};

export const _Icon = {
  render: () => {
    const { Icon } = useElementContext();
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}
      >
        {getIconNames().map((iconName) => (
          <div
            style={{
              width: 120,
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Icon icon={iconName} iconSize={30} />
            {iconName}
          </div>
        ))}
      </div>
    );
  },
  name: "Icon",
};

export const _InputGroup = {
  render: () => {
    const { InputGroup } = useElementContext();
    const round = boolean("Round", false);
    const placeholder = text("Placeholder", "Type some text here ...");
    const [localValue, setLocalValue] = React.useState("");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof InputGroup>["onChange"] = (
      e
    ) => {
      act(e);
      setLocalValue(e.target.value);
    };
    return (
      <InputGroup
        round={round}
        leftIcon={icon}
        value={localValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  },
  name: "InputGroup",
};

export const _InputGroupWithRightElement = {
  render: () => {
    const { InputGroup, Button } = useElementContext();
    const round = boolean("Round", false);
    const placeholder = text("Placeholder", "Type some text here ...");
    const [localValue, setLocalValue] = React.useState("");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof InputGroup>["onChange"] = (
      e
    ) => {
      act(e);
      setLocalValue(e.target.value);
    };
    return (
      <InputGroup
        round={round}
        leftIcon={icon}
        value={localValue}
        placeholder={placeholder}
        onChange={onChange}
        rightElement={
          <Button variant="primary" icon="edit" onClick={action("clicked")} />
        }
      />
    );
  },
  name: "InputGroup with right element",
};

export const _NonIdealState = {
  render: () => {
    const { NonIdealState } = useElementContext();
    const title = text("Title", "Title");
    const desc = text("Description", "Some description");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return <NonIdealState icon={icon} title={title} description={desc} />;
  },
  name: "NonIdealState",
};

export const _NonIdealStateWithAction = {
  render: () => {
    const { NonIdealState, Button } = useElementContext();
    const title = text("Title", "Title");
    const desc = text("Description", "Some description");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "error");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return (
      <NonIdealState
        icon={icon}
        title={title}
        description={desc}
        action={
          <Button variant="primary" onClick={action("clicked")}>
            My Action
          </Button>
        }
      />
    );
  },
  name: "NonIdealState with action",
};

export const _NumericInput = {
  render: () => {
    const { NumericInput } = useElementContext();
    const [localValue, setLocalValue] = React.useState(10);
    const min = number("Min", 0);
    const max = number("Max", 100);
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof NumericInput>["onChange"] = (
      e
    ) => {
      act(e);
      setLocalValue(e);
    };
    return (
      <NumericInput
        value={localValue}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
      />
    );
  },
  name: "NumericInput",
};

export const _Switch = {
  render: () => {
    const { Switch } = useElementContext();
    const [isChecked, setIsChecked] = React.useState(false);
    let label = text("Label", "My Switch");
    const disabled = boolean("Disabled", false);
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof Switch>["onChange"] = (e) => {
      act(e);
      setIsChecked(e.target.checked);
    };
    return (
      <Switch
        checked={isChecked}
        label={label}
        disabled={disabled}
        onChange={onChange}
      />
    );
  },
  name: "Switch",
};

export const _Select = {
  render: () => {
    const { Select } = useElementContext();
    const [localValue, setLocalValue] = React.useState<string | undefined>(
      "foo"
    );
    const act = action("Value changed");
    const fill = boolean("Fill", false);
    const onChange: React.ComponentProps<typeof Select>["onChange"] = (e) => {
      act(e);
      setLocalValue(e);
    };
    const items = [
      { value: "foo", label: "Foo" },
      { value: "bar", label: "Bar" },
      { value: "baz", label: "Baz" },
    ];
    return (
      <Select
        fill={fill}
        value={localValue}
        onChange={onChange}
        items={items}
      />
    );
  },
  name: "Select",
};

export const _SelectWithPlaceholder = {
  render: () => {
    const [localValue, setLocalValue] = React.useState<string | undefined>(
      undefined
    );
    const act = action("Value changed");
    const fill = boolean("Fill", false);
    const onChange: React.ComponentProps<
      typeof TypedSelect<string, true>
    >["onChange"] = (e) => {
      act(e);
      setLocalValue(e);
    };
    const items = [
      { value: "foo", label: "Foo" },
      { value: "bar", label: "Bar" },
      { value: "baz", label: "Baz" },
    ];
    return (
      <TypedSelect<string, true>
        fill={fill}
        placeholder="Choose one ..."
        value={localValue}
        onChange={onChange}
        items={items}
      />
    );
  },
  name: "Select with placeholder",
};

export const _Spinner = {
  render: () => {
    const { Spinner } = useElementContext();
    const variant = select(
      "Variant",
      ["primary", "warning", "success", "danger"],
      "primary"
    );
    const size = select(
      "Size Preset",
      ["small", "standard", "large"],
      "standard"
    );
    return <Spinner variant={variant} sizePreset={size} />;
  },
  name: "Spinner",
};

export const _ElementGroup = {
  render: () => {
    const { Button } = useElementContext();
    const vertical = boolean("Vertical Orientation", false);
    return (
      <>
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
      </>
    );
  },
  name: "Element Group",
};

export const _Toaster = {
  render: () => {
    const { Toaster, Button } = useElementContext();
    const toasterRef = React.useRef<IToasterRef>(null);
    const variant = select(
      "Variant",
      ["primary", "warning", "success", "danger"],
      "primary"
    );
    const message = text("Message", "This is a toast notification");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "info-sign");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    const onShow = () => {
      toasterRef.current?.show({ message, variant, icon });
    };
    return (
      <>
        <Button variant="primary" onClick={onShow}>
          Show Toast
        </Button>
        <Toaster usePortal={false} position="top" ref={toasterRef} />
      </>
    );
  },
  name: "Toaster",
};

export const _Dialog = {
  render: () => {
    const { Dialog, Button, DialogBody, DialogFooter, DialogFooterActions } = useElementContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const title = text("Title", "Dialog Title");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "info-sign");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return (
      <>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          title={title}
          icon={icon}
          usePortal={false}
          onClose={() => setIsOpen(false)}
        >
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
      </>
    );
  },
  name: "Dialog",
};

export const _FileInput = {
  render: () => {
    const { FileInput } = useElementContext();
    const fill = boolean("Fill", false);
    const fileText = text("Text", "Choose file...");
    const buttonText = text("Button text", "Browse");
    return (
      <FileInput
        fill={fill}
        text={fileText}
        buttonText={buttonText}
        onInputChange={action("Input changed")}
      />
    );
  },
  name: "FileInput",
};

export const _EditableText = {
  render: () => {
    const { EditableText } = useElementContext();
    const [localValue, setLocalValue] = React.useState("Click to edit me");
    const act = action("Value changed");
    const onChange: React.ComponentProps<typeof EditableText>["onChange"] = (
      value
    ) => {
      act(value);
      setLocalValue(value);
    };
    return <EditableText value={localValue} onChange={onChange} />;
  },
  name: "EditableText",
};

export const _MenuComponent = {
  render: () => {
    const { MenuComponent } = useElementContext();
    const items: IItem[] = [
      { label: "Open", iconClass: "sprite-icon-open", invoke: action("Open clicked") },
      { label: "Save", iconClass: "sprite-icon-save", invoke: action("Save clicked") },
      { isSeparator: true },
      { label: "Disabled item", enabled: false },
    ];
    return <MenuComponent items={items} onInvoked={action("Menu item invoked")} />;
  },
  name: "MenuComponent",
};

export const _TabSet = {
  render: () => {
    const { TabSet } = useElementContext();
    const [activeTabId, setActiveTabId] = React.useState<string | number>("tab-1");
    const act = action("Tab changed");
    const onTabChanged: React.ComponentProps<typeof TabSet>["onTabChanged"] = (
      tabId
    ) => {
      act(tabId);
      setActiveTabId(tabId);
    };
    return (
      <TabSet
        id="demo-tabs"
        activeTabId={activeTabId}
        onTabChanged={onTabChanged}
        tabs={[
          {
            id: "tab-1",
            title: "Overview",
            content: <p>This is the overview tab content.</p>,
          },
          {
            id: "tab-2",
            title: "Details",
            content: <p>This is the details tab content.</p>,
          },
          {
            id: "tab-3",
            title: "Settings",
            content: <p>This is the settings tab content.</p>,
          },
        ]}
      />
    );
  },
  name: "TabSet",
};

export const _Popover = {
  render: () => {
    const { Popover, Button, Card } = useElementContext();
    const position = select("Position", ["left", "bottom", "right", "top"], "right");
    const minimal = boolean("Minimal", false);
    return (
      <Popover usePortal={false} minimal={minimal} position={position}>
        <Button variant="primary">Toggle Popover</Button>
        <Card>
          <p style={{ margin: 0 }}>This is popover content.</p>
        </Card>
      </Popover>
    );
  },
  name: "Popover",
};

export const _Drawer = {
  render: () => {
    const { Drawer, Button } = useElementContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const position = select("Position", ["left", "bottom", "right", "top"], "right");
    let icon: SvgIconName | undefined = select("Icon name", getIconNames(), "cog");
    if (strIsNullOrEmpty(icon)) icon = undefined;
    return (
      <>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          isOpen={isOpen}
          position={position}
          title="Drawer Title"
          icon={icon}
          onClose={() => setIsOpen(false)}
        >
          <p>This is the drawer content.</p>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Close Drawer
          </Button>
        </Drawer>
      </>
    );
  },
  name: "Drawer",
};

export const _HtmlTable = {
  render: () => {
    const { HtmlTable } = useElementContext();
    const condensed = boolean("Condensed", false);
    const bordered = boolean("Bordered", false);
    return (
      <HtmlTable condensed={condensed} bordered={bordered}>
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
      </HtmlTable>
    );
  },
  name: "HtmlTable",
};

export const _DialogComposition = {
  render: () => {
    const {
      Button,
      DialogContainer,
      DialogShell,
      DialogHeader,
      DialogBody,
      DialogFooter,
      DialogFooterActions,
    } = useElementContext();
    return (
      <DialogContainer style={{ position: "relative", minHeight: 280 }}>
        <DialogShell style={{ width: 460, margin: "0 auto" }}>
          <DialogHeader>
            <h5 style={{ margin: 0 }}>Composed Dialog Layout</h5>
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
      </DialogContainer>
    );
  },
  name: "Dialog composition",
};

export const _FormGroupWithCommonFields = {
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
      Slider,
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

    const onNameChanged: React.ComponentProps<typeof InputGroup>["onChange"] = (
      e
    ) => {
      action("Name changed")(e.target.value);
      setNameValue(e.target.value);
    };
    const onAgeChanged: React.ComponentProps<typeof NumericInput>["onChange"] = (
      value
    ) => {
      action("Age changed")(value);
      setAgeValue(value);
    };
    const onSubscribedChanged: React.ComponentProps<typeof Checkbox>["onChange"] = (
      e
    ) => {
      action("Subscribe changed")(e.target.checked);
      setSubscribed(e.target.checked);
    };
    const onPlanChanged: React.ComponentProps<typeof Radio>["onChange"] = (e) => {
      action("Plan changed")(e.target.value);
      setPlan(e.target.value);
    };
    const onAdvancedModeChanged: React.ComponentProps<typeof Switch>["onChange"] = (
      e
    ) => {
      action("Advanced mode changed")(e.target.checked);
      setAdvancedMode(e.target.checked);
    };
    const onThemeChanged: React.ComponentProps<typeof Select>["onChange"] = (value) => {
      action("Theme changed")(value);
      setTheme(value);
    };
    const onBioChanged: React.ComponentProps<typeof EditableText>["onChange"] = (
      value
    ) => {
      action("Bio changed")(value);
      setBio(value);
    };
    const onQualityChanged: React.ComponentProps<typeof Slider>["onChange"] = (
      value
    ) => {
      action("Quality changed")(value);
      setQuality(value);
    };

    return (
      <div style={{ maxWidth: 480 }}>
        <FormGroup label="Name" labelFor="fg-name" inline={inline}>
          <InputGroup id="fg-name" value={nameValue} onChange={onNameChanged} />
        </FormGroup>

        <FormGroup label="Age" inline={inline}>
          <NumericInput min={0} max={120} value={ageValue} onChange={onAgeChanged} />
        </FormGroup>

        <FormGroup label="Theme" labelFor="fg-theme" inline={inline}>
          <Select
            id="fg-theme"
            value={theme}
            onChange={onThemeChanged}
            items={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "contrast", label: "High Contrast" },
            ]}
          />
        </FormGroup>

        <FormGroup label="Plan" inline={inline}>
          <Radio
            name="plan"
            value="basic"
            label="Basic"
            checked={plan === "basic"}
            onChange={onPlanChanged}
          />
          <Radio
            name="plan"
            value="pro"
            label="Pro"
            checked={plan === "pro"}
            onChange={onPlanChanged}
          />
        </FormGroup>

        <FormGroup label="Subscribe" labelFor="fg-subscribe" inline={inline}>
          <Checkbox
            id="fg-subscribe"
            checked={subscribed}
            onChange={onSubscribedChanged}
            label="Subscribe to newsletter"
          />
        </FormGroup>

        <FormGroup label="Advanced mode" inline={inline}>
          <Switch
            checked={advancedMode}
            onChange={onAdvancedModeChanged}
            label="Enable advanced features"
          />
        </FormGroup>

        <FormGroup label="Attachment" inline={inline}>
          <FileInput
            text="No file chosen"
            buttonText="Select file"
            onInputChange={action("Attachment changed")}
          />
        </FormGroup>

        <FormGroup label="Biography" inline={inline}>
          <EditableText value={bio} onChange={onBioChanged} />
        </FormGroup>

        <FormGroup label="Quality" inline={inline}>
          <Slider
            min={0}
            max={100}
            stepSize={5}
            labelStepSize={20}
            value={quality}
            onChange={onQualityChanged}
          />
        </FormGroup>
      </div>
    );
  },
  name: "FormGroup with common fields",
};
