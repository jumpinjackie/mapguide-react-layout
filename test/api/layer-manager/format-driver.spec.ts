import { describe, it, expect } from "vitest";
import { FormatDriver } from "../../../src/api/layer-manager/format-driver";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import type { Point } from "ol/geom";

describe("FormatDriver", () => {
    it("reads GeoJSON", async () => {
        const geojson = `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [1, 1]
      },
      "properties": {
        "id": 1,
        "name": "foo"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [2, 2]
      },
      "properties": {
        "id": 2,
        "name": "bar"
      }
    }
  ]
}`;
        const driver = new FormatDriver("GeoJSON", new GeoJSON());
        const res = await driver.tryParse(-1, geojson);

        expect(res.hasFeatures()).toBe(true);
        expect(res.type).toBe("GeoJSON");

        const source = new VectorSource();
        await res.addTo(source, "EPSG:3857", "EPSG:4326");

        const dstFeatures = source.getFeatures();
        expect(dstFeatures).toHaveLength(2);

        const f1 = dstFeatures.find(f => f.get("id") == 1);
        expect(f1).not.toBeUndefined();
        expect(f1).not.toBeNull();
        const f1g = f1?.getGeometry() as Point;
        expect(f1g).not.toBeUndefined();
        const f1coords = f1g.getCoordinates();
        expect(f1coords[0]).not.toBe(0);
        expect(f1coords[1]).not.toBe(0);

        const f2 = dstFeatures.find(f => f.get("id") == 2);
        expect(f2).not.toBeUndefined();
        expect(f2).not.toBeNull();
        const f2g = f2?.getGeometry() as Point;
        expect(f2g).not.toBeUndefined();
        const f2coords = f2g.getCoordinates();
        expect(f2coords[0]).not.toBe(1);
        expect(f2coords[1]).not.toBe(1);
    });

    it("reads GeoJSON (multiple types)", async () => {
        const geojson = `{
  "type": "FeatureCollection",
  "features": [
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          102.0,
          0.5
        ]
      }
    },
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            102.0,
            0.0
          ],
          [
            103.0,
            1.0
          ],
          [
            104.0,
            0.0
          ],
          [
            105.0,
            1.0
          ]
        ]
      }
    },
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              100.0,
              0.0
            ],
            [
              101.0,
              0.0
            ],
            [
              101.0,
              1.0
            ],
            [
              100.0,
              1.0
            ],
            [
              100.0,
              0.0
            ]
          ]
        ]
      }
    },
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "MultiPoint",
        "coordinates": [
          [
            10.0,
            40.0
          ],
          [
            40.0,
            30.0
          ],
          [
            20.0,
            20.0
          ],
          [
            30.0,
            10.0
          ]
        ]
      }
    },
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "MultiLineString",
        "coordinates": [
          [
            [
              10.0,
              10.0
            ],
            [
              20.0,
              20.0
            ],
            [
              10.0,
              40.0
            ]
          ],
          [
            [
              40.0,
              40.0
            ],
            [
              30.0,
              30.0
            ],
            [
              40.0,
              20.0
            ],
            [
              30.0,
              10.0
            ]
          ]
        ]
      }
    },
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                30.0,
                20.0
              ],
              [
                45.0,
                40.0
              ],
              [
                10.0,
                40.0
              ],
              [
                30.0,
                20.0
              ]
            ]
          ],
          [
            [
              [
                15.0,
                5.0
              ],
              [
                40.0,
                10.0
              ],
              [
                10.0,
                20.0
              ],
              [
                5.0,
                10.0
              ],
              [
                15.0,
                5.0
              ]
            ]
          ]
        ]
      }
    },
    {
      "properties": {},
      "type": "Feature",
      "geometry": {
        "type": "GeometryCollection",
        "geometries": [
          {
            "type": "Point",
            "coordinates": [
              40.0,
              10.0
            ]
          },
          {
            "type": "LineString",
            "coordinates": [
              [
                10.0,
                10.0
              ],
              [
                20.0,
                20.0
              ],
              [
                10.0,
                40.0
              ]
            ]
          },
          {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  40.0,
                  40.0
                ],
                [
                  20.0,
                  45.0
                ],
                [
                  45.0,
                  30.0
                ],
                [
                  40.0,
                  40.0
                ]
              ]
            ]
          }
        ]
      }
    }
  ]
}`;
        const driver = new FormatDriver("GeoJSON", new GeoJSON());
        const res = await driver.tryParse(-1, geojson);

        expect(res.hasFeatures()).toBe(true);
        expect(res.type).toBe("GeoJSON");

        const source = new VectorSource();
        await res.addTo(source, "EPSG:3857", "EPSG:4326");

        const dstFeatures = source.getFeatures();
        expect(dstFeatures).toHaveLength(7);
    });
});