import { expect } from 'chai';
import { areUrlsSame } from "../src/utils/url";

describe("utils/url", () => {
    describe("areUrlsSame", () => {
        it("exact urls should match", () => {
            expect(areUrlsSame("http://www.google.com", "http://www.google.com")).to.be.true;
        });
        it("urls with different protocols should not match", () => {
            expect(areUrlsSame("http://www.google.com", "https://www.google.com")).to.be.false;
        });
        it("urls with different qualified origins should not match", () => {
            expect(areUrlsSame("http://www.google.com", "http://google.com")).to.be.false;
        });
        it("urls with different query string params should not match", () => {
            expect(areUrlsSame("/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo", "/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Bar")).to.be.false;
        });
        it("same urls with different locale query string param should match", () => {
            expect(areUrlsSame("/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo", "/my_mapguide_app/script.php?SESSION=abcdefgh123456&MAPNAME=Foo&locale=en")).to.be.true;
        });
    });
});