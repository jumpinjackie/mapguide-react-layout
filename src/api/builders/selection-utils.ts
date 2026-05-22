import type { ActiveSelectedFeature } from "../common";
import type { FeatureSet } from "../contracts/query";

export function buildSelectionXml(selection: FeatureSet | undefined, layerIds?: string[]): string {
   let idCount = 0;
   let xml = '<?xml version="1.0" encoding="utf-8"?>';
   xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
   if (selection) {
      const selLayers = selection.Layer;
      for (const layer of selLayers) {
         const layerId = layer["@id"];
         if (layerIds != null && layerIds.indexOf(layerId) < 0) {
            continue;
         }
         const cls = layer.Class;
         if (cls.ID.length === 0) {
            continue;
         }
         xml += `<Layer id="${layerId}">`;
         xml += `<Class id="${cls["@id"]}">`;
         for (const id of cls.ID) {
            xml += `<ID>${id}</ID>`;
            idCount++;
         }
         xml += "</Class>";
         xml += "</Layer>";
      }
   }
   xml += "</FeatureSet>";
   return idCount > 0 ? xml : "";
}

export function getActiveSelectedFeatureXml(selection: FeatureSet, feat: ActiveSelectedFeature): string | undefined {
   for (const layer of selection.Layer) {
      const layerId = layer["@id"];
      if (layerId == feat.layerId) {
         const key = feat.selectionKey;
         let xml = '<?xml version="1.0" encoding="utf-8"?>';
         xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
         xml += `<Layer id="${layerId}">`;
         xml += `<Class id="${layer.Class["@id"]}">`;
         xml += `<ID>${key}</ID>`;
         xml += "</Class>";
         xml += "</Layer>";
         xml += "</FeatureSet>";
         return xml;
      }
   }
}
