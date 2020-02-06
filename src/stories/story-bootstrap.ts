import { bootstrap } from "../api";
import { addFormatDriver } from "../api/layer-manager/driver-registry";
import { CsvFormatDriver, CSV_COLUMN_ALIASES } from "../api/layer-manager/csv-driver";
import { FormatDriver } from "../api/layer-manager/format-driver";
import KML from "ol/format/KML";
import GPX from "ol/format/GPX";
import IGC from "ol/format/IGC";
import GeoJSON from "ol/format/GeoJSON";
import TopoJSON from "ol/format/TopoJSON";

// Bootstrap the viewer
/*
bootstrap();
addFormatDriver(new CsvFormatDriver(CSV_COLUMN_ALIASES));
addFormatDriver(new FormatDriver("GeoJSON", new GeoJSON()));
addFormatDriver(new FormatDriver("TopoJSON", new TopoJSON()));
addFormatDriver(new FormatDriver("KML", new KML(), "EPSG:4326"));
addFormatDriver(new FormatDriver("GPX", new GPX(), "EPSG:4326"));
addFormatDriver(new FormatDriver("IGC", new IGC()));
*/