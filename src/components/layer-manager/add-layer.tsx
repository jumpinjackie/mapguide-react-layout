import * as React from "react";
import { tr } from "../../api/i18n";
import { GenericEvent, ILayerInfo } from "../../api/common";
import { AddWmsLayer } from "./add-wms-layer";
import { AddWfsLayer } from "./add-wfs-layer";
import Dropzone from "react-dropzone";
import { HTMLSelect, Label, RadioGroup, Radio, NonIdealState, Button, Intent, EditableText, ButtonGroup, FormGroup, Callout } from '@blueprintjs/core';
import * as Runtime from "../../api/runtime";
import { strIsNullOrEmpty } from "../../utils/string";
import proj4 from "proj4";

/**
 * @hidden
 */
export interface IAddLayerProps {
    locale: string;
    onLayerAdded: (layer: ILayerInfo) => void;
}

/**
 * @hidden
 */
export interface IAddLayerState {
    selectedType: string;
}

interface AddLayerConf {
    label: string;
    content: (locale: string, onLayerAdded: (layer: ILayerInfo) => void) => JSX.Element;
}

const ADD_URL_LAYER_TYPES: { [key: string]: AddLayerConf } = {
    "WMS": {
        label: "WMS",
        content: (locale: string, onLayerAdded: (layer: ILayerInfo) => void) => <AddWmsLayer locale={locale} onLayerAdded={onLayerAdded} />
    },
    "WFS": {
        label: "WFS",
        content: (locale: string, onLayerAdded: (layer: ILayerInfo) => void) => <AddWfsLayer locale={locale} onLayerAdded={onLayerAdded} />
    }
};

enum AddLayerKind {
    File,
    Url
}

const AddFileLayer = (props: IAddLayerProps) => {
    const { locale } = props;
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const [addLayerError, setAddLayerError] = React.useState<any>(undefined);
    const [loadedFile, setLoadedFile] = React.useState<File | undefined>(undefined);
    const [addLayerName, setAddLayerName] = React.useState<string | undefined>(undefined);
    const [addProjection, setAddProjection] = React.useState("EPSG:4326");
    const onFileDropped = (file: File) => {
        setLoadedFile(file);
        setAddLayerName(file.name);
    };
    const onCancelAddFile = () => {
        setLoadedFile(undefined);
    };
    const onAddFileLayer = (layerProjection: string) => {
        const viewer = Runtime.getViewer();
        if (loadedFile && viewer) {
            setIsAddingLayer(true);
            setAddLayerError(undefined);
            try {
                const layerName = addLayerName ?? loadedFile.name;
                const layerMgr = viewer.getLayerManager();
                if (layerMgr.hasLayer(layerName)) {
                    throw new Error(tr("LAYER_NAME_EXISTS", locale, { name: layerName }));
                }
                layerMgr.addLayerFromFile({
                    file: loadedFile,
                    name: layerName,
                    locale: props.locale,
                    projection: layerProjection,
                    callback: (res) => {
                        setIsAddingLayer(false);
                        if (res instanceof Error) {
                            viewer.toastError("error", res.message);
                        } else {
                            viewer.toastSuccess("success", tr("ADDED_LAYER", props.locale, { name: res.name }));
                            setAddLayerError(undefined);
                            setLoadedFile(undefined);
                            setAddLayerName(undefined);
                            props.onLayerAdded(res);
                        }
                    }
                });
            } catch (e) {
                setAddLayerError(e);
            }
            setIsAddingLayer(false);
        }
    };
    if (loadedFile) {
        const projections = Object.keys(proj4.defs);
        return <NonIdealState
            title={<EditableText value={addLayerName} onChange={v => setAddLayerName(v)} />}
            icon="upload"
            description={tr("FMT_UPLOADED_FILE", locale, { size: loadedFile.size, type: (strIsNullOrEmpty(loadedFile.type) ? tr("UNKNOWN_FILE_TYPE", locale) : loadedFile.type) })}
            action={<>
                {addLayerError && <Callout intent={Intent.DANGER} title={tr("ADDING_LAYER_ERROR", locale)}>
                    {addLayerError.message}
                </Callout>}
                <FormGroup label={tr("ADD_LAYER_PROJECTION", locale)}>
                    <HTMLSelect value={addProjection} onChange={e => setAddProjection(e.target.value)}>
                        {projections.map(p => <option key={p} value={p}>{p}</option>)}
                    </HTMLSelect>
                </FormGroup>
                <ButtonGroup>
                    <Button loading={isAddingLayer} onClick={(e: any) => onAddFileLayer(addProjection)} intent={Intent.PRIMARY}>{tr("ADD_LAYER", locale)}</Button>
                    <Button loading={isAddingLayer} onClick={(e: any) => onCancelAddFile()} intent={Intent.DANGER}>{tr("CANCEL", locale)}</Button>
                </ButtonGroup>
            </>} />
    } else {
        return <>
            <Dropzone multiple={false} onDrop={acceptedFiles => onFileDropped(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (<div style={{ margin: 10, border: "1px dashed black", borderRadius: 5, padding: 5 }} {...getRootProps()}>
                    <NonIdealState
                        title={tr("ADD_FILE", locale)}
                        icon="upload"
                        description={tr("ADD_FILE_INSTRUCTIONS", locale)}
                        action={<input {...getInputProps()} />} />
                </div>)}
            </Dropzone>
        </>;
    }
}

const AddUrlLayer = (props: IAddLayerProps) => {
    const { locale } = props;
    const [selectedUrlType, setSelectedUrlType] = React.useState<string | undefined>(undefined);
    const onUrlLayerTypeChanged = (e: GenericEvent) => {
        setSelectedUrlType(e.target.value);
    };
    const items = Object.keys(ADD_URL_LAYER_TYPES).map(lt => ({ value: lt, label: ADD_URL_LAYER_TYPES[lt].label }));
    return <div>
        <Label>
            {tr("LAYER_TYPE", locale)}
            <HTMLSelect value={selectedUrlType || ""} onChange={onUrlLayerTypeChanged}>
                <option>{tr("SELECT_LAYER_TYPE", locale)}</option>
                {items.map(it => <option key={it.value} value={it.value}>{it.value}</option>)}
            </HTMLSelect>
        </Label>
        {(() => {
            if (selectedUrlType && ADD_URL_LAYER_TYPES[selectedUrlType]) {
                return ADD_URL_LAYER_TYPES[selectedUrlType].content(locale, props.onLayerAdded);
            }
        })()}
    </div>;
}

/**
 * @hidden
 */
export const AddLayer = (props: IAddLayerProps) => {
    const [addLayerKind, setAddLayerKind] = React.useState<AddLayerKind>(AddLayerKind.File);
    const onAddLayerKindChanged = (e: GenericEvent) => {
        setAddLayerKind(parseInt(e.target.value, 10));
    };
    return <div>
        <RadioGroup
            label={tr("ADD_LAYER_KIND_PROMPT", props.locale)}
            onChange={onAddLayerKindChanged}
            selectedValue={addLayerKind}>
            <Radio label={tr("LAYER_KIND_FILE", props.locale)} value={AddLayerKind.File} />
            <Radio label={tr("LAYER_KIND_URL", props.locale)} value={AddLayerKind.Url} />
        </RadioGroup>
        <hr />
        {(() => {
            switch (addLayerKind) {
                case AddLayerKind.File:
                    return <AddFileLayer {...props} />;
                case AddLayerKind.Url:
                    return <AddUrlLayer {...props} />;
            }
        })()}
    </div>;
}