import BaseLayer from 'ol/layer/Base';
import { IGenericSubjectMapLayerMetadata } from '../../actions/defs';
import { Dictionary } from '../common';

/**
 * A factory method for creating OpenLayers layers from a JSON definition
 * 
 * @since 0.14
 */
export type ExternalLayerCreator = (data: any, meta: IGenericSubjectMapLayerMetadata | undefined, layerOptions: any, appSettings: Dictionary<string>) => BaseLayer;

/**
 * Defines a registry of custom vector layer source drivers
 */
export class ExternalLayerFactoryRegistry {

    private static _instance: ExternalLayerFactoryRegistry = new ExternalLayerFactoryRegistry();

    private _vectorCreators: { [driverName: string]: ExternalLayerCreator } = {};

    constructor() {
        if (ExternalLayerFactoryRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use ExternalLayerFactoryRegistry.getInstance() instead of new.");
        }
        ExternalLayerFactoryRegistry._instance = this;
    }

    /**
     * Gets the registry instance
     * @since 0.14
     */
    public static getInstance(): ExternalLayerFactoryRegistry {
        return ExternalLayerFactoryRegistry._instance;
    }

    /**
     * Registers the given external vector layer factory method
     * 
     * @param driverName 
     * @param creator 
     * @since 0.14
     */
    public registerExternalVectorLayerCreator(driverName: string, creator: ExternalLayerCreator) {
        this._vectorCreators[driverName] = creator;
    }

    /**
     * Gets the external vector layer factory method for the given driver
     * 
     * @param driverName 
     */
    public getExternalVectorLayerCreator(driverName: string): ExternalLayerCreator | undefined {
        return this._vectorCreators[driverName];
    }
}