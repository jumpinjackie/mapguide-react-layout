/**
 * externs.d.ts
 *
 * This file contains type definitions for external libraries where:
 *
 *  a. No such typings exist
 *  b. The typings are for a version of a library that is out of date
 *  c. The typings are poor quality or unusable
 */

// Stamped by webpack
declare const __DEV__: boolean;
declare const __VERSION__: string;
declare const __COMMITHASH__: string;
declare const __BRANCH__: string;

// To allow file imports (that webpack will transform)
declare module "*.png";
declare module "*.cur";
declare module "*.gif";

declare module "papaparse";

declare module "expr-eval" {
    export class Parser {
        constructor();
        parse(expr: string): Expression;
        static evaluate<T>(expr: string, arg: any): T;
    }

    export interface Expression {
        evaluate<T>(args: any): T;
    }
}

declare module "react-splitter-layout" {
    import * as React from "react";

    export interface ISplitterLayoutProps {
        customClassName?: string;
        vertical?: boolean;
        primaryIndex?: number;
        primaryMinSize?: number;
        secondaryInitialSize?: number;
        onSecondaryPaneSizeChange?: (size: number) => void;
        onDragStart?: Function;
        onDragEnd?: Function;
    }
    export default class SplitterLayout extends React.Component<ISplitterLayoutProps, any> {

    }
}

declare module "calcite-react/CopyToClipboard" {
    import * as React from "react";
    export type CopyToClipboardProps = {
        copyValue?: string;
        tooltip?: string;
        successTooltip?: string;
        appendToBody?: boolean;
        copyIcon?: React.ReactNode;
        copySuccessIcon?: React.ReactNode;
        children?: React.ReactNode;
    }
    export default class CopyToClipboard extends React.Component<CopyToClipboardProps> {
            
    }
}
declare module "calcite-react/Button" {
    import * as React from "react";
    export type ButtonProps = {
        children?: React.ReactNode;
        type?: "button" | "reset" | "submit";
        inline?: boolean;
        transparent?: boolean;
        clear?: boolean;
        clearGray?: boolean;
        clearWhite?: boolean;
        white?: boolean;
        small?: boolean;
        large?: boolean;
        extraLarge?: boolean;
        fullWidth?: boolean;
        half?: boolean;
        red?: boolean;
        green?: boolean;
        disabled?: boolean;
        href?: string;
        icon?: React.ReactNode;
        iconButton?: boolean;
        iconPosition?: "after" | "before";
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }
    export default class Button extends React.Component<ButtonProps> {

    }
}
declare module "calcite-react/TextField" {
    import * as React from "react";
    export interface TextFieldProps {
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        onBlur?: React.FocusEventHandler<HTMLInputElement>;
        rows?: number;
        placeholder?: string;
        readOnly?: boolean;
        type?: "color" | "email" | "file" | "image" | "number" | "password" | "tel" | "text" | "url" | "textarea";
        value?: React.ReactNode;
        error?: boolean;
        success?: boolean;
        search?: boolean;
        fullWidth?: boolean;
        minimal?: boolean;
        horizontal?: boolean;
        id?: string;
        name?: string;
    }
    const TextField: React.StatelessComponent<TextFieldProps>;
    export default TextField;
}
declare module "calcite-react/Checkbox" {
    import * as React from "react";
    export type CheckboxProps = {
        disabled?: boolean;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        children?: React.ReactNode;
        value?: string;
        name?: string;
        checked?: boolean;
        labelStyle?: React.CSSProperties;
    };
    export default class Checkbox extends React.Component<CheckboxProps> { }
}
declare module "calcite-react/CalciteThemeProvider" {
    import * as React from "react";
    export type CalciteThemeProviderProps = {
        children?: React.ReactNode;
        theme?: any;
    }
    const CalciteThemeProvider: React.StatelessComponent<CalciteThemeProviderProps>;
    export default CalciteThemeProvider;
}
declare module "calcite-react/Loader" {
    import * as React from "react";
    export type LoaderProps = {
        text?: string;
        sizeRatio?: number;
        color?: string;
    }
    const Loader: React.StatelessComponent<LoaderProps>;
    export default Loader;
}
declare module "calcite-react/Accordion" {
    import * as React from "react";
    export type AccordionProps = {
        activeSectionIndexes?: number[];
        iconPosition?: "start" | "end";
        onAccordionChange?: (evt: any, index: number) => void;
    };
    export default class Accordion extends React.Component<AccordionProps> {}
    export type AccordionTitleProps = {};
    export const AccordionTitle: React.StatelessComponent<AccordionTitleProps>;
    export type AccordionSectionProps = {};
    export const AccordionSection: React.StatelessComponent<AccordionSectionProps>;
    export type AccordionContentProps = {};
    export const AccordionContent: React.StatelessComponent<AccordionContentProps>;
}

declare module "calcite-react/Card" {
    import * as React from "react";
    export type CardProps = {
        bar?: string;
        shaped?: boolean;
        wide?: boolean;
    };
    const Card: React.StatelessComponent<CardProps>;
    export default Card;
    export type CardTitleProps = {

    };
    export const CardTitle: React.StatelessComponent<CardTitleProps>;
    export type CardContentProps = {

    };
    export const CardContent: React.StatelessComponent<CardContentProps>;
    export type CardImageProps = {
        src?: string;
        caption?: string;
        alt?: string;
    };
    export const CardImage: React.StatelessComponent<CardImageProps>;
}

// Calcite icons we're using
declare module "calcite-ui-icons-react/ChevronDownIcon";
declare module "calcite-ui-icons-react/ChevronUpIcon";

declare module "ismobilejs";

declare module "proj4";

declare module "history/createBrowserHistory" {
    function createHistory(): any;
    export = createHistory;
}

// Monkey patching Array.filter to support type narrowing
// https://github.com/Microsoft/TypeScript/issues/7657
interface Array<T> {
    filter<U extends T>(pred: (a: T) => a is U): U[];
}

// Types for various development options.

// A hack for the Redux DevTools Chrome extension.
interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => void;
}