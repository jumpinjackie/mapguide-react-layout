import { areUrlsSame, parseComponentUri, isComponentUri, ensureParameters, appendParameters, parseUrl } from "../../src/utils/url";

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
    describe("appendParameters", () => {
        it("appends specified parameters", () => {
            expect(appendParameters("https://www.google.com", { foo: "bar" })).toBe("https://www.google.com?foo=bar");
            expect(appendParameters("https://www.google.com?", { foo: "bar" })).toBe("https://www.google.com?foo=bar");
            expect(appendParameters("https://www.google.com", { foo: "bar" }, true, true)).toBe("https://www.google.com?FOO=bar");
        });
        it("only overwrites existing parameters if specified", () => {
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, true, false)).toBe("https://www.google.com?foo=baz");
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, false, false)).toBe("https://www.google.com?foo=bar");
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, false, true)).toBe("https://www.google.com?FOO=bar");
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, true, true)).toBe("https://www.google.com?FOO=baz");
        });
    })
    describe("ensureParameters", () => {
        const mapName = "TestMap";
        const session = "abcd1234";
        const locale = "en";
        it("does nothing for component URIs", () => {
            expect(ensureParameters("component://Foo", mapName, session, locale)).toBe("component://Foo");
        });
        it("does not append parameters that are already appended", () => {
            expect(ensureParameters("https://www.google.com", mapName, session, locale)).toBe(`https://www.google.com?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com?mapName=Foo", mapName, session, locale)).toBe(`https://www.google.com?mapName=Foo&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com?mapName=Foo&session=sdfjsds", mapName, session, locale)).toBe(`https://www.google.com?mapName=Foo&session=sdfjsds&LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com?mapName=Foo&session=sdfjsds&locale=de", mapName, session, locale)).toBe(`https://www.google.com?mapName=Foo&session=sdfjsds&locale=de`);
        });
    });
    describe("isComponentUri", () => {
        it("returns true for component URIs", () => {
            expect(isComponentUri("component://Foo")).toBe(true);
            expect(isComponentUri("http://www.google.com")).toBe(false);
            expect(isComponentUri("https://www.google.com")).toBe(false);
        });
    });
    describe("parseUrl", () => {
        it("Returns parsed url", () => {
            let parsed = parseUrl("http://www.google.com");
            expect(parsed).not.toBeUndefined();
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(0);
            parsed = parseUrl("http://www.google.com?foo=bar");
            expect(parsed).not.toBeUndefined();
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(1);
            expect(parsed.query.foo).toBe("bar");
            parsed = parseUrl("http://www.google.com?foo=bar&a=1");
            expect(parsed).not.toBeUndefined();
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(2);
            expect(parsed.query.foo).toBe("bar");
            expect(parsed.query.a).toBe("1");
        });
    });
    describe("parseComponentUri", () => {
        it("returns undefined on invalid component uris", () => {
            expect(parseComponentUri("http://www.google.com")).toBeUndefined();
        });
        it("Returns parsed component uri", () => {
            const parsed = parseComponentUri("component://Foo");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above (because assertion is not a type-guard)
            if (parsed) {
                expect(parsed.name).toBe("Foo");
            }
        });
        it("Returns parsed component uri with props", () => {
            const parsed = parseComponentUri("component://Foo?name=Bar&boo=Baz");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above (because assertion is not a type-guard)
            if (parsed) {
                expect(parsed.name).toBe("Foo");
                expect(parsed.props.name).toBe("Bar");
                expect(parsed.props.boo).toBe("Baz");
            }
        });
        it("Returns parsed component uri with array prop", () => {
            const parsed = parseComponentUri("component://Foo?blah=Bi&name=Bar&name=Baz");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above (because assertion is not a type-guard)
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