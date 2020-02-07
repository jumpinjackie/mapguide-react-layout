import { TsApiDefinition, TsTypeMember, dict_put, TsModuleMember, dict_has_key, dict_get } from "./typedoc-api";
import { Dictionary } from 'api';

const fs = require('fs');
const path = require("path");
const apidef: TsApiDefinition = require('../docs_output/latest/api.json');

interface IAllowedValue {
    name: string;
    value: string;
}

interface IContainerMetadata {
    type: string;
    localizedType: string;
    description: string;
    previewImageUrl: string;
}

interface ITemplatePanelMetadata {
    name: string;
    label: string;
    description: string;
}

interface ITemplateMetadata {
    name: string;
    locationUrl: string;
    description: string;
    previewImageUrl: string;
    panels: ITemplatePanelMetadata[];
}

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
    parameters: IWidgetParameterMetadata[];
}

interface IWidgetParameterMetadata {
    name: string;
    mandatory: boolean;
    type?: string;
    label?: string;
    description?: string;
    defaultValue?: string;
    min?: number;
    max?: number;
    allowedValues?: IAllowedValue[];
}

interface IDesignerMetadata {
    containers: IContainerMetadata[];
    widgets: IWidgetMetadata[];
    templates: ITemplateMetadata[];
}

const STR_EMPTY = "";

const designerMetaPath = path.resolve(__dirname, `../docs_output/designer-meta.json`);
const widgetInfoDir = path.resolve(__dirname, `../docs_output/widgetinfo`);
if (!fs.existsSync(widgetInfoDir)) {
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
            label: wlabel?.text?.trim() ?? STR_EMPTY,
            description: wDesc?.text?.trim() ?? STR_EMPTY,
            imageClass: wimgclass?.text?.trim() ?? STR_EMPTY,
            tooltip: wtt?.text?.trim() ?? STR_EMPTY,
            location: wloc?.text?.trim() ?? STR_EMPTY,
            statusText: wst?.text?.trim() ?? STR_EMPTY,
            provider: wprovider?.text?.trim() ?? STR_EMPTY,
            containableby: wcontainable?.text?.trim() ?? STR_EMPTY,
            nonstandard: wnonstandard != null,
            parameters: []
        }
    }
    return undefined;
}

function strShedSkin(s: string, left: string, right: string) {
    if (s.startsWith(left) && s.endsWith(right)) {
        const inner = s.substring(left.length, s.length - right.length);
        return inner;
    }
    return undefined;
}

function extractWidgetParameterMetadata(member: TsTypeMember): IWidgetParameterMetadata {
    const mType = member.comment?.tags?.find(t => t.tag == "type");
    const mDesc = member.comment?.tags?.find(t => t.tag == "description");
    const mLabel = member.comment?.tags?.find(t => t.tag == "label");
    const mDefault = member.comment?.tags?.find(t => t.tag == "defaultvalue");
    const mMin = member.comment?.tags?.find(t => t.tag == "min");
    const mMax = member.comment?.tags?.find(t => t.tag == "max");
    const mAllowedValues = member.comment?.tags?.find(t => t.tag == "allowedvalues");
    let min: number | undefined;
    let max: number | undefined;
    let allowedValues: IAllowedValue[] | undefined;
    if (mMin?.text) {
        min = parseInt(mMin.text?.trim(), 10);
    }
    if (mMax?.text) {
        max = parseInt(mMax.text?.trim(), 10);
    }
    if (mAllowedValues?.text) {
        const s = mAllowedValues.text.trim();
        const inner = strShedSkin(s, "[", "]");
        if (inner) {
            allowedValues = inner.split(',').map(spair => {
                const pinner = strShedSkin(spair, "{", "}");
                if (pinner) {
                    const tokens = pinner.split('|');
                    if (tokens.length == 2) {
                        return {
                            value: tokens[0],
                            name: tokens[1]
                        } as IAllowedValue;
                    }
                }
                return undefined;
            }).filter(item => item != null) as IAllowedValue[];
        }
    }
    return {
        name: member.name,
        mandatory: member.flags?.isOptional ?? false,
        type: mType?.text?.trim() ?? "String",
        description: mDesc?.text?.trim() ?? STR_EMPTY,
        label: mLabel?.text?.trim() ?? STR_EMPTY,
        defaultValue: mDefault?.text?.trim() ?? STR_EMPTY,
        min,
        max,
        allowedValues
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

const designer: IDesignerMetadata = {
    containers: [],
    widgets: [],
    templates: []
};

//2nd pass: Actual processing
for (const tsModule of apidef.children) {
    if (tsModule.name.indexOf("fusion-metadata") < 0 || !tsModule.children) {
        continue;
    }
    for (const modMember of tsModule.children) {
        const wmeta = extractWidgetMetadata(modMember);
        const parameters = [] as string[];
        if (wmeta && modMember.kindString == "Interface" && modMember.children) {
            for (const member of modMember.children) {
                const pmeta = extractWidgetParameterMetadata(member);
                wmeta.parameters.push(pmeta);
            }
            designer.widgets.push(wmeta);
        }
    }
}

//Final pass: output
for (const widget of designer.widgets) {
    let xml = `<WidgetInfo>
    <Type>${widget.name}</Type>
    <LocalizedType>${widget.name}</LocalizedType>
    <Provider>${widget.provider}</Provider>
    <Description>${widget.description}</Description>
    <Location>${widget.location}</Location>
    <Label>${widget.label}</Label>
    <Tooltip>${widget.tooltip}</Tooltip>
    <StatusText>${widget.statusText}</StatusText>
    <ImageUrl>images/icons.png</ImageUrl>
    <ImageClass>${widget.imageClass}</ImageClass>
    <StandardUi>${!widget.nonstandard}</StandardUi>
    <ContainableBy>${widget.containableby}</ContainableBy>`;
    if (widget.parameters.length > 0) {
        for (const pmeta of widget.parameters) {
            xml += `\n    <Parameter>
        <Name>${pmeta.name}</Name>
        <Description>${pmeta.description}</Description>
        <Type>${pmeta.type ?? "String"}</Type>
        <Label>${pmeta.label}</Label>`;
            if (pmeta.allowedValues) {
                for (const av of pmeta.allowedValues) {
                    xml += `\n        <AllowedValue>
            <Name>${av.value}</Name>
            <Label>${av.name}</Label>
        </AllowedValue>`;
                }
            }
            xml += `\n        <DefaultValue>${pmeta.defaultValue}</DefaultValue>`;
            if (pmeta.min != null) {
                xml += `\n        <Min>${pmeta.min}</Min>`;
            }
            if (pmeta.max != null) {
                xml += `\n        <Min>${pmeta.max}</Min>`;
            }
            xml += `\n        <IsMandatory>${pmeta.mandatory}</IsMandatory>`;
            xml += "\n    </Parameter>";
        }
    }
    xml += "\n</WidgetInfo>";
    const outPath = path.resolve(`${widgetInfoDir}/${widget.name.toLowerCase()}.xml`);
    fs.writeFileSync(outPath, xml);
    console.log(`Wrote: ${outPath}`);
}

fs.writeFileSync(designerMetaPath, JSON.stringify(designer, null, 4));
console.log(`Wrote: ${designerMetaPath}`);