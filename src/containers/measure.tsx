import * as React from "react";
import {
    GenericEvent,
    ActiveMapTool,
    UnitOfMeasure
} from "../api/common";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import { IMeasureCallback, MeasureSegment, MeasureContext, IMeasureComponent } from "./measure-context";
import { roundTo } from "../utils/number";
import { useActiveMapName, useViewerLocale, useAvailableMaps } from './hooks';
import { setActiveTool } from '../actions/map';
import { OLGeometryType } from '../api/ol-types';
import { useMapProviderContext, useReduxDispatch } from "../components/map-providers/context";
import { useActiveMapIsArbitraryCoordSys, useActiveMapProjectionUnits } from "./hooks-mapguide";
import { toProjUnit } from "../api/layer-set";
import DOMPurify from "dompurify";
import { ElementGroup, TypedSelect, useElementContext } from "../components/elements/element-context";
import { IMapProviderContext } from "../components/map-providers/base";
import { useDebugDeps } from "../components/debug-hooks";

export interface IMeasureContainerProps {
    measureUnits?: UnitOfMeasure;
}

interface IMeasureContainerReducerState {
    mapNames: string[] | undefined;
    activeMapName: string | undefined;
    locale: string;
}

interface IMeasureContainerDispatch {
    setActiveTool: (tool: ActiveMapTool) => void;
}

interface IMeasureContainerState {
    measuring: boolean;
    drawType: OLGeometryType;
    activeType: "LineString" | "Area";
    segmentTotal: number;
    segments: MeasureSegment[];
}

type MeasureProps = IMeasureContainerProps & IMeasureContainerReducerState & IMeasureContainerDispatch & { viewer: IMapProviderContext };

const MeasuringMessage: React.FC<{ locale: string }> = ({ locale }) => {
    const { Callout } = useElementContext();
    return <Callout variant="primary" title={tr("MEASURING", locale)}>
        {tr("MEASURING_MESSAGE", locale)}
    </Callout>;
}

const MeasureControls: React.FC<{
    measuring?: boolean;
    locale: string;
    onStartMeasure: () => void;
    onEndMeasure: () => void;
    onClearMeasurements: (e: GenericEvent) => void;
}> = ({ measuring, locale, onStartMeasure, onEndMeasure, onClearMeasurements }) => {
    const { Button } = useElementContext();
    return <ElementGroup>
        <Button type="button" icon="play" disabled={measuring} onClick={onStartMeasure}>{tr("MEASUREMENT_START", locale)}</Button>
        <Button type="button" icon="stop" disabled={!measuring} onClick={onEndMeasure}>{tr("MEASUREMENT_END", locale)}</Button>
        <Button type="button" icon="cross" onClick={onClearMeasurements}>{tr("MEASUREMENT_CLEAR", locale)}</Button>
    </ElementGroup>;
}

const MeasureContainerInner: React.FC<MeasureProps> = (props) => {
    const { activeMapName, locale, mapNames, viewer, setActiveTool, measureUnits } = props;
    const [measuring, setMeasuring] = React.useState(false);
    const [drawType, setDrawType] = React.useState<OLGeometryType>("LineString");
    const [activeType, setActiveType] = React.useState<"LineString" | "Area">();
    const [segmentTotal, setSegmentTotal] = React.useState<number>();
    const [segments, setSegments] = React.useState<MeasureSegment[] | undefined>();
    const measureContexts = React.useRef<MeasureContext[]>([]);
    const getLocale = React.useCallback(() => locale || DEFAULT_LOCALE, [locale]);

    const onTypeChanged = (newType: OLGeometryType) => {
        setDrawType(newType);
    };

    React.useEffect(() => {
        if (activeMapName && measuring === true) {
            const activeMeasure = measureContexts.current.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.handleDrawTypeChange(drawType);
            }
        }
    }, [drawType]);

    const onClearMeasurements = React.useCallback((e: GenericEvent) => {
        e.preventDefault();
        if (activeMapName) {
            const activeMeasure = measureContexts.current.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.clearMeasurements();
            }
        }
        return false;
    }, [activeMapName]);

    const startMeasure = React.useCallback(() => {
        if (activeMapName && drawType && !measuring) {
            setActiveTool?.(ActiveMapTool.None);
            const activeMeasure = measureContexts.current.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.startMeasure(drawType);
                setMeasuring(true);
            }
        }
    }, [activeMapName, drawType, measuring, setActiveTool]);

    const endMeasure = React.useCallback(() => {
        if (activeMapName && measuring) {
            const activeMeasure = measureContexts.current.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.endMeasure();
                setMeasuring(false);
            }
        }
    }, [activeMapName, measuring]);

    const onStartMeasure = React.useCallback(() => startMeasure(), [startMeasure]);
    const onEndMeasure = React.useCallback(() => endMeasure(), [endMeasure]);

    // IMeasureComponent/IMeasureCallback methods
    const updateSegments = React.useCallback((kind: "LineString" | "Area", total: number, segs: MeasureSegment[] | undefined) => {
        setActiveType(kind);
        setSegmentTotal(total);
        setSegments(segs);
    }, []);
    const clearSegments = React.useCallback(() => setSegments(undefined), []);
    //const getCurrentDrawType = React.useCallback(() => drawType, [drawType]);

    React.useEffect(() => {
        let activeMeasure: MeasureContext | undefined;
        if (measureContexts.current.length === 0) {
            if (viewer.isReady() && mapNames && mapNames.length) {
                for (const mapName of mapNames) {
                    const context = new MeasureContext(viewer, mapName, {
                        updateSegments,
                        clearSegments,
                        getCurrentDrawType: () => drawType,
                        getLocale
                    } as IMeasureComponent);
                    measureContexts.current.push(context);
                    if (activeMapName === mapName) {
                        activeMeasure = context;
                    }
                }
            }
        } else {
            for (const measure of measureContexts.current) {
                measure.setParent({
                    updateSegments,
                    clearSegments,
                    getCurrentDrawType: () => drawType,
                    getLocale
                } as IMeasureComponent);
            }
            activeMeasure = measureContexts.current.filter(m => m.getMapName() === activeMapName)[0];
        }
        if (activeMeasure && activeMapName) {
            activeMeasure.activate(activeMapName, {
                updateSegments,
                clearSegments,
                getCurrentDrawType: () => drawType,
                getLocale
            } as IMeasureCallback);
        }
        // Only run cleanup on unmount
        return () => {
            setMeasuring(false);
            for (const measure of measureContexts.current) {
                measure.detachParent();
            }
            if (activeMapName) {
                for (const measure of measureContexts.current) {
                    measure.deactivate(activeMapName);
                }
            }
        };
    }, []);

    const measurementTypes = [
        { value: "LineString" as OLGeometryType, label: tr("MEASUREMENT_TYPE_LENGTH", locale) },
        { value: "Polygon" as OLGeometryType, label: tr("MEASUREMENT_TYPE_AREA", locale) }
    ];

    return <div className="component-measure">
        <form className="form-inline">
            <label className="bp3-label">
                {tr("MEASUREMENT_TYPE", locale)}
                <TypedSelect<OLGeometryType, false>
                    value={drawType}
                    onChange={onTypeChanged}
                    items={measurementTypes} />
            </label>
            <MeasureControls measuring={measuring} locale={locale} onStartMeasure={onStartMeasure} onEndMeasure={onEndMeasure} onClearMeasurements={onClearMeasurements} />
            {measuring === true && (
                <div>
                    <MeasuringMessage locale={locale} />
                    {segments && (
                        <table className="bp3-html-table bp3-html-table-condensed">
                            <thead>
                                <tr>
                                    <th>{tr("MEASURE_SEGMENT", locale)}</th>
                                    <th>{tr("MEASURE_LENGTH", locale)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {segments.map(s => (
                                    <tr key={`segment-${s.segment}`}>
                                        <td>{tr("MEASURE_SEGMENT_PART", locale, { segment: s.segment })}</td>
                                        {measureUnits
                                            ? <td>{`${roundTo(s.length, 2)} ${toProjUnit(measureUnits)}`}</td>
                                            : <td>{tr("UNIT_FMT_M", locale, { value: roundTo(s.length, 2) })}</td>}
                                    </tr>
                                ))}
                                {segmentTotal && activeType && (
                                    <tr>
                                        {activeType === "Area" ? (
                                            <>
                                                <td><strong>{tr("MEASURE_TOTAL_AREA", locale)}</strong></td>
                                                <td>
                                                    {measureUnits
                                                        ? <div dangerouslySetInnerHTML={{ __html: `${roundTo(segmentTotal, 4)} ${toProjUnit(measureUnits)} <sup>2</sup>` }} />
                                                        : <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr("UNIT_FMT_SQM", locale, { value: `${roundTo(segmentTotal, 4)}` })) }} />}
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td><strong>{tr("MEASURE_TOTAL_LENGTH", locale)}</strong></td>
                                                <td>
                                                    {measureUnits
                                                        ? <div dangerouslySetInnerHTML={{ __html: `${roundTo(segmentTotal, 4)} ${toProjUnit(measureUnits)}` }} />
                                                        : <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr("UNIT_FMT_M", locale, { value: `${roundTo(segmentTotal, 4)}` })) }} />}
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </form>
    </div>;
};

export const MeasureContainer = (props: IMeasureContainerProps) => {
    const activeMapName = useActiveMapName();
    const locale = useViewerLocale();
    const mapNames = useAvailableMaps()?.map(m => m.value);
    const dispatch = useReduxDispatch();
    const setActiveToolAction = (tool: ActiveMapTool) => dispatch(setActiveTool(tool));
    const isArbitrary = useActiveMapIsArbitraryCoordSys();
    const projUnits = useActiveMapProjectionUnits();
    const viewer = useMapProviderContext();
    return <MeasureContainerInner
        activeMapName={activeMapName}
        locale={locale}
        mapNames={mapNames}
        viewer={viewer}
        setActiveTool={setActiveToolAction}
        measureUnits={isArbitrary ? projUnits : undefined}
        {...props} />;
};