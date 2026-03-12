import { describe, it, expect } from "vitest";
import { areUrlsSame, parseComponentUri, isComponentUri, ensureParameters, appendParameters, parseUrl, stringifyQuery, parseUrlParameters } from "../../src/utils/url";

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
        it("same urls with LOCALE (uppercase) query string param should match", () => {
            expect(areUrlsSame("/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo", "/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo&LOCALE=en")).toBe(true);
        });
        it("urls with same number of params but different param names should not match", () => {
            // Same number of params, different names: triggers arraysEqual mismatch
            expect(areUrlsSame("/script.php?SESSION=abc&MAPNAME=Foo", "/script.php?SESSION=abc&VIEWNAME=Foo")).toBe(false);
        });
        it("urls with different numbers of non-locale params should not match", () => {
            // Different number of params (after locale filtering): triggers arraysEqual length mismatch
            expect(areUrlsSame("/script.php?SESSION=abc&MAPNAME=Foo", "/script.php?SESSION=abc")).toBe(false);
        });
        it("same absolute-path relative urls should match", () => {
            expect(areUrlsSame("/mapguide/demo/test.php?SESSION=abc&MAPNAME=Foo", "/mapguide/demo/test.php?SESSION=abc&MAPNAME=Foo")).toBe(true);
        });
        it("absolute-path relative urls with different paths should not match", () => {
            expect(areUrlsSame("/mapguide/demo/test.php?SESSION=abc&MAPNAME=Foo", "/mapguide/demo/other.php?SESSION=abc&MAPNAME=Foo")).toBe(false);
        });
        it("same relative-path urls should match", () => {
            expect(areUrlsSame("test.php?SESSION=abc&MAPNAME=Foo", "test.php?SESSION=abc&MAPNAME=Foo")).toBe(true);
        });
        it("urls with different hash fragments should not match", () => {
            expect(areUrlsSame("http://www.google.com#section1", "http://www.google.com#section2")).toBe(false);
        });
        it("url with hash and url without hash should not match", () => {
            expect(areUrlsSame("http://www.google.com#section1", "http://www.google.com")).toBe(false);
        });
        it("same urls with same hash fragments should match", () => {
            expect(areUrlsSame("http://www.google.com#section1", "http://www.google.com#section1")).toBe(true);
        });
        it("urls with different ports should not match", () => {
            expect(areUrlsSame("http://localhost:8008/test.php", "http://localhost:9090/test.php")).toBe(false);
        });
        it("urls with same port should match", () => {
            expect(areUrlsSame("http://localhost:8008/test.php", "http://localhost:8008/test.php")).toBe(true);
        });
    });
    describe("appendParameters", () => {
        it("appends specified parameters", () => {
            expect(appendParameters("https://www.google.com", { foo: "bar" })).toBe("https://www.google.com/?foo=bar");
            expect(appendParameters("https://www.google.com?", { foo: "bar" })).toBe("https://www.google.com/?foo=bar");
            expect(appendParameters("https://www.google.com", { foo: "bar" }, true, true)).toBe("https://www.google.com/?FOO=bar");

            expect(appendParameters("https://localhost/mapguide/demo/test.php", { foo: "bar" })).toBe("https://localhost/mapguide/demo/test.php?foo=bar");
            expect(appendParameters("https://localhost/mapguide/demo/test.php?", { foo: "bar" })).toBe("https://localhost/mapguide/demo/test.php?foo=bar");
            expect(appendParameters("https://localhost/mapguide/demo/test.php", { foo: "bar" }, true, true)).toBe("https://localhost/mapguide/demo/test.php?FOO=bar");
        });
        it("only overwrites existing parameters if specified", () => {
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, true, false)).toBe("https://www.google.com/?foo=baz");
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, false, false)).toBe("https://www.google.com/?foo=bar");
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, false, true)).toBe("https://www.google.com/?FOO=bar");
            expect(appendParameters("https://www.google.com?foo=bar", { foo: "baz" }, true, true)).toBe("https://www.google.com/?FOO=baz");

            expect(appendParameters("https://localhost/mapguide/demo/test.php?foo=bar", { foo: "baz" }, true, false)).toBe("https://localhost/mapguide/demo/test.php?foo=baz");
            expect(appendParameters("https://localhost/mapguide/demo/test.php?foo=bar", { foo: "baz" }, false, false)).toBe("https://localhost/mapguide/demo/test.php?foo=bar");
            expect(appendParameters("https://localhost/mapguide/demo/test.php?foo=bar", { foo: "baz" }, false, true)).toBe("https://localhost/mapguide/demo/test.php?FOO=bar");
            expect(appendParameters("https://localhost/mapguide/demo/test.php?foo=bar", { foo: "baz" }, true, true)).toBe("https://localhost/mapguide/demo/test.php?FOO=baz");
        });
        it("discards existing parameters when bDiscardExistingParams is true", () => {
            expect(appendParameters("https://www.google.com?foo=bar", { baz: "qux" }, true, false, true)).toBe("https://www.google.com/?baz=qux");
            expect(appendParameters("https://www.google.com?foo=bar", { baz: "qux" }, true, true, true)).toBe("https://www.google.com/?BAZ=qux");
            expect(appendParameters("https://localhost/mapguide/demo/test.php?foo=bar", { baz: "qux" }, true, false, true)).toBe("https://localhost/mapguide/demo/test.php?baz=qux");
        });
        it("handles absolute-path relative urls (starting with /)", () => {
            // In a browser/jsdom environment, url-parse resolves absolute-path relative URLs
            // against window.location, so /path becomes {origin}/path
            const origin = window.location.origin;
            expect(appendParameters("/mapguide/demo/test.php", { foo: "bar" })).toBe(`${origin}/mapguide/demo/test.php?foo=bar`);
            expect(appendParameters("/mapguide/demo/test.php?foo=bar", { baz: "qux" })).toBe(`${origin}/mapguide/demo/test.php?foo=bar&baz=qux`);
            expect(appendParameters("/mapguide/demo/test.php?foo=bar", { foo: "baz" }, false)).toBe(`${origin}/mapguide/demo/test.php?foo=bar`);
            expect(appendParameters("/mapguide/demo/test.php?foo=bar", { foo: "baz" }, true, false, true)).toBe(`${origin}/mapguide/demo/test.php?foo=baz`);
        });
        it("handles relative-path urls (not starting with /)", () => {
            // In a browser/jsdom environment, url-parse resolves relative-path URLs
            // against window.location (resolved from the root of window.location.origin)
            const origin = window.location.origin;
            expect(appendParameters("mapguide/demo/test.php", { foo: "bar" })).toBe(`${origin}/mapguide/demo/test.php?foo=bar`);
            expect(appendParameters("../mapguide/demo/test.php", { foo: "bar" })).toBe(`${origin}/mapguide/demo/test.php?foo=bar`);
            expect(appendParameters("test.php", { foo: "bar" })).toBe(`${origin}/test.php?foo=bar`);
            expect(appendParameters("test.php?foo=bar", { baz: "qux" })).toBe(`${origin}/test.php?foo=bar&baz=qux`);
        });
        it("appends multiple parameters at once", () => {
            expect(appendParameters("https://www.google.com", { foo: "bar", baz: "qux" })).toBe("https://www.google.com/?foo=bar&baz=qux");
            // Absolute-path relative URLs are resolved against window.location.origin
            const origin = window.location.origin;
            expect(appendParameters("/test.php", { SESSION: "abc", MAPNAME: "Foo" })).toBe(`${origin}/test.php?SESSION=abc&MAPNAME=Foo`);
        });
    });
    describe("ensureParameters", () => {
        const mapName = "TestMap";
        const session = "abcd1234";
        const locale = "en";
        it("does nothing for component URIs", () => {
            expect(ensureParameters("component://Foo", mapName, session, locale)).toBe("component://Foo");
        });
        it("does not append parameters that are already appended", () => {
            expect(ensureParameters("https://www.google.com", mapName, session, locale)).toBe(`https://www.google.com/?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com?mapName=Foo", mapName, session, locale)).toBe(`https://www.google.com/?mapName=Foo&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com?mapName=Foo&session=sdfjsds", mapName, session, locale)).toBe(`https://www.google.com/?mapName=Foo&session=sdfjsds&LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com?mapName=Foo&session=sdfjsds&locale=de", mapName, session, locale)).toBe(`https://www.google.com/?mapName=Foo&session=sdfjsds&locale=de`);

            expect(ensureParameters("https://localhost/mapguide/demo/test.php", mapName, session, locale)).toBe(`https://localhost/mapguide/demo/test.php?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("https://localhost/mapguide/demo/test.php?mapName=Foo", mapName, session, locale)).toBe(`https://localhost/mapguide/demo/test.php?mapName=Foo&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("https://localhost/mapguide/demo/test.php?mapName=Foo&session=sdfjsds", mapName, session, locale)).toBe(`https://localhost/mapguide/demo/test.php?mapName=Foo&session=sdfjsds&LOCALE=${locale}`);
            expect(ensureParameters("https://localhost/mapguide/demo/test.php?mapName=Foo&session=sdfjsds&locale=de", mapName, session, locale)).toBe(`https://localhost/mapguide/demo/test.php?mapName=Foo&session=sdfjsds&locale=de`);
        });
        it("uses lowercase parameter names when uppercase flag is false", () => {
            expect(ensureParameters("https://www.google.com", mapName, session, locale, false)).toBe(`https://www.google.com/?mapname=${mapName}&session=${session}&locale=${locale}`);
            expect(ensureParameters("https://www.google.com?mapname=Foo", mapName, session, locale, false)).toBe(`https://www.google.com/?mapname=Foo&session=${session}&locale=${locale}`);
            expect(ensureParameters("https://localhost/mapguide/demo/test.php", mapName, session, locale, false)).toBe(`https://localhost/mapguide/demo/test.php?mapname=${mapName}&session=${session}&locale=${locale}`);
        });
        it("does not add mapName or session when they are empty or undefined", () => {
            expect(ensureParameters("https://www.google.com", undefined, undefined, locale)).toBe(`https://www.google.com/?LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com", "", "", locale)).toBe(`https://www.google.com/?LOCALE=${locale}`);
            expect(ensureParameters("https://www.google.com", null as any, null as any, locale)).toBe(`https://www.google.com/?LOCALE=${locale}`);
        });
        it("appends extra parameters when provided", () => {
            expect(ensureParameters("https://www.google.com", mapName, session, locale, true, [{ name: "extra", value: "value1" }])).toBe(`https://www.google.com/?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}&extra=value1`);
            expect(ensureParameters("https://www.google.com", mapName, session, locale, true, [{ name: "extra1", value: "val1" }, { name: "extra2", value: "val2" }])).toBe(`https://www.google.com/?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}&extra1=val1&extra2=val2`);
        });
        it("handles absolute-path relative urls (starting with /)", () => {
            // In a browser/jsdom environment, url-parse resolves absolute-path relative URLs
            // against window.location, so /path becomes {origin}/path
            const origin = window.location.origin;
            expect(ensureParameters("/mapguide/demo/test.php", mapName, session, locale)).toBe(`${origin}/mapguide/demo/test.php?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("/mapguide/demo/test.php?mapName=Foo", mapName, session, locale)).toBe(`${origin}/mapguide/demo/test.php?mapName=Foo&SESSION=${session}&LOCALE=${locale}`);
        });
        it("handles relative-path urls (not starting with /)", () => {
            // In a browser/jsdom environment, url-parse resolves relative-path URLs
            // against window.location (resolved from the root of window.location.origin)
            const origin = window.location.origin;
            expect(ensureParameters("mapguide/demo/test.php", mapName, session, locale)).toBe(`${origin}/mapguide/demo/test.php?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}`);
            expect(ensureParameters("../test.php", mapName, session, locale)).toBe(`${origin}/test.php?MAPNAME=${mapName}&SESSION=${session}&LOCALE=${locale}`);
        });
    });
    describe("isComponentUri", () => {
        it("returns true for component URIs", () => {
            expect(isComponentUri("component://Foo")).toBe(true);
            expect(isComponentUri("http://www.google.com")).toBe(false);
            expect(isComponentUri("https://www.google.com")).toBe(false);
        });
        it("returns true for component URIs with query params", () => {
            expect(isComponentUri("component://Foo?bar=baz")).toBe(true);
        });
        it("returns false for non-component URIs", () => {
            expect(isComponentUri("ftp://files.example.com")).toBe(false);
            expect(isComponentUri("/mapguide/demo/test.php")).toBe(false);
            expect(isComponentUri("test.php")).toBe(false);
        });
    });
    describe("parseUrl", () => {
        it("returns parsed url with no query string", () => {
            const parsed = parseUrl("http://www.google.com");
            expect(parsed).not.toBeUndefined();
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(0);
        });
        it("returns parsed url with single query param", () => {
            const parsed = parseUrl("http://www.google.com?foo=bar");
            expect(parsed).not.toBeUndefined();
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(1);
            expect(parsed.query.foo).toBe("bar");
        });
        it("returns parsed url with multiple query params", () => {
            const parsed = parseUrl("http://www.google.com?foo=bar&a=1");
            expect(parsed).not.toBeUndefined();
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(2);
            expect(parsed.query.foo).toBe("bar");
            expect(parsed.query.a).toBe("1");
        });
        it("handles absolute-path relative urls (starting with /)", () => {
            const parsed = parseUrl("/mapguide/demo/test.php?SESSION=abc&MAPNAME=Foo");
            expect(parsed.url).toBe("/mapguide/demo/test.php");
            expect(parsed.query.SESSION).toBe("abc");
            expect(parsed.query.MAPNAME).toBe("Foo");
        });
        it("handles relative-path urls (not starting with /)", () => {
            const parsed = parseUrl("test.php?foo=bar");
            expect(parsed.url).toBe("test.php");
            expect(parsed.query.foo).toBe("bar");
        });
        it("handles url with empty query string", () => {
            const parsed = parseUrl("http://www.google.com?");
            expect(parsed.url).toBe("http://www.google.com");
            expect(Object.keys(parsed.query)).toHaveLength(0);
        });
        it("handles url with no query string and returns empty query object", () => {
            const parsed = parseUrl("/test.php");
            expect(parsed.url).toBe("/test.php");
            expect(Object.keys(parsed.query)).toHaveLength(0);
        });
    });
    describe("stringifyQuery", () => {
        it("stringifies a simple object", () => {
            expect(stringifyQuery({ foo: "bar" })).toBe("foo=bar");
        });
        it("stringifies an object with multiple params", () => {
            expect(stringifyQuery({ foo: "bar", baz: "qux" })).toBe("foo=bar&baz=qux");
        });
        it("stringifies an object with uppercase keys", () => {
            expect(stringifyQuery({ FOO: "bar", BAZ: "qux" })).toBe("FOO=bar&BAZ=qux");
        });
        it("stringifies an empty object to empty string", () => {
            expect(stringifyQuery({})).toBe("");
        });
        it("stringifies MapGuide-style parameters (SESSION, MAPNAME, LOCALE)", () => {
            expect(stringifyQuery({ SESSION: "abc123", MAPNAME: "TestMap", LOCALE: "en" })).toBe("SESSION=abc123&MAPNAME=TestMap&LOCALE=en");
        });
        it("stringifies array values using qs bracket notation", () => {
            // qs library uses bracket notation for arrays by default
            expect(stringifyQuery({ foo: ["bar", "baz"] })).toBe("foo%5B0%5D=bar&foo%5B1%5D=baz");
        });
    });
    describe("parseUrlParameters", () => {
        it("returns empty object for url with no query string", () => {
            expect(Object.keys(parseUrlParameters("http://localhost/test.php"))).toHaveLength(0);
        });
        it("returns parsed params for absolute url with query string", () => {
            const params = parseUrlParameters("http://localhost/test.php?foo=bar&baz=qux");
            expect(params.foo).toBe("bar");
            expect(params.baz).toBe("qux");
        });
        it("returns parsed params for absolute-path relative url with query string", () => {
            const params = parseUrlParameters("/test.php?foo=bar");
            expect(params.foo).toBe("bar");
        });
        it("returns parsed params for relative-path url with query string", () => {
            const params = parseUrlParameters("test.php?foo=bar");
            expect(params.foo).toBe("bar");
        });
        it("returns parsed params with MapGuide-style uppercase parameter names", () => {
            const params = parseUrlParameters("http://localhost/test.php?SESSION=abc&MAPNAME=Foo&LOCALE=en");
            expect(params.SESSION).toBe("abc");
            expect(params.MAPNAME).toBe("Foo");
            expect(params.LOCALE).toBe("en");
        });
        it("returns multiple parsed params correctly", () => {
            const params = parseUrlParameters("http://localhost/test.php?a=1&b=2&c=3");
            expect(params.a).toBe("1");
            expect(params.b).toBe("2");
            expect(params.c).toBe("3");
        });
    });
    describe("parseComponentUri", () => {
        it("returns undefined on invalid component uris", () => {
            expect(parseComponentUri("http://www.google.com")).toBeUndefined();
        });
        it("returns undefined for absolute-path relative urls", () => {
            expect(parseComponentUri("/mapguide/demo/test.php")).toBeUndefined();
        });
        it("Returns parsed component uri", () => {
            const parsed = parseComponentUri("component://Foo");
            expect(parsed).not.toBeUndefined();
            //HACK: TypeScript leaking out required test for undefined (b/c strictNullChecks) even though we asserted it to not be the case above (because assertion is not a type-guard)
            if (parsed) {
                expect(parsed.name).toBe("Foo");
            }
        });
        it("Returns parsed component uri with empty props", () => {
            const parsed = parseComponentUri("component://Foo");
            expect(parsed).not.toBeUndefined();
            if (parsed) {
                expect(Object.keys(parsed.props)).toHaveLength(0);
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