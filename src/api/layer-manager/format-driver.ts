import { ParsedFeatures, IParsedFeatures } from './parsed-features';
import TextFeature from 'ol/format/TextFeature';
import JSONFeature from 'ol/format/JSONFeature';
import XMLFeature from 'ol/format/XMLFeature';

export interface IFormatDriver {
    tryParse(size: number, text: string): Promise<IParsedFeatures>;
}

export class FormatDriver implements IFormatDriver {
    constructor(private type: string, private format: TextFeature | JSONFeature | XMLFeature) { }
    public async tryParse(size: number, text: string): Promise<IParsedFeatures> {
        const fs = this.format.readFeatures(text);
        return new ParsedFeatures(this.type, size, fs);
    }
}