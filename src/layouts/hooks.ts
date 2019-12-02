import * as React from "react";
import { useViewerLocale, useConfiguredCapabilities, useTemplateSelectionVisible, useTemplateLegendVisible, useTemplateTaskPaneVisible } from '../containers/hooks';
import { useDispatch } from 'react-redux';
import { IElementState, ViewerAction } from '../actions/defs';
import * as TemplateActions from "../actions/template";
import * as Runtime from "../api/runtime";
import { ITemplateReducerState, IViewerCapabilities } from '../api/common';
import { setCustomTemplateReducer } from '../reducers/template';

export type TemplateReducerFunc = (state: ITemplateReducerState, action: ViewerAction) => ITemplateReducerState;

export type CommonTemplateState = {
    isResizing: boolean;
    setIsResizing: (flag: boolean) => void;
    locale: string;
    capabilities: IViewerCapabilities;
    showSelection: boolean;
    showLegend: boolean;
    showTaskPane: boolean;
    onDragStart: () => void;
    onDragEnd: () => void;
    onSplitterChanged: () => void;
    onActiveElementChanged: (id: "Legend" | "TaskPane" | "Selection") => void;
};

export function useCommonTemplateState(templateReducer?: TemplateReducerFunc): CommonTemplateState {
    //TODO: To promote more reusability, the resizing flag should be defined and set on a 
    //dispatcher-defined basis.
    //
    //ie. A template could have more than 1 resizing flag. Right now, the AJAX viewer template is
    //one such template, which awkwardly shows "Task Pane is resizing" UI when resizing the info pane
    //(on the opposite side of the task pane!) due to this current limitation when it uses this hook
    const [isResizing, setIsResizing] = React.useState(false);
    const locale = useViewerLocale();
    const capabilities = useConfiguredCapabilities();
    const showSelection = useTemplateSelectionVisible();
    const showLegend = useTemplateLegendVisible();
    const showTaskPane = useTemplateTaskPaneVisible();
    const dispatch = useDispatch();
    const setElementStates = (states: IElementState) => dispatch(TemplateActions.setElementStates(states));
    const onDragStart = () => setIsResizing(true);
    const onDragEnd = () => setIsResizing(false);
    //componentDidMount
    React.useEffect(() => {
        if (templateReducer) {
            setCustomTemplateReducer(templateReducer);
        }
    }, []);
    const onSplitterChanged = () => {
        //With the introduction of the splitter, we can no longer rely on a map 
        //filling 100% of its space without needing to manually call updateSize(),
        //so we do it here
        const viewer = Runtime.getViewer();
        if (viewer) {
            viewer.updateSize();
        }
    };
    const onActiveElementChanged = (id: "Legend" | "TaskPane" | "Selection") => {
        const states: IElementState = {
            legendVisible: false,
            taskPaneVisible: false,
            selectionPanelVisible: false
        };
        switch (id) {
            case "Legend":
                states.legendVisible = true;
                break;
            case "TaskPane":
                states.taskPaneVisible = true;
                break;
            case "Selection":
                states.selectionPanelVisible = true;
                break;
        }
        //One of these must be true
        if (states.legendVisible || states.taskPaneVisible || states.selectionPanelVisible)
            setElementStates(states);
    };
    return {
        isResizing,
        setIsResizing,
        locale,
        capabilities,
        showSelection,
        showLegend,
        showTaskPane,
        onDragStart,
        onDragEnd,
        onSplitterChanged,
        onActiveElementChanged,
    };
}