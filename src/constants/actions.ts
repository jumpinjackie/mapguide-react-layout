/**
 * All valid action types
 * 
 * @since 0.12
 */
export enum ActionType {
    SET_LOCALE = 'MapGuide/SET_LOCALE',
    
    INIT_APP = 'MapGuide/INIT_APP',
    INIT_ERROR = 'MapGuide/INIT_ERROR',
    INIT_ACKNOWLEDGE_WARNINGS = 'MapGuide/INIT_ACKNOWLEDGE_WARNINGS',

    LEGEND_SET_GROUP_VISIBILITY = 'Legend/SET_GROUP_VISIBILITY',
    LEGEND_SET_LAYER_VISIBILITY = 'Legend/SET_LAYER_VISIBILITY',
    LEGEND_SET_LAYER_SELECTABLE = 'Legend/SET_LAYER_SELECTABLE',
    LEGEND_SET_GROUP_EXPANDABLE = 'Legend/SET_GROUP_EXPANDABLE',

    MAP_SET_ACTIVE_MAP = 'Map/SET_ACTIVE_MAP',
    MAP_REFRESH = 'Map/REFRESH',
    MAP_SET_VIEW = 'Map/SET_VIEW',
    MAP_SET_SCALE = 'Map/SET_SCALE',
    MAP_SET_ACTIVE_TOOL = 'Map/SET_ACTIVE_TOOL',
    MAP_SET_MAPTIP = 'Map/SET_MAPTIP',
    /**
     * @since 0.14.2
     */
    MAP_ENABLE_SELECT_DRAGPAN = 'Map/ENABLE_SELECT_DRAGPAN',
    MAP_SET_MANUAL_MAPTIP = 'Map/MAP_SET_MANUAL_MAPTIP',
    MAP_SET_SELECTION = 'Map/SET_SELECTION',
    /**
     * @since 0.14
     */
    MAP_ADD_CLIENT_SELECTED_FEATURE = 'Map/ADD_CLIENT_SELECTED_FEATURE',
    /**
     * @since 0.14
     */
    MAP_CLEAR_CLIENT_SELECTION = 'Map/CLEAR_CLIENT_SELECTION',
    MAP_SET_BUSY_COUNT = 'Map/SET_BUSY_COUNT',
    MAP_SET_BASE_LAYER = 'Map/SET_BASE_LAYER',
    MAP_ZOOM_IN = 'Map/ZOOM_IN',
    MAP_ZOOM_OUT = 'Map/ZOOM_OUT',
    MAP_PREVIOUS_VIEW = 'Map/PREVIOUS_VIEW',
    MAP_NEXT_VIEW = 'Map/NEXT_VIEW',
    MAP_SET_LAYER_TRANSPARENCY = 'Map/SET_LAYER_TRANSPARENCY',
    MAP_SET_VIEW_SIZE_UNITS = 'Map/SET_VIEW_SIZE_UNITS',
    MAP_SET_VIEW_ROTATION = 'Map/SET_VIEW_ROTATION',
    MAP_SET_VIEW_ROTATION_ENABLED = 'Map/SET_VIEW_ROTATION_ENABLED',
    MAP_RESIZED = 'Map/RESIZED',
    MAP_SHOW_SELECTED_FEATURE = 'Map/SHOW_SELECTED_FEATURE',

    TASK_INVOKE_URL = 'TaskPane/INVOKE_URL',
    TASK_PANE_HOME = 'TaskPane/HOME',
    TASK_PANE_FORWARD = 'TaskPane/FORWARD',
    TASK_PANE_BACK = 'TaskPane/BACK',
    TASK_PANE_PUSH_URL = 'TaskPane/PUSH_URL',

    FUSION_SET_ELEMENT_STATE = 'Fusion/SET_ELEMENT_STATE',
    FUSION_SET_TASK_PANE_VISIBILITY = 'Fusion/SET_TASK_PANE_VISIBILITY',
    FUSION_SET_LEGEND_VISIBILITY = 'Fusion/SET_LEGEND_VISIBILITY',
    FUSION_SET_SELECTION_PANEL_VISIBILITY = 'Fusion/SET_SELECTION_PANEL_VISIBILITY',
    //FUSION_SET_OVERVIEW_MAP_VISIBILITY = 'Fusion/SET_OVERVIEW_MAP_VISIBILITY',
    /**
     * @since 0.14.8
     */
    FUSION_SET_TEMPLATE_CUSTOM_DATA = 'Fusion/SET_TEMPLATE_CUSTOM_DATA',
    FLYOUT_OPEN = 'Flyout/OPEN',
    FLYOUT_CLOSE = 'Flyout/CLOSE',
    CONTEXT_MENU_OPEN  = 'ContextMenu/OPEN',
    CONTEXT_MENU_CLOSE = 'ContextMenu/CLOSE',
    COMPONENT_OPEN = 'Flyout/COMPONENT_OPEN',
    COMPONENT_CLOSE = 'Flyout/COMPONENT_CLOSE',
    UPDATE_MOUSE_COORDINATES = 'Status/UPDATE_MOUSE_COORDINATES',
    MODAL_SHOW_COMPONENT = 'Modal/SHOW_COMPONENT',
    MODAL_SHOW_URL = 'Modal/SHOW_URL',
    MODAL_CLOSE = 'Modal/CLOSE',
    /**
     * @since 0.14.8
     */
    MODAL_UPDATE = 'Modal/UPDATE',

    /**
     * @since 0.13
     */
    LAYER_ADDED = 'Map/LAYER_ADDED',
    /**
     * @since 0.14
     */
    EXTERNAL_LAYERS_READY = 'Map/EXTERNAL_LAYERS_READY',
    /**
     * @since 0.13
     */
    REMOVE_LAYER = 'Map/REMOVE_LAYER',
    /**
     * @since 0.13
     */
    SET_LAYER_INDEX = 'Map/SET_LAYER_INDEX',
    /**
     * @since 0.13
     */
    SET_LAYER_OPACITY = 'Map/SET_LAYER_OPACITY',
    /**
     * @since 0.13
     */
    SET_LAYER_VISIBILITY = 'Map/SET_LAYER_VISIBILITY',
    /**
     * @since 0.13
     */
    SET_LAYER_VECTOR_STYLE = 'Map/SET_LAYER_VECTOR_STYLE',
    /**
     * @since 0.13
     */
    ADD_LAYER_BUSY_WORKER = 'Map/ADD_LAYER_BUSY_WORKER',
    /**
     * @since 0.13
     */
    REMOVE_LAYER_BUSY_WORKER = 'Map/REMOVE_LAYER_BUSY_WORKER',
    /**
     * @since 0.14
     */
    SET_HEATMAP_LAYER_BLUR = 'Map/SET_HEATMAP_LAYER_BLUR',
    /**
     * @since 0.14
     */
    SET_HEATMAP_LAYER_RADIUS = 'Map/SET_HEATMAP_LAYER_RADIUS',
    /**
     * @since 0.14.8
     */
    SET_APP_SETTING = 'MapGuide/SET_APP_SETTING'
}