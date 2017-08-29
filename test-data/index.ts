import { IView } from "../src/api/contracts/common";
import { SelectedFeatureSet, SelectedFeature } from "../src/api/contracts/query";
import { RuntimeMap } from "../src/api/contracts/runtime-map";
import {
    IApplicationState,
    IInitErrorReducerState,
    IConfigurationReducerState,
    IToolbarReducerState,
    ITaskPaneReducerState,
    IModalReducerState,
    IViewerReducerState,
    IBranchedMapState,
    IMouseReducerState,
    ITemplateReducerState
} from "../src/api/common";
import * as Constants from "../src/constants";
import { CONFIG_INITIAL_STATE } from "../src/reducers/config";
import { INIT_ERROR_INITIAL_STATE } from "../src/reducers/init-error";
import { MODAL_INITIAL_STATE } from "../src/reducers/modal";
import { TASK_PANE_INITIAL_STATE } from "../src/reducers/taskpane";
import { TOOLBAR_INITIAL_STATE } from "../src/reducers/toolbar";
import { VIEWER_INITIAL_STATE } from "../src/reducers/viewer";
import { MOUSE_INITIAL_STATE } from "../src/reducers/mouse";
import { TEMPLATE_INITIAL_STATE } from "../src/reducers/template";

export function createMap(): any {
    return {
        "SiteVersion": "3.1.0.9064",
        "SessionId": "dc65cd9c-cb5e-11e6-8000-0a0027000015_en_MTI3LjAuMC4x0AFC0AFB0AFA",
        "Name": "Sheboygan",
        "MapDefinition": "Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",
        "BackgroundColor": "ffcdbd9c",
        "DisplayDpi": 96,
        "IconMimeType": "image/png",
        "CoordinateSystem": {
            "Wkt": "GEOGCS[\"WGS84 Lat/Long's, Degrees, -180 ==> +180\",DATUM[\"D_WGS_1984\",SPHEROID[\"World_Geodetic_System_of_1984\",6378137,298.257222932867]],PRIMEM[\"Greenwich\",0],UNIT[\"Degree\",0.017453292519943295]]",
            "MentorCode": "LL84",
            "EpsgCode": "4326",
            "MetersPerUnit": 111319.49079327358
        },
        "Extents": {
            "LowerLeftCoordinate": {
                "X": -87.76498699096284,
                "Y": 43.69139812878778
            },
            "UpperRightCoordinate": {
                "X": -87.69552151089972,
                "Y": 43.79752000048035
            }
        },
        "Group": [
            {
                "Name": "Base Map",
                "Type": 1,
                "LegendLabel": "Base Map",
                "ObjectId": "dc6d47c0-cb5e-11e6-8000-0a0027000015",
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true
            },
            {
                "Name": "Municipal",
                "Type": 1,
                "LegendLabel": "Municipal",
                "ObjectId": "dc6d47c0-cb5e-11e6-8001-0a0027000015",
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true
            },
            {
                "Name": "Transportation",
                "Type": 1,
                "LegendLabel": "Transportation",
                "ObjectId": "dc6d47c0-cb5e-11e6-8002-0a0027000015",
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true
            }
        ],
        "Layer": [
            {
                "Name": "Trees",
                "Type": 1,
                "LegendLabel": "Trees",
                "ObjectId": "dc6d6ed0-cb5e-11e6-8000-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8001-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Trees.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/Trees.FeatureSource",
                    "ClassName": "SHP_Schema:Trees",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 12000,
                        "FeatureStyle": [
                            {
                                "Type": 1,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAARRJREFUOI2l0z1LQmEYxvHfOXmSFok8vShFq2JLLkG0FPR1+hitRVt9kxbbghanItdo6U0RB8XeaFDkYFkd/E/PDdd1cz1wX4GfWUAV5eF8izpaE/QjYpEjGV0FbZt6NvUUtGV0RY4QJw1B4r0ucqVi3p6s3NjqDmr6brS92cJdckEscm1XbNvMrxkvfbjw4s0GXgbiyKGKHfuiv/5oTagl0jTn03mAvIx7B+a+xZ5EByd63q2GqFry+m8z5LDoFdUQJcuyKewDVmRRDlMbxwjR8Kif2vmgj9sQdU9mdVKYO3g2i3qIpsCZWooUNX2BU7SmPqSpT3mcWORYRlcxUabiqEzHfilTkrxBnUvDuWFQ5+a48AuKI1HyEp3qeQAAAABJRU5ErkJggg=="
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Roads",
                "Type": 1,
                "LegendLabel": "Roads",
                "ObjectId": "dc6d6ed0-cb5e-11e6-8001-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8002-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Roads.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/RoadCenterLines.FeatureSource",
                    "ClassName": "Default:RoadCenterLines",
                    "Geometry": "Geometry"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 10000,
                        "FeatureStyle": [
                            {
                                "Type": 2,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAw1tfXf6LEACZquWQUDGkAAJOZAnOhhw4fAAAAAElFTkSuQmCC"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "MinScale": 10000,
                        "MaxScale": 24000,
                        "FeatureStyle": [
                            {
                                "Type": 2,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jYBgFwwAw1tfXf6LEACZquWQUDGkAAJOZAnOhhw4fAAAAAElFTkSuQmCC"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Rail Lines",
                "Type": 1,
                "LegendLabel": "Rail Lines",
                "ObjectId": "dc6d6ed0-cb5e-11e6-8002-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8002-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": false,
                "ActuallyVisible": false,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Tracks.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/Rail.FeatureSource",
                    "ClassName": "SHP_Schema:Rail",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 24000,
                        "FeatureStyle": [
                            {
                                "Type": 2,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAH5JREFUOI1jYBjygBHG8PDwYJeWlnabO3fuZmI0wtQzwQTExMRUGBgYOoi1GaaeiaBKAoBiAxiTk5MbGBgYGP7//6/NxMQU8v///0Y86rWg9DWYespdAGPExcVps7Kyrpo7d642MRph6gc+EOEGvHr16s7///8ridVIqvpBDADwGyit6VCFVQAAAABJRU5ErkJggg=="
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Districts",
                "Type": 1,
                "LegendLabel": "Districts",
                "ObjectId": "dc6d6ed0-cb5e-11e6-8003-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8001-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": false,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Districts.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/VotingDistricts.FeatureSource",
                    "ClassName": "Default:VotingDistricts",
                    "Geometry": "Geometry"
                },
                "ScaleRange": [
                    {
                        "MinScale": 10000,
                        "MaxScale": 1000000000000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jXNIVdIDx//8DDGSA/4yMDgxLOwMbyNHMwMDAsLQzsIGJXM0wMGrAqAGjBkAAI6XZGQAhVhCbfcJbYwAAAABJRU5ErkJggg=="
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Buildings",
                "Type": 1,
                "LegendLabel": "Buildings",
                "ObjectId": "dc6d6ed0-cb5e-11e6-8004-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8001-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Buildings.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/BuildingOutlines.FeatureSource",
                    "ClassName": "SHP_Schema:BuildingOutlines",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 1500,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD9JREFUOI3tzDEVwFAMw0C373MQC/MnEAJhYRTt0KVz5mjXXVX1JNEkQCeJunsE2NY9On8tsMACXweQ7dEM6AWSRg1B02biUQAAAABJRU5ErkJggg=="
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Parcels",
                "Type": 1,
                "LegendLabel": "Parcels",
                "ObjectId": "dc6d6ed0-cb5e-11e6-8005-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8001-0a0027000015",
                "Selectable": true,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Parcels.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/Parcels.FeatureSource",
                    "ClassName": "SHP_Schema:Parcels",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 10000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": "Zone:  AGR",
                                        "Filter": "RTYPE = 'AGR'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1jnNBe9V+A4zcDOeDDD1YGFgGO3wyK/F/JMuA+AzcDE1k6kcCoAaMGjBoAASwffrAy3GfgJkvzhx+sDADG4w2aBVCvyQAAAABJRU5ErkJggg=="
                                    },
                                    {
                                        "LegendLabel": "Zone:  EXM",
                                        "Filter": "RTYPE = 'EXM'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Ous+c/H9YeBHPDpGwsDCx/XHwZZ4R9kGfCYgYOBiSydSGDUgFEDRg2AAJZP31gYHjNwkKX50zcWBgDh7w2gYiFR3wAAAABJRU5ErkJggg=="
                                    },
                                    {
                                        "LegendLabel": "Zone:  MER",
                                        "Filter": "RTYPE = 'MER'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Omu/c/L84+BHPD5CxMDCy/PPwZJ8T9kGcDAwMLARKZOOBg1YNSAUQMggOXzFyYGBgYWsjR//sLEAACRYwvU9QFABgAAAABJRU5ErkJggg=="
                                    },
                                    {
                                        "LegendLabel": "Zone:  MFG",
                                        "Filter": "RTYPE = 'MFG'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAD5JREFUOI1j7Oqt/8/Nx0AW+PqJgYGFm4+BQUz6P1kGvGJgZGAiz24EGDVg1IBRAyCA5esnSK4iB3z9xMAAAEnVC6Y05mSVAAAAAElFTkSuQmCC"
                                    },
                                    {
                                        "LegendLabel": "Zone:  RES",
                                        "Filter": "RTYPE = 'RES'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1j7Oxv/M8pwMhADvj+4T8DC6cAI4OQPDNZBrxj+MvARJZOJDBqwKgBowZAAMv3D/8Z3jH8JUvz9w//GQB8Kg+sTL/RWAAAAABJRU5ErkJggg=="
                                    },
                                    {
                                        "LegendLabel": "Zone:  S&W",
                                        "Filter": "RTYPE = 'S&W'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAENJREFUOI1jbJ/Y/J9diJmBHPDz3V8GFnYhZgZ+ZTayDPjI8IuBiSydSGDUgFEDRg2AAJaf7/4yfGT4RZbmn+/+MgAAmvYPsIiS2soAAAAASUVORK5CYII="
                                    },
                                    {
                                        "LegendLabel": "Zone:  WTC",
                                        "Filter": "RTYPE = 'WTC'",
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAEJJREFUOI1jbJ3c8p9NhJWBHPDrzW8GFjYRVgZudS6yDGBg+MbARKZOOBg1YNSAUQMggOXXm98MDAzfyNL8681vBgAVJg3IbKdDKgAAAABJRU5ErkJggg=="
                                    },
                                    {
                                        "LegendLabel": "Zone:  Other",
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADdJREFUOI1jNDU1/W9qaspADjh9+jQDi6mpKUNWVhZZBkybNo2BiSydSGDUgFEDRg2AAEZKszMAWEoM/Dho0fsAAAAASUVORK5CYII="
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Islands",
                "Type": 1,
                "LegendLabel": "Islands",
                "ObjectId": "dc6d95e0-cb5e-11e6-8000-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8000-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Islands.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/Islands.FeatureSource",
                    "ClassName": "SHP_Schema:Islands",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 1000000000000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jvHpizX8GCgATJZpHDRg1YNSAwWQAAJHuA2i4bNaHAAAAAElFTkSuQmCC"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Hydrography",
                "Type": 1,
                "LegendLabel": "Hydrography",
                "ObjectId": "dc6d95e0-cb5e-11e6-8001-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8000-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Hydrography.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/HydrographicPolygons.FeatureSource",
                    "ClassName": "SHP_Schema:HydrographicPolygons",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 1000000000000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jXH385X8GCgATJZpHDRg1YNSAwWQAANqDA3rC62i6AAAAAElFTkSuQmCC"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "Soils",
                "Type": 1,
                "LegendLabel": "Soils",
                "ObjectId": "dc6d95e0-cb5e-11e6-8002-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8000-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": false,
                "ActuallyVisible": false,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/Soils.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/Soils.FeatureSource",
                    "ClassName": "SHP_Schema:Soils",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 1000000000000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAADlJREFUOI1jZGVieC/AznCPgQzw4SeDEosAO8O9TDOGOeQYMP0UQwoTORqRwagBowaMGgABjJRmZwDtGAwCk1TQvgAAAABJRU5ErkJggg=="
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "Name": "CityLimits",
                "Type": 1,
                "LegendLabel": "CityLimits",
                "ObjectId": "dc6d95e0-cb5e-11e6-8003-0a0027000015",
                "ParentId": "dc6d47c0-cb5e-11e6-8000-0a0027000015",
                "Selectable": false,
                "DisplayInLegend": true,
                "ExpandInLegend": true,
                "Visible": true,
                "ActuallyVisible": true,
                "LayerDefinition": "Library://Samples/Sheboygan/Layers/CityLimits.LayerDefinition",
                "FeatureSource": {
                    "ResourceId": "Library://Samples/Sheboygan/Data/CityLimits.FeatureSource",
                    "ClassName": "SHP_Schema:CityLimits",
                    "Geometry": "SHPGEOM"
                },
                "ScaleRange": [
                    {
                        "MinScale": 0,
                        "MaxScale": 10000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jPHDgwH8GCgATJZpHDRg1YNSAwWQAAG1HA1/7dPCRAAAAAElFTkSuQmCC"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "MinScale": 10000,
                        "MaxScale": 1000000000000,
                        "FeatureStyle": [
                            {
                                "Type": 3,
                                "Rule": [
                                    {
                                        "LegendLabel": null,
                                        "Filter": null,
                                        "Icon": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAB1JREFUOI1jvHpizX8GCgATJZpHDRg1YNSAwWQAAJHuA2i4bNaHAAAAAElFTkSuQmCC"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

export function createSelectionSet(): SelectedFeatureSet {
    return {
        SelectedLayer: [
            {
                "@id": "1",
                "@name": "Foo",
                LayerMetadata: {
                    Property: [
                        { Name: "Autogenerated_SDF_ID", DisplayName: "ID", Type: 1 },
                        { Name: "Name", DisplayName: "Name", Type: 2 }
                    ]
                },
                Feature: [
                    {
                        Bounds: "1 2 3 4",
                        Property: [
                            { Name: "ID", Value: "1" },
                            { Name: "Name", Value: "Feature 1" }
                        ]
                    },
                    {
                        Bounds: "2 3 4 5",
                        Property: [
                            { Name: "ID", Value: "2" },
                            { Name: "Name", Value: "Feature 2" }
                        ]
                    }
                ]
            },
            {
                "@id": "2",
                "@name": "Bar",
                LayerMetadata: {
                    Property: [
                        { Name: "Autogenerated_SDF_ID", DisplayName: "ID", Type: 1 },
                        { Name: "Name", DisplayName: "Name", Type: 2 },
                        { Name: "Address", DisplayName: "Address", Type: 2 }
                    ]
                },
                Feature: [
                    {
                        Bounds: "1 2 3 4",
                        Property: [
                            { Name: "ID", Value: "1" },
                            { Name: "Name", Value: "Feature 1" },
                            { Name: "Address", Value: "Testing" }
                        ]
                    },
                    {
                        Bounds: "2 3 4 5",
                        Property: [
                            { Name: "ID", Value: "2" },
                            { Name: "Name", Value: "Feature 2" },
                            { Name: "Address", Value: "Testing" }
                        ]
                    }
                ]
            }
        ]
    };
}

export function createInitAction(map: RuntimeMap, initialView: IView, locale = "en") {
    const maps: any = {};
    maps[map.Name] = map;
    return {
        type: Constants.INIT_APP,
        payload: {
            initialUrl: "server/TaskPane.html",
            maps: maps,
            locale: locale,
            initialView: initialView,
            capabilities: {
                hasTaskPane: true,
                hasTaskBar: true,
                hasStatusBar: true,
                hasNavigator: true,
                hasSelectionPanel: true,
                hasLegend: true,
                hasToolbar: false
            },
            toolbars: {}
        }
    };
}

export function createInitialState(): IApplicationState {
    const initError: IInitErrorReducerState = { ...INIT_ERROR_INITIAL_STATE };
    const config: IConfigurationReducerState = { ...CONFIG_INITIAL_STATE };
    const toolbar: IToolbarReducerState = { ...TOOLBAR_INITIAL_STATE };
    const taskpane: ITaskPaneReducerState = { ...TASK_PANE_INITIAL_STATE };
    const modal: IModalReducerState = { ...MODAL_INITIAL_STATE };
    const viewer: IViewerReducerState =  { ...VIEWER_INITIAL_STATE };
    const mouse: IMouseReducerState = { ...MOUSE_INITIAL_STATE };
    const template: ITemplateReducerState = { ...TEMPLATE_INITIAL_STATE };
    const lastaction: any = null;
    return {
        initError,
        config,
        mapState: {},
        toolbar,
        taskpane,
        modal,
        viewer,
        mouse,
        lastaction,
        template
    };
}