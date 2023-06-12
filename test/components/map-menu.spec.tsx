import * as React from "react";
import { render } from "@testing-library/react";
import { IMapMenuEntry } from "../../src/api/common";
import { MapMenu } from "../../src/components/map-menu";

const EXTERNAL_LAYERS: IMapMenuEntry[] = [
    {
        mapName: "Foo",
        label: "Foo"
    },
    {
        mapName: "Bar",
        label: "Bar"
    }
];

describe("components/map-menu", () => {
    it("renders checked radio for selected map", () => {
        const { container } = render(<MapMenu selectedMap={"Foo"} maps={EXTERNAL_LAYERS} locale="en" />);
        const radFoo = container.querySelectorAll("input.map-menu-option")[0];
        expect(radFoo).not.toBeNull();
        expect((radFoo as HTMLInputElement).value).toBe("Foo");
        expect((radFoo as HTMLInputElement).checked).toBe(true);
        const radBar = container.querySelectorAll("input.map-menu-option")[1];
        expect(radBar).not.toBeNull();
        expect((radBar as HTMLInputElement).value).toBe("Bar");
        expect((radBar as HTMLInputElement).checked).toBe(false);
    });
    it("renders no checked radios for bogus selected map", () => {
        const { container } = render(<MapMenu selectedMap={"Baz"} maps={EXTERNAL_LAYERS} locale="en" />);
        const radFoo = container.querySelectorAll("input.map-menu-option")[0];
        expect(radFoo).not.toBeNull();
        expect((radFoo as HTMLInputElement).value).toBe("Foo");
        expect((radFoo as HTMLInputElement).checked).toBe(false);
        const radBar = container.querySelectorAll("input.map-menu-option")[1];
        expect(radBar).not.toBeNull();
        expect((radBar as HTMLInputElement).value).toBe("Bar");
        expect((radBar as HTMLInputElement).checked).toBe(false);
    });
});