import { areUrlsSame, parseComponentUri } from "../src/utils/url";

describe("utils/url", () => {
    describe("areUrlsSame", () => {
        it("exact urls should match", () => {
            expect(areUrlsSame("http://www.google.com", "http://www.google.com")).toBe(true);
        });
        it("urls with different protocols should not match", () => {
            expect(areUrlsSame("http://www.google.com", "https://www.google.com")).toBe(false);
        });
        it("urls with different qualified origins should not match", () => {
            expect(areUrlsSame("http://www.google.com", "http://google.com")).toBe(false);
        });
        it("urls with different query string params should not match", () => {
            expect(areUrlsSame("/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo", "/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Bar")).toBe(false);
        });
        it("same urls with different locale query string param should match", () => {
            expect(areUrlsSame("/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo", "/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo&locale=en")).toBe(true);
        });
    });
    describe("parseComponentUri", () => {
        it("returns undefined on invalid component uris", () => {
            expect(parseComponentUri("http://www.google.com")).toBeUndefined();
        });
        it("Returns parsed component uri", () => {
            const parsed = parseComponentUri("component://Foo");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above
            if (parsed) {
                expect(parsed.name).toBe("Foo");
            }
        });
        it("Returns parsed component uri with props", () => {
            const parsed = parseComponentUri("component://Foo?name=Bar&boo=Baz");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above
            if (parsed) {
                expect(parsed.name).toBe("Foo");
                expect(parsed.props.name).toBe("Bar");
                expect(parsed.props.boo).toBe("Baz");
            }
        });
        it("Returns parsed component uri with array prop", () => {
            const parsed = parseComponentUri("component://Foo?blah=Bi&name=Bar&name=Baz");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above
            if (parsed) {
                expect(parsed.name).toBe("Foo");
                expect(parsed.props.blah).toBe("Bi");
                expect(parsed.props.name).toHaveLength(2);
                expect(parsed.props.name[0]).toBe("Bar");
                expect(parsed.props.name[1]).toBe("Baz");
            }
        });
    });
});