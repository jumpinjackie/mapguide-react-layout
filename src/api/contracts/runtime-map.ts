import { ResourceIdentifier, Version, Color, FdoFilter, Base64Content, MimeType } from './common';

export interface FeatureSourceInfo {
    ResourceId: ResourceIdentifier;
    ClassName: string;
    Geometry: string;
}

export enum FeatureStyleType {
    Point = 1,
    Line = 2,
    Area = 3,
    Composite = 4
}

export interface RuleInfo {
    LegendLabel?: string;
    Filter?: FdoFilter;
    Icon?: Base64Content;
}

export interface FeatureStyleInfo {
    Type: FeatureStyleType;
    Rule: RuleInfo[];
}

export interface ScaleRangeInfo {
    MinScale: number;
    MaxScale: number;
    FeatureStyle: FeatureStyleInfo[];
}

export interface MapElement {
    /**
     * The name of this element
     *
     * @type {string}
     */
    Name: string;
    /**
     * The element's legend label
     *
     * @type {string}
     */
    LegendLabel: string;
    /**
     * The element's object id
     *
     * @type {string}
     */
    ObjectId: string;
    /**
     * The element's parent id
     *
     * @type {string}
     */
    ParentId?: string | undefined;
    /**
     * Indicates whether this element should be displayed in the legend
     *
     * @type {boolean}
     */
    DisplayInLegend: boolean;
    /**
     * Indicates whether this element should be initially expanded in the legend
     *
     * @type {boolean}
     */
    ExpandInLegend: boolean;
    /**
     * Indicates whether this element is potentially visible. Note that this may be true even though the element is not visible. This will occur if one of the groups this element is organized within is not visible.
     *
     * @type {boolean}
     */
    Visible: boolean;
    /**
     * Indicates the actual visibility of the element. The visibility depends on the visible property of the element, and the visible property of each group this element is organized within.
     *
     * @type {boolean}
     */
    ActuallyVisible: boolean;
}

export enum LayerType {
    Dynamic = 1,
    BaseMap = 2
}

export enum GroupType {
    Normal = 1,
    BaseMap = 2,
    BaseMapFromTileSet = 3
}

export interface MapLayer extends MapElement {
    Type: LayerType;
    /**
     * Gets whether this layer is selectable
     *
     * @type {boolean}
     */
    Selectable: boolean;
    LayerDefinition: ResourceIdentifier;
    FeatureSource?: FeatureSourceInfo | undefined;
    ScaleRange?: ScaleRangeInfo[] | undefined;
}

/**
 * Describes a group of Runtime Map Layers
 *
 * @export
 * @interface MapGroup
 * @extends {MapElement}
 */
export interface MapGroup extends MapElement {
    /**
     * The type of this group. Can be tiled or dynamic
     *
     * @type {GroupType}
     */
    Type: GroupType;
}

export interface EnvCoordinate {
    X: number;
    Y: number;
}

export interface Envelope {
    LowerLeftCoordinate: EnvCoordinate;
    UpperRightCoordinate: EnvCoordinate;
}

/**
 * Describes the coordinate system of the runtime map
 *
 * @export
 * @interface CoordinateSystemType
 */
export interface CoordinateSystemType {
    /**
     * The WKT string of the coordinate system
     *
     * @type {string}
     */
    Wkt: string;
    /**
     * The CS-Map code of the coordinate system
     *
     * @type {string}
     */
    MentorCode: string;
    /**
     * The EPSG code of the coordinate system
     *
     * @type {string}
     */
    EpsgCode: string;
    /**
     * The meters-per-unit value of the coordinate system
     *
     * @type {number}
     */
    MetersPerUnit: number;
}

export interface RuntimeMap {
    /**
     * The MapGuide Site Version
     *
     * @type {Version}
     */
    SiteVersion: Version;
    /**
     * The name of the runtime map. This is the value required for any mapagent operation that require a MAPNAME parameter
     *
     * @type {string}
     */
    Name: string;
    /**
     * The session id
     *
     * @type {string}
     */
    SessionId: string;
    /**
     * The resource id of the Map Definition from which this runtime map was created from
     *
     * @type {ResourceIdentifier}
     */
    MapDefinition: ResourceIdentifier;
    /**
     * The resource id of the Tile Set Definition that this Map Definition is linked from. If this Map Definition does not link to a tile set, this element is omitted
     *
     * @type {ResourceIdentifier}
     */
    TileSetDefinition?: ResourceIdentifier | undefined;
    /**
     * The tile width as defined by the settings in the Tile Set Definition. If this Map Definition does not link to a tile set, this element is omitted
     *
     * @type {number}
     */
    TileWidth?: number | undefined;
    /**
     * The tile height as defined by the settings in the Tile Set Definition. If this Map Definition does not link to a tile set, this element is omitted
     *
     * @type {number}
     */
    TileHeight?: number | undefined;
    /**
     * The map's background color in ARGB hex string format
     *
     * @type {Color}
     */
    BackgroundColor: Color;
    /**
     * The number of dots per inch of the map display
     *
     * @type {number}
     */
    DisplayDpi: number;
    /**
     * The mime type of all inline icons
     *
     * @type {MimeType}
     */
    IconMimeType?: MimeType | undefined;
    CoordinateSystem: CoordinateSystemType;
    Extents: Envelope;
    Group?: MapGroup[] | undefined;
    Layer?: MapLayer[] | undefined;
    FiniteDisplayScale?: number[] | undefined;
}