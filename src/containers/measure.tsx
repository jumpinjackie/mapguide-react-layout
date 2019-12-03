import * as React from "react";
import { useDispatch } from "react-redux";
import {
    GenericEvent,
    ActiveMapTool} from "../api/common";
import { getViewer } from "../api/runtime";
import { tr, DEFAULT_LOCALE } from "../api/i18n";
import * as MapActions from "../actions/map";
import { IMeasureCallback, MeasureSegment, MeasureContext, IMeasureComponent } from "./measure-context";
import { roundTo } from "../utils/number";
import { Callout, Intent, ButtonGroup, Button, HTMLSelect } from '@blueprintjs/core';
import { useActiveMapName, useViewerLocale, useAvailableMaps } from './hooks';

export interface IMeasureContainerProps {

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
    type: string;
    activeType: "LineString" | "Area";
    segmentTotal: number;
    segments: MeasureSegment[];
}

type MeasureProps = IMeasureContainerProps & IMeasureContainerReducerState & IMeasureContainerDispatch;

const _measurements: MeasureContext[] = [];

class MeasureContainerInner extends React.Component<MeasureProps, Partial<IMeasureContainerState>> implements IMeasureComponent, IMeasureCallback {

    constructor(props: MeasureProps) {
        super(props);
        this.state = {
            measuring: false,
            type: "LineString"
        }
    }
    private onTypeChanged = (e: GenericEvent) => {
        const newType = e.target.value;
        this.setState({ type: newType }, () => {
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
        const { type, measuring } = this.state;
        if (activeMapName && type && !measuring) {
            //Set to none to prevent select tool interference when measuring
            if (this.props.setActiveTool) {
                this.props.setActiveTool(ActiveMapTool.None);
            }
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
    getCurrentDrawType(): string | undefined { return this.state.type; }
    getLocale(): string {
        return this.props.locale || DEFAULT_LOCALE;
    }
    componentDidMount() {
        let activeMeasure: MeasureContext | undefined;
        if (_measurements.length == 0) {
            const { mapNames, activeMapName } = this.props;
            const viewer = getViewer();
            if (viewer && mapNames && mapNames.length) {
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
        const { measuring, type } = this.state;
        const locale = this.getLocale();
        return <div className="component-measure">
            <form className="form-inline">
                <label className="bp3-label">
                    {tr("MEASUREMENT_TYPE", locale)}
                    <div className="bp3-select">
                        <HTMLSelect value={type} onChange={this.onTypeChanged}>
                            <option value="LineString">{tr("MEASUREMENT_TYPE_LENGTH", locale)}</option>
                            <option value="Polygon">{tr("MEASUREMENT_TYPE_AREA", locale)}</option>
                        </HTMLSelect>
                    </div>
                </label>
                <ButtonGroup>
                    <Button type="button" icon="play" disabled={measuring} onClick={this.onStartMeasure}>{tr("MEASUREMENT_START", locale)}</Button>
                    <Button type="button" icon="stop" disabled={!measuring} onClick={this.onEndMeasure}>{tr("MEASUREMENT_END", locale)}</Button>
                    <Button type="button" icon="cross" onClick={this.onClearMeasurements}>{tr("MEASUREMENT_CLEAR", locale)}</Button>
                </ButtonGroup>
                {(() => {
                    if (this.state.measuring === true) {
                        return <div>
                            <Callout intent={Intent.PRIMARY} title={tr("MEASURING", locale)}>
                                {tr("MEASURING_MESSAGE", locale)}
                            </Callout>
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
                                                    <td>{tr("UNIT_FMT_M", locale, { value: roundTo(s.length, 2) })}</td>
                                                </tr>
                                            })}
                                            {(() => {
                                                if (this.state.segmentTotal && this.state.activeType) {
                                                    return <tr>
                                                        {(() => {
                                                            if (this.state.activeType == "Area") {
                                                                return <>
                                                                    <td><strong>{tr("MEASURE_TOTAL_AREA", locale)}</strong></td>
                                                                    <td><div dangerouslySetInnerHTML={{ __html: tr("UNIT_FMT_SQM", locale, { value: `${roundTo(this.state.segmentTotal, 4)}` }) }} /></td>
                                                                </>
                                                            } else {
                                                                return <>
                                                                    <td><strong>{tr("MEASURE_TOTAL_LENGTH", locale)}</strong></td>
                                                                    <td><div dangerouslySetInnerHTML={{ __html: tr("UNIT_FMT_M", locale, { value: `${roundTo(this.state.segmentTotal, 4)}` }) }} /></td>
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

const MeasureContainer = (props: IMeasureContainerProps) => {
    const activeMapName = useActiveMapName();
    const locale = useViewerLocale();
    const mapNames = useAvailableMaps()?.map(m => m.value);
    const dispatch = useDispatch();
    const setActiveTool = (tool: ActiveMapTool) => dispatch(MapActions.setActiveTool(tool))
    return <MeasureContainerInner 
        activeMapName={activeMapName}
        locale={locale}
        mapNames={mapNames}
        setActiveTool={setActiveTool}
        {...props} />;
};

export default MeasureContainer;