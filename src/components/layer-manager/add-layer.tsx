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
import { IParsedFeatures } from '../map-viewer-context';

/**
 * @hidden
 */
export interface IAddLayerProps {
    locale: string;
    onLayerAdded: (layer: ILayerInfo) => void;
    onAddLayerBusyWorker: (name: string) => void;
    onRemoveLayerBusyWorker: (name: string) => void;
}

/**
 * @hidden
 */
export interface IAddLayerState {
    selectedType: string;
}

/**
 * @hidden
 */
export interface IAddLayerContentProps {
    locale: string;
    onLayerAdded: (layer: ILayerInfo) => void;
    onAddLayerBusyWorker: (name: string) => void;
    onRemoveLayerBusyWorker: (name: string) => void;
}

interface IAddLayerConf {
    label: string;
    content: (props: IAddLayerContentProps) => JSX.Element;
}

const ADD_URL_LAYER_TYPES: { [key: string]: IAddLayerConf } = {
    "WMS": {
        label: "WMS",
        content: (props: IAddLayerContentProps) => <AddWmsLayer {...props} />
    },
    "WFS": {
        label: "WFS",
        content: (props: IAddLayerContentProps) => <AddWfsLayer {...props} />
    }
};

enum AddLayerKind {
    File,
    Url
}

interface LoadedFile {
    name: string;
    size: number;
    type: string;
}

const AddFileLayer = (props: IAddLayerProps) => {
    const { locale } = props;
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const [addLayerError, setAddLayerError] = React.useState<any>(undefined);
    const [loadedFile, setLoadedFile] = React.useState<LoadedFile | undefined>(undefined);
    const [addLayerName, setAddLayerName] = React.useState<string | undefined>(undefined);
    const [addProjection, setAddProjection] = React.useState("EPSG:4326");
    const parsedFeaturesRef = React.useRef<IParsedFeatures | undefined>(undefined);
    const setParsedFile = (parsed: IParsedFeatures | undefined) => {
        parsedFeaturesRef.current = parsed;
        if (parsed) {
            setAddLayerName(parsed.name);
            setLoadedFile({
                name: parsed.name,
                size: parsed.size,
                type: parsed.type
            });
        } else {
            setLoadedFile(undefined);
            parsedFeaturesRef.current = undefined;
        }
    };
    const onFileDropped = async (file: File) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const layerMgr = viewer.getLayerManager();
            try {
                const parsed = await layerMgr.parseFeaturesFromFile({
                    file: file,
                    name: file.name,
                    locale: locale
                });
                setParsedFile(parsed);
            } catch (e) {
                setAddLayerError(e);
            }
        }
    };
    const onCancelAddFile = () => {
        setParsedFile(undefined);
    };
    const onAddFileLayer = async (layerProjection: string) => {
        const viewer = Runtime.getViewer();
        if (viewer && parsedFeaturesRef?.current) {
            setIsAddingLayer(true);
            setAddLayerError(undefined);
            try {
                const layerName = addLayerName ?? parsedFeaturesRef.current.name;
                const layerMgr = viewer.getLayerManager();
                if (layerMgr.hasLayer(layerName)) {
                    throw new Error(tr("LAYER_NAME_EXISTS", locale, { name: layerName }));
                }
                const layer = await layerMgr.addLayerFromParsedFeatures({
                    features: parsedFeaturesRef.current
                });
                setIsAddingLayer(false);
                viewer.toastSuccess("success", tr("ADDED_LAYER", props.locale, { name: layer.name }));
                setAddLayerError(undefined);
                setLoadedFile(undefined);
                setAddLayerName(undefined);
                props.onLayerAdded(layer);
            } catch (e) {
                setAddLayerError(e);
                if (!strIsNullOrEmpty(e?.message)) {
                    viewer.toastError("error", e.message);
                }
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
                const cprops: IAddLayerContentProps = {
                    locale: locale,
                    onLayerAdded: props.onLayerAdded,
                    onAddLayerBusyWorker: props.onAddLayerBusyWorker,
                    onRemoveLayerBusyWorker: props.onRemoveLayerBusyWorker
                };
                return ADD_URL_LAYER_TYPES[selectedUrlType].content(cprops);
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