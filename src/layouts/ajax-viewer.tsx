import * as React from "react";
import { PlaceholderComponent, DefaultComponentNames } from "../api/registry/component";
import { DEFAULT_TOOLBAR_SIZE, TOOLBAR_BACKGROUND_COLOR } from "../components/toolbar";
import { ToolbarContainer } from "../containers/toolbar";
import { FlyoutRegionContainer } from "../containers/flyout-region";
import { ViewerApiShim } from "../containers/viewer-shim";
import { ModalLauncher } from "../containers/modal-launcher";
import { InitWarningDisplay } from "../containers/init-warning-display";
import SplitterLayout from "react-splitter-layout";
import { tr } from "../api/i18n";
import { useCommonTemplateState } from './hooks';
import { useTemplateInitialInfoPaneWidth, useTemplateInitialTaskPaneWidth } from '../containers/hooks';
import { WEBLAYOUT_TOOLBAR } from '../constants';

const DEFAULT_LEGEND_COMPONENT_PROPS = { inlineBaseLayerSwitcher: true };

/**
 * A viewer template that resembles the MapGuide AJAX viewer
 */
export const AjaxViewerLayout = () => {
    const {
        isResizing,
        locale,
        capabilities,
        onDragStart,
        onDragEnd,
        onSplitterChanged
    } = useCommonTemplateState();
    const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
    const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
    let hasToolbar = false;
    let hasTaskPane = false;
    let hasStatusBar = false;
    let hasNavigator = false;
    let hasSelectionPanel = false;
    let hasLegend = false;
    if (capabilities) {
        hasToolbar = capabilities.hasToolbar;
        hasTaskPane = capabilities.hasTaskPane;
        hasStatusBar = capabilities.hasStatusBar;
        hasNavigator = capabilities.hasNavigator;
        hasSelectionPanel = capabilities.hasSelectionPanel;
        hasLegend = capabilities.hasLegend;
    }
    const TB_Z_INDEX = 10;
    const topOffset = hasToolbar ? DEFAULT_TOOLBAR_SIZE : 0;
    const bottomOffset = hasStatusBar ? 20 : 0;
    const lgStyle = {};
    const selStyle = {};
    return <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: bottomOffset }}>
            <SplitterLayout customClassName="ajax-viewer-splitter" primaryIndex={0} secondaryInitialSize={initTaskPaneWidth} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div>
                    {(() => {
                        if (hasToolbar) {
                            return <ToolbarContainer id={WEBLAYOUT_TOOLBAR} containerStyle={{ position: "absolute", left: 0, top: 0, right: 0, zIndex: TB_Z_INDEX, backgroundColor: TOOLBAR_BACKGROUND_COLOR }} />;
                        }
                    })()}
                    <div style={{ position: "absolute", left: 0, top: topOffset, bottom: 0, right: 0 }}>
                        <SplitterLayout customClassName="ajax-viewer-splitter" primaryIndex={1} secondaryInitialSize={initInfoPaneWidth} onSecondaryPaneSizeChange={onSplitterChanged}>
                            {(() => {
                                if (hasLegend || hasSelectionPanel) {
                                    return <SplitterLayout customClassName="ajax-viewer-splitter" vertical={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                                        {(() => {
                                            if (hasLegend) {
                                                return <div className="ajax-sidebar-panel" style={lgStyle}>
                                                    <div className="ajax-sidebar-panel-heading">
                                                        <p>{tr("TPL_TITLE_LEGEND", locale)}</p>
                                                    </div>
                                                    <div className="ajax-sidebar-panel-body">
                                                        <PlaceholderComponent id={DefaultComponentNames.Legend} locale={locale} componentProps={DEFAULT_LEGEND_COMPONENT_PROPS} />
                                                    </div>
                                                </div>;
                                            }
                                        })()}
                                        {(() => {
                                            if (hasSelectionPanel) {
                                                return <div className="ajax-sidebar-panel" style={selStyle}>
                                                    <div className="ajax-sidebar-panel-heading">
                                                        <p>{tr("TPL_TITLE_SELECTION_PANEL", locale)}</p>
                                                    </div>
                                                    <div className="ajax-sidebar-panel-body">
                                                        <PlaceholderComponent id={DefaultComponentNames.SelectionPanel} locale={locale} />
                                                    </div>
                                                </div>;
                                            }
                                        })()}
                                    </SplitterLayout>;
                                }
                            })()}
                            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
                                <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />
                                {(() => {
                                    if (hasNavigator) {
                                        return <PlaceholderComponent id={DefaultComponentNames.Navigator} locale={locale} />;
                                    }
                                })()}
                            </div>
                        </SplitterLayout>
                    </div>
                </div>
                {(() => {
                    if (hasTaskPane) {
                        return <PlaceholderComponent locale={locale} id={DefaultComponentNames.TaskPane} componentProps={{ isResizing: isResizing }} />;
                    }
                })()}
            </SplitterLayout>
        </div>
        {(() => {
            if (hasStatusBar) {
                return <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: bottomOffset, backgroundColor: TOOLBAR_BACKGROUND_COLOR }}>
                    <PlaceholderComponent id={DefaultComponentNames.MouseCoordinates} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ScaleDisplay} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.ViewSize} locale={locale} />
                    <PlaceholderComponent id={DefaultComponentNames.SelectedFeatureCount} locale={locale} />
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