import * as React from "react";
import { Collapse } from "@blueprintjs/core";
import Measure = require("react-measure");

export interface IAccordionPanelContentDimensions {
    width: number;
    height: number;
}

export interface IAccordionPanelSpec {
    id: string;
    title: string;
    contentRenderer: (dim: IAccordionPanelContentDimensions) => JSX.Element;
}

export interface IAccordionProps {
    style: React.CSSProperties;
    panels: IAccordionPanelSpec[];
}

const PANEL_HEADER_HEIGHT = 24;

export class Accordion extends React.Component<IAccordionProps, any> {
    private fnTogglePanel: GenericEventHandler;
    constructor(props: IAccordionProps) {
        super(props);
        this.fnTogglePanel = this.onTogglePanel.bind(this);
        this.state = {
            openPanel: props.panels[props.panels.length - 1].id
        };
    }
    private onTogglePanel(e: GenericEvent) {
        const id = e.currentTarget.attributes["data-accordion-panel-id"].value;
        if (this.state.openPanel != id) {
            this.setState({ openPanel: id });
        } else {
            this.setState({ openPanel: null });
        }
    }
    render(): JSX.Element {
        const { openPanel } = this.state;
        const { panels, style } = this.props;
        return <Measure>
            {(dim: any) => {
                return <div style={style} className="component-accordion">
                {panels.map(p => {
                    const isOpen = (p.id == openPanel);
                    return <div key={p.id} className="component-accordion-panel">
                        <div className="component-accordion-panel-header" style={{ height: PANEL_HEADER_HEIGHT }} data-accordion-panel-id={p.id} onClick={this.fnTogglePanel}>
                            <span className={`pt-icon-standard pt-icon-chevron-${isOpen ? "up" : "down"}`}></span> {p.title}
                        </div>
                        <Collapse isOpen={isOpen}>
                            {p.contentRenderer({ width: dim.width, height: (dim.height - (panels.length * PANEL_HEADER_HEIGHT)) })}
                        </Collapse>
                    </div>;
                })}
            </div>
            }}
        </Measure>;
    }
}