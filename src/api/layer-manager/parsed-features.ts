import { ProjectionLike } from 'ol/proj';
import olSourceVector from "ol/source/Vector";
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';
import { strIsNullOrEmpty } from '../../utils/string';

/**
 * Defines parsed features
 * 
 * @export
 * @interface IParsedFeatures
 * @since 0.13
 */
export interface IParsedFeatures {
    /**
     * The name of this source
     */
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
     * @since 0.14 This method is now async (returns a promise)
     */
    addTo(source: olSourceVector, mapProjection: ProjectionLike, dataProjection?: ProjectionLike): Promise<void>;
    /**
     * The geometry types encountered in this source file
     * @since 0.14
     */
    geometryTypes: ("Point" | "LineString" | "Polygon")[];
    /**
     * The property names of features in this source file. This is generally based on sampling the first feature.
     * @since 0.14
     */
    propertyNames: string[];
    /**
     * Get all distinct values for the given property name
     * @param propertyName
     * @since 0.14
     */
    getDistinctValues(propertyName: string): Promise<string[]>;
}

export class ParsedFeatures implements IParsedFeatures {
    constructor(public type: string,
        public size: number,
        private features: () => Promise<Feature<Geometry>[]>,
        private hasFeaturesFlag: boolean,
        public geometryTypes: ("Point" | "LineString" | "Polygon")[],
        public propertyNames: string[],
        public projection: string | null = null) { }
    public hasFeatures(): boolean { return this.hasFeaturesFlag; }
    public name: string;
    public async addTo(source: olSourceVector, mapProjection: ProjectionLike, dataProjection?: ProjectionLike) {
        const features = await this.features();
        if (dataProjection) {
            for (const f of features) {
                const g = f.getGeometry();
                if (g) {
                    const tg = g.transform(dataProjection, mapProjection)
                    f.setGeometry(tg);
                }
            }
        }
        source.addFeatures(features);
    }
    public async getDistinctValues(propertyName: string): Promise<string[]> {
        const values = [] as string[];
        const features = await this.features();
        for (const f of features) {
            const v = f.get(propertyName);
            if (!strIsNullOrEmpty(v) && !values.includes(v))
                values.push(v);
        }
        return values;
    }
}