import * as React from "react";
import { IMapView, UnitOfMeasure } from "../api/common";
import { getUnitOfMeasure, getMapSize } from "../utils/units";
import { fmt } from '../api/i18n';
import DOMPurify from "dompurify";

export interface IViewSizeProps {
    /**
     * Width in pixels
     * 
     * @type {number}
     *
     */
    width: number;
    /**
     * Height in pixels
     * 
     * @type {number}
     *
     */
    height: number;
    /**
     * Meters per unit
     * 
     * @type {number}
     *
     */
    metersPerUnit: number;
    /**
     * Decimal precision to display
     * 
     * @type {number}
     *
     */
    precision?: number;
    /**
     * The map view
     * 
     * @type {IMapView}
     *
     */
    view: IMapView;
    /**
     * The desired unit of measure to display the size in
     * 
     * @type {UnitOfMeasure}
     *
     */
    units: UnitOfMeasure;
    /**
     * @since 0.12.2
     */
    locale?: string;
}

const ViewSizeContent = ({ gw, gh, unit }: { gw: number, gh: number, unit: string }) => {
    const str = fmt("{gw} x {gh} ({unit})", { gw, gh, unit });
    return <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(str) }} />;
}

export const ViewSize = (props: IViewSizeProps) => {
    const { width, height, view, metersPerUnit, units, precision, locale } = props;
    const uom = getUnitOfMeasure(units);
    const [gw, gh] = getMapSize([width, height], metersPerUnit, units, view.resolution, precision);
    //TODO: Support format string extension parameter from fusion widget
    return <div className="status-bar-component component-view-size"><ViewSizeContent gw={gw} gh={gh} unit={uom.abbreviation(locale)} /></div>;
};