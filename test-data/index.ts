import { QueryMapFeaturesResponse, SelectedFeatureSet } from "../src/api/contracts/query";
import { RuntimeMap } from "../src/api/contracts/runtime-map";
import {
    IApplicationState,
    IInitErrorReducerState,
    IConfigurationReducerState,
    IToolbarReducerState,
    ITaskPaneReducerState,
    IModalReducerState,
    IViewerReducerState,
    IMouseReducerState,
    ITemplateReducerState,
    IMapView,
    Dictionary
} from "../src/api/common";
import { CONFIG_INITIAL_STATE } from "../src/reducers/config";
import { INIT_ERROR_INITIAL_STATE } from "../src/reducers/init-error";
import { MODAL_INITIAL_STATE } from "../src/reducers/modal";
import { TASK_PANE_INITIAL_STATE } from "../src/reducers/taskpane";
import { TOOLBAR_INITIAL_STATE } from "../src/reducers/toolbar";
import { VIEWER_INITIAL_STATE } from "../src/reducers/viewer";
import { MOUSE_INITIAL_STATE } from "../src/reducers/mouse";
import { TEMPLATE_INITIAL_STATE } from "../src/reducers/template";
import { ActionType } from '../src/constants/actions';
import { ClientSelectionSet } from "../src/api/contracts/common";
import { IInitAppAction, MapInfo } from "../src/actions/defs";

export function createMap(): any /*RuntimeMap*/ {
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

export function createClientSelectionSet(): ClientSelectionSet {
    return {
        layers: [
            {
                name: "Trees",
                features: [
                    {
                        properties: {
                            id: 1,
                            name: "Foo"
                        }
                    }
                ]
            },
            {
                name: "Incidents",
                features: [
                    {
                        properties: {
                            id: 2,
                            description: "Bar"
                        }
                    }
                ]
            }
        ]
    }
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
                            { Name: "Name", Value: "Foo / Feature 1" }
                        ]
                    },
                    {
                        Bounds: "2 3 4 5",
                        Property: [
                            { Name: "ID", Value: "2" },
                            { Name: "Name", Value: "Foo / Feature 2" }
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
                            { Name: "Name", Value: "Bar / Feature 1" },
                            { Name: "Address", Value: "Testing" }
                        ]
                    },
                    {
                        Bounds: "2 3 4 5",
                        Property: [
                            { Name: "ID", Value: "2" },
                            { Name: "Name", Value: "Bar / Feature 2" },
                            { Name: "Address", Value: "Testing" }
                        ]
                    }
                ]
            }
        ]
    };
}

export function createQueryMapFeaturesResponse(): QueryMapFeaturesResponse {
    return {
        "FeatureSet": {
            "Layer": [
                {
                    "@id": "efb5ce9a-189f-11ec-8005-0a002700000e",
                    "@name": null,
                    "Class": {
                        "@id": "SHP_Schema:Parcels",
                        "ID": [
                            "hB0AAA==",
                            "hR0AAA==",
                            "iR0AAA==",
                            "ih0AAA==",
                            "jR0AAA==",
                            "jx0AAA==",
                            "9h0AAA==",
                            "CB4AAA==",
                            "Lh4AAA==",
                            "MB4AAA==",
                            "MR4AAA==",
                            "Mx4AAA==",
                            "NB4AAA==",
                            "NR4AAA==",
                            "hh4AAA==",
                            "sB4AAA==",
                            "2B4AAA==",
                            "2R4AAA==",
                            "2h4AAA==",
                            "3B4AAA==",
                            "3R4AAA==",
                            "3h4AAA==",
                            "3x4AAA==",
                            "Fh8AAA==",
                            "JR8AAA==",
                            "Jx8AAA==",
                            "Px8AAA==",
                            "QR8AAA=="
                        ]
                    }
                }
            ]
        },
        "SelectedFeatures": {
            "SelectedLayer": [
                {
                    "@id": "efb5ce9a-189f-11ec-8005-0a002700000e",
                    "@name": "Parcels",
                    "Feature": [
                        {
                            "Bounds": "-87.725223747565352 43.758044143831945 -87.725106539852931 43.758456179454434",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.1"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "30X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "WOODS, JANET MARIE"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE W 1/2 OF LOT 2 & THE E"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "1.5' OF THE S 14.5' OF THE N"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1509 MICHIGAN AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "4500"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": "36.5' OF LOT 3 BLOCK 56"
                                }
                            ],
                            "SelectionKey": "\nhB0AAA=="
                        },
                        {
                            "Bounds": "-87.725110198446075 43.75804361332915 -87.72499299019934 43.758455649062533",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "MER"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.1"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "30X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "LYON, STEVEN E"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "E 1/2 OF LOT 2 BLK 56"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1417 LENZ CT"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "4500"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nhR0AAA=="
                        },
                        {
                            "Bounds": "-87.724182906167712 43.758036356937964 -87.724027841868377 43.75844857068175",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "FELSINGER, ALICE MAY"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE W 40' OF THE E 45' OF"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "LOT 5 BLK 57"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "38 IRELAND BROOK DR."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\niR0AAA=="
                        },
                        {
                            "Bounds": "-87.724031507853368 43.758035648206338 -87.723876442034936 43.758447862322413",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "RUSSELL, KEVIN F."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "W 35' OF LOT 4 & E 5' OF LOT"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "5 BLK 57"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1423 MICHIGAN AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nih0AAA=="
                        },
                        {
                            "Bounds": "-87.723880108815266 43.758034939448628 -87.723725042446674 43.75844715358734",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "XIONG, PHIA & HOUA Y"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE W 15' OF LOT 3 & E 25'"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "OF LOT 4 BLK 57"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1426A S. 12TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\njR0AAA=="
                        },
                        {
                            "Bounds": "-87.723728710507302 43.758034230315893 -87.723573642861837 43.758446444651319",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "KONZ, FRANK D"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "W 40' OF E 45' OF LOT 3 BLK"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "57"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "2226 ERIE AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\njx0AAA=="
                        },
                        {
                            "Bounds": "-87.72499664957013 43.758042552161108 -87.724767721123072 43.758249366034804",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.1"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "75X60"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "HEIMERL, GLORIA L."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "S 1/2 OF LOT 1 BLK 56"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1220 N. 15TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "4500"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n9h0AAA=="
                        },
                        {
                            "Bounds": "-87.724466778680451 43.758037065470155 -87.7241818067845 43.75816184473576",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.08"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "45X75"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "EICKHOFF, DANIEL"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE S 45' OF LOT 6 & THE S"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "45' OF THE W 15' OF LOT 5"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1219 N. 15TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "3375"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": "BLK 57"
                                }
                            ],
                            "SelectionKey": "\nCB4AAA=="
                        },
                        {
                            "Bounds": "-87.725225649574256 43.757829630640877 -87.724997088701841 43.757995293493252",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.08"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "60X60"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "BEAUDOIN, GARY E."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "N 60' OF LOT 11 BLK 56"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "4725 FOX GROVE RD"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "3600"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nLh4AAA=="
                        },
                        {
                            "Bounds": "-87.725000747784293 43.757581666177273 -87.724769990899929 43.757994232776994",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "EXM"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.21"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "60X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "SAINT JUDE'S CHILDRE"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "LOT 12 BLK 56"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1504 ST CLAIR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "9000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nMB4AAA=="
                        },
                        {
                            "Bounds": "-87.724469782176257 43.757575736714521 -87.724088722038601 43.757989012634134",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "MER"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.25"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "IRREG"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "KENNEDY, JAMES F."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE N 105' OF LOT 7 AND THE"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "N 105' OF THE W 40' OF LOT 8"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "310 SUPERIOR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "10815"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": "AND ALSO THE E 7' OF THE W"
                                }
                            ],
                            "SelectionKey": "\nMR4AAA=="
                        },
                        {
                            "Bounds": "-87.724092387346545 43.757575028060828 -87.723937323608354 43.757987241957537",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "JUNGE, RALPH"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "E 20' OF LOT 8 & W 20' OF"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "LOT 9 BLK 57"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1426 ST CLAIR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nMx4AAA=="
                        },
                        {
                            "Bounds": "-87.723940989953846 43.757574319206576 -87.723785924939349 43.757986533300745",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "MUELLER, KENNETH A"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "E 40' OF LOT 9 BLK 57"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1422 ST CLAIR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nNB4AAA=="
                        },
                        {
                            "Bounds": "-87.723789592564074 43.757573610327704 -87.723634526514985 43.757985824619347",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.14"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "SHAW, ERIC R & AMAND"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "W 40' OF LOT 10 BLK 57"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1416 ST CLAIR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "6000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nNR4AAA=="
                        },
                        {
                            "Bounds": "-87.725227844036453 43.757582727340179 -87.7249985523883 43.757830691355309",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.12"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "60X90"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "HAACK, DONALD W."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "S 90' OF LOT 11 BLK 56"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1033 SOMMER DR"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "5400"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nhh4AAA=="
                        },
                        {
                            "Bounds": "-87.724470881203715 43.757575860695141 -87.724117782375572 43.75770095894417",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.1"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "45X93"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "GADZINSKI, SUSAN A"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE S 45' OF LOT 7 & THE S"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "45' OF THE W 33' OF LOT 8"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "507 N. 27TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "4185"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": "BLK 57"
                                }
                            ],
                            "SelectionKey": "\nsB4AAA=="
                        },
                        {
                            "Bounds": "-87.725220205378733 43.756951690555638 -87.724989452160884 43.757364256773748",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.21"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "60X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "KRUTZIK, KAREN K"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "LOT 2 BLK 83"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1511 ST CLAIR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "9000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n2B4AAA=="
                        },
                        {
                            "Bounds": "-87.724990428040371 43.757252399966902 -87.724762356745714 43.757363196038213",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.06"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X60"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "SCHAAL, GARRY M"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE N 40' OF LOT 1 BLK 83"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "5417 LONG ACRE RD"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "2400"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n2R4AAA=="
                        },
                        {
                            "Bounds": "-87.724462273177082 43.757054292811837 -87.724052648477652 43.757357975850113",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "EXM"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.21"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "IRREG"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "THE S WI DIST-LUTH C"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE W 12' OF THE N 75' OF"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "LOT 5 & THE S 35' OF THE N"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "8100 W. CAPITOL DR."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "9250"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": "110' OF THE W 48' OF LOT 5 &"
                                }
                            ],
                            "SelectionKey": "\n2h4AAA=="
                        },
                        {
                            "Bounds": "-87.724188905240041 43.757150310836032 -87.724050815579659 43.757356701038205",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "EXM"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.06"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "36X75"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "THE S WI DIST-LUTH C"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "W 36' OF E 48' OF N 75' LOT"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "5 BLK 82"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "8100 W. CAPITOL DR."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "2700"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n3B4AAA=="
                        },
                        {
                            "Bounds": "-87.724054481364803 43.756943920291192 -87.723914558352774 43.757356063388599",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.12"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "36X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "BAILEY, TERRANCE M"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "W 24' OF LOT 4 & E 12' OF"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "LOT 5 BLK 82"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1425 ST CLAIR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "5400"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n3R4AAA=="
                        },
                        {
                            "Bounds": "-87.723918225071145 43.756943282319483 -87.723778301127737 43.757355425752117",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.12"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "36X150"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "GEIDEL, FREDRIC R."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "E 36' OF LOT 4 BLK 82"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "907 N MAIN ST"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "5400"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n3h4AAA=="
                        },
                        {
                            "Bounds": "-87.723780134958957 43.757148148728483 -87.723589055026238 43.757354787777629",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.09"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "50X75"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "ROBSON, DAVID R."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "W 50' OF N 75' OF LOT 3 BLK"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "82"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "2414 N. 4TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "3750"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\n3x4AAA=="
                        },
                        {
                            "Bounds": "-87.724991403917457 43.757142665255046 -87.724763332797991 43.757253461152054",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.06"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X60"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "CHANG, HUE G."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "S 40' OF N 80' OF LOT 1 BLK"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "83"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1126 N. 15TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "2400"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nFh8AAA=="
                        },
                        {
                            "Bounds": "-87.723781968779875 43.75694009019989 -87.723099769404769 43.757149035052272",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.21"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "IRREG"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "LEAVENS, DARIUS S"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE S 1/4 OF LOTS 1 & 2, AND"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "THE S 75' OF LOT 3 BLOCK 82"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "30 SOUTH 6TH ST"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "9000"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nJR8AAA=="
                        },
                        {
                            "Bounds": "-87.72499225771621 43.757046647227284 -87.724764309332301 43.757143726439359",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.05"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "35X60"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "BOHN, ARTHUR & KATHR"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "N 35' OF S 70' OF LOT 1 BLK"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "83"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "5305 SUPERIOR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "2100"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nJx8AAA=="
                        },
                        {
                            "Bounds": "-87.724463250259518 43.756944558100471 -87.724053503777583 43.757056205092056",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.1"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "40X108"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "BOHN, ARTHUR & KATHR"
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "THE S 40' OF THE W 108' OF"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": "LOTS 5 & 6 BLK 82"
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "5305 SUPERIOR AVE"
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "4320"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": null
                                }
                            ],
                            "SelectionKey": "\nPx8AAA=="
                        },
                        {
                            "Bounds": "-87.724993111513243 43.756950629373485 -87.724765163494197 43.757047708410525",
                            "Property": [
                                {
                                    "Name": "Description1",
                                    "Value": "ORIGINAL PLAT"
                                },
                                {
                                    "Name": "Zone",
                                    "Value": "RES"
                                },
                                {
                                    "Name": "Acreage",
                                    "Value": "0.05"
                                },
                                {
                                    "Name": "Lot Dimensions",
                                    "Value": "35X60"
                                },
                                {
                                    "Name": "Owner",
                                    "Value": "THEUNE, MATTHEW J."
                                },
                                {
                                    "Name": "Description2",
                                    "Value": "S 35' OF LOT 1 BLK 83"
                                },
                                {
                                    "Name": "Description3",
                                    "Value": null
                                },
                                {
                                    "Name": "Billing Address",
                                    "Value": "1120 N. 15TH ST."
                                },
                                {
                                    "Name": "Lot Size (SqFt)",
                                    "Value": "2100"
                                },
                                {
                                    "Name": "Description4",
                                    "Value": ""
                                }
                            ],
                            "SelectionKey": "\nQR8AAA=="
                        }
                    ],
                    "LayerMetadata": {
                        "Property": [
                            {
                                "DisplayName": "Description1",
                                "Name": "RLDESCR1",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Zone",
                                "Name": "RTYPE",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Acreage",
                                "Name": "RACRE",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Lot Dimensions",
                                "Name": "RLOT",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Owner",
                                "Name": "RNAME",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Description2",
                                "Name": "RLDESCR2",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Description3",
                                "Name": "RLDESCR3",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Billing Address",
                                "Name": "RBILAD",
                                "Type": 9
                            },
                            {
                                "DisplayName": "Lot Size (SqFt)",
                                "Name": "RSQFT",
                                "Type": 7
                            },
                            {
                                "DisplayName": "Description4",
                                "Name": "RLDESCR4",
                                "Type": 9
                            }
                        ]
                    }
                }
            ]
        }
    }
}

export function createInitAction(map: RuntimeMap,
    initialView: IMapView,
    locale = "en",
    imageFormat = "PNG",
    selectionImageFormat = "PNG",
    selectionColor = "0x0000FFAA",
    coordinateDecimals = "4",
    coordinateDisplayFormat = "X: {x} {units}, Y: {y} {units}",
    coordinateProjection = "EPSG:4326"): IInitAppAction {
    const maps: Dictionary<MapInfo> = {};
    maps[map.Name] = {
        map: map,
        mapGroupId: "MainMap",
        initialView: initialView,
        initialExternalLayers: [],
        externalBaseLayers: []
    };
    return {
        type: ActionType.INIT_APP,
        payload: {
            activeMapName: map.Name,
            initialUrl: "server/TaskPane.html",
            maps: maps,
            locale: locale,
            initialView: initialView,
            config: {
                imageFormat,
                selectionImageFormat,
                selectionColor,
                coordinateDecimals,
                coordinateDisplayFormat,
                coordinateProjection
            },
            warnings: [],
            capabilities: {
                hasTaskPane: true,
                hasTaskBar: true,
                hasStatusBar: true,
                hasNavigator: true,
                hasSelectionPanel: true,
                hasLegend: true,
                hasToolbar: false,
                hasViewSize: true
            },
            featureTooltipsEnabled: true,
            toolbars: {
                toolbars: {},
                flyouts: {}
            }
        }
    };
}

export function createInitialState(): IApplicationState {
    const initError: IInitErrorReducerState = { ...INIT_ERROR_INITIAL_STATE };
    const config: IConfigurationReducerState = { ...CONFIG_INITIAL_STATE };
    const toolbar: IToolbarReducerState = { ...TOOLBAR_INITIAL_STATE };
    const taskpane: ITaskPaneReducerState = { ...TASK_PANE_INITIAL_STATE };
    const modal: IModalReducerState = { ...MODAL_INITIAL_STATE };
    const viewer: IViewerReducerState = { ...VIEWER_INITIAL_STATE };
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