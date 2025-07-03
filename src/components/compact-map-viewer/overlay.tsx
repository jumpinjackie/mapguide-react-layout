import Overlay, { type Options as OverlayOptions } from 'ol/Overlay';
import { useOLMap } from './context';
import React from 'react';
import type { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';

/**
 * Props for the ContentOverlay component.
 *
 * @since 0.15
 */
export type ContentOverlayProps = {
    /**
     * Optional CSS class name for the overlay container.
     */
    className?: string;
    /**
     * Optional inline styles for the overlay container.
     */
    style?: React.CSSProperties;
    /**
     * Optional offset for the overlay position.
     */
    offset?: [number, number];
    /**
     * Overlay positioning relative to the coordinate.
     */
    positioning?: OverlayOptions['positioning'];
    /**
     * Mouse tracking mode for the overlay.
     * Determines how the overlay responds to mouse events.
     * - `'click'`: The overlay is positioned at the coordinate of the last single click on the map.
     * - `'hover'`: The overlay follows the mouse cursor position.
     */
    mouseTrackingMode: 'click' | 'hover';
    /**
     * Optional flag to indicate if the overlay is active.
     * If true, the overlay will be rendered and positioned based on the last clicked coordinate.
     * If false or not specified, the overlay will not be rendered.
     * @default true
     */
    isActive?: boolean;
    /**
     * A render prop that receives the current coordinate of the overlay.
     *
     * @param coordinate
     * @returns
     */
    onPositionChange?: (coordinate: Coordinate | undefined) => void;
};

const DEFAULT_OFFSET = [15, 0];
const DEFAULT_POSITIONING: OverlayOptions['positioning'] = 'center-left';

/**
 * A component that renders a content overlay on an OpenLayers map at the clicked coordinate.
 *
 * The overlay is positioned at the location of the last map single click, and its content is rendered
 * using a render prop that receives the clicked coordinate.
 *
 * @hidden
 * @since 0.15
 */
export const ContentOverlay: React.FC<React.PropsWithChildren<ContentOverlayProps>> = ({
    className,
    style,
    offset,
    positioning,
    isActive,
    mouseTrackingMode,
    onPositionChange,
    children
}) => {
    const { map } = useOLMap();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const overlayRef = React.useRef<Overlay | null>(null);
    const mouseTrackingModeRef = React.useRef(mouseTrackingMode);

    function onMapSingleClickOrMove(e: MapBrowserEvent) {
        let isRelevantEvent = false;
        switch (e.type) {
            case 'singleclick':
                isRelevantEvent = mouseTrackingModeRef.current === 'click';
                break;
            case 'pointermove':
                isRelevantEvent = mouseTrackingModeRef.current === 'hover';
                break;
        }
        if (isRelevantEvent && overlayRef.current) {
            overlayRef.current.setPosition(e.coordinate);
            onPositionChange?.(e.coordinate);
        }
    }

    React.useEffect(() => {
        mouseTrackingModeRef.current = mouseTrackingMode;
    }, [mouseTrackingMode]);

    React.useEffect(() => {
        if (overlayRef.current) {
            overlayRef.current.setOffset(offset ?? DEFAULT_OFFSET);
            overlayRef.current.setPositioning(positioning ?? DEFAULT_POSITIONING);
        }
    }, [offset, positioning]);

    React.useEffect(() => {
        if (mouseTrackingModeRef.current === 'click') {
            overlayRef.current?.setPosition(undefined);
        } else if (mouseTrackingModeRef.current === 'hover' && !isActive) {
            overlayRef.current?.setPosition(undefined);
        }
    }, [isActive]);

    React.useEffect(() => {
        overlayRef.current = new Overlay({
            element: contentRef.current!,
            offset: offset ?? DEFAULT_OFFSET,
            positioning: positioning ?? DEFAULT_POSITIONING
        });
        map.addOverlay(overlayRef.current);
        map.on('singleclick', onMapSingleClickOrMove);
        map.on('pointermove', onMapSingleClickOrMove);
        return () => {
            map.un('singleclick', onMapSingleClickOrMove);
            map.on('pointermove', onMapSingleClickOrMove);
            if (overlayRef.current) {
                map.removeOverlay(overlayRef.current);
            }
        };
    }, []);

    const contentStyle = { ...style };
    if (!isActive) {
        contentStyle.display = 'none';
    }
    return (
        <div className={className} style={contentStyle} ref={contentRef}>
            {children}
        </div>
    );
};
