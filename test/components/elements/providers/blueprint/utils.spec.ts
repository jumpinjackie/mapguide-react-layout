import { describe, it, expect } from "vitest";
import { iconName, variantToIntent } from "../../../../../src/components/elements/providers/blueprint/utils";
import { Intent } from "@blueprintjs/core";

describe("components/elements/providers/blueprint/utils", () => {
    describe("iconName", () => {
        it("returns the name as IconName when defined", () => {
            expect(iconName("edit")).toBe("edit");
        });

        it("returns undefined when name is undefined", () => {
            expect(iconName(undefined)).toBeUndefined();
        });
    });

    describe("variantToIntent", () => {
        it("returns PRIMARY for 'primary'", () => {
            expect(variantToIntent("primary")).toBe(Intent.PRIMARY);
        });

        it("returns WARNING for 'warning'", () => {
            expect(variantToIntent("warning")).toBe(Intent.WARNING);
        });

        it("returns DANGER for 'danger'", () => {
            expect(variantToIntent("danger")).toBe(Intent.DANGER);
        });

        it("returns SUCCESS for 'success'", () => {
            expect(variantToIntent("success")).toBe(Intent.SUCCESS);
        });

        it("returns undefined for unknown variant", () => {
            expect(variantToIntent(undefined)).toBeUndefined();
        });

        it("returns undefined for any unrecognized variant", () => {
            expect(variantToIntent("unknown" as any)).toBeUndefined();
        });
    });
});
