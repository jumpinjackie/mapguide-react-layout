import React from "react";
import { ElementGroup, TypedSelect, useElementContext } from "../components/elements/element-context";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { strIsNullOrEmpty } from "../utils/string";
import { getIconNames } from "../components/icon-names";

export default {
    title: "Common Elements",
    decorators: [withKnobs],
};

export const _Button = {
    render: () => {
        const { Button } = useElementContext();
        const label = text("Label", "Click me");
        let icon: string | undefined = select("Icon name", getIconNames(), "");
        const variant = select("Variant", [
            "primary",
            "warning",
            "success",
            "danger"
        ], "primary");
        const disabled = boolean("Disabled", false);
        const loading = boolean("Loading", false);
        const minimal = boolean("Minimal", false);
        const active = boolean("Active", false);
        const title = text("title", "Click me to do stuff");
        if (strIsNullOrEmpty(icon))
            icon = undefined;
        return <>
            <Button variant={variant}
                icon={icon}
                title={title}
                loading={loading}
                disabled={disabled}
                minimal={minimal}
                active={active}
                onClick={action("clicked")}>{label}</Button>
        </>
    },
    name: "Button"
};

export const _ButtonVariants = {
    render: () => {
        const { Button } = useElementContext();
        return <>
            <h3>Standard Variants</h3>
            <div>
                <Button variant="primary">Primary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="success">Success</Button>
            </div>
            <h3>With Icons</h3>
            <div>
                <Button icon="chevron-up" variant="primary">Primary</Button>
                <Button icon="chevron-down" variant="danger">Danger</Button>
                <Button icon="cog" variant="warning">Warning</Button>
                <Button icon="info-sign" variant="success">Success</Button>
            </div>
        </>
    },
    name: "Button Variants"
};

export const _Radio = {
    render: () => {
        const { Radio } = useElementContext();
        return <>
            <Radio label="Foo" name="setting" value="foo" onChange={action('Value changed')} />
            <Radio label="Bar" name="setting" value="bar" onChange={action('Value changed')} />
        </>
    }
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
        const onChange: React.ComponentProps<typeof Slider>["onChange"] = e => {
            act(e);
            setLocalValue(e);
        };
        return <Slider min={min} max={max} stepSize={stepSize} labelStepSize={labelStepSize} value={localValue} disabled={disabled} onChange={onChange} />
    },
    name: "Slider"
};

export const _Collapsible = {
    render: () => {
        const { Button, Collapsible } = useElementContext();
        const [isOpen, setIsOpen] = React.useState(false);
        return <>
            <Button onClick={e => setIsOpen(!isOpen)}>Click me to toggle</Button>
            <Collapsible isOpen={isOpen}>
                <p>Toggled content</p>
            </Collapsible>
        </>
    },
    name: "Collapsible"
};

export const _Callout = {
    render: () => {
        const { Callout } = useElementContext();
        const variant = select("Variant", [
            "primary",
            "warning",
            "success",
            "danger"
        ], "primary");
        return <Callout variant={variant} title="Attention!">
            <p>This is a callout. Thank you for your attention.</p>
        </Callout>
    },
    name: "Callout"
};

export const _Checkbox = {
    render: () => {
        const { Checkbox } = useElementContext();
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
};

export const _Card = {
    render: () => {
        const { Card } = useElementContext();
        return <Card>
            <h3>Card Title</h3>
            <p>This is some card content</p>
        </Card>
    },
    name: "Card"
};

export const _Icon = {
    render: () => {
        const { Icon } = useElementContext();
        return <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            {getIconNames().map(iconName => <div style={{ width: 120, display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <Icon icon={iconName} iconSize={30} />
                {iconName}
            </div>)}
        </div>
    },
    name: "Icon"
};

export const _InputGroup = {
    render: () => {
        const { InputGroup } = useElementContext();
        const round = boolean("Round", false);
        const placeholder = text("Placeholder", "Type some text here ...");
        const [localValue, setLocalValue] = React.useState("");
        let icon: string | undefined = select("Icon name", getIconNames(), "error");
        if (strIsNullOrEmpty(icon))
            icon = undefined;
        const act = action("Value changed");
        const onChange: React.ComponentProps<typeof InputGroup>["onChange"] = e => {
            act(e);
            setLocalValue(e.target.value);
        };
        return <InputGroup round={round}
            leftIcon={icon}
            value={localValue}
            placeholder={placeholder}
            onChange={onChange} />;
    },
    name: "InputGroup"
};

export const _InputGroupWithRightElement = {
    render: () => {
        const { InputGroup, Button } = useElementContext();
        const round = boolean("Round", false);
        const placeholder = text("Placeholder", "Type some text here ...");
        const [localValue, setLocalValue] = React.useState("");
        let icon: string | undefined = select("Icon name", getIconNames(), "error");
        if (strIsNullOrEmpty(icon))
            icon = undefined;
        const act = action("Value changed");
        const onChange: React.ComponentProps<typeof InputGroup>["onChange"] = e => {
            act(e);
            setLocalValue(e.target.value);
        };
        return <InputGroup round={round}
            leftIcon={icon}
            value={localValue}
            placeholder={placeholder}
            onChange={onChange}
            rightElement={<Button variant="primary" icon="edit" onClick={action("clicked")} />} />;
    },
    name: "InputGroup with right element"
};

export const _NonIdealState = {
    render: () => {
        const { NonIdealState } = useElementContext();
        const title = text("Title", "Title");
        const desc = text("Description", "Some description");
        let icon: string | undefined = select("Icon name", getIconNames(), "error");
        if (strIsNullOrEmpty(icon))
            icon = undefined;
        return <NonIdealState icon={icon} title={title} description={desc} />;
    },
    name: "NonIdealState"
};


export const _NonIdealStateWithAction = {
    render: () => {
        const { NonIdealState, Button } = useElementContext();
        const title = text("Title", "Title");
        const desc = text("Description", "Some description");
        let icon: string | undefined = select("Icon name", getIconNames(), "error");
        if (strIsNullOrEmpty(icon))
            icon = undefined;
        return <NonIdealState icon={icon} title={title} description={desc} action={<Button variant="primary" onClick={action("clicked")}>My Action</Button>} />;
    },
    name: "NonIdealState with action"
};

export const _NumericInput = {
    render: () => {
        const { NumericInput } = useElementContext();
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
};

export const _Switch = {
    render: () => {
        const { Switch } = useElementContext();
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
};

export const _Select = {
    render: () => {
        const { Select } = useElementContext();
        const [localValue, setLocalValue] = React.useState<string | undefined>("foo");
        const act = action("Value changed");
        const fill = boolean("Fill", false);
        const onChange: React.ComponentProps<typeof Select>["onChange"] = e => {
            act(e);
            setLocalValue(e);
        };
        const items = [
            { value: "foo", label: "Foo" },
            { value: "bar", label: "Bar" },
            { value: "baz", label: "Baz" }
        ]
        return <Select fill={fill} value={localValue} onChange={onChange} items={items} />
    },
    name: "Select"
}

export const _SelectWithPlaceholder = {
    render: () => {
        const [localValue, setLocalValue] = React.useState<string | undefined>(undefined);
        const act = action("Value changed");
        const fill = boolean("Fill", false);
        const onChange: React.ComponentProps<typeof TypedSelect<string, true>>["onChange"] = e => {
            act(e);
            setLocalValue(e);
        };
        const items = [
            { value: "foo", label: "Foo" },
            { value: "bar", label: "Bar" },
            { value: "baz", label: "Baz" }
        ]
        return <TypedSelect<string, true> fill={fill} placeholder="Choose one ..." value={localValue} onChange={onChange} items={items} />
    },
    name: "Select with placeholder"
}

export const _Spinner = {
    render: () => {
        const { Spinner } = useElementContext();
        const variant = select("Variant", [
            "primary",
            "warning",
            "success",
            "danger"
        ], "primary");
        const size = select("Size Preset", [
            "small",
            "standard",
            "large"
        ], "standard");
        return <Spinner variant={variant} sizePreset={size} />;
    },
    name: "Spinner"
}

export const _ElementGroup = {
    render: () => {
        const { Button } = useElementContext();
        const vertical = boolean("Vertical Orientation", false);
        return <>
            <ElementGroup vertical={vertical}>
                <Button variant="primary" onClick={action("clicked")}>Primary</Button>
                <Button variant="danger" onClick={action("clicked")}>Danger</Button>
                <Button variant="warning" onClick={action("clicked")}>Warning</Button>
                <Button variant="success" onClick={action("clicked")}>Success</Button>
            </ElementGroup>
        </>
    },
    name: "Element Group"
};