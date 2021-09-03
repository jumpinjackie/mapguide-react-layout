import * as React from "react";
import { tr } from "../../api/i18n";
import { GenericEvent, ILayerInfo } from "../../api/common";
import { AddWmsLayer } from "./add-wms-layer";
import { AddWfsLayer } from "./add-wfs-layer";
import { HTMLSelect, Label, RadioGroup, Radio, NonIdealState, Button, Intent, EditableText, ButtonGroup, FormGroup, Callout, NumericInput, FileInput, Switch } from '@blueprintjs/core';
import { strIsNullOrEmpty } from "../../utils/string";
import proj4 from "proj4";
import { ensureProjection } from '../../api/registry/projections';
import { IParsedFeatures } from '../../api/layer-manager/parsed-features';
import { parseEpsgCodeFromCRS } from './wfs-capabilities-panel';
import { getViewer } from '../../api/runtime';

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
    defaultProjection: string | null;
}

const AddFileLayer = (props: IAddLayerProps) => {
    const { locale } = props;
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const [addLayerError, setAddLayerError] = React.useState<any>(undefined);
    const [loadedFile, setLoadedFile] = React.useState<LoadedFile | undefined>(undefined);
    const [addLayerName, setAddLayerName] = React.useState<string | undefined>(undefined);
    const [addProjection, setAddProjection] = React.useState(4326);
    const [enableClustering, setEnableClustering] = React.useState(false);
    const [clusterDistance, setClusterDistance] = React.useState(10);
    const parsedFeaturesRef = React.useRef<IParsedFeatures | undefined>(undefined);
    const setParsedFile = (parsed: IParsedFeatures | undefined) => {
        parsedFeaturesRef.current = parsed;
        if (parsed) {
            setAddLayerName(parsed.name);
            setLoadedFile({
                name: parsed.name,
                size: parsed.size,
                type: parsed.type,
                defaultProjection: parsed.projection
            });
            if (parsed.projection) {
                const epsg = parseEpsgCodeFromCRS(parsed.projection);
                if (epsg) {
                    setAddProjection(epsg);
                }
            }
        } else {
            setLoadedFile(undefined);
            parsedFeaturesRef.current = undefined;
        }
    };
    const onFileDropped = async (file: File) => {
        const viewer = getViewer();
        if (viewer) {
            setAddLayerError(undefined);
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
    const onAddFileLayer = React.useCallback(async (layerProjection: number) => {
        const viewer = getViewer();
        if (viewer && parsedFeaturesRef?.current) {
            setIsAddingLayer(true);
            setAddLayerError(undefined);
            try {
                const [_, layerProj] = await ensureProjection(layerProjection, locale);
                if (!strIsNullOrEmpty(addLayerName)) {
                    parsedFeaturesRef.current.name = addLayerName;
                }
                const layerMgr = viewer.getLayerManager();
                if (layerMgr.hasLayer(parsedFeaturesRef.current.name)) {
                    throw new Error(tr("LAYER_NAME_EXISTS", locale, { name: parsedFeaturesRef.current.name }));
                }
                let clusterDist;
                if (enableClustering) {
                    clusterDist = clusterDistance;
                }
                const layer = await layerMgr.addLayerFromParsedFeatures({
                    features: parsedFeaturesRef.current,
                    projection: layerProj,
                    clusterDistance: clusterDist
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
    }, [enableClustering, clusterDistance]);
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
                    {loadedFile.defaultProjection ? <strong>EPSG:{addProjection}</strong> : <FormGroup label={<a href="https://epsg.io" target="_blank">EPSG:</a>} inline>
                        <NumericInput style={{ width: 60 }} min={0} value={addProjection} onValueChange={v => setAddProjection(v)} />
                    </FormGroup>}
                </FormGroup>
                <Switch checked={enableClustering} min={1} onChange={(e: any) => setEnableClustering(e.target.checked)} label={tr("ENABLE_CLUSTERING", locale)} />
                {enableClustering && <FormGroup label={tr("POINT_CLUSTER_DISTANCE", locale)}>
                    <NumericInput min={1} value={clusterDistance} onValueChange={v => setClusterDistance(v)} />
                </FormGroup>}
                <ButtonGroup>
                    <Button loading={isAddingLayer} onClick={(e: any) => onAddFileLayer(addProjection)} intent={Intent.PRIMARY}>{tr("ADD_LAYER", locale)}</Button>
                    <Button loading={isAddingLayer} onClick={(e: any) => onCancelAddFile()} intent={Intent.DANGER}>{tr("CANCEL", locale)}</Button>
                </ButtonGroup>
            </>} />
    } else {
        return <>
            {addLayerError && <Callout intent={Intent.DANGER} title={tr("ADDING_LAYER_ERROR", locale)}>
                {addLayerError.message}
            </Callout>}
            <NonIdealState
                title={tr("ADD_FILE", locale)}
                icon="upload"
                description={tr("ADD_FILE_INSTRUCTIONS", locale)}
                action={<FileInput fill text={tr("CHOOSE_FILE", locale)} buttonText={tr("BROWSE", locale)} onInputChange={(e: any) => e.target.files && onFileDropped(e.target.files[0])} />} />
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