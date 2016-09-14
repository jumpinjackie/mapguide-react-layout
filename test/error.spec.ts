import { expect } from 'chai';
import { MgError, isSessionExpiredError } from "../src/api/error";

describe("api/error", () => {
    describe("MgError", () => {
        it("name should always be MgError", () => {
            const err = new MgError("uh oh!");
            expect(err.name).to.be.equal("MgError");
        });
        it("message should be what is passed in", () => {
            const err = new MgError("uh oh!");
            expect(err.message).to.be.equal("uh oh!");
        });
    });
    describe("isSessionExpiredError", () => {
        it("Is session expired error if message contains MgSessionExpiredException", () => {
            const err = new MgError("MgSessionExpiredException");
            expect(isSessionExpiredError(err)).to.be.true;
            const err2 = new MgError("MgSessionExpiredException - Your MapGuide Session has expired");
            expect(isSessionExpiredError(err2)).to.be.true;
            const err3 = new MgError("Blahfdk");
            expect(isSessionExpiredError(err3)).to.be.false;
            const err4 = new Error("adsgkjsdfd");
            expect(isSessionExpiredError(err4)).to.be.false;
            const err5 = new Error("MgSessionExpiredException");
            expect(isSessionExpiredError(err5)).to.be.true;
            const err6 = new Error("MgSessionExpiredException - Your MapGuide Session has expired");
            expect(isSessionExpiredError(err6)).to.be.true;
        });
    });
});