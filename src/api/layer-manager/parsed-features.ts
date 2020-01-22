import { ProjectionLike } from 'ol/proj';
import olSourceVector from "ol/source/Vector";
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';
/**
 *
 * @export
 * @interface IParsedFeatures
 * @since 0.13
 */
export interface IParsedFeatures {
    name: string;
    hasFeatures(): boolean;
    readonly type: string;
    readonly size: number;
    addTo(source: olSourceVector<Geometry>, mapProjection: ProjectionLike, dataProjection?: ProjectionLike): void;
}

export class ParsedFeatures implements IParsedFeatures {
    constructor(public type: string, public size: number, private features: Feature<Geometry>[]) {

    }
    public hasFeatures(): boolean { return this.features.length > 0; }
    public name: string;
    public addTo(source: olSourceVector<Geometry>, mapProjection: ProjectionLike, dataProjection?: ProjectionLike) {
        if (dataProjection) {
            for (const f of this.features) {
                const g = f.getGeometry();
                const tg = g.transform(dataProjection, mapProjection)
                f.setGeometry(tg);
            }
        }
        source.addFeatures(this.features);
    }
}