import * as React from "react";
import { tr } from "../../api/i18n";
import { AddVectorLayerExtraOptions, GenericEvent, ILayerInfo } from "../../api/common";
import { AddWmsLayer } from "./add-wms-layer";
import { AddWfsLayer } from "./add-wfs-layer";
import { EditableText, ButtonGroup, FormGroup, FileInput } from '@blueprintjs/core';
import { strIsNullOrEmpty } from "../../utils/string";
import { ensureProjection } from '../../api/registry/projections';
import { IParsedFeatures } from '../../api/layer-manager/parsed-features';
import { parseEpsgCodeFromCRS } from './wfs-capabilities-panel';
import { getViewer } from '../../api/runtime';
import { zoomToLayerExtents } from "../../containers/add-manage-layers";
import { getColorBrewerRamps, ColorBrewerSwatch } from "./color-brewer";
import { ClusterClickAction } from "../../api/ol-style-contracts";
import { assertNever } from "../../utils/never";
import DOMPurify from "dompurify";
import { TypedSelect, useElementContext } from "../elements/element-context";

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
    const { Button, Callout, NumericInput, NonIdealState, Spinner, Switch, Select } = useElementContext();
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
                <Select value={labelOnProperty}
                    onChange={s => setLabelOnProperty(s)}
                    items={themableProperties.map(th => ({ label: th, value: th }))} />
            </FormGroup>}
        </>;

        const colorBrewerLabel = <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr("COLORBREWER_THEME", locale)) }} />;
        const themeEl = <>
            <FormGroup label={tr("THEME_ON_PROPERTY", locale)}>
                <Select value={themeOnProperty}
                    onChange={s => setThemeOnProperty(s)}
                    items={themableProperties.map(th => ({ label: th, value: th }))} />
            </FormGroup>
            <FormGroup label={colorBrewerLabel}>
                <Select value={themeToUse}
                    onChange={s => setThemeToUse(s!)}
                    items={themableRamps.map(th => ({ label: th.displayName, value: th.scheme }))} />
            </FormGroup>
            {themeToUse && <ColorBrewerSwatch theme={themeToUse} />}
        </>;
        const clusterActions = [
            { value: ClusterClickAction.ShowPopup, label: tr("CLUSTER_CLICK_ACTION_SHOW_POPUP", locale) },
            { value: ClusterClickAction.ZoomToClusterExtents, label: tr("CLUSTER_CLICK_ACTION_ZOOM_EXTENTS", locale) }
        ];
        const clusterEl = <>
            <FormGroup label={tr("POINT_CLUSTER_DISTANCE", locale)}>
                <NumericInput min={1} value={clusterDistance} onChange={v => setClusterDistance(v)} />
            </FormGroup>
            <FormGroup label={tr("CLUSTER_CLICK_ACTION", locale)}>
                <TypedSelect<ClusterClickAction, false>
                    value={clusterClickAction}
                    onChange={e => setClusterClickAction(e)}
                    items={clusterActions} />
            </FormGroup>
        </>;
        return <NonIdealState
            title={<EditableText value={addLayerName} onChange={v => setAddLayerName(v)} />}
            icon="upload"
            description={tr("FMT_UPLOADED_FILE", locale, { size: loadedFile.size, type: (strIsNullOrEmpty(loadedFile.type) ? tr("UNKNOWN_FILE_TYPE", locale) : loadedFile.type) })}
            action={<>
                {addLayerError && <Callout variant="danger" title={tr("ADDING_LAYER_ERROR", locale)}>
                    {addLayerError.message}
                </Callout>}
                <FormGroup label={tr("ADD_LAYER_PROJECTION", locale)}>
                    {loadedFile.defaultProjection ? <strong>EPSG:{addProjection}</strong> : <FormGroup label={<a href="https://spatialreference.org/" target="_blank">EPSG:</a>} inline>
                        <NumericInput style={{ width: 60 }} min={0} value={addProjection} onChange={v => setAddProjection(v)} />
                    </FormGroup>}
                </FormGroup>
                <FormGroup label={tr("CREATE_LAYER_AS", locale)}>
                    <Select value={createLayerAs}
                        onChange={e => setCreateLayerAs(e as CreateVectorLayerAs)}
                        items={createOptions} />
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
                    <Button disabled={!canAdd} loading={isAddingLayer} onClick={(e: any) => onAddFileLayer(addProjection)} variant="primary">{tr("ADD_LAYER", locale)}</Button>
                    <Button loading={isAddingLayer} onClick={(e: any) => onCancelAddFile()} variant="danger">{tr("CANCEL", locale)}</Button>
                </ButtonGroup>
            </>} />
    } else if (isProcessingFile) {
        return <NonIdealState
            icon={<Spinner sizePreset="large" />}
            title={tr("ADD_FILE_PROCESSING", locale)} />
    } else {
        return <>
            {addLayerError && <Callout variant="danger" title={tr("ADDING_LAYER_ERROR", locale)}>
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
    const { Select } = useElementContext();
    const [selectedUrlType, setSelectedUrlType] = React.useState<string | undefined>(undefined);
    const items = Object.keys(ADD_URL_LAYER_TYPES).map(lt => ({ value: lt, label: ADD_URL_LAYER_TYPES[lt].label }));
    return <div>
        <div style={{ marginBottom: 16 }}>
            <p>{tr("LAYER_TYPE", locale)}</p>
            <Select fill value={selectedUrlType || ""}
                onChange={e => setSelectedUrlType(e)}
                items={items.map(i => ({ value: i.value, label: i.value }))} />
        </div>
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
    const { Radio } = useElementContext();
    const [addLayerKind, setAddLayerKind] = React.useState<AddLayerKind>(AddLayerKind.File);
    const onAddLayerKindChanged = (e: GenericEvent) => {
        setAddLayerKind(parseInt(e.target.value, 10));
    };
    return <div>
        <p>{tr("ADD_LAYER_KIND_PROMPT", props.locale)}</p>
        <Radio label={tr("LAYER_KIND_FILE", props.locale)} checked={addLayerKind == AddLayerKind.File} value={AddLayerKind.File} onChange={onAddLayerKindChanged} />
        <Radio label={tr("LAYER_KIND_URL", props.locale)} checked={addLayerKind == AddLayerKind.Url} value={AddLayerKind.Url} onChange={onAddLayerKindChanged} />
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