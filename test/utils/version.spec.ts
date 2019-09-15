import { getSiteVersion, canUseQueryMapFeaturesV4 } from "../../src/utils/site-version";

describe("utils/site-version", () => {
    it("Returns true for MapGuide >= 4.0 preview 1", () => {
        expect(canUseQueryMapFeaturesV4([1,0,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([1,1,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([1,2,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([2,0,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([2,1,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([2,2,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([2,4,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([2,5,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([2,6,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([3,0,0,0])).toBe(false);
        expect(canUseQueryMapFeaturesV4([3,1,0,0])).toBe(false);
        //4.0 trunk/branch/unstamped build
        expect(canUseQueryMapFeaturesV4([4,0,0,0])).toBe(true);
        //Preview 1 is borked
        expect(canUseQueryMapFeaturesV4([4,0,0,9592])).toBe(false);
        //Preview 1.1 fixes it
        expect(canUseQueryMapFeaturesV4([4,0,0,9598])).toBe(true);
        //Anything in the future should also support it
        expect(canUseQueryMapFeaturesV4([4,1,0,0])).toBe(true);
        expect(canUseQueryMapFeaturesV4([4,1,0,9592])).toBe(true);
        expect(canUseQueryMapFeaturesV4([5,0,0,0])).toBe(true);
        expect(canUseQueryMapFeaturesV4([6,0,0,0])).toBe(true);
    })
});