//Test appdef: https://github.com/jumpinjackie/mapguide-react-layout/issues/631
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
        "Extension": null,
        "MapSet": [
            {
                "MapGroup": [
                    {
                        "@id": [
                            "Bygglov"
                        ],
                        "Extension": null,
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://Bygglov/Lovkarta/Bygglov.MapDefinition"
                                        ],
                                        "SelectionAsOverlay": [
                                            "true"
                                        ],
                                        "SelectionColor": [
                                            "0x0000FFA0"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Miljö"
                        ],
                        "Extension": null,
                        "InitialView": [
                            {
                                "CenterX": [
                                    "150500"
                                ],
                                "CenterY": [
                                    "7082300"
                                ],
                                "Scale": [
                                    "450000"
                                ]
                            }
                        ],
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://Miljo/Utredningsunderlag/Miljo_Utredningsunderlag.MapDefinition"
                                        ],
                                        "SelectionAsOverlay": [
                                            "true"
                                        ],
                                        "SelectionColor": [
                                            "0x0000FFA0"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Underlagskarta ÖPL Lite"
                        ],
                        "Extension": null,
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://Bygglov/Lovkarta/BygglovLite.MapDefinition"
                                        ],
                                        "SelectionAsOverlay": [
                                            "true"
                                        ],
                                        "SelectionColor": [
                                            "0x0000FFA0"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Underlagskarta_OPL"
                        ],
                        "Extension": null,
                        "InitialView": [
                            {
                                "CenterX": [
                                    "150000"
                                ],
                                "CenterY": [
                                    "7088000"
                                ],
                                "Scale": [
                                    "500000"
                                ]
                            }
                        ],
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://SLK/Underlag_OPL/Underlagskarta_OPL.MapDefinition"
                                        ],
                                        "SelectionAsOverlay": [
                                            "true"
                                        ],
                                        "SelectionColor": [
                                            "0x0000FFA0"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Kvalitetskarta"
                        ],
                        "Extension": null,
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://Bygglov/Lovkarta/Kvalitetskarta.MapDefinition"
                                        ],
                                        "SelectionAsOverlay": [
                                            "true"
                                        ],
                                        "SelectionColor": [
                                            "0x0000FFA0"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    },
                    {
                        "@id": [
                            "Bygglov1"
                        ],
                        "Extension": null,
                        "Map": [
                            {
                                "Extension": [
                                    {
                                        "ResourceId": [
                                            "Library://Test/Bygglov.MapDefinition"
                                        ],
                                        "SelectionAsOverlay": [
                                            "true"
                                        ],
                                        "SelectionColor": [
                                            "0x0000FFA0"
                                        ]
                                    }
                                ],
                                "SingleTile": [
                                    "true"
                                ],
                                "Type": [
                                    "MapGuide"
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "TemplateUrl": [
            "fusion/templates/mapguide/GSViewerFusion_FastFort/index.html"
        ],
        "Title": [
            "Bygglov"
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
                                    "QuickPlotNoLable"
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
                                    "SaveMap"
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
                                    "SelectNoLabel"
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
                                    "ClearSelectionNoLable"
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
                                    "PanNoLabel"
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
                                    "ZoomNoLable"
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
                                    "ZoomOutNoLabel"
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
                                    "ShowSelectionWindowNoLable"
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
                                            "Measure (1)"
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
                                            "VisaKoordinat"
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
                                            "BufferPanel"
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
                                            "SelectWithin"
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
                                            "LinkToView"
                                        ]
                                    }
                                ],
                                "Label": [
                                    "Verktygslåda"
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
                                "Item": [
                                    {
                                        "@xsi:type": [
                                            "WidgetItemType"
                                        ],
                                        "Function": [
                                            "Widget"
                                        ],
                                        "Widget": [
                                            "SearchAdresser"
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
                                            "Search"
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
                                            "SearchKvarter"
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
                                    }
                                ],
                                "Label": [
                                    "Sök"
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
                                    "showFastfort"
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
                                    "Pan"
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
                                    "SelectNoLabel"
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
                                    "PanNoLabel"
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
                                    "ZoomNoLabel"
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
                                    "ZoomInNoLabel"
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
                                    "ZoomOutNoLabel"
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
                                    "ZoomToSelectionNoLabel"
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
                                    "PreviousViewNoLabel"
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
                                    "NextViewNoLabel"
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
                                    "StatusCoords"
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
                                    "StatusSelection"
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
                                    "StatusScale"
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
                                    "StatusViewSize"
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
                                    "VisaKoordinat"
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
                                    "BufferPanel"
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
                            }
                        ],
                        "Name": [
                            "MapRightClickMenu"
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
                                    "BufferPanel"
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
                                    "Redline"
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
                                    "MapRightClickMenu"
                                ]
                            }
                        ],
                        "MapId": [
                            "Bygglov1"
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
                                "DefaultDpi": [
                                    "96"
                                ],
                                "Disclaimer": [
                                    "The materials available at this web site are for informational purposes only and do not constitute a legal document."
                                ],
                                "PaperListEntry": null,
                                "RememberPlotOptions": [
                                    "false"
                                ],
                                "ScaleListEntry": null,
                                "ShowCoordinateLabels": [
                                    "true"
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
                            "Skriv ut"
                        ],
                        "Name": [
                            "QuickPlot"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Skriv ut kartbild"
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
                            {
                                "ElementId": null
                            }
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
                        "Name": [
                            "BufferPanel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att skapa buffer runt ett valt objekt"
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
                            "select-clear"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Avmarkera"
                        ],
                        "Name": [
                            "ClearSelection"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att avmarkera valda objekt"
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
                            {
                                "Direction": [
                                    "Previous"
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
                        "Name": [
                            "PreviousView"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zoom to previous extents"
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
                                    "Next"
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
                        "Name": [
                            "NextView"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zoom to next extents"
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
                            "Initial kartvy"
                        ],
                        "Location": null,
                        "Name": [
                            "InitialMapView"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zooma ut till initial kartvy"
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
                        "@xsi:type": [
                            "UiWidgetType"
                        ],
                        "Disabled": [
                            "false"
                        ],
                        "Extension": [
                            {
                                "Folder": null
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": [
                            "images/icons/dropdown.png"
                        ],
                        "Label": [
                            "Byt karta"
                        ],
                        "Location": null,
                        "Name": [
                            "MapMenu"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Växla mellan olika kartor"
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
                                "Layer": null,
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
                            "Maptip"
                        ],
                        "ImageUrl": [
                            "images/maptip.png"
                        ],
                        "Label": [
                            "Slå av/på tooltip"
                        ],
                        "Location": null,
                        "Name": [
                            "Maptip"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Maptip"
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
                                    "4"
                                ],
                                "DistancePrecision": [
                                    "0"
                                ],
                                "FillStyle": [
                                    "rgba(0,0,255, 0.3)"
                                ],
                                "LineStyleColor": [
                                    "rgba(0,0,255,0.3)"
                                ],
                                "LineStyleWidth": [
                                    "2"
                                ],
                                "MeasureTipPositionLeft": [
                                    "15"
                                ],
                                "MeasureTipPositionTop": [
                                    "100"
                                ],
                                "MeasureTooltipContainer": [
                                    "MeasureContainerBox"
                                ],
                                "MeasureTooltipType": [
                                    "static"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Type": [
                                    "Distance"
                                ],
                                "Units": [
                                    "Meters"
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
                            "Mät längd"
                        ],
                        "Location": null,
                        "Name": [
                            "Measure"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Mät längd"
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
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "featureinfo"
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
                            "Gör ett urval"
                        ],
                        "Location": null,
                        "Name": [
                            "Query"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att ställa fråga mot data och skapa urval."
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
                            {
                                "DefaultControl": [
                                    "point"
                                ],
                                "FeatureStyle": null,
                                "Target": [
                                    "TaskPane"
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
                            "Rita"
                        ],
                        "Location": null,
                        "Name": [
                            "Redline"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att rita punkter, linjer eller ytor. Objekten är temporära men kan sparas som GML."
                        ],
                        "Type": [
                            "Redline"
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
                                "MapId": null,
                                "MaxRatio": [
                                    "18"
                                ],
                                "MinRatio": [
                                    "6"
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
                            "Panorera"
                        ],
                        "Location": null,
                        "Name": [
                            "Pan"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka och dra för att panorera i kartan."
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
                                "ImageBaseUrl": null,
                                "PageTitle": null,
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
                                ],
                                "ResourceId": null,
                                "Scale": null
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
                            "Välj"
                        ],
                        "Location": null,
                        "Name": [
                            "Select"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att välja objekt på karta. Information om objekt visas i fliken urval"
                        ],
                        "Type": [
                            "Select"
                        ]
                    },
                    {
                        "Extension": null,
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
                            "Välj inom yta"
                        ],
                        "Location": null,
                        "Name": [
                            "SelectPolygon"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Välj objekt på karta genom att rita en yta"
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
                                "RadiusTooltipContainer": null,
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
                            "Välj inom radie"
                        ],
                        "Name": [
                            "SelectRadius"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Välj objekt på karta genom att rita en radie"
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
                                "DisableIfSelectionEmpty": [
                                    "true"
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
                            "Välj inom valt objekt"
                        ],
                        "Location": null,
                        "Name": [
                            "SelectWithin"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att välja objekt inom markerad yta"
                        ],
                        "Type": [
                            "SelectWithin"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "InitialTask": [
                                    "../../../templates/mapguide/Dokument/Taskpane/Underlagskarta_OPL/SLK_Taskpane_hoger.htm"
                                ],
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
                                "DisplayUnits": null
                            }
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
                        "Label": null,
                        "Name": [
                            "Zoom"
                        ],
                        "StatusText": [
                            "Click or click and drag on the map to zoom in"
                        ],
                        "Tooltip": [
                            "Klicka och dra ut en ruta för att zooma in"
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
                            "Zooma ut"
                        ],
                        "Location": null,
                        "Name": [
                            "ZoomOut"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att zooma ut"
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
                                    "2.0"
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
                            "Zooma in"
                        ],
                        "Location": null,
                        "Name": [
                            "ZoomIn"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka och dra för att zooma in i kartan"
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
                            "Gå till markerat objekt"
                        ],
                        "Location": null,
                        "Name": [
                            "ZoomToSelection"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Gå till markerat objekt"
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
                                "Script": [
                                    "cadqshowcoordinates.showCoordinates.show();"
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": [
                            "CoordinateSearch/icons/compass_3.gif"
                        ],
                        "Label": [
                            "Visa koordinat"
                        ],
                        "Location": null,
                        "Name": [
                            "VisaKoordinat"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Visa och sök på koordiant"
                        ],
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
                                "Direction": [
                                    "Next"
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
                        "Name": [
                            "NextViewNoLabel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zoom to next extents"
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
                            "PanNoLabel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Panorera i kartan"
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
                                    "Previous"
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
                        "Name": [
                            "PreviousViewNoLabel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zoom to previous extents"
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
                            "SelectNoLabel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Välja objekt på karta"
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
                        "Name": [
                            "ZoomNoLabel"
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
                                "Factor": [
                                    "2.0"
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
                            "ZoomInNoLabel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zooma in genom att klicka och dra"
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
                            "ZoomOutNoLabel"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zoom ut"
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
                            "ZoomToSelectionNoLabel"
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
                                "Script": [
                                    "showOverviewMap()"
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Overview Map"
                        ],
                        "Location": null,
                        "Name": [
                            "ShowOverviewMap"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Display the overview map window"
                        ],
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
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Task Pane"
                        ],
                        "Location": null,
                        "Name": [
                            "ShowTaskWindow"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Display the task pane window"
                        ],
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
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": null,
                        "Label": [
                            "Show Legend"
                        ],
                        "Location": null,
                        "Name": [
                            "ShowLegendWindow"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Display the legend window"
                        ],
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
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": [
                            "about"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "ShowSelectionWindowNoLable"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Hämta information om urval"
                        ],
                        "Type": [
                            "InvokeScript"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "Precision": [
                                    "4"
                                ],
                                "Template": [
                                    "x: {x}, y: {y}"
                                ],
                                "Units": [
                                    "dd"
                                ]
                            }
                        ],
                        "Name": [
                            "StatusCoords"
                        ],
                        "Type": [
                            "CursorPosition"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "EmptyText": [
                                    "No features selected"
                                ],
                                "Template": [
                                    "{0} feature(s) selected on {1} layer(s)"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "StatusSelection"
                        ],
                        "Type": [
                            "SelectionInfo"
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
                        "Name": [
                            "StatusScale"
                        ],
                        "Type": [
                            "EditableScale"
                        ]
                    },
                    {
                        "Extension": [
                            {
                                "Precision": [
                                    "2"
                                ],
                                "Template": [
                                    "{w} x {h} {units}"
                                ],
                                "Units": [
                                    "Meters"
                                ]
                            }
                        ],
                        "Location": null,
                        "Name": [
                            "StatusViewSize"
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
                                "Script": [
                                    "showOverviewMap()"
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": [
                            "iconNavigator"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "StatusOverviewMap"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Display the overview map window"
                        ],
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
                                    "showOverviewMap()"
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": [
                            "iconNavigator"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "StatusNavigator"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Display the overview map window"
                        ],
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
                                    "showFastfort();"
                                ],
                                "Target": null
                            }
                        ],
                        "ImageClass": null,
                        "ImageUrl": [
                            "images/icons/FastfortUtokad_table.png"
                        ],
                        "Label": [
                            "Fastighetsförteckning"
                        ],
                        "Location": null,
                        "Name": [
                            "showFastfort"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "InvokeScript"
                        ]
                    },
                    {
                        "Extension": null,
                        "Location": null,
                        "Name": [
                            "Fastfort"
                        ],
                        "Type": [
                            "Fastfort"
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
                                "DefaultDpi": [
                                    "96"
                                ],
                                "Disclaimer": [
                                    "The materials available at this web site are for informational purposes only and do not constitute a legal document."
                                ],
                                "PaperListEntry": null,
                                "RememberPlotOptions": [
                                    "false"
                                ],
                                "ScaleListEntry": null,
                                "ShowCoordinateLabels": [
                                    "true"
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
                        "Label": null,
                        "Name": [
                            "QuickPlotNoLable"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Skriv ut kartbild"
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
                        "Label": null,
                        "Location": null,
                        "Name": [
                            "SelectPolygonNoLable"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Välj objekt på karta genom att rita en yta"
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
                        "Extension": null,
                        "ImageClass": [
                            "select-clear"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Name": [
                            "ClearSelectionNoLable"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Avmarkera objekt"
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
                            "zoom-in-fixed"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": null,
                        "Name": [
                            "ZoomNoLable"
                        ],
                        "StatusText": [
                            "Click or click and drag on the map to zoom in"
                        ],
                        "Tooltip": [
                            "Klicka och dra ut en ruta för att zooma in"
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
                                "Filter": [
                                    "FASTIGHET LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Fastighet_yta"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök fastighet:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Fastighet:"
                                                ],
                                                "Property": [
                                                    "FASTIGHET"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Fastighet"
                        ],
                        "Location": null,
                        "Name": [
                            "Search"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Click to carry out a search on the map data"
                        ],
                        "Type": [
                            "Search"
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
                            "InitialMapViewNoLable"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Zooma ut till initial kartvy"
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
                                "Filter": [
                                    "BELADRESS LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Adressok_MG"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök adress:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Adress:"
                                                ],
                                                "Property": [
                                                    "BELADRESS"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Postort:"
                                                ],
                                                "Property": [
                                                    "POSTORT"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Adress"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchAdresser"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
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
                                "Filter": [
                                    "BELADRESS LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Adressok_MG"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök adress:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Adress:"
                                                ],
                                                "Property": [
                                                    "BELADRESS"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Postnummer:"
                                                ],
                                                "Property": [
                                                    "POSTNR"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Postort:"
                                                ],
                                                "Property": [
                                                    "POSTORT"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Adress"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchAuto"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
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
                                "Filter": [
                                    "FASTIGHET LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Fastighet_yta"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök fastighet:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Fastighet:"
                                                ],
                                                "Property": [
                                                    "FASTIGHET"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Area [m2]:"
                                                ],
                                                "Property": [
                                                    "AREA"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "CDFNR:"
                                                ],
                                                "Property": [
                                                    "CFDFNR"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Fastighet"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchAutoFastighet"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
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
                                "Filter": [
                                    "Foretagsnamn LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Foretag_alla"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök företag:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Företag"
                                                ],
                                                "Property": [
                                                    "Foretagsnamn"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Besöksadress:"
                                                ],
                                                "Property": [
                                                    "Besoksadress"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Ort:"
                                                ],
                                                "Property": [
                                                    "Besoksort"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Bransch:"
                                                ],
                                                "Property": [
                                                    "Bransch_1"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Företag"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchAutoForetag"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
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
                                "Filter": [
                                    "Kategori = 'Kvarterstraktnamn' AND Text LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Fastighetbet_text"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök kvarter:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Kvartersnamn:"
                                                ],
                                                "Property": [
                                                    "Text"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Kvarter"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchAutoKvarter"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
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
                                "Filter": [
                                    "HUVUDNR LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Huvudvagar_vagnummer"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök vägnummer:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Vägnummer:"
                                                ],
                                                "Property": [
                                                    "HUVUDNR"
                                                ]
                                            },
                                            {
                                                "Name": [
                                                    "Längd [m]:"
                                                ],
                                                "Property": [
                                                    "SHAPE_LEN"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Vägnummer"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchAutoVagnummer"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
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
                                "ImageClass": [
                                    "measure"
                                ],
                                "ImageUrl": [
                                    "images/icons.png"
                                ],
                                "Label": [
                                    "Länk till kartvyn"
                                ],
                                "Tooltip": [
                                    "Klicka för att hämta en länk till aktuell kartbild"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "legend-map"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Länk till karta"
                        ],
                        "Location": null,
                        "Name": [
                            "LinkToView"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Klicka för att få länk till karta"
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
                            {
                                "AreaPrecision": [
                                    "0"
                                ],
                                "DistancePrecision": [
                                    "4"
                                ],
                                "FillStyle": [
                                    "rgba(0,0,255, 0.3)"
                                ],
                                "LineStyleColor": [
                                    "rgba(0,0,255,0.3)"
                                ],
                                "LineStyleWidth": [
                                    "2"
                                ],
                                "MeasureTipPositionLeft": [
                                    "15"
                                ],
                                "MeasureTipPositionTop": [
                                    "100"
                                ],
                                "MeasureTooltipContainer": [
                                    "MeasureContainerBox"
                                ],
                                "MeasureTooltipType": [
                                    "static"
                                ],
                                "Target": [
                                    "TaskPane"
                                ],
                                "Type": [
                                    "Area"
                                ],
                                "Units": [
                                    "Meters"
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
                            "Mäta area"
                        ],
                        "Location": null,
                        "Name": [
                            "Measure (1)"
                        ],
                        "StatusText": null,
                        "Tooltip": [
                            "Mät area och längd"
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
                                "Filter": [
                                    "Text LIKE '%25$USER_VARIABLE%25'"
                                ],
                                "Layer": [
                                    "Fastighetbet_text"
                                ],
                                "MatchLabel": null,
                                "MatchLimit": [
                                    "100"
                                ],
                                "Prompt": [
                                    "Sök kvarter:"
                                ],
                                "ResultColumns": [
                                    {
                                        "Column": [
                                            {
                                                "Name": [
                                                    "Kvartersnamn:"
                                                ],
                                                "Property": [
                                                    "Text"
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "Target": [
                                    "TaskPane"
                                ]
                            }
                        ],
                        "ImageClass": [
                            "search"
                        ],
                        "ImageUrl": [
                            "images/icons.png"
                        ],
                        "Label": [
                            "Sök Kvarter"
                        ],
                        "Location": null,
                        "Name": [
                            "SearchKvarter"
                        ],
                        "StatusText": null,
                        "Tooltip": null,
                        "Type": [
                            "Search"
                        ]
                    }
                ]
            }
        ]
    }
}