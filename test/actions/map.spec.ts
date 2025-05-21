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
})