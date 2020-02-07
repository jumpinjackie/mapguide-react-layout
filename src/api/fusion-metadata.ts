import { CommandTarget, SelectionVariant } from './common';

/**
 * @widget Select
 * @description A widget that allows selection of features on a map
 * @label Select
 * @tooltip Click to select features
 * @icon select
 * @containableby Any
 */
export interface ISelectCommandParameters { }

/**
 * @widget WmsQuery
 * @description A widget that allows selection of features from WMS layers on a map
 * @label WmsQuery
 * @tooltip Click to query for features in WMS layers at the point you click
 * @icon select
 * @containableby Any
 */
export interface IWmsQueryCommandParameters { }

/**
 * @widget Pan
 * @description Pans the map
 * @label Pan
 * @tooltip Click and drag to pan the map
 * @icon pan
 * @containableby Any
 */
export interface IPanParameters { }

/**
 * @widget Zoom
 * @description Zooms in on the map
 * @label Zoom Rectangle
 * @tooltip Click or click and drag on the map to zoom in
 * @statustext Click or click and drag on the map to zoom in
 * @icon zoom-in
 * @containableby Any
 */
export interface IZoomCommandParameters { }

/**
 * @widget ZoomOnClick
 * @description Zoom the map by a fixed amount when a button is clicked
 * @containableby Any
 */
export interface IZoomOnClickCommandParameters {

    /**
     * @description The factor to zoom by. Values less than 0 zoom out.
     * @type double
     * @label Factor
     * @defaultvalue 2
     */
    Factor?: string;
}

/**
 * @widget PanLeft
 * @description Click to pan the map to the left by a fixed amount when a button is clicked
 * @containableby Any
 */
export interface IPanLeftCommandParameters { }

/**
 * @widget PanRight
 * @description Click to pan the map to the right by a fixed amount when a button is clicked
 * @containableby Any
 */
export interface IPanRightCommandParameters { }

/**
 * @widget PanUp
 * @description Click to pan the map up by a fixed amount when a button is clicked
 * @containableby Any
 */
export interface IPanUpCommandParameters { }

/**
 * @widget PanDown
 * @description Click to pan the map down by a fixed amount when a button is clicked
 * @containableby Any
 */
export interface IPanDownCommandParameters { }

/**
 * @widget MapTip
 * @provider MapGuide
 * @description A widget to display information about features under the mouse as it hovers over the map
 * @label Maptip
 * @tooltip Click to Enable/Disable get information about features from Server
 * @icon maptip
 * @containableby Any
 */
export interface IMapTipCommandParameters { }

/**
 * @widget About
 * @description This widget displays information about the application including the license and copyright information retrieved from a URL set as a parameter
 * @label About
 * @tooltip Click to show information about this application
 * @icon about
 * @containableby Any
 */
export interface IAboutCommandParameters { }

/**
 * @widget Help
 * @description Outputs a user help page
 * @label Help
 * @tooltip Click to get help
 * @icon help
 * @containableby Any
 */
export interface IHelpCommandParameters { }

export interface ITargetedCommandParameters {
    /**
     * @widgetDesc The frame, window, or TaskPane in which to display any UI for the widget. If empty, a new window is used
     * @widgetLabel Target
     * @widgetDefaultValue NewWindow
     */
    Target?: CommandTarget;
    /**
     * @widgetDesc The name of the frame the command will run if if the target is a specific frame
     * @widgetLabel Target Frame
     */
    TargetFrame?: string;
}

/**
 * @widget Measure
 * @description A widget that allows measurements to be made on the map
 * @label Measure
 * @tooltip Measure distances and areas on the map
 * @icon measure
 * @containableby Any
 */
export interface IMeasureCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget QuickPlot
 * @description This widget offers a quick way to generate a printable PDF of the map
 * @label Quick Plot
 * @tooltip Click to create a PDF plot
 * @containableby Any
 */
export interface IQuickPlotCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget ViewerOptions
 * @description A widget to allow setting various viewer options
 * @label Options
 * @tooltip Click to change the viewer options
 * @icon options
 * @containableby Any
 */
export interface IViewerOptionsCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget Redline
 * @provider MapGuide
 * @description This widget opens a panel in the TaskPane and allows the user to digitize features that can be downloaded in various formats or uploaded to restore previously digitized features.
 * @label Redline
 * @tooltip Click to draw redline features
 * @icon redline
 * @containableby Any
 */
export interface IRedlineCommandParameters extends ITargetedCommandParameters {
    /**
     * @description The default data store format. Valid values include: SDF, SHP or SQLite
     * @label Data Store Format
     * @allowedvales [{SDF|SDF},{SHP|SHP},{SQLite|SQLite}]
     */
    DataStoreFormat?: string;
    /**
     * @description Determines which type of stylization to use for rendering redline features.
     * @label Stylization Type
     * @allowedvalues [{basic|Basic Stylization},{advanced|Advanced (Composite) Stylization}]
     * @defaultvalue basic
     */
    StylizationType?: string;
    /**
     * @description The types of redline geometry that the user can record. If the data store is SHP, only one geometry type can be specified. Value is a bitmask of any of the following values: (1=point, 2=line, 4=polygon)
     * @type integer
     * @label Geometry Format
     * @allowedvalues [{1|Point},{2|Line},{4|Polygon},{3|Point+Line}|{5|Point+Polygon},{6|Line+Polygon},{7|Point+Line+Polygon}]
     * @defaultvalue 7
     */
    RedlineGeometryFormat?: string;
    /**
     * @description If DataStoreFormat and RedlineGeometryFormat parameters are specified, determines if the redline data store is automatically created on widget invocation. If true, the widget starts off in the Redline editing page instead of the Redline Management page
     * @type boolean
     * @label Auto-Create on Startup
     * @defaultvalue true
     */
    AutoCreateOnStartup?: string;
    /**
     * @description Indicates to use the map message bar for digitization prompts. Default is true
     * @type boolean
     * @label Use Map Message
     * @defaultvalue true
     */
    UseMapMessage?: string;
}

export interface ISelectToolCommandParameters {
    /**
     * The type of selection to do
     * 
     * @widgetLabel Selection type
     * @widgetType String
     * @widgetDefault INTERSECTS
     */
    SelectionType?: SelectionVariant;
}

/**
 * @widget SelectRadius
 * @provider MapGuide
 * @description Perform a selection within a certain radius of a click
 * @label Select Radius
 * @tooltip Click to select within a radius
 * @icon select-radius
 * @containableby Any
 */
export interface ISelectRadiusCommandParameters extends ISelectToolCommandParameters { }

/**
 * @widget SelectPolygon
 * @provider MapGuide
 * @description Perform a selection using a polygon
 * @label Select Polygon
 * @tooltip Draw a polygon to perform a selection
 * @containableby Any
 */
export interface ISelectPolygonCommandParameters extends ISelectToolCommandParameters { }

/**
 * @widget Geolocation
 * @description This widget zooms to your current geographic location
 * @label My Location
 * @tooltip Click to zoom to your current geographic location
 * @icon geolocation
 * @containableby Any
 */
export interface IGeolocationCommandParameters {
    ZoomLevel?: string;
    EnableHighAccuracy?: string;
    Timeout?: string;
    MaximumAge?: string;
}

/**
 * @widget CoordinateTracker
 * @description This widget displays current mouse coordinates in various projections
 * @label Coordinate Tracker
 * @tooltip Click to view mouse coordinates in various projections
 * @icon coordinate-tracker
 * @containableby Any
 */
export interface ICoordinateTrackerCommandParameters extends ITargetedCommandParameters {
    Projection?: string[];
}

/**
 * @widget RestoreView
 * @provider MapGuide
 * @description Click to zoom to the map's initial view
 * @containableby Any
 */
export interface IRestoreViewCommandParameters { }

/**
 * @widget InitialMapView
 * @description A widget that will zoom the map to the full extents
 * @label Zoom Extents
 * @tooltip Click to zoom to the full map extents
 * @icon zoom-full
 * @containableby Any
 */
export interface IZoomExtentsCommandParameters { }

/**
 * @widget ClearSelection
 * @provider MapGuide
 * @description Clears the current selection
 * @label Clear Selection
 * @tooltip Click to clear the current selection
 * @icon select-clear
 * @containableby Any
 */
export interface IClearSelectionCommandParameters { }

/**
 * @widget ZoomToSelection
 * @provider MapGuide
 * @description A widget that will zoom the map to the currently selected features
 * @label Zoom Selection
 * @tooltip Click to zoom to the selection
 * @icon select-zoom
 * @containableby Any
 */
export interface IZoomToSelectionCommandParameters { }

/**
 * @widget RefreshMap
 * @description A widget that redraws the map
 * @label Refresh
 * @tooltip Click to refresh the map
 * @icon view-refresh
 * @containableby Any
 */
export interface IRefreshMapCommandParameters { }

/**
 * @widget ExtentHistory
 * @description A widget to navigate forward or backward in the map view extent history
 * @containableby Any
 */
export interface IExtentHistoryCommandParameters {
    /**
     * @description The direction in which to traverse the extent history
     * @label Direction
     * @allowedvalues [{Next|Next},{Previous|Previous}]
     * @defaultvalue Previous
     */
    Direction?: string;
}

/**
 * @widget BufferPanel
 * @provider MapGuide
 * @description This widget will perform a buffering operation on selected features in the Map. Either a popup window or the task pane will be used to gather user input, depending on the setting of the Target parameter
 * @label Buffer
 * @tooltip Click to create a buffer
 * @icon buffer
 * @containableby Any
 */
export interface IBufferCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget SelectWithin
 * @provider MapGuide
 * @description A widget to perform a selection within a currently selected set of features
 * @label Select within
 * @tooltip Click to select features within this selection
 * @icon select-features
 * @containableby Any
 */
export interface ISelectWithinCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget FeatureInfo
 * @provider MapGuide
 * @description This widget will display information about selected features in a task panel
 * @label Feature Info
 * @tooltip Click to display selected feature info
 * @icon feature-info
 * @containableby Any
 */
export interface IFeatureInfoCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget Query
 * @provider MapGuide
 * @description This widget will execute a custom query on the map. Either a popup window or the task pane will be used to gather user input, depending on the setting of the Target parameter
 * @label Query
 * @tooltip Click to execute a custom query
 * @icon query
 * @containableby Any
 */
export interface IQueryCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget Theme
 * @provider MapGuide
 * @description This widget will create a new themed layer based on an existing map layer. Either a popup window or the task pane will be used to gather user input, depending on the setting of the Target parameter
 * @label Theme
 * @tooltip Click to create a themed layer
 * @icon theme
 * @containableby Any
 */
export interface IThemeCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget ExternalLayerManager
 * @description The widget allows to add external layers to the current map and be able to manage them
 * @label Manage External Layers
 * @tooltip Manage External Layers
 * @icon legend-layer
 * @containableby Any
 */
export interface IExternalLayerManagerCommandParameters extends ITargetedCommandParameters { }

/**
 * @widget CenterSelection
 * @description Center the current selection, if any, but maintain the current scale if possible. Zoom out if not
 * @label Center Selection
 * @tooltip Click to center the map on the current selection
 * @icon select-centre
 * @containableby Any
 */
export interface ICenterSelectionCommandParameters { }

/**
 * @widget InvokeScript
 * @label Invoke Command
 * @description Click to invoke a command by the specified name
 * @containableby Any
 */
export interface IInvokeScriptCommandParameters { 
    /**
     * @label Command
     * @description The name of the command to be executed
     */
    Script: string;
}

/**
 * @widget InvokeURL
 * @description A widget to call up a URL into the TaskPane, a new window or HTML element. The map name and Session ID are automatically added to the URL, as well as any additional parameters specifed
 * @containableby Any
 */
export interface IInvokeURLCommandParameters extends ITargetedCommandParameters { 
    /**
     * @description The URL to be opened in the target
     * @label URL
     */
    Url: string;
    /**
     * @description A flag to indicate if this widget should only be enabled if there is a selection available on the map
     * @label Disable if selection empty
     * @type boolean
     * @defaultvalue false
     */
    DisableIfSelectionEmpty?: string;
    /**
     * @description A list of key/value pairs that will be added to the URL
     * @type KeyValuePairList
     * @label Additional Parameters
     */
    AdditionalParameter: string;
}

/**
 * @widget CursorPosition
 * @description Provides dynamic cursor tracking as it moves over the map
 * @label Cursor Position
 * @tooltip this will display the cursor position
 * @nonstandard
 * @containableby Splitterbar
 */
export interface ICursorPositionParameters {
    /**
     * @description The template string to use to generate the displayed text
     * @defaultvalue x: {x}, y: {y}
     * @label Template
     */
    Template: string;
    /**
     * @description The precision to display for the coordinates
     * @label Precision
     * @type integer
     * @defaultvalue 4
     * @min 0
     * @max 15
     */
    Precision?: string;
    /**
     * @description The projection to display mouse coordinates in. This can be an EPSG code (EPSG:XXXX) or a WKT string. This parameter takes precedence over the Units parameter if specified
     * @label Display Projection
     */
    DisplayProjection?: string;
    /**
     * @description The coordinate units
     * @label Units
     * @defaultvalue dd
     */
    Units: string;
}

/**
 * @widget EditableScale
 * @description This widget displays the map scale and provides a way for the user to enter a scale value at which to display the map
 * @label Editable Scale
 * @tooltip Allows display and entry of map scale
 * @nonstandard
 * @containableby Splitterbar
 */
export interface IEditableScaleParameters {

}

/**
 * @widget Legend
 * @provider MapGuide
 * @description A widget that displays a listing of all layers that make up the map as a tree structure
 * @label Legend
 * @tooltip Map Legend
 * @nonstandard
 */
export interface ILegendParameters {

}

/**
 * @widget Navigator
 * @description In-map navigator widget
 * @label Navigator
 * @tooltip Click to navigate the map
 * @nonstandard
 */
export interface INavigatorParameters {

}

/**
 * @widget OverviewMap
 * @description A key map to locate the vewing area of the primary map
 * @label Overview Map
 * @tooltip Click and drag to recenter the map
 * @nonstandard
 */
export interface IOverviewMapParameters {

}

/**
 * @widget SelectionInfo
 * @provider MapGuide
 * @description Displays the number of features and number of layers in the current selection
 * @label Selection info
 * @nonstandard
 */
export interface ISelectionInfoParameters {

}

/**
 * @widget SelectionPanel
 * @provider MapGuide
 * @label Selection Panel
 * @description The SelectionPanel widget displays attributes for the features that are selected on the map
 * @nonstandard
 */
export interface ISelectionPanelParameters {

}

/**
 * @widget TaskPane
 * @description A widget that acts as a generic container for application-specific HTML content
 * @label Task Pane
 * @nonstandard
 */
export interface ITaskPaneParameters {

}

/**
 * @widget ViewSize
 * @description Display the size of the current view in user-definable units
 * @label View Size
 * @tooltip The size of the map
 * @nonstandard
 * @containableby Splitterbar
 */
export interface IViewSizeParameters {

}