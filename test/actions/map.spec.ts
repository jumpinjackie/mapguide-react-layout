import { describe, it, expect } from "vitest";
import { combineSelections } from "../../src/actions/map"
import { QueryMapFeaturesResponse } from "../../src/api/contracts/query"

describe("actions/map", () => {
    it("Appends new selection", () => {
        // 1 selected feature
        const res1: QueryMapFeaturesResponse = {
            "SelectedFeatures": {
                "SelectedLayer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": "Parcels",
                        "Feature": [
                            {
                                "Bounds": "-87.722788142888234 43.755335868606466 -87.721634440510442 43.756252668096828",
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
                                        "Value": "1.61"
                                    },
                                    {
                                        "Name": "Lot Dimensions",
                                        "Value": "IRREG"
                                    },
                                    {
                                        "Name": "Owner",
                                        "Value": "MRED (14TH/ERIE) ASS"
                                    },
                                    {
                                        "Name": "Description2",
                                        "Value": "CSM REC IN VOL 17 P 242-4 AS"
                                    },
                                    {
                                        "Name": "Description3",
                                        "Value": "DOC #1593757 ROD BEING PRT"
                                    },
                                    {
                                        "Name": "Billing Address",
                                        "Value": "W228 N745 WESTMOUND"
                                    },
                                    {
                                        "Name": "Lot Size (SqFt)",
                                        "Value": "70140"
                                    },
                                    {
                                        "Name": "Description4",
                                        "Value": "OF LOTS 2 & 6 AND ALL OF"
                                    }
                                ],
                                "SelectionKey": "\\n1R8AAA=="
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
            },
            "FeatureSet": {
                "Layer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": null,
                        "Class": {
                            "@id": "SHP_Schema:Parcels",
                            "ID": [
                                "1R8AAA=="
                            ]
                        }
                    }
                ]
            }
        };
        // 1 selected feature
        const res2: QueryMapFeaturesResponse = {
            "SelectedFeatures": {
                "SelectedLayer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": "Parcels",
                        "Feature": [
                            {
                                "Bounds": "-87.721783993639846 43.75586600668715 -87.721422848998813 43.756250861467976",
                                "Property": [
                                    {
                                        "Name": "Description1",
                                        "Value": "ORIGINAL PLAT"
                                    },
                                    {
                                        "Name": "Zone",
                                        "Value": "MFG"
                                    },
                                    {
                                        "Name": "Acreage",
                                        "Value": "0.31"
                                    },
                                    {
                                        "Name": "Lot Dimensions",
                                        "Value": "95X140"
                                    },
                                    {
                                        "Name": "Owner",
                                        "Value": "MILLENNIUM PROPERTIE"
                                    },
                                    {
                                        "Name": "Description2",
                                        "Value": "LOT 1 & E 35' OF LOT 2 BLK"
                                    },
                                    {
                                        "Name": "Description3",
                                        "Value": "90, ALSO N 1/2 OF VAC N"
                                    },
                                    {
                                        "Name": "Billing Address",
                                        "Value": "PO BOX 1005"
                                    },
                                    {
                                        "Name": "Lot Size (SqFt)",
                                        "Value": "13300"
                                    },
                                    {
                                        "Name": "Description4",
                                        "Value": "WATER ST ADJ THE AFORE DESC"
                                    }
                                ],
                                "SelectionKey": "\\n1h8AAA=="
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
            },
            "FeatureSet": {
                "Layer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": null,
                        "Class": {
                            "@id": "SHP_Schema:Parcels",
                            "ID": [
                                "1h8AAA=="
                            ]
                        }
                    }
                ]
            }
        };
        const res3 = combineSelections(res1, res2);
        expect(res3.FeatureSet).not.toBeUndefined();
        expect(res3.FeatureSet?.Layer).toHaveLength(1);
        expect(res3.FeatureSet?.Layer[0]["@id"]).toBe("ae1b647e-ea65-11ed-8001-2cf05d702dff");
        expect(res3.FeatureSet?.Layer[0].Class).not.toBeUndefined();
        expect(res3.FeatureSet?.Layer[0].Class["@id"]).toBe("SHP_Schema:Parcels");
        expect(res3.FeatureSet?.Layer[0].Class.ID).toHaveLength(2);

        expect(res3.SelectedFeatures).not.toBeUndefined();
        expect(res3.SelectedFeatures?.SelectedLayer).toHaveLength(1);
        expect(res3.SelectedFeatures?.SelectedLayer[0].Feature).toHaveLength(2);
    });
    it("Appends new selection. Overlapping features are removed", () => {
        // 3 selected features
        const res1: QueryMapFeaturesResponse = {
            "SelectedFeatures": {
                "SelectedLayer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": "Parcels",
                        "Feature": [
                            {
                                "Bounds": "-87.722788142888234 43.755335868606466 -87.721634440510442 43.756252668096828",
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
                                        "Value": "1.61"
                                    },
                                    {
                                        "Name": "Lot Dimensions",
                                        "Value": "IRREG"
                                    },
                                    {
                                        "Name": "Owner",
                                        "Value": "MRED (14TH/ERIE) ASS"
                                    },
                                    {
                                        "Name": "Description2",
                                        "Value": "CSM REC IN VOL 17 P 242-4 AS"
                                    },
                                    {
                                        "Name": "Description3",
                                        "Value": "DOC #1593757 ROD BEING PRT"
                                    },
                                    {
                                        "Name": "Billing Address",
                                        "Value": "W228 N745 WESTMOUND"
                                    },
                                    {
                                        "Name": "Lot Size (SqFt)",
                                        "Value": "70140"
                                    },
                                    {
                                        "Name": "Description4",
                                        "Value": "OF LOTS 2 & 6 AND ALL OF"
                                    }
                                ],
                                "SelectionKey": "\\n1R8AAA=="
                            },
                            {
                                "Bounds": "-87.721783993639846 43.75586600668715 -87.721422848998813 43.756250861467976",
                                "Property": [
                                    {
                                        "Name": "Description1",
                                        "Value": "ORIGINAL PLAT"
                                    },
                                    {
                                        "Name": "Zone",
                                        "Value": "MFG"
                                    },
                                    {
                                        "Name": "Acreage",
                                        "Value": "0.31"
                                    },
                                    {
                                        "Name": "Lot Dimensions",
                                        "Value": "95X140"
                                    },
                                    {
                                        "Name": "Owner",
                                        "Value": "MILLENNIUM PROPERTIE"
                                    },
                                    {
                                        "Name": "Description2",
                                        "Value": "LOT 1 & E 35' OF LOT 2 BLK"
                                    },
                                    {
                                        "Name": "Description3",
                                        "Value": "90, ALSO N 1/2 OF VAC N"
                                    },
                                    {
                                        "Name": "Billing Address",
                                        "Value": "PO BOX 1005"
                                    },
                                    {
                                        "Name": "Lot Size (SqFt)",
                                        "Value": "13300"
                                    },
                                    {
                                        "Name": "Description4",
                                        "Value": "WATER ST ADJ THE AFORE DESC"
                                    }
                                ],
                                "SelectionKey": "\\n1h8AAA=="
                            },
                            {
                                "Bounds": "-87.721121273860433 43.75583496112074 -87.719757486350858 43.756249430247053",
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
                                        "Value": "1.22"
                                    },
                                    {
                                        "Name": "Lot Dimensions",
                                        "Value": "IRREG"
                                    },
                                    {
                                        "Name": "Owner",
                                        "Value": "TOBOTIPE, INC"
                                    },
                                    {
                                        "Name": "Description2",
                                        "Value": "LOTS 1,2,3,4,5 & 6 BLK 91"
                                    },
                                    {
                                        "Name": "Description3",
                                        "Value": null
                                    },
                                    {
                                        "Name": "Billing Address",
                                        "Value": "4902 N. 18TH ST."
                                    },
                                    {
                                        "Name": "Lot Size (SqFt)",
                                        "Value": "53300"
                                    },
                                    {
                                        "Name": "Description4",
                                        "Value": null
                                    }
                                ],
                                "SelectionKey": "\\n1x8AAA=="
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
            },
            "FeatureSet": {
                "Layer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": null,
                        "Class": {
                            "@id": "SHP_Schema:Parcels",
                            "ID": [
                                "1R8AAA==",
                                "1h8AAA==",
                                "1x8AAA=="
                            ]
                        }
                    }
                ]
            }
        };
        // 1 selected feature already covered above
        const res2: QueryMapFeaturesResponse = {
            "FeatureSet": {
                "Layer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": null,
                        "Class": {
                            "@id": "SHP_Schema:Parcels",
                            "ID": [
                                "1h8AAA=="
                            ]
                        }
                    }
                ]
            },
            "SelectedFeatures": {
                "SelectedLayer": [
                    {
                        "@id": "ae1b647e-ea65-11ed-8001-2cf05d702dff",
                        "@name": "Parcels",
                        "Feature": [
                            {
                                "Bounds": "-87.721783993639846 43.75586600668715 -87.721422848998813 43.756250861467976",
                                "Property": [
                                    {
                                        "Name": "Description1",
                                        "Value": "ORIGINAL PLAT"
                                    },
                                    {
                                        "Name": "Zone",
                                        "Value": "MFG"
                                    },
                                    {
                                        "Name": "Acreage",
                                        "Value": "0.31"
                                    },
                                    {
                                        "Name": "Lot Dimensions",
                                        "Value": "95X140"
                                    },
                                    {
                                        "Name": "Owner",
                                        "Value": "MILLENNIUM PROPERTIE"
                                    },
                                    {
                                        "Name": "Description2",
                                        "Value": "LOT 1 & E 35' OF LOT 2 BLK"
                                    },
                                    {
                                        "Name": "Description3",
                                        "Value": "90, ALSO N 1/2 OF VAC N"
                                    },
                                    {
                                        "Name": "Billing Address",
                                        "Value": "PO BOX 1005"
                                    },
                                    {
                                        "Name": "Lot Size (SqFt)",
                                        "Value": "13300"
                                    },
                                    {
                                        "Name": "Description4",
                                        "Value": "WATER ST ADJ THE AFORE DESC"
                                    }
                                ],
                                "SelectionKey": "\\n1h8AAA=="
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
        };
        const res3 = combineSelections(res1, res2);
        expect(res3.FeatureSet).not.toBeUndefined();
        expect(res3.FeatureSet?.Layer).toHaveLength(1);
        expect(res3.FeatureSet?.Layer[0]["@id"]).toBe("ae1b647e-ea65-11ed-8001-2cf05d702dff");
        expect(res3.FeatureSet?.Layer[0].Class).not.toBeUndefined();
        expect(res3.FeatureSet?.Layer[0].Class["@id"]).toBe("SHP_Schema:Parcels");
        expect(res3.FeatureSet?.Layer[0].Class.ID).toHaveLength(2);

        expect(res3.SelectedFeatures).not.toBeUndefined();
        expect(res3.SelectedFeatures?.SelectedLayer).toHaveLength(1);
        expect(res3.SelectedFeatures?.SelectedLayer[0].Feature).toHaveLength(2);
    });
});

import {
    mapResized,
    setSelection,
    setBusyCount,
    setBaseLayer,
    setMouseCoordinates,
    setLayerTransparency,
    setViewSizeUnits,
    previousView,
    nextView,
    setActiveTool,
    setActiveMap,
    activateMap,
    setFeatureTooltipsEnabled,
    enableSelectDragPan,
    setManualFeatureTooltipsEnabled,
    setViewRotation,
    setViewRotationEnabled,
    showSelectedFeature,
    removeMapLayer,
    setMapLayerIndex,
    setMapLayerOpacity,
    setMapLayerVisibility,
    setHeatmapLayerBlur,
    setHeatmapLayerRadius,
    setMapLayerVectorStyle,
    addMapLayerBusyWorker,
    removeMapLayerBusyWorker,
    addClientSelectedFeature,
    clearClientSelection,
    externalLayersReady,
    mapLayerAdded
} from "../../src/actions/map";
import { ActionType } from "../../src/constants/actions";
import { ActiveMapTool, UnitOfMeasure } from "../../src/api/common";
import { VectorStyleSource } from "../../src/api/ol-style-contracts";
import type { IVectorLayerStyle } from "../../src/api/ol-style-contracts";
import type { ILayerInfo } from "../../src/api/common";
import type { ClientSelectionFeature } from "../../src/api/contracts/common";
import { createInitialState, createMap } from "../../test-data";
import { MAP_STATE_INITIAL_SUB_STATE, MG_INITIAL_SUB_STATE } from "../../src/reducers/map-state";

const SIMPLE_VECTOR_STYLE: IVectorLayerStyle = {
    default: {
        point: {
            type: "Circle",
            radius: 5,
            fill: { color: "#ff0000", alpha: 255 },
            stroke: { color: "#000000", width: 1, alpha: 255 }
        }
    }
};

describe("actions/map - action creators", () => {
    it("mapResized creates correct action", () => {
        const action = mapResized(800, 600);
        expect(action.type).toBe(ActionType.MAP_RESIZED);
        expect(action.payload.width).toBe(800);
        expect(action.payload.height).toBe(600);
    });

    it("setSelection creates correct action", () => {
        const action = setSelection("TestMap", undefined);
        expect(action.type).toBe(ActionType.MAP_SET_SELECTION);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.selection).toBeUndefined();
    });

    it("setBusyCount creates correct action", () => {
        const action = setBusyCount(3);
        expect(action.type).toBe(ActionType.MAP_SET_BUSY_COUNT);
        expect(action.payload).toBe(3);
    });

    it("setBaseLayer creates correct action", () => {
        const action = setBaseLayer("TestMap", "OSM");
        expect(action.type).toBe(ActionType.MAP_SET_BASE_LAYER);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("OSM");
    });

    it("setMouseCoordinates creates correct action", () => {
        const coord = [100, 200];
        const action = setMouseCoordinates("TestMap", coord);
        expect(action.type).toBe(ActionType.UPDATE_MOUSE_COORDINATES);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.coord).toEqual(coord);
    });

    it("setLayerTransparency creates correct action", () => {
        const action = setLayerTransparency("TestMap", "Roads", 0.5);
        expect(action.type).toBe(ActionType.MAP_SET_LAYER_TRANSPARENCY);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
        expect(action.payload.opacity).toBe(0.5);
    });

    it("setViewSizeUnits creates correct action", () => {
        const action = setViewSizeUnits(UnitOfMeasure.Meters);
        expect(action.type).toBe(ActionType.MAP_SET_VIEW_SIZE_UNITS);
        expect(action.payload).toBe(UnitOfMeasure.Meters);
    });

    it("previousView creates correct action", () => {
        const action = previousView("TestMap");
        expect(action.type).toBe(ActionType.MAP_PREVIOUS_VIEW);
        expect(action.payload.mapName).toBe("TestMap");
    });

    it("nextView creates correct action", () => {
        const action = nextView("TestMap");
        expect(action.type).toBe(ActionType.MAP_NEXT_VIEW);
        expect(action.payload.mapName).toBe("TestMap");
    });

    it("setActiveTool creates correct action", () => {
        const action = setActiveTool(ActiveMapTool.Select);
        expect(action.type).toBe(ActionType.MAP_SET_ACTIVE_TOOL);
        expect(action.payload).toBe(ActiveMapTool.Select);
    });

    it("setActiveMap creates correct action", () => {
        const action = setActiveMap("TestMap");
        expect(action.type).toBe(ActionType.MAP_SET_ACTIVE_MAP);
        expect(action.payload).toBe("TestMap");
    });

    it("setFeatureTooltipsEnabled creates correct action", () => {
        const action = setFeatureTooltipsEnabled(true);
        expect(action.type).toBe(ActionType.MAP_SET_MAPTIP);
        expect(action.payload).toBe(true);
    });

    it("enableSelectDragPan creates correct action", () => {
        const action = enableSelectDragPan(false);
        expect(action.type).toBe(ActionType.MAP_ENABLE_SELECT_DRAGPAN);
        expect(action.payload).toBe(false);
    });

    it("setManualFeatureTooltipsEnabled creates correct action", () => {
        const action = setManualFeatureTooltipsEnabled(true);
        expect(action.type).toBe(ActionType.MAP_SET_MANUAL_MAPTIP);
        expect(action.payload).toBe(true);
    });

    it("setViewRotation creates correct action", () => {
        const action = setViewRotation(45);
        expect(action.type).toBe(ActionType.MAP_SET_VIEW_ROTATION);
        expect(action.payload).toBe(45);
    });

    it("setViewRotationEnabled creates correct action", () => {
        const action = setViewRotationEnabled(true);
        expect(action.type).toBe(ActionType.MAP_SET_VIEW_ROTATION_ENABLED);
        expect(action.payload).toBe(true);
    });

    it("showSelectedFeature creates correct action", () => {
        const action = showSelectedFeature("TestMap", "layer1", "key1");
        expect(action.type).toBe(ActionType.MAP_SHOW_SELECTED_FEATURE);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerId).toBe("layer1");
        expect(action.payload.selectionKey).toBe("key1");
    });

    it("removeMapLayer creates correct action", () => {
        const action = removeMapLayer("TestMap", "Roads");
        expect(action.type).toBe(ActionType.REMOVE_LAYER);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
    });

    it("setMapLayerIndex creates correct action", () => {
        const action = setMapLayerIndex("TestMap", "Roads", 2);
        expect(action.type).toBe(ActionType.SET_LAYER_INDEX);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
        expect(action.payload.index).toBe(2);
    });

    it("setMapLayerOpacity creates correct action", () => {
        const action = setMapLayerOpacity("TestMap", "Roads", 0.7);
        expect(action.type).toBe(ActionType.SET_LAYER_OPACITY);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
        expect(action.payload.opacity).toBe(0.7);
    });

    it("setMapLayerVisibility creates correct action", () => {
        const action = setMapLayerVisibility("TestMap", "Roads", true);
        expect(action.type).toBe(ActionType.SET_LAYER_VISIBILITY);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
        expect(action.payload.visible).toBe(true);
    });

    it("setHeatmapLayerBlur creates correct action", () => {
        const action = setHeatmapLayerBlur("TestMap", "HeatLayer", 10);
        expect(action.type).toBe(ActionType.SET_HEATMAP_LAYER_BLUR);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("HeatLayer");
        expect(action.payload.blur).toBe(10);
    });

    it("setHeatmapLayerRadius creates correct action", () => {
        const action = setHeatmapLayerRadius("TestMap", "HeatLayer", 20);
        expect(action.type).toBe(ActionType.SET_HEATMAP_LAYER_RADIUS);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("HeatLayer");
        expect(action.payload.radius).toBe(20);
    });

    it("setMapLayerVectorStyle creates correct action", () => {
        const action = setMapLayerVectorStyle("TestMap", "Roads", SIMPLE_VECTOR_STYLE, VectorStyleSource.Base);
        expect(action.type).toBe(ActionType.SET_LAYER_VECTOR_STYLE);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
        expect(action.payload.style).toEqual(SIMPLE_VECTOR_STYLE);
        expect(action.payload.which).toBe(VectorStyleSource.Base);
    });

    it("addMapLayerBusyWorker creates correct action", () => {
        const action = addMapLayerBusyWorker("TestMap", "Roads");
        expect(action.type).toBe(ActionType.ADD_LAYER_BUSY_WORKER);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
    });

    it("removeMapLayerBusyWorker creates correct action", () => {
        const action = removeMapLayerBusyWorker("TestMap", "Roads");
        expect(action.type).toBe(ActionType.REMOVE_LAYER_BUSY_WORKER);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
    });

    it("addClientSelectedFeature creates correct action", () => {
        const feature: ClientSelectionFeature = { properties: { id: 1 } };
        const action = addClientSelectedFeature("TestMap", "Roads", feature);
        expect(action.type).toBe(ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layerName).toBe("Roads");
        expect(action.payload.feature).toEqual(feature);
    });

    it("clearClientSelection creates correct action", () => {
        const action = clearClientSelection("TestMap");
        expect(action.type).toBe(ActionType.MAP_CLEAR_CLIENT_SELECTION);
        expect(action.payload.mapName).toBe("TestMap");
    });

    it("externalLayersReady creates correct action", () => {
        const action = externalLayersReady("TestMap");
        expect(action.type).toBe(ActionType.EXTERNAL_LAYERS_READY);
        expect(action.payload.mapName).toBe("TestMap");
    });

    it("mapLayerAdded creates correct action with no style", () => {
        const layer: ILayerInfo = { name: "Roads", displayName: "Roads", type: "Vector", visible: true, isExternal: true } as unknown as ILayerInfo;
        const action = mapLayerAdded("TestMap", layer);
        expect(action.type).toBe(ActionType.LAYER_ADDED);
        expect(action.payload.mapName).toBe("TestMap");
        expect(action.payload.layer).toEqual(layer);
        expect(action.payload.defaultStyle).toBeUndefined();
    });

    it("mapLayerAdded creates correct action with style", () => {
        const layer: ILayerInfo = { name: "Roads", displayName: "Roads", type: "Vector", visible: true, isExternal: true } as unknown as ILayerInfo;
        const action = mapLayerAdded("TestMap", layer, SIMPLE_VECTOR_STYLE);
        expect(action.payload.defaultStyle).toEqual(SIMPLE_VECTOR_STYLE);
    });
});

describe("actions/map - activateMap thunk", () => {
    it("dispatches MAP_SET_ACTIVE_MAP directly when map is not pending", async () => {
        const initialState = createInitialState();
        const map = createMap();
        // Set up mapState for the active map
        const mapState = {
            [map.Name]: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                mapguide: { ...MG_INITIAL_SUB_STATE, runtimeMap: map }
            }
        };
        const state = {
            ...initialState,
            config: {
                ...initialState.config,
                activeMapName: map.Name,
                pendingMaps: undefined
            },
            mapState
        };
        const dispatched: any[] = [];
        const dispatch = (action: any) => { dispatched.push(action); return action; };
        const getState = () => state as any;

        const thunk = activateMap(map.Name);
        await thunk(dispatch as any, getState as any);

        expect(dispatched).toHaveLength(1);
        expect(dispatched[0].type).toBe(ActionType.MAP_SET_ACTIVE_MAP);
        expect(dispatched[0].payload).toBe(map.Name);
    });

    it("dispatches MAP_SET_ACTIVE_MAP without MAP_REFRESH when no session is available", async () => {
        const initialState = createInitialState();
        const map = createMap();
        const mapState = {
            [map.Name]: {
                ...MAP_STATE_INITIAL_SUB_STATE,
                mapguide: { ...MG_INITIAL_SUB_STATE, runtimeMap: undefined }
            }
        };
        const state = {
            ...initialState,
            config: {
                ...initialState.config,
                agentUri: "http://localhost/mapguide/mapagent/mapagent.fcgi",
                agentKind: "mapagent" as const,
                activeMapName: map.Name,
                pendingMaps: {
                    "LazyMap": { mapDef: "Library://LazyMap.MapDefinition", metadata: {} }
                }
            },
            mapState
        };
        const dispatched: any[] = [];
        const dispatch = (action: any) => { dispatched.push(action); return action; };
        const getState = () => state as any;

        const thunk = activateMap("LazyMap");
        await thunk(dispatch as any, getState as any);

        // Without a session, it should still dispatch MAP_SET_ACTIVE_MAP (just without creating the map)
        expect(dispatched).toHaveLength(1);
        expect(dispatched[0].type).toBe(ActionType.MAP_SET_ACTIVE_MAP);
        expect(dispatched[0].payload).toBe("LazyMap");
    });
});