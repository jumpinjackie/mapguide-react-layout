import * as React from "react";
import { tr } from "../../api/i18n";
import { AddVectorLayerExtraOptions, GenericEvent, ILayerInfo } from "../../api/common";
import { AddWmsLayer } from "./add-wms-layer";
import { AddWfsLayer } from "./add-wfs-layer";
import { HTMLSelect, Label, RadioGroup, Radio, NonIdealState, Button, Intent, EditableText, ButtonGroup, FormGroup, Callout, NumericInput, FileInput, Switch, Spinner, SpinnerSize } from '@blueprintjs/core';
import { strIsNullOrEmpty } from "../../utils/string";
import { ensureProjection } from '../../api/registry/projections';
import { IParsedFeatures } from '../../api/layer-manager/parsed-features';
import { parseEpsgCodeFromCRS } from './wfs-capabilities-panel';
import { getViewer } from '../../api/runtime';
import { zoomToLayerExtents } from "../../containers/add-manage-layers";
import { getColorBrewerRamps, ColorBrewerSwatch } from "./color-brewer";
import { ClusterClickAction } from "../../api/ol-style-contracts";
import { assertNever } from "../../utils/never";

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

enum CreateVectorLayerAs {
    Vector = "Vector",
    Themed = "Themed",
    Clustered = "Clustered",
    Heatmap = "Heatmap"
}

type GeomTypeList = IParsedFeatures["geometryTypes"];

function getCreateVectorLayerOptions(geomTypes: GeomTypeList, locale: string) {
    const options: { value: CreateVectorLayerAs, label: string, isValid: (geomTypes: GeomTypeList) => boolean }[] = [
        { value: CreateVectorLayerAs.Vector, label: tr("CREATE_VECTOR_LAYER", locale), isValid: (geomTypes) => true },
        { value: CreateVectorLayerAs.Themed, label: tr("CREATE_VECTOR_THEMED", locale), isValid: (geomTypes) => true },
        { value: CreateVectorLayerAs.Clustered, label: tr("CREATE_VECTOR_CLUSTERED", locale), isValid: (geomTypes) => geomTypes.length == 1 && geomTypes.includes("Point") },
        { value: CreateVectorLayerAs.Heatmap, label: tr("CREATE_VECTOR_HEATMAP", locale), isValid: (geomTypes) => geomTypes.length == 1 && geomTypes.includes("Point") }
    ];
    return options.filter(o => o.isValid(geomTypes));
}

const AddFileLayer = (props: IAddLayerProps) => {
    const { locale } = props;
    const [isProcessingFile, setIsProcessingFile] = React.useState(false);
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const [addLayerError, setAddLayerError] = React.useState<any>(undefined);
    const [loadedFile, setLoadedFile] = React.useState<LoadedFile | undefined>(undefined);
    const [addLayerName, setAddLayerName] = React.useState<string | undefined>(undefined);
    const [addProjection, setAddProjection] = React.useState(4326);
    const [createOptions, setCreateOptions] = React.useState(getCreateVectorLayerOptions([], locale));
    const [enableLabels, setEnableLabels] = React.useState(false);
    const [labelOnProperty, setLabelOnProperty] = React.useState<string | undefined>(undefined);
    const [themeOnProperty, setThemeOnProperty] = React.useState<string | undefined>(undefined);
    const [themableProperties, setThemableProperties] = React.useState<string[]>([]);
    const [themeToUse, setThemeToUse] = React.useState("Blues");
    const [createLayerAs, setCreateLayerAs] = React.useState<CreateVectorLayerAs>(CreateVectorLayerAs.Vector);
    const [clusterDistance, setClusterDistance] = React.useState(10);
    const [themableRamps, _] = React.useState(getColorBrewerRamps());
    const [clusterClickAction, setClusterClickAction] = React.useState(ClusterClickAction.ShowPopup);
    const parsedFeaturesRef = React.useRef<IParsedFeatures | undefined>(undefined);
    const setParsedFile = (parsed: IParsedFeatures | undefined) => {
        setEnableLabels(false);
        setCreateOptions(getCreateVectorLayerOptions([], locale));
        parsedFeaturesRef.current = parsed;
        if (parsed) {
            setAddLayerName(parsed.name);
            setLoadedFile({
                name: parsed.name,
                size: parsed.size,
                type: parsed.type,
                defaultProjection: parsed.projection
            });
            setCreateOptions(getCreateVectorLayerOptions(parsed.geometryTypes, locale));
            setThemableProperties(parsed.propertyNames);
            if (parsed.propertyNames.length > 0) {
                setThemeOnProperty(parsed.propertyNames[0]);
                setLabelOnProperty(parsed.propertyNames[0]);
            }
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
            setIsProcessingFile(true);
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
            setIsProcessingFile(false);
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
                let extraOpts: AddVectorLayerExtraOptions | undefined;
                switch (createLayerAs) {
                    case CreateVectorLayerAs.Clustered:
                        extraOpts = {
                            kind: "Cluster",
                            clusterDistance: clusterDistance,
                            onClusterClickAction: clusterClickAction
                        };
                        break;
                    case CreateVectorLayerAs.Themed:
                        extraOpts = {
                            kind: "Theme",
                            themeOnProperty: themeOnProperty!,
                            colorBrewerTheme: themeToUse
                        };
                        break;
                    case CreateVectorLayerAs.Heatmap:
                        extraOpts = {
                            kind: "Heatmap"
                        };
                        break;
                }
                let labelProp;
                if (enableLabels) {
                    labelProp = labelOnProperty;
                }
                const layer = await layerMgr.addLayerFromParsedFeatures({
                    features: parsedFeaturesRef.current,
                    projection: layerProj,
                    extraOptions: extraOpts,
                    labelOnProperty: labelProp
                });
                zoomToLayerExtents(layer.name, viewer);
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
    }, [clusterDistance, createLayerAs, themeOnProperty, themeToUse, enableLabels, labelOnProperty, clusterClickAction]);
    if (loadedFile) {
        let canAdd = true;
        if (createLayerAs == CreateVectorLayerAs.Themed) {
            if (strIsNullOrEmpty(themeOnProperty)) {
                canAdd = false;
            }
        }
        const labelEl = <>
            <Switch label={tr("ENABLE_LABELS", locale)} checked={enableLabels} onChange={(e: any) => setEnableLabels(e.target.checked)} />
            {enableLabels && <FormGroup label={tr("LABEL_USING_PROPERTY", locale)}>
                <HTMLSelect value={labelOnProperty} onChange={e => setLabelOnProperty(e.target.value)}>
                    {themableProperties.map((th, i) => <option key={th} value={th}>{th}</option>)}
                </HTMLSelect>
            </FormGroup>}
        </>;

        const colorBrewerLabel = <div dangerouslySetInnerHTML={{ __html: tr("COLORBREWER_THEME", locale) }} />;
        const themeEl = <>
            <FormGroup label={tr("THEME_ON_PROPERTY", locale)}>
                <HTMLSelect value={themeOnProperty} onChange={e => setThemeOnProperty(e.target.value)}>
                    {themableProperties.map((th, i) => <option key={th} value={th}>{th}</option>)}
                </HTMLSelect>
            </FormGroup>
            <FormGroup label={colorBrewerLabel}>
                <HTMLSelect value={themeToUse} onChange={e => setThemeToUse(e.target.value)}>
                    {themableRamps.map((th, i) => <option key={th.displayName} value={th.scheme}>{th.displayName}</option>)}
                </HTMLSelect>
            </FormGroup>
            {themeToUse && <ColorBrewerSwatch theme={themeToUse} />}
        </>;

        const clusterEl = <>
            <FormGroup label={tr("POINT_CLUSTER_DISTANCE", locale)}>
                <NumericInput min={1} value={clusterDistance} onValueChange={v => setClusterDistance(v)} />
            </FormGroup>
            <FormGroup label={tr("CLUSTER_CLICK_ACTION", locale)}>
                <HTMLSelect value={clusterClickAction} onChange={(e: any) => setClusterClickAction(e.target.value)}>
                    <option value={ClusterClickAction.ShowPopup}>{tr("CLUSTER_CLICK_ACTION_SHOW_POPUP", locale)}</option>
                    <option value={ClusterClickAction.ZoomToClusterExtents}>{tr("CLUSTER_CLICK_ACTION_ZOOM_EXTENTS", locale)}</option>
                </HTMLSelect>
            </FormGroup>
        </>;
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
                <FormGroup label="Create Layer As">
                    <HTMLSelect value={createLayerAs} onChange={e => setCreateLayerAs(e.target.value as CreateVectorLayerAs)}>
                        {createOptions.map((kind, i) => <option key={kind.value} value={kind.value}>{kind.label}</option>)}
                    </HTMLSelect>
                </FormGroup>
                {(() => {
                    switch (createLayerAs) {
                        case CreateVectorLayerAs.Vector:
                            return <>{labelEl}</>;
                        case CreateVectorLayerAs.Themed:
                            return <>{labelEl}{themeEl}</>;
                        case CreateVectorLayerAs.Clustered:
                            return <>{labelEl}{clusterEl}</>;
                        case CreateVectorLayerAs.Heatmap:
                            return <></>;
                        default:
                            assertNever(createLayerAs);
                    }
                })()}
                <ButtonGroup>
                    <Button disabled={!canAdd} loading={isAddingLayer} onClick={(e: any) => onAddFileLayer(addProjection)} intent={Intent.PRIMARY}>{tr("ADD_LAYER", locale)}</Button>
                    <Button loading={isAddingLayer} onClick={(e: any) => onCancelAddFile()} intent={Intent.DANGER}>{tr("CANCEL", locale)}</Button>
                </ButtonGroup>
            </>} />
    } else if (isProcessingFile) {
        return <NonIdealState
            icon={<Spinner intent={Intent.NONE} size={SpinnerSize.LARGE} />}
            title={tr("ADD_FILE_PROCESSING", locale)} />
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