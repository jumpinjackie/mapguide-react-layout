import * as React from 'react';
import BpProvider from './providers/blueprint/provider';
import type { IItem } from '../toolbar';

/**
 * @since 0.15
 */
export type ElementVariant = 'primary' | 'danger' | 'success' | 'warning';

/**
 * @since 0.15
 */
export type ButtonProps = {
    type?: "submit" | "reset" | "button";
    icon?: string;
    variant?: ElementVariant;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    loading?: boolean;
    title?: string;
    minimal?: boolean;
    active?: boolean;
    style?: React.CSSProperties;
    className?: string;
};

/**
 * @since 0.15
 */
export type RadioProps = {
    name?: string;
    label?: string;
    value: string | number;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * @since 0.15
 */
export type SliderProps = {
    min?: number;
    max?: number;
    stepSize?: number;
    labelStepSize?: number;
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    labelValues?: number[];
};

/**
 * @since 0.15
 */
export type CollapsibleProps = {
    isOpen: boolean;
};

/**
 * @since 0.15
 */
export type CalloutProps = {
    variant?: ElementVariant;
    title?: string;
    icon?: string;
};

/**
 * @since 0.15
 */
export type CheckboxProps = {
    checked?: boolean;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

/**
 * @since 0.15
 */
export type IconProps = {
    icon?: string;
    style?: React.CSSProperties;
    iconSize?: number;
};

/**
 * @since 0.15
 */
export type CardProps = {
    style?: React.CSSProperties;
};

/**
 * @since 0.15
 */
export type NumericInputProps = {
    style?: React.CSSProperties;
    min?: number;
    max?: number;
    value?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
};

/**
 * @since 0.15
 */
export type MenuProps = {};

/**
 * @since 0.15
 */
export type InputGroupProps = {
    style?: React.CSSProperties;
    round?: boolean;
    autoFocus?: boolean;
    leftIcon?: string;
    placeholder?: string;
    value?: string;
    readOnly?: boolean;
    rightElement?: JSX.Element;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * @since 0.15
 */
export type NonIdealStateProps = {
    icon?: string | JSX.Element;
    title?: string | JSX.Element;
    description?: string;
    action?: JSX.Element;
}

/**
 * @since 0.15
 */
export type SpinnerSize = "small" | "standard" | "large";

/**
 * @since 0.15
 */
export type SpinnerProps = {
    variant?: ElementVariant;
    sizePreset?: SpinnerSize;
}

/**
 * @since 0.15
 */
export type SwitchProps = {
    style?: React.CSSProperties;
    disabled?: boolean;
    checked?: boolean;
    label?: string;
    labelElement?: JSX.Element;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @since 0.15
 */
export type SelectProps<TValue = string, TAllowPlaceholder extends true | false = true> = {
    id?: string;
    name?: string;
    fill?: boolean;
    style?: React.CSSProperties;
    placeholder?: TAllowPlaceholder extends true ? string : never;
    value?: TAllowPlaceholder extends true ? TValue | undefined : TValue;
    extraClassNames?: string;
    keyFunc?: (item: { value: TValue, label: string }) => React.Key;
    onChange?: (value: TAllowPlaceholder extends true ? TValue | undefined : TValue) => void;
    items: { value: TValue, label: string }[]
}

/**
 * @since 0.15
 */
export type FileInputProps = {
    fill?: boolean;
    text?: string;
    buttonText?: string;
    onInputChange?: React.FormEventHandler<HTMLInputElement>;
}

/**
 * @since 0.15
 */
export type FormGroupProps = {
    label?: React.ReactNode;
    inline?: boolean;
}

/**
 * @since 0.15
 */
export type EditableTextProps = {
    value?: string;
    onChange?: (value: string) => void;
}

/**
 * @since 0.15
 */
export type MenuComponentProps = {
    items: IItem[];
    onInvoked?: () => void;
}

/**
 * @since 0.15
 */
export interface TabSetProps {
    id?: string;
    activeTabId?: string | number;
    className?: string;
    onTabChanged?: (tabId: string | number) => void;
    tabs: {
        id: string | number,
        title: React.ReactNode,
        content?: JSX.Element
    }[];
}

/**
 * @since 0.15
 */
export type DrawerProps = {
    icon?: string;
    onClose?: (event: React.SyntheticEvent<HTMLElement>) => void;
    title?: string;
    position?: Positioning;
    isOpen?: boolean;
}

export type Positioning = "left" | "bottom" | "right" | "top";

/**
 * @since 0.15
 */
export type PopoverProps = {
    usePortal?: boolean;
    position: Positioning,
    minimal?: boolean;
}

/**
 * @since 0.15
 */
export type HeadingProps = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    style?: React.CSSProperties;
    className?: string;
};

/**
 * @since 0.15
 */
export type TextProps = {
    component?: "span" | "p" | "div";
    style?: React.CSSProperties;
    className?: string;
}

/**
 * Defines a toolkit/design-system agnostic context for requesting UI atoms
 * 
 * The mounted provider determines the underlying toolkit/design-system backing the
 * requested elements.
 * 
 * @since 0.15
 */
export interface IElementContext {
    Text: React.ComponentType<React.PropsWithChildren<TextProps>>;
    Heading: React.ComponentType<React.PropsWithChildren<HeadingProps>>;
    Button: React.ComponentType<React.PropsWithChildren<ButtonProps>>;
    Radio: React.ComponentType<RadioProps>;
    Slider: React.ComponentType<SliderProps>;
    Collapsible: React.ComponentType<React.PropsWithChildren<CollapsibleProps>>;
    Callout: React.ComponentType<React.PropsWithChildren<CalloutProps>>;
    Checkbox: React.ComponentType<CheckboxProps>;
    Icon: React.ComponentType<IconProps>;
    Card: React.ComponentType<React.PropsWithChildren<CardProps>>;
    NumericInput: React.ComponentType<NumericInputProps>;
    InputGroup: React.ComponentType<InputGroupProps>;
    NonIdealState: React.ComponentType<NonIdealStateProps>;
    Spinner: React.ComponentType<SpinnerProps>;
    Switch: React.ComponentType<SwitchProps>;
    Select: React.ComponentType<SelectProps>;
    FileInput: React.ComponentType<FileInputProps>;
    FormGroup: React.ComponentType<React.PropsWithChildren<FormGroupProps>>;
    EditableText: React.ComponentType<EditableTextProps>;
    MenuComponent: React.ComponentType<MenuComponentProps>;
    TabSet: React.ComponentType<TabSetProps>;
    Drawer: React.ComponentType<React.PropsWithChildren<DrawerProps>>;
    Popover: React.ComponentType<React.PropsWithChildren<PopoverProps>>;
}

const ElementContext = React.createContext<IElementContext>(BpProvider);

/**
 * Accesses the UI element context
 * 
 * @returns 
 * @since 0.15
 */
export const useElementContext = () => {
    const context = React.useContext(ElementContext);
    return context;
};

/**
 * The UI element provider component. To override the default UI element set, mount
 * this component near the top with a custom UI element provider
 * 
 * @since 0.15
 */
export const ElementProvider = ElementContext.Provider;

/**
 * Provides a type-safe wrapper over the abstract Select UI element
 * 
 * @param props 
 * @returns 
 * @since 0.15
 */
export function TypedSelect<TValue, TAllowPlaceholder extends true | false>(props: SelectProps<TValue, TAllowPlaceholder>) {
    const { id, name, value, onChange, items, fill, placeholder, keyFunc, style } = props;
    const { Select } = useElementContext();
    return <Select id={id}
        name={name}
        value={value as any}
        onChange={onChange as any}
        items={items as any}
        fill={fill}
        style={style}
        placeholder={placeholder}
        keyFunc={keyFunc as any} />
}

/**
 * @since 0.15
 */
export type ElementGroupProps = {
    style?: React.CSSProperties;
    vertical?: boolean;
};

/**
 * A inline flex row wrapper that can form the basis of button groups or toolbars
 * 
 * @param param0 
 * @returns 
 * @since 0.15
 */
export const ElementGroup: React.FC<React.PropsWithChildren<ElementGroupProps>> = ({ style, vertical, children }) => {
    return <div style={style} className={`mrl-element-group ${vertical === true ? 'mrl-element-group-vertical' : 'mrl-element-group-horizontal'}`}>
        {children}
    </div>
}