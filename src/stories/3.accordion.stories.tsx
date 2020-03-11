import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../components/accordion";
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import "../styles/index.css";
import "ol/ol.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "react-splitter-layout/lib/index.css";
import "./styles/accordion-slate.css";

const PANELS: IAccordionPanelSpec[] = [
    {
        id: "PanelA",
        title: "Panel One",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height }}>Panel One Content ({dim.width}x{dim.height})</div>
        }
    },
    {
        id: "PanelB",
        title: "Panel Two",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height }}>Panel Two Content ({dim.width}x{dim.height})</div>
        }
    },
    {
        id: "PanelC",
        title: "Panel Three",
        contentRenderer: (dim: IAccordionPanelContentDimensions) => {
            return <div style={{ width: dim.width, height: dim.height }}>Panel Three Content ({dim.width}x{dim.height})</div>
        }
    }
];

storiesOf("Accordion (Slate)", module)
    .addDecorator(withKnobs)
    .add("Default", () => <Accordion style={{ width: 250, height: 500 }} onActivePanelChanged={action("activePanelChanged")} panels={PANELS} />)
    .add("Middle Panel Initially Visible", () => <Accordion style={{ width: 250, height: 500 }} onActivePanelChanged={action("activePanelChanged")} panels={PANELS} activePanelId="PanelB" />);