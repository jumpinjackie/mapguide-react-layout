import * as React from "react";
import {
    GenericEvent
} from "../api/common";
import { Collapse, Icon as BpIcon } from '@blueprintjs/core';
import useDimensions from './hooks/use-dimensions';

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

function validatePanelId(panels: IAccordionPanelSpec[], id: string | undefined): string | null {
    if (!id) {
        return null;
    }
    const panel = panels.filter(p => p.id == id)[0];
    if (panel) {
        return id;
    }
    return null;
}

/**
 * A generic, reusable Accordion component
 * @param props 
 */
export const Accordion = (props: IAccordionProps) => {
    const { style, panels, isResizing, onActivePanelChanged } = props;
    const activeId = validatePanelId(props.panels, props.activePanelId);
    const [openPanel, setOpenPanel] = React.useState(activeId || panels[panels.length - 1].id);
    const [ref, { width, height }] = useDimensions();
    React.useEffect(() => {
        setOpenPanel(activeId || panels[panels.length - 1].id);
    }, [activeId]);
    const onTogglePanel = (e: GenericEvent) => {
        const id = e.currentTarget.attributes["data-accordion-panel-id"].value;
        if (openPanel != id) {
            setOpenPanel(id);
            onActivePanelChanged?.(id);
        }
    }
    return <div ref={ref} style={style} className="component-accordion">
        {panels.map(p => {
            const isOpen = (p.id == openPanel);
            return <div key={p.id} className="component-accordion-panel">
                <div className="component-accordion-panel-header" style={{ height: PANEL_HEADER_HEIGHT }} data-accordion-panel-id={p.id} onClick={onTogglePanel}>
                    <BpIcon icon={isOpen ? "chevron-up" : "chevron-down"} /> {p.title}
                </div>
                <Collapse isOpen={isOpen}>
                    {p.contentRenderer({ width: width, height: (height - (panels.length * PANEL_HEADER_HEIGHT)) }, isResizing)}
                </Collapse>
            </div>;
        })}
    </div>;
}