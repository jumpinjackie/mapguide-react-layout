export default {
    "TileSetDefinition": {
        "@xmlns:xsi": [
            "http://www.w3.org/2001/XMLSchema-instance"
        ],
        "@xsi:noNamespaceSchemaLocation": [
            "TileSetDefinition-3.0.0.xsd"
        ],
        "BaseMapLayerGroup": [
            {
                "BaseMapLayer": [
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "Roads"
                        ],
                        "Name": [
                            "Roads"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/Roads.LayerDefinition"
                        ],
                        "Selectable": [
                            "false"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    },
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "Districts"
                        ],
                        "Name": [
                            "Districts"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/Districts.LayerDefinition"
                        ],
                        "Selectable": [
                            "false"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    },
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "Buildings"
                        ],
                        "Name": [
                            "Buildings"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/Buildings.LayerDefinition"
                        ],
                        "Selectable": [
                            "false"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    },
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "Parcels"
                        ],
                        "Name": [
                            "Parcels"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/Parcels.LayerDefinition"
                        ],
                        "Selectable": [
                            "true"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    },
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "Islands"
                        ],
                        "Name": [
                            "Islands"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/Islands.LayerDefinition"
                        ],
                        "Selectable": [
                            "false"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    },
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "Hydrography"
                        ],
                        "Name": [
                            "Hydrography"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/Hydrography.LayerDefinition"
                        ],
                        "Selectable": [
                            "false"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    },
                    {
                        "ExpandInLegend": [
                            "true"
                        ],
                        "LegendLabel": [
                            "CityLimits"
                        ],
                        "Name": [
                            "CityLimits"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Layers/CityLimits.LayerDefinition"
                        ],
                        "Selectable": [
                            "false"
                        ],
                        "ShowInLegend": [
                            "true"
                        ]
                    }
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Tiled Layers"
                ],
                "Name": [
                    "Base Layer Group"
                ],
                "ShowInLegend": [
                    "true"
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "Extents": [
            {
                "MaxX": [
                    "-9762220.7994439267"
                ],
                "MaxY": [
                    "5434161.2241863841"
                ],
                "MinX": [
                    "-9769953.6613122653"
                ],
                "MinY": [
                    "5417808.8801717851"
                ]
            }
        ],
        "TileStoreParameters": [
            {
                "Parameter": [
                    {
                        "Name": [
                            "TilePath"
                        ],
                        "Value": [
                            "%MG_TILE_CACHE_PATH%"
                        ]
                    },
                    {
                        "Name": [
                            "TileFormat"
                        ],
                        "Value": [
                            "PNG"
                        ]
                    }
                ],
                "TileProvider": [
                    "XYZ"
                ]
            }
        ]
    }
}