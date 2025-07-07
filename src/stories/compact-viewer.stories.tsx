import { boolean, number, object, select, withKnobs } from '@storybook/addon-knobs';
import { CompactViewer } from '../components/compact-map-viewer/viewer';
import React from 'react';
import { XYZLayer } from '../components/compact-map-viewer/layers/xyz';
import { VectorLayer, VectorLayerProps } from '../components/compact-map-viewer/layers/vector';
import { SelectInteraction } from '../components/compact-map-viewer/interactions/select';
import Collection, { CollectionEvent } from 'ol/Collection';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import { action } from '@storybook/addon-actions';
import { DrawInteraction } from '../components/compact-map-viewer/interactions/draw';
import { MapMessages } from '../components/compact-map-viewer/messages';
import { WMSLayer } from '../components/compact-map-viewer/layers/wms';
import GeoJSONFormat from 'ol/format/GeoJSON';
import { ModifyInteraction } from '../components/compact-map-viewer/interactions/modify';
import { SnapInteraction } from '../components/compact-map-viewer/interactions/snap';
import { useFeatureCollection, useTrackedFeatureCollection } from '../components/compact-map-viewer/hooks';
import { ClusterSettings } from '../components/compact-map-viewer/layers/contracts';
import { handleClusterZoomToClick, handlerClusterZoomToClickAndSelection } from '../components/compact-map-viewer/interactions/behaviors';
import { ContentOverlay } from '../components/compact-map-viewer/overlay';
import { MousePositionControl } from '../components/compact-map-viewer/controls/mouse-position';
import { DebugVectorPointLayer } from '../components/compact-map-viewer/layers/debug-vector-point';
import { BBOX_WORLD_WEB_MERCATOR, BBOX_WORLD_WGS84, OSM_ATTRIBUTIONS, OSM_URLS, TEST_GEOJSON, useClusteredStyle, useTestClusteredData } from './test-data';

import './popup.css';

// Source: https://data.gov.au/data/dataset/gisborne-futures-data
const buildings = require('./data/gisborne-futures.json');

export default {
    title: 'Compact Viewer',
    decorators: [
        withKnobs,
        (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
            <React.StrictMode>{storyFn()}</React.StrictMode>
        )
    ]
};

const VIEWER_STYLE: React.CSSProperties = {
    width: 640,
    height: 480
};

/**
 * This example shows an OSM map with tiles reprojected to EPSG:4326
 */
export const _BasicExampleEPSG4326 = {
    render: () => {
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:4326" initialBBOX={BBOX_WORLD_WGS84}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
            </CompactViewer>
        );
    }
};

/**
 * This example shows an OSM map in its native EPSG:3857 (Web Mercator) projection
 */
export const _BasicExampleEPSG3857 = {
    render: () => {
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_WORLD_WEB_MERCATOR}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
            </CompactViewer>
        );
    }
};

/**
 * This example demonstrates the use of the MousePosition component
 */
export const _MousePosition = {
    render: () => {
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_WORLD_WEB_MERCATOR}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <MousePositionControl />
            </CompactViewer>
        );
    }
};



/**
 * This example demonstrates the ContentOverlay component, which displays content at the coordinate you clicked or
 * are hovering over based on the mouse tracking mode.
 */
export const _ContentOverlay = {
    render: () => {
        const active = boolean('Enable popup content', true);
        const mode = select('Mouse tracking mode', ['click', 'hover'], 'click');
        const [coord, setCoord] = React.useState<Coordinate | undefined>(undefined);
        const popupActive = active && !!coord;
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <ContentOverlay isActive={popupActive} onPositionChange={c => setCoord(c)} mouseTrackingMode={mode} className="ol-popup">
                    <p>
                        {mode === 'click' ? 'You clicked at' : 'You are hovering over'} ({coord?.[0]}, {coord?.[1]})
                    </p>
                </ContentOverlay>
            </CompactViewer>
        );
    }
};

/**
 * This example demonstrates the ContentOverlay component used as a prompt for drawing shapes
 */
export const _ContentOverlayAsDrawingPrompt = {
    render: () => {
        const drawActive = boolean('Enable drawing', true);
        const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
        const snap = boolean('Snap to layer objects', true);
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer name="Shapes" />
                {drawActive && <DrawInteraction type={type} target="Shapes" cancelKey={['Escape']} undoLastPointKey={['u']} />}
                {snap && <SnapInteraction target="Shapes" />}
                <ContentOverlay isActive={drawActive} mouseTrackingMode="hover" className="drawing-prompt">
                    <p>
                        {type === 'Circle'
                            ? 'Click to set the center of the circle. Click again to finish drawing. Press U or ESC to cancel'
                            : 'Click to start drawing. Click to add vertices. Double-click or click the start point to close the polygon to finish. Press U to undo the last vertex. Press ESC to cancel'}
                    </p>
                </ContentOverlay>
            </CompactViewer>
        );
    }
};

/**
 * This example has a vector layer with an initial set of GeoJSON features
 */
export const _VectorLayer = {
    render: () => {
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
            </CompactViewer>
        );
    }
};

/**
 * This example demonstrates the use of the DebugVectorPointLayer component
 */
export const _DebugVectorPoints = {
    render: () => {
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <DebugVectorPointLayer name="DebugPoints" addFunctionName="addDebugPoints" clearFunctionName="clearDebugPoints" />
                    <MousePositionControl />
                </CompactViewer>
                <p>
                    A debug vector points layer installs the following functions to the <code>window</code> browser global
                </p>
                <ul>
                    <li>
                        <code>addDebugPoints(points: [number, number], label: string)</code> - adds the given points to the debug layer
                    </li>
                    <li>
                        <code>clearDebugPoints()</code> - clears the debug layer
                    </li>
                </ul>
                <p>
                    You can add points to this debug layer through your browser console of the <code>storybook-preview-iframe</code>
                </p>
                <pre>
                    window.addDebugPoints([13306157.883883, 3326539.470971], 'Test Point'); // Add a single point
                    <br />
                    window.clearDebugPoints(); // Clear the debug points
                </pre>
                <p>
                    This layer is for debugging purposes only and should not be included in production code.
                </p>
            </>
        );
    }
};

/**
 * This example has a vector layer with an initial set of GeoJSON features and a thematic style
 */
export const _VectorLayerThemed = {
    render: () => {
        const style: VectorLayerProps['style'] = [
            {
                filter: ['==', ['get', 'label'], 'ICA1'],
                style: {
                    'fill-color': '#eff3ff',
                    'stroke-color': '#000000'
                }
            },
            {
                filter: ['==', ['get', 'label'], 'MCA'],
                style: {
                    'fill-color': '#bdd7e7',
                    'stroke-color': '#000000'
                }
            },
            {
                filter: ['==', ['get', 'label'], 'ICA2'],
                style: {
                    'fill-color': '#6baed6',
                    'stroke-color': '#000000'
                }
            },
            {
                filter: ['==', ['get', 'label'], 'DPA'],
                style: {
                    'fill-color': '#2171b5',
                    'stroke-color': '#000000'
                }
            }
        ];
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer style={style} name="Shapes" initialFeatures={buildings} initialFeatureProjection="EPSG:4326" />
            </CompactViewer>
        );
    }
};

export const _VectorLayerWithClustering = {
    render: () => {
        const [features, isReady] = useTestClusteredData();
        const clusterDistance = number('Cluster distance (in pixels)', 40, { range: true, min: 0, max: 200, step: 1 });
        const clusterMinDistance = number('Cluster minimum distance (in pixels)', 20, { range: true, min: 0, max: 200, step: 1 });
        const enabled = boolean('Enable clustering', true);
        const settings: ClusterSettings | undefined = enabled
            ? {
                  distance: clusterDistance,
                  minDistance: clusterMinDistance
              }
            : undefined;
        const style = useClusteredStyle(enabled);
        if (!isReady) {
            return null;
        }
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} maxZoom={20} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer
                        fitInitialViewToThisLayer
                        onFeaturesClicked={handleClusterZoomToClick}
                        style={style}
                        name="Points"
                        features={features}
                        clusterSettings={settings}
                        initialFeatureProjection="EPSG:3857"
                    />
                </CompactViewer>
                <p>
                    Clicking on a cluster of multiple points will automatically zoom into its bounding extent.
                </p>
                <p>
                    The <code>handleClusterZoomToClick</code> function registered to the <code>onFeaturesClicked</code> event of the <code>VectorLayer</code> component will automatically zoom to the bounding extent of the cluster
                </p>
            </>
        );
    }
};

export const _VectorLayerWithClusteringAndSelection = {
    render: () => {
        const [features, isReady] = useTestClusteredData();
        const clusterDistance = number('Cluster distance (in pixels)', 40, { range: true, min: 0, max: 200, step: 1 });
        const clusterMinDistance = number('Cluster minimum distance (in pixels)', 20, { range: true, min: 0, max: 200, step: 1 });
        const enabled = boolean('Enable clustering', true);
        const addHandler = action('Selected Feature');
        const removeHandler = action('UnSelected Feature');
        const [selFeatures, selReady, selTrackedFeatures] = useTrackedFeatureCollection({
            addHandler: addHandler,
            removeHandler: removeHandler,
            processFeatureToAdd: e => e.element.get('features') ?? [e.element],
            processFeatureToRemove: e => e.element.get('features') ?? [e.element]
        });
        const settings: ClusterSettings | undefined = enabled
            ? {
                  distance: clusterDistance,
                  minDistance: clusterMinDistance
              }
            : undefined;
        const style = useClusteredStyle(enabled);
        if (!isReady) {
            return null;
        }
        const popupActive = selTrackedFeatures.length > 0;
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} maxZoom={20} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer
                        fitInitialViewToThisLayer
                        onFeaturesClicked={handlerClusterZoomToClickAndSelection}
                        style={style}
                        name="Points"
                        features={features}
                        clusterSettings={settings}
                        initialFeatureProjection="EPSG:3857"
                    />
                    {selReady && <SelectInteraction mode="never" features={selFeatures} />}
                    <ContentOverlay isActive={popupActive} mouseTrackingMode="click" className="ol-popup">
                        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                            <h3>Selection: {selTrackedFeatures.length}</h3>
                            <ul>
                                {selTrackedFeatures.map(f => (
                                    <li key={f.getId()}>ID: {f.getId()}</li>
                                ))}
                            </ul>
                        </div>
                    </ContentOverlay>
                </CompactViewer>
                <p>
                    Clicking on a cluster of multiple points will automatically zoom into its bounding extent. Clicking on a single point cluster will
                    select it. Clicking on a multi-point cluster at the lowest possible zoom will also select it
                </p>
                <p>The cluster in Perth, Australia will be selectable at the lowest possible zoom</p>
                <p>
                    The <code>maxZoom</code> for this map has been constrained to 20 (street level) which means any cluster clicks at this level will
                    select instead of trying to zoom any further
                </p>
                <p>
                    The <code>SelectInteraction</code> by default does not play nice with click-driven content overlays like popups due to clashing click event handlers.
                </p>
                <p>
                    To make this <code>SelectInteraction</code> work with click-driven content overlays, the <code>mode</code> prop has been set to <code>'never'</code>
                    and selection is completely done programmatically through the <code>onFeaturesClicked</code> event handler of the <code>VectorLayer</code> component.
                </p>
                <p>
                    Setting the <code>features</code> prop of the <code>SelectInteraction</code> to an observable feature collection is optional for the purpose of
                    programmatic selection, we are binding a collection in this example so that you can:
                </p>
                <ol>
                    <li>Observe the features being added/removed through the actions addon</li>
                    <li>Pair it with a react-observable array copy (via the <code>useTrackedFeatureCollection</code> hook) that is used to update the popup content that you see and to control when this popup is displayed</li>
                </ol>
            </>
        );
    }
}

/**
 * This example has a selection interaction that operates against the vector layer
 */
export const _VectorLayerWithSelection = {
    render: () => {
        const selMode = select('Selection mode', ['click', 'hover'], 'click');
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                <SelectInteraction mode={selMode} />
            </CompactViewer>
        );
    }
};

/**
 * This example has a select interaction that propagates selection to an observable feature collection
 */
export const _VectorLayerWithSelectionTracking = {
    render: () => {
        const selMode = select('Selection mode', ['click', 'hover'], 'click');
        const addHandler = action('Selected Feature');
        const removeHandler = action('UnSelected Feature');
        const [features, isReady] = useFeatureCollection({
            addHandler: addHandler,
            removeHandler: removeHandler
        });
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                {isReady && <SelectInteraction mode={selMode} features={features} />}
            </CompactViewer>
        );
    }
};

/**
 * This example has a draw interaction that draws into the specified vector layer (by name)
 */
export const _VectorLayerWithDrawing = {
    render: () => {
        const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
        const snap = boolean('Snap to layer objects', true);
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                    <DrawInteraction type={type} target="Shapes" cancelKey={['Escape']} undoLastPointKey={['u']} />
                    {snap && <SnapInteraction target="Shapes" />}
                </CompactViewer>
                <p>
                    Press <strong>Escape</strong> to cancel the current drawing operation. Press <strong>U</strong> to undo the last drawn point
                </p>
            </>
        );
    }
};

/**
 * This example has a draw interaction that draws into the specified vector layer (by name) and can be edited
 */
export const _VectorLayerWithDrawingAndModify = {
    render: () => {
        const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
        const snap = boolean('Snap to layer objects', true);
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                    <DrawInteraction type={type} target="Shapes" cancelKey={['Escape']} undoLastPointKey={['u']} />
                    <ModifyInteraction target="Shapes" />
                    {snap && <SnapInteraction target="Shapes" />}
                </CompactViewer>
                <p>
                    Press <strong>Escape</strong> to cancel the current drawing operation. Press <strong>U</strong> to undo the last drawn point
                </p>
            </>
        );
    }
};

/**
 * This example has a draw interaction that draws into the specified vector layer (by name) and has a
 * custom style for the feature being drawn
 */
export const _VectorLayerWithDrawingCustomStyle = {
    render: () => {
        const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
        const snap = boolean('Snap to layer objects', true);
        const drawStyle = {
            Point: {
                'circle-radius': 5,
                'circle-fill-color': 'red'
            },
            LineString: {
                'circle-radius': 5,
                'circle-fill-color': 'red',
                'stroke-color': 'yellow',
                'stroke-width': 2
            },
            Polygon: {
                'circle-radius': 5,
                'circle-fill-color': 'red',
                'stroke-color': 'yellow',
                'stroke-width': 2,
                'fill-color': 'blue'
            },
            Circle: {
                'circle-radius': 5,
                'circle-fill-color': 'red',
                'stroke-color': 'blue',
                'stroke-width': 2,
                'fill-color': 'yellow'
            }
        };
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                    <DrawInteraction style={drawStyle[type]} type={type} target="Shapes" cancelKey={['Escape']} undoLastPointKey={['u']} />
                    {snap && <SnapInteraction target="Shapes" />}
                </CompactViewer>
                <p>
                    Press <strong>Escape</strong> to cancel the current drawing operation. Press <strong>U</strong> to undo the last drawn point
                </p>
            </>
        );
    }
};

/**
 * This example has both draw and modify interaction and vector layer be backed by the same feature collection
 */
export const _VectorLayerWithDrawingAndModifyToFeatureCollection = {
    render: () => {
        const features = React.useRef(new Collection<Feature>());
        const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
        const snap = boolean('Snap to layer objects', true);
        const addedFeature = action('Added Feature');
        const removedFeature = action('Removed Feature');
        const onAddedFeature = (e: CollectionEvent<Feature>) => addedFeature(e);
        const onRemovedFeature = (e: CollectionEvent<Feature>) => removedFeature(e);
        React.useEffect(() => {
            features.current.on('add', onAddedFeature);
            features.current.on('remove', onRemovedFeature);
            return () => {
                features.current.un('add', onAddedFeature);
                features.current.un('remove', onRemovedFeature);
            };
        }, []);
        return (
            <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer
                        fitInitialViewToThisLayer
                        name="Shapes"
                        features={features.current}
                        initialFeatures={TEST_GEOJSON}
                        initialFeatureProjection="EPSG:4326"
                    />
                    <DrawInteraction type={type} target={features.current} cancelKey={['Escape']} undoLastPointKey={['u']} />
                    <ModifyInteraction target={features.current} />
                    {snap && <SnapInteraction target={features.current} />}
                </CompactViewer>
                <p>
                    Press <strong>Escape</strong> to cancel the current drawing operation. Press <strong>U</strong> to undo the last drawn point
                </p>
            </>
        );
    }
};

const BBOX_AU_3857: [number, number, number, number] = [12616951.086509628, -5408361.233223649, 17095334.20112302, -1194704.5302843093];
const WMS_URL = 'https://opendata.maps.vic.gov.au/geoserver/wms?service=wms&request=getcapabilities';
const WMS_LAYER = 'open-data-platform:ad_locality_area_polygon';

/**
 * This example showcases a WMS layer with GetFeatureInfo support that funnels selections to a vector layer
 */
export const _WmsLayerGetFeatureInfoGeoJSON = {
    render: () => {
        const features = React.useRef(new Collection<Feature>());
        const getFeatureInfo = action('GetFeatureInfo response');
        const onGetFeatureInfo = (content: string) => {
            getFeatureInfo(content);
            const format = new GeoJSONFormat();
            const feature = format.readFeatures(content);
            for (const f of feature) {
                features.current.push(f);
            }
        };
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_AU_3857}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <WMSLayer
                    name="WMS"
                    url={WMS_URL}
                    layerName={WMS_LAYER}
                    tiled={true}
                    infoFormat="application/json"
                    onGetFeatureInfo={onGetFeatureInfo}
                />
                <VectorLayer name="WMS Selection" features={features.current} />
            </CompactViewer>
        );
    }
};

/**
 * This example showcases a WMS layer with all props being dynamically observable
 */
export const _WmsLayerObservability = {
    render: () => {
        const features = React.useRef(new Collection<Feature>());
        const getFeatureInfo = action('GetFeatureInfo response');
        const onGetFeatureInfo = (content: string) => {
            getFeatureInfo(content);
            const format = new GeoJSONFormat();
            const feature = format.readFeatures(content);
            for (const f of feature) {
                features.current.push(f);
            }
        };
        const layerProps = object('WMS Layer Props', {
            name: 'WMS',
            url: WMS_URL,
            layerName: WMS_LAYER,
            tiled: true,
            infoFormat: 'application/json',
            customParams: {}
        } as Pick<React.ComponentProps<typeof WMSLayer>, 'name' | 'url' | 'layerName' | 'tiled' | 'customParams' | 'infoFormat'>);

        return (
            <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_AU_3857}>
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <WMSLayer {...layerProps} onGetFeatureInfo={onGetFeatureInfo} />
                    <VectorLayer name="WMS Selection" features={features.current} />
                </CompactViewer>
                <p>
                    To verify the WMS layer has all observable props, paste this into the <strong>WMS Layer Props</strong>
                </p>
                <code>
                    {`{
                    "name": "SLIP WA Regional Parks",
                    "url": "https://services.slip.wa.gov.au/public/services/SLIP_Public_Services/Boundaries/MapServer/WMSServer",
                    "layerName": "50",
                    "infoFormat": "application/geo+json",
                    "customParams": {},
                    "tiled": true
                }`}
                </code>
                <p>It should immediately switch to the new layer without any reloading/refreshing</p>
            </>
        );
    }
};

/**
 * This example is a "kitchen sink" that tests all possible prop combinations and component mounting/unmounting
 */
export const _MountingAndPropsTest = {
    render: () => {
        const features = React.useRef(new Collection<Feature>());
        const selectedFeature = action('Selected Feature');
        const unSelectedFeature = action('UnSelected Feature');
        const onSelectedFeature = (e: CollectionEvent<Feature>) => selectedFeature(e);
        const onUnSelectedFeature = (e: CollectionEvent<Feature>) => unSelectedFeature(e);
        React.useEffect(() => {
            features.current.on('add', onSelectedFeature);
            features.current.on('remove', onUnSelectedFeature);
            return () => {
                features.current.un('add', onSelectedFeature);
                features.current.un('remove', onUnSelectedFeature);
            };
        }, []);
        const enableDraw = boolean('Enable drawing', false);
        const enableSelect = boolean('Enable select', false);
        const enableModify = boolean('Enable modify', false);
        const selMode = select('Selection mode', ['click', 'hover'], 'click');
        const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
        const snap = boolean('Snap to layer objects', true);
        const enableVectorLayer = boolean('Enable Shapes layer', true);
        const hideVectorLayer = boolean('Shapes layer hidden', false);
        const hideOsmLayer = boolean('OSM layer hidden', false);
        const enableWmsLayer = boolean('Enable WMS layer', true);
        const hideWmsLayer = boolean('WMS layer hidden', false);
        const tileWmsLayer = boolean('WMS layer tiled', true);
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer isHidden={hideOsmLayer} name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                {enableWmsLayer && <WMSLayer isHidden={hideWmsLayer} name="WMS" url={WMS_URL} layerName={WMS_LAYER} tiled={tileWmsLayer} />}
                {enableVectorLayer && (
                    <VectorLayer
                        isHidden={hideVectorLayer}
                        fitInitialViewToThisLayer
                        name="Shapes"
                        initialFeatures={TEST_GEOJSON}
                        initialFeatureProjection="EPSG:4326"
                    />
                )}
                {enableModify && <ModifyInteraction target="Shapes" />}
                {enableDraw && <DrawInteraction type={type} target="Shapes" />}
                {enableSelect && <SelectInteraction mode={selMode} features={features.current} />}
                {snap && <SnapInteraction target="Shapes" />}
            </CompactViewer>
        );
    }
};
