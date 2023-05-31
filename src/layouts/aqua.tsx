import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { ViewerApiShim } from "../containers/viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { FlyoutRegionContainer } from "../containers/flyout-region";
import { RndModalDialog } from "../components/modal-dialog";
import { tr } from "../api/i18n";
import { ITemplateReducerState } from "../api/common";
import { InitWarningDisplay } from "../containers/init-warning-display";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { useCommonTemplateState } from './hooks';
import { useTemplateCustomData, useTemplateInitialInfoPaneWidth, useTemplateInitialTaskPaneWidth } from '../containers/hooks';
import { setLegendVisibility, setSelectionPanelVisibility, setTaskPaneVisibility, setTemplateCustomData } from '../actions/template';
import { useActiveMapState } from '../containers/hooks-mapguide';
import { useActiveMapSubjectLayer } from "../containers/hooks-generic";

function aquaTemplateReducer(origState: ITemplateReducerState, state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
    switch (action.type) {
        case ActionType.MAP_SET_SELECTION:
            {
                //This is the only template that does not conform to the selection/legend/taskpane is a mutually
                //exclusive visible set. We take advantage of the custom template reducer function to apply the
                //correct visibility state against the *original state* effectively discarding whatever the root
                //template reducer has done against this action.
                const { selection } = action.payload;
                if (selection && selection.SelectedFeatures) {
                    if (selection.SelectedFeatures.SelectedLayer.length && origState.autoDisplaySelectionPanelOnSelection) {
                        return {
                            ...origState,
                            ...{ selectionPanelVisible: true }
                        }
                    }
                }
                return state; //No action taken: Return "current" state
            }
        case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE:
            {
                //This is the only template that does not conform to the selection/legend/taskpane is a mutually
                //exclusive visible set. We take advantage of the custom template reducer function to apply the
                //correct visibility state against the *original state* effectively discarding whatever the root
                //template reducer has done against this action.
                const { feature } = action.payload;
                if (feature?.properties) {
                    return {
                        ...origState,
                        ...{ selectionPanelVisible: true }
                    }
                }
                return state; //No action taken: Return "current" state
            }
        case ActionType.FUSION_SET_LEGEND_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState> = { legendVisible: data };
                    return { ...state, ...state1 };
                }
            }
        case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState> = { selectionPanelVisible: data };
                    return { ...state, ...state1 };
                }
            }
        case ActionType.TASK_INVOKE_URL:
            {
                let state1: Partial<ITemplateReducerState> = { taskPaneVisible: true };
                return { ...state, ...state1 };
            }
        case ActionType.FUSION_SET_TASK_PANE_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState> = { taskPaneVisible: data };
                    return { ...state, ...state1 };
                }
            }
    }
    return state;
}

const SELECTION_DIALOG_HEIGHT = 300;
const LEGEND_DIALOG_HEIGHT = 400;
const TASK_DIALOG_HEIGHT = 500;
const STATUS_BAR_HEIGHT = 18;

/**
 * A viewer template that resembles the Aqua Fusion template
 */
export const AquaTemplateLayout = () => {
    const {
        locale,
        capabilities,
        showSelection,
        showLegend,
        showTaskPane,
        dispatch
    } = useCommonTemplateState(aquaTemplateReducer);
    const posLegend = useTemplateCustomData("AQUA_LEGEND_POS");
    const sizeLegend = useTemplateCustomData("AQUA_LEGEND_SIZE");
    const posSelection = useTemplateCustomData("AQUA_SELECTION_POS");
    const sizeSelection = useTemplateCustomData("AQUA_SELECTION_SIZE");
    const posTaskPane = useTemplateCustomData("AQUA_TASKPANE_POS");
    const sizeTaskPane = useTemplateCustomData("AQUA_TASKPANE_SIZE");
    const map = useActiveMapState();
    const subject = useActiveMapSubjectLayer();
    const hideLegend = () => dispatch(setLegendVisibility(false));
    const hideSelection = () => dispatch(setSelectionPanelVisibility(false));
    const hideTaskPane = () => dispatch(setTaskPaneVisibility(false));
    const onHideTaskPane = () => hideTaskPane();
    const onHideLegend = () => hideLegend();
    const onHideSelection = () => hideSelection();
    let hasTaskPane = false;
    let hasStatusBar = false;
    let hasNavigator = false;
    let hasSelectionPanel = false;
    let hasLegend = false;
    if (capabilities) {
        hasTaskPane = capabilities.hasTaskPane;
        hasStatusBar = capabilities.hasStatusBar;
        hasNavigator = capabilities.hasNavigator;
        hasSelectionPanel = capabilities.hasSelectionPanel;
        hasLegend = capabilities.hasLegend;
    }
    const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
    let left = DEFAULT_TOOLBAR_SIZE;
    let right = 0;
    /*
    if (hasLegend || hasSelectionPanel) {
        left = sbWidth;
    }
    if (hasTaskPane) {
        right = tpWidth;
    }*/
    const TB_Z_INDEX = 0;
    const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
    const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
    return <div style={{ width: "100%", height: "100%" }}>
        <ToolbarContainer id="FileMenu" containerClass="aqua-file-menu" containerStyle={{ position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 }} />
        <ToolbarContainer id="Toolbar" containerClass="aqua-toolbar" containerStyle={{ position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE, height: DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 }} />
        <ToolbarContainer id="ToolbarVertical" containerClass="aqua-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: 0, top: ((DEFAULT_TOOLBAR_SIZE * 2) - 1), zIndex: TB_Z_INDEX, bottom: bottomOffset }} />
        <div style={{ position: "absolute", left: left, top: (DEFAULT_TOOLBAR_SIZE * 2), bottom: bottomOffset, right: right }}>
            {(() => {
                //NOTE: We have to delay render this behind an IIFE because otherwise this component may be mounted with
                //sidebar elements not being ready, which may result in a distorted OL map when it mounts, requiring a updateSize()
                //call to fix
                const theMap = map ?? subject;
                if (theMap) {
                    return <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />;
                }
            })()}
            {(() => {
                if (hasNavigator) {
                    return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                }
            })()}
        </div>
        {(() => {
            if (hasStatusBar) {
                return <div className="aqua-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                    <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                </div>;
            }
        })()}
        <ViewerApiShim />
        <ModalLauncher>
            {(() => {
                if (hasSelectionPanel) {
                    const pos = posSelection ?? [40, 500];
                    const size = sizeSelection ?? [initInfoPaneWidth, SELECTION_DIALOG_HEIGHT];
                    return <RndModalDialog
                        icon="th"
                        locale={locale}
                        isOpen={!!showSelection}
                        onClose={onHideSelection}
                        title={tr("TPL_TITLE_SELECTION_PANEL", locale)}
                        onChange={args => {
                            dispatch(setTemplateCustomData("AQUA_SELECTION_POS", [args.x, args.y]));
                            dispatch(setTemplateCustomData("AQUA_SELECTION_SIZE", [args.width, args.height]));
                        }}
                        x={pos[0]}
                        y={pos[1]}
                        width={size[0]}
                        height={size[1]}

                        disableYOverflow={true}
                        enableInteractionMask={true}>
                        {([, h]) => <PlaceholderComponent locale={locale} id={DefaultComponentNames.SelectionPanel} componentProps={{ maxHeight: h }} />}
                    </RndModalDialog>
                }
            })()}
            {(() => {
                if (hasLegend) {
                    const pos = posLegend ?? [40, 70];
                    const size = sizeLegend ?? [initInfoPaneWidth, LEGEND_DIALOG_HEIGHT];
                    return <RndModalDialog
                        icon="layers"
                        locale={locale}
                        isOpen={!!showLegend}
                        onClose={onHideLegend}
                        title={tr("TPL_TITLE_LEGEND", locale)}
                        onChange={args => {
                            dispatch(setTemplateCustomData("AQUA_LEGEND_POS", [args.x, args.y]));
                            dispatch(setTemplateCustomData("AQUA_LEGEND_SIZE", [args.width, args.height]));
                        }}
                        x={pos[0]}
                        y={pos[1]}
                        width={size[0]}
                        height={size[1]}
                        enableInteractionMask={true}>
                        {([, h]) => <PlaceholderComponent locale={locale} id={DefaultComponentNames.Legend} componentProps={{ inlineBaseLayerSwitcher: false, maxHeight: h }} />}
                    </RndModalDialog>
                }
            })()}
            {(() => {
                if (hasTaskPane) {
                    const pos = posTaskPane ?? [document.body.clientWidth - initTaskPaneWidth - 70, 80];
                    const size = sizeTaskPane ?? [initTaskPaneWidth, TASK_DIALOG_HEIGHT];
                    return <RndModalDialog
                        icon="application"
                        locale={locale}
                        isOpen={!!showTaskPane}
                        onClose={onHideTaskPane}
                        onChange={args => {
                            dispatch(setTemplateCustomData("AQUA_TASKPANE_POS", [args.x, args.y]));
                            dispatch(setTemplateCustomData("AQUA_TASKPANE_SIZE", [args.width, args.height]));
                        }}
                        width={size[0]}
                        height={size[1]}
                        title={tr("TPL_TITLE_TASKPANE", locale)}
                        x={pos[0]}
                        y={pos[1]}
                        disableYOverflow={true}
                        enableInteractionMask={false}>
                        {([, h]) => <PlaceholderComponent locale={locale} id={DefaultComponentNames.TaskPane} componentProps={{ maxHeight: h - 15 /* some height breathing space */ }} />}
                    </RndModalDialog>;
                }
            })()}
        </ModalLauncher>
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>;
};