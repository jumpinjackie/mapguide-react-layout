import React from 'react';
import { VectorLayer } from './vector';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

/**
 * Props for the DebugVectorPointLayer component.
 *
 * @since 0.15
 */
export type DebugVectorPointLayerProps = {
    /**
     * The name of the vector layer that will be displayed in the map.
     */
    name: string;
    /**
     * The name of the global function that will be created to add debug points.
     * This function will be accessible via `window[addFunctionName]`.
     */
    addFunctionName: string;
    /**
     * The name of the global function that will be created to clear all debug points.
     * This function will be accessible via `window[clearFunctionName]`.
     */
    clearFunctionName: string;
};

/**
 * A React component that creates a vector layer for debugging purposes by displaying point features on the map.
 *
 * This component creates two global functions that can be called from the browser console or other debugging tools
 * to dynamically add and clear debug points on the map. It's useful for development and troubleshooting scenarios
 * where you need to visualize specific coordinate points.
 *
 * The component automatically generates unique IDs for each debug point using timestamps to ensure proper
 * feature management.
 *
 * @since 0.15
 *
 * @example
 * ```tsx
 * // Create a debug layer with console functions
 * <DebugVectorPointLayer
 *   name="Debug Points"
 *   addFunctionName="addDebugPoint"
 *   clearFunctionName="clearDebugPoints"
 * />
 *
 * // Then in browser console:
 * // Add a point at coordinates [0, 0]
 * addDebugPoint([0, 0], 'Test Point 1');
 *
 * // Add multiple points
 * addDebugPoint([100, 200], 'Test Point 2');
 * addDebugPoint([-50, 150], 'Test Point 3');
 *
 * // Clear all debug points
 * clearDebugPoints();
 * ```
 */
export const DebugVectorPointLayer: React.FC<DebugVectorPointLayerProps> = ({ name, addFunctionName, clearFunctionName }) => {
    const features = React.useRef(new Collection<Feature>());
    const style = React.useRef([
        {
            style: {
                'circle-radius': 5,
                'circle-fill-color': 'rgba(255,255,255,0.4)',
                'circle-stroke-color': '#3399CC',
                'circle-stroke-width': 1.25,
                'fill-color': 'rgba(255,255,255,0.4)',
                'stroke-color': '#3399CC',
                'stroke-width': 1.25,
                'text-font': '12px sans-serif',
                'text-fill-color': '#000',
                'text-stroke-color': '#fff',
                'text-stroke-width': 2,
                'text-offset-x': 10,
                'text-align': 'left',
                'text-value': ['get', 'label']
            }
        }
    ]);
    React.useEffect(() => {
        (window as any)[addFunctionName] = (coords: [number, number], label: string) => {
            const feature = new Feature({
                geometry: new Point(coords)
            });
            feature.setProperties({
                label: label
            });
            feature.setId(`debug-point-${Date.now()}`);
            features.current.push(feature);
        };
        (window as any)[clearFunctionName] = () => {
            features.current.clear();
        };
    }, []);
    return <VectorLayer name={name} style={style.current} features={features.current} />;
};
