import { IMapView } from "../../src/api/common";
import { ICommandSpec, IFlyoutSpec } from "../../src/api/registry/command-spec";
import { ActionType } from "../../src/constants/actions";
import { toolbarReducer } from "../../src/reducers/toolbar";
import { createInitAction, createInitialState, createMap } from "../../test-data";

describe("reducers/mouse", () => {
    describe(ActionType.INIT_APP, () => {
        it("updates", () => {
            const initialState = createInitialState();
            const map = createMap();
            const view: IMapView = {
                x: -87.72,
                y: 43.74,
                scale: 70000
            };
            const action = createInitAction(map, view);
            action.payload.toolbars = {
                toolbars: {
                    "FileMenu": {
                        items: [
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "legend-map",
                                "label": "Maps",
                                "tooltip": "Choose a map theme",
                                "componentName": "MapMenu",
                                "flyoutId": "MapMenu_FYWICCjPJ",
                                "parameters": {}
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "options",
                                "label": "External Providers",
                                "tooltip": "Click to change the basemap",
                                "componentName": "BaseMapSwitcher",
                                "flyoutId": "BaseMapSwitcher_uHdP6pvIjZ",
                                "parameters": {}
                            },
                            {
                                "label": "View",
                                "flyoutId": "View_cg-choTmIE",
                                children: []
                            } as IFlyoutSpec,
                            {
                                "label": "Viewer API",
                                "flyoutId": "Viewer API_bCZrmekfyB",
                                children: []
                            } as IFlyoutSpec,
                            {
                                "label": "Tools",
                                "flyoutId": "Tools_YPN7tqBtJm",
                                children: []
                            } as IFlyoutSpec
                        ]
                    },
                    "Toolbar": {
                        items: [
                            {
                                "error": "This button references an unknown or unsupported widget: Print"
                            },
                            {
                                "icon": "images/icons/print.png",
                                "command": "QuickPlot",
                                "label": "Quick Plot",
                                "tooltip": "Click to create a plot quickly",
                                "parameters": {
                                    "AllowDisclaimerToggle": "true",
                                    "DefaultDpi": "96",
                                    "DefaultMargin": "25.4,12.7,12.7,12.7",
                                    "Disclaimer": "The materials available at this web site are for informational purposes only and do not constitute a legal document.",
                                    "RememberPlotOptions": "false",
                                    "ShowCoordinateLabels": "true",
                                    "ShowCoordinates": "false",
                                    "ShowLegalDisclaimer": "true",
                                    "ShowLegend": "false",
                                    "ShowNorthArrow": "false",
                                    "ShowScaleBar": "false",
                                    "ShowSubTitle": "true",
                                    "Target": "TaskPane"
                                }
                            } as ICommandSpec,
                            {
                                "isSeparator": true
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "view-refresh",
                                "command": "RefreshMap",
                                "label": "Refresh",
                                "tooltip": "Click to redraw the map",
                                "parameters": null
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "maptip",
                                "command": "MapTip",
                                "label": "Maptip",
                                "tooltip": "Click to Enable/Disable get information about features from Server",
                                "parameters": {
                                    "Delay": "350",
                                    "Target": "MaptipWindow",
                                    "Tolerance": "2",
                                    "WinFeatures": "menubar=no,location=no,resizable=no,status=no"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "select",
                                "command": "Select",
                                "label": "Select",
                                "tooltip": "Click to select features",
                                "parameters": {
                                    "QueryActiveLayer": "false",
                                    "SelectionType": "INTERSECTS",
                                    "Tolerance": "3"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "select-radius",
                                "command": "SelectRadius",
                                "label": "Select Radius",
                                "tooltip": "Click to select within a radius",
                                "parameters": {
                                    "DefaultRadius": "20",
                                    "RadiusTooltipType": "dynamic",
                                    "SelectionType": "INTERSECTS",
                                    "Tolerance": "3"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "select-polygon",
                                "command": "SelectPolygon",
                                "label": "Select Polygon",
                                "tooltip": "Draw a polygon to perform a selection",
                                "parameters": {
                                    "SelectionType": "INTERSECTS",
                                    "Tolerance": "3"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "select-clear",
                                "command": "ClearSelection",
                                "label": "Clear Selection",
                                "tooltip": "Click to clear the current selection",
                                "parameters": null
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "buffer",
                                "command": "Buffer",
                                "label": "Buffer",
                                "tooltip": "Measure distances and areas on the map",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "measure",
                                "command": "Measure",
                                "label": "Measure",
                                "tooltip": "Measure",
                                "parameters": {
                                    "AreaPrecision": "0",
                                    "DistancePrecision": "0",
                                    "MeasureTooltipContainer": "MeasureResult",
                                    "MeasureTooltipType": "dynamic",
                                    "Target": "TaskPane",
                                    "Type": "both",
                                    "Units": "meters"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "feature-info",
                                "command": "FeatureInfo",
                                "label": "Feature Info",
                                "tooltip": "Click to display selected feature info",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "query",
                                "command": "Query",
                                "label": "Query",
                                "tooltip": "Click to execute a custom query",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "theme",
                                "command": "Theme",
                                "label": "Theme",
                                "tooltip": "Click to create a themed layer",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "redline",
                                "command": "Redline",
                                "label": "Redline",
                                "tooltip": "Click to draw redline features",
                                "parameters": {
                                    "AutoCreateOnStartup": "true",
                                    "AutogenerateLayerNames": "true",
                                    "RedlineGeometryFormat": "7",
                                    "StylizationType": "basic",
                                    "Target": "TaskPane",
                                    "UseMapMessage": "true"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "options",
                                "command": "ViewerOptions",
                                "label": "Options",
                                "tooltip": "Click to change the units displayed",
                                "parameters": {}
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "about",
                                "command": "About",
                                "label": "About",
                                "tooltip": "Click to show information about this application",
                                "parameters": {
                                    "AboutURL": "widgets/About/About.html"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "help",
                                "command": "Help",
                                "label": "Help",
                                "tooltip": "Click to get help",
                                "parameters": {
                                    "Target": "HelpWindow",
                                    "Url": "widgets/Help/Help.html"
                                }
                            }
                        ]
                    }
                },
                flyouts: {
                    "View_cg-choTmIE": {
                        "children": [
                            {
                                "command": "showOverview",
                                "label": "Show Overview",
                                "parameters": {
                                    "Script": "showOverviewMap()"
                                }
                            } as ICommandSpec,
                            {
                                "command": "showTaskPane",
                                "label": "Show Task Pane",
                                "parameters": {
                                    "Script": "showTaskPane()"
                                }
                            } as ICommandSpec,
                            {
                                "command": "showLegend",
                                "label": "Show Legend",
                                "parameters": {
                                    "Script": "showLegend()"
                                }
                            } as ICommandSpec,
                            {
                                "command": "showSelectionPanel",
                                "label": "Show Selection Panel",
                                "parameters": {
                                    "Script": "showSelectionPanel()"
                                }
                            } as ICommandSpec
                        ]
                    },
                    "Viewer API_bCZrmekfyB": {
                        "children": [
                            {
                                "command": "ViewerApiExample",
                                "label": "Viewer API Example",
                                "parameters": {
                                    "AdditionalParameter": null,
                                    "DisableIfSelectionEmpty": "false",
                                    "Target": "TaskPane",
                                    "Url": "examples/taskpane/viewerapi.html"
                                }
                            } as ICommandSpec,
                            {
                                "command": "DrawingExample",
                                "label": "Drawing Example",
                                "parameters": {
                                    "AdditionalParameter": null,
                                    "DisableIfSelectionEmpty": "false",
                                    "Target": "TaskPane",
                                    "Url": "examples/taskpane/drawing.html"
                                }
                            } as ICommandSpec,
                            {
                                "command": "SubscriberExample",
                                "label": "Subscriber API Example",
                                "parameters": {
                                    "AdditionalParameter": null,
                                    "DisableIfSelectionEmpty": "false",
                                    "Target": "TaskPane",
                                    "Url": "examples/taskpane/subscriberapi.html"
                                }
                            } as ICommandSpec
                        ]
                    },
                    "Tools_YPN7tqBtJm": {
                        "children": [
                            {
                                "command": "AddExternalLayers",
                                "label": "Manage External Layers",
                                "parameters": {
                                    "AdditionalParameter": null,
                                    "DisableIfSelectionEmpty": "false",
                                    "Target": "TaskPane",
                                    "Url": "component://AddManageLayers"
                                }
                            } as ICommandSpec,
                            {
                                "command": "ShareLink",
                                "label": "Share Link to View",
                                "parameters": {
                                    "AdditionalParameter": null,
                                    "DisableIfSelectionEmpty": "false",
                                    "Target": "InvokeUrlWindow",
                                    "Url": "component://ShareLinkToView"
                                }
                            } as ICommandSpec,
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "geolocation",
                                "command": "Geolocation",
                                "label": "My Location",
                                "tooltip": "Click to zoom to your current geographic location",
                                "parameters": {
                                    "EnableHighAccuracy": "false",
                                    "MaximumAge": "0",
                                    "Timeout": "5000"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "coordinate-tracker",
                                "command": "CoordinateTracker",
                                "label": "Coordinate Tracker",
                                "tooltip": "Click to view mouse coordinates in various projections",
                                "parameters": {
                                    "Projection": [
                                        "EPSG:4326",
                                        "EPSG:3857"
                                    ],
                                    "Target": "TaskPane"
                                }
                            }
                        ]
                    },
                    "MapContextMenu": {
                        "children": [
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "view-refresh",
                                "command": "RefreshMap",
                                "label": "Refresh",
                                "tooltip": "Click to redraw the map",
                                "parameters": null
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "pan",
                                "command": "Pan",
                                "label": "Pan",
                                "tooltip": "Click and drag to pan the map",
                                "parameters": null
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "zoom-in",
                                "command": "Zoom",
                                "label": "Zoom Rectangle",
                                "tooltip": "Click or click and drag on the map to zoom in",
                                "parameters": {
                                    "Direction": "in",
                                    "Factor": "2",
                                    "Tolerance": "5"
                                }
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "zoom-in-fixed",
                                "command": "ZoomIn",
                                "label": "Zoom In",
                                "tooltip": "Zoom in by a preset increment",
                                "parameters": {
                                    "Factor": "2"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "zoom-out-fixed",
                                "command": "ZoomOut",
                                "label": "Zoom Out",
                                "tooltip": "Zoom out by a preset increment",
                                "parameters": {
                                    "Factor": "0.5"
                                }
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "label": "Zoom",
                                "children": []
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "select",
                                "command": "Select",
                                "label": "Select",
                                "tooltip": "Click to select features",
                                "parameters": {
                                    "QueryActiveLayer": "false",
                                    "SelectionType": "INTERSECTS",
                                    "Tolerance": "3"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "select-clear",
                                "command": "ClearSelection",
                                "label": "Clear Selection",
                                "tooltip": "Click to clear the current selection",
                                "parameters": null
                            },
                            {
                                "label": "Select More",
                                "children": []
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "buffer",
                                "command": "Buffer",
                                "label": "Buffer",
                                "tooltip": "Measure distances and areas on the map",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "measure",
                                "command": "Measure",
                                "label": "Measure",
                                "tooltip": "Measure",
                                "parameters": {
                                    "AreaPrecision": "0",
                                    "DistancePrecision": "0",
                                    "MeasureTooltipContainer": "MeasureResult",
                                    "MeasureTooltipType": "dynamic",
                                    "Target": "TaskPane",
                                    "Type": "both",
                                    "Units": "meters"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "feature-info",
                                "command": "FeatureInfo",
                                "label": "Feature Info",
                                "tooltip": "Click to display selected feature info",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "query",
                                "command": "Query",
                                "label": "Query",
                                "tooltip": "Click to execute a custom query",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "theme",
                                "command": "Theme",
                                "label": "Theme",
                                "tooltip": "Click to create a themed layer",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "redline",
                                "command": "Redline",
                                "label": "Redline",
                                "tooltip": "Click to draw redline features",
                                "parameters": {
                                    "AutoCreateOnStartup": "true",
                                    "AutogenerateLayerNames": "true",
                                    "RedlineGeometryFormat": "7",
                                    "StylizationType": "basic",
                                    "Target": "TaskPane",
                                    "UseMapMessage": "true"
                                }
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "options",
                                "command": "ViewerOptions",
                                "label": "Options",
                                "tooltip": "Click to change the units displayed",
                                "parameters": {}
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "help",
                                "command": "Help",
                                "label": "Help",
                                "tooltip": "Click to get help",
                                "parameters": {
                                    "Target": "HelpWindow",
                                    "Url": "widgets/Help/Help.html"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "about",
                                "command": "About",
                                "label": "About",
                                "tooltip": "Click to show information about this application",
                                "parameters": {
                                    "AboutURL": "widgets/About/About.html"
                                }
                            }
                        ]
                    },
                    "TaskMenu": {
                        "children": [
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "measure",
                                "command": "Measure",
                                "label": "Measure",
                                "tooltip": "Measure",
                                "parameters": {
                                    "AreaPrecision": "0",
                                    "DistancePrecision": "0",
                                    "MeasureTooltipContainer": "MeasureResult",
                                    "MeasureTooltipType": "dynamic",
                                    "Target": "TaskPane",
                                    "Type": "both",
                                    "Units": "meters"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "buffer",
                                "command": "Buffer",
                                "label": "Buffer",
                                "tooltip": "Measure distances and areas on the map",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "feature-info",
                                "command": "FeatureInfo",
                                "label": "Feature Info",
                                "tooltip": "Click to display selected feature info",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "query",
                                "command": "Query",
                                "label": "Query",
                                "tooltip": "Click to execute a custom query",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "theme",
                                "command": "Theme",
                                "label": "Theme",
                                "tooltip": "Click to create a themed layer",
                                "parameters": {
                                    "Target": "TaskPane"
                                }
                            },
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "redline",
                                "command": "Redline",
                                "label": "Redline",
                                "tooltip": "Click to draw redline features",
                                "parameters": {
                                    "AutoCreateOnStartup": "true",
                                    "AutogenerateLayerNames": "true",
                                    "RedlineGeometryFormat": "7",
                                    "StylizationType": "basic",
                                    "Target": "TaskPane",
                                    "UseMapMessage": "true"
                                }
                            },
                            {
                                "isSeparator": true
                            },
                            {
                                "command": "AddExternalLayers",
                                "label": "Manage External Layers",
                                "parameters": {
                                    "AdditionalParameter": null,
                                    "DisableIfSelectionEmpty": "false",
                                    "Target": "TaskPane",
                                    "Url": "component://AddManageLayers"
                                }
                            } as ICommandSpec,
                            {
                                "icon": "images/icons.png",
                                "spriteClass": "coordinate-tracker",
                                "command": "CoordinateTracker",
                                "label": "Coordinate Tracker",
                                "tooltip": "Click to view mouse coordinates in various projections",
                                "parameters": {
                                    "Projection": [
                                        "EPSG:4326",
                                        "EPSG:3857"
                                    ],
                                    "Target": "TaskPane"
                                }
                            }
                        ]
                    }
                }
            };

            const state = toolbarReducer(initialState.toolbar, action);
            expect(state.toolbars).not.toBeUndefined();
            expect(state.flyouts).not.toBeUndefined();
            expect(Object.keys(state.toolbars)).toHaveLength(Object.keys(action.payload.toolbars.toolbars).length);
            expect(Object.keys(state.flyouts)).toHaveLength(Object.keys(action.payload.toolbars.flyouts).length);
        });
    });
});