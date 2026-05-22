import * as MapGuide from "./library";

declare global {
   interface Window {
      MapGuide: typeof MapGuide;
   }
}

if (typeof window !== "undefined") {
   window.MapGuide = MapGuide;
}

export default MapGuide;
