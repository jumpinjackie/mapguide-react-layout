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
import { ActionType } from '../constants/actions';
import { ViewerAction } from '../actions/defs';
import { useCommonTemplateState } from './hooks';
import { useTemplateInitialInfoPaneWidth, useTemplateInitialTaskPaneWidth } from '../containers/hooks';
import { SplitterLayout } from "../components/splitter-layout";

function slateTemplateReducer(origState: ITemplateReducerState, state: ITemplateReducerState, action: ViewerAction): ITemplateReducerState {
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
const ACCORDION_STYLE: React.CSSProperties = { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 };
const DEFAULT_LEGEND_COMPONENT_PROPS = { inlineBaseLayerSwitcher: false };

/**
 * A viewer template that resembles the Slate Fusion template
 */
export const SlateTemplateLayout = () => {
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
    } = useCommonTemplateState(slateTemplateReducer);
    let hasStatusBar = false;
    let hasNavigator = false;
    if (capabilities) {
        hasStatusBar = capabilities.hasStatusBar;
        hasNavigator = capabilities.hasNavigator;
    }
    const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
    const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
    const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
    const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
    const topOffset = (DEFAULT_TOOLBAR_SIZE * 3);
    const panels: IAccordionPanelSpec[] = React.useMemo(() => [
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
    const TB_Z_INDEX = 0;
    return <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }}>
            <SplitterLayout customClassName="slate-splitter" primaryIndex={1} secondaryInitialSize={sbWidth} onSecondaryPaneSizeChange={onSplitterChanged} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                {(() => {
                    if (showSelection || showTaskPane || showLegend) {
                        return <div>
                            <Accordion style={ACCORDION_STYLE} onActivePanelChanged={onActiveElementChanged} activePanelId={activeId} panels={panels} isResizing={isResizing} />
                        </div>;
                    }
                })()}
                <div>
                    <ToolbarContainer id="FileMenu" containerClass="slate-file-menu" containerStyle={{ position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 }} />
                    <ToolbarContainer id="Toolbar" containerClass="slate-toolbar" containerStyle={{ position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 }} />
                    <ToolbarContainer id="ToolbarSecondary" containerClass="slate-toolbar-secondary" containerStyle={{ position: "absolute", left: 0, top: (DEFAULT_TOOLBAR_SIZE * 2), zIndex: TB_Z_INDEX, right: 0 }} />
                    <div style={{ position: "absolute", left: 0, right: 0, top: topOffset, bottom: 0 }}>
                        <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                        {(() => {
                            if (hasNavigator) {
                                return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                            }
                        })()}
                    </div>
                    <ViewerApiShim />
                </div>
            </SplitterLayout>
        </div>
        {(() => {
            if (hasStatusBar) {
                return <div className="slate-status-bar" style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }}>
                    <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.PoweredByMapGuide} locale={locale} />
                </div>;
            }
        })()}
        <ModalLauncher />
        <FlyoutRegionContainer />
        <InitWarningDisplay />
    </div>;
}