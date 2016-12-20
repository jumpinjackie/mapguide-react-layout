import * as React from "react";
import { Collapse } from "@blueprintjs/core";

export interface IAccordionPanelSpec {
    id: string;
    title: string;
    contentRenderer: () => JSX.Element;
}

export interface IAccordionProps {
    style: React.CSSProperties;
    panels: IAccordionPanelSpec[];
}

export class Accordion extends React.Component<IAccordionProps, any> {
    private fnTogglePanel: GenericEventHandler;
    constructor(props: IAccordionProps) {
        super(props);
        this.fnTogglePanel = this.onTogglePanel.bind(this);
        this.state = {
            openPanel: null
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
    componentDidMount() {
        this.setState({
            openPanel: this.props.panels[this.props.panels.length - 1].id
        });
    }
    render(): JSX.Element {
        const { openPanel } = this.state;
        const { panels, style } = this.props;
        return <div style={style} className="component-accordion">
            {panels.map(p => {
                const isOpen = (p.id == openPanel);
                return <div key={p.id} className="component-accordion-panel">
                    <div className="component-accordion-panel-header" data-accordion-panel-id={p.id} onClick={this.fnTogglePanel}>
                        <span className={`pt-icon-standard pt-icon-chevron-${isOpen ? "up" : "down"}`}></span> {p.title}
                    </div>
                    <Collapse isOpen={isOpen}>
                        {p.contentRenderer()}
                    </Collapse>
                </div>;
            })}
        </div>;
    }
}