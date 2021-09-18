export default {
    "WebLayout": {
        "@xmlns:xsd": [
            "http://www.w3.org/2001/XMLSchema"
        ],
        "@xmlns:xsi": [
            "http://www.w3.org/2001/XMLSchema-instance"
        ],
        "@xsi:noNamespaceSchemaLocation": [
            "WebLayout-1.0.0.xsd"
        ],
        "CommandSet": [
            {
                "Command": [
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "Pan"
                        ],
                        "Description": [
                            "Drag the map to view areas out of range"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_pan_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_pan.gif"
                        ],
                        "Label": [
                            "Pan"
                        ],
                        "Name": [
                            "Pan"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Pan mode"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "PanUp"
                        ],
                        "Description": [
                            "Pan up by a preset increment"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_panup_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_panup.gif"
                        ],
                        "Label": [
                            "Pan Up"
                        ],
                        "Name": [
                            "Pan Up"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Pan up"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "PanDown"
                        ],
                        "Description": [
                            "Pan down by a preset increment"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_pandown_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_pandown.gif"
                        ],
                        "Label": [
                            "Pan Down"
                        ],
                        "Name": [
                            "Pan Down"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Pan down"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "PanRight"
                        ],
                        "Description": [
                            "Pan right by a preset increment"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_panright_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_panright.gif"
                        ],
                        "Label": [
                            "Pan Right"
                        ],
                        "Name": [
                            "Pan Right"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Pan right"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "PanLeft"
                        ],
                        "Description": [
                            "Pan left by a preset increment"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_panleft_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_panleft.gif"
                        ],
                        "Label": [
                            "Pan Left"
                        ],
                        "Name": [
                            "Pan Left"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Pan left"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "Zoom"
                        ],
                        "Description": [
                            "Zoom dynamically by clicking and dragging"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoom_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoom.gif"
                        ],
                        "Label": [
                            "Zoom"
                        ],
                        "Name": [
                            "Zoom"
                        ],
                        "TargetViewer": [
                            "Dwf"
                        ],
                        "Tooltip": [
                            "Zoom dynamic"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "ZoomIn"
                        ],
                        "Description": [
                            "Zoom in by a preset increment"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoomin_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoomin.gif"
                        ],
                        "Label": [
                            "Zoom In"
                        ],
                        "Name": [
                            "Zoom In"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Zoom in"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "ZoomOut"
                        ],
                        "Description": [
                            "Zoom out by a preset increment"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoomout_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoomout.gif"
                        ],
                        "Label": [
                            "Zoom Out"
                        ],
                        "Name": [
                            "Zoom Out"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Zoom out"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "ZoomRectangle"
                        ],
                        "Description": [
                            "Zoom in on an area"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoomrect_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoomrect.gif"
                        ],
                        "Label": [
                            "Zoom Rectangle"
                        ],
                        "Name": [
                            "Zoom Rectangle"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Zoom rectangle"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "ZoomToSelection"
                        ],
                        "Description": [
                            "Zoom to extents of selected features"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoomselect_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoomselect.gif"
                        ],
                        "Label": [
                            "Zoom Selection"
                        ],
                        "Name": [
                            "Zoom Selection"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Zoom to selection"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "FitToWindow"
                        ],
                        "Description": [
                            "Fit the extents of the map to the window"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_fitwindow_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_fitwindow.gif"
                        ],
                        "Label": [
                            "Initial Map View"
                        ],
                        "Name": [
                            "Initial Map View"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Initial map view"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "PreviousView"
                        ],
                        "Description": [
                            "Go to previous view"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoomprev_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoomprev.gif"
                        ],
                        "Label": [
                            "Previous View"
                        ],
                        "Name": [
                            "Previous View"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Previous view"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "NextView"
                        ],
                        "Description": [
                            "Go to next view"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_zoomnext_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_zoomnext.gif"
                        ],
                        "Label": [
                            "Next View"
                        ],
                        "Name": [
                            "Next View"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Next view"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "RestoreView"
                        ],
                        "Description": [
                            "Zoom to initial map center and scale"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_restorecenter_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_restorecenter.gif"
                        ],
                        "Label": [
                            "Initial Center and Scale"
                        ],
                        "Name": [
                            "Initial Center and Scale"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Initial center and scale"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "Select"
                        ],
                        "Description": [
                            "Select features by clicking and dragging"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_select_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_select.gif"
                        ],
                        "Label": [
                            "Select"
                        ],
                        "Name": [
                            "Select"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Select mode"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "SelectRadius"
                        ],
                        "Description": [
                            "Click and drag to select all features inside the circle"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_selectradius_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_selectradius.gif"
                        ],
                        "Label": [
                            "Select Radius"
                        ],
                        "Name": [
                            "Select Radius"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Select radius"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "SelectPolygon"
                        ],
                        "Description": [
                            "Create a polygon to select all features that fall within"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_selectpolygon_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_selectpolygon.gif"
                        ],
                        "Label": [
                            "Select Polygon"
                        ],
                        "Name": [
                            "Select Polygon"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Select polygon"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "ClearSelection"
                        ],
                        "Description": [
                            "Clear the current selections"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_clearselect_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_clearselect.gif"
                        ],
                        "Label": [
                            "Clear Selection"
                        ],
                        "Name": [
                            "Clear Selection"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Clear selection"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "Refresh"
                        ],
                        "Description": [
                            "Refresh map and reload all layers keeping current center and scale"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_refreshmap_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_refreshmap.gif"
                        ],
                        "Label": [
                            "Refresh Map"
                        ],
                        "Name": [
                            "Refresh Map"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Refresh map"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "CopyMap"
                        ],
                        "Description": [
                            "Copy current view of map to clipboard"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_copy_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_copy.gif"
                        ],
                        "Label": [
                            "Copy"
                        ],
                        "Name": [
                            "Copy"
                        ],
                        "TargetViewer": [
                            "Dwf"
                        ],
                        "Tooltip": [
                            "Copy"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BasicCommandType"
                        ],
                        "Action": [
                            "About"
                        ],
                        "Description": [
                            "Display information about this application"
                        ],
                        "DisabledImageURL": null,
                        "ImageURL": null,
                        "Label": [
                            "About"
                        ],
                        "Name": [
                            "About"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "About"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "BufferCommandType"
                        ],
                        "Description": [
                            "Create buffers around the selected features"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_buffer_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_buffer.gif"
                        ],
                        "Label": [
                            "Buffer"
                        ],
                        "Name": [
                            "Buffer"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Buffer"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "SelectWithinCommandType"
                        ],
                        "Description": [
                            "Select features that fall within currently selected areas"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_selectwithin_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_selectwithin.gif"
                        ],
                        "Label": [
                            "Select Within"
                        ],
                        "Name": [
                            "Select Within"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Select within"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "PrintCommandType"
                        ],
                        "Description": [
                            "Print with optional layout"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_print_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_print.gif"
                        ],
                        "Label": [
                            "Print"
                        ],
                        "Name": [
                            "Print"
                        ],
                        "TargetViewer": [
                            "Dwf"
                        ],
                        "Tooltip": [
                            "Print"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "MeasureCommandType"
                        ],
                        "Description": [
                            "Measure distances on the map"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_measure_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_measure.gif"
                        ],
                        "Label": [
                            "Measure"
                        ],
                        "Name": [
                            "Measure"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Measure"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "ViewOptionsCommandType"
                        ],
                        "Description": [
                            "View Options"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_viewoptions_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_viewoptions.gif"
                        ],
                        "Label": [
                            "View Options"
                        ],
                        "Name": [
                            "View Options"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "View Options"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "GetPrintablePageCommandType"
                        ],
                        "Description": [
                            "Get printer-friendly page"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_printablepage_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_printablepage.gif"
                        ],
                        "Label": [
                            "Get Printable Page"
                        ],
                        "Name": [
                            "Get Printable Page"
                        ],
                        "Target": [
                            "NewWindow"
                        ],
                        "TargetViewer": [
                            "Ajax"
                        ],
                        "Tooltip": [
                            "Get printable Page"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "HelpCommandType"
                        ],
                        "Description": [
                            "Launch help for this application"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_help_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_help.gif"
                        ],
                        "Label": [
                            "Help"
                        ],
                        "Name": [
                            "Help"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Help"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "InvokeURLCommandType"
                        ],
                        "Description": [
                            "Query the Data"
                        ],
                        "DisableIfSelectionEmpty": [
                            "false"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_invokeurl_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_invokeurl.gif"
                        ],
                        "Label": [
                            "Query"
                        ],
                        "Name": [
                            "Query"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Query the Data"
                        ],
                        "URL": [
                            "../phpviewersample/query/querymain.php"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "InvokeURLCommandType"
                        ],
                        "Description": [
                            "Display an overview of the application"
                        ],
                        "DisableIfSelectionEmpty": [
                            "false"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_invokeurl_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_invokeurl.gif"
                        ],
                        "Label": [
                            "Overview"
                        ],
                        "Name": [
                            "Overview"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Display an Overview"
                        ],
                        "URL": [
                            "../phpviewersample/overview/overviewmain.php"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "InvokeURLCommandType"
                        ],
                        "Description": [
                            "Create a Theme"
                        ],
                        "DisableIfSelectionEmpty": [
                            "false"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_invokeurl_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_invokeurl.gif"
                        ],
                        "Label": [
                            "Theme"
                        ],
                        "Name": [
                            "Theme"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Create a Theme"
                        ],
                        "URL": [
                            "../phpviewersample/theme/thememain.php"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "InvokeURLCommandType"
                        ],
                        "Description": [
                            "Plot the current map as a DWF"
                        ],
                        "DisableIfSelectionEmpty": [
                            "false"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_invokeurl_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_invokeurl.gif"
                        ],
                        "Label": [
                            "Plot as DWF"
                        ],
                        "Name": [
                            "Plot"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Plot as DWF"
                        ],
                        "URL": [
                            "../phpviewersample/plot/plotmain.php"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "InvokeURLCommandType"
                        ],
                        "Description": [
                            "Find an address in Sheboygan"
                        ],
                        "DisableIfSelectionEmpty": [
                            "false"
                        ],
                        "DisabledImageURL": [
                            "../stdicons/icon_invokeurl_disabled.gif"
                        ],
                        "ImageURL": [
                            "../stdicons/icon_invokeurl.gif"
                        ],
                        "Label": [
                            "Find Address"
                        ],
                        "Name": [
                            "Find Address"
                        ],
                        "Target": [
                            "TaskPane"
                        ],
                        "TargetViewer": [
                            "All"
                        ],
                        "Tooltip": [
                            "Find an Address"
                        ],
                        "URL": [
                            "../phpviewersample/findaddress/findaddressmain.php"
                        ]
                    }
                ]
            }
        ],
        "ContextMenu": [
            {
                "MenuItem": [
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Print"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Refresh Map"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Copy"
                        ],
                        "Function": [
                            "Command"
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Pan"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom Rectangle"
                        ],
                        "Function": [
                            "Command"
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom In"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom Out"
                        ],
                        "Function": [
                            "Command"
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
                        ],
                        "SubItem": [
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Initial Map View"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Previous View"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Next View"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Initial Center and Scale"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Zoom Selection"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            }
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Select"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Clear Selection"
                        ],
                        "Function": [
                            "Command"
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
                        ],
                        "SubItem": [
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Select Radius"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Select Polygon"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Select Within"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            }
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Buffer"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Measure"
                        ],
                        "Function": [
                            "Command"
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "View Options"
                        ],
                        "Function": [
                            "Command"
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Help"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "About"
                        ],
                        "Function": [
                            "Command"
                        ]
                    }
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "InformationPane": [
            {
                "LegendVisible": [
                    "true"
                ],
                "PropertiesVisible": [
                    "true"
                ],
                "Visible": [
                    "true"
                ],
                "Width": [
                    "200"
                ]
            }
        ],
        "Map": [
            {
                "HyperlinkTarget": [
                    "TaskPane"
                ],
                "ResourceId": [
                    "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition"
                ]
            }
        ],
        "StatusBar": [
            {
                "Visible": [
                    "true"
                ]
            }
        ],
        "TaskPane": [
            {
                "InitialTask": [
                    "../phpviewersample/overview/overviewmain.php"
                ],
                "TaskBar": [
                    {
                        "Back": [
                            {
                                "Description": [
                                    "Return to previous task page"
                                ],
                                "DisabledImageURL": [
                                    "../stdicons/icon_back_disabled.gif"
                                ],
                                "ImageURL": [
                                    "../stdicons/icon_back.gif"
                                ],
                                "Name": [
                                    "Back"
                                ],
                                "Tooltip": [
                                    "Return to previous task page"
                                ]
                            }
                        ],
                        "Forward": [
                            {
                                "Description": [
                                    "Forward to next task page"
                                ],
                                "DisabledImageURL": [
                                    "../stdicons/icon_forward_disabled.gif"
                                ],
                                "ImageURL": [
                                    "../stdicons/icon_forward.gif"
                                ],
                                "Name": [
                                    "Forward"
                                ],
                                "Tooltip": [
                                    "Forward to next task page"
                                ]
                            }
                        ],
                        "Home": [
                            {
                                "Description": [
                                    "Return to home task page"
                                ],
                                "DisabledImageURL": [
                                    "../stdicons/icon_home_disabled.gif"
                                ],
                                "ImageURL": [
                                    "../stdicons/icon_home.gif"
                                ],
                                "Name": [
                                    "Home"
                                ],
                                "Tooltip": [
                                    "Return to home task page"
                                ]
                            }
                        ],
                        "MenuButton": [
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Overview"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Query"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Theme"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Find Address"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Plot"
                                ],
                                "Function": [
                                    "Command"
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
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Buffer"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Measure"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            }
                        ],
                        "Tasks": [
                            {
                                "Description": [
                                    "View a list of available tasks"
                                ],
                                "DisabledImageURL": [
                                    "../stdicons/icon_tasks_disabled.gif"
                                ],
                                "ImageURL": [
                                    "../stdicons/icon_tasks.gif"
                                ],
                                "Name": [
                                    "Tasks"
                                ],
                                "Tooltip": [
                                    "Task list"
                                ]
                            }
                        ],
                        "Visible": [
                            "true"
                        ]
                    }
                ],
                "Visible": [
                    "true"
                ],
                "Width": [
                    "250"
                ]
            }
        ],
        "Title": [
            "Sheboygan Map"
        ],
        "ToolBar": [
            {
                "Button": [
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Print"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Get Printable Page"
                        ],
                        "Function": [
                            "Command"
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Measure"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Buffer"
                        ],
                        "Function": [
                            "Command"
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
                        ],
                        "SubItem": [
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Previous View"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Next View"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            },
                            {
                                "@xsi:type": [
                                    "CommandItemType"
                                ],
                                "Command": [
                                    "Initial Map View"
                                ],
                                "Function": [
                                    "Command"
                                ]
                            }
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom Rectangle"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom In"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom Out"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Zoom"
                        ],
                        "Function": [
                            "Command"
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
                            "CommandItemType"
                        ],
                        "Command": [
                            "Select"
                        ],
                        "Function": [
                            "Command"
                        ]
                    },
                    {
                        "@xsi:type": [
                            "CommandItemType"
                        ],
                        "Command": [
                            "Pan"
                        ],
                        "Function": [
                            "Command"
                        ]
                    }
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "ZoomControl": [
            {
                "Visible": [
                    "true"
                ]
            }
        ]
    }
};