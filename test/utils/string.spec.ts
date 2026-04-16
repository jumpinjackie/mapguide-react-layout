import { describe, it, expect } from "vitest";
import { strEndsWith, strIsNullOrEmpty, strStartsWith, strReplaceAll, strTrim, isResourceId, extractPlaceholderTokens } from '../../src/utils/string';

describe("utils/string", () => {
    describe("strIsNullOrEmpty", () => {
        it("is true for null", () => expect(strIsNullOrEmpty(null)).toBe(true));
        it("is true for undefined", () => expect(strIsNullOrEmpty(undefined)).toBe(true));
        it("is true for empty string", () => expect(strIsNullOrEmpty("")).toBe(true));
        it("is false for non-empty string", () => expect(strIsNullOrEmpty("hello")).toBe(false));
    });
    describe("strEndsWith", () => {
        it("Does end with", () => {
            expect(strEndsWith("abcd1234", "1234")).toBe(true);
            expect(strEndsWith("abcd1234", "d1234")).toBe(true);
            expect(strEndsWith("abcd1234", "cd1234")).toBe(true);
            expect(strEndsWith("abcd1234", "abcd1234")).toBe(true);
        });
        it("Does not end with", () => {
            expect(strEndsWith("abcd1234", "123")).toBe(false);
            expect(strEndsWith("abcd1234", "C1234")).toBe(false);
            expect(strEndsWith("abcd1234", "Bc1234")).toBe(false);
        });
        it("Properly handles empty string args", () => {
            expect(strEndsWith("", "abcd1234")).toBe(false);
            expect(strEndsWith("abcd1234", "")).toBe(true);
            expect(strEndsWith("", "")).toBe(true);
        });
    });
    describe("strStartsWith", () => {
        it("returns true when string starts with given word", () => {
            expect(strStartsWith("hello world", "hello")).toBe(true);
            expect(strStartsWith("Library://Foo.MapDefinition", "Library://")).toBe(true);
        });
        it("returns false when string does not start with given word", () => {
            expect(strStartsWith("hello world", "world")).toBe(false);
            expect(strStartsWith("hello world", "Hello")).toBe(false);
        });
        it("returns false for empty string with non-empty word", () => {
            expect(strStartsWith("", "hello")).toBe(false);
        });
        it("returns true when word is empty string", () => {
            expect(strStartsWith("hello", "")).toBe(true);
        });
    });
    describe("strReplaceAll", () => {
        it("replaces all occurrences of a substring", () => {
            expect(strReplaceAll("aaa bbb aaa", "aaa", "ccc")).toBe("ccc bbb ccc");
        });
        it("returns original string when substring not found", () => {
            expect(strReplaceAll("hello world", "xyz", "abc")).toBe("hello world");
        });
        it("replaces all occurrences of a single character", () => {
            expect(strReplaceAll("a/b/c/d", "/", "-")).toBe("a-b-c-d");
        });
    });
    describe("strTrim", () => {
        it("trims leading and trailing whitespace", () => {
            expect(strTrim("  hello world  ")).toBe("hello world");
        });
        it("returns original string if no whitespace to trim", () => {
            expect(strTrim("hello")).toBe("hello");
        });
        it("trims a string with only whitespace to empty string", () => {
            expect(strTrim("   ")).toBe("");
        });
    });
    describe("isResourceId", () => {
        it("returns true for strings starting with Library://", () => {
            expect(isResourceId("Library://Foo/Bar.MapDefinition")).toBe(true);
        });
        it("returns false for strings not starting with Library://", () => {
            expect(isResourceId("http://example.com/map")).toBe(false);
            expect(isResourceId("")).toBe(false);
        });
    });
    it("extractPlaceholderTokens", () => {
        const tokens = extractPlaceholderTokens("http://foo.com/bar/{BAR_ID}/{WHAT}", "{", "}");
        expect(tokens).toHaveLength(2);
        expect(tokens).toContain("BAR_ID");
        expect(tokens).toContain("WHAT");
    });
    it("extractPlaceholderTokens returns empty array when no tokens found", () => {
        const tokens = extractPlaceholderTokens("http://foo.com/bar/", "{", "}");
        expect(tokens).toHaveLength(0);
    });
});