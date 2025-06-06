import * as React from "react";
import colorbrewer from "colorbrewer";

export interface IColorBrewerRamp {
    displayName: string;
    category: string;
    scheme: string;
    ramp: string[] | undefined;
}

export function getColorBrewerRamps(): IColorBrewerRamp[] {
    const ramps = [] as IColorBrewerRamp[];
    for (const cat in colorbrewer.schemeGroups) {
        for (const scheme of colorbrewer.schemeGroups[cat]) {
            const ramp = getMaxRamp(scheme);
            ramps.push({ displayName: `${cat} - ${scheme}`, category: cat, scheme: scheme, ramp: ramp });
        }
    }
    return ramps;
}

export function getMaxRamp(scheme: any) {
    let theScheme;
    let len = 0;
    for (const s in scheme) {
        const arr = scheme[s];
        if (Array.isArray(arr)) {
            if (arr.length > len) {
                theScheme = arr;
                len = arr.length;
            }
        }
    }
    return theScheme;
}

export const ColorBrewerSwatch: React.FC<{ theme: string }> = props => {
    const ramp = getMaxRamp(colorbrewer[props.theme]);
    if (ramp) {
        return <table>
            <colgroup>
                {ramp.map((r, i) => <col key={`ramp-col-${i}`} span={1} style={{ width: 12 }} />)}
            </colgroup>
            <tbody>
                <tr>
                    {ramp.map((r, i) => <td key={`ramp-${i}`} style={{ border: "1px solid black", backgroundColor: r }}>&nbsp;</td>)}
                </tr>
            </tbody>
        </table>
    };
    return <></>;
};