import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ColorPicker } from '../components/color-picker';

storiesOf("Common Components", module)
    .add("Color Picker", () => <ColorPicker onChange={action("color changed")} />)