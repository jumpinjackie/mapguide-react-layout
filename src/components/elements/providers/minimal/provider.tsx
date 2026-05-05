// Minimal provider – Provider assembly
import type { IElementContext } from "../../element-context";
import { MnText } from "./text";
import { MnHeading } from "./heading";
import { MnButton } from "./button";
import { MnRadio } from "./radio";
import { MnSlider } from "./slider";
import { MnCollapsible } from "./collapsible";
import { MnCallout } from "./callout";
import { MnCheckbox } from "./checkbox";
import { MnIcon } from "./icon";
import { MnCard } from "./card";
import { MnNumericInput } from "./numeric-input";
import { MnInputGroup } from "./input-group";
import { MnNonIdealState } from "./non-ideal-state";
import { MnSpinner } from "./spinner";
import { MnSwitch } from "./switch";
import { MnSelect } from "./select";
import { MnFileInput } from "./file-input";
import { MnFormGroup } from "./form-group";
import { MnEditableText } from "./editable-text";
import { MnMenuComponent } from "./menu";
import { MnTabSet } from "./tab-set";
import { MnDrawer } from "./drawer";
import { MnPopover } from "./popover";
import { MnToaster } from "./toaster";
import {
   MnDialog,
   MnDialogContainer,
   MnDialogShell,
   MnDialogHeader,
   MnDialogBody,
   MnDialogFooter,
   MnDialogFooterActions,
} from "./dialog";
import { MnHtmlTable } from "./html-table";

import "./mrl-minimal.css";

const provider: IElementContext = {
   Text: MnText,
   Heading: MnHeading,
   Button: MnButton,
   Radio: MnRadio,
   Slider: MnSlider,
   Collapsible: MnCollapsible,
   Callout: MnCallout,
   Checkbox: MnCheckbox,
   Icon: MnIcon,
   Card: MnCard,
   NumericInput: MnNumericInput,
   InputGroup: MnInputGroup,
   NonIdealState: MnNonIdealState,
   Spinner: MnSpinner,
   Switch: MnSwitch,
   Select: MnSelect,
   FileInput: MnFileInput,
   FormGroup: MnFormGroup,
   EditableText: MnEditableText,
   MenuComponent: MnMenuComponent,
   TabSet: MnTabSet,
   Drawer: MnDrawer,
   Popover: MnPopover,
   Toaster: MnToaster,
   Dialog: MnDialog,
   DialogContainer: MnDialogContainer,
   DialogShell: MnDialogShell,
   DialogHeader: MnDialogHeader,
   DialogBody: MnDialogBody,
   DialogFooter: MnDialogFooter,
   DialogFooterActions: MnDialogFooterActions,
   HtmlTable: MnHtmlTable,
};

export default provider;
