import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { extractWmsLayers, WmsCapabilitiesPanel } from '../../../src/components/layer-manager/wms-capabilities-panel';
import type { WmsCapabilitiesDocument, WMSPublishedLayer } from '../../../src/api/common';
import React from 'react';
import { tr } from '../../../src/api/i18n';

describe('extractWmsLayers', () => {
    it('returns empty array if root layer has no name and no sublayers', () => {
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' },
            Capability: {
                Layer: {
                    Title: 'Root Layer',
                    Abstract: 'Root Abstract'
                }
            }
        } as any;
        expect(extractWmsLayers(caps)).toEqual([]);
    });

    it('returns root layer if it has a name', () => {
        const rootLayer: WMSPublishedLayer = {
            Name: 'root',
            Title: 'Root Layer',
            Abstract: 'Root Abstract',
            queryable: true,
            Style: [{ Name: 'default', Title: 'Default Style' }]
        } as any;
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' },
            Capability: {
                Layer: {
                    ...rootLayer
                }
            }
        } as any;
        expect(extractWmsLayers(caps)).toEqual([
            [rootLayer, rootLayer.Style]
        ]);
    });

    it('returns sublayers if present', () => {
        const subLayer1: WMSPublishedLayer = {
            Name: 'layer1',
            Title: 'Layer 1',
            Abstract: 'Layer 1 Abstract',
            queryable: false,
            Style: [{ Name: 'style1', Title: 'Style 1' }]
        } as any;
        const subLayer2: WMSPublishedLayer = {
            Name: 'layer2',
            Title: 'Layer 2',
            Abstract: 'Layer 2 Abstract',
            queryable: true
        } as any;
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' },
            Capability: {
                Layer: {
                    Title: 'Root Layer',
                    Abstract: 'Root Abstract',
                    Layer: [subLayer1, subLayer2]
                }
            }
        } as any;
        expect(extractWmsLayers(caps)).toEqual([
            [subLayer1, subLayer1.Style],
            [subLayer2, []]
        ]);
    });

    it('returns both root layer and sublayers if root has a name', () => {
        const rootLayer: WMSPublishedLayer = {
            Name: 'root',
            Title: 'Root Layer',
            Abstract: 'Root Abstract',
            queryable: true,
            Style: [{ Name: 'default', Title: 'Default Style' }]
        } as any;
        const subLayer: WMSPublishedLayer = {
            Name: 'layer1',
            Title: 'Layer 1',
            Abstract: 'Layer 1 Abstract',
            queryable: false
        } as any;
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' },
            Capability: {
                Layer: {
                    ...rootLayer,
                    Layer: [subLayer]
                }
            }
        } as any;
        expect(extractWmsLayers(caps)).toEqual([
            [rootLayer, rootLayer.Style],
            [subLayer, []]
        ]);
    });

    it('handles missing Style property gracefully', () => {
        const layer: WMSPublishedLayer = {
            Name: 'layer1',
            Title: 'Layer 1',
            Abstract: 'Layer 1 Abstract',
            queryable: false
        } as any;
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' },
            Capability: {
                Layer: {
                    ...layer
                }
            }
        } as any;
        expect(extractWmsLayers(caps)).toEqual([
            [layer, []]
        ]);
    });

    it('returns empty array if Capability.Layer is missing', () => {
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' },
            Capability: {} as any
        } as any;
        expect(() => extractWmsLayers(caps)).toThrow();
    });

    it('returns empty array if caps is missing Capability', () => {
        const caps: WmsCapabilitiesDocument = {
            version: '1.3.0',
            Service: { Name: 'WMS', Title: '', Abstract: '' }
        } as any;
        expect(() => extractWmsLayers(caps)).toThrow();
    });
});