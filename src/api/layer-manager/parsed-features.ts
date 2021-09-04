import { ProjectionLike } from 'ol/proj';
import olSourceVector from "ol/source/Vector";
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';

/**
 * Defines parsed features
 * 
 * @export
 * @interface IParsedFeatures
 * @since 0.13
 */
export interface IParsedFeatures {
    name: string;
    /**
     * Indicates if there are any features. If false, it signals that the parsing attempt failed
     */
    hasFeatures(): boolean;
    /**
     * The projection of this feature. If not set, the projection is unknown and the user should specify
     * the projection for these features. If set, it should be the projection used when adding the features
     * to a vector layer
     */
    projection: string | null;
    /**
     * The type of the source file
     */
    readonly type: string;
    /**
     * The size of the source file
     */
    readonly size: number;
    /**
     * Adds the parsed features from this file to the given vector data source
     * @param source 
     * @param mapProjection 
     * @param dataProjection 
     */
    addTo(source: olSourceVector<Geometry>, mapProjection: ProjectionLike, dataProjection?: ProjectionLike): void;
    /**
     * The geometry types encountered in this source file
     * @since 0.14
     */
    geometryTypes: ("Point" | "LineString" | "Polygon")[];
}

export class ParsedFeatures implements IParsedFeatures {
    constructor(public type: string, public size: number, private features: Feature<Geometry>[], public geometryTypes: ("Point" | "LineString" | "Polygon")[], public projection: string | null = null) {

    }
    public hasFeatures(): boolean { return this.features.length > 0; }
    public name: string;
    public addTo(source: olSourceVector<Geometry>, mapProjection: ProjectionLike, dataProjection?: ProjectionLike) {
        if (dataProjection) {
            for (const f of this.features) {
                const g = f.getGeometry();
                if (g) {
                    const tg = g.transform(dataProjection, mapProjection)
                    f.setGeometry(tg);
                }
            }
        }
        source.addFeatures(this.features);
    }
}