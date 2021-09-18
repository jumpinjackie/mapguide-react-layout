export default {
    "RuntimeMap": {
        "@version": [
            "3.0.0"
        ],
        "@xmlns:xsi": [
            "http://www.w3.org/2001/XMLSchema-instance"
        ],
        "@xsi:noNamespaceSchemaLocation": [
            "RuntimeMap-3.0.0.xsd"
        ],
        "BackgroundColor": [
            "ffcdbd9c"
        ],
        "CoordinateSystem": [
            {
                "EpsgCode": [
                    "4326"
                ],
                "MentorCode": [
                    "LL84"
                ],
                "MetersPerUnit": [
                    "111319.49079327358"
                ],
                "Wkt": [
                    "GEOGCS[\"WGS84 Lat/Long's, Degrees, -180 ==> +180\",DATUM[\"D_WGS_1984\",SPHEROID[\"World_Geodetic_System_of_1984\",6378137,298.257222932867]],PRIMEM[\"Greenwich\",0],UNIT[\"Degree\",0.017453292519943295]]"
                ]
            }
        ],
        "DisplayDpi": [
            "96"
        ],
        "Extents": [
            {
                "LowerLeftCoordinate": [
                    {
                        "X": [
                            "-87.764986990962839"
                        ],
                        "Y": [
                            "43.691398128787782"
                        ]
                    }
                ],
                "UpperRightCoordinate": [
                    {
                        "X": [
                            "-87.695521510899724"
                        ],
                        "Y": [
                            "43.797520000480347"
                        ]
                    }
                ]
            }
        ],
        "Group": [
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Base Map"
                ],
                "Name": [
                    "Base Map"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8001-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Municipal"
                ],
                "Name": [
                    "Municipal"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8002-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "LegendLabel": [
                    "Transportation"
                ],
                "Name": [
                    "Transportation"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8003-0a002700000e"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "IconMimeType": [
            "image/png"
        ],
        "Layer": [
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:Trees"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/Trees.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Trees.LayerDefinition"
                ],
                "LegendLabel": [
                    "Trees"
                ],
                "Name": [
                    "Trees"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-800b-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8002-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAARRJREFUOI2l0z1LQmEYxvHfOXmSFok8vShFq2JLLkG0FPR1+hitRVt9kxbbghanItdo6U0RB8XeaFDkYFkd/E/PDdd1cz1wX4GfWUAV5eF8izpaE/QjYpEjGV0FbZt6NvUUtGV0RY4QJw1B4r0ucqVi3p6s3NjqDmr6brS92cJdckEscm1XbNvMrxkvfbjw4s0GXgbiyKGKHfuiv/5oTagl0jTn03mAvIx7B+a+xZ5EByd63q2GqFry+m8z5LDoFdUQJcuyKewDVmRRDlMbxwjR8Kif2vmgj9sQdU9mdVKYO3g2i3qIpsCZWooUNX2BU7SmPqSpT3mcWORYRlcxUabiqEzHfilTkrxBnUvDuWFQ5+a48AuKI1HyEp3qeQAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "1"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "12000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:RoadCenterLines"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/RoadCenterLines.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Roads.LayerDefinition"
                ],
                "LegendLabel": [
                    "Roads"
                ],
                "Name": [
                    "Roads"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8001-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8003-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAw1tfXf6LEACZquWQUDGkAAJOZAnOhhw4fAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "2"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "10000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    },
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAw1tfXf6LEACZquWQUDGkAAJOZAnOhhw4fAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "2"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "24000"
                        ],
                        "MinScale": [
                            "10000"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:Rail"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/Rail.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Tracks.LayerDefinition"
                ],
                "LegendLabel": [
                    "Rail Lines"
                ],
                "Name": [
                    "Rail Lines"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8002-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8003-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAH5JREFUOI1jYBjygBHG8PDwYJeWlnabO3fuZmI0wtQzwQTExMRUGBgYOoi1GaaeiaBKAoBiAxiTk5MbGBgYGP7//6/NxMQU8v///0Y86rWg9DWYespdAGPExcVps7Kyrpo7d642MRph6gc+EOEGvHr16s7///8ridVIqvpBDADwGyit6VCFVQAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "2"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "24000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "Default:VotingDistricts"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/VotingDistricts.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Districts.LayerDefinition"
                ],
                "LegendLabel": [
                    "Districts"
                ],
                "Name": [
                    "Districts"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8003-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8002-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jXNIVdIDx//8DDGSA/4yMDgxLOwMbyNHMwMDAsLQzsIGJXM0wMGrAqAGjBkAAI6XZGQAhVhCbfcJbYwAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "10000"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:BuildingOutlines"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/BuildingOutlines.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Buildings.LayerDefinition"
                ],
                "LegendLabel": [
                    "Buildings"
                ],
                "Name": [
                    "Buildings"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-800a-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8002-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD9JREFUOI3tzDEVwFAMw0C373MQC/MnEAJhYRTt0KVz5mjXXVX1JNEkQCeJunsE2NY9On8tsMACXweQ7dEM6AWSRg1B02biUQAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1500"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:Parcels"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/Parcels.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Parcels.LayerDefinition"
                ],
                "LegendLabel": [
                    "Parcels"
                ],
                "Name": [
                    "Parcels"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-800c-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8002-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "RTYPE = 'AGR'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1jnNBe9V+A4zcDOeDDD1YGFgGO3wyK/F/JMuA+AzcDE1k6kcCoAaMGjBoAASwffrAy3GfgJkvzhx+sDADG4w2aBVCvyQAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  AGR"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "RTYPE = 'EXM'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Ous+c/H9YeBHPDpGwsDCx/XHwZZ4R9kGfCYgYOBiSydSGDUgFEDRg2AAJZP31gYHjNwkKX50zcWBgDh7w2gYiFR3wAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  EXM"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "RTYPE = 'MER'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Omu/c/L84+BHPD5CxMDCy/PPwZJ8T9kGcDAwMLARKZOOBg1YNSAUQMggOXzFyYGBgYWsjR//sLEAACRYwvU9QFABgAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  MER"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "RTYPE = 'MFG'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD5JREFUOI1j7Oqt/8/Nx0AW+PqJgYGFm4+BQUz6P1kGvGJgZGAiz24EGDVg1IBRAyCA5esnSK4iB3z9xMAAAEnVC6Y05mSVAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": [
                                            "Zone:  MFG"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "RTYPE = 'RES'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Oxv/M8pwMhADvj+4T8DC6cAI4OQPDNZBrxj+MvARJZOJDBqwKgBowZAAMv3D/8Z3jH8JUvz9w//GQB8Kg+sTL/RWAAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  RES"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "RTYPE = 'S&W'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAENJREFUOI1jbJ/Y/J9diJmBHPDz3V8GFnYhZgZ+ZTayDPjI8IuBiSydSGDUgFEDRg2AAJaf7/4yfGT4RZbmn+/+MgAAmvYPsIiS2soAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  S&W"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "RTYPE = 'WTC'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1jbJ3c8p9NhJWBHPDrzW8GFjYRVgZudS6yDGBg+MbARKZOOBg1YNSAUQMggOXXm98MDAzfyNL8681vBgAVJg3IbKdDKgAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  WTC"
                                        ]
                                    },
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1jNDU1/W9qaspADjh9+jQDi6mpKUNWVhZZBkybNo2BiSydSGDUgFEDRg2AAEZKszMAWEoM/Dho0fsAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "Zone:  Other"
                                        ]
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "10000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "true"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:Islands"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/Islands.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Islands.LayerDefinition"
                ],
                "LegendLabel": [
                    "Islands"
                ],
                "Name": [
                    "Islands"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-800d-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8001-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jvHpizX8GCgATJZpHDRg1YNSAwWQAAJHuA2i4bNaHAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:HydrographicPolygons"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/HydrographicPolygons.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Hydrography.LayerDefinition"
                ],
                "LegendLabel": [
                    "Hydrography"
                ],
                "Name": [
                    "Hydrography"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-800e-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8001-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jXH385X8GCgATJZpHDRg1YNSAwWQAANqDA3rC62i6AAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            },
            {
                "ActuallyVisible": [
                    "false"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:Soils"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/Soils.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/Soils.LayerDefinition"
                ],
                "LegendLabel": [
                    "Soils"
                ],
                "Name": [
                    "Soils"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-800f-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8001-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jZGVieC/AznCPgQzw4SeDEosAO8O9TDOGOeQYMP0UQwoTORqRwagBowaMGgABjJRmZwDtGAwCk1TQvgAAAABJRU5ErkJggg=="
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "false"
                ]
            },
            {
                "ActuallyVisible": [
                    "true"
                ],
                "DisplayInLegend": [
                    "true"
                ],
                "ExpandInLegend": [
                    "true"
                ],
                "FeatureSource": [
                    {
                        "ClassName": [
                            "SHP_Schema:CityLimits"
                        ],
                        "Geometry": [
                            "SHPGEOM"
                        ],
                        "ResourceId": [
                            "Library://Samples/Sheboygan/Data/CityLimits.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Samples/Sheboygan/Layers/CityLimits.LayerDefinition"
                ],
                "LegendLabel": [
                    "CityLimits"
                ],
                "Name": [
                    "CityLimits"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8011-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8001-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jPHDgwH8GCgATJZpHDRg1YNSAwWQAAG1HA1/7dPCRAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "10000"
                        ],
                        "MinScale": [
                            "0"
                        ]
                    },
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jvHpizX8GCgATJZpHDRg1YNSAwWQAAJHuA2i4bNaHAAAAAElFTkSuQmCC"
                                        ],
                                        "LegendLabel": null
                                    }
                                ],
                                "Type": [
                                    "3"
                                ]
                            }
                        ],
                        "MaxScale": [
                            "1000000000000"
                        ],
                        "MinScale": [
                            "10000"
                        ]
                    }
                ],
                "Selectable": [
                    "false"
                ],
                "Type": [
                    "1"
                ],
                "Visible": [
                    "true"
                ]
            }
        ],
        "MapDefinition": [
            "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition"
        ],
        "Name": [
            "Sheboygan"
        ],
        "SessionId": [
            "92bd21f4-18a2-11ec-8000-0a002700000e_en_MTI3LjAuMC4x0B060B050B04"
        ],
        "SiteVersion": [
            "4.0.0.9862"
        ]
    }
};