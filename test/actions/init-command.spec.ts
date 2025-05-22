import { describe, it, expect } from "vitest";
import { buildSubjectLayerDefn, isMapDefinition, isStateless } from "../../src/actions/init-command";
import { GenericSubjectLayerType, IGenericSubjectMapLayer } from "../../src/actions/defs";

describe("actions/init-command", () => {
    it("buildSubjectLayerDefn builds correct object", () => {
        const map = {
            Type: "Vector",
            Extension: {
                source_type: "foo",
                display_name: "bar",
                driver_name: "baz",
                layer_description: "desc",
                vector_layer_style: { color: "red" },
                cluster: { distance: 10 },
                is_selectable: false,
                disable_hover: true,
                popup_template: "<div>Popup</div>",
                initially_visible: false,
                source_param_foo: "spfoo",
                layer_opt_bar: "lobar"
            }
        };
        const result = buildSubjectLayerDefn("test", map);
        expect(result.name).toBe("test");
        expect(result.displayName).toBe("bar");
        expect(result.driverName).toBe("baz");
        expect(result.description).toBe("desc");
        expect(result.vectorStyle).toEqual({ color: "red" });
        expect(result.cluster).toEqual({ distance: 10 });
        expect(result.selectable).toBe(false);
        expect(result.disableHover).toBe(true);
        expect(result.popupTemplate).toBe("<div>Popup</div>");
        expect(result.initiallyVisible).toBe(false);
        expect(result.sourceParams.foo).toBe("spfoo");
        expect(result.layerOptions.bar).toBe("lobar");
    });

    it("isMapDefinition type guard works", () => {
        const mapDef = { name: "foo", mapDef: "bar", metadata: {} };
        // Use a minimal IGenericSubjectMapLayer shape for the negative case, with a valid type value
        const subj: IGenericSubjectMapLayer = { name: "foo", type: GenericSubjectLayerType.CustomVector, meta: undefined, layerOptions: {}, sourceParams: {}, initiallyVisible: true, selectable: true };
        expect(isMapDefinition(mapDef)).toBe(true);
        expect(isMapDefinition(subj)).toBe(false);
    });

    it("isStateless returns true if Extension.Stateless is 'true'", () => {
        const appDef = { Extension: { Stateless: "true" } };
        expect(isStateless(appDef as any)).toBe(true);
    });

    it("isStateless returns false if MapDefinition present", () => {
        const appDef = {
            MapSet: {
                MapGroup: [
                    { "@id": "g1", Map: [{ Type: "MapGuide", Extension: { ResourceId: "foo" } }] }
                ]
            }
        };
        expect(isStateless(appDef as any)).toBe(false);
    });
});
