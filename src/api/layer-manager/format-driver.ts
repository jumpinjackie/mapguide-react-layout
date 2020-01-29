import { ParsedFeatures, IParsedFeatures } from './parsed-features';
import TextFeature from 'ol/format/TextFeature';
import JSONFeature from 'ol/format/JSONFeature';
import XMLFeature from 'ol/format/XMLFeature';

/**
 * Defines a format driver for reading plain text into vector features
 *
 * @export
 * @interface IFormatDriver
 * @since 0.13
 */
export interface IFormatDriver {
    /**
     * Attempts to read the given text content into vector features. A failure
     * of this driver to parse the features is expressed by returning an object
     * where calling hasFeatures() on it returns false.
     *
     * @param {number} size
     * @param {string} text
     * @returns {Promise<IParsedFeatures>}
     * @memberof IFormatDriver
     */
    tryParse(size: number, text: string): Promise<IParsedFeatures>;
}

/**
 * A default format driver implementation primarily for interfacing with any
 * existing OpenLayers format driver instances
 *
 * @export
 * @class FormatDriver
 * @implements {IFormatDriver}
 * @since 0.13
 */
export class FormatDriver implements IFormatDriver {
    constructor(private type: string, private format: TextFeature | JSONFeature | XMLFeature, private defaultProjection: string | null = null) { }
    public async tryParse(size: number, text: string): Promise<IParsedFeatures> {
        const fs = this.format.readFeatures(text);
        return new ParsedFeatures(this.type, size, fs, this.defaultProjection);
    }
}