/**
 * Markdown documentation content for story docs pages
 * @hidden
 * @since 0.15
 */
import accordionDocs from "./accordion.md";
import commonComponentsDocs from "./common-components.md";
import compactViewerDocs from "./compact-viewer.md";
import commonElementsDocs from "./common-elements.md";
import mapInteractionDocs from "./map-and-map-interaction-components.md";
import mapGuideSpecificDocs from "./mapguide-specific.md";
import modalLauncherDocs from "./viewer-containers-modal-launcher.md";
import viewerComponentsDocs from "./viewer-components.md";

export {
  accordionDocs,
  commonComponentsDocs,
  compactViewerDocs,
  commonElementsDocs,
  mapGuideSpecificDocs,
  mapInteractionDocs,
  modalLauncherDocs,
  viewerComponentsDocs,
};

/**
 * Helper to get docs by path
 */
export function getDocsContent(path: string): string {
  const docsMap: Record<string, string> = {
    accordion: accordionDocs,
    "common-components": commonComponentsDocs,
    "compact-viewer": compactViewerDocs,
    "common-elements": commonElementsDocs,
    "map-and-map-interaction-components": mapInteractionDocs,
    "mapguide-specific": mapGuideSpecificDocs,
    "viewer-containers-modal-launcher": modalLauncherDocs,
    "viewer-components": viewerComponentsDocs,
  };

  return docsMap[path] || "";
}
