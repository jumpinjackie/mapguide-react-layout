import { TsApiDefinition, TsTypeMember, dict_put, TsModuleMember, dict_has_key, dict_get } from "./typedoc-api";
import { Dictionary } from 'api';

const fs = require('fs');
const path = require("path");
const apidef: TsApiDefinition = require('../docs_output/latest/api.json');

interface IWidgetMetadata {
    name: string;
    label?: string;
    description?: string;
    imageClass?: string;
    tooltip?: string;
    location?: string;
    statusText?: string;
    provider?: string;
    nonstandard: boolean;
    containableby?: string;
}

interface IWidgetParameterMetadata {
    type?: string;
    label?: string;
    description?: string;
    defaultValue?: string;
    min?: number;
    max?: number;
}

const STR_EMPTY = "";

const widgetInfoDir = path.resolve(__dirname, `../docs_output/widgetinfo`);
if (!fs.existsSync(widgetInfoDir)){
    fs.mkdirSync(widgetInfoDir);
}

const allMembers: Dictionary<TsTypeMember> = {};

function extractWidgetMetadata(modMember: TsModuleMember): IWidgetMetadata | undefined {
    const wtag = modMember.comment?.tags?.find(t => t.tag == "widget");
    const wDesc = modMember.comment?.tags?.find(t => t.tag == "description");
    const wlabel = modMember.comment?.tags?.find(t => t.tag == "label");
    const wimgclass = modMember.comment?.tags?.find(t => t.tag == "icon");
    const wtt = modMember.comment?.tags?.find(t => t.tag == "tooltip");
    const wloc = modMember.comment?.tags?.find(t => t.tag == "location");
    const wst = modMember.comment?.tags?.find(t => t.tag == "statustext");
    const wprovider = modMember.comment?.tags?.find(t => t.tag == "provider");
    const wnonstandard = modMember.comment?.tags?.find(t => t.tag == "nonstandard");
    const wcontainable = modMember.comment?.tags?.find(t => t.tag == "containableby");
    if (wtag?.text) {
        return {
            name: wtag.text.trim(),
            label: wlabel?.text?.trim(),
            description: wDesc?.text?.trim(),
            imageClass: wimgclass?.text?.trim(),
            tooltip: wtt?.text?.trim(),
            location: wloc?.text?.trim(),
            statusText: wst?.text?.trim(),
            provider: wprovider?.text?.trim(),
            containableby: wcontainable?.text?.trim(),
            nonstandard: wnonstandard != null
        }
    }
    return undefined;
}

function extractWidgetParameterMetadata(member: TsTypeMember): IWidgetParameterMetadata {
    const mType = member.comment?.tags?.find(t => t.tag == "type");
    const mDesc = member.comment?.tags?.find(t => t.tag == "description");
    const mLabel = member.comment?.tags?.find(t => t.tag == "label");
    const mDefault = member.comment?.tags?.find(t => t.tag == "defaultvalue");
    return {
        type: mType?.text?.trim(),
        description: mDesc?.text?.trim(),
        label: mLabel?.text?.trim(),
        defaultValue: mDefault?.text?.trim()
    }
}

//1st pass: collect all members
for (const tsModule of apidef.children) {
    if (tsModule.name.indexOf("fusion-metadata") < 0 || !tsModule.children) {
        continue;
    }
    for (const modMember of tsModule.children) {
        if (modMember.kindString == "Interface" || modMember.kindString == "Class") {
            if (modMember.children) {
                for (const m of modMember.children) {
                    dict_put(allMembers, m.id, m);
                }
            }
        }
    }
}

//2nd pass: Actual processing
for (const tsModule of apidef.children) {
    if (tsModule.name.indexOf("fusion-metadata") < 0 || !tsModule.children) {
        continue;
    }
    for (const modMember of tsModule.children) {
        const wmeta = extractWidgetMetadata(modMember);
        const parameters = [] as string[];
        if (modMember.kindString == "Interface" && modMember.children) {
            for (const member of modMember.children) {
                const pmeta = extractWidgetParameterMetadata(member);
                parameters.push(`<Parameter>
        <Name>${member.name}</Name>
        <Description>${pmeta.description ?? STR_EMPTY}</Description>
        <Type>${pmeta.type ?? "String"}</Type>
        <Label>${pmeta.label ?? STR_EMPTY}</Label>
        <DefaultValue>${pmeta.defaultValue ?? STR_EMPTY}</DefaultValue>
        <IsMandatory>${member.flags?.isOptional ?? false}</IsMandatory>
    </Parameter>`);
            }
        }
        if (wmeta) {
            const widgetName = wmeta.name;
            let xml = `<WidgetInfo>
    <Type>${widgetName}</Type>
    <LocalizedType>${widgetName}</LocalizedType>
    <Provider>${wmeta.provider ?? STR_EMPTY}</Provider>
    <Description>${wmeta.description ?? STR_EMPTY}</Description>
    <Location>${wmeta.location ?? STR_EMPTY}</Location>
    <Label>${wmeta.label ?? STR_EMPTY}</Label>
    <Tooltip>${wmeta.tooltip ?? STR_EMPTY}</Tooltip>
    <StatusText>${wmeta.statusText ?? STR_EMPTY}</StatusText>
    <ImageUrl>images/icons.png</ImageUrl>
    <ImageClass>${wmeta.imageClass ?? STR_EMPTY}</ImageClass>
    <StandardUi>${!wmeta.nonstandard}</StandardUi>
    <ContainableBy>${wmeta.containableby}</ContainableBy>`;
            if (parameters.length > 0) {
                xml += "\n    " + parameters.join("\n    ")
            }
            xml += "\n</WidgetInfo>";
            const outPath = path.resolve(`${widgetInfoDir}/${widgetName.toLowerCase()}.xml`);
            fs.writeFileSync(outPath, xml);
            console.log(`Wrote: ${outPath}`);
        }
    }
}