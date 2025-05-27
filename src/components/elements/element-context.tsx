import * as React from 'react';
import BpProvider from './providers/blueprint/provider';

export type ElementVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'link';

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

export type RadioProps = {
    name?: string;
    label?: string;
    value: string | number;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

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

export type CollapsibleProps = {
    isOpen: boolean;
};

export type CalloutProps = {
    variant?: ElementVariant;
    title?: string;
    icon?: string;
};

export type CheckboxProps = {
    checked?: boolean;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

export type IconProps = {
    icon?: string;
    style?: React.CSSProperties;
    iconSize?: number;
};

export type CardProps = {
    style?: React.CSSProperties;
};

export type NumericInputProps = {
    style?: React.CSSProperties;
    min?: number;
    max?: number;
    value?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
};

export type MenuProps = {};

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

export type NonIdealStateProps = {
    icon?: string | JSX.Element;
    title?: string | JSX.Element;
    description?: string;
    action?: JSX.Element;
}

export type SpinnerSize = "small" | "standard" | "large";

export type SpinnerProps = {
    variant?: ElementVariant;
    sizePreset?: SpinnerSize;
}

export type SwitchProps = {
    style?: React.CSSProperties;
    disabled?: boolean;
    checked?: boolean;
    label?: string;
    labelElement?: JSX.Element;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
 * Defines a toolkit/design-system agnostic context for requesting UI atoms
 * 
 * The mounted provider determines the underlying toolkit/design-system backing the
 * requested elements.
 * 
 * @since 0.15
 */
export interface IElementContext {
    Button: React.ComponentType<ButtonProps>;
    Radio: React.ComponentType<RadioProps>;
    Slider: React.ComponentType<SliderProps>;
    Collapsible: React.ComponentType<CollapsibleProps>;
    Callout: React.ComponentType<CalloutProps>;
    Checkbox: React.ComponentType<CheckboxProps>;
    Icon: React.ComponentType<IconProps>;
    Card: React.ComponentType<CardProps>;
    NumericInput: React.ComponentType<NumericInputProps>;
    InputGroup: React.ComponentType<InputGroupProps>;
    NonIdealState: React.ComponentType<NonIdealStateProps>;
    Spinner: React.ComponentType<SpinnerProps>;
    Switch: React.ComponentType<SwitchProps>;
    Select: React.ComponentType<SelectProps>;
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

export type ElementGroupProps = {
    vertical?: boolean;
};

/**
 * A inline flex row wrapper that can form the basis of button groups or toolbars
 * 
 * @param param0 
 * @returns 
 * @since 0.15
 */
export const ElementGroup: React.FC<ElementGroupProps> = ({ vertical, children }) => {
    return <div className={`mrl-element-group ${vertical === true ? 'mrl-element-group-vertical' : ''}`}>
        {children}
    </div>
}