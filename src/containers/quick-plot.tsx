import * as React from "react";
import { connect } from "react-redux";
import { getViewer } from "../api/runtime";
import { tr as xlate } from "../api/i18n";
import { RuntimeMap } from "../api/contracts/runtime-map";
import {
    IMapView,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState
} from "../api/common";

interface IQuickPlotContainerProps {

}

interface IQuickPlotContainerState {
    config: IConfigurationReducerState;
    map: RuntimeMap | null;
    view: IMapView | null;
}

interface IQuickPlotContainerDispatch {

}

function mapStateToProps(state: IApplicationState): IQuickPlotContainerState {
    return {
        config: state.config,
        map: state.map.state,
        view: state.view.current
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IQuickPlotContainerDispatch {
    return {

    };
}

type QuickPlotProps = IQuickPlotContainerProps & IQuickPlotContainerState & IQuickPlotContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class QuickPlotContainer extends React.Component<QuickPlotProps, any> {
    private fnTitleChanged: GenericEventHandler;
    private fnSubTitleChanged: GenericEventHandler;
    private fnShowLegendChanged: GenericEventHandler;
    private fnShowNorthArrowChanged: GenericEventHandler;
    private fnShowCoordinatesChanged: GenericEventHandler;
    private fnShowScaleBarChanged: GenericEventHandler;
    private fnShowDisclaimerChanged: GenericEventHandler;
    private fnDpiChanged: GenericEventHandler;
    private fnAdvancedOptionsChanged: GenericEventHandler;
    private fnScaleChanged: GenericEventHandler;
    private fnPaperSizeChanged: GenericEventHandler;
    private fnOrientationChanged: GenericEventHandler;
    private fnGeneratePlot: GenericEventHandler;
    constructor(props: QuickPlotProps) {
        super(props);
        this.fnTitleChanged = this.onTitleChanged.bind(this);
        this.fnSubTitleChanged = this.onSubTitleChanged.bind(this);
        this.fnShowLegendChanged = this.onShowLegendChanged.bind(this);
        this.fnShowNorthArrowChanged = this.onShowNorthArrowChanged.bind(this);
        this.fnShowCoordinatesChanged = this.onShowCoordinatesChanged.bind(this);
        this.fnShowScaleBarChanged = this.onShowScaleBarChanged.bind(this);
        this.fnShowDisclaimerChanged = this.onShowDisclaimerChanged.bind(this);
        this.fnDpiChanged = this.onDpiChanged.bind(this);
        this.fnAdvancedOptionsChanged = this.onAdvancedOptionsChanged.bind(this);
        this.fnScaleChanged = this.onScaleChanged.bind(this);
        this.fnPaperSizeChanged = this.onPaperSizeChanged.bind(this);
        this.fnOrientationChanged = this.onOrientationChanged.bind(this);
        this.fnGeneratePlot = this.onGeneratePlot.bind(this);
        this.state = {
            title: "",
            subTitle: "",
            showLegend: false,
            showNorthBar: false,
            showCoordinates: false,
            showScaleBar: false,
            showDisclaimer: false,
            showAdvanced: false,
            orientation: "P",
            paperSize: "210.0,297.0,A4",
            scale: "5000",
            dpi: "96",
            rotation: 0
        };
    }
    private onTitleChanged(e: GenericEvent) {
        this.setState({ title: e.target.value });
    }
    private onSubTitleChanged(e: GenericEvent) {
        this.setState({ subTitle: e.target.value });
    }
    private onShowLegendChanged(e: GenericEvent) {
        this.setState({ showLegend: !this.state.showLegend });
    }
    private onShowNorthArrowChanged(e: GenericEvent) {
        this.setState({ showNorthBar: !this.state.showNorthBar });
    }
    private onShowCoordinatesChanged(e: GenericEvent) {
        this.setState({ showCoordinates: !this.state.showCoordinates });
    }
    private onShowScaleBarChanged(e: GenericEvent) {
        this.setState({ showScaleBar: !this.state.showScaleBar });
    }
    private onShowDisclaimerChanged(e: GenericEvent) {
        this.setState({ showDisclaimer: !this.state.showDisclaimer });
    }
    private onDpiChanged(e: GenericEvent) {
        this.setState({ dpi: e.target.value });
    }
    private onAdvancedOptionsChanged(e: GenericEvent) {
        this.setState({ showAdvanced: !this.state.showAdvanced });
    }
    private onScaleChanged(e: GenericEvent) {
        this.setState({ scale: e.target.value });
    }
    private onPaperSizeChanged(e: GenericEvent) {
        this.setState({ paperSize: e.target.value });
    }
    private onOrientationChanged(e: GenericEvent) {
        this.setState({ orientation: e.target.value });
    }
    private onGeneratePlot(e: GenericEvent) {

    }
    render(): JSX.Element {
        const { map, view } = this.props;
        const viewer = getViewer();
        if (!viewer || !map || !view) {
            return <div />;
        }
        const extent = viewer.getCurrentExtent();
        const box = `${extent[0]}, ${extent[1]}, ${extent[2]}, ${extent[1]}, ${extent[2]}, ${extent[3]}, ${extent[0]}, ${extent[3]}, ${extent[0]}, ${extent[1]}`;
        const { config } = this.props;
        let paperSize: string;
        let printSize: string;
        const tokens = this.state.paperSize.split(",");
        if (this.state.orientation === "L") {
            printSize = `${tokens[1]},${tokens[0]}`;
            paperSize = `${printSize},${tokens[2]}`;
        } else { // P
            printSize = `${tokens[0]},${tokens[1]}`;
            paperSize = `${printSize},${tokens[2]}`;
        }
        return <div style={{ padding: 5 }}>
            <form id="Form1" name="Form1" target="_blank" method="post" action="server/QuickPlot/PlotAsPDF.php">
                <input type="hidden" id="printId" name="printId" value={`${Math.random() * 1000}`} />
                <div className="Title FixWidth">{xlate("QUICKPLOT_HEADER", config.locale) }</div>
                <div className="Label ">{xlate("QUICKPLOT_TITLE", config.locale) }</div>
                <div className="Ctrl">
                    <input type="text" className="FixWidth" name="{field:title}" id="title" maxLength={100} value={this.state.title} onChange={this.fnTitleChanged} />
                </div>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="Label" id="SubTitleLabel">{xlate("QUICKPLOT_SUBTITLE", config.locale) }</div>
                <div className="Ctrl" id="SubTitleCtrl">
                    <input type="text" className="FixWidth" name="{field:sub_title}" id="subtitle" maxLength={100} value={this.state.subTitle} onChange={this.fnSubTitleChanged} />
                </div>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="Label">{xlate("QUICKPLOT_PAPER_SIZE", config.locale) }</div>
                <div className="Ctrl">
                    {/*
                        The pre-defined paper size list. The value for each "option" item is in this format: [width,height]. The unit is in millimeter.
                        We can change the html code to add more paper size or remove some ones.
                    */}
                    <select className="FixWidth" id="paperSizeSelect" name="paperSizeSelect" value={this.state.paperSize} onChange={this.fnPaperSizeChanged}>
                        <option value="210.0,297.0,A4">A4 (210x297 mm; 8.27x11.69 In) </option>
                        <option value="297.0,420.0,A3">A3 (297x420 mm; 11.69x16.54 In) </option>
                        <option value="148.0,210.0,A5">A5 (148x210 mm; 5.83x8.27 in) </option>
                        <option value="216.0,279.0,Letter">Letter (216x279 mm; 8.50x11.00 In) </option>
                        <option value="216.0,356.0,Legal">Legal (216x356 mm; 8.50x14.00 In) </option>
                    </select>
                </div>
                <input type="hidden" id="paperSize" name="paperSize" value={paperSize} />
                <input type="hidden" id="printSize" name="printSize" value={printSize} />
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="Label">{xlate("QUICKPLOT_ORIENTATION", config.locale) }</div>
                <div className="Ctrl">
                    {/*
                        The pre-defined scales. The value for each "option" item is the scale denominator.
                        We can change the html code to extend the pre-defined scales
                    */}
                    <select className="FixWidth" id="orientation" name="orientation" value={this.state.orientation} onChange={this.fnOrientationChanged}>
                        <option value="P">{xlate("QUICKPLOT_ORIENTATION_P", config.locale) }</option>
                        <option value="L">{xlate("QUICKPLOT_ORIENTATION_L", config.locale) }</option>
                    </select>
                </div>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <fieldset>
                    <legend>{xlate("QUICKPLOT_SHOWELEMENTS", config.locale) }</legend>
                    <div className="Label" id="LegendCtrl">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" id="ShowLegendCheckBox" name="ShowLegend" checked={this.state.showLegend} onChange={this.fnShowLegendChanged} /></td>
                                    <td><label htmlFor="ShowLegendCheckBox">{xlate("QUICKPLOT_SHOWLEGEND", config.locale) }</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Label" id="NorthArrowCtrl">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" id="ShowNorthArrowCheckBox" name="ShowNorthArrow" checked={this.state.showNorthBar} onChange={this.fnShowNorthArrowChanged} /></td>
                                    <td><label htmlFor="ShowNorthArrowCheckBox">{xlate("QUICKPLOT_SHOWNORTHARROW", config.locale) }</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Label" id="CoordinatesCtrl">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" id="ShowCoordinatesCheckBox" name="ShowCoordinates" checked={this.state.showCoordinates} onChange={this.fnShowCoordinatesChanged} /></td>
                                    <td><label htmlFor="ShowCoordinatesCheckBox">{xlate("QUICKPLOT_SHOWCOORDINTES", config.locale) }</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Label" id="ScaleBarCtrl">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" id="ShowScaleBarCheckBox" name="ShowScaleBar" checked={this.state.showScaleBar} onChange={this.fnShowScaleBarChanged} /></td>
                                    <td><label htmlFor="ShowScaleBarCheckBox">{xlate("QUICKPLOT_SHOWSCALEBAR", config.locale) }</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="Label" id="DisclaimerCtrl">
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" id="ShowDisclaimerCheckBox" name="ShowDisclaimer" checked={this.state.showDisclaimer} onChange={this.fnShowDisclaimerChanged} /></td>
                                    <td><label htmlFor="ShowDisclaimerCheckBox">{xlate("QUICKPLOT_SHOWDISCLAIMER", config.locale) }</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="Label">
                    <table cellSpacing="0" cellPadding="0">
                        <tbody>
                            <tr>
                                <td><input type="checkbox" id="AdvancedOptionsCheckBox" onChange={this.fnAdvancedOptionsChanged} /></td>
                                <td><label htmlFor="AdvancedOptionsCheckBox">{xlate("QUICKPLOT_ADVANCED_OPTIONS", config.locale) }</label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {(() => {
                    if (this.state.showAdvanced) {
                        return <div>
                            <div className="Label">{xlate("QUICKPLOT_SCALING", config.locale) }</div>
                            <div className="Ctrl">
                                {/*
                                    The pre-defined scales. The value for each "option" item is the scale denominator.
                                    We can change the html code to extend the pre-defined scales
                                */}
                                <select className="FixWidth" id="scaleDenominator" name="scaleDenominator" value={this.state.scale} onChange={this.fnScaleChanged}>
                                    <option value="500">1: 500</option>
                                    <option value="1000">1: 1000</option>
                                    <option value="2500">1: 2500</option>
                                    <option value="5000">1: 5000</option>
                                </select>
                            </div>
                            <div className="Label" id="DPILabel">{xlate("QUICKPLOT_DPI", config.locale) }</div>
                            <div className="Ctrl" id="DPICtrl">
                                {/*
                                    The pre-defined print DPI. 
                                    We can change the html code to extend the pre-defined values
                                */}
                                <select className="FixWidth" id="dpi" name="dpi" value={this.state.dpi} onChange={this.fnDpiChanged}>
                                    <option value="96">96</option>
                                    <option value="150">150</option>
                                    <option value="300">300</option>
                                    <option value="600">600</option>
                                </select>
                            </div>
                        </div>;
                    } else {
                        return <div>
                            <input type="hidden" id="scaleDenominator" name="scaleDenominator" value={`${view.scale}`} />
                            <input type="hidden" id="dpi" name="dpi" value={this.state.dpi} />
                        </div>;
                    }
                })() }
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                <div className="HPlaceholder5px"></div>
                {(() => {
                    if (config.externalBaseLayers && config.externalBaseLayers.length > 0) {
                        return <div id="commercialLayerWarning" className="InfoText">
                            {xlate("QUICKPLOT_COMMERCIAL_LAYER_WARNING", config.locale) }
                        </div>;
                    }
                })()}
                <div className="ButtonContainer FixWidth">
                    <input type="submit" className="Button" value={xlate("QUICKPLOT_GENERATE", config.locale) } onClick={this.fnGeneratePlot} />
                </div>
                <input type="hidden" id="margin" name="margin" />
                <input type="hidden" id="normalizedBox" name="normalizedBox" value={box} />
                <input type="hidden" id="rotation" name="rotation" value={this.state.rotation} />
                <input type="hidden" id="sessionId" name="sessionId" value={map.SessionId} />
                <input type="hidden" id="mapName" name="mapName" value={map.Name} />
                <input type="hidden" id="box" name="box" value={box} />
                <input type="hidden" id="legalNotice" name="legalNotice"/>
            </form>
        </div>;
    }
}