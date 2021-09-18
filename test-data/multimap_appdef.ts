export default {
    "ApplicationDefinition": {
        "@xmlns:xsd": [
            "http://www.w3.org/2001/XMLSchema"
        ],
        "@xmlns:xsi": [
            "http://www.w3.org/2001/XMLSchema-instance"
        ],
        "@xsi:noNamespaceSchemaLocation": [
            "ApplicationDefinition-1.0.0.xsd"
        ],
        "Extension": [
            {
                "OpenStreetMapScript": [
                    "http://www.openstreetmap.org/openlayers/OpenStreetMap.js"
                ],
                "StamenScript": [
                    "http://maps.stamen.com/js/tile.stamen.js?v1.3.0"
                ]
            }
        ],
        "MapSet": [
            {
                "MapGroup": [
                    {
                        "@id": [
                            "Sheboygan"
                        ],
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "True"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Redding"
                        ],
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "Options": [
                                            {
                                                "isBaseLayer": [
                                                    "false"
                                                ],
                                                "projection": [
                                                    "EPSG:900913"
                                                ],
                                                "useOverlay": [
                                                    "true"
                                                ]
                                            }
                                        ],
                                        "ResourceId": [
                                            "Library://Redding/Maps/Redding.MapDefinition"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "True"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            },
                            {
                                "Extension": [
                                    {
                                        "Options": [
                                            {
                                                "name": [
                                                    "Stamen (Toner)"
                                                ],
                                                "type": [
                                                    "toner"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "Stamen"
                                ]
                            },
                            {
                                "Extension": [
                                    {
                                        "Options": [
                                            {
                                                "name": [
                                                    "Open Street Map"
                                                ],
                                                "type": [
                                                    "Mapnik"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "OpenStreetMap"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Melbourne"
                        ],
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "Options": [
                                            {
                                                "isBaseLayer": [
                                                    "false"
                                                ],
                                                "projection": [
                                                    "EPSG:900913"
                                                ],
                                                "useOverlay": [
                                                    "true"
                                                ]
                                            }
                                        ],
                                        "ResourceId": [
                                            "Library://Samples/Melbourne/Maps/Melbourne.MapDefinition"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "True"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            },
                            {
                                "Extension": [
                                    {
                                        "Options": [
                                            {
                                                "name": [
                                                    "Stamen (Toner)"
                                                ],
                                                "type": [
                                                    "toner"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "Stamen"
                                ]
                            },
                            {
                                "Extension": [
                                    {
                                        "Options": [
                                            {
                                                "name": [
                                                    "Open Street Map"
                                                ],
                                                "type": [
                                                    "Mapnik"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "OpenStreetMap"
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "TemplateUrl": [
            "fusion/templates/mapguide/slate/index.html"
        ],
        "Title": [
            "Slate"
        ],
        "WidgetSet": [
            {
                "Container": [
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Print"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "QuickPlot"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "RefreshMap"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Maptip"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Select"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "SelectRadius"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "SelectPolygon"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ClearSelection"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "tbBuffer"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Measure"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "FeatureInfo"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Query"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Theme"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Redline"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ViewOptions"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "About"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Help"
                                ]
                            }
                        ],
                        "Name": [
                            "Toolbar"
                        ],
                        "Position": [
                            "top"
                        ],
                        "Type": [
                            "Toolbar"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Select"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "WmsQuery"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Pan"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Zoom"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ZoomIn"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ZoomOut"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "InitialMapView"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ZoomToSelection"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "PreviousView"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "NextView"
                                ]
                            }
                        ],
                        "Name": [
                            "ToolbarSecondary"
                        ],
                        "Position": [
                            "top"
                        ],
                        "Type": [
                            "Toolbar"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertSelect"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "WmsQuery"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertPan"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertZoom"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertZoomIn"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertZoomOut"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertInitialMapView"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertZoomToSelection"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertPreviousView"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "vertNextView"
                                ]
                            }
                        ],
                        "Name": [
                            "ToolbarVertical"
                        ],
                        "Position": [
                            "left"
                        ],
                        "Type": [
                            "Toolbar"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "MapMenu"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "BasemapSwitcher"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "FlyoutItemType"
                                ],
                                "Function": [
                                    "Flyout"
                                ],
                                "Item": [
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "showOverview"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "showTaskPane"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "showLegend"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "showSelectionPanel"
                                        ]
                                    }
                                ],
                                "Label": [
                                    "View"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "FlyoutItemType"
                                ],
                                "Function": [
                                    "Flyout"
                                ],
                                "Item": [
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "ViewerApiExample"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "DrawingExample"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "SubscriberExample"
                                        ]
                                    }
                                ],
                                "Label": [
                                    "Viewer API"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "FlyoutItemType"
                                ],
                                "Function": [
                                    "Flyout"
                                ],
                                "Item": [
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "AddExternalLayers"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "ShareLink"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "Geolocation"
                                        ]
                                    },
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "CoordinateTracker"
                                        ]
                                    }
                                ],
                                "Label": [
                                    "Tools"
                                ]
                            }
                        ],
                        "Name": [
                            "FileMenu"
                        ],
                        "Position": [
                            "top"
                        ],
                        "Type": [
                            "Toolbar"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "statusCoordinates"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "statusSelection"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "EditableScale"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "statusViewSize"
                                ]
                            }
                        ],
                        "Name": [
                            "Statusbar"
                        ],
                        "Position": [
                            "bottom"
                        ],
                        "Type": [
                            "Splitterbar"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "RefreshMap"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Pan"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Zoom"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ZoomIn"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ZoomOut"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "FlyoutItemType"
                                ],
                                "Function": [
                                    "Flyout"
                                ],
                                "Label": [
                                    "Zoom"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Select"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ClearSelection"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "FlyoutItemType"
                                ],
                                "Function": [
                                    "Flyout"
                                ],
                                "Label": [
                                    "Select More"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "tbBuffer"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Measure"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "FeatureInfo"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Query"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Theme"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Redline"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "ViewOptions"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Help"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "About"
                                ]
                            }
                        ],
                        "Name": [
                            "MapContextMenu"
                        ],
                        "Position": [
                            "top"
                        ],
                        "Type": [
                            "ContextMenu"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiItemContainerType"
                        ],
                        "Extension": null,
                        "Item": [
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Measure"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "tbBuffer"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "FeatureInfo"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Query"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Theme"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "Redline"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "SeparatorItemType"
                                ],
                                "Function": [
                                    "Separator"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "AddExternalLayers"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "WidgetItemType"
                                ],
                                "Function": [
                                    "Widget"
                                ],
                                "Widget": [
                                    "CoordinateTracker"
                                ]
                            }
                        ],
                        "Name": [
                            "TaskMenu"
                        ],
                        "Position": [
                            "top"
                        ],
                        "Type": [
                            "ContextMenu"
                        ]
                    }
                ],
                "MapWidget": [
                    {
                        "Extension": [
                            {
                                "MenuContainer": [
                                    "MapContextMenu"
                                ]
                            }
                        ],
                        "MapId": [
                            "Sheboygan"
                        ],
                        "Name": [
                            "Map"
                        ],
                        "Type": [
                            "Map"
                        ]
                    }
                ],
                "Widget": [
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AboutURL": [
                                    "widgets/About/About.html"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "about"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "About"
                        ],
                        "Location": null,
                        "Name": [
                            "About"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to show information about this application"
                        ],
                        "Type": [
                            "About"
                        ]
                    },
                    {
                        "Extension": [
                            {}
                        ],
                        "Location": null,
                        "Name": [
                            "ActivityIndicator"
                        ],
                        "Type": [
                            "ActivityIndicator"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "options"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "External Providers"
                        ],
                        "Location": null,
                        "Name": [
                            "BasemapSwitcher"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to change the basemap"
                        ],
                        "Type": [
                            "BasemapSwitcher"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "buffer"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Buffer"
                        ],
                        "Location": null,
                        "Name": [
                            "BufferPanel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to create a buffer"
                        ],
                        "Type": [
                            "BufferPanel"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "select-centre"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Center selection"
                        ],
                        "Location": null,
                        "Name": [
                            "CenterSelection"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to center the map on the current selection"
                        ],
                        "Type": [
                            "CenterSelection"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "select-clear"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Clear Selection"
                        ],
                        "Location": null,
                        "Name": [
                            "ClearSelection"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to clear the current selection"
                        ],
                        "Type": [
                            "ClearSelection"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {}
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Color picker"
                        ],
                        "Location": null,
                        "Name": [
                            "ColorPicker"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Use this tool to select a color"
                        ],
                        "Type": [
                            "ColorPicker"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Projection": [
                                    "EPSG:4326",
                                    "EPSG:3857"
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "coordinate-tracker"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Coordinate Tracker"
                        ],
                        "Location": null,
                        "Name": [
                            "CoordinateTracker"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to view mouse coordinates in various projections"
                        ],
                        "Type": [
                            "CoordinateTracker"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "Precision": [
                                    "4"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "EditableScale"
                        ],
                        "Type": [
                            "EditableScale"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "feature-info"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Feature Info"
                        ],
                        "Location": null,
                        "Name": [
                            "FeatureInfo"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to display selected feature info"
                        ],
                        "Type": [
                            "FeatureInfo"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "EnableHighAccuracy": [
                                    "false"
                                ],
                                "MaximumAge": [
                                    "0"
                                ],
                                "Timeout": [
                                    "5000"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "geolocation"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "My Location"
                        ],
                        "Location": null,
                        "Name": [
                            "Geolocation"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to zoom to your current geographic location"
                        ],
                        "Type": [
                            "Geolocation"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "DirectionLength": [
                                    "22"
                                ],
                                "ShowDirection": [
                                    "true"
                                ],
                                "SymbolLayerName": [
                                    "GoogleStreetViewerSymbolLayer"
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": [
                            "../../../widgets/GoogleStreetViewer/GoogleStreetView.png"
                        ],
                        "Label": [
                            "Google StreetView"
                        ],
                        "Location": null,
                        "Name": [
                            "GoogleStreetViewer"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to show Google StreetView"
                        ],
                        "Type": [
                            "GoogleStreetViewer"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Target": [
                                    "HelpWindow"
                                ],
                                "Url": [
                                    "widgets/Help/Help.html"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "help"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Help"
                        ],
                        "Location": null,
                        "Name": [
                            "Help"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to get help"
                        ],
                        "Type": [
                            "Help"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "ViewType": [
                                    "initial"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-full"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Zoom Extents"
                        ],
                        "Location": null,
                        "Name": [
                            "InitialMapView"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to zoom to the full map extents"
                        ],
                        "Type": [
                            "InitialMapView"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "DisabledLayerIcon": [
                                    "images/icons/legend-layer.png"
                                ],
                                "GroupInfoIcon": [
                                    "images/icons/tree_group_info.png"
                                ],
                                "HideInvisibleLayers": [
                                    "true"
                                ],
                                "LayerDWFIcon": [
                                    "images/icons/legend-DWF.png"
                                ],
                                "LayerInfoIcon": [
                                    "images/icons/tree_layer_info.png"
                                ],
                                "LayerRasterIcon": [
                                    "images/icons/legend-raster.png"
                                ],
                                "LayerThemeIcon": [
                                    "images/icons/legend-theme.png"
                                ],
                                "RootFolderIcon": [
                                    "images/icons/legend-map.png"
                                ],
                                "ShowMapFolder": [
                                    "false"
                                ],
                                "ShowRootFolder": [
                                    "false"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "Legend"
                        ],
                        "Type": [
                            "Legend"
                        ]
                    },
                    {
                        "Extension": null,
                        "Location": null,
                        "Name": [
                            "LinkToView"
                        ],
                        "Type": [
                            "LinkToView"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {}
                        ],
                        "ImageClass": [
                            "legend-map"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Maps"
                        ],
                        "Location": null,
                        "Name": [
                            "MapMenu"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Choose a map theme"
                        ],
                        "Type": [
                            "MapMenu"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Delay": [
                                    "350"
                                ],
                                "Target": [
                                    "MaptipWindow"
                                ],
                                "Tolerance": [
                                    "2"
                                ],
                                "WinFeatures": [
                                    "menubar=no,location=no,resizable=no,status=no"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "maptip"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Maptip"
                        ],
                        "Location": null,
                        "Name": [
                            "Maptip"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to Enable/Disable get information about features from Server"
                        ],
                        "Type": [
                            "Maptip"
                        ]
                    },
                    {
                        "Extension": null,
                        "Location": null,
                        "Name": [
                            "Navigator"
                        ],
                        "Type": [
                            "Navigator"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "MaxRatio": [
                                    "128"
                                ],
                                "MinRatio": [
                                    "32"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "OverviewMap"
                        ],
                        "Type": [
                            "OverviewMap"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "pan"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Pan"
                        ],
                        "Location": null,
                        "Name": [
                            "Pan"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click and drag to pan the map"
                        ],
                        "Type": [
                            "Pan"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "none"
                                ],
                                "Percentage": [
                                    "75"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "PanOnClick"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "PanOnClick"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "QueryActiveLayer": [
                                    "false"
                                ],
                                "SelectionType": [
                                    "INTERSECTS"
                                ],
                                "Tolerance": [
                                    "3"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "pan"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Pan query"
                        ],
                        "Location": null,
                        "Name": [
                            "PanQuery"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Drag the mouse to pan, click to query"
                        ],
                        "Type": [
                            "PanQuery"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "ShowLegend": [
                                    "false"
                                ],
                                "ShowNorthArrow": [
                                    "false"
                                ],
                                "ShowPrintUI": [
                                    "true"
                                ],
                                "ShowTitle": [
                                    "false"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "file-print"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Print"
                        ],
                        "Location": null,
                        "Name": [
                            "Print"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Print the current map view"
                        ],
                        "Type": [
                            "Print"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "query"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Query"
                        ],
                        "Location": null,
                        "Name": [
                            "Query"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to execute a custom query"
                        ],
                        "Type": [
                            "Query"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AllowDisclaimerToggle": [
                                    "true"
                                ],
                                "DefaultDpi": [
                                    "96"
                                ],
                                "DefaultMargin": [
                                    "25.4,12.7,12.7,12.7"
                                ],
                                "Disclaimer": [
                                    "The materials available at this web site are for informational purposes only and do not constitute a legal document."
                                ],
                                "RememberPlotOptions": [
                                    "false"
                                ],
                                "ShowCoordinateLabels": [
                                    "true"
                                ],
                                "ShowCoordinates": [
                                    "false"
                                ],
                                "ShowLegalDisclaimer": [
                                    "true"
                                ],
                                "ShowLegend": [
                                    "false"
                                ],
                                "ShowNorthArrow": [
                                    "false"
                                ],
                                "ShowScaleBar": [
                                    "false"
                                ],
                                "ShowSubTitle": [
                                    "true"
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": [
                            "images/icons/print.png"
                        ],
                        "Label": [
                            "Quick Plot"
                        ],
                        "Location": null,
                        "Name": [
                            "QuickPlot"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to create a plot quickly"
                        ],
                        "Type": [
                            "QuickPlot"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AutoCreateOnStartup": [
                                    "true"
                                ],
                                "AutogenerateLayerNames": [
                                    "true"
                                ],
                                "RedlineGeometryFormat": [
                                    "7"
                                ],
                                "StylizationType": [
                                    "basic"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "UseMapMessage": [
                                    "true"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "redline"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Redline"
                        ],
                        "Location": null,
                        "Name": [
                            "Redline"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to draw redline features"
                        ],
                        "Type": [
                            "Redline"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "view-refresh"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Refresh"
                        ],
                        "Location": null,
                        "Name": [
                            "RefreshMap"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to redraw the map"
                        ],
                        "Type": [
                            "RefreshMap"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Format": [
                                    "png"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "file-save"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Save map"
                        ],
                        "Location": null,
                        "Name": [
                            "SaveMap"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to save the map as an image"
                        ],
                        "Type": [
                            "SaveMap"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "AbbreviateLabel": [
                                    "true"
                                ],
                                "DisplaySystem": [
                                    "metric"
                                ],
                                "Divisions": [
                                    "2"
                                ],
                                "MaxWidth": [
                                    "200"
                                ],
                                "MinWidth": [
                                    "100"
                                ],
                                "ShowMinorMeasures": [
                                    "true"
                                ],
                                "SingleLine": [
                                    "false"
                                ],
                                "Style": [
                                    "thin"
                                ],
                                "SubDivisions": [
                                    "2"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "Scalebar"
                        ],
                        "Type": [
                            "Scalebar"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "BottomInUnits": [
                                    "m"
                                ],
                                "BottomOutUnits": [
                                    "km"
                                ],
                                "MaxWidth": [
                                    "300"
                                ],
                                "TopInUnits": [
                                    "ft"
                                ],
                                "TopOutUnits": [
                                    "mi"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "ScalebarDual"
                        ],
                        "Type": [
                            "ScalebarDual"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "QueryActiveLayer": [
                                    "false"
                                ],
                                "SelectionType": [
                                    "INTERSECTS"
                                ],
                                "Tolerance": [
                                    "3"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Select"
                        ],
                        "Location": null,
                        "Name": [
                            "Select"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to select features"
                        ],
                        "Type": [
                            "Select"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "select"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "WMS Query"
                        ],
                        "Location": null,
                        "Name": [
                            "WmsQuery"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to query for features in WMS layers at the point you click"
                        ],
                        "Type": [
                            "WmsQuery"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "ResultsPerPage": [
                                    "0"
                                ],
                                "SelectionRenderer": [
                                    "Fusion.Widget.SelectionPanel.SelectionRendererDefault"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "SelectionPanel"
                        ],
                        "Type": [
                            "SelectionPanel"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "SelectionType": [
                                    "INTERSECTS"
                                ],
                                "Tolerance": [
                                    "3"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select-polygon"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Select Polygon"
                        ],
                        "Location": null,
                        "Name": [
                            "SelectPolygon"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Draw a polygon to perform a selection"
                        ],
                        "Type": [
                            "SelectPolygon"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "DefaultRadius": [
                                    "20"
                                ],
                                "RadiusTooltipType": [
                                    "dynamic"
                                ],
                                "SelectionType": [
                                    "INTERSECTS"
                                ],
                                "Tolerance": [
                                    "3"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select-radius"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Select Radius"
                        ],
                        "Location": null,
                        "Name": [
                            "SelectRadius"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to select within a radius"
                        ],
                        "Type": [
                            "SelectRadius"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "RadiusName": [
                                    "SelectRadius"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Select radius value"
                        ],
                        "Location": null,
                        "Name": [
                            "SelectRadiusValue"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "enter the radius for the Select by Radius tool"
                        ],
                        "Type": [
                            "SelectRadiusValue"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "DisableIfSelectionEmpty": [
                                    "true"
                                ],
                                "OmitInvisibleLayers": [
                                    "false"
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select-features"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Select within"
                        ],
                        "Location": null,
                        "Name": [
                            "SelectWithin"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to select features within this selection"
                        ],
                        "Type": [
                            "SelectWithin"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "MenuContainer": [
                                    "TaskMenu"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "TaskPane"
                        ],
                        "Type": [
                            "TaskPane"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "theme"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Theme"
                        ],
                        "Location": null,
                        "Name": [
                            "Theme"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to create a themed layer"
                        ],
                        "Type": [
                            "Theme"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {}
                        ],
                        "ImageClass": [
                            "options"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Options"
                        ],
                        "Location": null,
                        "Name": [
                            "ViewOptions"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to change the units displayed"
                        ],
                        "Type": [
                            "ViewOptions"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "in"
                                ],
                                "Factor": [
                                    "2"
                                ],
                                "Tolerance": [
                                    "5"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-in"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Zoom Rectangle"
                        ],
                        "Location": null,
                        "Name": [
                            "Zoom"
                        ],
                        "StatusText": [
                            "Click or click and drag on the map to zoom in"
                        ],
                        "Tooltip": [
                            "Click or click and drag on the map to zoom in"
                        ],
                        "Type": [
                            "Zoom"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "MaximumZoomDimension": [
                                    "-1"
                                ],
                                "ZoomFactor": [
                                    "2"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select-zoom"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Zoom Selection"
                        ],
                        "Location": null,
                        "Name": [
                            "ZoomToSelection"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to zoom to the selection"
                        ],
                        "Type": [
                            "ZoomToSelection"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Factor": [
                                    "2"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-in-fixed"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Zoom In"
                        ],
                        "Location": null,
                        "Name": [
                            "ZoomIn"
                        ],
                        "StatusText": [
                            "Zoom in by a preset increment"
                        ],
                        "Tooltip": [
                            "Zoom in by a preset increment"
                        ],
                        "Type": [
                            "ZoomOnClick"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Factor": [
                                    "0.5"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-out-fixed"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Zoom Out"
                        ],
                        "Location": null,
                        "Name": [
                            "ZoomOut"
                        ],
                        "StatusText": [
                            "Zoom out by a preset increment"
                        ],
                        "Tooltip": [
                            "Zoom out by a preset increment"
                        ],
                        "Type": [
                            "ZoomOnClick"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "previous"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "view-back"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Previous"
                        ],
                        "Location": null,
                        "Name": [
                            "PreviousView"
                        ],
                        "StatusText": [
                            "Go to previous view"
                        ],
                        "Tooltip": [
                            "Go to previous view"
                        ],
                        "Type": [
                            "ExtentHistory"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "next"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "view-forward"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Next"
                        ],
                        "Location": null,
                        "Name": [
                            "NextView"
                        ],
                        "StatusText": [
                            "Go to next view"
                        ],
                        "Tooltip": [
                            "Go to next view"
                        ],
                        "Type": [
                            "ExtentHistory"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "buffer"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Buffer"
                        ],
                        "Location": null,
                        "Name": [
                            "tbBuffer"
                        ],
                        "StatusText": [
                            "Create buffers around the selected features"
                        ],
                        "Tooltip": [
                            "Measure distances and areas on the map"
                        ],
                        "Type": [
                            "BufferPanel"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AreaPrecision": [
                                    "0"
                                ],
                                "DistancePrecision": [
                                    "0"
                                ],
                                "MeasureTooltipContainer": [
                                    "MeasureResult"
                                ],
                                "MeasureTooltipType": [
                                    "dynamic"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Type": [
                                    "both"
                                ],
                                "Units": [
                                    "meters"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "measure"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Measure"
                        ],
                        "Location": null,
                        "Name": [
                            "Measure"
                        ],
                        "StatusText": [
                            "Measure distances and areas on the map"
                        ],
                        "Tooltip": [
                            "Measure"
                        ],
                        "Type": [
                            "Measure"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Script": [
                                    "showOverviewMap()"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Overview"
                        ],
                        "Location": null,
                        "Name": [
                            "showOverview"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeScript"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Script": [
                                    "showTaskPane()"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Task Pane"
                        ],
                        "Location": null,
                        "Name": [
                            "showTaskPane"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeScript"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Script": [
                                    "showLegend()"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Legend"
                        ],
                        "Location": null,
                        "Name": [
                            "showLegend"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeScript"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Script": [
                                    "showSelectionPanel()"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Selection Panel"
                        ],
                        "Location": null,
                        "Name": [
                            "showSelectionPanel"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeScript"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "EmptyText": [
                                    "&amp;nbsp;"
                                ],
                                "Precision": [
                                    "4"
                                ],
                                "Template": [
                                    "X: {x} {units}, Y: {y} {units}"
                                ],
                                "Units": [
                                    "dd"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "statusCoordinates"
                        ],
                        "Type": [
                            "CursorPosition"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "EmptyText": [
                                    "No selection"
                                ],
                                "Template": [
                                    "{0} feature(s) selected on {1} layer(s)"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "statusSelection"
                        ],
                        "Type": [
                            "SelectionInfo"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "Precision": [
                                    "2"
                                ],
                                "Template": [
                                    "{w} x {h} ({units})"
                                ],
                                "Units": [
                                    "Meters"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "statusViewSize"
                        ],
                        "Type": [
                            "ViewSize"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Factor": [
                                    "2"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-in-fixed"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertZoomIn"
                        ],
                        "StatusText": [
                            "Zoom in by a preset increment"
                        ],
                        "Tooltip": [
                            "Zoom in by a preset increment"
                        ],
                        "Type": [
                            "ZoomOnClick"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Factor": [
                                    "0.5"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-out-fixed"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertZoomOut"
                        ],
                        "StatusText": [
                            "Zoom out by a preset increment"
                        ],
                        "Tooltip": [
                            "Zoom out by a preset increment"
                        ],
                        "Type": [
                            "ZoomOnClick"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "previous"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "view-back"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertPreviousView"
                        ],
                        "StatusText": [
                            "Go to previous view"
                        ],
                        "Tooltip": [
                            "Go to previous view"
                        ],
                        "Type": [
                            "ExtentHistory"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "next"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "view-forward"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertNextView"
                        ],
                        "StatusText": [
                            "Go to next view"
                        ],
                        "Tooltip": [
                            "Go to next view"
                        ],
                        "Type": [
                            "ExtentHistory"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "QueryActiveLayer": [
                                    "false"
                                ],
                                "SelectionType": [
                                    "INTERSECTS"
                                ],
                                "Tolerance": [
                                    "3"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertSelect"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to select features"
                        ],
                        "Type": [
                            "Select"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": null,
                        "ImageClass": [
                            "pan"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertPan"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click and drag to pan the map"
                        ],
                        "Type": [
                            "Pan"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Direction": [
                                    "in"
                                ],
                                "Factor": [
                                    "2"
                                ],
                                "Tolerance": [
                                    "5"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-in"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertZoom"
                        ],
                        "StatusText": [
                            "Click or click and drag on the map to zoom in"
                        ],
                        "Tooltip": [
                            "Click or click and drag on the map to zoom in"
                        ],
                        "Type": [
                            "Zoom"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "ViewType": [
                                    "initial"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "zoom-full"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertInitialMapView"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to zoom to the full map extents"
                        ],
                        "Type": [
                            "InitialMapView"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "MaximumZoomDimension": [
                                    "-1"
                                ],
                                "ZoomFactor": [
                                    "2"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "select-zoom"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "vertZoomToSelection"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to zoom to the selection"
                        ],
                        "Type": [
                            "ZoomToSelection"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AdditionalParameter": null,
                                "DisableIfSelectionEmpty": [
                                    "false"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Url": [
                                    "component://AddManageLayers"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Manage External Layers"
                        ],
                        "Location": null,
                        "Name": [
                            "AddExternalLayers"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeURL"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AdditionalParameter": null,
                                "DisableIfSelectionEmpty": [
                                    "false"
                                ],
                                "Target": [
                                    "InvokeUrlWindow"
                                ],
                                "Url": [
                                    "component://ShareLinkToView"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Share Link to View"
                        ],
                        "Location": null,
                        "Name": [
                            "ShareLink"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeURL"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AdditionalParameter": null,
                                "DisableIfSelectionEmpty": [
                                    "false"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Url": [
                                    "examples/taskpane/viewerapi.html"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Viewer API Example"
                        ],
                        "Location": null,
                        "Name": [
                            "ViewerApiExample"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeURL"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AdditionalParameter": null,
                                "DisableIfSelectionEmpty": [
                                    "false"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Url": [
                                    "examples/taskpane/drawing.html"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Drawing Example"
                        ],
                        "Location": null,
                        "Name": [
                            "DrawingExample"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeURL"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "AdditionalParameter": null,
                                "DisableIfSelectionEmpty": [
                                    "false"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Url": [
                                    "examples/taskpane/subscriberapi.html"
                                ]
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Subscriber API Example"
                        ],
                        "Location": null,
                        "Name": [
                            "SubscriberExample"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeURL"
                        ]
                    }
                ]
            }
        ]
    }
};