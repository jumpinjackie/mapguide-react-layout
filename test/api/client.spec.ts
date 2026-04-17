import { beforeEach, describe, expect, it, vi } from "vitest";

const builderFactoryMock = vi.hoisted(() => ({
    createRequestBuilder: vi.fn(),
}));

const mapagentMock = vi.hoisted(() => ({
    isErrorResponse: vi.fn(),
    serialize: vi.fn(() => "SERIALIZED"),
    MapAgentRequestBuilder: vi.fn(),
}));

vi.mock("../../src/api/builders/factory", () => builderFactoryMock);
vi.mock("../../src/api/builders/mapagent", () => mapagentMock);

import { Client } from "../../src/api/client";

describe("api/client", () => {
    const builder = {
        createSession: vi.fn(),
        getServerSessionTimeout: vi.fn(),
        getSiteVersion: vi.fn(),
        getResource: vi.fn(),
        createRuntimeMap: vi.fn(),
        createRuntimeMap_v4: vi.fn(),
        describeRuntimeMap: vi.fn(),
        describeRuntimeMap_v4: vi.fn(),
        queryMapFeatures: vi.fn(),
        queryMapFeatures_v4: vi.fn(),
        getTileTemplateUrl: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        builderFactoryMock.createRequestBuilder.mockReturnValue(builder);
    });

    it("constructs using a request builder and delegates builder-backed methods", async () => {
        builder.createSession.mockResolvedValue("SESSION");
        builder.getServerSessionTimeout.mockResolvedValue(1200);
        builder.getSiteVersion.mockResolvedValue({ Version: "4.0.0.0" });
        builder.getResource.mockResolvedValue({ ResourceId: "Library://A" });
        builder.createRuntimeMap.mockResolvedValue({ Name: "Map1" });
        builder.createRuntimeMap_v4.mockResolvedValue({ Name: "Map1v4" });
        builder.describeRuntimeMap.mockResolvedValue({ Name: "Map1" });
        builder.describeRuntimeMap_v4.mockResolvedValue({ Name: "Map1v4" });
        builder.queryMapFeatures.mockResolvedValue({ FeatureSet: {} });
        builder.queryMapFeatures_v4.mockResolvedValue({ FeatureSet: { Layer: [] } });
        builder.getTileTemplateUrl.mockReturnValue("tile-url");

        const client = new Client("http://example.test/mapagent", "mapguide-rest" as any);

        expect(builderFactoryMock.createRequestBuilder).toHaveBeenCalledWith("http://example.test/mapagent", "mapguide-rest");
        await expect(client.createSession("Administrator", "admin")).resolves.toBe("SESSION");
        await expect(client.getServerSessionTimeout("SESSION")).resolves.toBe(1200);
        await expect(client.getSiteVersion()).resolves.toEqual({ Version: "4.0.0.0" });
        await expect(client.getResource("Library://A" as any)).resolves.toEqual({ ResourceId: "Library://A" });
        await expect(client.createRuntimeMap({ mapDefinition: "Library://A" } as any)).resolves.toEqual({ Name: "Map1" });
        await expect(client.createRuntimeMap_v4({ mapDefinition: "Library://A" } as any)).resolves.toEqual({ Name: "Map1v4" });
        await expect(client.describeRuntimeMap({ mapname: "Map1" } as any)).resolves.toEqual({ Name: "Map1" });
        await expect(client.describeRuntimeMap_v4({ mapname: "Map1" } as any)).resolves.toEqual({ Name: "Map1v4" });
        await expect(client.queryMapFeatures({ mapname: "Map1" } as any)).resolves.toEqual({ FeatureSet: {} });
        await expect(client.queryMapFeatures_v4({ mapname: "Map1" } as any)).resolves.toEqual({ FeatureSet: { Layer: [] } });
        expect(client.getTileTemplateUrl("Library://A", "Base", "{x}", "{y}", "{z}", true)).toBe("tile-url");
    });

    it("getText returns response text on success", async () => {
        vi.spyOn(globalThis, "fetch" as any).mockResolvedValueOnce({
            ok: true,
            text: async () => "payload",
        } as Response);

        const client = new Client("http://example.test/mapagent", "mapguide-rest" as any);
        await expect(client.getText("http://example.test/file.txt")).resolves.toBe("payload");
    });

    it("getText throws an MgError on failure", async () => {
        vi.spyOn(globalThis, "fetch" as any).mockResolvedValueOnce({
            ok: false,
            statusText: "Forbidden",
        } as Response);

        const client = new Client("http://example.test/mapagent", "mapguide-rest" as any);
        await expect(client.getText("http://example.test/file.txt")).rejects.toThrow("Forbidden");
    });

    it("get performs a JSON request and rejects error responses", async () => {
        mapagentMock.isErrorResponse.mockReturnValueOnce(false).mockReturnValueOnce(true);
        vi.spyOn(globalThis, "fetch" as any)
            .mockResolvedValueOnce({ json: async () => ({ ok: true }) } as Response)
            .mockResolvedValueOnce({ statusText: "Server Error" } as Response);

        const client = new Client("http://example.test/mapagent", "mapguide-rest" as any);
        await expect(client.get("http://example.test/resource")).resolves.toEqual({ ok: true });
        await expect(client.get("http://example.test/resource")).rejects.toThrow("Server Error");
    });

    it("post serializes form data, applies a default format, and preserves an existing one", async () => {
        mapagentMock.isErrorResponse.mockReturnValue(false);
        const fetchSpy = vi.spyOn(globalThis, "fetch" as any)
            .mockResolvedValue({ json: async () => ({ ok: true }) } as Response);

        const client = new Client("http://example.test/mapagent", "mapguide-rest" as any);
        const firstPayload: any = { mapname: "Map1" };
        const secondPayload: any = { mapname: "Map1", format: "text/plain" };

        await expect(client.post("http://example.test/post", firstPayload)).resolves.toEqual({ ok: true });
        await expect(client.post("http://example.test/post", secondPayload)).resolves.toEqual({ ok: true });

        expect(firstPayload.format).toBe("application/json");
        expect(secondPayload.format).toBe("text/plain");
        expect(mapagentMock.serialize).toHaveBeenCalledWith(firstPayload);
        expect(mapagentMock.serialize).toHaveBeenCalledWith(secondPayload);
        expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
});