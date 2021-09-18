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
            "00ffffff"
        ],
        "CoordinateSystem": [
            {
                "EpsgCode": [
                    "26741"
                ],
                "MentorCode": [
                    "CA-I"
                ],
                "MetersPerUnit": [
                    "0.30480060960121919"
                ],
                "Wkt": [
                    "PROJCS[\"NAD_1927_StatePlane_California_I_FIPS_0401\",GEOGCS[\"GCS_North_American_1927\",DATUM[\"D_North_American_1927\",SPHEROID[\"Clarke_1866\",6378206.4,294.9786982]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Lambert_Conformal_Conic\"],PARAMETER[\"False_Easting\",2000000.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-122.0],PARAMETER[\"Standard_Parallel_1\",40.0],PARAMETER[\"Standard_Parallel_2\",41.66666666666666],PARAMETER[\"Latitude_Of_Origin\",39.33333333333334],UNIT[\"Foot_US\",0.3048006096012192]]"
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
                            "1875218.71875"
                        ],
                        "Y": [
                            "413797.484375"
                        ]
                    }
                ],
                "UpperRightCoordinate": [
                    {
                        "X": [
                            "1924050.2147280774"
                        ],
                        "Y": [
                            "491024.39689498628"
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
                    "false"
                ],
                "LegendLabel": [
                    "Cadastral"
                ],
                "Name": [
                    "Cadastral"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8005-0a002700000e"
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
                    "92c55f5e-18a2-11ec-8006-0a002700000e"
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
                    "Miscellaneous"
                ],
                "Name": [
                    "Miscellaneous"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8007-0a002700000e"
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
                    "Basemap"
                ],
                "Name": [
                    "Basemap"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8008-0a002700000e"
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
                    "Hydrology"
                ],
                "Name": [
                    "Hydrology"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-8009-0a002700000e"
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
                    "Utilities"
                ],
                "Name": [
                    "Utilities"
                ],
                "ObjectId": [
                    "92c55f5e-18a2-11ec-800a-0a002700000e"
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
                            "Default:signals"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/signals.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/signals.LayerDefinition"
                ],
                "LegendLabel": [
                    "signals"
                ],
                "Name": [
                    "signals"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8010-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8006-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZRJREFUOI2lkj+LGlEUxX+zxMCk8k/QQmSRbDOThRkWbRTBQt4WUYK13yCFxCqFn0RrtZkm26aIlRYLSRcsp5JAFhxfYTMEbpqdB2YmLEkOXLi8yz33nnse/CesJBERSfJGo4HWGq01rVaLXC5HEATnjZZlAVwkD8vlksFggOu61Go1PscxPx4e+Hh3h9Yay7JwXZdSqZS9yuMGAkihUBABE77vm1qCpO/iNxK63S6e5/GuUgHg680N+XwegPV6nRpsCOI4xrZtNpsNnufx5fIlCHx7/9oQKKWIoihbQhiGZk3f90UEE+1229SCIDiTcHYDpZQAUq/X5XR6YQiazaYAUq1WUzdI2bjf75lOp+x2OyzrnqurtxyPPxmPxyilzMDERoPFYiH9fl8cx5HhcCjXx2t5JcitIJPJRABxHEeKxeKfJSQ6y+WyPBfkmSCfBFmtVn9no+u6TO4/UAFO398wn8+BbBszv3IURXQ6HQ6HA71eD9u2mc1m542PN8gkANhut4RhCMBoNEpPforgKaRc+Ff8Akqt7dxtcGdEAAAAAElFTkSuQmCC"
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
                            "3000"
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
                            "Default:E-zone"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/E-zone.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/E-zone.LayerDefinition"
                ],
                "LegendLabel": [
                    "E-zone"
                ],
                "Name": [
                    "E-zone"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8012-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jVJJWfqCrpv+AgQxw+dZFBRZdNf0Hi1qWHiDHgLiaaAcmcjQig1EDRg0YNQACGCnNzgCmkhADfYX00wAAAABJRU5ErkJggg=="
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
                    "true"
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
                            "Default:Parks"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Parks.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Parks.LayerDefinition"
                ],
                "LegendLabel": [
                    "Parks"
                ],
                "Name": [
                    "Parks"
                ],
                "ObjectId": [
                    "92c58664-18a2-11ec-8013-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8007-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1jbO1tfcApxP6AgQzw/d1PBRZOIfYH8k7SB8gx4OG+pw5M5GhEBqMGjBowagAEsHx/91Ph4b6nDuRo/v7upwIAjKEUXSKCxqUAAAAASUVORK5CYII="
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
                            "25000"
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
                            "Default:Roads"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Roads.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Roads.LayerDefinition"
                ],
                "LegendLabel": [
                    "Roads"
                ],
                "Name": [
                    "Roads"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8000-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8006-0a002700000e"
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
                            "30000"
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
                            "Default:MiscFeatures"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/MiscFeatures.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/MiscFeatures.LayerDefinition"
                ],
                "LegendLabel": [
                    "MiscFeatures"
                ],
                "Name": [
                    "MiscFeatures"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8001-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8007-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAw1tfXN1BiABOVHDIKhjYAAJDQAgFCrBpuAAAAAElFTkSuQmCC"
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
                            "3000"
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
                            "Default:Parks_points"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Parks_points.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Parks_points.LayerDefinition"
                ],
                "LegendLabel": [
                    "Parks_points"
                ],
                "Name": [
                    "Parks_points"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8002-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8007-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAOBJREFUOI3V0C1OxHAQBfBf2/3IErIJhqDAkLAcAILhAqwjKSQg8HgsCgcJBsEV8FyAE6CRi0KQIEhWsOm/mIpS+qF31EzmvTfvDUtfSRcgJTkmjXibEar7uEtgh2mPp0NO6vZRAy++ZGXMcMBzzEHgdc7RHR9lYK+OfcVGYW9T0WN9yERFoDbCgCTjJ2GUcRH4zDiLWaSVv/1xcM0Mc9ysso29PtPi0gvs8o6tpghR4DbmHPs5pwqBMqYtwiJiXFwYRUwC33Uxmxz0E+5L80Mb+Z9AzmNgrY2Q89UlumT1Czm5J77BXNhmAAAAAElFTkSuQmCC"
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
                            "3000"
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
                            "Default:Hospital"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Hospital.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Hospital.LayerDefinition"
                ],
                "LegendLabel": [
                    "Hospital"
                ],
                "Name": [
                    "Hospital"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8003-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8007-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAALtJREFUOI3lkzEKwkAQRf+sS6qQIp3EPuyRzA3C1p7COldYjxQs0kXstgipls2OhSAEs1GxEZxq4H8e84cZQqS893siKgGAmc9SytOSj2KAydpeGFMAQKiqyybPdzFvFMBKMSvFk7V9zCc+ov4kQHrv9zQMxyclTbdw7tEv7YGz7CCJqBTGFGiaueoc0HX3MZUSSJJipmuNUNfl1xFoLYJQSgBAaNuAcbwuRYiS/+kOVlWtXwKi3/juO98ATJxWi0BUvrUAAAAASUVORK5CYII="
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
                            "1000000000000"
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
                            "Default:Railroad"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Railroad.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Railroad.LayerDefinition"
                ],
                "LegendLabel": [
                    "Railroad"
                ],
                "Name": [
                    "Railroad"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8004-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8006-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAH1JREFUOI1jYBjygBHGyM3NZRcQEHBrbm7eTIxGmHommAA/P78KIyNjB7E2w9QzEVaKH1BsAGN9fX0DAwMDw////7WZmJhC/v//34hHvRaUvgZTT7kLYIyamhptJiamVU1NTdrEaISpH/hAhBvw8ePHO4yMjJXEaiRV/SAGALVlI7JPE4D4AAAAAElFTkSuQmCC"
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
                            "1000000000000"
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
                            "Default:floodzone"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/floodzone.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/floodzone.LayerDefinition"
                ],
                "LegendLabel": [
                    "floodzone"
                ],
                "Name": [
                    "floodzone"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8005-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8009-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADpJREFUOI1jVFT79l5d5/t7BjLAzSucgizqOt/fJxe8uk+OAXMniDEwkaMRGYwaMGrAqAEQwEhpdgYAuKsSkc6gkKMAAAAASUVORK5CYII="
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
                    "true"
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
                            "Schema:Parcels"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Parcels.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Parcels Pendng.LayerDefinition"
                ],
                "LegendLabel": [
                    "Parcels Pendng"
                ],
                "Name": [
                    "Parcels Pendng"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8006-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1jZFBWfsBgYPCAgRxw4YICC4OBwQOGVasOkGVAWJgDE1kakcCoAaMGjBoAAYyUZmcAIrQMrY3HTWoAAAAASUVORK5CYII="
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
                            "Schema:Parcels"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Parcels.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Parcels.LayerDefinition"
                ],
                "LegendLabel": [
                    "Parcels"
                ],
                "Name": [
                    "Parcels"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8007-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1jnDCh84GEBP8DBjLAixcfFVgkJPgfBAcbHyDHgLVrzzowkaMRGYwaMGrAqAEQwPLixUeFtWvPOpCj+cWLjwoAQZAT9c8qpEgAAAAASUVORK5CYII="
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
                            "25000"
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
                            "Default:River"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/River.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/River.LayerDefinition"
                ],
                "LegendLabel": [
                    "River"
                ],
                "Name": [
                    "River"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8008-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8009-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1jzJ0w4cELCYkHDGQAiRcvFFheSEg8WB0aeoAcA0JXr3ZgIkcjMhg1YNSAUQMggEXixQuF0NWrHcjRLPHihQIA/dYShHnVqD0AAAAASUVORK5CYII="
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
                            "Default:Creeks"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/Creeks.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/Creeks.LayerDefinition"
                ],
                "LegendLabel": [
                    "Creeks"
                ],
                "Name": [
                    "Creeks"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-8009-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8009-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAwMjDUN1BiABOVHDIKhjYAAE3BAQMVaM+vAAAAAElFTkSuQmCC"
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
                            "50000"
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
                            "Default:rivertrail"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/rivertrail.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/rivertrail.LayerDefinition"
                ],
                "LegendLabel": [
                    "rivertrail"
                ],
                "Name": [
                    "rivertrail"
                ],
                "ObjectId": [
                    "92c5ad7e-18a2-11ec-800a-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8009-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAwMjDUN1BiABOVHDIKhjYAAE3BAQMVaM+vAAAAAElFTkSuQmCC"
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
                            "50000"
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
                            "Default:General_Plan"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/General_Plan.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/General_Plan.LayerDefinition"
                ],
                "LegendLabel": [
                    "General_Plan"
                ],
                "Name": [
                    "General_Plan"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8001-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8005-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Acquisition'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7O1teyAkxPmAgQzw7t13BRYhIc4HDk4KB8gx4MC+Bw5M5GhEBqMGjBowagAEsLx7913hwL4HDuRofvfuuwIA2fIUNVrb2pwAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Acquisition"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Airport'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7OlpfSAkxPmAgQzw7t13BRYhIc4H9rayB8gx4ODhxw5M5GhEBqMGjBowagAEsLx7913h4OHHDuRofvfuuwIAzeEUO3rQL1QAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Airport"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Commercial'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7OlqfSAkyP6AgQzw7v1PBRYhQfYH9layB8gx4OCxxw5M5GhEBqMGjBowagAEsLx7/1Ph4LHHDuRofvf+pwIAuoMUP3AC2RgAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Commercial"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Greenway'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7OlqeSAkwP6AgQzw7sNPBRYhAfYHtqZSB8gx4PDpZw5M5GhEBqMGjBowagAEsLz78FPh8OlnDuRofvfhpwIAstAUSV5R4YsAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Greenway"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Industrial'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7OlseSDEx/aAgQzw7tMvBRYhPrYHtkbiB8gx4PC5lw5M5GhEBqMGjBowagAEsLz79Evh8LmXDuRofvfplwIAo4cUURfpf0AAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Industrial"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Mixed Use'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7OloeSDAx/aAgQzw4dMvBRYBPrYHtrqiB8gx4PDl1w5M5GhEBqMGjBowagAEsHz49Evh8OXXDuRo/vDplwIAmAgUWWuHSLgAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Mixed Use"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Public Facilities'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7GlveiDAw/aAgQzw4csvBRYBHrYHtlrCB8gx4PC1tw5M5GhEBqMGjBowagAEsHz48kvh8LW3DuRo/vDllwIAhGcUXcXXIH4AAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Public Facilities"
                                        ]
                                    },
                                    {
                                        "Filter": [
                                            "GP_CLASS = 'Residential'"
                                        ],
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1j7GlveiDAzfqAgQzw4etvBRYBbtYHtqpCB8gx4PDtdw5M5GhEBqMGjBowagAEsHz4+lvh8O13DuRo/vD1twIAfPEUZRthBOYAAAAASUVORK5CYII="
                                        ],
                                        "LegendLabel": [
                                            "GP Class Residential"
                                        ]
                                    },
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADNJREFUOI1jtLe3/+/g4MBADjhw4AADQ319/X9yQX19/X8msqxGAqMGjBowagAEMFKanQE3XkZV/oFYUwAAAABJRU5ErkJggg=="
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
                    "true"
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
                            "Default:City_Boundary"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/City_Boundary.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/City_Boundary.LayerDefinition"
                ],
                "LegendLabel": [
                    "City_Boundary"
                ],
                "Name": [
                    "City_Boundary"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8002-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8008-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEZJREFUOI1jbGho+M/ExPiLgQzw799/NhYmJsZfMVHGPeQYsGTZ2RImcjQig1EDRg0YNQACWP79+8+2ZNnZEnI0//v3nw0AoIcULxnQpWcAAAAASUVORK5CYII="
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
                            "Default:400ScaleGrid"
                        ],
                        "Geometry": [
                            "Geometry"
                        ],
                        "ResourceId": [
                            "Library://Redding/Basemap/Data/400ScaleGrid.FeatureSource"
                        ]
                    }
                ],
                "LayerDefinition": [
                    "Library://Redding/Basemap/Layers/400ScaleGrid.LayerDefinition"
                ],
                "LegendLabel": [
                    "400ScaleGrid"
                ],
                "Name": [
                    "400ScaleGrid"
                ],
                "ObjectId": [
                    "92c5d48e-18a2-11ec-8003-0a002700000e"
                ],
                "ParentId": [
                    "92c55f5e-18a2-11ec-8008-0a002700000e"
                ],
                "ScaleRange": [
                    {
                        "FeatureStyle": [
                            {
                                "Rule": [
                                    {
                                        "Filter": null,
                                        "Icon": [
                                            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAGZJREFUOI3dk7ENgDAMBM+psgvzsARVJsijTEDFEszDEkyQLrQRHbiJuPKl+3djk3QBOx2ttbOUcvRZznk2s4kfIil63AAkx34KwOcLgBgcMgBjFFSHXwOwOQo87iiYpPUZvnjn5QbPmBx/5f16UQAAAABJRU5ErkJggg=="
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
            }
        ],
        "MapDefinition": [
            "Library://Redding/Maps/Redding.MapDefinition"
        ],
        "Name": [
            "Redding"
        ],
        "SessionId": [
            "92bd21f4-18a2-11ec-8000-0a002700000e_en_MTI3LjAuMC4x0B060B050B04"
        ],
        "SiteVersion": [
            "4.0.0.9862"
        ]
    }
};