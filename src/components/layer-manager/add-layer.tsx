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
import colorbrewer from "colorbrewer";

function getColorBrewerRamps() {
    const ramps = [];
    for (const cat in colorbrewer.schemeGroups) {
        for (const scheme of colorbrewer.schemeGroups[cat]) {
            ramps.push({ name: `${cat} - ${scheme}`, value: scheme });
        }
    }
    return ramps;
}

export function getMaxRamp(scheme: any) {
    let theScheme;
    let len = 0;
    for (const s in scheme) {
        const arr = scheme[s];
        if (arr.length > len) {
            theScheme = arr;
            len = arr.length;
        }
    }
    return theScheme;
}

const ColorBrewerRamp: React.FC<{ theme: string }> = props => {
    const ramp: string[] = getMaxRamp(colorbrewer[props.theme]);
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
    const [isProcessingFile, setIsProcessingFile] = React.useState(false);
    const [isAddingLayer, setIsAddingLayer] = React.useState(false);
    const [addLayerError, setAddLayerError] = React.useState<any>(undefined);
    const [loadedFile, setLoadedFile] = React.useState<LoadedFile | undefined>(undefined);
    const [addLayerName, setAddLayerName] = React.useState<string | undefined>(undefined);
    const [addProjection, setAddProjection] = React.useState(4326);
    const [canCluster, setCanCluster] = React.useState(false);
    const [enableClustering, setEnableClustering] = React.useState(false);
    const [enableTheme, setEnableTheme] = React.useState(false);
    const [themeOnProperty, setThemeOnProperty] = React.useState<string | undefined>(undefined);
    const [themableProperties, setThemableProperties] = React.useState<string[]>([]);
    const [themeToUse, setThemeToUse] = React.useState("Blues");
    const [clusterDistance, setClusterDistance] = React.useState(10);
    const [themableRamps, _] = React.useState(getColorBrewerRamps());
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
            setCanCluster(parsed.geometryTypes.includes("Point"));
            setThemableProperties(parsed.propertyNames);
            if (parsed.propertyNames.length > 0)
                setThemeOnProperty(parsed.propertyNames[0]);
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
                if (enableClustering) {
                    extraOpts = {
                        kind: "Cluster",
                        clusterDistance: clusterDistance
                    };
                } else if (enableTheme && !strIsNullOrEmpty(themeOnProperty)) {
                    extraOpts = {
                        kind: "Theme",
                        themeOnProperty: themeOnProperty,
                        colorBrewerTheme: themeToUse
                    }
                }
                const layer = await layerMgr.addLayerFromParsedFeatures({
                    features: parsedFeaturesRef.current,
                    projection: layerProj,
                    extraOptions: extraOpts
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
    }, [enableClustering, clusterDistance, enableTheme, themeOnProperty, themeToUse]);
    if (loadedFile) {
        const canAdd = !(enableTheme && enableClustering);
        const colorBrewerLabel = <div dangerouslySetInnerHTML={{ __html: tr("COLORBREWER_THEME", locale) }} />;
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
                {themableProperties && <Switch label={tr("GENERATE_THEMABLE_LAYER", locale)} checked={enableTheme} onChange={(e: any) => setEnableTheme(e.target.checked)} />}
                {themableProperties && enableTheme && <>
                    <FormGroup label={tr("THEME_ON_PROPERTY", locale)}>
                        <HTMLSelect value={themeOnProperty} onChange={e => setThemeOnProperty(e.target.value)}>
                            {themableProperties.map((th, i) => <option key={th} value={th}>{th}</option>)}
                        </HTMLSelect>
                    </FormGroup>
                    <FormGroup label={colorBrewerLabel}>
                        <HTMLSelect value={themeToUse} onChange={e => setThemeToUse(e.target.value)}>
                            {themableRamps.map((th, i) => <option key={th.name} value={th.value}>{th.name}</option>)}
                        </HTMLSelect>
                    </FormGroup>
                    {themeToUse && <ColorBrewerRamp theme={themeToUse} />}
                </>}
                {canCluster && <Switch label={tr("ENABLE_CLUSTERING", locale)} checked={enableClustering} onChange={(e: any) => setEnableClustering(e.target.checked)} />}
                {canCluster && enableClustering && <FormGroup label={tr("POINT_CLUSTER_DISTANCE", locale)}>
                    <NumericInput min={1} value={clusterDistance} onValueChange={v => setClusterDistance(v)} />
                </FormGroup>}
                {enableTheme && enableClustering && <Callout intent={Intent.DANGER}>
                    <p>{tr("ERR_CONFLICTING_ADD_VECTOR_LAYER_OPTIONS", locale)}</p>
                </Callout>}
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