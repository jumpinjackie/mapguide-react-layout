import * as React from "react";
import { IMapView, UnitOfMeasure } from "../api/common";
import { getUnitOfMeasure, getMapSize } from "../utils/units";

export interface IViewSizeProps {
    /**
     * Width in pixels
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    width: number;
    /**
     * Height in pixels
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    height: number;
    /**
     * Meters per unit
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    metersPerUnit: number;
    /**
     * Decimal precision to display
     * 
     * @type {number}
     * @memberof IViewSizeProps
     */
    precision?: number;
    /**
     * The map view
     * 
     * @type {IMapView}
     * @memberof IViewSizeProps
     */
    view: IMapView;
    /**
     * The desired unit of measure to display the size in
     * 
     * @type {UnitOfMeasure}
     * @memberof IViewSizeProps
     */
    units: UnitOfMeasure;
    /**
     * @since 0.12.2
     */
    locale?: string;
}

export const ViewSize = (props: IViewSizeProps) => {
    const { width, height, view, metersPerUnit, units, precision, locale } = props;
    const uom = getUnitOfMeasure(units);
    const [gw, gh] = getMapSize([width, height], metersPerUnit, units, view.resolution, precision);
    //TODO: Support format string extension parameter from fusion widget
    return <div className="component-view-size">{gw} x {gh} (<span dangerouslySetInnerHTML={{ __html: uom.abbreviation(locale) }} />)</div>;
};