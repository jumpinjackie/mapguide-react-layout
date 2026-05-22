import{j as e}from"./jsx-runtime-K9eJqVHq.js";import{D as d4,J as Se,n as u4,p as g}from"./index-CNuHfLfL.js";import{R as d}from"./index-ENwCdwpH.js";import{d as W,t as Je,M as p4,b as m4,X as y4,p as Fe,s as Me,V as ue,c as Pe,S as de,ah as f4,P as g4,f as $e,m as Te,I as Be,h as Ue,q as me,k as h4,O as S4,e as b4,E as Ne,al as _4}from"./base-CJD0ycUE.js";import{bN as Ie,ak as M4,aZ as Ye,cM as w4,o as _e,a_ as j4,bY as Xe,b9 as x4,bw as P4,bB as C4,cR as v4,h as Le,u as be,f as Ce,i as ye,w as E4,t as F4,I as L4}from"./Polygon-B8oXxD8-.js";/* empty css           */import{G as Oe}from"./TextFeature-_2W4W1jk.js";import{a as O}from"./index-Br0BFi8U.js";import"./string-Bp5eyemB.js";import"./index-BJqvPe6D.js";import"./iframe-BzySJZKT.js";import"./color-brewer-cOyr5rJR.js";import"./v4-CtRu48qb.js";const qe=d.createContext(void 0),T4=({map:t,domElement:r,renderDomBreadcrumbs:o,children:s})=>e.jsx(qe.Provider,{value:{map:t,domElement:r,renderDomBreadcrumbs:o},children:s});function k(){const t=d.useContext(qe);if(!t)throw new Error("No OLMapContext found in parent");return t}const Qe=d.createContext({addInfo:()=>{},addWarning:()=>{},addError:()=>{},infoMessages:[],warningMessages:[],errorMessages:[]}),I4=({children:t})=>{const[r,o]=d.useState([]),[s,n]=d.useState([]),[a,i]=d.useState([]),c={addInfo:l=>o(p=>[...p,l]),addWarning:l=>n(p=>[...p,l]),addError:l=>i(p=>[...p,l]),infoMessages:r,warningMessages:s,errorMessages:a};return e.jsx(Qe.Provider,{value:c,children:t})},N=()=>d.useContext(Qe),ve=({title:t,messages:r,locale:o,onClose:s})=>e.jsxs("div",{style:{padding:10,background:"white",position:"absolute",top:50,left:30},children:[e.jsx("h3",{children:t}),e.jsx("div",{style:{padding:10,width:300,maxHeight:200,overflow:"auto"},children:r.map((n,a)=>e.jsx("p",{children:n},`message-${a}`))}),e.jsx("button",{onClick:()=>s(),children:Se("ACTION_CLOSE",o)})]}),b=({style:t,locale:r=d4})=>{const o=N(),[s,n]=d.useState(!1),[a,i]=d.useState(!1),[c,l]=d.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"inline-flex",position:"absolute",top:30,left:30,...t},children:[e.jsxs("button",{onClick:()=>n(!s),children:["I: ",o.infoMessages.length]}),e.jsxs("button",{onClick:()=>i(!a),children:["W: ",o.warningMessages.length]}),e.jsxs("button",{onClick:()=>l(!c),children:["E: ",o.errorMessages.length]})]}),s&&e.jsx(ve,{title:Se("MSG_PANEL_INFO",r),messages:o.infoMessages,locale:r,onClose:()=>n(!1)}),a&&e.jsx(ve,{title:Se("MSG_PANEL_WARNING",r),messages:o.warningMessages,locale:r,onClose:()=>i(!1)}),c&&e.jsx(ve,{title:Se("MSG_PANEL_ERROR",r),messages:o.errorMessages,locale:r,onClose:()=>l(!1)})]})};function we(t,r){const o=d.useRef(void 0),[s,n]=d.useState(!1);return d.useEffect(()=>(o.current=t(),n(!0),()=>{o.current&&(r(o.current),n(!1),o.current=void 0)}),[]),[o.current,s]}function O4(t){return we(()=>{const o=new W(t.initialFeatures);return o.on("add",t.addHandler),o.on("remove",t.removeHandler),o},o=>{o.un("add",t.addHandler),o.un("remove",t.removeHandler)})}function e4(t){const[r,o]=d.useState([]);function s(c){const l=t.processFeatureToAdd?t.processFeatureToAdd(c):[c.element];t.addHandler?.(c),o(p=>[...p,...l])}function n(c){const l=t.processFeatureToRemove?t.processFeatureToRemove(c):[c.element];t.removeHandler?.(c),o(p=>p.filter(u=>!l.includes(u)))}const[a,i]=we(()=>{const c=new W(t.initialFeatures);return c.on("add",s),c.on("remove",n),c},c=>{c.un("add",s),c.un("remove",n)});return[a,i,r]}function je(t,r,o,s,n){const{map:a}=k(),i=N(),c=d.useRef(void 0);return d.useEffect(()=>{const l=r(a,i);return l&&(c.current=l,s?s(l,a.getInteractions(),i):a.addInteraction(l),i.addInfo(`added interaction: ${t}`)),()=>{c.current&&(a.removeInteraction(c.current),i.addInfo(`removed interaction: ${t}`),n?.(c.current),c.current.dispose(),c.current=void 0)}},o),c}function k4(t,r,o,s,n){const{map:a}=k(),i=N(),c=d.useRef(void 0);return d.useEffect(()=>{const l=r(a,i);return l&&(c.current=l,a.addControl(l),i.addInfo(`added control: ${t}`)),()=>{c.current&&(a.removeControl(c.current),i.addInfo(`removed control: ${t}`),c.current.dispose(),c.current=void 0)}},o),c}const _=({style:t,projection:r,initialBBOX:o,renderDomBreadcrumbs:s,minResolution:n,maxResolution:a,minZoom:i,maxZoom:c,children:l})=>{const p=d.useRef(null),[u,m]=we(()=>{const f=new Je({projection:r,minResolution:n,maxResolution:a,minZoom:i,maxZoom:c}),y=new p4({target:p.current,layers:[],controls:[new m4({collapsible:!0})],view:f});return o&&!Ie(o)&&y.getView().fit(o),y},f=>{f.setTarget(void 0),f.dispose()});return e.jsx("div",{style:t,ref:p,children:m&&u&&e.jsx(T4,{map:u,domElement:p.current,renderDomBreadcrumbs:s??!1,children:e.jsx(I4,{children:l})})})};function ke(t,r,o){const s=N(),n=d.useRef(void 0);return d.useEffect(()=>{n.current&&(n.current.get("name")!==t&&(s.addInfo(`Apply new layer name: ${t}`),n.current.set("name",t)),n.current.getVisible()!=!r&&(s.addInfo(`Apply new layer visibility: ${!r}`),n.current.setVisible(!r)),n.current.getExtent()!=o&&(s.addInfo(`Apply new layer extent: ${o}`),n.current.setExtent(o)))},[t,r,o]),n}const D=({component:t})=>e.jsx("span",{"data-map-component":t,style:{display:"none"}}),M=({name:t,isHidden:r,extent:o,urls:s,attributions:n})=>{const{map:a,renderDomBreadcrumbs:i}=k(),c=N(),l=ke(t,r,o);return d.useEffect(()=>{if(!l.current){c.addInfo("add xyz layer");const p=new y4({crossOrigin:"anonymous",urls:s,attributions:n}),u=new Fe({extent:o,source:p});u.set("name",t),l.current=u,a.addLayer(u)}return()=>{l.current&&(a.removeLayer(l.current),c.addInfo("removed xyz layer"),l.current.dispose(),l.current=void 0)}},[]),i?e.jsx(D,{component:"XYZLayer"}):null},T=({name:t,isHidden:r,extent:o,features:s,initialFeatures:n,initialFeatureProjection:a,fitInitialViewToThisLayer:i,clusterSettings:c,style:l,onFeaturesClicked:p})=>{const{map:u,renderDomBreadcrumbs:m}=k(),f=N(),y=ke(t,r,o);function v(L,h){const C=L.getSource();if(h)if(C instanceof Pe)h.distance!==C.getDistance()&&(f.addInfo("Updating cluster distance"),C.setDistance(h.distance)),h.minDistance!==C.getMinDistance()&&(f.addInfo("Updating cluster min distance"),C.setMinDistance(h.minDistance??0)),h.attributions!==C.getAttributions()&&(f.addInfo("Updating cluster attributions"),C.setAttributions(h.attributions));else{f.addInfo("apply clustering to vector layer");const I=new Pe({distance:h.distance,minDistance:h.minDistance??0,attributions:h.attributions,source:C});L.setSource(I)}else if(C instanceof Pe){const I=C.getSource();f.addInfo("vector layer has clustering applied, removing it"),L.setSource(I)}else f.addInfo("vector layer does not have clustering applied, no action needed")}const S=d.useRef(p);return d.useEffect(()=>{S.current=p},[p]),d.useEffect(()=>{y.current&&v(y.current,c)},[c,y]),d.useEffect(()=>{function L(h){if(y.current&&S.current){const C=[];u.forEachFeatureAtPixel(h.pixel,(I,B)=>{B===y.current&&C.push(I)}),S.current(h,u,C)}}if(u.on("click",L),!y.current){f.addInfo("add vector layer");const h=new Me({features:s??[]}),C=new ue({extent:o,source:h,style:l});if(C.set("name",t),n){const B=new Oe().readFeatures(n,{featureProjection:u.getView().getProjection(),dataProjection:a??"EPSG:4326"});h.addFeatures(B)}if(y.current=C,v(y.current,c),u.addLayer(C),i){const I=h.getExtent();I&&!Ie(I)&&u.getView().fit(I)}}return()=>{u.un("click",L),y.current&&(u.removeLayer(y.current),f.addInfo("removed vector layer"),y.current.dispose(),y.current=void 0)}},[]),m?e.jsx(D,{component:"VectorLayer"}):null};function A4(t){return!1}function R4(t){switch(t){case"click":return g4;case"hover":return f4;case"never":return A4;default:u4()}}function V4(){const t=M4();return Ye(t.Polygon,t.LineString),Ye(t.GeometryCollection,t.LineString),r=>{const o=r.getGeometry();return o?t[o.getType()]:null}}const pe=({mode:t,features:r,layers:o,style:s,onSelectionChanged:n})=>{const{renderDomBreadcrumbs:a}=k();function i(c){n?.(c)}return je("Select",c=>{const l=new de({style:s??V4(),condition:R4(t),features:r,layers:p=>Array.isArray(o)?o.includes(p.get("name")):!0});return l.on("select",i),l},[t,r,o],void 0,c=>{c.un("select",i)}),a?e.jsx(D,{component:"SelectInteraction"}):null};function t4(t,r,o,s){let n=-1;for(let a=0;a<r.getLength();a++){for(const i of s)if(r.item(a)instanceof i){n=a;break}if(n>=0)break}n>=0?(r.insertAt(n,t),o.addInfo(`Interaction added at index ${n} (new size: ${r.getLength()})`)):r.push(t)}function He(t,r,o,s,n){const a=Math.max(s,Math.min(t,n));return r+(a-s)/(n-s)*(o-r)}const Y=({type:t,target:r,style:o,cancelKey:s,undoLastPointKey:n})=>{const{renderDomBreadcrumbs:a}=k(),i=je("Draw",(l,p)=>{let u;if(typeof r=="string"){const m=l.getAllLayers().find(f=>f.get("name")===r);m?m instanceof ue?u=m.getSource():p.addError(`Layer is not a vector layer: ${r}`):p.addWarning(`Layer not found: ${r}`)}else u=r;if(u){let m={type:t,style:o??void 0};return u instanceof Me?m.source=u:m.features=u,new $e(m)}},[t,r,o],(l,p,u)=>{t4(l,p,u,[Te])}),c=d.useCallback(l=>{i.current&&(s&&s.includes(l.key)?i.current.abortDrawing():n&&n.includes(l.key)&&i.current.removeLastPoint())},[s,n,i.current]);return d.useEffect(()=>(window.addEventListener("keydown",c),()=>{window.removeEventListener("keydown",c)}),[c]),a?e.jsx(D,{component:"DrawInteraction"}):null},Ae=({name:t,isHidden:r,extent:o,url:s,layerName:n,customParams:a,tiled:i,infoFormat:c,onGetFeatureInfo:l})=>{const{map:p,renderDomBreadcrumbs:u}=k(),m=N(),f=ke(t,r,o),y=d.useRef(void 0);function v(P,E,F,A,R){const V=new me({crossOrigin:"anonymous",url:P,params:{LAYERS:E,TILED:!0,...F}}),U=new Fe({extent:A,source:V});f.current=U,y.current=V,m.addInfo("add tiled wms layer"),p.addLayer(f.current)}function S(P,E){return Object.keys(P).length===Object.keys(E).length&&Object.keys(P).every(F=>P[F]===E[F])}function L(P,E,F){if(y.current){const A=y.current.getParams(),R={...F,LAYERS:E};if(y.current instanceof me&&(R.TILED=!0),S(A,R)||(m.addInfo("Apply new WMS request params"),y.current.setParams(R)),y.current instanceof me){const V=y.current.getUrls(),U=[P];(V.length!==U.length||!V.every((c4,l4)=>c4===U[l4]))&&(m.addInfo("Apply new WMS urls"),y.current.setUrls(U))}else y.current.getUrl()!=P&&(m.addInfo("Apply new WMS url"),y.current.setUrl(P))}else m.addWarning("No WMS source attached. Doing nothing")}function h(P,E,F,A,R){const V=new Ue({crossOrigin:"anonymous",url:P,params:{LAYERS:E,...F}}),U=new Be({extent:A,source:V});f.current=U,y.current=V,m.addInfo("add untiled wms layer"),p.addLayer(f.current)}function C(P,E,F,A,R){A?f.current?f.current instanceof Be&&y.current instanceof Ue?(I(),v(P,E,F,R)):L(P,E,F):v(P,E,F,R):f.current?f.current instanceof Fe&&y.current instanceof me?(I(),h(P,E,F,R)):L(P,E,F):h(P,E,F,R)}function I(){f.current&&(p.removeLayer(f.current),m.addInfo("removed wms layer"),f.current=void 0),y.current&&(y.current.dispose(),m.addInfo("disposed wms source"),y.current=void 0)}d.useEffect(()=>{C(s,n,a,i,o)},[s,n,a,i,o]),d.useEffect(()=>()=>{I()},[]);const B=d.useCallback(P=>{if(y.current&&l){const E=p.getView().getResolution();if(E){const F=y.current.getFeatureInfoUrl(P.coordinate,E,p.getView().getProjection(),{INFO_FORMAT:c});F&&fetch(F).then(A=>A.text()).then(A=>l(A))}}},[l,c]);return d.useEffect(()=>(p.on("singleclick",B),m.addInfo("attached singleclick handler to wms layer"),()=>{p.un("singleclick",B),m.addInfo("detached singleclick handler from wms layer")}),[B]),u?e.jsx(D,{component:"WMSLayer"}):null},Re=({target:t,onFeaturesModified:r})=>{const{renderDomBreadcrumbs:o}=k(),s=d.useRef(void 0),n=d.useCallback(a=>{let i={};if(typeof t=="string"){const l=a.getAllLayers().find(p=>p.get("name")===t);l instanceof ue&&(i.source=l.getSource())}else i.features=t;const c=new h4(i);return s.current=c.on("modifyend",l=>{r?.(l.features)}),c},[t]);return je("Modify",n,[t],(a,i,c)=>{t4(a,i,c,[$e,Te])},a=>{s.current&&w4(s.current)}),o?e.jsx(D,{component:"ModifyInteraction"}):null},X=({target:t})=>{const{renderDomBreadcrumbs:r}=k();return je("Snap",(o,s)=>{let n;if(typeof t=="string"){const a=o.getAllLayers().find(i=>i.get("name")===t);a?a instanceof ue?n=a.getSource():s.addError(`Layer is not a vector layer: ${t}`):s.addWarning(`Layer not found: ${t}`)}else n=t;if(n){const a={};return n instanceof Me?a.source=n:a.features=n,new Te(a)}},[t]),r?e.jsx(D,{component:"SnapInteraction"}):null};function r4(t,r,o){if(r.length===0)return!1;const s=r[0]?.get("features");if(s&&s.length>o){const n=[];for(const a of s){const i=a.getGeometry();i&&i instanceof _e&&n.push(i.getCoordinates())}if(n.length>0){const a=[n[0][0],n[0][1],n[0][0],n[0][1]];for(let i=1;i<n.length;i++)j4(a,n[i]);if(a&&!Ie(a))return t.getView().fit(a,{duration:1e3,padding:[50,50,50,50]}),!0}}return!1}function D4(t,r,o,s=1){r4(r,o,s)}function o4(t,r,o,s=1){const n=r.getInteractions().getArray().find(i=>i instanceof de);if(n instanceof de&&n.getFeatures().clear(),r4(r,o,s)){if(W4(r)&&n instanceof de)for(const i of o)n.getFeatures().push(i)}else if(o[0]?.get("features")&&n instanceof de)for(const c of o)n.getFeatures().push(c)}function W4(t){const r=t.getView(),o=r.getZoom(),s=r.getMaxZoom();return o===s}const Ze=[15,0],ze="center-left",xe=({className:t,style:r,offset:o,positioning:s,isActive:n,mouseTrackingMode:a,onPositionChange:i,children:c})=>{const{map:l}=k(),p=d.useRef(null),u=d.useRef(null),m=d.useRef(a);function f(v){let S=!1;switch(v.type){case"singleclick":S=m.current==="click";break;case"pointermove":S=m.current==="hover";break}S&&u.current&&(u.current.setPosition(v.coordinate),i?.(v.coordinate))}d.useEffect(()=>{m.current=a},[a]),d.useEffect(()=>{u.current&&(u.current.setOffset(o??Ze),u.current.setPositioning(s??ze))},[o,s]),d.useEffect(()=>{(m.current==="click"||m.current==="hover"&&!n)&&u.current?.setPosition(void 0)},[n]),d.useEffect(()=>(u.current=new S4({element:p.current,offset:o??Ze,positioning:s??ze}),l.addOverlay(u.current),l.on("singleclick",f),l.on("pointermove",f),()=>{l.un("singleclick",f),l.on("pointermove",f),u.current&&l.removeOverlay(u.current)}),[]);const y={...r};return n||(y.display="none"),e.jsx("div",{className:t,style:y,ref:p,children:c})},Ee="projection",Ke="coordinateFormat";class G4 extends b4{constructor(r){r=r||{};const o=document.createElement("div");o.className=r.className!==void 0?r.className:"ol-mouse-position",super({element:o,render:r.render,target:r.target}),this.on,this.once,this.un,this.addChangeListener(Ee,this.handleProjectionChanged_),r.coordinateFormat&&this.setCoordinateFormat(r.coordinateFormat),r.projection&&this.setProjection(r.projection),this.renderOnMouseOut_=r.placeholder!==void 0,this.placeholder_=this.renderOnMouseOut_?r.placeholder:"&#160;",this.renderedHTML_=o.innerHTML,this.mapProjection_=null,this.transform_=null,this.wrapX_=r.wrapX!==!1}handleProjectionChanged_(){this.transform_=null}getCoordinateFormat(){return this.get(Ke)}getProjection(){return this.get(Ee)}handleMouseMove(r){const o=this.getMap();this.updateHTML_(o.getEventPixel(r))}handleMouseOut(r){this.updateHTML_(null)}setMap(r){if(super.setMap(r),r){const o=r.getViewport();this.listenerKeys.push(Xe(o,Ne.POINTERMOVE,this.handleMouseMove,this)),this.renderOnMouseOut_&&this.listenerKeys.push(Xe(o,Ne.POINTEROUT,this.handleMouseOut,this)),this.updateHTML_(null)}}setCoordinateFormat(r){this.set(Ke,r)}setProjection(r){this.set(Ee,x4(r))}updateHTML_(r){let o=this.placeholder_;if(r&&this.mapProjection_){if(!this.transform_){const a=this.getProjection();a?this.transform_=P4(this.mapProjection_,a):this.transform_=C4}const n=this.getMap().getCoordinateFromPixelInternal(r);if(n){if(this.transform_(n,n),this.wrapX_){const i=this.getProjection()||this.mapProjection_;v4(n,i)}const a=this.getCoordinateFormat();a?o=a(n):o=n.toString()}}(!this.renderedHTML_||o!==this.renderedHTML_)&&(this.element.innerHTML=o,this.renderedHTML_=o)}render(r){const o=r.frameState;o?this.mapProjection_!=o.viewState.projection&&(this.mapProjection_=o.viewState.projection,this.transform_=null):this.mapProjection_=null}}const n4=({className:t,coordinateFormat:r,placeholder:o,displayProjection:s})=>{const{renderDomBreadcrumbs:n}=k();return k4("MousePosition",(a,i)=>new G4({className:t,coordinateFormat:r,placeholder:o,projection:s}),[t,r,o,s]),n?e.jsx(D,{component:"MousePositionControl"}):null},B4=({name:t,addFunctionName:r,clearFunctionName:o})=>{const s=d.useRef(new W),n=d.useRef([{style:{"circle-radius":5,"circle-fill-color":"rgba(255,255,255,0.4)","circle-stroke-color":"#3399CC","circle-stroke-width":1.25,"fill-color":"rgba(255,255,255,0.4)","stroke-color":"#3399CC","stroke-width":1.25,"text-font":"12px sans-serif","text-fill-color":"#000","text-stroke-color":"#fff","text-stroke-width":2,"text-offset-x":10,"text-align":"left","text-value":["get","label"]}}]);return d.useEffect(()=>{window[r]=(a,i)=>{const c=new Le({geometry:new _e(a)});c.setProperties({label:i}),c.setId(`debug-point-${Date.now()}`),s.current.push(c)},window[o]=()=>{s.current.clear()}},[]),e.jsx(T,{name:t,style:n.current,features:s.current})},G={type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:{coordinates:[[[1.3972908770953154,16.2897565165336],[4.413185071053448,.3010733575690665],[16.680466124627827,-1.0588452216285873],[22.202660615702342,29.09356884933281],[-.1752826146531561,27.310204698406423],[1.3972908770953154,16.2897565165336]]],type:"Polygon"}},{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[33.23736262616734,1.2773658004138138],[31.76923279904573,1.207351511808443],[30.31449953297534,.9979932653489738],[28.88637202152536,.6513317953680383],[27.497695754233618,.17072549915618648],[26.160797042553842,-.43921069265407003],[24.887356025330313,-1.1726850434994245],[23.68831286705868,-2.0228222746246507],[22.57380866505103,-2.9817648443757263],[21.55315947702565,-4.0407767862405795],[20.63485917780145,-5.190345174158043],[19.826604746127266,-6.420275166865659],[19.1353361408635,-7.71977570413115],[18.567282117922687,-9.077534172149763],[18.12800306871546,-10.481779629944493],[17.8224221088854,-11.92033542839683],[17.654836113208948,-13.380663221118887],[17.62889912970455,-14.849901444346187],[17.74757163559271,-16.314902322127924],[18.013030521479205,-17.76227231779432],[18.426536682295755,-19.17842166604925],[18.988259875271673,-20.549629109927785],[19.69706429362044,-21.862128116449703],[20.55026323069545,-23.102220491857224],[21.543357204265412,-24.256422268146547],[22.669776573294318,-25.311644797002273],[23.92065616176625,-26.25541103840628],[25.28467437399567,-27.07610308685447],[26.74799105146885,-27.763232286639667],[28.29431517516105,-28.307718386839685],[29.90512429715082,-28.702159892336258],[31.560042320185094,-28.941075054774036],[33.23736262616734,-29.021092720959512],[34.91468293214959,-28.941075054774036],[36.56960095518386,-28.702159892336265],[38.180410077173626,-28.307718386839685],[39.72673420086581,-27.763232286639674],[41.19005087833901,-27.07610308685447],[42.55406909056843,-26.25541103840628],[43.804948679040365,-25.311644797002273],[44.93136804806927,-24.256422268146558],[45.924462021639236,-23.10222049185722],[46.777660958714236,-21.862128116449714],[47.486465377063006,-20.5496291099278],[48.04818857003893,-19.178421666049246],[48.46169473085548,-17.76227231779432],[48.72715361674197,-16.314902322127935],[48.84582612263012,-14.849901444346187],[48.81988913912574,-13.38066322111889],[48.65230314344928,-11.920335428396836],[48.34672218361922,-10.481779629944493],[47.907443134412,-9.077534172149766],[47.339389111471185,-7.719775704131147],[46.648120506207405,-6.420275166865659],[45.83986607453324,-5.190345174158049],[44.921565775309034,-4.0407767862405795],[43.90091658728365,-2.981764844375729],[42.786412385276,-2.0228222746246556],[41.587369227004366,-1.1726850434994245],[40.31392820978084,-.4392106926540732],[38.97702949810106,.17072549915618807],[37.58835323080933,.6513317953680352],[36.160225719359346,.9979932653489723],[34.70549245328895,1.207351511808443],[33.23736262616734,1.2773658004138138]]]}},{type:"Feature",properties:{},geometry:{coordinates:[[32.34789678028915,40.237339281096695],[47.00555322967003,12.003088721789652],[69.87747968418157,-12.53366593814718],[69.29717640425835,7.1697865257791875]],type:"LineString"}},{type:"Feature",properties:{},geometry:{coordinates:[-7.2088250549489885,25.5369227390441],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[-10.522579543848423,19.592512486670216],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[-10.278259811307663,12.849972969567503],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[-6.385418396463308,7.808853732378495],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[30.798673110973596,15.790842549111687],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[[[-28.579193451994,19.49728925204832],[-63.940377731487374,8.337862813426952],[-68.23826347994319,-15.564632393267217],[-47.734990414965154,-36.982592430604385],[-14.143603069712242,-22.548913435843843],[-22.848102880634627,-2.0534307868758077],[-28.579193451994,19.49728925204832]]],type:"Polygon"}},{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[-94.03654227448723,49.724005930947776],[-96.21131898274035,49.63664804210488],[-98.34520786211812,49.3763448599076],[-100.39952785863083,48.94829544264444],[-102.33970897943517,48.360808087656814],[-104.13666666799581,47.62482262434187],[-105.76754037487233,46.7533407774069],[-107.21581641079716,45.76083327695023],[-108.47095004178489,44.662681506504995],[-109.52764898746828,43.474693192804274],[-110.38498297301375,42.21271202013059],[-111.04545643917348,40.892324476683086],[-111.51414098231906,39.528655739308036],[-111.79792379945037,38.13624006059436],[-111.90489572545873,36.728948912099646],[-111.84387972203427,35.31996068352718],[-111.62408713280787,33.92175779357796],[-111.25488251681693,32.5461397168278],[-110.74563607402948,31.20424310085497],[-110.10564362371616,29.906562543447627],[-109.34409638280793,28.66296761130908],[-108.47008552449631,27.482713306981747],[-107.49262917986309,26.374442478537066],[-106.4207119491042,25.34617968120032],[-105.2633290510561,24.40531680134484],[-104.0295289871686,23.558591387302013],[-102.72845009483,22.812059127775047],[-101.36934768805506,22.17106229151582],[-99.96160969169235,21.64019619354574],[-98.5147598065277,21.223275878486437],[-97.03844830841804,20.92330520332505],[-95.54243157098085,20.742450355961495],[-94.03654227448723,20.682019565230647],[-92.53065297799361,20.742450355961495],[-91.03463624055642,20.92330520332505],[-89.55832474244674,21.22327587848643],[-88.11147485728213,21.640196193545737],[-86.7037368609194,22.17106229151582],[-85.34463445414447,22.81205912777505],[-84.04355556180586,23.558591387302013],[-82.80975549791837,24.40531680134484],[-81.65237259987028,25.346179681200322],[-80.58045536911136,26.37444247853706],[-79.60299902447815,27.48271330698174],[-78.72898816616652,28.662967611309085],[-77.9674409252583,29.906562543447627],[-77.32744847494497,31.204243100854963],[-76.81820203215753,32.5461397168278],[-76.4489974161666,33.92175779357796],[-76.22920482694019,35.31996068352717],[-76.16818882351573,36.728948912099646],[-76.27516074952409,38.13624006059436],[-76.55894356665539,39.528655739308036],[-77.027628109801,40.892324476683086],[-77.68810157596072,42.21271202013058],[-78.54543556150618,43.474693192804274],[-79.60213450718958,44.66268150650499],[-80.85726813817729,45.76083327695022],[-82.30554417410212,46.7533407774069],[-83.93641788097865,47.62482262434187],[-85.73337556953929,48.36080808765682],[-87.6735566903436,48.94829544264443],[-89.72787668685632,49.3763448599076],[-91.8617655662341,49.63664804210488],[-94.03654227448723,49.724005930947776]]]}},{type:"Feature",properties:{},geometry:{coordinates:[[[70.86072290913529,62.497275615414054],[44.47129752503275,62.497275615414054],[44.47129752503275,49.74281160330838],[70.86072290913529,49.74281160330838],[70.86072290913529,62.497275615414054]]],type:"Polygon"}},{type:"Feature",properties:{},geometry:{coordinates:[[[99.8537278232053,44.49339775209944],[57.798303539837804,34.40764003286317],[73.2254129844587,17.638667081777413],[104.40558058356345,11.09867641807078],[123.71418584352563,13.909853012702968],[121.51104416053965,30.28646109152352],[120.81499819803918,30.468271556120214],[117.98985712537717,40.642572386885945],[99.8537278232053,44.49339775209944]]],type:"Polygon"}},{type:"Feature",properties:{},geometry:{coordinates:[152.03562883988286,-15.541513924777746],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[149.0904596660833,-35.10978479437297],type:"Point"}},{type:"Feature",properties:{},geometry:{coordinates:[[[124.59430164597114,-3.867367206547158],[90.27104880465458,-11.95917253555156],[92.76206633675605,-23.57533654042487],[101.18001104560875,-35.00151782449884],[136.29467618407955,-22.652064732109693],[129.91052604457235,-11.521912332863195],[124.59430164597114,-3.867367206547158]]],type:"Polygon"}},{type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[[[127.14082360335435,-15.569544800358768],[124.93798226146671,-15.655067708625927],[122.74759358870449,-15.911027268835445],[120.58200020502171,-16.33560754130454],[118.45333530795071,-16.925819615177918],[116.37344384711712,-17.67755516893676],[114.35383263800358,-18.585655890774042],[112.40565587730397,-19.643993800342095],[110.53974042315647,-20.84555684823571],[108.76665320886697,-22.182533896025046],[107.09681148740863,-23.646393239581563],[105.54063538277374,-25.227949135871835],[104.10874146668124,-26.917411213764083],[102.81217567552373,-28.704412078860702],[101.6626835909929,-30.57800876476002],[100.67301553371689,-32.526653874415715],[99.85726246720922,-34.53813227796999],[99.2312154958992,-36.59945913643035],[98.81273545550088,-38.696734951759524],[98.62210781211859,-40.81495360730772],[98.68233907465854,-42.937760512625104],[99.01932057032678,-45.047160953210515],[99.66173964023528,-47.12318510531531],[100.64055411471983,-49.143528219338485],[101.98776569042228,-51.083205290533094],[103.7341480225071,-52.9142923628854],[105.90555118379714,-54.60587273247563],[108.51750618429732,-56.124360280697736],[111.56822705448583,-57.43441395585879],[115.03087373688581,-58.50064505905133],[118.84703278867303,-59.290193665650186],[122.92431329112907,-59.77597322451365],[127.14082360335435,-59.9400046286456],[131.35733391557963,-59.77597322451365],[135.43461441803566,-59.290193665650186],[139.2507734698229,-58.50064505905133],[142.71342015222288,-57.4344139558588],[145.7641410224114,-56.124360280697736],[148.37609602291155,-54.60587273247563],[150.54749918420163,-52.9142923628854],[152.2938815162864,-51.083205290533094],[153.64109309198886,-49.14352821933848],[154.61990756647342,-47.12318510531532],[155.2623266363819,-45.047160953210515],[155.59930813205017,-42.937760512625104],[155.6595393945901,-40.81495360730772],[155.4689117512078,-38.69673495175954],[155.0504317108095,-36.59945913643035],[154.4243847394995,-34.53813227796999],[153.60863167299183,-32.52665387441573],[152.6189636157158,-30.57800876476002],[151.46947153118498,-28.704412078860706],[150.1729057400275,-26.91741121376408],[148.74101182393497,-25.227949135871835],[147.18483571930008,-23.646393239581567],[145.51499399784174,-22.182533896025046],[143.74190678355222,-20.84555684823571],[141.87599132940477,-19.643993800342102],[139.92781456870514,-18.585655890774042],[137.9082033595916,-17.67755516893676],[135.828311898758,-16.925819615177915],[133.69964700168703,-16.335607541304547],[131.53405361800424,-15.911027268835449],[129.34366494524198,-15.655067708625927],[127.14082360335435,-15.569544800358768]]]}}]},w=["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],j=["(c) OpenStreetMap contributors"],U4=[-180,90,180,90],Ve=[-2003750834e-2,-200489661e-1,2003750834e-2,200489661e-1];function De(t=2e4){return we(()=>{const o=new Array(t),s=45e5;let n=1;for(let a=0;a<t;++a){const i=[2*s*Math.random()-s,2*s*Math.random()-s];o[a]=new Le(new _e(i)),o[a].setId(n++)}for(let a=0;a<20;a++){const i=new Le(new _e([12894315175483e-6,-3755045451538e-6]));i.setId(n++),o.push(i)}return new W(o)},()=>{})}function a4(t){const r=d.useRef({});return t?s=>{const n=s.get("features")?.length;if(n&&n>0){const a=He(n,10,40,1,200),i=He(n,10,24,1,200),c=`s${n}-r${a}-fs${i}`;let l=r.current[c];return l||(l=[new be({image:new Ce({radius:a+5,fill:new ye({color:"rgba(255, 255, 255, 0.6)"})})}),new be({image:new Ce({radius:a,fill:new ye({color:"#BE6CF1"})}),text:new E4({font:`${i}px sans-serif`,text:n.toString(),fill:new ye({color:"#fff"})})})],r.current[n]=l),l}else{let a=r.current.__default__;return a||(a=new be({image:new Ce({radius:10,stroke:new F4({color:"rgb(255, 255, 255)"}),fill:new ye({color:"#BE6CF1"})})}),r.current.__default__=a),a}}:void 0}const s4=({onMapViewChanged:t})=>{const{map:r,renderDomBreadcrumbs:o}=k();return d.useEffect(()=>{const s=r.getView();function n(a){a.target instanceof Je&&t?.(r,a.target)}return s.on("change",n),()=>{s.un("change",n)}},[r,t]),o?e.jsx(D,{component:"ViewListener"}):null},N4=`This group showcases the standalone compact map viewer and its composable building blocks.

## What is included
- Base map and projection setup examples
- Layer composition with XYZ, WMS, and vector sources
- Drawing, selection, modify, and snap interactions
- Message overlays and compact viewer controls

## Recommended use
Use these stories to validate compact-viewer behavior in isolation, especially interaction combinations and rendering behavior under different map configurations.
`,Y4="FeatureCollection",X4=[{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.1",geometry:{type:"MultiPolygon",coordinates:[[[[144.5840387,-37.48702499],[144.58421071,-37.48613996],[144.58679391,-37.48645981],[144.58655004,-37.48786497],[144.58672513,-37.48788629],[144.58782636,-37.48802149],[144.58802295,-37.48805247],[144.58815853,-37.48807864],[144.58927922,-37.48822991],[144.58947482,-37.48825884],[144.58945127,-37.48837868],[144.589607,-37.48838959],[144.59018171,-37.48845105],[144.59014373,-37.48866633],[144.59014713,-37.48866673],[144.59010247,-37.48887691],[144.59013284,-37.48888045],[144.59008499,-37.48912157],[144.59060079,-37.48918516],[144.59094033,-37.48924418],[144.59095828,-37.48915154],[144.59129721,-37.48919651],[144.59240832,-37.48933452],[144.59275267,-37.48937674],[144.59285756,-37.48930783],[144.59286513,-37.48930843],[144.59297312,-37.48924283],[144.59296536,-37.48924191],[144.59299474,-37.48922066],[144.59288444,-37.48920527],[144.59305073,-37.48909748],[144.59306578,-37.48910202],[144.59309173,-37.48904912],[144.59309722,-37.48904978],[144.59313676,-37.48888592],[144.59291769,-37.48885995],[144.5930243,-37.48830859],[144.5933056,-37.48834189],[144.59371314,-37.48844358],[144.59444352,-37.48842448],[144.59494038,-37.48842175],[144.59494038,-37.48842175],[144.59529111,-37.48851756],[144.59575365,-37.48868455],[144.59641094,-37.48919234],[144.59546277,-37.48998725],[144.59563528,-37.49020735],[144.59590437,-37.4904036],[144.59620584,-37.49062346],[144.59662932,-37.49100353],[144.59689639,-37.4912471],[144.59717962,-37.49145949],[144.59745689,-37.49172136],[144.59775304,-37.49191833],[144.59816691,-37.49222327],[144.59834862,-37.49237593],[144.59873783,-37.49271126],[144.59899115,-37.49287951],[144.59926354,-37.49298755],[144.599164,-37.49315131],[144.59893616,-37.49304785],[144.59874262,-37.49302424],[144.59832462,-37.49297325],[144.595749,-37.4926649],[144.59442373,-37.49251695],[144.59041852,-37.49200874],[144.59040892,-37.49205237],[144.59038214,-37.49217411],[144.59034104,-37.49230403],[144.59027369,-37.49249321],[144.59022278,-37.49263617],[144.58995453,-37.49259939],[144.58942172,-37.4925314],[144.58883502,-37.49245653],[144.58893624,-37.49192198],[144.5889399,-37.49183674],[144.58877355,-37.49181739],[144.58732899,-37.49163891],[144.58665397,-37.49155532],[144.58586201,-37.49145723],[144.58518062,-37.49137285],[144.58406595,-37.49122095],[144.58384944,-37.49118146],[144.58346008,-37.49112977],[144.58311952,-37.49108455],[144.58326019,-37.49030462],[144.58222909,-37.49017098],[144.58200288,-37.49018734],[144.58211623,-37.48963682],[144.58162981,-37.48957325],[144.58171608,-37.4891539],[144.58192736,-37.48796939],[144.58204425,-37.4874012],[144.58211765,-37.48706125],[144.58216712,-37.48677225],[144.5827349,-37.48683166],[144.5840387,-37.48702499]]]]},geometry_name:"geom",properties:{id:1,ch_area:"Incremental Change Area 1",label:"ICA1"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.2",geometry:{type:"MultiPolygon",coordinates:[[[[144.59818386,-37.45936356],[144.59944631,-37.45961538],[144.59911649,-37.46052157],[144.59849947,-37.46221679],[144.59789408,-37.46207468],[144.59787726,-37.46214024],[144.59749483,-37.46320733],[144.59692779,-37.46309601],[144.59681756,-37.46308304],[144.59710579,-37.46229848],[144.59700318,-37.4622531],[144.59699754,-37.46226839],[144.59646234,-37.46213515],[144.59650521,-37.46201883],[144.59593646,-37.46194938],[144.59623815,-37.46106985],[144.59693952,-37.46116035],[144.59697033,-37.46098124],[144.59689377,-37.46097049],[144.59744865,-37.45942578],[144.59747813,-37.45934733],[144.59813275,-37.45950269],[144.59818386,-37.45936356]]]]},geometry_name:"geom",properties:{id:2,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.3",geometry:{type:"MultiPolygon",coordinates:[[[[144.599164,-37.49315131],[144.599164,-37.49315131],[144.5997518,-37.49357472],[144.59998173,-37.49367423],[144.60196189,-37.49514755],[144.60439534,-37.49679236],[144.60588594,-37.49788403],[144.60582733,-37.49799853],[144.60581211,-37.49800524],[144.60567914,-37.49806387],[144.60546182,-37.49808761],[144.60489893,-37.49802133],[144.60444007,-37.49796731],[144.59687221,-37.4971056],[144.59416013,-37.49678797],[144.59215973,-37.49655811],[144.58969984,-37.49627086],[144.58971207,-37.49604686],[144.58980376,-37.4953495],[144.58999294,-37.49423508],[144.59008374,-37.4935515],[144.59022278,-37.49263617],[144.59027369,-37.49249321],[144.59034104,-37.49230403],[144.59038214,-37.49217411],[144.59040896,-37.49205222],[144.59041852,-37.49200874],[144.59832462,-37.49297325],[144.59874262,-37.49302424],[144.59893616,-37.49304785],[144.599164,-37.49315131]]]]},geometry_name:"geom",properties:{id:3,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.4",geometry:{type:"MultiPolygon",coordinates:[[[[144.58732899,-37.49163891],[144.58692806,-37.49369226],[144.58676715,-37.4936807],[144.58452497,-37.49345436],[144.58451581,-37.49345338],[144.58366411,-37.49334456],[144.58367191,-37.49326175],[144.58376055,-37.49278569],[144.5838639,-37.49225587],[144.58404697,-37.49131792],[144.58406595,-37.49122095],[144.58518062,-37.49137285],[144.58665397,-37.49155532],[144.58732899,-37.49163891]]]]},geometry_name:"geom",properties:{id:4,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.5",geometry:{type:"MultiPolygon",coordinates:[[[[144.59944631,-37.45961538],[144.59977614,-37.4596831],[144.60006055,-37.4597415],[144.60039585,-37.45983213],[144.600503,-37.4598715],[144.60057929,-37.45980414],[144.602367,-37.46018408],[144.60314483,-37.4603442],[144.60417616,-37.46028486],[144.60391208,-37.46143401],[144.60373643,-37.46219403],[144.60347661,-37.46333868],[144.6034668,-37.46338308],[144.60248555,-37.46787618],[144.59986668,-37.46752638],[144.60025893,-37.46643489],[144.60025946,-37.4664323],[144.60026634,-37.4663981],[144.6000561,-37.46637004],[144.60004831,-37.46640952],[144.59894153,-37.46626936],[144.59579851,-37.46586754],[144.59681756,-37.46308304],[144.59749483,-37.46320733],[144.59787726,-37.46214024],[144.59789408,-37.46207468],[144.59849947,-37.46221679],[144.59911649,-37.46052157],[144.59944631,-37.45961538]]]]},geometry_name:"geom",properties:{id:5,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.6",geometry:{type:"MultiPolygon",coordinates:[[[[144.58000965,-37.50781738],[144.58082695,-37.50335486],[144.58083133,-37.50333107],[144.58476184,-37.50378721],[144.58503327,-37.50232791],[144.58533943,-37.50069886],[144.58533855,-37.50069879],[144.58556201,-37.49947714],[144.58557174,-37.49940898],[144.58583166,-37.49943813],[144.58587346,-37.49932845],[144.58616595,-37.49872033],[144.5868861,-37.49819762],[144.58707858,-37.4982212],[144.58762747,-37.49647147],[144.58825493,-37.49654592],[144.58849758,-37.4965747],[144.58920521,-37.49665865],[144.58958582,-37.49669663],[144.58948998,-37.49721066],[144.58911235,-37.49971275],[144.58915304,-37.49979354],[144.58923154,-37.499822],[144.58927534,-37.49982685],[144.59155374,-37.5000791],[144.59339599,-37.50029922],[144.59354604,-37.50031715],[144.5935281,-37.50041166],[144.59347818,-37.50067452],[144.59347667,-37.50081986],[144.59350928,-37.50092589],[144.59358528,-37.5010617],[144.5936277,-37.50122843],[144.59361542,-37.50139628],[144.593606,-37.50148046],[144.59357422,-37.5017647],[144.59357383,-37.50176825],[144.59354482,-37.50202768],[144.59351496,-37.50229472],[144.59354615,-37.50267228],[144.59357274,-37.50299422],[144.59360696,-37.50340859],[144.59361951,-37.50356047],[144.59361962,-37.50356186],[144.59363234,-37.50366113],[144.59367631,-37.50377554],[144.59376461,-37.50389603],[144.59388745,-37.50399548],[144.59404553,-37.50406259],[144.59423185,-37.50412833],[144.59512564,-37.50423284],[144.59652472,-37.5043964],[144.59638733,-37.50514306],[144.59626859,-37.50514165],[144.59249799,-37.50469435],[144.58849505,-37.50421936],[144.58837019,-37.50420958],[144.58831891,-37.50461212],[144.58822177,-37.50511874],[144.58799273,-37.50622889],[144.58789879,-37.5067817],[144.5878127,-37.50732194],[144.58771287,-37.50777506],[144.58754109,-37.5086973],[144.58743252,-37.50868793],[144.58000965,-37.50781738]]]]},geometry_name:"geom",properties:{id:6,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.7",geometry:{type:"MultiPolygon",coordinates:[[[[144.58754109,-37.5086973],[144.58799273,-37.50622889],[144.58831891,-37.50461212],[144.58837019,-37.50420958],[144.58849505,-37.50421936],[144.59249799,-37.50469435],[144.59626859,-37.50514165],[144.59638733,-37.50514306],[144.59554661,-37.50969886],[144.59294816,-37.50940448],[144.59293287,-37.50948762],[144.59263764,-37.50945415],[144.59178024,-37.50935473],[144.58890013,-37.50902091],[144.58769016,-37.50888072],[144.5875096,-37.50886868],[144.58754109,-37.5086973]]]]},geometry_name:"geom",properties:{id:7,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.8",geometry:{type:"MultiPolygon",coordinates:[[[[144.60631727,-37.50180867],[144.61035718,-37.50230926],[144.61132006,-37.50239546],[144.61142379,-37.5024377],[144.61157707,-37.50253408],[144.61179321,-37.50274379],[144.61202852,-37.50309263],[144.616426,-37.51206905],[144.61647666,-37.51217495],[144.6163075,-37.51216061],[144.60467855,-37.51079137],[144.60572772,-37.50504063],[144.60576085,-37.50485901],[144.60631727,-37.50180867]]]]},geometry_name:"geom",properties:{id:8,ch_area:"Development Plan Area",label:"DPA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.9",geometry:{type:"MultiPolygon",coordinates:[[[[144.59354604,-37.50031715],[144.60261115,-37.50138498],[144.60267536,-37.50139254],[144.6034029,-37.50147657],[144.6042277,-37.50156244],[144.60474913,-37.50161673],[144.60581485,-37.50174718],[144.60631727,-37.50180867],[144.60577221,-37.50486035],[144.60576085,-37.50485901],[144.60572772,-37.50504063],[144.60467855,-37.51079137],[144.59554661,-37.50969886],[144.59638733,-37.50514306],[144.59652472,-37.5043964],[144.59512564,-37.50423284],[144.59423185,-37.50412833],[144.59404553,-37.50406259],[144.59388745,-37.50399548],[144.59374973,-37.50387995],[144.59367631,-37.50377554],[144.59363234,-37.50366113],[144.59361951,-37.50356047],[144.59360696,-37.50340859],[144.59357274,-37.50299422],[144.59354615,-37.50267228],[144.59351496,-37.50229472],[144.59354482,-37.50202768],[144.59357383,-37.50176825],[144.593606,-37.50148046],[144.59361542,-37.50139628],[144.5936277,-37.50122843],[144.59358528,-37.5010617],[144.59350928,-37.50092589],[144.59347667,-37.50081986],[144.59347818,-37.50067452],[144.5935281,-37.50041166],[144.59354604,-37.50031715]]]]},geometry_name:"geom",properties:{id:9,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.10",geometry:{type:"MultiPolygon",coordinates:[[[[144.60546182,-37.49808761],[144.60567914,-37.49806387],[144.60581211,-37.49800524],[144.60588594,-37.49788403],[144.60439534,-37.49679236],[144.60196189,-37.49514755],[144.59998173,-37.49367423],[144.5997518,-37.49357472],[144.599164,-37.49315131],[144.59926354,-37.49298755],[144.59961748,-37.49309384],[144.60014257,-37.49317654],[144.60313817,-37.49361594],[144.60543725,-37.49393944],[144.60593989,-37.49401016],[144.6062787,-37.49414788],[144.60651319,-37.49427149],[144.60747311,-37.49499558],[144.6080224,-37.49541662],[144.60823284,-37.495628],[144.60870387,-37.49610473],[144.60936027,-37.49721034],[144.60988385,-37.49875899],[144.60999888,-37.4989892],[144.61119765,-37.50147982],[144.61145875,-37.5021866],[144.61143626,-37.50233724],[144.61132006,-37.50239546],[144.61035718,-37.50230926],[144.60474913,-37.50161673],[144.60488632,-37.50091275],[144.60535302,-37.49851778],[144.60539592,-37.49834449],[144.60546182,-37.49808761]]]]},geometry_name:"geom",properties:{id:10,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.11",geometry:{type:"MultiPolygon",coordinates:[[[[144.58216712,-37.48677225],[144.58192736,-37.48796939],[144.58175778,-37.48895392],[144.58171771,-37.48914783],[144.58162981,-37.48957325],[144.58166649,-37.48957804],[144.58211623,-37.48963682],[144.58200288,-37.49018734],[144.58142331,-37.49023331],[144.57964545,-37.49039073],[144.5794981,-37.49114764],[144.57499734,-37.49063182],[144.57530632,-37.48911996],[144.57564442,-37.48888392],[144.57597264,-37.48867728],[144.57831465,-37.48720268],[144.57860683,-37.48701536],[144.57890859,-37.48683718],[144.57939138,-37.48669609],[144.58015202,-37.48661376],[144.58057906,-37.48663115],[144.58136717,-37.48668854],[144.58216712,-37.48677225]]]]},geometry_name:"geom",properties:{id:11,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.12",geometry:{type:"MultiPolygon",coordinates:[[[[144.5794981,-37.49114764],[144.57964545,-37.49039073],[144.58142331,-37.49023331],[144.58200288,-37.49018734],[144.58222909,-37.49017098],[144.58326019,-37.49030462],[144.58311952,-37.49108455],[144.58346008,-37.49112977],[144.58384944,-37.49118146],[144.58406595,-37.49122095],[144.58404697,-37.49131792],[144.5838639,-37.49225587],[144.58376055,-37.49278569],[144.58367191,-37.49326175],[144.58366411,-37.49334456],[144.58452497,-37.49345436],[144.58477925,-37.4934816],[144.58676715,-37.4936807],[144.58692806,-37.49369226],[144.5868402,-37.49424959],[144.58683962,-37.49448197],[144.58649311,-37.49485236],[144.58592138,-37.4954084],[144.58517087,-37.49606416],[144.58460913,-37.49653176],[144.58414116,-37.49692797],[144.58400756,-37.49710713],[144.5838107,-37.49737112],[144.58363497,-37.49791039],[144.58362427,-37.49853019],[144.58360258,-37.49889188],[144.58349532,-37.49917698],[144.58345135,-37.49941172],[144.58334126,-37.49962674],[144.58333464,-37.49963966],[144.58320598,-37.49981724],[144.58319787,-37.49982844],[144.5830144,-37.50002044],[144.58274612,-37.50021213],[144.58223118,-37.50051471],[144.5814451,-37.50090163],[144.58123679,-37.50100629],[144.58055852,-37.50134706],[144.57815047,-37.50252689],[144.57566941,-37.50375289],[144.57544516,-37.50347574],[144.57493986,-37.50287894],[144.57661951,-37.50162082],[144.57806949,-37.4985802],[144.58163264,-37.49899831],[144.58215677,-37.4962008],[144.58218214,-37.496065],[144.58235732,-37.49513022],[144.5787933,-37.49471212],[144.57912885,-37.49291912],[144.57925244,-37.49256307],[144.5794981,-37.49114764]]]]},geometry_name:"geom",properties:{id:12,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.13",geometry:{type:"MultiPolygon",coordinates:[[[[144.58083133,-37.50333107],[144.58120742,-37.50129325],[144.58123679,-37.50100629],[144.5814451,-37.50090163],[144.58223118,-37.50051471],[144.58274612,-37.50021213],[144.5830144,-37.50002044],[144.58320598,-37.49981724],[144.58334126,-37.49962674],[144.58345135,-37.49941172],[144.58349532,-37.49917698],[144.58512723,-37.49935914],[144.58557174,-37.49940898],[144.58533943,-37.50069886],[144.58503327,-37.50232791],[144.58476184,-37.50378721],[144.58083133,-37.50333107]]]]},geometry_name:"geom",properties:{id:13,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.14",geometry:{type:"MultiPolygon",coordinates:[[[[144.59775304,-37.49191833],[144.59745689,-37.49172136],[144.59717962,-37.49145949],[144.59689639,-37.4912471],[144.59662932,-37.49100353],[144.59620584,-37.49062346],[144.59590437,-37.4904036],[144.59563528,-37.49020735],[144.59546277,-37.48998725],[144.59546277,-37.48998725],[144.59562516,-37.48985536],[144.59641094,-37.48919234],[144.59699374,-37.48962688],[144.59715277,-37.48975075],[144.59889263,-37.49104187],[144.59810072,-37.49170001],[144.59775304,-37.49191833]]]]},geometry_name:"geom",properties:{id:14,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.15",geometry:{type:"MultiPolygon",coordinates:[[[[144.58077951,-37.48638308],[144.58005212,-37.48629705],[144.5797671,-37.48636668],[144.57977567,-37.48629887],[144.5790989,-37.48645436],[144.58047029,-37.48492344],[144.58105479,-37.48499258],[144.58077951,-37.48638308]]]]},geometry_name:"geom",properties:{id:15,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.16",geometry:{type:"MultiPolygon",coordinates:[[[[144.58605085,-37.47677804],[144.58592822,-37.47739496],[144.58591205,-37.47749293],[144.58600338,-37.47750892],[144.58593333,-37.47786546],[144.58589944,-37.47804145],[144.58495473,-37.47792767],[144.58490827,-37.47821003],[144.58485437,-37.47849048],[144.58472341,-37.47883568],[144.58461457,-37.47912529],[144.584602,-37.47912412],[144.58440248,-37.47940847],[144.58426734,-37.47959652],[144.58401292,-37.47986982],[144.58379978,-37.48009905],[144.58394329,-37.4802315],[144.58368725,-37.48042496],[144.5834606,-37.48059474],[144.58317365,-37.48071704],[144.58286956,-37.48084707],[144.58282651,-37.4808521],[144.58237216,-37.48089685],[144.58236201,-37.48089698],[144.58197369,-37.48090235],[144.58158633,-37.48093307],[144.58123434,-37.48093337],[144.58123454,-37.48092012],[144.58081541,-37.48084823],[144.58081279,-37.48086104],[144.58039879,-37.48078981],[144.57980584,-37.48073697],[144.57982281,-37.48071634],[144.57946358,-37.48052863],[144.57945373,-37.48053729],[144.57795681,-37.48037495],[144.57792628,-37.48038931],[144.57785563,-37.48037741],[144.57831699,-37.47923811],[144.57919894,-37.47713575],[144.58143382,-37.47600414],[144.58165651,-37.47603213],[144.58162267,-37.47621109],[144.58592349,-37.47675751],[144.58605085,-37.47677804]]]]},geometry_name:"geom",properties:{id:16,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.17",geometry:{type:"MultiPolygon",coordinates:[[[[144.59165387,-37.48169106],[144.59163527,-37.48184546],[144.59163373,-37.4819588],[144.59161026,-37.48218579],[144.59158902,-37.48244637],[144.59157507,-37.48261724],[144.59155422,-37.48290877],[144.59120907,-37.48286668],[144.59121596,-37.48276259],[144.59065569,-37.48272321],[144.59062062,-37.48272052],[144.5903183,-37.48269795],[144.5900771,-37.48251436],[144.58899857,-37.48248388],[144.58874358,-37.48247669],[144.58849149,-37.48246956],[144.58832983,-37.48245121],[144.5878527,-37.48239308],[144.58740101,-37.48233808],[144.58705921,-37.48229641],[144.58656107,-37.48181628],[144.58656713,-37.48180309],[144.58659068,-37.48178964],[144.58653867,-37.48175547],[144.58635266,-37.4815334],[144.58629987,-37.48151112],[144.58618761,-37.48114015],[144.58632264,-37.48060592],[144.58636605,-37.48043391],[144.58640623,-37.4802749],[144.58645007,-37.48009063],[144.58650489,-37.47987344],[144.58688788,-37.47948394],[144.58703842,-37.47935195],[144.58753113,-37.47920363],[144.58776293,-37.47913386],[144.58801017,-37.47914824],[144.58825422,-37.4791602],[144.5891575,-37.47926595],[144.58941136,-37.47937718],[144.58964236,-37.47948954],[144.59013389,-37.47972898],[144.59045976,-37.48005122],[144.59066299,-37.48024829],[144.59081712,-37.48040765],[144.59097285,-37.48056279],[144.59113091,-37.4807243],[144.59087008,-37.48092226],[144.59085862,-37.48093096],[144.59079429,-37.48097],[144.59165387,-37.48169106]]]]},geometry_name:"geom",properties:{id:17,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.18",geometry:{type:"MultiPolygon",coordinates:[[[[144.60145137,-37.4797597],[144.60384876,-37.48259405],[144.60389408,-37.48264364],[144.60419059,-37.48308474],[144.6045131,-37.48356457],[144.60482328,-37.4840509],[144.60512427,-37.48454182],[144.60542535,-37.48503284],[144.60577351,-37.48560058],[144.60375413,-37.48658258],[144.60353219,-37.48669052],[144.60336917,-37.48676974],[144.60274298,-37.48669532],[144.60274385,-37.48670979],[144.602665,-37.48711188],[144.60154035,-37.48697581],[144.6014989,-37.48707739],[144.59728615,-37.48656201],[144.59839294,-37.48534914],[144.59831644,-37.48528106],[144.59867959,-37.48509334],[144.59831644,-37.48528106],[144.59825218,-37.485192],[144.59827274,-37.48516275],[144.59822562,-37.48514033],[144.59544961,-37.48383579],[144.59509102,-37.48366542],[144.59542756,-37.48189175],[144.59602999,-37.48159744],[144.59602995,-37.48151544],[144.59653432,-37.48112566],[144.59691931,-37.48053813],[144.59709004,-37.48041898],[144.5974864,-37.47989716],[144.59767949,-37.47964568],[144.59802522,-37.47959938],[144.59806105,-37.47939011],[144.59955707,-37.47954955],[144.60137955,-37.47975365],[144.60145137,-37.4797597]]]]},geometry_name:"geom",properties:{id:18,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.19",geometry:{type:"MultiPolygon",coordinates:[[[[144.59721102,-37.47927088],[144.59704637,-37.47980367],[144.59622522,-37.48090387],[144.59537737,-37.48123958],[144.59529631,-37.48127164],[144.59456355,-37.48156177],[144.59397881,-37.4814913],[144.5930668,-37.4813814],[144.59273146,-37.48134098],[144.59236729,-37.48129715],[144.59199812,-37.48127719],[144.59206513,-37.48051722],[144.59216326,-37.47999387],[144.59217724,-37.47991804],[144.59214908,-37.4794391],[144.59207045,-37.47908286],[144.5920229,-37.47871428],[144.59243151,-37.47874219],[144.5957067,-37.47910592],[144.59592564,-37.47910509],[144.5964972,-37.47917882],[144.59721102,-37.47927088]]]]},geometry_name:"geom",properties:{id:19,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.20",geometry:{type:"MultiPolygon",coordinates:[[[[144.59396625,-37.47093506],[144.59376746,-37.47092474],[144.59309506,-37.47084623],[144.59310416,-37.47083341],[144.59312275,-37.47066958],[144.5931433,-37.47048576],[144.59330182,-37.46915156],[144.59351242,-37.46733548],[144.59511631,-37.46770982],[144.59458918,-37.46915834],[144.59426575,-37.47004709],[144.59396625,-37.47093506]]]]},geometry_name:"geom",properties:{id:20,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.21",geometry:{type:"MultiPolygon",coordinates:[[[[144.59519871,-37.46093095],[144.59567735,-37.45853777],[144.5965404,-37.45871397],[144.59642602,-37.4590253],[144.59640436,-37.45909443],[144.59724128,-37.4592914],[144.59747813,-37.45934733],[144.59689377,-37.46097049],[144.59697033,-37.46098124],[144.59693952,-37.46116035],[144.59623815,-37.46106985],[144.59519871,-37.46093095]]]]},geometry_name:"geom",properties:{id:21,ch_area:"Development Plan Area",label:"DPA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.22",geometry:{type:"MultiPolygon",coordinates:[[[[144.59519871,-37.46093095],[144.59486252,-37.4608832],[144.59448828,-37.46279834],[144.59447059,-37.46290423],[144.59552568,-37.4630409],[144.59479803,-37.46505273],[144.59446508,-37.46595476],[144.59301212,-37.46561465],[144.59298145,-37.46579631],[144.59163269,-37.46548342],[144.59099483,-37.46533848],[144.58781135,-37.46461148],[144.58826389,-37.46219893],[144.59164126,-37.46262987],[144.5916918,-37.46244777],[144.59169577,-37.46242828],[144.59261757,-37.45790888],[144.59567735,-37.45853777],[144.59519871,-37.46093095]]]]},geometry_name:"geom",properties:{id:22,ch_area:"Development Plan Area",label:"DPA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.23",geometry:{type:"MultiPolygon",coordinates:[[[[144.60233168,-37.47192156],[144.60541705,-37.47228308],[144.61252399,-37.4732707],[144.61918384,-37.4741945],[144.61919674,-37.47428047],[144.61909872,-37.47442749],[144.60491331,-37.48182712],[144.60368427,-37.4803522],[144.6035237,-37.48013316],[144.60290042,-37.4795382],[144.60239684,-37.47902676],[144.60180501,-37.47844473],[144.60197186,-37.47846418],[144.60197177,-37.47846466],[144.6026688,-37.47470056],[144.60187277,-37.47461848],[144.60183341,-37.47454526],[144.60207717,-37.47334411],[144.60233086,-37.47192612],[144.60233168,-37.47192156]]]]},geometry_name:"geom",properties:{id:23,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.24",geometry:{type:"MultiPolygon",coordinates:[[[[144.5787933,-37.49471212],[144.58236336,-37.49511703],[144.58216432,-37.49606241],[144.58216025,-37.49620121],[144.58162945,-37.49901624],[144.57806949,-37.4985802],[144.5787933,-37.49471212]]]]},geometry_name:"geom",properties:{id:24,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.25",geometry:{type:"MultiPolygon",coordinates:[[[[144.59483859,-37.4757987],[144.59531212,-37.47585474],[144.59532537,-37.47567409],[144.59543518,-37.47509006],[144.59543522,-37.4750888],[144.59661081,-37.47557872],[144.59709244,-37.4758936],[144.597092,-37.47589482],[144.59705865,-37.47598639],[144.59653594,-37.47592308],[144.59653092,-37.47600614],[144.59618825,-37.47780166],[144.59613816,-37.47789909],[144.59592568,-37.47910383],[144.59570674,-37.47910466],[144.59243151,-37.47874219],[144.5920229,-37.47871428],[144.59207045,-37.47908286],[144.59214912,-37.47943784],[144.59217724,-37.47991804],[144.5921633,-37.47999261],[144.59206513,-37.48051722],[144.59199812,-37.48127719],[144.59194893,-37.48183506],[144.59177968,-37.48179363],[144.59165391,-37.4816898],[144.59079433,-37.48096874],[144.59087012,-37.480921],[144.59114361,-37.48073011],[144.59097289,-37.48056153],[144.59082321,-37.4803932],[144.59066908,-37.48023384],[144.59046586,-37.48003677],[144.59013999,-37.47971453],[144.59035316,-37.47857658],[144.58589948,-37.47804019],[144.58593337,-37.4778642],[144.58600343,-37.47750766],[144.58591209,-37.47749167],[144.58605089,-37.47677678],[144.58699752,-37.47206128],[144.58712394,-37.47205056],[144.58830327,-37.47197716],[144.5886748,-37.47204394],[144.58928289,-37.4721533],[144.5900176,-37.47235228],[144.59081192,-37.4725449],[144.59163491,-37.47298875],[144.59240318,-37.4737456],[144.59258649,-37.47392616],[144.59287829,-37.47457562],[144.59264286,-37.47545209],[144.59334986,-37.47553886],[144.59324993,-37.47607113],[144.5947536,-37.47624711],[144.59483859,-37.4757987]]]]},geometry_name:"geom",properties:{id:25,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.26",geometry:{type:"MultiPolygon",coordinates:[[[[144.59264286,-37.47545209],[144.59287829,-37.47457562],[144.59314929,-37.47447714],[144.59364715,-37.4743616],[144.59543518,-37.47509006],[144.59532537,-37.47567409],[144.59531212,-37.47585474],[144.59483859,-37.4757987],[144.5947536,-37.47624711],[144.59324989,-37.47607239],[144.59334986,-37.47553886],[144.59264286,-37.47545209]]]]},geometry_name:"geom",properties:{id:26,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.27",geometry:{type:"MultiPolygon",coordinates:[[[[144.597092,-37.47589482],[144.59740208,-37.47610973],[144.5977391,-37.47631816],[144.59873069,-37.47713576],[144.59974253,-37.47795154],[144.60013529,-37.47826819],[144.60031327,-37.47847264],[144.60138189,-37.47970058],[144.60145137,-37.4797597],[144.60137955,-37.47975365],[144.59955707,-37.47954955],[144.59806105,-37.47939011],[144.59721102,-37.47927088],[144.59592564,-37.47910509],[144.59613812,-37.47790035],[144.59618821,-37.47780292],[144.59653092,-37.47600614],[144.59653594,-37.47592308],[144.59705865,-37.47598639],[144.597092,-37.47589482]]]]},geometry_name:"geom",properties:{id:27,ch_area:"Development Plan Area",label:"DPA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.28",geometry:{type:"MultiPolygon",coordinates:[[[[144.58958582,-37.49669663],[144.58963196,-37.49644917],[144.58969984,-37.49627086],[144.59215973,-37.49655811],[144.59416013,-37.49678797],[144.59687221,-37.4971056],[144.60444007,-37.49796731],[144.60489893,-37.49802133],[144.60546182,-37.49808761],[144.60539592,-37.49834449],[144.60535302,-37.49851778],[144.60488632,-37.50091275],[144.60474913,-37.50161673],[144.6042277,-37.50156244],[144.6034029,-37.50147657],[144.60261115,-37.50138498],[144.59354604,-37.50031715],[144.59339599,-37.50029922],[144.59155374,-37.5000791],[144.58927534,-37.49982685],[144.58923122,-37.49982519],[144.58915304,-37.49979354],[144.58911235,-37.49971275],[144.58948998,-37.49721066],[144.58958582,-37.49669663]]]]},geometry_name:"geom",properties:{id:28,ch_area:"Development Plan Area",label:"DPA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.29",geometry:{type:"MultiPolygon",coordinates:[[[[144.60004831,-37.46640952],[144.6000561,-37.46637004],[144.60026634,-37.4663981],[144.60025946,-37.4664323],[144.59985646,-37.46752723],[144.59801625,-37.46728929],[144.59756924,-37.46932923],[144.59751738,-37.46958844],[144.59695301,-37.469506],[144.59480799,-37.46919053],[144.59458918,-37.46915834],[144.59579851,-37.46586754],[144.59579851,-37.46586754],[144.60004831,-37.46640952]]]]},geometry_name:"geom",properties:{id:29,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.30",geometry:{type:"MultiPolygon",coordinates:[[[[144.60248555,-37.46787618],[144.60250875,-37.46787936],[144.60197711,-37.47034054],[144.60177292,-37.47069488],[144.60134222,-37.47045966],[144.60069594,-37.47019453],[144.60019043,-37.47004508],[144.59973173,-37.46991187],[144.59911348,-37.46982157],[144.59751738,-37.46958844],[144.59756924,-37.46932923],[144.59801625,-37.46728929],[144.59987271,-37.4675132],[144.60248555,-37.46787618]]]]},geometry_name:"geom",properties:{id:30,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.31",geometry:{type:"MultiPolygon",coordinates:[[[[144.60177292,-37.47069488],[144.60195121,-37.47084931],[144.60198992,-37.47105028],[144.6021197,-37.4712796],[144.60238007,-37.47165172],[144.60233086,-37.47192612],[144.6018266,-37.47454343],[144.60187277,-37.47461848],[144.6026688,-37.47470056],[144.60197186,-37.47846418],[144.60180501,-37.47844473],[144.60180501,-37.47844473],[144.60179897,-37.47845792],[144.59997267,-37.47684146],[144.59936258,-37.47633001],[144.59910792,-37.47612312],[144.59895157,-37.47598151],[144.59683916,-37.47436396],[144.59612324,-37.47392627],[144.59591227,-37.47380003],[144.59483116,-37.47315297],[144.59452597,-37.47280783],[144.59398464,-37.47219574],[144.59392538,-37.47179939],[144.59417321,-37.47097072],[144.59396625,-37.47093506],[144.59426575,-37.47004709],[144.59458918,-37.46915834],[144.59480799,-37.46919053],[144.59695301,-37.469506],[144.59751738,-37.46958844],[144.59911348,-37.46982157],[144.59973173,-37.46991187],[144.60019043,-37.47004508],[144.60069594,-37.47019453],[144.60134222,-37.47045966],[144.60177292,-37.47069488]]]]},geometry_name:"geom",properties:{id:31,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.32",geometry:{type:"MultiPolygon",coordinates:[[[[144.61271732,-37.47776127],[144.6127897,-37.4778336],[144.61464795,-37.48009437],[144.61417513,-37.4803412],[144.61363613,-37.48062258],[144.6121621,-37.48009285],[144.61126898,-37.48032242],[144.61128521,-37.48045679],[144.61196359,-37.48045199],[144.61397073,-37.48217671],[144.6136884,-37.48396437],[144.61267812,-37.48458946],[144.60851891,-37.48417225],[144.607963,-37.48709828],[144.60701208,-37.48504332],[144.60623843,-37.48365173],[144.60593075,-37.48322046],[144.60504554,-37.4819796],[144.60491331,-37.48182712],[144.61271732,-37.47776127]]]]},geometry_name:"geom",properties:{id:32,ch_area:"Minimal Change Area",label:"MCA"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.33",geometry:{type:"MultiPolygon",coordinates:[[[[144.59552568,-37.4630409],[144.59676873,-37.46321589],[144.59627856,-37.46455665],[144.59508398,-37.46427464],[144.59552568,-37.4630409]]]]},geometry_name:"geom",properties:{id:33,ch_area:"Incremental Change Area 2",label:"ICA2"}},{type:"Feature",id:"ckan_21027724_fbac_4e99_8d4d_35ced7f5bb39.34",geometry:{type:"MultiPolygon",coordinates:[[[[144.59479803,-37.46505273],[144.59588607,-37.46530634],[144.59599162,-37.46533207],[144.59511631,-37.46770982],[144.59351242,-37.46733548],[144.59353422,-37.46718005],[144.59298145,-37.46579631],[144.59301212,-37.46561465],[144.59446508,-37.46595476],[144.59479803,-37.46505273]]]]},geometry_name:"geom",properties:{id:34,ch_area:"Incremental Change Area 2",label:"ICA2"}}],H4=34,Z4=34,z4=34,K4="2021-09-03T12:11:36.651Z",J4={type:"name",properties:{name:"urn:ogc:def:crs:EPSG::4326"}},$4={type:Y4,features:X4,totalFeatures:H4,numberMatched:Z4,numberReturned:z4,timeStamp:K4,crs:J4},q4="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAtCAYAAADP5GkqAAABfUlEQVR4nNWXPU4DMRCFnxckUJDouAEXoEa0lKRHAolwGRqOAIfgDHQ5CA10ICSQMDYbVt5k157nnzj5pJE269l5k/F/gzjmxvSSvSACRfhqcOwZ+wo5SRJghSmNxtN2n0EcixijlVCej0qwojdUgW+UQ4cSuDa2i7L0klC+xoJ0uk0F8Z5W6XIH+a/ADzjO0JbRtR1w/FVBuT+EhBYvKlYDDpXJp4NNQMqR0O/ZDsIHoTPzz16Ffqc2gWNUxCbwhorYMXAn9D1EAdhpKB0H0niP7Cy4QV5uYxaiJ2PTkbaJsQ/I6RYi5gxwgTbhufNutnjHiLcZOM/r3A077Y3ZDS3UGp7IyZio7cMJyqNWHhxKj4WeZhNyyMwVhGJV7wWDjiXEfQmMfhDJDJEin8b2kY6iGxyq3Y5FAQKchxykwWMXKJXs4MB2hSg2cyBhkhUfXNj+zX10w1bejHwCl8gYzMe7sYMc8VLmuM4RK+Vy6gpOEUnqhqNT46zzHDjIL4CKNnowt3KGAAAAAElFTkSuQmCC",mt={title:"Compact Viewer",tags:["no-visual-regression"],parameters:{docs:{description:{component:N4}}},decorators:[g.withKnobs,t=>e.jsx(d.StrictMode,{children:t()})]},x={width:640,height:480},H={render:()=>e.jsxs(_,{style:x,projection:"EPSG:4326",initialBBOX:U4,children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j})]})},Z={render:()=>e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:Ve,children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j})]})},z={render:()=>{const t=O("Map view changed");return e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:Ve,children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(s4,{onMapViewChanged:t})]})}},K={render:()=>e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:Ve,children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(n4,{})]})},J={render:()=>{const t=g.boolean("Enable popup content",!0),r=g.select("Mouse tracking mode",["click","hover"],"click"),[o,s]=d.useState(void 0),n=t&&!!o;return e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:[-2003750834e-2,-200489661e-1,2003750834e-2,200489661e-1],children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(xe,{isActive:n,onPositionChange:a=>s(a),mouseTrackingMode:r,className:"ol-popup",children:e.jsxs("p",{children:[r==="click"?"You clicked at":"You are hovering over"," (",o?.[0],", ",o?.[1],")"]})})]})}},$={render:()=>{const t=g.boolean("Enable drawing",!0),r=g.select("Draw geometry type",["Circle","Polygon"],"Polygon"),o=g.boolean("Snap to layer objects",!0);return e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:[-2003750834e-2,-200489661e-1,2003750834e-2,200489661e-1],children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{name:"Shapes"}),t&&e.jsx(Y,{type:r,target:"Shapes",cancelKey:["Escape"],undoLastPointKey:["u"]}),o&&e.jsx(X,{target:"Shapes"}),e.jsx(xe,{isActive:t,mouseTrackingMode:"hover",className:"drawing-prompt",children:e.jsx("p",{children:r==="Circle"?"Click to set the center of the circle. Click again to finish drawing. Press U or ESC to cancel":"Click to start drawing. Click to add vertices. Double-click or click the start point to close the polygon to finish. Press U to undo the last vertex. Press ESC to cancel"})})]})}},q={render:()=>e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"})]})},Q={render:()=>e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:[-2003750834e-2,-200489661e-1,2003750834e-2,200489661e-1],children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(B4,{name:"DebugPoints",addFunctionName:"addDebugPoints",clearFunctionName:"clearDebugPoints"}),e.jsx(n4,{})]}),e.jsxs("p",{children:["A debug vector points layer installs the following functions to the ",e.jsx("code",{children:"window"})," browser global"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"addDebugPoints(points: [number, number], label: string)"})," - adds the given points to the debug layer"]}),e.jsxs("li",{children:[e.jsx("code",{children:"clearDebugPoints()"})," - clears the debug layer"]})]}),e.jsxs("p",{children:["You can add points to this debug layer through your browser console of the ",e.jsx("code",{children:"storybook-preview-iframe"})]}),e.jsxs("pre",{children:["window.addDebugPoints([13306157.883883, 3326539.470971], 'Test Point'); // Add a single point",e.jsx("br",{}),"window.clearDebugPoints(); // Clear the debug points"]}),e.jsx("p",{children:"This layer is for debugging purposes only and should not be included in production code."})]})},ee={render:()=>{const t=[{filter:["==",["get","label"],"ICA1"],style:{"fill-color":"#eff3ff","stroke-color":"#000000"}},{filter:["==",["get","label"],"MCA"],style:{"fill-color":"#bdd7e7","stroke-color":"#000000"}},{filter:["==",["get","label"],"ICA2"],style:{"fill-color":"#6baed6","stroke-color":"#000000"}},{filter:["==",["get","label"],"DPA"],style:{"fill-color":"#2171b5","stroke-color":"#000000"}}];return e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,style:t,name:"Shapes",initialFeatures:$4,initialFeatureProjection:"EPSG:4326"})]})}},Q4=new be({image:new L4({anchor:[.5,1],src:q4})}),fe={render:()=>{const[t,r]=De(100),o=O("Selected Feature"),s=O("UnSelected Feature"),[n,a]=d.useState(void 0),[i,c,l]=e4({addHandler:o,removeHandler:s,processFeatureToAdd:m=>m.element.get("features")??[m.element],processFeatureToRemove:m=>m.element.get("features")??[m.element]});if(!r)return null;const p=l.length>0,u=(m,f)=>{const y=_4(m.getLayers(),v=>v.get("name")==="Points");if(y&&y instanceof ue){const v=y.getSource();if(v instanceof Me){const S=m.getView().calculateExtent(m.getSize());let L=0;v.forEachFeatureInExtent(S,h=>{L++}),a(L)}}};return e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,maxZoom:20,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,onFeaturesClicked:o4,name:"Points",style:Q4,features:t,initialFeatureProjection:"EPSG:3857"}),e.jsx(s4,{onMapViewChanged:u}),c&&e.jsx(pe,{mode:"click",features:i}),e.jsx(xe,{isActive:p,mouseTrackingMode:"click",className:"ol-popup",children:e.jsxs("div",{style:{maxHeight:200,overflowY:"auto"},children:[e.jsxs("h3",{children:["Selection: ",l.length]}),e.jsx("ul",{children:l.map(m=>e.jsxs("li",{children:["ID: ",m.getId()]},m.getId()))})]})})]}),n!=null&&e.jsxs("p",{children:["Markers in current view: ",n]})]})}},ge={render:()=>{const[t,r]=De(),o=g.number("Cluster distance (in pixels)",40,{range:!0,min:0,max:200,step:1}),s=g.number("Cluster minimum distance (in pixels)",20,{range:!0,min:0,max:200,step:1}),n=g.boolean("Enable clustering",!0),a=n?{distance:o,minDistance:s}:void 0,i=a4(n);return r?e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,maxZoom:20,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,onFeaturesClicked:D4,style:i,name:"Points",features:t,clusterSettings:a,initialFeatureProjection:"EPSG:3857"})]}),e.jsx("p",{children:"Clicking on a cluster of multiple points will automatically zoom into its bounding extent."}),e.jsxs("p",{children:["The ",e.jsx("code",{children:"handleClusterZoomToClick"})," function registered to the ",e.jsx("code",{children:"onFeaturesClicked"})," event of the"," ",e.jsx("code",{children:"VectorLayer"})," component will automatically zoom to the bounding extent of the cluster"]})]}):null}},he={render:()=>{const[t,r]=De(),o=g.number("Cluster distance (in pixels)",40,{range:!0,min:0,max:200,step:1}),s=g.number("Cluster minimum distance (in pixels)",20,{range:!0,min:0,max:200,step:1}),n=g.boolean("Enable clustering",!0),a=O("Selected Feature"),i=O("UnSelected Feature"),c=g.number("Cluster zoom size limit",1,{range:!0,min:1,max:10,step:1}),[l,p,u]=e4({addHandler:a,removeHandler:i,processFeatureToAdd:S=>S.element.get("features")??[S.element],processFeatureToRemove:S=>S.element.get("features")??[S.element]}),m=d.useCallback((S,L,h)=>{o4(S,L,h,c)},[c]),f=n?{distance:o,minDistance:s}:void 0,y=a4(n);if(!r)return null;const v=u.length>0;return e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,maxZoom:20,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,onFeaturesClicked:m,style:y,name:"Points",features:t,clusterSettings:f,initialFeatureProjection:"EPSG:3857"}),p&&e.jsx(pe,{mode:"never",features:l}),e.jsx(xe,{isActive:v,mouseTrackingMode:"click",className:"ol-popup",children:e.jsxs("div",{style:{maxHeight:200,overflowY:"auto"},children:[e.jsxs("h3",{children:["Selection: ",u.length]}),e.jsx("ul",{children:u.map(S=>e.jsxs("li",{children:["ID: ",S.getId()]},S.getId()))})]})})]}),e.jsx("p",{children:"Clicking on a cluster of multiple points will automatically zoom into its bounding extent. Clicking on a single point cluster will select it. Clicking on a multi-point cluster at the lowest possible zoom will also select it"}),e.jsxs("p",{children:["You can adjust the ",e.jsx("code",{children:"Cluster zoom size limit"})," to control how many features must be in a cluster at a minimum before it is zoomed into on click. The default is 1, which means any cluster click will zoom into the cluster extent until you reach the lowest possible zoom level."]}),e.jsx("p",{children:"The cluster in Perth, Australia will be selectable at the lowest possible zoom"}),e.jsxs("p",{children:["The ",e.jsx("code",{children:"maxZoom"})," for this map has been constrained to 20 (street level) which means any cluster clicks at this level will select instead of trying to zoom any further"]}),e.jsxs("p",{children:["The ",e.jsx("code",{children:"SelectInteraction"})," by default does not play nice with click-driven content overlays like popups due to clashing click event handlers."]}),e.jsxs("p",{children:["To make this ",e.jsx("code",{children:"SelectInteraction"})," work with click-driven content overlays, the ",e.jsx("code",{children:"mode"})," prop has been set to"," ",e.jsx("code",{children:"'never'"}),"and selection is completely done programmatically through the ",e.jsx("code",{children:"onFeaturesClicked"})," event handler of the"," ",e.jsx("code",{children:"VectorLayer"})," component."]}),e.jsxs("p",{children:["Setting the ",e.jsx("code",{children:"features"})," prop of the ",e.jsx("code",{children:"SelectInteraction"})," to an observable feature collection is optional for the purpose of programmatic selection, we are binding a collection in this example so that you can:"]}),e.jsxs("ol",{children:[e.jsx("li",{children:"Observe the features being added/removed through the actions addon"}),e.jsxs("li",{children:["Pair it with a react-observable array copy (via the ",e.jsx("code",{children:"useTrackedFeatureCollection"})," hook) that is used to update the popup content that you see and to control when this popup is displayed"]})]})]})}},te={render:()=>{const t=g.select("Selection mode",["click","hover"],"click");return e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),e.jsx(pe,{mode:t})]})}},re={render:()=>{const t=g.select("Selection mode",["click","hover"],"click"),r=O("Selected Feature"),o=O("UnSelected Feature"),[s,n]=O4({addHandler:r,removeHandler:o});return e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),n&&e.jsx(pe,{mode:t,features:s})]})}},oe={render:()=>{const t=g.select("Draw geometry type",["Circle","Polygon"],"Polygon"),r=g.boolean("Snap to layer objects",!0);return e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),e.jsx(Y,{type:t,target:"Shapes",cancelKey:["Escape"],undoLastPointKey:["u"]}),r&&e.jsx(X,{target:"Shapes"})]}),e.jsxs("p",{children:["Press ",e.jsx("strong",{children:"Escape"})," to cancel the current drawing operation. Press ",e.jsx("strong",{children:"U"})," to undo the last drawn point"]})]})}},ne={render:()=>{const t=g.select("Draw geometry type",["Circle","Polygon"],"Polygon"),r=g.boolean("Snap to layer objects",!0);return e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),e.jsx(Y,{type:t,target:"Shapes",cancelKey:["Escape"],undoLastPointKey:["u"]}),e.jsx(Re,{target:"Shapes"}),r&&e.jsx(X,{target:"Shapes"})]}),e.jsxs("p",{children:["Press ",e.jsx("strong",{children:"Escape"})," to cancel the current drawing operation. Press ",e.jsx("strong",{children:"U"})," to undo the last drawn point"]})]})}},ae={render:()=>{const t=g.select("Draw geometry type",["Circle","Polygon"],"Polygon"),r=g.boolean("Snap to layer objects",!0),o={Point:{"circle-radius":5,"circle-fill-color":"red"},LineString:{"circle-radius":5,"circle-fill-color":"red","stroke-color":"yellow","stroke-width":2},Polygon:{"circle-radius":5,"circle-fill-color":"red","stroke-color":"yellow","stroke-width":2,"fill-color":"blue"},Circle:{"circle-radius":5,"circle-fill-color":"red","stroke-color":"blue","stroke-width":2,"fill-color":"yellow"}};return e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),e.jsx(Y,{style:o[t],type:t,target:"Shapes",cancelKey:["Escape"],undoLastPointKey:["u"]}),r&&e.jsx(X,{target:"Shapes"})]}),e.jsxs("p",{children:["Press ",e.jsx("strong",{children:"Escape"})," to cancel the current drawing operation. Press ",e.jsx("strong",{children:"U"})," to undo the last drawn point"]})]})}},se={render:()=>{const t=d.useRef(new W),r=g.select("Draw geometry type",["Circle","Polygon"],"Polygon"),o=g.boolean("Snap to layer objects",!0),s=O("Added Feature"),n=O("Removed Feature"),a=c=>s(c),i=c=>n(c);return d.useEffect(()=>(t.current.on("add",a),t.current.on("remove",i),()=>{t.current.un("add",a),t.current.un("remove",i)}),[]),e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(T,{fitInitialViewToThisLayer:!0,name:"Shapes",features:t.current,initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),e.jsx(Y,{type:r,target:t.current,cancelKey:["Escape"],undoLastPointKey:["u"]}),e.jsx(Re,{target:t.current}),o&&e.jsx(X,{target:t.current})]}),e.jsxs("p",{children:["Press ",e.jsx("strong",{children:"Escape"})," to cancel the current drawing operation. Press ",e.jsx("strong",{children:"U"})," to undo the last drawn point"]})]})}},i4=[12616951086509628e-9,-5408361233223649e-9,1709533420112302e-8,-1.1947045302843093e6],We="https://opendata.maps.vic.gov.au/geoserver/wms?service=wms&request=getcapabilities",Ge="open-data-platform:ad_locality_area_polygon",ie={render:()=>{const t=d.useRef(new W),r=O("GetFeatureInfo response"),o=s=>{r(s);const a=new Oe().readFeatures(s);for(const i of a)t.current.push(i)};return e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:i4,children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(Ae,{name:"WMS",url:We,layerName:Ge,tiled:!0,infoFormat:"application/json",onGetFeatureInfo:o}),e.jsx(T,{name:"WMS Selection",features:t.current})]})}},ce={render:()=>{const t=d.useRef(new W),r=O("GetFeatureInfo response"),o=n=>{r(n);const i=new Oe().readFeatures(n);for(const c of i)t.current.push(c)},s=g.object("WMS Layer Props",{name:"WMS",url:We,layerName:Ge,tiled:!0,infoFormat:"application/json",customParams:{}});return e.jsxs(e.Fragment,{children:[e.jsxs(_,{style:x,projection:"EPSG:3857",initialBBOX:i4,children:[e.jsx(b,{}),e.jsx(M,{name:"OSM",urls:w,attributions:j}),e.jsx(Ae,{...s,onGetFeatureInfo:o}),e.jsx(T,{name:"WMS Selection",features:t.current})]}),e.jsxs("p",{children:["To verify the WMS layer has all observable props, paste this into the ",e.jsx("strong",{children:"WMS Layer Props"})]}),e.jsx("code",{children:`{
                    "name": "SLIP WA Regional Parks",
                    "url": "https://services.slip.wa.gov.au/public/services/SLIP_Public_Services/Boundaries/MapServer/WMSServer",
                    "layerName": "50",
                    "infoFormat": "application/geo+json",
                    "customParams": {},
                    "tiled": true
                }`}),e.jsx("p",{children:"It should immediately switch to the new layer without any reloading/refreshing"})]})}},le={render:()=>{const t=d.useRef(new W),r=O("Selected Feature"),o=O("UnSelected Feature"),s=h=>r(h),n=h=>o(h);d.useEffect(()=>(t.current.on("add",s),t.current.on("remove",n),()=>{t.current.un("add",s),t.current.un("remove",n)}),[]);const a=g.boolean("Enable drawing",!1),i=g.boolean("Enable select",!1),c=g.boolean("Enable modify",!1),l=g.select("Selection mode",["click","hover"],"click"),p=g.select("Draw geometry type",["Circle","Polygon"],"Polygon"),u=g.boolean("Snap to layer objects",!0),m=g.boolean("Enable Shapes layer",!0),f=g.boolean("Shapes layer hidden",!1),y=g.boolean("OSM layer hidden",!1),v=g.boolean("Enable WMS layer",!0),S=g.boolean("WMS layer hidden",!1),L=g.boolean("WMS layer tiled",!0);return e.jsxs(_,{style:x,projection:"EPSG:3857",children:[e.jsx(b,{}),e.jsx(M,{isHidden:y,name:"OSM",urls:w,attributions:j}),v&&e.jsx(Ae,{isHidden:S,name:"WMS",url:We,layerName:Ge,tiled:L}),m&&e.jsx(T,{isHidden:f,fitInitialViewToThisLayer:!0,name:"Shapes",initialFeatures:G,initialFeatureProjection:"EPSG:4326"}),c&&e.jsx(Re,{target:"Shapes"}),a&&e.jsx(Y,{type:p,target:"Shapes"}),i&&e.jsx(pe,{mode:l,features:t.current}),u&&e.jsx(X,{target:"Shapes"})]})}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:4326" initialBBOX={BBOX_WORLD_WGS84}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
            </CompactViewer>;
  }
}`,...H.parameters?.docs?.source},description:{story:"This example shows an OSM map with tiles reprojected to EPSG:4326",...H.parameters?.docs?.description}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_WORLD_WEB_MERCATOR}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
            </CompactViewer>;
  }
}`,...Z.parameters?.docs?.source},description:{story:"This example shows an OSM map in its native EPSG:3857 (Web Mercator) projection",...Z.parameters?.docs?.description}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const viewChanged = action('Map view changed');
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_WORLD_WEB_MERCATOR}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <ViewListener onMapViewChanged={viewChanged} />
            </CompactViewer>;
  }
}`,...z.parameters?.docs?.source},description:{story:"This example demonstrates the ViewListener component, which listens to changes in the map view",...z.parameters?.docs?.description}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_WORLD_WEB_MERCATOR}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <MousePositionControl />
            </CompactViewer>;
  }
}`,...K.parameters?.docs?.source},description:{story:"This example demonstrates the use of the MousePosition component",...K.parameters?.docs?.description}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const active = boolean('Enable popup content', true);
    const mode = select('Mouse tracking mode', ['click', 'hover'], 'click');
    const [coord, setCoord] = React.useState<Coordinate | undefined>(undefined);
    const popupActive = active && !!coord;
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <ContentOverlay isActive={popupActive} onPositionChange={c => setCoord(c)} mouseTrackingMode={mode} className="ol-popup">
                    <p>
                        {mode === 'click' ? 'You clicked at' : 'You are hovering over'} ({coord?.[0]}, {coord?.[1]})
                    </p>
                </ContentOverlay>
            </CompactViewer>;
  }
}`,...J.parameters?.docs?.source},description:{story:`This example demonstrates the ContentOverlay component, which displays content at the coordinate you clicked or
are hovering over based on the mouse tracking mode.`,...J.parameters?.docs?.description}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => {
    const drawActive = boolean('Enable drawing', true);
    const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
    const snap = boolean('Snap to layer objects', true);
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer name="Shapes" />
                {drawActive && <DrawInteraction type={type} target="Shapes" cancelKey={['Escape']} undoLastPointKey={['u']} />}
                {snap && <SnapInteraction target="Shapes" />}
                <ContentOverlay isActive={drawActive} mouseTrackingMode="hover" className="drawing-prompt">
                    <p>
                        {type === 'Circle' ? 'Click to set the center of the circle. Click again to finish drawing. Press U or ESC to cancel' : 'Click to start drawing. Click to add vertices. Double-click or click the start point to close the polygon to finish. Press U to undo the last vertex. Press ESC to cancel'}
                    </p>
                </ContentOverlay>
            </CompactViewer>;
  }
}`,...$.parameters?.docs?.source},description:{story:"This example demonstrates the ContentOverlay component used as a prompt for drawing shapes",...$.parameters?.docs?.description}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
            </CompactViewer>;
  }
}`,...q.parameters?.docs?.source},description:{story:"This example has a vector layer with an initial set of GeoJSON features",...q.parameters?.docs?.description}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    return <>
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
                <p>This layer is for debugging purposes only and should not be included in production code.</p>
            </>;
  }
}`,...Q.parameters?.docs?.source},description:{story:"This example demonstrates the use of the DebugVectorPointLayer component",...Q.parameters?.docs?.description}}};ee.parameters={...ee.parameters,docs:{...ee.parameters?.docs,source:{originalSource:`{
  render: () => {
    const style: VectorLayerProps['style'] = [{
      filter: ['==', ['get', 'label'], 'ICA1'],
      style: {
        'fill-color': '#eff3ff',
        'stroke-color': '#000000'
      }
    }, {
      filter: ['==', ['get', 'label'], 'MCA'],
      style: {
        'fill-color': '#bdd7e7',
        'stroke-color': '#000000'
      }
    }, {
      filter: ['==', ['get', 'label'], 'ICA2'],
      style: {
        'fill-color': '#6baed6',
        'stroke-color': '#000000'
      }
    }, {
      filter: ['==', ['get', 'label'], 'DPA'],
      style: {
        'fill-color': '#2171b5',
        'stroke-color': '#000000'
      }
    }];
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer style={style} name="Shapes" initialFeatures={buildings} initialFeatureProjection="EPSG:4326" />
            </CompactViewer>;
  }
}`,...ee.parameters?.docs?.source},description:{story:"This example has a vector layer with an initial set of GeoJSON features and a thematic style",...ee.parameters?.docs?.description}}};fe.parameters={...fe.parameters,docs:{...fe.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [features, isReady] = useTestPointData(100);
    const addHandler = action('Selected Feature');
    const removeHandler = action('UnSelected Feature');
    const [markerCount, setMarkerCount] = React.useState<number | undefined>(undefined);
    const [selFeatures, selReady, selTrackedFeatures] = useTrackedFeatureCollection({
      addHandler: addHandler,
      removeHandler: removeHandler,
      processFeatureToAdd: e => e.element.get('features') ?? [e.element],
      processFeatureToRemove: e => e.element.get('features') ?? [e.element]
    });
    if (!isReady) {
      return null;
    }
    const popupActive = selTrackedFeatures.length > 0;
    const viewChanged = (map: Map, view: View) => {
      const layer = recursiveFindLayer(map.getLayers(), l => l.get('name') === 'Points');
      if (layer && layer instanceof OLVectorLayer) {
        const vs = layer.getSource();
        if (vs instanceof OLVectorSource) {
          const extent = map.getView().calculateExtent(map.getSize());
          let featureCount = 0;
          vs.forEachFeatureInExtent(extent, f => {
            featureCount++;
          });
          setMarkerCount(featureCount);
        }
      }
    };
    return <>
                <CompactViewer style={VIEWER_STYLE} maxZoom={20} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer onFeaturesClicked={handleClusterZoomToClickAndSelection} name="Points" style={MARKER_STYLE} features={features} initialFeatureProjection="EPSG:3857" />
                    <ViewListener onMapViewChanged={viewChanged} />
                    {selReady && <SelectInteraction mode="click" features={selFeatures} />}
                    <ContentOverlay isActive={popupActive} mouseTrackingMode="click" className="ol-popup">
                        <div style={{
            maxHeight: 200,
            overflowY: 'auto'
          }}>
                            <h3>Selection: {selTrackedFeatures.length}</h3>
                            <ul>
                                {selTrackedFeatures.map(f => <li key={f.getId()}>ID: {f.getId()}</li>)}
                            </ul>
                        </div>
                    </ContentOverlay>
                </CompactViewer>
                {markerCount != null && <p>Markers in current view: {markerCount}</p>}
            </>;
  }
}`,...fe.parameters?.docs?.source}}};ge.parameters={...ge.parameters,docs:{...ge.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [features, isReady] = useTestPointData();
    const clusterDistance = number('Cluster distance (in pixels)', 40, {
      range: true,
      min: 0,
      max: 200,
      step: 1
    });
    const clusterMinDistance = number('Cluster minimum distance (in pixels)', 20, {
      range: true,
      min: 0,
      max: 200,
      step: 1
    });
    const enabled = boolean('Enable clustering', true);
    const settings: ClusterSettings | undefined = enabled ? {
      distance: clusterDistance,
      minDistance: clusterMinDistance
    } : undefined;
    const style = useClusteredStyle(enabled);
    if (!isReady) {
      return null;
    }
    return <>
                <CompactViewer style={VIEWER_STYLE} maxZoom={20} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer onFeaturesClicked={handleClusterZoomToClick} style={style} name="Points" features={features} clusterSettings={settings} initialFeatureProjection="EPSG:3857" />
                </CompactViewer>
                <p>Clicking on a cluster of multiple points will automatically zoom into its bounding extent.</p>
                <p>
                    The <code>handleClusterZoomToClick</code> function registered to the <code>onFeaturesClicked</code> event of the{' '}
                    <code>VectorLayer</code> component will automatically zoom to the bounding extent of the cluster
                </p>
            </>;
  }
}`,...ge.parameters?.docs?.source}}};he.parameters={...he.parameters,docs:{...he.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [features, isReady] = useTestPointData();
    const clusterDistance = number('Cluster distance (in pixels)', 40, {
      range: true,
      min: 0,
      max: 200,
      step: 1
    });
    const clusterMinDistance = number('Cluster minimum distance (in pixels)', 20, {
      range: true,
      min: 0,
      max: 200,
      step: 1
    });
    const enabled = boolean('Enable clustering', true);
    const addHandler = action('Selected Feature');
    const removeHandler = action('UnSelected Feature');
    const clusterMinZoomSize = number('Cluster zoom size limit', 1, {
      range: true,
      min: 1,
      max: 10,
      step: 1
    });
    const [selFeatures, selReady, selTrackedFeatures] = useTrackedFeatureCollection({
      addHandler: addHandler,
      removeHandler: removeHandler,
      processFeatureToAdd: e => e.element.get('features') ?? [e.element],
      processFeatureToRemove: e => e.element.get('features') ?? [e.element]
    });
    const handler = React.useCallback((e, map, fs) => {
      handleClusterZoomToClickAndSelection(e, map, fs, clusterMinZoomSize);
    }, [clusterMinZoomSize]);
    const settings: ClusterSettings | undefined = enabled ? {
      distance: clusterDistance,
      minDistance: clusterMinDistance
    } : undefined;
    const style = useClusteredStyle(enabled);
    if (!isReady) {
      return null;
    }
    const popupActive = selTrackedFeatures.length > 0;
    return <>
                <CompactViewer style={VIEWER_STYLE} maxZoom={20} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer onFeaturesClicked={handler} style={style} name="Points" features={features} clusterSettings={settings} initialFeatureProjection="EPSG:3857" />
                    {selReady && <SelectInteraction mode="never" features={selFeatures} />}
                    <ContentOverlay isActive={popupActive} mouseTrackingMode="click" className="ol-popup">
                        <div style={{
            maxHeight: 200,
            overflowY: 'auto'
          }}>
                            <h3>Selection: {selTrackedFeatures.length}</h3>
                            <ul>
                                {selTrackedFeatures.map(f => <li key={f.getId()}>ID: {f.getId()}</li>)}
                            </ul>
                        </div>
                    </ContentOverlay>
                </CompactViewer>
                <p>
                    Clicking on a cluster of multiple points will automatically zoom into its bounding extent. Clicking on a single point cluster will
                    select it. Clicking on a multi-point cluster at the lowest possible zoom will also select it
                </p>
                <p>
                    You can adjust the <code>Cluster zoom size limit</code> to control how many features must be in a cluster at a minimum before it
                    is zoomed into on click. The default is 1, which means any cluster click will zoom into the cluster extent until you reach the
                    lowest possible zoom level.
                </p>
                <p>The cluster in Perth, Australia will be selectable at the lowest possible zoom</p>
                <p>
                    The <code>maxZoom</code> for this map has been constrained to 20 (street level) which means any cluster clicks at this level will
                    select instead of trying to zoom any further
                </p>
                <p>
                    The <code>SelectInteraction</code> by default does not play nice with click-driven content overlays like popups due to clashing
                    click event handlers.
                </p>
                <p>
                    To make this <code>SelectInteraction</code> work with click-driven content overlays, the <code>mode</code> prop has been set to{' '}
                    <code>'never'</code>
                    and selection is completely done programmatically through the <code>onFeaturesClicked</code> event handler of the{' '}
                    <code>VectorLayer</code> component.
                </p>
                <p>
                    Setting the <code>features</code> prop of the <code>SelectInteraction</code> to an observable feature collection is optional for
                    the purpose of programmatic selection, we are binding a collection in this example so that you can:
                </p>
                <ol>
                    <li>Observe the features being added/removed through the actions addon</li>
                    <li>
                        Pair it with a react-observable array copy (via the <code>useTrackedFeatureCollection</code> hook) that is used to update the
                        popup content that you see and to control when this popup is displayed
                    </li>
                </ol>
            </>;
  }
}`,...he.parameters?.docs?.source}}};te.parameters={...te.parameters,docs:{...te.parameters?.docs,source:{originalSource:`{
  render: () => {
    const selMode = select('Selection mode', ['click', 'hover'], 'click');
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                <SelectInteraction mode={selMode} />
            </CompactViewer>;
  }
}`,...te.parameters?.docs?.source},description:{story:"This example has a selection interaction that operates against the vector layer",...te.parameters?.docs?.description}}};re.parameters={...re.parameters,docs:{...re.parameters?.docs,source:{originalSource:`{
  render: () => {
    const selMode = select('Selection mode', ['click', 'hover'], 'click');
    const addHandler = action('Selected Feature');
    const removeHandler = action('UnSelected Feature');
    const [features, isReady] = useFeatureCollection({
      addHandler: addHandler,
      removeHandler: removeHandler
    });
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <VectorLayer fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                {isReady && <SelectInteraction mode={selMode} features={features} />}
            </CompactViewer>;
  }
}`,...re.parameters?.docs?.source},description:{story:"This example has a select interaction that propagates selection to an observable feature collection",...re.parameters?.docs?.description}}};oe.parameters={...oe.parameters,docs:{...oe.parameters?.docs,source:{originalSource:`{
  render: () => {
    const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
    const snap = boolean('Snap to layer objects', true);
    return <>
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
            </>;
  }
}`,...oe.parameters?.docs?.source},description:{story:"This example has a draw interaction that draws into the specified vector layer (by name)",...oe.parameters?.docs?.description}}};ne.parameters={...ne.parameters,docs:{...ne.parameters?.docs,source:{originalSource:`{
  render: () => {
    const type = select('Draw geometry type', ['Circle', 'Polygon'], 'Polygon');
    const snap = boolean('Snap to layer objects', true);
    return <>
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
            </>;
  }
}`,...ne.parameters?.docs?.source},description:{story:"This example has a draw interaction that draws into the specified vector layer (by name) and can be edited",...ne.parameters?.docs?.description}}};ae.parameters={...ae.parameters,docs:{...ae.parameters?.docs,source:{originalSource:`{
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
    return <>
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
            </>;
  }
}`,...ae.parameters?.docs?.source},description:{story:`This example has a draw interaction that draws into the specified vector layer (by name) and has a
custom style for the feature being drawn`,...ae.parameters?.docs?.description}}};se.parameters={...se.parameters,docs:{...se.parameters?.docs,source:{originalSource:`{
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
    return <>
                <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                    <MapMessages />
                    <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                    <VectorLayer fitInitialViewToThisLayer name="Shapes" features={features.current} initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />
                    <DrawInteraction type={type} target={features.current} cancelKey={['Escape']} undoLastPointKey={['u']} />
                    <ModifyInteraction target={features.current} />
                    {snap && <SnapInteraction target={features.current} />}
                </CompactViewer>
                <p>
                    Press <strong>Escape</strong> to cancel the current drawing operation. Press <strong>U</strong> to undo the last drawn point
                </p>
            </>;
  }
}`,...se.parameters?.docs?.source},description:{story:"This example has both draw and modify interaction and vector layer be backed by the same feature collection",...se.parameters?.docs?.description}}};ie.parameters={...ie.parameters,docs:{...ie.parameters?.docs,source:{originalSource:`{
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
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857" initialBBOX={BBOX_AU_3857}>
                <MapMessages />
                <XYZLayer name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                <WMSLayer name="WMS" url={WMS_URL} layerName={WMS_LAYER} tiled={true} infoFormat="application/json" onGetFeatureInfo={onGetFeatureInfo} />
                <VectorLayer name="WMS Selection" features={features.current} />
            </CompactViewer>;
  }
}`,...ie.parameters?.docs?.source},description:{story:"This example showcases a WMS layer with GetFeatureInfo support that funnels selections to a vector layer",...ie.parameters?.docs?.description}}};ce.parameters={...ce.parameters,docs:{...ce.parameters?.docs,source:{originalSource:`{
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
    return <>
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
                    {\`{
                    "name": "SLIP WA Regional Parks",
                    "url": "https://services.slip.wa.gov.au/public/services/SLIP_Public_Services/Boundaries/MapServer/WMSServer",
                    "layerName": "50",
                    "infoFormat": "application/geo+json",
                    "customParams": {},
                    "tiled": true
                }\`}
                </code>
                <p>It should immediately switch to the new layer without any reloading/refreshing</p>
            </>;
  }
}`,...ce.parameters?.docs?.source},description:{story:"This example showcases a WMS layer with all props being dynamically observable",...ce.parameters?.docs?.description}}};le.parameters={...le.parameters,docs:{...le.parameters?.docs,source:{originalSource:`{
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
    return <CompactViewer style={VIEWER_STYLE} projection="EPSG:3857">
                <MapMessages />
                <XYZLayer isHidden={hideOsmLayer} name="OSM" urls={OSM_URLS} attributions={OSM_ATTRIBUTIONS} />
                {enableWmsLayer && <WMSLayer isHidden={hideWmsLayer} name="WMS" url={WMS_URL} layerName={WMS_LAYER} tiled={tileWmsLayer} />}
                {enableVectorLayer && <VectorLayer isHidden={hideVectorLayer} fitInitialViewToThisLayer name="Shapes" initialFeatures={TEST_GEOJSON} initialFeatureProjection="EPSG:4326" />}
                {enableModify && <ModifyInteraction target="Shapes" />}
                {enableDraw && <DrawInteraction type={type} target="Shapes" />}
                {enableSelect && <SelectInteraction mode={selMode} features={features.current} />}
                {snap && <SnapInteraction target="Shapes" />}
            </CompactViewer>;
  }
}`,...le.parameters?.docs?.source},description:{story:'This example is a "kitchen sink" that tests all possible prop combinations and component mounting/unmounting',...le.parameters?.docs?.description}}};const yt=["_BasicExampleEPSG4326","_BasicExampleEPSG3857","_ViewListener","_MousePosition","_ContentOverlay","_ContentOverlayAsDrawingPrompt","_VectorLayer","_DebugVectorPoints","_VectorLayerThemed","_VectorLayerWithPointMarkers","_VectorLayerWithClustering","_VectorLayerWithClusteringAndSelection","_VectorLayerWithSelection","_VectorLayerWithSelectionTracking","_VectorLayerWithDrawing","_VectorLayerWithDrawingAndModify","_VectorLayerWithDrawingCustomStyle","_VectorLayerWithDrawingAndModifyToFeatureCollection","_WmsLayerGetFeatureInfoGeoJSON","_WmsLayerObservability","_MountingAndPropsTest"];export{Z as _BasicExampleEPSG3857,H as _BasicExampleEPSG4326,J as _ContentOverlay,$ as _ContentOverlayAsDrawingPrompt,Q as _DebugVectorPoints,le as _MountingAndPropsTest,K as _MousePosition,q as _VectorLayer,ee as _VectorLayerThemed,ge as _VectorLayerWithClustering,he as _VectorLayerWithClusteringAndSelection,oe as _VectorLayerWithDrawing,ne as _VectorLayerWithDrawingAndModify,se as _VectorLayerWithDrawingAndModifyToFeatureCollection,ae as _VectorLayerWithDrawingCustomStyle,fe as _VectorLayerWithPointMarkers,te as _VectorLayerWithSelection,re as _VectorLayerWithSelectionTracking,z as _ViewListener,ie as _WmsLayerGetFeatureInfoGeoJSON,ce as _WmsLayerObservability,yt as __namedExportsOrder,mt as default};
