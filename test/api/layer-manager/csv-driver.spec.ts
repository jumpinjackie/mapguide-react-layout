import { describe, test, expect } from "vitest";
import { CSV_COLUMN_ALIASES, CsvFormatDriver } from "../../../src/api/layer-manager/csv-driver";
import VectorSource from "ol/source/Vector";
import type { Point } from "ol/geom";


describe("CsvFormatDriver", () => {
    describe("with standard aliases", async () => {
        test.each([
            { xHeader: "lon", yHeader: "lat" },
            { xHeader: "lng", yHeader: "lat" },
            { xHeader: "longitude", yHeader: "latitude" },
            { xHeader: "x", yHeader: "y" },
            { xHeader: "easting", yHeader: "northing" }
        ])("with $xHeader/$yHeader", async ({ xHeader, yHeader }) => {
            const csv = `id,${xHeader},${yHeader},name
1,1,1,foo
2,2,2,bar`;
            const driver = new CsvFormatDriver(CSV_COLUMN_ALIASES);
            const res = await driver.tryParse(-1, csv);

            expect(res.hasFeatures()).toBe(true);
            expect(res.type).toBe("CSV");

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
        it("no coordinates", async () => {
            const csv = `id,name
1,foo
2,bar`;
            const driver = new CsvFormatDriver(CSV_COLUMN_ALIASES);
            expect(async () => await driver.tryParse(-1, csv)).rejects.toThrow();
        });
        it("invalid content", async () => {
            const csv = `this is not
a valid
csv file`;
            const driver = new CsvFormatDriver(CSV_COLUMN_ALIASES);
            expect(async () => await driver.tryParse(-1, csv)).rejects.toThrow();
        });
        it("empty", async () => {
            const csv = ``;
            const driver = new CsvFormatDriver(CSV_COLUMN_ALIASES);
            expect(async () => await driver.tryParse(-1, csv)).rejects.toThrow();
        });
    });
    it("with custom alias", async () => {
        const xHeader = "xCoord";
        const yHeader = "yCoord";
        const csv = `id,${xHeader},${yHeader},name
1,1,1,foo
2,2,2,bar`;
        const driver = new CsvFormatDriver([
            { xColumn: xHeader, yColumn: yHeader }
        ]);
        const res = await driver.tryParse(-1, csv);

        expect(res.hasFeatures()).toBe(true);
        expect(res.type).toBe("CSV");

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
})