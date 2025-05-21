import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ViewSize } from "../../src/components/view-size";
import { UnitOfMeasure, IMapView } from "../../src/api/common";

describe("components/view-size", () => {
    it("renders same values as fusion baseline", async () => {
        //The values here were sampled from a debugging session on a Fusion application
        //Our ViewSize component should put out the same map size given the same values
        const mpu = 111319.49079327358;
        //Only resolution affects rendering
        const view: IMapView = {
            x: 0,
            y: 0,
            scale: 0,
            resolution: 0.00019652198461480883
        }
        const wrapper = render(<ViewSize width={1150} height={540} view={view} units={UnitOfMeasure.Meters} metersPerUnit={mpu} />);
        const el = await wrapper.findByText("25158.24 x 11813.43 (m)");
        expect(el).not.toBeUndefined();
    });
});