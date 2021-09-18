export interface FeatureSetClass {
    "@id": string;
    ID: string[];
}

export interface FeatureSetLayer {
    "@id": string;
    /**
     * @since 0.14 Added null as possible type
     */
    "@name": string | null;
    Class: FeatureSetClass;
}
export interface FeatureSet {
    Layer: FeatureSetLayer[];
}

export interface SelectionImage {
    MimeType: string;
    Content: string;
}

export interface FeatureProperty {
    /**
     * The display name of the feature property. Use the layer metadata
     * to get the real property name
     *
     * @type {string}
     */
    Name: string;
    /**
     * The value of the feature property
     *
     * @type {string | null}
     * 
     * @since 0.14 added null as possible type
     */
    Value: string | null
}

export interface SelectedFeature {
    SelectionKey?: string;
    Bounds?: string;
    Property: FeatureProperty[];
}

export interface LayerPropertyMetadata {
    DisplayName: string;
    Name: string;
    Type: number;
}

export interface LayerMetadata {
    Property: LayerPropertyMetadata[];
}

export interface SelectedLayer {
    "@id": string;
    "@name": string;
    Feature: SelectedFeature[];
    LayerMetadata?: LayerMetadata | undefined;
}

export interface SelectedFeatureSet {
    SelectedLayer: SelectedLayer[];
}

export interface QueryMapFeaturesResponse {
    FeatureSet?: FeatureSet | undefined;
    Hyperlink?: string | undefined;
    InlineSelectionImage?: SelectionImage | undefined;
    SelectedFeatures?: SelectedFeatureSet | undefined;
    Tooltip?: string | undefined;
}