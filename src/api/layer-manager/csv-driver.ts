import GeoJSON from "ol/format/GeoJSON";
import { IFormatDriver } from "./format-driver";
import { IParsedFeatures, ParsedFeatures } from './parsed-features';
import { strIsNullOrEmpty } from '../../utils/string';

const Papa = require("papaparse");

interface IPapaParsedResults {
    data: any[];
    errors: {
        type: string;
        code: string;
        message: string;
        row: number;
    }[];
    meta: {
        delimiter?: string;
        linebreak?: string;
        aborted?: boolean;
        fields?: string[];
        truncated?: boolean;
    }
}

export class CsvFormatDriver implements IFormatDriver {
    private type: string;
    constructor(private aliases: { xColumn: string, yColumn: string }[]) {
        this.type = "CSV";
    }
    public tryParse(size: number, text: string): Promise<IParsedFeatures> {
        const aliases = this.aliases;
        const type = this.type;
        return new Promise((resolve, reject) => {
            Papa.parse(text, {
                header: true,
                complete: function (results: IPapaParsedResults) {
                    if (!results.data || results.data.length == 0) {
                        reject(new Error("No data parsed. Probably not a CSV file"));
                    } else {
                        if (results.meta.fields) {
                            let parsed: IParsedFeatures | undefined;
                            //Run through the alias list and see if we get any matches
                            for (const alias of aliases) {
                                if (parsed) {
                                    break;
                                }
                                const xc = results.meta.fields.filter(s => s.toLowerCase() == alias.xColumn.toLowerCase())?.[0];
                                const yc = results.meta.fields.filter(s => s.toLowerCase() == alias.yColumn.toLowerCase())?.[0];
                                // We found the columns, but before we accept this set, the columns
                                // in question must be numeric. Being CSV and all, we'll use the most
                                // scientific method to determine this: Sample the first row of data /s
                                if (!strIsNullOrEmpty(xc) && !strIsNullOrEmpty(yc)) {
                                    const first = results.data[0];
                                    const firstX = parseFloat(first[xc]);
                                    const firstY = parseFloat(first[yc]);
                                    if (first && !isNaN(firstX) && !isNaN(firstY)) {
                                        const json = {
                                            type: 'FeatureCollection',
                                            features: [] as any[]
                                        };
                                        for (const d of results.data) {
                                            const x = parseFloat(d[xc]);
                                            const y = parseFloat(d[yc]);
                                            if (!isNaN(x) && !isNaN(y)) {
                                                const f = {
                                                    type: 'Feature',
                                                    geometry: {
                                                        coordinates: [x, y],
                                                        type: 'Point'
                                                    },
                                                    properties: d
                                                }
                                                delete f.properties[xc];
                                                delete f.properties[yc];
                                                json.features.push(f);
                                            }
                                        }
                                        const fmt = new GeoJSON();
                                        const features = fmt.readFeatures(json);
                                        const propNames: string[] = [];
                                        if (features.length > 0) {
                                            const first = features[0];
                                            for (const k of first.getKeys()) {
                                                if (k == first.getGeometryName()) {
                                                    continue;
                                                }
                                                propNames.push(k);
                                            }
                                        }
                                        parsed = new ParsedFeatures(type, size, features, ["Point"], propNames);
                                        break;
                                    }
                                }
                            }
                            if (parsed) {
                                resolve(parsed);
                            } else {
                                reject(new Error("Data successfully parsed as CSV, but coordinate columns could not be found"));
                            }
                        } else {
                            reject(new Error("No fields found in CSV metadata"));
                        }
                    }
                }
            });
        });
    }
}

export const CSV_COLUMN_ALIASES = [
    { xColumn: "lon", yColumn: "lat" },
    { xColumn: "lng", yColumn: "lat" },
    { xColumn: "longitude", yColumn: "latitude" },
    { xColumn: "x", yColumn: "y" },
    { xColumn: "easting", yColumn: "northing" }
];