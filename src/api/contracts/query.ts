export interface FeatureSetClass {
    "@id": string;
    ID: string[];
}

export interface FeatureSetLayer {
    "@id": string;
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
     * @type {string}
     */
    Value: string;
}

export interface SelectedFeature {
    Bounds: string;
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
    LayerMetadata?: LayerMetadata | null | undefined;
}

export interface SelectedFeatureSet {
    SelectedLayer: SelectedLayer[];
}

export interface QueryMapFeaturesResponse {
    FeatureSet?: FeatureSet | null | undefined;
    Hyperlink?: string | null | undefined;
    InlineSelectionImage?: SelectionImage | null | undefined;
    SelectedFeatures?: SelectedFeatureSet | null | undefined;
    Tooltip?: string | null | undefined;
}