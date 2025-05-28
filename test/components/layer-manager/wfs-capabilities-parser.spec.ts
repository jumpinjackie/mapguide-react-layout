import { describe, it, expect } from 'vitest';
import { WfsCapabilitiesParser } from '../../../src/components/layer-manager/wfs-capabilities-parser';

const minimalCapabilities = `
<WFS_Capabilities xmlns="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows">
    <ows:ServiceIdentification>
        <ows:Title>Test WFS</ows:Title>
        <ows:Abstract>Test abstract</ows:Abstract>
        <ows:ServiceTypeVersion>2.0.0</ows:ServiceTypeVersion>
    </ows:ServiceIdentification>
    <FeatureTypeList>
        <FeatureType>
            <Name>layer1</Name>
            <Title>Layer 1</Title>
            <Abstract>Layer 1 abstract</Abstract>
            <DefaultCRS>EPSG:4326</DefaultCRS>
            <ows:WGS84BoundingBox>
                <ows:LowerCorner>-180 -90</ows:LowerCorner>
                <ows:UpperCorner>180 90</ows:UpperCorner>
            </ows:WGS84BoundingBox>
        </FeatureType>
    </FeatureTypeList>
</WFS_Capabilities>
`;

const capabilitiesWithFormats = `
<WFS_Capabilities xmlns="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows">
    <ows:ServiceIdentification>
        <ows:Title>Test WFS</ows:Title>
        <ows:Abstract>Test abstract</ows:Abstract>
        <ows:ServiceTypeVersion>1.1.0</ows:ServiceTypeVersion>
        <ows:ServiceTypeVersion>2.0.0</ows:ServiceTypeVersion>
    </ows:ServiceIdentification>
    <ows:OperationsMetadata>
        <ows:Operation name="GetFeature">
            <ows:Parameter name="outputFormat">
                <ows:Value>GML2</ows:Value>
                <ows:Value>GML3</ows:Value>
            </ows:Parameter>
        </ows:Operation>
    </ows:OperationsMetadata>
    <FeatureTypeList>
        <FeatureType>
            <Name>layer1</Name>
            <Title>Layer 1</Title>
            <Abstract>Layer 1 abstract</Abstract>
            <DefaultCRS>EPSG:4326</DefaultCRS>
            <Format>GML2</Format>
            <Format>GML3</Format>
            <ows:WGS84BoundingBox>
                <ows:LowerCorner>-180 -90</ows:LowerCorner>
                <ows:UpperCorner>180 90</ows:UpperCorner>
            </ows:WGS84BoundingBox>
        </FeatureType>
        <FeatureType>
            <Name>layer2</Name>
            <Title>Layer 2</Title>
            <Abstract>Layer 2 abstract</Abstract>
            <DefaultCRS>EPSG:3857</DefaultCRS>
            <OtherCRS>EPSG:32633</OtherCRS>
            <OtherSRS>EPSG:27700</OtherSRS>
            <Format>GeoJSON</Format>
            <ows:WGS84BoundingBox>
                <ows:LowerCorner>0 0</ows:LowerCorner>
                <ows:UpperCorner>10 10</ows:UpperCorner>
            </ows:WGS84BoundingBox>
        </FeatureType>
    </FeatureTypeList>
</WFS_Capabilities>
`;

describe('WfsCapabilitiesParser', () => {
    it('parses minimal capabilities', () => {
        const parser = new WfsCapabilitiesParser();
        const result = parser.parse(minimalCapabilities);

        expect(result.info.title).toBe('Test WFS');
        expect(result.info.abstract).toBe('Test abstract');
        expect(result.info.version).toBe('2.0.0');
        expect(result.info.allowedOutputFormats).toBeUndefined();

        expect(result.layers).toHaveLength(1);
        const layer = result.layers[0];
        expect(layer.name).toBe('layer1');
        expect(layer.title).toBe('Layer 1');
        expect(layer.abstract).toBe('Layer 1 abstract');
        expect(layer.defaultCrs).toBe('EPSG:4326');
        expect(layer.otherCrs).toEqual([]);
        expect(layer.formats).toBeUndefined();
        expect(layer.wgs84Bounds).toEqual([-180, -90, 180, 90]);
    });

    it('parses allowed output formats and multiple layers', () => {
        const parser = new WfsCapabilitiesParser();
        const result = parser.parse(capabilitiesWithFormats);

        expect(result.info.title).toBe('Test WFS');
        expect(result.info.abstract).toBe('Test abstract');
        expect(result.info.version).toBe('2.0.0');
        expect(result.info.allowedOutputFormats).toEqual(['GML2', 'GML3']);

        expect(result.layers).toHaveLength(2);

        const [layer1, layer2] = result.layers;

        expect(layer1.name).toBe('layer1');
        expect(layer1.title).toBe('Layer 1');
        expect(layer1.abstract).toBe('Layer 1 abstract');
        expect(layer1.defaultCrs).toBe('EPSG:4326');
        expect(layer1.otherCrs).toEqual([]);
        expect(layer1.formats).toEqual(['GML2', 'GML3']);
        expect(layer1.wgs84Bounds).toEqual([-180, -90, 180, 90]);

        expect(layer2.name).toBe('layer2');
        expect(layer2.title).toBe('Layer 2');
        expect(layer2.abstract).toBe('Layer 2 abstract');
        expect(layer2.defaultCrs).toBe('EPSG:3857');
        expect(layer2.otherCrs).toEqual(['EPSG:32633', 'EPSG:27700']);
        expect(layer2.formats).toEqual(['GeoJSON']);
        expect(layer2.wgs84Bounds).toEqual([0, 0, 10, 10]);
    });

    it('handles missing optional fields gracefully', () => {
        const xml = `
            <WFS_Capabilities xmlns="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows">
                <ows:ServiceIdentification>
                    <ows:Title></ows:Title>
                    <ows:Abstract></ows:Abstract>
                    <ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion>
                </ows:ServiceIdentification>
                <FeatureTypeList>
                    <FeatureType>
                        <Name></Name>
                        <Title></Title>
                        <Abstract></Abstract>
                        <DefaultCRS></DefaultCRS>
                    </FeatureType>
                </FeatureTypeList>
            </WFS_Capabilities>
        `;
        const parser = new WfsCapabilitiesParser();
        const result = parser.parse(xml);

        expect(result.info.title).toBe('');
        expect(result.info.abstract).toBe('');
        expect(result.info.version).toBe('1.0.0');
        expect(result.info.allowedOutputFormats).toBeUndefined();

        expect(result.layers).toHaveLength(1);
        const layer = result.layers[0];
        expect(layer.name).toBe('');
        expect(layer.title).toBe('');
        expect(layer.abstract).toBe('');
        expect(layer.defaultCrs).toBe('');
        expect(layer.otherCrs).toEqual([]);
        expect(layer.formats).toBeUndefined();
        expect(layer.wgs84Bounds).toBeUndefined();
    });

    it('parses both DefaultCRS and DefaultSRS', () => {
        const xml = `
            <WFS_Capabilities xmlns="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows">
                <ows:ServiceIdentification>
                    <ows:Title>WFS</ows:Title>
                    <ows:Abstract>desc</ows:Abstract>
                    <ows:ServiceTypeVersion>1.1.0</ows:ServiceTypeVersion>
                </ows:ServiceIdentification>
                <FeatureTypeList>
                    <FeatureType>
                        <Name>layer</Name>
                        <Title>Layer</Title>
                        <Abstract>desc</Abstract>
                        <DefaultSRS>EPSG:1234</DefaultSRS>
                    </FeatureType>
                </FeatureTypeList>
            </WFS_Capabilities>
        `;
        const parser = new WfsCapabilitiesParser();
        const result = parser.parse(xml);

        expect(result.layers).toHaveLength(1);
        expect(result.layers[0].defaultCrs).toBe('EPSG:1234');
    });

    it('returns empty layers if none present', () => {
        const xml = `
            <WFS_Capabilities xmlns="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows">
                <ows:ServiceIdentification>
                    <ows:Title>WFS</ows:Title>
                    <ows:Abstract>desc</ows:Abstract>
                    <ows:ServiceTypeVersion>2.0.0</ows:ServiceTypeVersion>
                </ows:ServiceIdentification>
            </WFS_Capabilities>
        `;
        const parser = new WfsCapabilitiesParser();
        const result = parser.parse(xml);

        expect(result.layers).toEqual([]);
    });
});