import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import LegendContainer from '../containers/legend';

storiesOf("Legend", module)
    .addDecorator(withKnobs)
    .add("Default", () => {
        return <FakeApp>
            <LegendContainer />
        </FakeApp>;
    });/*
    .add("With inline base layer switcher", () => {
        return <FakeApp>
            <LegendContainer inlineBaseLayerSwitcher={true} />
        </FakeApp>;
    });*/