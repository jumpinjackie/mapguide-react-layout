import * as React from "react";
import {
    GenericEvent
} from "../api/common";
import { useElementContext } from "./elements/element-context";
import useResizeObserver from '@react-hook/resize-observer';

/**
 * Accordion panel dimensions
 *
 * @interface IAccordionPanelContentDimensions
 */
export interface IAccordionPanelContentDimensions {
    width: number;
    height: number;
}

/**
 * Describes a panel in the accordion
 *
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
export const Accordion = React.memo((props: IAccordionProps) => {
    const { Icon: BpIcon, Collapsible } = useElementContext();
    const target = React.useRef<HTMLDivElement>(null);
    const { style, panels, isResizing, onActivePanelChanged } = props;
    const activeId = validatePanelId(props.panels, props.activePanelId);
    const [dim, setDim] = React.useState<Pick<DOMRectReadOnly, "width" | "height">>({
        width: -1,
        height: -1
    });
    const [openPanel, setOpenPanel] = React.useState(activeId || panels[panels.length - 1].id);
    React.useEffect(() => {
        setOpenPanel(activeId || panels[panels.length - 1].id);
    }, [activeId]);

    React.useLayoutEffect(() => {
        if (target.current) {
            setDim(target.current.getBoundingClientRect());
        }
    }, [target]);
    useResizeObserver(target, e => setDim(e.contentRect));
    const onTogglePanel = (e: GenericEvent) => {
        const id = e.currentTarget.attributes["data-accordion-panel-id"].value;
        if (openPanel != id) {
            setOpenPanel(id);
            onActivePanelChanged?.(id);
        }
    }
    return <div ref={target} style={style} className="component-accordion">
        {panels.map(p => {
            const isPanelOpen = (p.id == openPanel);
            return <div key={p.id} className={`component-accordion-panel`}>
                <div className="component-accordion-panel-header" style={{ height: PANEL_HEADER_HEIGHT }} data-accordion-panel-id={p.id} onClick={onTogglePanel}>
                    <BpIcon icon={isPanelOpen ? "chevron-up" : "chevron-down"} /> {p.title}
                </div>
                <Collapsible isOpen={isPanelOpen}>
                    {p.contentRenderer({ width: dim.width, height: (dim.height - (panels.length * PANEL_HEADER_HEIGHT)) }, isResizing)}
                </Collapsible>
            </div>;
        })}
    </div>;
});