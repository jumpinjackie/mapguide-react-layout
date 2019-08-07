import { RuntimeMap } from '../api/contracts/runtime-map';

export function getSiteVersion(map: RuntimeMap): [number, number] {
    const [sMaj, sMin] = map.SiteVersion.split(".");
    const vMaj = parseInt(sMaj, 10);
    const vMin = parseInt(sMin, 10);
    return [vMaj, vMin];
}