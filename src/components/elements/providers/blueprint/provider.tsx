import React from "react";
import { IElementContext } from "../../element-context";
import { BpButton } from "./button";
import { BpCheckbox } from "./checkbox";
import { BpCard } from "./card";
import { BpIcon } from "./icon";
import { BpSlider } from "./slider";
import { BpCallout } from "./callout";
import { BpNumericInput } from "./numeric-input";
import { BpCollapsible } from "./collapsible";
import { BpRadio } from "./radio";
import { BpInputGroup } from "./input-group";
import { BpNonIdealState } from "./non-ideal-state";
import { BpSpinner } from "./spinner";
import { BpSwitch } from "./switch";
import { BpSelect } from "./select";
import { BpFileInput } from "./file-input";
import { BpFormGroup } from "./form-group";
import { BpEditableText } from "./editable-text";
import { BpMenuComponent } from "./menu";
import { BpTabSet } from "./tab-set";
import { BpPopover } from "./popover";
import { BpDrawer } from "./drawer";
import { BpHeading } from "./heading";
import { BpText } from "../text";

import "./bp-override.css";

const provider: IElementContext = {
    Text: BpText,
    Heading: BpHeading,
    Button: BpButton,
    Radio: BpRadio,
    Slider: BpSlider,
    Collapsible: BpCollapsible,
    Callout: BpCallout,
    Checkbox: BpCheckbox,
    Icon: BpIcon,
    Card: BpCard,
    NumericInput: BpNumericInput,
    InputGroup: BpInputGroup,
    NonIdealState: BpNonIdealState,
    Spinner: BpSpinner,
    Switch: BpSwitch,
    Select: BpSelect,
    FileInput: BpFileInput,
    FormGroup: BpFormGroup,
    EditableText: BpEditableText,
    MenuComponent: BpMenuComponent,
    TabSet: BpTabSet,
    Drawer: BpDrawer,
    Popover: BpPopover
};

export default provider;