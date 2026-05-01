import { describe, expect, it } from "vitest";
import { getIconNames } from "../../../../../src/components/icon-names";
import { getSvgIconName } from "../../../../../src/components/elements/providers/minimal/icon-map";

describe("components/elements/providers/minimal/icon-map", () => {
    it("resolves every advertised icon name", () => {
        const iconNames = Array.from(new Set(getIconNames()));

        for (const iconName of iconNames) {
            expect(getSvgIconName(iconName), `missing icon mapping for ${iconName}`).not.toBeNull();
        }
    });
});