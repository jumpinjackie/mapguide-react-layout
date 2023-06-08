import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { ViewerApiShim } from "../containers/viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { FlyoutRegionContainer } from "../containers/flyout-region";
import { tr } from "../api/i18n";
import { ITemplateReducerState } from "../api/common";
import { Accordion, IAccordionPanelSpec, IAccordionPanelContentDimensions } from "../components/accordion";
import { isElementState } from "../reducers/template";
import { InitWarningDisplay } from "../containers/init-warning-display";
import SplitterLayout from "react-splitter-layout";
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { useCommonTemplateState } from './hooks';
import { useTemplateInitialInfoPaneWidth, useTemplateInitialTaskPaneWidth } from '../containers/hooks';

function maroonTemplateReducer(origState: ITemplateReducerState, state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
    switch (action.type) {
        case ActionType.FUSION_SET_LEGEND_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState>;
                    if (data === true) {
                        state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
                    } else {
                        state1 = { legendVisible: data };
                    }
                    return { ...state, ...state1 };
                }
            }
        case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState>;
                    if (data === true) {
                        state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
                    } else {
                        state1 = { selectionPanelVisible: data };
                    }
                    return { ...state, ...state1 };
                }
            }
        case ActionType.TASK_INVOKE_URL:
            {
                let state1: Partial<ITemplateReducerState> = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
                return { ...state, ...state1 };
            }
        case ActionType.FUSION_SET_TASK_PANE_VISIBILITY:
            {
                const data = action.payload;
                if (typeof (data) == "boolean") {
                    let state1: Partial<ITemplateReducerState>;
                    if (data === true) {
                        state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
                    } else {
                        state1 = { taskPaneVisible: data };
                    }
                    return { ...state, ...state1 };
                }
            }
        case ActionType.FUSION_SET_ELEMENT_STATE:
            {
                const data = action.payload;
                if (isElementState(data)) {
                    return { ...state, ...data };
                }
            }
    }
    return state;
}

const STATUS_BAR_HEIGHT = 18;
const OUTER_PADDING = 3;
const ACCORDION_STYLE: React.CSSProperties = { position: "absolute", top: OUTER_PADDING, bottom: 0, right: OUTER_PADDING, left: 0 };
const DEFAULT_LEGEND_COMPONENT_PROPS = { inlineBaseLayerSwitcher: false };

/**
 * A viewer template that resembles the Maroon Fusion template
 */
export const MaroonTemplateLayout = () => {
    const {
        isResizing,
        locale,
        capabilities,
        showSelection,
        showLegend,
        showTaskPane,
        onDragStart,
        onDragEnd,
        onSplitterChanged,
        onActiveElementChanged,
    } = useCommonTemplateState(maroonTemplateReducer);
    let hasStatusBar = false;
    let hasNavigator = false;
    if (capabilities) {
        hasStatusBar = capabilities.hasStatusBar;
        hasNavigator = capabilities.hasNavigator;
    }
    const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
    const topOffset = (DEFAULT_TOOLBAR_SIZE * 2) + OUTER_PADDING;
    const panels: IAccordionPanelSpec[] = React.useMemo(() =>[
        {
            id: "Legend",
            title: tr("TPL_TITLE_LEGEND", locale),
            contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                    <PlaceholderComponent id={DefaultComponentNames.Legend}
                        locale={locale}
                        componentProps={DEFAULT_LEGEND_COMPONENT_PROPS} />
                </div>;
            }
        },
        {
            id: "Selection",
            title: tr("TPL_TITLE_SELECTION_PANEL", locale),
            contentRenderer: (dim: IAccordionPanelContentDimensions) => {
                return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                    <PlaceholderComponent id={DefaultComponentNames.SelectionPanel}
                        locale={locale} />
                </div>;
            }
        },
        {
            id: "TaskPane",
            title: tr("TPL_TITLE_TASKPANE", locale),
            contentRenderer: (dim: IAccordionPanelContentDimensions, isResizing?: boolean) => {
                return <div style={{ width: dim.width, height: dim.height, overflowY: "auto" }}>
                    <PlaceholderComponent id={DefaultComponentNames.TaskPane}
                        locale={locale}
                        componentProps={{ isResizing: isResizing }} />
                </div>;
            }
        }
    ], [locale]);
    let activeId;
    const states = [
        { id: "Selection", visible: showSelection },
        { id: "TaskPane", visible: showTaskPane },
        { id: "Legend", visible: showLegend }
    ];
    const active = states.filter(st => st.visible);
    if (active.length == 1) {
        activeId = active[0].id;
    }
    const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
    const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
    const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
    const TB_Z_INDEX = 0;
    return <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }}>
            <SplitterLayout customClassName="maroon-splitter" primaryIndex={0} secondaryInitialSize={sbWidth} onSecondaryPaneSizeChange={onSplitterChanged} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div>
                    <ToolbarContainer id="FileMenu" containerClass="maroon-file-menu" containerStyle={{ position: "absolute", left: OUTER_PADDING, top: OUTER_PADDING, right: 0, zIndex: TB_Z_INDEX }} />
                    <ToolbarContainer id="Toolbar" containerClass="maroon-toolbar" containerStyle={{ position: "absolute", left: OUTER_PADDING, top: DEFAULT_TOOLBAR_SIZE + OUTER_PADDING, right: 0, zIndex: TB_Z_INDEX }} />
                    <ToolbarContainer id="ToolbarVertical" containerClass="maroon-toolbar-vertical" vertical={true} containerStyle={{ position: "absolute", left: OUTER_PADDING, top: topOffset, bottom: 0, zIndex: TB_Z_INDEX, right: 0 }} />
                    <div style={{ position: "absolute", left: OUTER_PADDING + DEFAULT_TOOLBAR_SIZE, right: 0, top: topOffset, bottom: 0 }}>
                        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                        {(() => {
                            if (hasNavigator) {
                                return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                            }
                        })()}
                    </div>
                </div>
                {(() => {
                    if (showSelection || showTaskPane || showLegend) {
                        return <div>
                            <Accordion style={ACCORDION_STYLE} onActivePanelChanged={onActiveElementChanged} activePanelId={activeId} panels={panels} isResizing={isResizing} />
                        </div>;
                    }
                })()}
            </SplitterLayout>
        </div>
        {(() => {
            if (hasStatusBar) {
                return <div className="maroon-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                    <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                </div>;
            }
        })()}
        <ViewerApiShim />
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>;
};