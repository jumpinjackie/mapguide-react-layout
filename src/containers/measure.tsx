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

const _measurements: MeasureContext[] = [];

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

class MeasureContainerInner extends React.Component<MeasureProps, Partial<IMeasureContainerState>> implements IMeasureComponent, IMeasureCallback {

    constructor(props: MeasureProps) {
        super(props);
        this.state = {
            measuring: false,
            drawType: "LineString"
        }
    }
    private onTypeChanged = (newType: OLGeometryType) => {
        this.setState({ drawType: newType }, () => {
            const { activeMapName } = this.props;
            if (activeMapName && this.state.measuring === true) {
                const activeMeasure = _measurements.filter(m => m.getMapName() === activeMapName)[0];
                if (activeMeasure) {
                    activeMeasure.handleDrawTypeChange();
                }
            }
        });
    }
    private onClearMeasurements = (e: GenericEvent) => {
        e.preventDefault();
        const { activeMapName } = this.props;
        if (activeMapName) {
            const activeMeasure = _measurements.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.clearMeasurements();
            }
        }
        return false;
    }
    private onStartMeasure = () => {
        this.startMeasure();
    }
    private onEndMeasure = () => {
        this.endMeasure();
    }
    private startMeasure() {
        const { activeMapName } = this.props;
        const { drawType: type, measuring } = this.state;
        if (activeMapName && type && !measuring) {
            //Set to none to prevent select tool interference when measuring
            this.props.setActiveTool?.(ActiveMapTool.None);
            const activeMeasure = _measurements.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.startMeasure();
                this.setState({ measuring: true });
            }
        }
    }
    private endMeasure() {
        const { activeMapName } = this.props;
        const { measuring } = this.state;
        if (activeMapName && measuring) {
            const activeMeasure = _measurements.filter(m => m.getMapName() === activeMapName)[0];
            if (activeMeasure) {
                activeMeasure.endMeasure();
                this.setState({ measuring: false });
            }
        }
    }
    updateSegments(kind: "LineString" | "Area", total: number, segments: MeasureSegment[] | undefined): void {
        this.setState({ activeType: kind, segmentTotal: total, segments: segments });
    }
    clearSegments(): void {
        this.setState({ segments: undefined });
    }
    getCurrentDrawType(): OLGeometryType | undefined { return this.state.drawType; }
    getLocale(): string {
        return this.props.locale || DEFAULT_LOCALE;
    }
    componentDidMount() {
        let activeMeasure: MeasureContext | undefined;
        if (_measurements.length == 0) {
            const { mapNames, activeMapName, viewer } = this.props;
            if (viewer.isReady() && mapNames && mapNames.length) {
                for (const mapName of mapNames) {
                    const context = new MeasureContext(viewer, mapName, this);
                    _measurements.push(context);
                    if (activeMapName == mapName) {
                        activeMeasure = context;
                    }
                }
            }
        } else {
            for (const measure of _measurements) {
                measure.setParent(this);
            }

            activeMeasure = _measurements.filter(m => m.getMapName() === this.props.activeMapName)[0];
        }

        if (activeMeasure && this.props.activeMapName) {
            activeMeasure.activate(this.props.activeMapName, this);
        }
    }
    componentWillUnmount() {
        const { activeMapName } = this.props;
        this.setState({ measuring: false });
        for (const measure of _measurements) {
            measure.detachParent();
        }
        if (activeMapName) {
            for (const measure of _measurements) {
                measure.deactivate(activeMapName);
            }
        }
    }
    componentDidUpdate(prevProps: MeasureProps) {
        const nextProps = this.props;
        //Active map changed
        if (prevProps.activeMapName != nextProps.activeMapName) {
            const oldMeasure = _measurements.filter(m => m.getMapName() === prevProps.activeMapName)[0];
            const newMeasure = _measurements.filter(m => m.getMapName() === nextProps.activeMapName)[0];
            if (oldMeasure) {
                oldMeasure.deactivate(prevProps.activeMapName!);
            }
            if (newMeasure) {
                newMeasure.activate(nextProps.activeMapName!, this);
            }
            //Reset
            this.setState({ measuring: false });
        }
    }
    render(): JSX.Element {
        const { measuring, drawType: type } = this.state;
        const { measureUnits } = this.props;
        const locale = this.getLocale();
        const measurementTypes = [
            { value: "LineString" as OLGeometryType, label: tr("MEASUREMENT_TYPE_LENGTH", locale) },
            { value: "Polygon" as OLGeometryType, label: tr("MEASUREMENT_TYPE_AREA", locale) }
        ]
        return <div className="component-measure">
            <form className="form-inline">
                <label className="bp3-label">
                    {tr("MEASUREMENT_TYPE", locale)}
                    <TypedSelect<OLGeometryType, false> 
                        value={type}
                        onChange={this.onTypeChanged}
                        items={measurementTypes} />
                </label>
                <MeasureControls measuring={measuring} locale={locale} onStartMeasure={this.onStartMeasure} onEndMeasure={this.onEndMeasure} onClearMeasurements={this.onClearMeasurements} />
                {(() => {
                    if (this.state.measuring === true) {
                        return <div>
                            <MeasuringMessage locale={locale} />
                            {(() => {
                                if (this.state.segments) {
                                    return <table className="bp3-html-table bp3-html-table-condensed">
                                        <thead>
                                            <tr>
                                                <th>{tr("MEASURE_SEGMENT", locale)}</th>
                                                <th>{tr("MEASURE_LENGTH", locale)}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.segments.map(s => {
                                                return <tr key={`segment-${s.segment}`}>
                                                    <td>{tr("MEASURE_SEGMENT_PART", locale, { segment: s.segment })}</td>
                                                    {measureUnits
                                                        ? <td>{`${roundTo(s.length, 2)} ${toProjUnit(measureUnits)}`}</td>
                                                        : <td>{tr("UNIT_FMT_M", locale, { value: roundTo(s.length, 2) })}</td>}
                                                </tr>
                                            })}
                                            {(() => {
                                                if (this.state.segmentTotal && this.state.activeType) {
                                                    return <tr>
                                                        {(() => {
                                                            if (this.state.activeType == "Area") {
                                                                return <>
                                                                    <td><strong>{tr("MEASURE_TOTAL_AREA", locale)}</strong></td>
                                                                    <td>
                                                                        {measureUnits
                                                                            ? <div dangerouslySetInnerHTML={{ __html: `${roundTo(this.state.segmentTotal, 4)} ${toProjUnit(measureUnits)} <sup>2</sup>` }} />
                                                                            : <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr("UNIT_FMT_SQM", locale, { value: `${roundTo(this.state.segmentTotal, 4)}` })) }} />}
                                                                    </td>
                                                                </>
                                                            } else {
                                                                return <>
                                                                    <td><strong>{tr("MEASURE_TOTAL_LENGTH", locale)}</strong></td>
                                                                    <td>
                                                                        {measureUnits
                                                                            ? <div dangerouslySetInnerHTML={{ __html: `${roundTo(this.state.segmentTotal, 4)} ${toProjUnit(measureUnits)}` }} />
                                                                            : <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr("UNIT_FMT_M", locale, { value: `${roundTo(this.state.segmentTotal, 4)}` })) }} />}
                                                                    </td>
                                                                </>
                                                            }
                                                        })()}
                                                    </tr>;
                                                }
                                            })()}
                                        </tbody>
                                    </table>;
                                }
                            })()}
                        </div>;
                    }
                })()}
            </form>
        </div>;
    }
}

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