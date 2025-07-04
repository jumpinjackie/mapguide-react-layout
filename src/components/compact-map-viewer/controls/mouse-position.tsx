import React from 'react';
import { Breadcrumb } from '../breadcrumb';
import { useOLMap } from '../context';
import { useMapControl } from '../hooks';
import MousePosition, { type Options as MousePositionOptions } from 'ol/control/MousePosition';

/**
 * Props for the MousePositionControl component.
 * 
 * @since 0.15
 */
export type MousePositionControlProps = {
    /**
     * CSS class name for the mouse position control element.
     */
    className?: string;
    /**
     * Function to format the coordinate display. Receives the coordinate array and returns a formatted string.
     */
    coordinateFormat?: MousePositionOptions['coordinateFormat'];
    /**
     * Text to display when the mouse is not over the map.
     */
    placeholder?: string;
    /**
     * The projection to use for displaying coordinates. If not specified, the map's view projection is used.
     */
    displayProjection?: string;
};

/**
 * A React component that wraps OpenLayers MousePosition control to display the current mouse cursor position on the map.
 * 
 * This component integrates with the OpenLayers map instance and provides real-time coordinate display
 * as the user moves their mouse over the map. The coordinates can be formatted and displayed in different
 * projections as needed.
 * 
 * @since 0.15
 * 
 * @example
 * ```tsx
 * // Basic usage with default formatting
 * <MousePositionControl />
 * 
 * // With custom styling and placeholder
 * <MousePositionControl 
 *   className="custom-mouse-position"
 *   placeholder="Move mouse over map"
 * />
 * 
 * // With custom coordinate formatting
 * <MousePositionControl 
 *   coordinateFormat={(coordinate) => `X: ${coordinate[0].toFixed(2)}, Y: ${coordinate[1].toFixed(2)}`}
 *   displayProjection="EPSG:4326"
 * />
 * ```
 */
export const MousePositionControl: React.FC<MousePositionControlProps> = ({ className, coordinateFormat, placeholder, displayProjection }) => {
    const { renderDomBreadcrumbs } = useOLMap();
    useMapControl(
        'MousePosition',
        (m, msg) =>
            new MousePosition({
                className: className,
                coordinateFormat: coordinateFormat,
                placeholder: placeholder,
                projection: displayProjection
            }),
        [className, coordinateFormat, placeholder, displayProjection]
    );
    if (renderDomBreadcrumbs) {
        // DOM breadcrumb so you know this component was indeed mounted
        return <Breadcrumb component="MousePositionControl" />;
    }
    return null;
};
