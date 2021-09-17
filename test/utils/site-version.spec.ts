import { getSiteVersion } from "../../src/utils/site-version"

describe("utils/site-version", () => {
    describe("getSiteVersion", () => {
        it("parses", () => {
            const ver = getSiteVersion({
                SiteVersion: "4.1.3.3984"
            } as any);
            expect(ver).toHaveLength(4);
            expect(ver[0]).toBe(4);
            expect(ver[1]).toBe(1);
            expect(ver[2]).toBe(3);
            expect(ver[3]).toBe(3984);
        });
    });
    
})