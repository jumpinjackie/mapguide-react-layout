import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ColorPicker } from '../components/color-picker';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { VectorStyleEditor } from '../components/vector-style-editor';

storiesOf("Common Components", module)
    .addDecorator(withKnobs)
    .add("Color Picker", () => {
        const act = action("color changed");
        const [color, setColor] = React.useState();
        const onSetColor = (val: string) => {
            act(val);
            setColor(val);
        };
        return <ColorPicker locale="en" value={color} onChange={onSetColor} />;
    })
    .add("Vector Style Editor", () => {
        return <VectorStyleEditor onChange={action("style changed")}
            locale="en"
            enablePoint={boolean("Enable Point", true)}
            enableLine={boolean("Enable Line", true)}
            enablePolygon={boolean("Enable Polygon", true)} />;
    });