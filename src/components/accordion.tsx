import * as React from "react";
import { GenericEvent, ICalciteIconProps } from "../api/common";
import useDimensions from './hooks/use-dimensions';
import styled from 'styled-components';
import ChevronDownIcon from "calcite-ui-icons-react/ChevronDownIcon";
import ChevronUpIcon from "calcite-ui-icons-react/ChevronUpIcon";

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
    /**
     * @type {ICalciteIconProps}
     * @memberof IAccordionProps
     * @since 0.14
     */
    globalIconProps?: ICalciteIconProps;
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

export const AccordionWrapper = styled.div``;
export const AccordionSectionPanel = styled.div``;
export const AccordionSectionHeading = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    height: ${PANEL_HEADER_HEIGHT}px !important;
`;

const AccordionCollapsible = ({ isOpen, children }: { isOpen: boolean, children: React.ReactNode }) => {
    if (isOpen) {
        return <div style={{ position: "relative" }}>{children}</div>;
    } else {
        return <></>;
    }
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
    };
    const baseIconProps: ICalciteIconProps = {
        size: 16,
        ...props.globalIconProps
    };
    //TODO: Verify that previous accordion un-mounted child content of collapsed panels
    return <AccordionWrapper ref={ref} style={style}>
        {panels.map(p => {
            const isOpen = (p.id == openPanel);
            return <AccordionSectionPanel key={p.id}>
                <AccordionSectionHeading data-accordion-panel-id={p.id} onClick={onTogglePanel}>
                    {isOpen ? <ChevronUpIcon {...baseIconProps} /> : <ChevronDownIcon {...baseIconProps} />} {p.title}
                </AccordionSectionHeading>
                <AccordionCollapsible isOpen={isOpen}>
                    {p.contentRenderer({ width: width, height: (height - (panels.length * PANEL_HEADER_HEIGHT)) }, isResizing)}
                </AccordionCollapsible>
            </AccordionSectionPanel>;
        })}
    </AccordionWrapper>;
}