import { expect } from 'chai';
import { fmt, tr } from "../src/api/i18n";

describe("api/i18n", () => {
    describe("fmt", () => {
        it("No args should return original format string", () => {
            expect(fmt("foo")).to.be.equal("foo");
        });
        it("Passing invalid args should return original format string", () => {
            expect(fmt("foo {bar}", { foo: "bar" })).to.be.equal("foo {bar}");
        });
        it("Passing incomplete args should return as much of the formatted string as possible", () => {
            expect(fmt("foo {bar} {foo}", { foo: "bar" })).to.be.equal("foo {bar} bar");
        });
        it("Args can have { } placeholders", () => {
            expect(fmt("foo {bar} {foo}", { foo: "{bar}" })).to.be.equal("foo {bar} {bar}");
        });
    });
    describe("tr", () => {
        it("locale should default to en if not specified", () => {
            expect(tr("MEASUREMENT", "en")).to.be.equal("Measurement");
            expect(tr("SESSION_EXPIRED", "en")).to.be.equal("Session Expired");
            expect(tr("SELECTION_PROPERTY", "en")).to.be.equal("Property");
            expect(tr("ABOUT", "en")).to.be.equal("About");
            expect(tr("QUICKPLOT_HEADER", "en")).to.be.equal("Quick Plot");
        });
        it("locale with unregistered locale should return original localization key", () => {
            expect(tr("MEASURE", "dk")).to.be.equal("MEASURE");
            expect(tr("SESSION_EXPIRED", "dk")).to.be.equal("SESSION_EXPIRED");
            expect(tr("SELECTION_PROPERTY", "dk")).to.be.equal("SELECTION_PROPERTY");
            expect(tr("ABOUT", "dk")).to.be.equal("ABOUT");
            expect(tr("QUICKPLOT_HEADER", "dk")).to.be.equal("QUICKPLOT_HEADER");
        });
    });
});