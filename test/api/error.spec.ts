import { describe, it, expect } from "vitest";
import { MgError, isSessionExpiredError } from "../../src/api/error";

describe("api/error", () => {
    describe("MgError", () => {
        it("name should always be MgError", () => {
            const err = new MgError("uh oh!");
            expect(err.name).toBe("MgError");
        });
        it("message should be what is passed in", () => {
            const err = new MgError("uh oh!");
            expect(err.message).toBe("uh oh!");
        });
    });
    describe("isSessionExpiredError", () => {
        it("Is session expired error if message contains MgSessionExpiredException", () => {
            const err = new MgError("MgSessionExpiredException");
            expect(isSessionExpiredError(err)).toBe(true);
            const err2 = new MgError("MgSessionExpiredException - Your MapGuide Session has expired");
            expect(isSessionExpiredError(err2)).toBe(true);
            const err3 = new MgError("Blahfdk");
            expect(isSessionExpiredError(err3)).toBe(false);
            const err4 = new Error("adsgkjsdfd");
            expect(isSessionExpiredError(err4)).toBe(false);
            const err5 = new Error("MgSessionExpiredException");
            expect(isSessionExpiredError(err5)).toBe(true);
            const err6 = new Error("MgSessionExpiredException - Your MapGuide Session has expired");
            expect(isSessionExpiredError(err6)).toBe(true);
        });
        it("returns true for MgSessionExpiredException", () => {
            expect(isSessionExpiredError(new MgError("MgSessionExpiredException"))).toBe(true);
        });
        it("returns false for non-session-expiry", () => {
            expect(isSessionExpiredError(new MgError("asdgdsifdf"))).toBe(false);
        });
    });
});