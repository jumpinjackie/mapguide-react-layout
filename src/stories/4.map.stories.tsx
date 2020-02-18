import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { Viewer } from '../components/viewer';
import { ActiveMapTool } from '../api/common';

storiesOf("New Map Viewer Components", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
        {storyFn()}
    </div>)
    .add("New Map Viewer", () => <Viewer 
        tool={ActiveMapTool.None}
        indicatorColor="#0000ff"
        indicatorPosition="top" />)