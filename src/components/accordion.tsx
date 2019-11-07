import * as React from "react";
import Measure, { ContentRect } from "react-measure";
import {
    GenericEvent
} from "../api/common";
import { safePropAccess } from '../utils/safe-prop';
import Icon from 'ol/style/icon';
import { Collapse, Icon as BpIcon } from '@blueprintjs/core';

/**
 * Accordion panel dimensions
 *
 * @export
 * @interface IAccordionPanelContentDimensions
 */
export interface IAccordionPanelContentDimensions {
    width: number;
    height: number;
}

/**
 * Describes a panel in the accordion
 *
 * @export
 * @interface IAccordionPanelSpec
 */
export interface IAccordionPanelSpec {
    id: string;
    title: string;
    contentRenderer: (dim: IAccordionPanelContentDimensions, isResizing?: boolean) => JSX.Element;
}

/**
 * Accordion component props
 *
 * @export
 * @interface IAccordionProps
 */
export interface IAccordionProps {
    style: React.CSSProperties;
    panels: IAccordionPanelSpec[];
    onActivePanelChanged?: (id: string) => void;
    activePanelId?: string;
    isResizing?: boolean;
}

const PANEL_HEADER_HEIGHT = 24;

/**
 * A generic, reusable Accordion component
 *
 * @export
 * @class Accordion
 * @extends {React.Component<IAccordionProps, any>}
 */
export class Accordion extends React.Component<IAccordionProps, any> {
    constructor(props: IAccordionProps) {
        super(props);
        const activeId = this.validatePanelId(props.panels, props.activePanelId);
        this.state = {
            openPanel: activeId || props.panels[props.panels.length - 1].id,
            dim: {
                width: -1,
                height: -1
            }
        };
    }
    private onTogglePanel = (e: GenericEvent) => {
        const id = e.currentTarget.attributes["data-accordion-panel-id"].value;
        if (this.state.openPanel != id) {
            this.setState({ openPanel: id }, () => {
                safePropAccess(this.props, "onActivePanelChanged", func => func!(id));
            });
        }
    }
    private validatePanelId(panels: IAccordionPanelSpec[], id: string | undefined): string | null {
        if (!id) {
            return null;
        }
        const panel = panels.filter(p => p.id == id)[0];
        if (panel) {
            return id;
        }
        return null;
    }
    private onResize = (contentRect: ContentRect) => {
        this.setState({ dim: contentRect.entry });
    }
    componentDidUpdate(prevProps: IAccordionProps) {
        const nextProps = this.props;
        if (prevProps.activePanelId != nextProps.activePanelId) {
            const newId = this.validatePanelId(nextProps.panels, nextProps.activePanelId);
            if (newId) {
                this.setState({ openPanel: newId });
            }
        }
    }
    render(): JSX.Element {
        const { openPanel, dim } = this.state;
        const { panels, style, isResizing } = this.props;
        return <Measure bounds onResize={this.onResize}>
            {({ measureRef }) => {
                return <div ref={measureRef} style={style} className="component-accordion">
                    {panels.map(p => {
                        const isOpen = (p.id == openPanel);
                        return <div key={p.id} className="component-accordion-panel">
                            <div className="component-accordion-panel-header" style={{ height: PANEL_HEADER_HEIGHT }} data-accordion-panel-id={p.id} onClick={this.onTogglePanel}>
                                <BpIcon icon={isOpen ? "chevron-up" : "chevron-down"} /> {p.title}
                            </div>
                            <Collapse isOpen={isOpen}>
                                {p.contentRenderer({ width: dim.width, height: (dim.height - (panels.length * PANEL_HEADER_HEIGHT)) }, isResizing)}
                            </Collapse>
                        </div>;
                    })}
                </div>
            }}
        </Measure>;
    }
}