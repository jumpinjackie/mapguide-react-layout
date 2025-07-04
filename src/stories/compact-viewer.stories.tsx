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
import Point from 'ol/geom/Point';
import { useResourceRefInit } from '../components/compact-map-viewer/hooks';
import { ClusterSettings } from '../components/compact-map-viewer/layers/contracts';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import { handleClusterZoomToClick } from '../components/compact-map-viewer/interactions/behaviors';
import { computeClusterStyleValue } from '../components/compact-map-viewer/helpers';
import { ContentOverlay } from '../components/compact-map-viewer/overlay';
import { MousePositionControl } from '../components/compact-map-viewer/controls/mouse-position';
import { DebugVectorPointLayer } from '../components/compact-map-viewer/layers/debug-vector-point';

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
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:4326" initialBBOX={[-180, 90, 180, 90]}>
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
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
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
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <MousePositionControl />
            </CompactViewer>
        );
    }
};

const TEST_GEOJSON = {
    type: 'FeatureCollection' as 'FeatureCollection',
    features: [
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [
                    [
                        [1.3972908770953154, 16.2897565165336],
                        [4.413185071053448, 0.3010733575690665],
                        [16.680466124627827, -1.0588452216285873],
                        [22.202660615702342, 29.09356884933281],
                        [-0.1752826146531561, 27.310204698406423],
                        [1.3972908770953154, 16.2897565165336]
                    ]
                ],
                type: 'Polygon' as 'Polygon'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon' as 'Polygon',
                coordinates: [
                    [
                        [33.23736262616734, 1.2773658004138138],
                        [31.76923279904573, 1.207351511808443],
                        [30.31449953297534, 0.9979932653489738],
                        [28.88637202152536, 0.6513317953680383],
                        [27.497695754233618, 0.17072549915618648],
                        [26.160797042553842, -0.43921069265407003],
                        [24.887356025330313, -1.1726850434994245],
                        [23.68831286705868, -2.0228222746246507],
                        [22.57380866505103, -2.9817648443757263],
                        [21.55315947702565, -4.0407767862405795],
                        [20.63485917780145, -5.190345174158043],
                        [19.826604746127266, -6.420275166865659],
                        [19.1353361408635, -7.71977570413115],
                        [18.567282117922687, -9.077534172149763],
                        [18.12800306871546, -10.481779629944493],
                        [17.8224221088854, -11.92033542839683],
                        [17.654836113208948, -13.380663221118887],
                        [17.62889912970455, -14.849901444346187],
                        [17.74757163559271, -16.314902322127924],
                        [18.013030521479205, -17.76227231779432],
                        [18.426536682295755, -19.17842166604925],
                        [18.988259875271673, -20.549629109927785],
                        [19.69706429362044, -21.862128116449703],
                        [20.55026323069545, -23.102220491857224],
                        [21.543357204265412, -24.256422268146547],
                        [22.669776573294318, -25.311644797002273],
                        [23.92065616176625, -26.25541103840628],
                        [25.28467437399567, -27.07610308685447],
                        [26.74799105146885, -27.763232286639667],
                        [28.29431517516105, -28.307718386839685],
                        [29.90512429715082, -28.702159892336258],
                        [31.560042320185094, -28.941075054774036],
                        [33.23736262616734, -29.021092720959512],
                        [34.91468293214959, -28.941075054774036],
                        [36.56960095518386, -28.702159892336265],
                        [38.180410077173626, -28.307718386839685],
                        [39.72673420086581, -27.763232286639674],
                        [41.19005087833901, -27.07610308685447],
                        [42.55406909056843, -26.25541103840628],
                        [43.804948679040365, -25.311644797002273],
                        [44.93136804806927, -24.256422268146558],
                        [45.924462021639236, -23.10222049185722],
                        [46.777660958714236, -21.862128116449714],
                        [47.486465377063006, -20.5496291099278],
                        [48.04818857003893, -19.178421666049246],
                        [48.46169473085548, -17.76227231779432],
                        [48.72715361674197, -16.314902322127935],
                        [48.84582612263012, -14.849901444346187],
                        [48.81988913912574, -13.38066322111889],
                        [48.65230314344928, -11.920335428396836],
                        [48.34672218361922, -10.481779629944493],
                        [47.907443134412, -9.077534172149766],
                        [47.339389111471185, -7.719775704131147],
                        [46.648120506207405, -6.420275166865659],
                        [45.83986607453324, -5.190345174158049],
                        [44.921565775309034, -4.0407767862405795],
                        [43.90091658728365, -2.981764844375729],
                        [42.786412385276, -2.0228222746246556],
                        [41.587369227004366, -1.1726850434994245],
                        [40.31392820978084, -0.4392106926540732],
                        [38.97702949810106, 0.17072549915618807],
                        [37.58835323080933, 0.6513317953680352],
                        [36.160225719359346, 0.9979932653489723],
                        [34.70549245328895, 1.207351511808443],
                        [33.23736262616734, 1.2773658004138138]
                    ]
                ]
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [
                    [32.34789678028915, 40.237339281096695],
                    [47.00555322967003, 12.003088721789652],
                    [69.87747968418157, -12.53366593814718],
                    [69.29717640425835, 7.1697865257791875]
                ],
                type: 'LineString' as 'LineString'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [-7.2088250549489885, 25.5369227390441],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [-10.522579543848423, 19.592512486670216],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [-10.278259811307663, 12.849972969567503],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [-6.385418396463308, 7.808853732378495],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [30.798673110973596, 15.790842549111687],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [
                    [
                        [-28.579193451994, 19.49728925204832],
                        [-63.940377731487374, 8.337862813426952],
                        [-68.23826347994319, -15.564632393267217],
                        [-47.734990414965154, -36.982592430604385],
                        [-14.143603069712242, -22.548913435843843],
                        [-22.848102880634627, -2.0534307868758077],
                        [-28.579193451994, 19.49728925204832]
                    ]
                ],
                type: 'Polygon' as 'Polygon'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon' as 'Polygon',
                coordinates: [
                    [
                        [-94.03654227448723, 49.724005930947776],
                        [-96.21131898274035, 49.63664804210488],
                        [-98.34520786211812, 49.3763448599076],
                        [-100.39952785863083, 48.94829544264444],
                        [-102.33970897943517, 48.360808087656814],
                        [-104.13666666799581, 47.62482262434187],
                        [-105.76754037487233, 46.7533407774069],
                        [-107.21581641079716, 45.76083327695023],
                        [-108.47095004178489, 44.662681506504995],
                        [-109.52764898746828, 43.474693192804274],
                        [-110.38498297301375, 42.21271202013059],
                        [-111.04545643917348, 40.892324476683086],
                        [-111.51414098231906, 39.528655739308036],
                        [-111.79792379945037, 38.13624006059436],
                        [-111.90489572545873, 36.728948912099646],
                        [-111.84387972203427, 35.31996068352718],
                        [-111.62408713280787, 33.92175779357796],
                        [-111.25488251681693, 32.5461397168278],
                        [-110.74563607402948, 31.20424310085497],
                        [-110.10564362371616, 29.906562543447627],
                        [-109.34409638280793, 28.66296761130908],
                        [-108.47008552449631, 27.482713306981747],
                        [-107.49262917986309, 26.374442478537066],
                        [-106.4207119491042, 25.34617968120032],
                        [-105.2633290510561, 24.40531680134484],
                        [-104.0295289871686, 23.558591387302013],
                        [-102.72845009483, 22.812059127775047],
                        [-101.36934768805506, 22.17106229151582],
                        [-99.96160969169235, 21.64019619354574],
                        [-98.5147598065277, 21.223275878486437],
                        [-97.03844830841804, 20.92330520332505],
                        [-95.54243157098085, 20.742450355961495],
                        [-94.03654227448723, 20.682019565230647],
                        [-92.53065297799361, 20.742450355961495],
                        [-91.03463624055642, 20.92330520332505],
                        [-89.55832474244674, 21.22327587848643],
                        [-88.11147485728213, 21.640196193545737],
                        [-86.7037368609194, 22.17106229151582],
                        [-85.34463445414447, 22.81205912777505],
                        [-84.04355556180586, 23.558591387302013],
                        [-82.80975549791837, 24.40531680134484],
                        [-81.65237259987028, 25.346179681200322],
                        [-80.58045536911136, 26.37444247853706],
                        [-79.60299902447815, 27.48271330698174],
                        [-78.72898816616652, 28.662967611309085],
                        [-77.9674409252583, 29.906562543447627],
                        [-77.32744847494497, 31.204243100854963],
                        [-76.81820203215753, 32.5461397168278],
                        [-76.4489974161666, 33.92175779357796],
                        [-76.22920482694019, 35.31996068352717],
                        [-76.16818882351573, 36.728948912099646],
                        [-76.27516074952409, 38.13624006059436],
                        [-76.55894356665539, 39.528655739308036],
                        [-77.027628109801, 40.892324476683086],
                        [-77.68810157596072, 42.21271202013058],
                        [-78.54543556150618, 43.474693192804274],
                        [-79.60213450718958, 44.66268150650499],
                        [-80.85726813817729, 45.76083327695022],
                        [-82.30554417410212, 46.7533407774069],
                        [-83.93641788097865, 47.62482262434187],
                        [-85.73337556953929, 48.36080808765682],
                        [-87.6735566903436, 48.94829544264443],
                        [-89.72787668685632, 49.3763448599076],
                        [-91.8617655662341, 49.63664804210488],
                        [-94.03654227448723, 49.724005930947776]
                    ]
                ]
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [
                    [
                        [70.86072290913529, 62.497275615414054],
                        [44.47129752503275, 62.497275615414054],
                        [44.47129752503275, 49.74281160330838],
                        [70.86072290913529, 49.74281160330838],
                        [70.86072290913529, 62.497275615414054]
                    ]
                ],
                type: 'Polygon' as 'Polygon'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [
                    [
                        [99.8537278232053, 44.49339775209944],
                        [57.798303539837804, 34.40764003286317],
                        [73.2254129844587, 17.638667081777413],
                        [104.40558058356345, 11.09867641807078],
                        [123.71418584352563, 13.909853012702968],
                        [121.51104416053965, 30.28646109152352],
                        [120.81499819803918, 30.468271556120214],
                        [117.98985712537717, 40.642572386885945],
                        [99.8537278232053, 44.49339775209944]
                    ]
                ],
                type: 'Polygon' as 'Polygon'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [152.03562883988286, -15.541513924777746],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [149.0904596660833, -35.10978479437297],
                type: 'Point' as 'Point'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                coordinates: [
                    [
                        [124.59430164597114, -3.867367206547158],
                        [90.27104880465458, -11.95917253555156],
                        [92.76206633675605, -23.57533654042487],
                        [101.18001104560875, -35.00151782449884],
                        [136.29467618407955, -22.652064732109693],
                        [129.91052604457235, -11.521912332863195],
                        [124.59430164597114, -3.867367206547158]
                    ]
                ],
                type: 'Polygon' as 'Polygon'
            }
        },
        {
            type: 'Feature' as 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon' as 'Polygon',
                coordinates: [
                    [
                        [127.14082360335435, -15.569544800358768],
                        [124.93798226146671, -15.655067708625927],
                        [122.74759358870449, -15.911027268835445],
                        [120.58200020502171, -16.33560754130454],
                        [118.45333530795071, -16.925819615177918],
                        [116.37344384711712, -17.67755516893676],
                        [114.35383263800358, -18.585655890774042],
                        [112.40565587730397, -19.643993800342095],
                        [110.53974042315647, -20.84555684823571],
                        [108.76665320886697, -22.182533896025046],
                        [107.09681148740863, -23.646393239581563],
                        [105.54063538277374, -25.227949135871835],
                        [104.10874146668124, -26.917411213764083],
                        [102.81217567552373, -28.704412078860702],
                        [101.6626835909929, -30.57800876476002],
                        [100.67301553371689, -32.526653874415715],
                        [99.85726246720922, -34.53813227796999],
                        [99.2312154958992, -36.59945913643035],
                        [98.81273545550088, -38.696734951759524],
                        [98.62210781211859, -40.81495360730772],
                        [98.68233907465854, -42.937760512625104],
                        [99.01932057032678, -45.047160953210515],
                        [99.66173964023528, -47.12318510531531],
                        [100.64055411471983, -49.143528219338485],
                        [101.98776569042228, -51.083205290533094],
                        [103.7341480225071, -52.9142923628854],
                        [105.90555118379714, -54.60587273247563],
                        [108.51750618429732, -56.124360280697736],
                        [111.56822705448583, -57.43441395585879],
                        [115.03087373688581, -58.50064505905133],
                        [118.84703278867303, -59.290193665650186],
                        [122.92431329112907, -59.77597322451365],
                        [127.14082360335435, -59.9400046286456],
                        [131.35733391557963, -59.77597322451365],
                        [135.43461441803566, -59.290193665650186],
                        [139.2507734698229, -58.50064505905133],
                        [142.71342015222288, -57.4344139558588],
                        [145.7641410224114, -56.124360280697736],
                        [148.37609602291155, -54.60587273247563],
                        [150.54749918420163, -52.9142923628854],
                        [152.2938815162864, -51.083205290533094],
                        [153.64109309198886, -49.14352821933848],
                        [154.61990756647342, -47.12318510531532],
                        [155.2623266363819, -45.047160953210515],
                        [155.59930813205017, -42.937760512625104],
                        [155.6595393945901, -40.81495360730772],
                        [155.4689117512078, -38.69673495175954],
                        [155.0504317108095, -36.59945913643035],
                        [154.4243847394995, -34.53813227796999],
                        [153.60863167299183, -32.52665387441573],
                        [152.6189636157158, -30.57800876476002],
                        [151.46947153118498, -28.704412078860706],
                        [150.1729057400275, -26.91741121376408],
                        [148.74101182393497, -25.227949135871835],
                        [147.18483571930008, -23.646393239581567],
                        [145.51499399784174, -22.182533896025046],
                        [143.74190678355222, -20.84555684823571],
                        [141.87599132940477, -19.643993800342102],
                        [139.92781456870514, -18.585655890774042],
                        [137.9082033595916, -17.67755516893676],
                        [135.828311898758, -16.925819615177915],
                        [133.69964700168703, -16.335607541304547],
                        [131.53405361800424, -15.911027268835449],
                        [129.34366494524198, -15.655067708625927],
                        [127.14082360335435, -15.569544800358768]
                    ]
                ]
            }
        }
    ]
};

const OSM_URLS = ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'];
const OSM_ATTRIBUTIONS = ['(c) OpenStreetMap contributors'];

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
                        <code>addDebugPoints(points: [number, number])</code> - adds the given points to the debug layer
                    </li>
                    <li>
                        <code>clearDebugPoints()</code> - clears the debug layer
                    </li>
                </ul>
                <p>
                    You can add points to this debug layer through your browser console of the <code>storybook-preview-iframe</code>
                </p>
                <pre>
                    window.addDebugPoints([13306157.883883, 3326539.470971]); // Add a single point
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
        const [features, isReady] = useResourceRefInit(
            () => {
                const count = 20000;
                const features = new Array(count);
                const e = 4500000;
                let id = 1;
                for (let i = 0; i < count; ++i) {
                    const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
                    features[i] = new Feature(new Point(coordinates));
                    features[i].setId(id++);
                }

                // Add a concentrated cluster at a specific location
                for (let i = 0; i < 20; i++) {
                    const f = new Feature(new Point([12894315.175483, -3755045.451538]));
                    f.setId(id++);
                    features.push(f);
                }

                return new Collection<Feature>(features);
            },
            () => {}
        );
        const styleCache = React.useRef<Record<number | string, Style | Style[]>>({});
        const clusterDistance = number('Cluster distance (in pixels)', 40, { range: true, min: 0, max: 200, step: 1 });
        const clusterMinDistance = number('Cluster minimum distance (in pixels)', 20, { range: true, min: 0, max: 200, step: 1 });
        const enabled = boolean('Enable clustering', true);
        const selFeatures = React.useRef(new Collection<Feature>());
        // This is a react-observable "proxy" of the above collection. We need this as changes to the above collection will
        // not trigger re-rendering. We will use collection events to keep this in sync. Even if this wasn't a clustered layer
        // (which requires "unpacking" the cluster features), this "proxy" copy would still be necessary to trigger re-rendering
        const [allSelFeatures, setAllSelFeatures] = React.useState<Feature[]>([]);
        const selectedFeature = action('Selected Feature');
        const unSelectedFeature = action('UnSelected Feature');
        const onSelectedFeature = (e: CollectionEvent<Feature>) => {
            selectedFeature(e);
            const clusterFeatures = e.element.get('features') ?? [];
            setAllSelFeatures(oldArray => [...oldArray, ...clusterFeatures]);
        };
        const onUnSelectedFeature = (e: CollectionEvent<Feature>) => {
            unSelectedFeature(e);
            const clusterFeatures = e.element.get('features') ?? [];
            setAllSelFeatures(oldArray => oldArray.filter(f => !clusterFeatures.includes(f)));
        };
        React.useEffect(() => {
            selFeatures.current.on('add', onSelectedFeature);
            selFeatures.current.on('remove', onUnSelectedFeature);
            return () => {
                selFeatures.current.un('add', onSelectedFeature);
                selFeatures.current.un('remove', onUnSelectedFeature);
            };
        }, []);
        const settings: ClusterSettings | undefined = enabled
            ? {
                  distance: clusterDistance,
                  minDistance: clusterMinDistance
              }
            : undefined;
        // Have to use style function + cache as I can't get this to work with their declarative flat style
        const style: VectorLayerProps['style'] | undefined = enabled
            ? feature => {
                  const size = feature.get('features')?.length;
                  if (size && size > 0) {
                      const radius = computeClusterStyleValue(size, 10, 40, 1, 200);
                      const fontSize = computeClusterStyleValue(size, 10, 24, 1, 200);
                      // IMPORTANT: You need the key to be based on all of the dynamically changing bits, otherwise you risk
                      // fetching the wrong cached style!!!
                      const styleKey = `s${size}-r${radius}-fs${fontSize}`;
                      // Key on radius
                      let style = styleCache.current[styleKey];
                      if (!style) {
                          style = [
                              new Style({
                                  // The outer "halo"
                                  image: new CircleStyle({
                                      radius: radius + 5,
                                      fill: new Fill({
                                          color: 'rgba(255, 255, 255, 0.6)'
                                      })
                                  })
                              }),
                              new Style({
                                  // The inner circle
                                  image: new CircleStyle({
                                      radius,
                                      fill: new Fill({
                                          color: '#BE6CF1'
                                      })
                                  }),
                                  text: new Text({
                                      font: `${fontSize}px sans-serif`,
                                      text: size.toString(),
                                      fill: new Fill({
                                          color: '#fff'
                                      })
                                  })
                              })
                          ];
                          styleCache.current[size] = style;
                      }
                      return style;
                  } else {
                      let style = styleCache.current['__default__'];
                      if (!style) {
                          style = new Style({
                              image: new CircleStyle({
                                  radius: 10,
                                  stroke: new Stroke({
                                      color: 'rgb(255, 255, 255)'
                                  }),
                                  fill: new Fill({
                                      color: '#BE6CF1'
                                  })
                              })
                          });
                          styleCache.current['__default__'] = style;
                      }
                      return style;
                  }
              }
            : undefined;
        if (!isReady) {
            return null;
        }
        const popupActive = allSelFeatures.length > 0;
        //console.log('popupActive', popupActive, 'allSelFeatures', allSelFeatures.length);
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
                    <SelectInteraction mode="click" features={selFeatures.current} />
                    <ContentOverlay isActive={popupActive} mouseTrackingMode="click" className="ol-popup">
                        <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                            <h3>Selection: {allSelFeatures.length}</h3>
                            <ul>
                                {allSelFeatures.map(f => (
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
            </>
        );
    }
};

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
        const features = React.useRef(new Collection<Feature>());
        const selMode = select('Selection mode', ['click', 'hover'], 'click');
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
        return (
            <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                <SelectInteraction mode={selMode} features={features.current} />
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
