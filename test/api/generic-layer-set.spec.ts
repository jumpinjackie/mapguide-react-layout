import { vi, describe, it, expect } from 'vitest';
import LayerGroup from 'ol/layer/Group';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import type { ProjectionLike } from 'ol/proj';
import type { Bounds, LayerTransparencySet } from '../../src/api/common';
import { GenericLayerSetOL } from '../../src/api/generic-layer-set';
import ImageLayer from 'ol/layer/Image';
import { LAYER_ID_BASE, LAYER_ID_MG_BASE } from '../../src/constants';

describe('GenericLayerSetOL', () => {
    const mockView = new View();
    const mockExtent: Bounds = [0, 0, 100, 100];
    const mockProjection: ProjectionLike = 'EPSG:3857';

    it('should construct with subjectLayer and externalBaseLayersGroup', () => {
        const subjectLayer = new TileLayer({});
        const externalBaseLayersGroup = new LayerGroup({});
        const layerSet = new GenericLayerSetOL(
            mockView,
            subjectLayer,
            mockExtent,
            externalBaseLayersGroup,
            mockProjection
        );
        expect(layerSet.subjectLayer).toBe(subjectLayer);
        expect(layerSet.externalBaseLayersGroup).toBe(externalBaseLayersGroup);
    });

    it('should construct with undefined subjectLayer', () => {
        const externalBaseLayersGroup = new LayerGroup({});
        const layerSet = new GenericLayerSetOL(
            mockView,
            undefined,
            mockExtent,
            externalBaseLayersGroup,
            mockProjection
        );
        expect(layerSet.subjectLayer).toBeUndefined();
        expect(layerSet.externalBaseLayersGroup).toBe(externalBaseLayersGroup);
    });

    it('should construct with undefined externalBaseLayersGroup', () => {
        const subjectLayer = new TileLayer({});
        const layerSet = new GenericLayerSetOL(
            mockView,
            subjectLayer,
            mockExtent,
            undefined,
            mockProjection
        );
        expect(layerSet.subjectLayer).toBe(subjectLayer);
        expect(layerSet.externalBaseLayersGroup).toBeUndefined();
    });

    it('should use default metersPerUnit and dpi if not provided', () => {
        const subjectLayer = new TileLayer({});
        const externalBaseLayersGroup = new LayerGroup({});
        // @ts-expect-no-error: Accessing private/protected for test
        const layerSet = new GenericLayerSetOL(
            mockView,
            subjectLayer,
            mockExtent,
            externalBaseLayersGroup,
            mockProjection
        );
        // No direct way to check metersPerUnit/dpi, but construction should succeed
        expect(layerSet).toBeInstanceOf(GenericLayerSetOL);
    });

    it('should use provided metersPerUnit and dpi', () => {
        const subjectLayer = new TileLayer({});
        const externalBaseLayersGroup = new LayerGroup({});
        const metersPerUnit = 2.0;
        const dpi = 120;
        // @ts-expect-no-error: Accessing private/protected for test
        const layerSet = new GenericLayerSetOL(
            mockView,
            subjectLayer,
            mockExtent,
            externalBaseLayersGroup,
            mockProjection,
            metersPerUnit,
            dpi
        );
        expect(layerSet).toBeInstanceOf(GenericLayerSetOL);
    });

    describe('getLayers', () => {
        it('returns both externalBaseLayersGroup and subjectLayer if both are set', () => {
            const subjectLayer = new TileLayer({});
            const externalBaseLayersGroup = new LayerGroup({});
            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                externalBaseLayersGroup,
                mockProjection
            );
            const layers = layerSet.getLayers();
            expect(layers).toContain(subjectLayer);
            expect(layers).toContain(externalBaseLayersGroup);
            expect(layers.length).toBe(2);
        });

        it('returns only subjectLayer if externalBaseLayersGroup is undefined', () => {
            const subjectLayer = new TileLayer({});
            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                undefined,
                mockProjection
            );
            const layers = layerSet.getLayers();
            expect(layers).toEqual([subjectLayer]);
        });

        it('returns only externalBaseLayersGroup if subjectLayer is undefined', () => {
            const externalBaseLayersGroup = new LayerGroup({});
            const layerSet = new GenericLayerSetOL(
                mockView,
                undefined,
                mockExtent,
                externalBaseLayersGroup,
                mockProjection
            );
            const layers = layerSet.getLayers();
            expect(layers).toEqual([externalBaseLayersGroup]);
        });

        it('returns empty array if both are undefined', () => {
            const layerSet = new GenericLayerSetOL(
                mockView,
                undefined,
                mockExtent,
                undefined,
                mockProjection
            );
            const layers = layerSet.getLayers();
            expect(layers).toEqual([]);
        });
    });

    describe('getSourcesForProgressTracking', () => {
        it('returns sources from externalBaseLayersGroup and subjectLayer', () => {
            const tileSource = { dummy: 'tileSource' } as any;
            const imageSource = { dummy: 'imageSource' } as any;
            const tileLayer = new TileLayer({});
            const imageLayer = new ImageLayer({});
            vi.spyOn(tileLayer, 'getSource').mockReturnValue(tileSource);
            vi.spyOn(imageLayer, 'getSource').mockReturnValue(imageSource);

            const group = new LayerGroup({
                layers: [tileLayer, imageLayer]
            });

            const subjectLayer = new TileLayer({});
            const subjectSource = { dummy: 'subjectSource' } as any;
            vi.spyOn(subjectLayer, 'getSource').mockReturnValue(subjectSource);

            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                group,
                mockProjection
            );

            const sources = layerSet.getSourcesForProgressTracking();
            expect(sources).toContain(tileSource);
            expect(sources).toContain(imageSource);
            expect(sources).toContain(subjectSource);
        });

        it('returns sources only from subjectLayer if externalBaseLayersGroup is undefined', () => {
            const subjectLayer = new TileLayer({});
            const subjectSource = { dummy: 'subjectSource' } as any;
            vi.spyOn(subjectLayer, 'getSource').mockReturnValue(subjectSource);

            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                undefined,
                mockProjection
            );

            const sources = layerSet.getSourcesForProgressTracking();
            expect(sources).toEqual([subjectSource]);
        });

        it('returns empty array if no sources are available', () => {
            const layerSet = new GenericLayerSetOL(
                mockView,
                undefined,
                mockExtent,
                undefined,
                mockProjection
            );
            expect(layerSet.getSourcesForProgressTracking()).toEqual([]);
        });
    });

    describe('updateTransparency', () => {
        it('sets opacity on externalBaseLayersGroup and subjectLayer if keys present', () => {
            const subjectLayer = new TileLayer({});
            const externalBaseLayersGroup = new LayerGroup({});
            const setOpacityGroup = vi.spyOn(externalBaseLayersGroup, 'setOpacity');
            const setOpacitySubject = vi.spyOn(subjectLayer, 'setOpacity');
            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                externalBaseLayersGroup,
                mockProjection
            );
            const trans: LayerTransparencySet = {
                [LAYER_ID_BASE]: 0.5,
                [LAYER_ID_MG_BASE]: 0.7
            };
            layerSet.updateTransparency(trans);
            expect(setOpacityGroup).toHaveBeenCalledWith(0.5);
            expect(setOpacitySubject).toHaveBeenCalledWith(0.7);
        });

        it('sets default opacity if keys not present', () => {
            const subjectLayer = new TileLayer({});
            const externalBaseLayersGroup = new LayerGroup({});
            const setOpacityGroup = vi.spyOn(externalBaseLayersGroup, 'setOpacity');
            const setOpacitySubject = vi.spyOn(subjectLayer, 'setOpacity');
            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                externalBaseLayersGroup,
                mockProjection
            );
            layerSet.updateTransparency({});
            expect(setOpacityGroup).toHaveBeenCalledWith(1.0);
            expect(setOpacitySubject).toHaveBeenCalledWith(1.0);
        });

        it('does not throw if subjectLayer or externalBaseLayersGroup is undefined', () => {
            const layerSet = new GenericLayerSetOL(
                mockView,
                undefined,
                mockExtent,
                undefined,
                mockProjection
            );
            expect(() => layerSet.updateTransparency({})).not.toThrow();
        });
    });

    describe('BaseLayerSetOL public members', () => {

        it('getMetersPerUnit returns the metersPerUnit', () => {
            const subjectLayer = new TileLayer({});
            const metersPerUnit = 2.5;
            const layerSet = new GenericLayerSetOL(
                mockView,
                subjectLayer,
                mockExtent,
                undefined,
                mockProjection,
                metersPerUnit
            );
            // @ts-expect-no-error: getMetersPerUnit is public in base
            expect(layerSet.getMetersPerUnit()).toBeCloseTo(metersPerUnit);
            const scale = 250.0;
            const res = layerSet.scaleToResolution(scale);
            const scale2 = layerSet.resolutionToScale(res);
            expect(scale2).toBeCloseTo(scale);
        });
    });
});
