var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { a as getFloat16, f as findTagsByName, g as getAttribute, W as Worker, Q as QuickLRU } from "./geotiff-deps-debug.js";
import { d as DataTileSource, aK as error, b4 as multiply, ab as TileGrid, b3 as makeInverse, aB as create$1, au as applyTransform, bd as toUserExtent, bc as toUserCoordinate, aU as getCenter, ax as clamp, aY as getIntersection, aS as get, aQ as fromProjectionCode, aN as fromCode, Y as Projection, aE as createTransformFromCoordinateTransform, at as apply } from "../vendor-debug.js";
import { i as inflate_1, Z as ZSTDDecoder, L as Lerc, a as ZSTDDecoder$1 } from "./geotiff-codecs-debug.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const fieldTypes = {
  BYTE: (
    /** @type {1} */
    1
  ),
  ASCII: (
    /** @type {2} */
    2
  ),
  SHORT: (
    /** @type {3} */
    3
  ),
  LONG: (
    /** @type {4} */
    4
  ),
  RATIONAL: (
    /** @type {5} */
    5
  ),
  SBYTE: (
    /** @type {6} */
    6
  ),
  UNDEFINED: (
    /** @type {7} */
    7
  ),
  SSHORT: (
    /** @type {8} */
    8
  ),
  SLONG: (
    /** @type {9} */
    9
  ),
  SRATIONAL: (
    /** @type {10} */
    10
  ),
  FLOAT: (
    /** @type {11} */
    11
  ),
  DOUBLE: (
    /** @type {12} */
    12
  ),
  // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
  IFD: (
    /** @type {13} */
    13
  ),
  // introduced by BigTIFF
  LONG8: (
    /** @type {16} */
    16
  ),
  SLONG8: (
    /** @type {17} */
    17
  ),
  IFD8: (
    /** @type {18} */
    18
  )
};
const fieldTypeSizes = (
  /** @type {const} */
  {
    [fieldTypes.BYTE]: 1,
    [fieldTypes.ASCII]: 1,
    [fieldTypes.SBYTE]: 1,
    [fieldTypes.UNDEFINED]: 1,
    [fieldTypes.SHORT]: 2,
    [fieldTypes.SSHORT]: 2,
    [fieldTypes.LONG]: 4,
    [fieldTypes.SLONG]: 4,
    [fieldTypes.FLOAT]: 4,
    [fieldTypes.IFD]: 4,
    [fieldTypes.RATIONAL]: 8,
    [fieldTypes.SRATIONAL]: 8,
    [fieldTypes.DOUBLE]: 8,
    [fieldTypes.LONG8]: 8,
    [fieldTypes.SLONG8]: 8,
    [fieldTypes.IFD8]: 8
  }
);
function getFieldTypeSize(fieldType) {
  const size = fieldTypeSizes[fieldType];
  if (size === void 0) {
    throw new RangeError(`Invalid field type: ${fieldType}`);
  }
  return size;
}
const tagDictionary = (
  /** @type {const} */
  {
    NewSubfileType: { tag: 254, type: fieldTypes.LONG, eager: true },
    SubfileType: { tag: 255, type: fieldTypes.SHORT, eager: true },
    ImageWidth: { tag: 256, type: fieldTypes.SHORT, eager: true },
    ImageLength: { tag: 257, type: fieldTypes.SHORT, eager: true },
    BitsPerSample: { tag: 258, type: fieldTypes.SHORT, isArray: true, eager: true },
    Compression: { tag: 259, type: fieldTypes.SHORT, eager: true },
    PhotometricInterpretation: { tag: 262, type: fieldTypes.SHORT, eager: true },
    Threshholding: { tag: 263, type: fieldTypes.SHORT },
    CellWidth: { tag: 264, type: fieldTypes.SHORT },
    CellLength: { tag: 265, type: fieldTypes.SHORT },
    FillOrder: { tag: 266, type: fieldTypes.SHORT },
    DocumentName: { tag: 269, type: fieldTypes.ASCII },
    ImageDescription: { tag: 270, type: fieldTypes.ASCII },
    Make: { tag: 271, type: fieldTypes.ASCII },
    Model: { tag: 272, type: fieldTypes.ASCII },
    StripOffsets: { tag: 273, type: fieldTypes.SHORT, isArray: true },
    Orientation: { tag: 274, type: fieldTypes.SHORT },
    SamplesPerPixel: { tag: 277, type: fieldTypes.SHORT, eager: true },
    RowsPerStrip: { tag: 278, type: fieldTypes.SHORT, eager: true },
    StripByteCounts: { tag: 279, type: fieldTypes.LONG, isArray: true },
    MinSampleValue: { tag: 280, type: fieldTypes.SHORT, isArray: true },
    MaxSampleValue: { tag: 281, type: fieldTypes.SHORT, isArray: true },
    XResolution: { tag: 282, type: fieldTypes.RATIONAL },
    YResolution: { tag: 283, type: fieldTypes.RATIONAL },
    PlanarConfiguration: { tag: 284, type: fieldTypes.SHORT, eager: true },
    PageName: { tag: 285, type: fieldTypes.ASCII },
    XPosition: { tag: 286, type: fieldTypes.RATIONAL },
    YPosition: { tag: 287, type: fieldTypes.RATIONAL },
    FreeOffsets: { tag: 288, type: fieldTypes.LONG },
    FreeByteCounts: { tag: 289, type: fieldTypes.LONG },
    GrayResponseUnit: { tag: 290, type: fieldTypes.SHORT },
    GrayResponseCurve: { tag: 291, type: fieldTypes.SHORT, isArray: true },
    T4Options: { tag: 292, type: fieldTypes.LONG },
    T6Options: { tag: 293, type: fieldTypes.LONG },
    ResolutionUnit: { tag: 296, type: fieldTypes.SHORT },
    PageNumber: { tag: 297, type: fieldTypes.SHORT, isArray: true },
    TransferFunction: { tag: 301, type: fieldTypes.SHORT, isArray: true },
    Software: { tag: 305, type: fieldTypes.ASCII },
    DateTime: { tag: 306, type: fieldTypes.ASCII },
    Artist: { tag: 315, type: fieldTypes.ASCII },
    HostComputer: { tag: 316, type: fieldTypes.ASCII },
    Predictor: { tag: 317, type: fieldTypes.SHORT },
    WhitePoint: { tag: 318, type: fieldTypes.RATIONAL, isArray: true },
    PrimaryChromaticities: { tag: 319, type: fieldTypes.RATIONAL, isArray: true },
    ColorMap: { tag: 320, type: fieldTypes.SHORT, isArray: true },
    HalftoneHints: { tag: 321, type: fieldTypes.SHORT, isArray: true },
    TileWidth: { tag: 322, type: fieldTypes.SHORT, eager: true },
    TileLength: { tag: 323, type: fieldTypes.SHORT, eager: true },
    TileOffsets: { tag: 324, type: fieldTypes.LONG, isArray: true },
    TileByteCounts: { tag: 325, type: fieldTypes.SHORT, isArray: true },
    InkSet: { tag: 332, type: fieldTypes.SHORT },
    InkNames: { tag: 333, type: fieldTypes.ASCII },
    NumberOfInks: { tag: 334, type: fieldTypes.SHORT },
    DotRange: { tag: 336, type: fieldTypes.BYTE, isArray: true },
    TargetPrinter: { tag: 337, type: fieldTypes.ASCII },
    ExtraSamples: { tag: 338, type: fieldTypes.BYTE, isArray: true, eager: true },
    SampleFormat: { tag: 339, type: fieldTypes.SHORT, isArray: true, eager: true },
    SMinSampleValue: { tag: 340, isArray: true },
    SMaxSampleValue: { tag: 341, isArray: true },
    TransferRange: { tag: 342, type: fieldTypes.SHORT, isArray: true },
    JPEGProc: { tag: 512, type: fieldTypes.SHORT },
    JPEGInterchangeFormat: { tag: 513, type: fieldTypes.LONG },
    JPEGInterchangeFormatLngth: { tag: 514, type: fieldTypes.LONG },
    JPEGRestartInterval: { tag: 515, type: fieldTypes.SHORT },
    JPEGLosslessPredictors: { tag: 517, type: fieldTypes.SHORT, isArray: true },
    JPEGPointTransforms: { tag: 518, type: fieldTypes.SHORT, isArray: true },
    JPEGQTables: { tag: 519, type: fieldTypes.LONG, isArray: true },
    JPEGDCTables: { tag: 520, type: fieldTypes.LONG, isArray: true },
    JPEGACTables: { tag: 521, type: fieldTypes.LONG, isArray: true },
    YCbCrCoefficients: { tag: 529, type: fieldTypes.RATIONAL, isArray: true },
    YCbCrSubSampling: { tag: 530, type: fieldTypes.SHORT, isArray: true },
    YCbCrPositioning: { tag: 531, type: fieldTypes.SHORT },
    ReferenceBlackWhite: { tag: 532, type: fieldTypes.LONG, isArray: true },
    Copyright: { tag: 33432, type: fieldTypes.ASCII },
    BadFaxLines: { tag: 326 },
    CleanFaxData: { tag: 327 },
    ClipPath: { tag: 343 },
    ConsecutiveBadFaxLines: { tag: 328 },
    Decode: { tag: 433 },
    DefaultImageColor: { tag: 434 },
    Indexed: { tag: 346 },
    JPEGTables: { tag: 347, isArray: true, eager: true },
    StripRowCounts: { tag: 559, isArray: true },
    SubIFDs: { tag: 330, isArray: true },
    XClipPathUnits: { tag: 344 },
    YClipPathUnits: { tag: 345 },
    ApertureValue: { tag: 37378 },
    ColorSpace: { tag: 40961 },
    DateTimeDigitized: { tag: 36868 },
    DateTimeOriginal: { tag: 36867 },
    ExifIFD: { tag: 34665, name: "Exif IFD", type: fieldTypes.LONG },
    ExifVersion: { tag: 36864 },
    ExposureTime: { tag: 33434 },
    FileSource: { tag: 41728 },
    Flash: { tag: 37385 },
    FlashpixVersion: { tag: 40960 },
    FNumber: { tag: 33437 },
    ImageUniqueID: { tag: 42016 },
    LightSource: { tag: 37384 },
    MakerNote: { tag: 37500 },
    ShutterSpeedValue: { tag: 37377 },
    UserComment: { tag: 37510 },
    IPTC: { tag: 33723 },
    CZ_LSMINFO: { tag: 34412 },
    ICCProfile: { tag: 34675, name: "ICC Profile" },
    XMP: { tag: 700 },
    GDAL_METADATA: { tag: 42112 },
    GDAL_NODATA: { tag: 42113, type: fieldTypes.ASCII, eager: true },
    Photoshop: { tag: 34377 },
    ModelPixelScale: { tag: 33550, type: fieldTypes.DOUBLE, isArray: true, eager: true },
    ModelTiepoint: { tag: 33922, type: fieldTypes.DOUBLE, isArray: true, eager: true },
    ModelTransformation: { tag: 34264, type: fieldTypes.DOUBLE, isArray: true, eager: true },
    GeoKeyDirectory: { tag: 34735, type: fieldTypes.SHORT, isArray: true, eager: true },
    GeoDoubleParams: { tag: 34736, type: fieldTypes.DOUBLE, isArray: true, eager: true },
    GeoAsciiParams: { tag: 34737, type: fieldTypes.ASCII, eager: true },
    LercParameters: { tag: 50674, eager: true }
  }
);
const tags = {};
const tagDefinitions = {};
function registerTag(tag, name, type, isArray = false, eager = false) {
  tags[name] = tag;
  tagDefinitions[tag] = { tag, name, type: typeof type === "string" ? fieldTypes[type] : type, isArray, eager };
}
for (const [key, value] of Object.entries(tagDictionary)) {
  const entry = (
    /** @type {TagDictionaryEntry} */
    value
  );
  registerTag(entry.tag, entry.name || key, entry.type, entry.isArray, entry.eager);
}
function resolveTag(tagIdentifier) {
  if (typeof tagIdentifier === "number") {
    return tagIdentifier;
  }
  return tags[tagIdentifier];
}
const photometricInterpretations = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  CMYK: 5,
  YCbCr: 6,
  CIELab: 8,
  ICCLab: 9
};
const ExtraSamplesValues = {
  Unspecified: 0
};
const LercParameters = {
  AddCompression: 1
};
const LercAddCompression = {
  None: 0,
  Deflate: 1,
  Zstandard: 2
};
const geoKeyNames = (
  /** @type {const} */
  {
    1024: "GTModelTypeGeoKey",
    1025: "GTRasterTypeGeoKey",
    1026: "GTCitationGeoKey",
    2048: "GeographicTypeGeoKey",
    2049: "GeogCitationGeoKey",
    2050: "GeogGeodeticDatumGeoKey",
    2051: "GeogPrimeMeridianGeoKey",
    2052: "GeogLinearUnitsGeoKey",
    2053: "GeogLinearUnitSizeGeoKey",
    2054: "GeogAngularUnitsGeoKey",
    2055: "GeogAngularUnitSizeGeoKey",
    2056: "GeogEllipsoidGeoKey",
    2057: "GeogSemiMajorAxisGeoKey",
    2058: "GeogSemiMinorAxisGeoKey",
    2059: "GeogInvFlatteningGeoKey",
    2060: "GeogAzimuthUnitsGeoKey",
    2061: "GeogPrimeMeridianLongGeoKey",
    2062: "GeogTOWGS84GeoKey",
    3072: "ProjectedCSTypeGeoKey",
    3073: "PCSCitationGeoKey",
    3074: "ProjectionGeoKey",
    3075: "ProjCoordTransGeoKey",
    3076: "ProjLinearUnitsGeoKey",
    3077: "ProjLinearUnitSizeGeoKey",
    3078: "ProjStdParallel1GeoKey",
    3079: "ProjStdParallel2GeoKey",
    3080: "ProjNatOriginLongGeoKey",
    3081: "ProjNatOriginLatGeoKey",
    3082: "ProjFalseEastingGeoKey",
    3083: "ProjFalseNorthingGeoKey",
    3084: "ProjFalseOriginLongGeoKey",
    3085: "ProjFalseOriginLatGeoKey",
    3086: "ProjFalseOriginEastingGeoKey",
    3087: "ProjFalseOriginNorthingGeoKey",
    3088: "ProjCenterLongGeoKey",
    3089: "ProjCenterLatGeoKey",
    3090: "ProjCenterEastingGeoKey",
    3091: "ProjCenterNorthingGeoKey",
    3092: "ProjScaleAtNatOriginGeoKey",
    3093: "ProjScaleAtCenterGeoKey",
    3094: "ProjAzimuthAngleGeoKey",
    3095: "ProjStraightVertPoleLongGeoKey",
    3096: "ProjRectifiedGridAngleGeoKey",
    4096: "VerticalCSTypeGeoKey",
    4097: "VerticalCitationGeoKey",
    4098: "VerticalDatumGeoKey",
    4099: "VerticalUnitsGeoKey"
  }
);
for (const [key, name] of Object.entries(geoKeyNames)) {
}
function fromWhiteIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = 256 - raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromBlackIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromPalette(raster, colorMap) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  const greenOffset = colorMap.length / 3;
  const blueOffset = colorMap.length / 3 * 2;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    const mapIndex = raster[i];
    rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
    rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
    rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
  }
  return rgbRaster;
}
function fromCMYK(cmykRaster) {
  const { width, height } = cmykRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
    const c = cmykRaster[i];
    const m = cmykRaster[i + 1];
    const y = cmykRaster[i + 2];
    const k = cmykRaster[i + 3];
    rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
    rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
    rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
  }
  return rgbRaster;
}
function fromYCbCr(yCbCrRaster) {
  const { width, height } = yCbCrRaster;
  const rgbRaster = new Uint8ClampedArray(width * height * 3);
  for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
    const y = yCbCrRaster[i];
    const cb = yCbCrRaster[i + 1];
    const cr = yCbCrRaster[i + 2];
    rgbRaster[j] = y + 1.402 * (cr - 128);
    rgbRaster[j + 1] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128);
    rgbRaster[j + 2] = y + 1.772 * (cb - 128);
  }
  return rgbRaster;
}
const Xn = 0.95047;
const Yn = 1;
const Zn = 1.08883;
function fromCIELab(cieLabRaster) {
  const { width, height } = cieLabRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
    const L = cieLabRaster[i + 0];
    const a_ = cieLabRaster[i + 1] << 24 >> 24;
    const b_ = cieLabRaster[i + 2] << 24 >> 24;
    let y = (L + 16) / 116;
    let x = a_ / 500 + y;
    let z = y - b_ / 200;
    let r;
    let g;
    let b;
    x = Xn * (x * x * x > 8856e-6 ? x * x * x : (x - 16 / 116) / 7.787);
    y = Yn * (y * y * y > 8856e-6 ? y * y * y : (y - 16 / 116) / 7.787);
    z = Zn * (z * z * z > 8856e-6 ? z * z * z : (z - 16 / 116) / 7.787);
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * __pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 31308e-7 ? 1.055 * __pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 31308e-7 ? 1.055 * __pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
    rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
    rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
    rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
  }
  return rgbRaster;
}
const registry = /* @__PURE__ */ new Map();
function defaultDecoderParameterFn(fileDirectory) {
  return __async(this, null, function* () {
    const isTiled = !fileDirectory.hasTag("StripOffsets");
    return (
      /** @type {BaseDecoderParameters} */
      {
        tileWidth: isTiled ? yield fileDirectory.loadValue("TileWidth") : yield fileDirectory.loadValue("ImageWidth"),
        tileHeight: isTiled ? yield fileDirectory.loadValue("TileLength") : (yield fileDirectory.loadValue("RowsPerStrip")) || (yield fileDirectory.loadValue("ImageLength")),
        planarConfiguration: yield fileDirectory.loadValue("PlanarConfiguration"),
        bitsPerSample: yield fileDirectory.loadValue("BitsPerSample"),
        predictor: (yield fileDirectory.loadValue("Predictor")) || 1
      }
    );
  });
}
function addDecoder(cases, importFn, decoderParameterFn = defaultDecoderParameterFn, preferWorker_ = true) {
  if (!Array.isArray(cases)) {
    cases = [cases];
  }
  cases.forEach((c) => {
    registry.set(c, { importFn, decoderParameterFn, preferWorker: preferWorker_ });
  });
}
function getDecoderParameters(compression, fileDirectory) {
  return __async(this, null, function* () {
    if (!registry.has(compression)) {
      throw new Error(`Unknown compression method identifier: ${compression}`);
    }
    const { decoderParameterFn } = (
      /** @type {RegistryEntry} */
      registry.get(compression)
    );
    return decoderParameterFn(fileDirectory);
  });
}
function getDecoder(compression, decoderParameters) {
  return __async(this, null, function* () {
    if (!registry.has(compression)) {
      throw new Error(`Unknown compression method identifier: ${compression}`);
    }
    const { importFn } = (
      /** @type {RegistryEntry} */
      registry.get(compression)
    );
    const Decoder = yield importFn();
    return new Decoder(decoderParameters);
  });
}
function preferWorker(compression) {
  if (!registry.has(compression)) {
    throw new Error(`Unknown compression method identifier: ${compression}`);
  }
  return (
    /** @type {RegistryEntry} */
    registry.get(compression).preferWorker
  );
}
const defaultDecoderDefinitions = [
  // No compression
  {
    cases: [void 0, 1],
    importFn: () => __vitePreload(() => Promise.resolve().then(() => raw), true ? void 0 : void 0, import.meta.url).then((m) => m.default),
    preferWorker: false
  },
  // LZW
  {
    cases: 5,
    importFn: () => __vitePreload(() => Promise.resolve().then(() => lzw), true ? void 0 : void 0, import.meta.url).then((m) => m.default)
  },
  // Old-style JPEG
  {
    cases: 6,
    importFn: () => {
      throw new Error("old style JPEG compression is not supported.");
    }
  },
  // JPEG
  {
    cases: 7,
    importFn: () => __vitePreload(() => Promise.resolve().then(() => jpeg), true ? void 0 : void 0, import.meta.url).then((m) => m.default),
    /**
     * @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
     */
    decoderParameterFn: (fileDirectory) => __async(void 0, null, function* () {
      return __spreadProps(__spreadValues({}, yield defaultDecoderParameterFn(fileDirectory)), {
        JPEGTables: yield fileDirectory.loadValue("JPEGTables")
      });
    })
  },
  // Deflate / Adobe Deflate
  {
    cases: [8, 32946],
    importFn: () => __vitePreload(() => Promise.resolve().then(() => deflate), true ? void 0 : void 0, import.meta.url).then((m) => m.default)
  },
  // PackBits
  {
    cases: 32773,
    importFn: () => __vitePreload(() => Promise.resolve().then(() => packbits), true ? void 0 : void 0, import.meta.url).then((m) => m.default)
  },
  // LERC
  {
    cases: 34887,
    importFn: () => __vitePreload(() => Promise.resolve().then(() => lerc), true ? void 0 : void 0, import.meta.url).then((m) => __async(void 0, null, function* () {
      yield m.zstd.init();
      return m;
    })).then((m) => m.default),
    /**
     * @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
     */
    decoderParameterFn: (fileDirectory) => __async(void 0, null, function* () {
      return __spreadProps(__spreadValues({}, yield defaultDecoderParameterFn(fileDirectory)), {
        LercParameters: yield fileDirectory.loadValue("LercParameters")
      });
    })
  },
  // zstd
  {
    cases: 5e4,
    importFn: () => __vitePreload(() => Promise.resolve().then(() => zstd$1), true ? void 0 : void 0, import.meta.url).then((m) => __async(void 0, null, function* () {
      yield m.zstd.init();
      return m;
    })).then((m) => m.default)
  },
  // WebP Images
  {
    cases: 50001,
    importFn: () => __vitePreload(() => Promise.resolve().then(() => webimage), true ? void 0 : void 0, import.meta.url).then((m) => m.default),
    /**
     * @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
     */
    decoderParameterFn: (fileDirectory) => __async(void 0, null, function* () {
      return __spreadProps(__spreadValues({}, yield defaultDecoderParameterFn(fileDirectory)), {
        samplesPerPixel: Number(yield fileDirectory.loadValue("SamplesPerPixel")) || 4
      });
    }),
    preferWorker: false
  }
];
for (const decoderDefinition of defaultDecoderDefinitions) {
  const { cases, importFn, decoderParameterFn, preferWorker: preferWorker_ } = decoderDefinition;
  addDecoder(cases, importFn, decoderParameterFn, preferWorker_);
}
function copyNewSize(array, width, height, samplesPerPixel = 1) {
  return new (Object.getPrototypeOf(array)).constructor(width * height * samplesPerPixel);
}
function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const cy = Math.min(Math.round(relY * y), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const cx = Math.min(Math.round(relX * x), inWidth - 1);
        const value = array[cy * inWidth + cx];
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}
function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const rawY = relY * y;
      const yl = Math.floor(rawY);
      const yh = Math.min(Math.ceil(rawY), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const rawX = relX * x;
        const tx = rawX % 1;
        const xl = Math.floor(rawX);
        const xh = Math.min(Math.ceil(rawX), inWidth - 1);
        const ll = array[yl * inWidth + xl];
        const hl = array[yl * inWidth + xh];
        const lh = array[yh * inWidth + xl];
        const hh = array[yh * inWidth + xh];
        const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);
    case "bilinear":
    case "linear":
      return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}
function resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const cy = Math.min(Math.round(relY * y), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const cx = Math.min(Math.round(relX * x), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const value = valueArray[cy * inWidth * samples + cx * samples + i];
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const rawY = relY * y;
    const yl = Math.floor(rawY);
    const yh = Math.min(Math.ceil(rawY), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const rawX = relX * x;
      const tx = rawX % 1;
      const xl = Math.floor(rawX);
      const xh = Math.min(Math.ceil(rawX), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const ll = valueArray[yl * inWidth * samples + xl * samples + i];
        const hl = valueArray[yl * inWidth * samples + xh * samples + i];
        const lh = valueArray[yh * inWidth * samples + xl * samples + i];
        const hh = valueArray[yh * inWidth * samples + xh * samples + i];
        const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);
    case "bilinear":
    case "linear":
      return resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}
function sum(array, start, end) {
  let s = 0;
  for (let i = start; i < end; ++i) {
    s += array[i];
  }
  return s;
}
function arrayForType(format, bitsPerSample, sizeOrData) {
  let TypedArrayConstructor;
  switch (format) {
    case 1:
      if (bitsPerSample <= 8) {
        TypedArrayConstructor = Uint8Array;
      } else if (bitsPerSample <= 16) {
        TypedArrayConstructor = Uint16Array;
      } else if (bitsPerSample <= 32) {
        TypedArrayConstructor = Uint32Array;
      }
      break;
    case 2:
      if (bitsPerSample === 8) {
        TypedArrayConstructor = Int8Array;
      } else if (bitsPerSample === 16) {
        TypedArrayConstructor = Int16Array;
      } else if (bitsPerSample === 32) {
        TypedArrayConstructor = Int32Array;
      }
      break;
    case 3:
      switch (bitsPerSample) {
        case 16:
        case 32:
          TypedArrayConstructor = Float32Array;
          break;
        case 64:
          TypedArrayConstructor = Float64Array;
          break;
      }
      break;
  }
  if (TypedArrayConstructor) {
    if (typeof sizeOrData === "number") {
      return new TypedArrayConstructor(sizeOrData);
    } else if (sizeOrData instanceof ArrayBuffer) {
      return new TypedArrayConstructor(sizeOrData);
    }
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function needsNormalization(format, bitsPerSample) {
  if ((format === 1 || format === 2) && bitsPerSample <= 32 && bitsPerSample % 8 === 0) {
    return false;
  } else if (format === 3 && (bitsPerSample === 16 || bitsPerSample === 32 || bitsPerSample === 64)) {
    return false;
  }
  return true;
}
function normalizeArray(inBuffer, format, planarConfiguration, samplesPerPixel, bitsPerSample, tileWidth, tileHeight) {
  const view = new DataView(inBuffer);
  const outSize = planarConfiguration === 2 ? tileHeight * tileWidth : tileHeight * tileWidth * samplesPerPixel;
  const samplesToTransfer = planarConfiguration === 2 ? 1 : samplesPerPixel;
  const outArray = arrayForType(format, bitsPerSample, outSize);
  const bitMask = parseInt("1".repeat(bitsPerSample), 2);
  if (format === 1) {
    let pixelBitSkip;
    if (planarConfiguration === 1) {
      pixelBitSkip = samplesPerPixel * bitsPerSample;
    } else {
      pixelBitSkip = bitsPerSample;
    }
    let bitsPerLine = tileWidth * pixelBitSkip;
    if ((bitsPerLine & 7) !== 0) {
      bitsPerLine = bitsPerLine + 7 & -8;
    }
    for (let y = 0; y < tileHeight; ++y) {
      const lineBitOffset = y * bitsPerLine;
      for (let x = 0; x < tileWidth; ++x) {
        const pixelBitOffset = lineBitOffset + x * samplesToTransfer * bitsPerSample;
        for (let i = 0; i < samplesToTransfer; ++i) {
          const bitOffset = pixelBitOffset + i * bitsPerSample;
          const outIndex = (y * tileWidth + x) * samplesToTransfer + i;
          const byteOffset = Math.floor(bitOffset / 8);
          const innerBitOffset = bitOffset % 8;
          if (innerBitOffset + bitsPerSample <= 8) {
            outArray[outIndex] = view.getUint8(byteOffset) >> 8 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 16) {
            outArray[outIndex] = view.getUint16(byteOffset) >> 16 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 24) {
            const raw2 = view.getUint16(byteOffset) << 8 | view.getUint8(byteOffset + 2);
            outArray[outIndex] = raw2 >> 24 - bitsPerSample - innerBitOffset & bitMask;
          } else {
            outArray[outIndex] = view.getUint32(byteOffset) >> 32 - bitsPerSample - innerBitOffset & bitMask;
          }
        }
      }
    }
  }
  return outArray.buffer;
}
class GeoTIFFImage {
  /**
   * @constructor
   * @param {import("./imagefiledirectory.js").ImageFileDirectory} fileDirectory The parsed file directory
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource.js').BaseSource} source The datasource to read from
   */
  constructor(fileDirectory, littleEndian, cache, source) {
    var _a;
    this.fileDirectory = fileDirectory;
    this.littleEndian = littleEndian;
    this.tiles = cache ? [] : null;
    this.isTiled = !fileDirectory.hasTag("StripOffsets");
    const planarConfiguration = (_a = fileDirectory.getValue("PlanarConfiguration")) != null ? _a : 1;
    if (planarConfiguration !== 1 && planarConfiguration !== 2) {
      throw new Error("Invalid planar configuration.");
    }
    this.planarConfiguration = planarConfiguration;
    this.source = source;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {import("./imagefiledirectory.js").ImageFileDirectory} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Partial<Record<import('./globals.js').GeoKeyName, *>>|null} the parsed geo keys
   */
  getGeoKeys() {
    return this.fileDirectory.parseGeoKeyDirectory();
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.getValue("ImageWidth") || 0;
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.getValue("ImageLength") || 0;
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    var _a;
    return (_a = this.fileDirectory.getValue("SamplesPerPixel")) != null ? _a : 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.getValue("TileWidth") || 0 : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {number} the height of each tile
   */
  getTileHeight() {
    if (this.isTiled) {
      return this.fileDirectory.getValue("TileLength") || 0;
    }
    const rowsPerStrip = this.fileDirectory.hasTag("RowsPerStrip") && this.fileDirectory.getValue("RowsPerStrip");
    if (rowsPerStrip) {
      return Math.min(rowsPerStrip, this.getHeight());
    }
    return this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  /**
   * @param {number} y
   * @returns {number}
   */
  getBlockHeight(y) {
    if (this.isTiled || (y + 1) * this.getTileHeight() <= this.getHeight()) {
      return this.getTileHeight();
    } else {
      return this.getHeight() - y * this.getTileHeight();
    }
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let bytes = 0;
    const bitsPerSample = this.fileDirectory.getValue("BitsPerSample") || [];
    for (let i = 0; i < bitsPerSample.length; ++i) {
      bytes += this.getSampleByteSize(i);
    }
    return bytes;
  }
  /**
   * @param {number} i
   * @returns {number}
   */
  getSampleByteSize(i) {
    const bitsPerSample = this.fileDirectory.getValue("BitsPerSample") || [];
    if (i >= bitsPerSample.length) {
      throw new RangeError(`Sample index ${i} is out of range.`);
    }
    return Math.ceil(bitsPerSample[i] / 8);
  }
  /**
   * @param {number} sampleIndex
   * @returns {(this: DataView, byteOffset: number, littleEndian: boolean) => number}
   */
  getReaderForSample(sampleIndex) {
    const sampleFormat = this.fileDirectory.getValue("SampleFormat");
    const format = sampleFormat ? sampleFormat[sampleIndex] : 1;
    const bitsPerSample = (this.fileDirectory.getValue("BitsPerSample") || [])[sampleIndex];
    switch (format) {
      case 1:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getUint8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getUint16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getUint32;
        }
        break;
      case 2:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getInt8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getInt16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getInt32;
        }
        break;
      case 3:
        switch (bitsPerSample) {
          case 16:
            return function(offset, littleEndian) {
              return getFloat16(this, offset, littleEndian);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
        }
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(sampleIndex = 0) {
    const sampleFormat = this.fileDirectory.getValue("SampleFormat");
    return sampleFormat ? sampleFormat[sampleIndex] : 1;
  }
  getBitsPerSample(sampleIndex = 0) {
    const bitsPerSample = this.fileDirectory.getValue("BitsPerSample");
    return bitsPerSample ? bitsPerSample[sampleIndex] : 0;
  }
  /**
   * @param {number} sampleIndex
   * @param {number|ArrayBufferLike} sizeOrData
   * @returns {TypedArray}
   */
  getArrayForSample(sampleIndex, sizeOrData) {
    const format = (
      /** @type {1|2|3} */
      this.getSampleFormat(sampleIndex)
    );
    const bitsPerSample = this.getBitsPerSample(sampleIndex);
    return arrayForType(format, bitsPerSample, sizeOrData);
  }
  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {DecoderWorker|import("./geotiff.js").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<{x: number, y: number, sample: number, data: ArrayBufferLike}>} the decoded strip or tile
   */
  getTileOrStrip(x, y, sample, poolOrDecoder, signal) {
    return __async(this, null, function* () {
      const numTilesPerRow = Math.ceil(this.getWidth() / this.getTileWidth());
      const numTilesPerCol = Math.ceil(this.getHeight() / this.getTileHeight());
      let index;
      const { tiles } = this;
      if (this.planarConfiguration === 1) {
        index = y * numTilesPerRow + x;
      } else if (this.planarConfiguration === 2) {
        index = sample * numTilesPerRow * numTilesPerCol + y * numTilesPerRow + x;
      }
      if (index === void 0) {
        throw new Error("Could not determine tile or strip index.");
      }
      let offset;
      let byteCount;
      if (this.isTiled) {
        offset = Number(yield this.fileDirectory.loadValueIndexed("TileOffsets", index));
        byteCount = Number(yield this.fileDirectory.loadValueIndexed("TileByteCounts", index));
      } else {
        offset = Number(yield this.fileDirectory.loadValueIndexed("StripOffsets", index));
        byteCount = Number(yield this.fileDirectory.loadValueIndexed("StripByteCounts", index));
      }
      if (byteCount === 0) {
        const nPixels = this.getBlockHeight(y) * this.getTileWidth();
        const bytesPerPixel = this.planarConfiguration === 2 ? this.getSampleByteSize(sample) : this.getBytesPerPixel();
        const data = new ArrayBuffer(nPixels * bytesPerPixel);
        const view = this.getArrayForSample(sample, data);
        view.fill(this.getGDALNoData() || 0);
        return { x, y, sample, data };
      }
      const slice = (yield this.source.fetch([{ offset, length: byteCount }], signal))[0];
      let request;
      if (tiles === null || !tiles[index]) {
        request = (() => __async(this, null, function* () {
          let data = yield poolOrDecoder.decode(slice);
          const sampleFormat = (
            /** @type {1|2|3} */
            this.getSampleFormat()
          );
          const bitsPerSample = this.getBitsPerSample();
          if (needsNormalization(sampleFormat, bitsPerSample)) {
            data = normalizeArray(data, sampleFormat, this.planarConfiguration, this.getSamplesPerPixel(), bitsPerSample, this.getTileWidth(), this.getBlockHeight(y));
          }
          return data;
        }))();
        if (tiles !== null) {
          tiles[index] = request;
        }
      } else {
        request = tiles[index];
      }
      return { x, y, sample, data: yield request };
    });
  }
  /**
   * Internal read function.
   * @private
   * @param {Array<number>} imageWindow The image window in pixel coordinates
   * @param {Array<number>} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {boolean|undefined} interleave Whether or not to write in an interleaved manner
   * @param {DecoderWorker|import("./geotiff.js").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} [width] the width of window to be read into
   * @param {number} [height] the height of window to be read into
   * @param {string} [resampleMethod] the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  _readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal) {
    return __async(this, null, function* () {
      const tileWidth = this.getTileWidth();
      const tileHeight = this.getTileHeight();
      const imageWidth = this.getWidth();
      const imageHeight = this.getHeight();
      const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
      const maxXTile = Math.min(Math.ceil(imageWindow[2] / tileWidth), Math.ceil(imageWidth / tileWidth));
      const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
      const maxYTile = Math.min(Math.ceil(imageWindow[3] / tileHeight), Math.ceil(imageHeight / tileHeight));
      const windowWidth = imageWindow[2] - imageWindow[0];
      let bytesPerPixel = this.getBytesPerPixel();
      const srcSampleOffsets = [];
      const sampleReaders = [];
      for (let i = 0; i < samples.length; ++i) {
        if (this.planarConfiguration === 1) {
          const bitsPerSample = yield this.fileDirectory.loadValue("BitsPerSample");
          if (typeof bitsPerSample !== "object") {
            throw new Error("Expected BitsPerSample to be an array or typed array.");
          }
          srcSampleOffsets.push(sum(bitsPerSample, 0, samples[i]) / 8);
        } else {
          srcSampleOffsets.push(0);
        }
        sampleReaders.push(this.getReaderForSample(samples[i]));
      }
      const promises = [];
      const { littleEndian } = this;
      for (let yTile = minYTile; yTile < maxYTile; ++yTile) {
        for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
          let getPromise;
          if (this.planarConfiguration === 1) {
            getPromise = this.getTileOrStrip(xTile, yTile, 0, poolOrDecoder, signal);
          }
          for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
            const si = sampleIndex;
            const sample = samples[sampleIndex];
            if (this.planarConfiguration === 2) {
              bytesPerPixel = this.getSampleByteSize(sample);
              getPromise = this.getTileOrStrip(xTile, yTile, sample, poolOrDecoder, signal);
            }
            if (!getPromise) {
              throw new Error("Could not get tile or strip data.");
            }
            const promise = getPromise.then((tile) => {
              const buffer = tile.data;
              const dataView = new DataView(buffer);
              const blockHeight = this.getBlockHeight(tile.y);
              const firstLine = tile.y * tileHeight;
              const firstCol = tile.x * tileWidth;
              const lastLine = firstLine + blockHeight;
              const lastCol = (tile.x + 1) * tileWidth;
              const reader = sampleReaders[si];
              const ymax = Math.min(blockHeight, blockHeight - (lastLine - imageWindow[3]), imageHeight - firstLine);
              const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]), imageWidth - firstCol);
              for (let y = Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) {
                for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
                  const pixelOffset = (y * tileWidth + x) * bytesPerPixel;
                  const value = reader.call(dataView, pixelOffset + srcSampleOffsets[si], littleEndian);
                  let windowCoordinate;
                  if (interleave) {
                    windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth * samples.length + (x + firstCol - imageWindow[0]) * samples.length + si;
                    valueArrays[windowCoordinate] = value;
                  } else {
                    windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth + x + firstCol - imageWindow[0];
                    valueArrays[si][windowCoordinate] = value;
                  }
                }
              }
            });
            promises.push(promise);
          }
        }
      }
      yield Promise.all(promises);
      if (width && imageWindow[2] - imageWindow[0] !== width || height && imageWindow[3] - imageWindow[1] !== height) {
        let resampled;
        if (interleave) {
          resampled = resampleInterleaved(
            /** @type {TypedArray} */
            valueArrays,
            imageWindow[2] - imageWindow[0],
            imageWindow[3] - imageWindow[1],
            /** @type {number} */
            width,
            /** @type {number} */
            height,
            samples.length,
            resampleMethod
          );
        } else {
          resampled = resample(
            /** @type {TypedArray[]} */
            valueArrays,
            imageWindow[2] - imageWindow[0],
            imageWindow[3] - imageWindow[1],
            /** @type {number} */
            width,
            /** @type {number} */
            height,
            resampleMethod
          );
        }
        const resampledWithDimensions = (
          /** @type {ReadRasterResult} */
          resampled
        );
        resampledWithDimensions.width = width != null ? width : imageWindow[2] - imageWindow[0];
        resampledWithDimensions.height = height != null ? height : imageWindow[3] - imageWindow[1];
        return resampledWithDimensions;
      }
      const valueArraysWithDimensions = (
        /** @type {ReadRasterResult} */
        valueArrays
      );
      valueArraysWithDimensions.width = width || imageWindow[2] - imageWindow[0];
      valueArraysWithDimensions.height = height || imageWindow[3] - imageWindow[1];
      return valueArraysWithDimensions;
    });
  }
  /**
   * @overload
   * @param {ReadRastersOptions & {interleave: true}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayWithDimensions>} the decoded arrays as a promise
   */
  /**
   * @overload
   * @param {ReadRastersOptions & {interleave: false}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the decoded arrays as a promise
   */
  /**
   * @overload
   * @param {ReadRastersOptions & {interleave: boolean}} options optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  /**
   * @overload
   * @param {ReadRastersOptions} [options={}] optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the decoded arrays as a promise
   */
  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRastersOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  readRasters() {
    return __async(this, arguments, function* (options = {}) {
      const { window: wnd, samples = [], pool = null, width, height, resampleMethod, fillValue, signal } = options;
      const interleave = "interleave" in options && options.interleave;
      const imageWindow = wnd || [0, 0, this.getWidth(), this.getHeight()];
      if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
        throw new Error("Invalid subsets");
      }
      const imageWindowWidth = imageWindow[2] - imageWindow[0];
      const imageWindowHeight = imageWindow[3] - imageWindow[1];
      const numPixels = imageWindowWidth * imageWindowHeight;
      const samplesPerPixel = this.getSamplesPerPixel();
      if (!samples || !samples.length) {
        for (let i = 0; i < samplesPerPixel; ++i) {
          samples.push(i);
        }
      } else {
        for (let i = 0; i < samples.length; ++i) {
          if (samples[i] >= samplesPerPixel) {
            return Promise.reject(new RangeError(`Invalid sample index '${samples[i]}'.`));
          }
        }
      }
      let valueArrays;
      if (interleave) {
        const { fileDirectory } = this;
        const sampleFormat = fileDirectory.getValue("SampleFormat");
        const format = sampleFormat ? Math.max.apply(null, Array.from(sampleFormat)) : 1;
        if (format !== 1 && format !== 2 && format !== 3) {
          throw new Error("Unsupported sample format for interleaved data. Must be 1, 2, or 3.");
        }
        const bitsPerSample_ = fileDirectory.getValue("BitsPerSample");
        const bitsPerSample = bitsPerSample_ ? Math.max.apply(null, Array.from(bitsPerSample_)) : 8;
        valueArrays = arrayForType(format, bitsPerSample, numPixels * samples.length);
        if (fillValue) {
          if (Array.isArray(fillValue)) {
            throw new Error("When reading interleaved data, fillValue must be a single number.");
          }
          valueArrays.fill(fillValue);
        }
      } else {
        valueArrays = [];
        for (let i = 0; i < samples.length; ++i) {
          const valueArray = this.getArrayForSample(samples[i], numPixels);
          if (Array.isArray(fillValue) && i < fillValue.length) {
            valueArray.fill(fillValue[i]);
          } else if (fillValue && !Array.isArray(fillValue)) {
            valueArray.fill(fillValue);
          }
          valueArrays.push(valueArray);
        }
      }
      const compression = this.fileDirectory.getValue("Compression") || 1;
      const decoderParameters = yield getDecoderParameters(compression, this.fileDirectory);
      const poolOrDecoder = pool ? pool.bindParameters(compression, decoderParameters) : yield getDecoder(compression, decoderParameters);
      const result = yield this._readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal);
      return result;
    });
  }
  /**
   * @overload
   * @param {ReadRGBOptions & {interleave: true}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayWithDimensions>} the RGB array as a Promise
   */
  /**
   * @overload
   * @param {ReadRGBOptions & {interleave: false}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the RGB array as a Promise
   */
  /**
   * @overload
   * @param {ReadRGBOptions & {interleave: boolean}} options optional parameters
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  /**
   * @overload
   * @param {ReadRGBOptions} [options={}] optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the RGB array as a Promise
   */
  /**
   * Reads raster data from the image as RGB.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {ReadRGBOptions} [options] optional parameters
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  readRGB() {
    return __async(this, arguments, function* (options = {}) {
      var _a;
      const { window: window2, pool = null, width, height, resampleMethod, enableAlpha = false, signal } = options;
      const interleave = (_a = "interleave" in options && options.interleave) != null ? _a : false;
      const imageWindow = window2 || [0, 0, this.getWidth(), this.getHeight()];
      if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
        throw new Error("Invalid subsets");
      }
      const pi = this.fileDirectory.getValue("PhotometricInterpretation");
      if (pi === photometricInterpretations.RGB) {
        let s = [0, 1, 2];
        const extraSamples = this.fileDirectory.getValue("ExtraSamples");
        if (extraSamples && extraSamples[0] !== ExtraSamplesValues.Unspecified && enableAlpha) {
          s = [];
          const bitsPerSample = this.fileDirectory.getValue("BitsPerSample") || [];
          for (let i = 0; i < bitsPerSample.length; i += 1) {
            s.push(i);
          }
        }
        return this.readRasters({
          window: window2,
          interleave,
          samples: s,
          pool,
          width,
          height,
          resampleMethod,
          signal
        });
      }
      let samples;
      switch (pi) {
        case photometricInterpretations.WhiteIsZero:
        case photometricInterpretations.BlackIsZero:
        case photometricInterpretations.Palette:
          samples = [0];
          break;
        case photometricInterpretations.CMYK:
          samples = [0, 1, 2, 3];
          break;
        case photometricInterpretations.YCbCr:
        case photometricInterpretations.CIELab:
          samples = [0, 1, 2];
          break;
        default:
          throw new Error("Invalid or unsupported photometric interpretation.");
      }
      const subOptions = {
        window: imageWindow,
        /** @type {true} */
        interleave: true,
        samples,
        pool,
        width,
        height,
        resampleMethod,
        signal
      };
      const { fileDirectory } = this;
      const raster = yield this.readRasters(subOptions);
      const max = __pow(2, this.getBitsPerSample(0));
      let data;
      switch (pi) {
        case photometricInterpretations.WhiteIsZero:
          data = fromWhiteIsZero(raster, max);
          break;
        case photometricInterpretations.BlackIsZero:
          data = fromBlackIsZero(raster, max);
          break;
        case photometricInterpretations.Palette:
          data = fromPalette(
            raster,
            /** @type {Uint16Array} */
            yield fileDirectory.loadValue("ColorMap")
          );
          break;
        case photometricInterpretations.CMYK:
          data = fromCMYK(raster);
          break;
        case photometricInterpretations.YCbCr:
          data = fromYCbCr(raster);
          break;
        case photometricInterpretations.CIELab:
          data = fromCIELab(raster);
          break;
        default:
          throw new Error("Unsupported photometric interpretation.");
      }
      if (!interleave) {
        const red = new Uint8Array(data.length / 3);
        const green = new Uint8Array(data.length / 3);
        const blue = new Uint8Array(data.length / 3);
        for (let i = 0, j = 0; i < data.length; i += 3, ++j) {
          red[j] = data[i];
          green[j] = data[i + 1];
          blue[j] = data[i + 2];
        }
        data = [red, green, blue];
      }
      const dataWithDimensions = (
        /** @type {import("./geotiff.js").ReadRasterResult} */
        data
      );
      dataWithDimensions.width = raster.width;
      dataWithDimensions.height = raster.height;
      return dataWithDimensions;
    });
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Promise<Array<{i: number, j: number, k: number, x: number, y: number, z: number}>>} the tiepoints
   */
  getTiePoints() {
    return __async(this, null, function* () {
      if (!this.fileDirectory.hasTag("ModelTiepoint")) {
        return [];
      }
      const modelTiePoint = yield this.fileDirectory.loadValue("ModelTiepoint");
      if (typeof modelTiePoint !== "object") {
        throw new Error("Expected ModelTiepoint to be an array or typed array.");
      }
      const tiePoints = [];
      for (let i = 0; i < modelTiePoint.length; i += 6) {
        tiePoints.push({
          i: modelTiePoint[i],
          j: modelTiePoint[i + 1],
          k: modelTiePoint[i + 2],
          x: modelTiePoint[i + 3],
          y: modelTiePoint[i + 4],
          z: modelTiePoint[i + 5]
        });
      }
      return tiePoints;
    });
  }
  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number|null} [sample=null] The sample index.
   * @returns {Promise<Record<string, unknown>|null>} The GDAL metadata items
   */
  getGDALMetadata(sample = null) {
    return __async(this, null, function* () {
      const metadata = {};
      if (!this.fileDirectory.hasTag("GDAL_METADATA")) {
        return null;
      }
      const string = yield this.fileDirectory.loadValue("GDAL_METADATA");
      let items = findTagsByName(string, "Item");
      if (sample === null) {
        items = items.filter((item) => getAttribute(item, "sample") === void 0);
      } else {
        items = items.filter((item) => Number(getAttribute(item, "sample")) === sample);
      }
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        metadata[getAttribute(item, "name")] = item.inner;
      }
      return metadata;
    });
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    const string = this.fileDirectory.hasTag("GDAL_NODATA") && this.fileDirectory.getValue("GDAL_NODATA");
    if (!string) {
      return null;
    }
    return Number(string.substring(0, string.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const tiePoints = this.fileDirectory.getValue("ModelTiepoint");
    const modelTransformation = this.fileDirectory.getValue("ModelTransformation");
    if (tiePoints && tiePoints.length === 6) {
      return [
        tiePoints[3],
        tiePoints[4],
        tiePoints[5]
      ];
    }
    if (modelTransformation) {
      return [
        modelTransformation[3],
        modelTransformation[7],
        modelTransformation[11]
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage|null} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(referenceImage = null) {
    const modelPixelScale = this.fileDirectory.getValue("ModelPixelScale");
    const modelTransformation = this.fileDirectory.getValue("ModelTransformation");
    if (modelPixelScale) {
      return [
        modelPixelScale[0],
        -modelPixelScale[1],
        modelPixelScale[2]
      ];
    }
    if (modelTransformation) {
      if (modelTransformation[1] === 0 && modelTransformation[4] === 0) {
        return [
          modelTransformation[0],
          -modelTransformation[5],
          modelTransformation[10]
        ];
      }
      return [
        Math.sqrt(modelTransformation[0] * modelTransformation[0] + modelTransformation[4] * modelTransformation[4]),
        -Math.sqrt(modelTransformation[1] * modelTransformation[1] + modelTransformation[5] * modelTransformation[5]),
        modelTransformation[10]
      ];
    }
    if (referenceImage) {
      const [refResX, refResY, refResZ] = referenceImage.getResolution();
      return [
        refResX * referenceImage.getWidth() / this.getWidth(),
        refResY * referenceImage.getHeight() / this.getHeight(),
        refResZ * referenceImage.getWidth() / this.getWidth()
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    var _a;
    return ((_a = this.getGeoKeys()) == null ? void 0 : _a.GTRasterTypeGeoKey) === 1;
  }
  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(tilegrid = false) {
    const height = this.getHeight();
    const width = this.getWidth();
    const modelTransformation = this.fileDirectory.getValue("ModelTransformation");
    if (modelTransformation && !tilegrid) {
      const [a, b, , d, e, f, , h] = modelTransformation;
      const corners = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height]
      ];
      const projected = corners.map(([I, J]) => [
        d + a * I + b * J,
        h + e * I + f * J
      ]);
      const xs = projected.map((pt) => pt[0]);
      const ys = projected.map((pt) => pt[1]);
      return [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys)
      ];
    } else {
      const origin = this.getOrigin();
      const resolution = this.getResolution();
      const x1 = origin[0];
      const y1 = origin[1];
      const x2 = x1 + resolution[0] * width;
      const y2 = y1 + resolution[1] * height;
      return [
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.max(x1, x2),
        Math.max(y1, y2)
      ];
    }
  }
}
class DataView64 {
  /**
   * @param {ArrayBufferLike} arrayBuffer
   */
  constructor(arrayBuffer) {
    this._dataView = new DataView(arrayBuffer);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getUint64(offset, littleEndian) {
    const left = this.getUint32(offset, littleEndian);
    const right = this.getUint32(offset + 4, littleEndian);
    let combined;
    if (littleEndian) {
      combined = left + __pow(2, 32) * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      }
      return combined;
    }
    combined = __pow(2, 32) * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    }
    return combined;
  }
  /**
   * Adapted from https://stackoverflow.com/a/55338384/8060591
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getInt64(offset, littleEndian) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte !== 0) {
            byte = ~(byte - 1) & 255;
            carrying = false;
          }
        } else {
          byte = ~byte & 255;
        }
      }
      value += byte * __pow(256, i);
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  getUint8(offset) {
    return this._dataView.getUint8(offset);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  getInt8(offset) {
    return this._dataView.getInt8(offset);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getUint16(offset, littleEndian) {
    return this._dataView.getUint16(offset, littleEndian);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getInt16(offset, littleEndian) {
    return this._dataView.getInt16(offset, littleEndian);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getUint32(offset, littleEndian) {
    return this._dataView.getUint32(offset, littleEndian);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getInt32(offset, littleEndian) {
    return this._dataView.getInt32(offset, littleEndian);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getFloat16(offset, littleEndian) {
    return getFloat16(this._dataView, offset, littleEndian);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getFloat32(offset, littleEndian) {
    return this._dataView.getFloat32(offset, littleEndian);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getFloat64(offset, littleEndian) {
    return this._dataView.getFloat64(offset, littleEndian);
  }
}
class DataSlice {
  /**
   * @param {ArrayBufferLike} arrayBuffer
   * @param {number} sliceOffset
   * @param {boolean} littleEndian
   * @param {boolean} bigTiff
   */
  constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
    this._dataView = new DataView(arrayBuffer);
    this._sliceOffset = sliceOffset;
    this._littleEndian = littleEndian;
    this._bigTiff = bigTiff;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  /**
   * @param {number} offset
   * @param {number} length
   * @returns {boolean}
   */
  covers(offset, length) {
    return this.sliceOffset <= offset && this.sliceTop >= offset + length;
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint8(offset) {
    return this._dataView.getUint8(offset - this._sliceOffset);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readInt8(offset) {
    return this._dataView.getInt8(offset - this._sliceOffset);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint16(offset) {
    return this._dataView.getUint16(offset - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readInt16(offset) {
    return this._dataView.getInt16(offset - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint32(offset) {
    return this._dataView.getUint32(offset - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readInt32(offset) {
    return this._dataView.getInt32(offset - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readFloat32(offset) {
    return this._dataView.getFloat32(offset - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readFloat64(offset) {
    return this._dataView.getFloat64(offset - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint64(offset) {
    const left = this.readUint32(offset);
    const right = this.readUint32(offset + 4);
    let combined;
    if (this._littleEndian) {
      combined = left + __pow(2, 32) * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      }
      return combined;
    }
    combined = __pow(2, 32) * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    }
    return combined;
  }
  /**
   * Adapted from https://stackoverflow.com/a/55338384/8060591
   * @param {number} offset
   * @returns {number}
   */
  readInt64(offset) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(offset + (this._littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte !== 0) {
            byte = ~(byte - 1) & 255;
            carrying = false;
          }
        } else {
          byte = ~byte & 255;
        }
      }
      value += byte * __pow(256, i);
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readOffset(offset) {
    if (this._bigTiff) {
      return this.readUint64(offset);
    }
    return this.readUint32(offset);
  }
}
function create() {
  const source = 'const A=new Map;async function I(A){const I=!A.hasTag("StripOffsets");return{tileWidth:I?await A.loadValue("TileWidth"):await A.loadValue("ImageWidth"),tileHeight:I?await A.loadValue("TileLength"):await A.loadValue("RowsPerStrip")||await A.loadValue("ImageLength"),planarConfiguration:await A.loadValue("PlanarConfiguration"),bitsPerSample:await A.loadValue("BitsPerSample"),predictor:await A.loadValue("Predictor")||1}}function g(g,B,C=I,Q=!0){Array.isArray(g)||(g=[g]),g.forEach((I=>{A.set(I,{importFn:B,decoderParameterFn:C,preferWorker:Q})}))}const B=[{cases:[void 0,1],importFn:()=>Promise.resolve().then((function(){return e})).then((A=>A.default)),preferWorker:!1},{cases:5,importFn:()=>Promise.resolve().then((function(){return a})).then((A=>A.default))},{cases:6,importFn:()=>{throw new Error("old style JPEG compression is not supported.")}},{cases:7,importFn:()=>Promise.resolve().then((function(){return w})).then((A=>A.default)),decoderParameterFn:async A=>({...await I(A),JPEGTables:await A.loadValue("JPEGTables")})},{cases:[8,32946],importFn:()=>Promise.resolve().then((function(){return Qg})).then((A=>A.default))},{cases:32773,importFn:()=>Promise.resolve().then((function(){return ig})).then((A=>A.default))},{cases:34887,importFn:()=>Promise.resolve().then((function(){return Rg})).then((async A=>(await A.zstd.init(),A))).then((A=>A.default)),decoderParameterFn:async A=>({...await I(A),LercParameters:await A.loadValue("LercParameters")})},{cases:5e4,importFn:()=>Promise.resolve().then((function(){return Jg})).then((async A=>(await A.zstd.init(),A))).then((A=>A.default))},{cases:50001,importFn:()=>Promise.resolve().then((function(){return Hg})).then((A=>A.default)),decoderParameterFn:async A=>({...await I(A),samplesPerPixel:Number(await A.loadValue("SamplesPerPixel"))||4}),preferWorker:!1}];for(const A of B){const{cases:I,importFn:B,decoderParameterFn:C,preferWorker:Q}=A;g(I,B,C,Q)}const C=globalThis;function Q(A,I){let g=A.length-I,B=0;do{for(let g=I;g>0;g--)A[B+I]+=A[B],B++;g-=I}while(g>0)}function E(A,I,g){let B=0,C=A.length;const Q=C/g;for(;C>I;){for(let g=I;g>0;--g)A[B+I]+=A[B],++B;C-=I}const E=A.slice();for(let I=0;I<Q;++I)for(let B=0;B<g;++B)A[g*I+B]=E[(g-B-1)*Q+I]}C.addEventListener("message",(async I=>{const{compression:g,decoderParameters:B,buffer:Q,...E}=I.data;try{const I=await async function(I,g){if(!A.has(I))throw new Error(`Unknown compression method identifier: ${I}`);const{importFn:B}=A.get(I);return new(await B())(g)}(g,B),i=await I.decode(Q);C.postMessage({decoded:i,...E},[i])}catch(A){A instanceof Error?C.postMessage({error:A.message,...E}):C.postMessage({error:String(A),...E})}}));class i{constructor(A){this.parameters=A}decodeBlock(A){throw new Error("decodeBlock not implemented")}async decode(A){const I=await this.decodeBlock(A),{tileWidth:g,tileHeight:B,predictor:C,bitsPerSample:i,planarConfiguration:e}=this.parameters;if(1!==C){return function(A,I,g,B,C,i){if(!I||1===I)return A;for(let A=0;A<C.length;++A){if(C[A]%8!=0)throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");if(C[A]!==C[0])throw new Error("When decoding with predictor, all samples must have the same size.")}const e=C[0]/8,t=2===i?1:C.length;for(let i=0;i<B&&!(i*t*g*e>=A.byteLength);++i){let B;if(2===I){switch(C[0]){case 8:B=new Uint8Array(A,i*t*g*e,t*g*e);break;case 16:B=new Uint16Array(A,i*t*g*e,t*g*e/2);break;case 32:B=new Uint32Array(A,i*t*g*e,t*g*e/4);break;default:throw new Error(`Predictor 2 not allowed with ${C[0]} bits per sample.`)}Q(B,t)}else 3===I&&(B=new Uint8Array(A,i*t*g*e,t*g*e),E(B,t,e))}return A}(I,C,g,B,Array.isArray(i)||ArrayBuffer.isView(i)?Array.from(i):[i],e)}return I}}var e=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){return A}}});function t(A,I){for(let g=I.length-1;g>=0;g--)A.push(I[g]);return A}function o(A){const I=new Uint16Array(4093),g=new Uint8Array(4093);for(let A=0;A<=257;A++)I[A]=4096,g[A]=A;let B=258,C=9,Q=0;function E(){B=258,C=9}function i(A){const I=function(A,I,g){const B=I%8,C=Math.floor(I/8),Q=8-B,E=I+g-8*(C+1);let i=8*(C+2)-(I+g);const e=8*(C+2)-I;if(i=Math.max(0,i),C>=A.length)return console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)"),257;let t=A[C]&2**(8-B)-1;t<<=g-Q;let o=t;if(C+1<A.length){let I=A[C+1]>>>i;I<<=Math.max(0,g-e),o+=I}if(E>8&&C+2<A.length){const B=8*(C+3)-(I+g);o+=A[C+2]>>>B}return o}(A,Q,C);return Q+=C,I}function e(A,C){return g[B]=C,I[B]=A,B++,B-1}function o(A){const B=[];for(let C=A;4096!==C;C=I[C])B.push(g[C]);return B}const a=[];E();const s=new Uint8Array(A);let r,D=i(s);for(;257!==D;){if(256===D){for(E(),D=i(s);256===D;)D=i(s);if(257===D)break;if(D>256)throw new Error(`corrupted code at scanline ${D}`);t(a,o(D)),r=D}else if(D<B){const A=o(D);t(a,A),void 0!==r&&e(r,A[A.length-1]),r=D}else{if(void 0===r)throw new Error(`Invalid LZW code: ${D} with no previous code`);const A=o(r);if(!A)throw new Error(`Bogus entry. Not in dictionary, ${r} / ${B}, position: ${Q}`);t(a,A),a.push(A[A.length-1]),e(r,A[A.length-1]),r=D}B+1>=2**C&&(12===C?r=void 0:C++),D=i(s)}return new Uint8Array(a)}var a=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){return o(A).buffer}}});const s=new Int32Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]);function r(A,I){let g=0;const B=[];let C=16;for(;C>0&&!A[C-1];)--C;B.push({children:[],index:0});let Q,E=B[0];for(let i=0;i<C;i++){for(let C=0;C<A[i];C++){if(E=B.pop(),!E)throw new Error("buildHuffmanTable: codeLength mismatch");for(E.children[E.index]=I[g];E.index>0;)if(E=B.pop(),!E)throw new Error("buildHuffmanTable: codeLength mismatch");for(E.index++,B.push(E);B.length<=i;)B.push(Q={children:[],index:0}),E.children[E.index]=Q.children,E=Q;g++}i+1<C&&(B.push(Q={children:[],index:0}),E.children[E.index]=Q.children,E=Q)}return B[0].children}function D(A,I,g,B,C,Q,E,i,e){const{mcusPerLine:t,progressive:o}=g;if(B.length>1&&(void 0===t||void 0===g.mcusPerColumn))throw new Error("Missing MCU dimensions");if(1===B.length&&(void 0===B[0].blocksPerLine||void 0===B[0].blocksPerColumn))throw new Error("Missing block dimensions");const a=I;let r=I,D=0,n=0;function h(){if(n>0)return n--,D>>n&1;if(D=A[r++],255===D){const I=A[r++];if(I)throw new Error(`unexpected marker: ${(D<<8|I).toString(16)}`)}return n=7,D>>>7}function w(A){if(!A)throw new Error("Huffman table not found");let I,g=A;for(;null!==(I=h());){const A=g[I];if("number"==typeof A)return A;if("object"!=typeof A)throw new Error("invalid huffman sequence");g=A}return null}function y(A){let I=A,g=0;for(;I>0;){const A=h();if(null===A)return;g=g<<1|A,--I}return g}function G(A){const I=y(A);if(void 0!==I)return I>=1<<A-1?I:I+(-1<<A)+1}let S=0;let c,N=0;function d(A,I,g,B,C){const Q=g%t,E=(g/t|0)*A.v+B,i=Q*A.h+C;if(!A.blocks)throw new Error("Missing blocks");I(A,A.blocks[E][i])}function l(A,I,g){const B=g/A.blocksPerLine|0,C=g%A.blocksPerLine;if(!A.blocks)throw new Error("Missing blocks");I(A,A.blocks[B][C])}const k=B.length;let F,R,L,U,f,Y;Y=o?0===Q?0===i?function(A,I){const g=w(A.huffmanTableDC);if(null===g)throw new Error("Huffman error");const B=G(g);if(void 0===B)throw new Error("Unexpected end of data in DC coefficient decoding");const C=0===g?0:B<<e;void 0===A.pred&&(A.pred=0),A.pred+=C,I[0]=A.pred}:function(A,I){const g=h();if(null===g)throw new Error("Unexpected end of data in DC coefficient decoding");I[0]|=g<<e}:0===i?function(A,I){if(S>0)return void S--;let g=Q;const B=E;for(;g<=B;){const B=w(A.huffmanTableAC);if(null===B)throw new Error("Unexpected end of data in AC coefficient decoding");const C=15&B,Q=B>>4;if(0===C){if(Q<15){const A=y(Q);if(void 0===A)throw new Error("Unexpected end of data in AC coefficient decoding");S=A+(1<<Q)-1;break}g+=16}else{g+=Q;const A=s[g],B=G(C);if(void 0===B)throw new Error("Unexpected end of data in AC coefficient decoding");I[A]=B*(1<<e),g++}}}:function(A,I){let g=Q;const B=E;let C=0;for(;g<=B;){const B=s[g],Q=I[B]<0?-1:1;switch(N){case 0:{const I=w(A.huffmanTableAC);if(null===I)throw new Error("Unexpected end of data in AC coefficient decoding");const g=15&I;if(C=I>>4,0===g)if(C<15){const A=y(C);if(void 0===A)throw new Error("Unexpected end of data in AC coefficient decoding");S=A+(1<<C),N=4}else C=16,N=1;else{if(1!==g)throw new Error("invalid ACn encoding");const A=G(g);if(void 0===A)throw new Error("Unexpected end of data in AC coefficient decoding");c=A,N=C?2:3}continue}case 1:case 2:if(I[B]){const A=h();if(null===A)throw new Error("Unexpected end of data in AC coefficient decoding");I[B]+=(A<<e)*Q}else C--,0===C&&(N=2===N?3:0);break;case 3:if(I[B]){const A=h();if(null===A)throw new Error("Unexpected end of data in AC coefficient decoding");I[B]+=(A<<e)*Q}else I[B]=c<<e,N=0;break;case 4:if(I[B]){const A=h();if(null===A)throw new Error("Unexpected end of data in AC coefficient decoding");I[B]+=(A<<e)*Q}}g++}4===N&&(S--,0===S&&(N=0))}:function(A,I){const g=w(A.huffmanTableDC);if(null===g)throw new Error("Huffman error");const B=0===g?0:G(g);if(void 0===B)throw new Error("Unexpected end of stream");void 0===A.pred&&(A.pred=0),A.pred+=B,I[0]=A.pred;let C=1;for(;C<64;){const g=w(A.huffmanTableAC);if(null===g)throw new Error("Unexpected end of data in AC coefficient decoding");const B=15&g,Q=g>>4;if(0===B){if(Q<15)break;C+=16}else{C+=Q;const A=s[C],g=G(B);if(void 0===g)throw new Error("Unexpected end of stream");I[A]=g,C++}}};let K,u,M=0;u=1===k?B[0].blocksPerLine*B[0].blocksPerColumn:t*g.mcusPerColumn;const J=C||u;for(;M<u;){for(R=0;R<k;R++)B[R].pred=0;if(S=0,1===k)for(F=B[0],f=0;f<J;f++)l(F,Y,M),M++;else for(f=0;f<J;f++){for(R=0;R<k;R++){F=B[R];const{h:A,v:I}=F;for(L=0;L<I;L++)for(U=0;U<A;U++)d(F,Y,M,L,U)}if(M++,M===u)break}if(n=0,K=A[r]<<8|A[r+1],K<65280)throw new Error("marker was not found");if(!(K>=65488&&K<=65495))break;r+=2}return r-a}function n(A){const I=[],{blocksPerLine:g,blocksPerColumn:B}=A;if(!g||!B||!A.blocks)throw new Error("Missing component data");const C=g<<3,Q=new Int32Array(64),E=new Uint8Array(64);function i(I,g,B){const C=A.quantizationTable;if(!C)throw new Error("No quantization table found");let Q,E,i,e,t,o,a,s,r;const D=B;let n;for(n=0;n<64;n++)D[n]=I[n]*C[n];for(n=0;n<8;++n){const A=8*n;0!==D[1+A]||0!==D[2+A]||0!==D[3+A]||0!==D[4+A]||0!==D[5+A]||0!==D[6+A]||0!==D[7+A]?(Q=5793*D[0+A]+128>>8,E=5793*D[4+A]+128>>8,i=D[2+A],e=D[6+A],t=2896*(D[1+A]-D[7+A])+128>>8,s=2896*(D[1+A]+D[7+A])+128>>8,o=D[3+A]<<4,a=D[5+A]<<4,r=Q-E+1>>1,Q=Q+E+1>>1,E=r,r=3784*i+1567*e+128>>8,i=1567*i-3784*e+128>>8,e=r,r=t-a+1>>1,t=t+a+1>>1,a=r,r=s+o+1>>1,o=s-o+1>>1,s=r,r=Q-e+1>>1,Q=Q+e+1>>1,e=r,r=E-i+1>>1,E=E+i+1>>1,i=r,r=2276*t+3406*s+2048>>12,t=3406*t-2276*s+2048>>12,s=r,r=799*o+4017*a+2048>>12,o=4017*o-799*a+2048>>12,a=r,D[0+A]=Q+s,D[7+A]=Q-s,D[1+A]=E+a,D[6+A]=E-a,D[2+A]=i+o,D[5+A]=i-o,D[3+A]=e+t,D[4+A]=e-t):(r=5793*D[0+A]+512>>10,D[0+A]=r,D[1+A]=r,D[2+A]=r,D[3+A]=r,D[4+A]=r,D[5+A]=r,D[6+A]=r,D[7+A]=r)}for(n=0;n<8;++n){const A=n;0!==D[8+A]||0!==D[16+A]||0!==D[24+A]||0!==D[32+A]||0!==D[40+A]||0!==D[48+A]||0!==D[56+A]?(Q=5793*D[0+A]+2048>>12,E=5793*D[32+A]+2048>>12,i=D[16+A],e=D[48+A],t=2896*(D[8+A]-D[56+A])+2048>>12,s=2896*(D[8+A]+D[56+A])+2048>>12,o=D[24+A],a=D[40+A],r=Q-E+1>>1,Q=Q+E+1>>1,E=r,r=3784*i+1567*e+2048>>12,i=1567*i-3784*e+2048>>12,e=r,r=t-a+1>>1,t=t+a+1>>1,a=r,r=s+o+1>>1,o=s-o+1>>1,s=r,r=Q-e+1>>1,Q=Q+e+1>>1,e=r,r=E-i+1>>1,E=E+i+1>>1,i=r,r=2276*t+3406*s+2048>>12,t=3406*t-2276*s+2048>>12,s=r,r=799*o+4017*a+2048>>12,o=4017*o-799*a+2048>>12,a=r,D[0+A]=Q+s,D[56+A]=Q-s,D[8+A]=E+a,D[48+A]=E-a,D[16+A]=i+o,D[40+A]=i-o,D[24+A]=e+t,D[32+A]=e-t):(r=5793*B[n+0]+8192>>14,D[0+A]=r,D[8+A]=r,D[16+A]=r,D[24+A]=r,D[32+A]=r,D[40+A]=r,D[48+A]=r,D[56+A]=r)}for(n=0;n<64;++n){const A=128+(D[n]+8>>4);g[n]=A<0?0:A>255?255:A}}for(let e=0;e<B;e++){const B=e<<3;for(let A=0;A<8;A++)I.push(new Uint8Array(C));for(let C=0;C<g;C++){i(A.blocks[e][C],E,Q);let g=0;const t=C<<3;for(let A=0;A<8;A++){const C=I[B+A];for(let A=0;A<8;A++)C[t+A]=E[g++]}}}return I}class h{constructor(){this.jfif=null,this.adobe=null,this.resetInterval=0,this.quantizationTables=[],this.huffmanTablesAC=[],this.huffmanTablesDC=[],this.frames=[]}resetFrames(){this.frames=[]}parse(A){let I=0;function g(){const g=A[I]<<8|A[I+1];return I+=2,g}function B(){const B=g(),C=A.subarray(I,I+B-2);return I+=C.length,C}function C(A){let I,g,B=0,C=0;for(g in A.components)A.components.hasOwnProperty(g)&&(I=A.components[g],B<I.h&&(B=I.h),C<I.v&&(C=I.v));const Q=Math.ceil(A.samplesPerLine/8/B),E=Math.ceil(A.scanLines/8/C);for(g in A.components)if(A.components.hasOwnProperty(g)){I=A.components[g];const i=Math.ceil(Math.ceil(A.samplesPerLine/8)*I.h/B),e=Math.ceil(Math.ceil(A.scanLines/8)*I.v/C),t=Q*I.h,o=E*I.v,a=[];for(let A=0;A<o;A++){const A=[];for(let I=0;I<t;I++)A.push(new Int32Array(64));a.push(A)}I.blocksPerLine=i,I.blocksPerColumn=e,I.blocks=a}A.maxH=B,A.maxV=C,A.mcusPerLine=Q,A.mcusPerColumn=E}let Q=g();if(65496!==Q)throw new Error("SOI not found");for(Q=g();65497!==Q;){switch(Q){case 65280:break;case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:{const A=B();65504===Q&&74===A[0]&&70===A[1]&&73===A[2]&&70===A[3]&&0===A[4]&&(this.jfif={version:{major:A[5],minor:A[6]},densityUnits:A[7],xDensity:A[8]<<8|A[9],yDensity:A[10]<<8|A[11],thumbWidth:A[12],thumbHeight:A[13],thumbData:A.subarray(14,14+3*A[12]*A[13])}),65518===Q&&65===A[0]&&100===A[1]&&111===A[2]&&98===A[3]&&101===A[4]&&0===A[5]&&(this.adobe={version:A[6],flags0:A[7]<<8|A[8],flags1:A[9]<<8|A[10],transformCode:A[11]});break}case 65499:{const B=g()+I-2;for(;I<B;){const B=A[I++],C=new Int32Array(64);if(B>>4==0)for(let g=0;g<64;g++){C[s[g]]=A[I++]}else{if(B>>4!=1)throw new Error("DQT: invalid table spec");for(let A=0;A<64;A++){C[s[A]]=g()}}this.quantizationTables[15&B]=C}break}case 65472:case 65473:case 65474:{g();const B={extended:65473===Q,progressive:65474===Q,precision:A[I++],scanLines:g(),samplesPerLine:g(),components:{},componentsOrder:[],maxH:0,maxV:0,mcusPerLine:0,mcusPerColumn:0},E=A[I++];let i;for(let g=0;g<E;g++){i=A[I];const g=A[I+1]>>4,C=15&A[I+1],Q=A[I+2];B.componentsOrder.push(i),B.components[i]={h:g,v:C,quantizationIdx:Q,blocksPerLine:0,blocksPerColumn:0,blocks:[]},I+=3}C(B),this.frames.push(B);break}case 65476:{const B=g();for(let g=2;g<B;){const B=A[I++],C=new Uint8Array(16);let Q=0;for(let g=0;g<16;g++,I++)C[g]=A[I],Q+=C[g];const E=new Uint8Array(Q);for(let g=0;g<Q;g++,I++)E[g]=A[I];g+=17+Q,B>>4==0?this.huffmanTablesDC[15&B]=r(C,E):this.huffmanTablesAC[15&B]=r(C,E)}break}case 65501:g(),this.resetInterval=g();break;case 65498:{g();const B=A[I++],C=[],Q=this.frames[0];for(let g=0;g<B;g++){const g=Q.components[A[I++]],B=A[I++];g.huffmanTableDC=this.huffmanTablesDC[B>>4],g.huffmanTableAC=this.huffmanTablesAC[15&B],C.push(g)}const E=A[I++],i=A[I++],e=A[I++],t=D(A,I,Q,C,this.resetInterval,E,i,e>>4,15&e);I+=t;break}case 65535:255!==A[I]&&I--;break;default:if(255===A[I-3]&&A[I-2]>=192&&A[I-2]<=254){I-=3;break}throw new Error(`unknown JPEG marker ${Q.toString(16)}`)}Q=g()}}getResult(){const{frames:A}=this;if(0===this.frames.length)throw new Error("no frames were decoded");this.frames.length>1&&console.warn("more than one frame is not supported");for(let A=0;A<this.frames.length;A++){const I=this.frames[A].components;for(const A of Object.keys(I)){const g=I[A].quantizationIdx;"number"==typeof g&&(I[A].quantizationTable=this.quantizationTables[g],delete I[A].quantizationIdx)}}const I=A[0];if(!I.maxH||!I.maxV)throw new Error("Invalid frame dimensions");const{components:g,componentsOrder:B}=I,C=[],Q=I.samplesPerLine,E=I.scanLines;for(let A=0;A<B.length;A++){const Q=g[B[A]];C.push({lines:n(Q),scaleX:Q.h/I.maxH,scaleY:Q.v/I.maxV})}const i=new Uint8Array(Q*E*C.length);let e=0;for(let A=0;A<E;++A)for(let I=0;I<Q;++I)for(let g=0;g<C.length;++g){const B=C[g];i[e]=B.lines[0|A*B.scaleY][0|I*B.scaleX],++e}return i}}var w=Object.freeze({__proto__:null,default:class extends i{constructor(A){super(A),this.reader=new h,A.JPEGTables&&this.reader.parse(A.JPEGTables)}decodeBlock(A){return this.reader.resetFrames(),this.reader.parse(new Uint8Array(A)),this.reader.getResult().buffer}}});\n/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */function y(A){let I=A.length;for(;--I>=0;)A[I]=0}const G=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),S=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),c=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),N=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=new Array(576);y(d);const l=new Array(60);y(l);const k=new Array(512);y(k);const F=new Array(256);y(F);const R=new Array(29);y(R);const L=new Array(30);function U(A,I,g,B,C){this.static_tree=A,this.extra_bits=I,this.extra_base=g,this.elems=B,this.max_length=C,this.has_stree=A&&A.length}let f,Y,K;function u(A,I){this.dyn_tree=A,this.max_code=0,this.stat_desc=I}y(L);const M=A=>A<256?k[A]:k[256+(A>>>7)],J=(A,I)=>{A.pending_buf[A.pending++]=255&I,A.pending_buf[A.pending++]=I>>>8&255},H=(A,I,g)=>{A.bi_valid>16-g?(A.bi_buf|=I<<A.bi_valid&65535,J(A,A.bi_buf),A.bi_buf=I>>16-A.bi_valid,A.bi_valid+=g-16):(A.bi_buf|=I<<A.bi_valid&65535,A.bi_valid+=g)},p=(A,I,g)=>{H(A,g[2*I],g[2*I+1])},m=(A,I)=>{let g=0;do{g|=1&A,A>>>=1,g<<=1}while(--I>0);return g>>>1},q=(A,I,g)=>{const B=new Array(16);let C,Q,E=0;for(C=1;C<=15;C++)B[C]=E=E+g[C-1]<<1;for(Q=0;Q<=I;Q++){let I=A[2*Q+1];0!==I&&(A[2*Q]=m(B[I]++,I))}},b=A=>{let I;for(I=0;I<286;I++)A.dyn_ltree[2*I]=0;for(I=0;I<30;I++)A.dyn_dtree[2*I]=0;for(I=0;I<19;I++)A.bl_tree[2*I]=0;A.dyn_ltree[512]=1,A.opt_len=A.static_len=0,A.last_lit=A.matches=0},x=A=>{A.bi_valid>8?J(A,A.bi_buf):A.bi_valid>0&&(A.pending_buf[A.pending++]=A.bi_buf),A.bi_buf=0,A.bi_valid=0},O=(A,I,g,B)=>{const C=2*I,Q=2*g;return A[C]<A[Q]||A[C]===A[Q]&&B[I]<=B[g]},T=(A,I,g)=>{const B=A.heap[g];let C=g<<1;for(;C<=A.heap_len&&(C<A.heap_len&&O(I,A.heap[C+1],A.heap[C],A.depth)&&C++,!O(I,B,A.heap[C],A.depth));)A.heap[g]=A.heap[C],g=C,C<<=1;A.heap[g]=B},_=(A,I,g)=>{let B,C,Q,E,i=0;if(0!==A.last_lit)do{B=A.pending_buf[A.d_buf+2*i]<<8|A.pending_buf[A.d_buf+2*i+1],C=A.pending_buf[A.l_buf+i],i++,0===B?p(A,C,I):(Q=F[C],p(A,Q+256+1,I),E=G[Q],0!==E&&(C-=R[Q],H(A,C,E)),B--,Q=M(B),p(A,Q,g),E=S[Q],0!==E&&(B-=L[Q],H(A,B,E)))}while(i<A.last_lit);p(A,256,I)},Z=(A,I)=>{const g=I.dyn_tree,B=I.stat_desc.static_tree,C=I.stat_desc.has_stree,Q=I.stat_desc.elems;let E,i,e,t=-1;for(A.heap_len=0,A.heap_max=573,E=0;E<Q;E++)0!==g[2*E]?(A.heap[++A.heap_len]=t=E,A.depth[E]=0):g[2*E+1]=0;for(;A.heap_len<2;)e=A.heap[++A.heap_len]=t<2?++t:0,g[2*e]=1,A.depth[e]=0,A.opt_len--,C&&(A.static_len-=B[2*e+1]);for(I.max_code=t,E=A.heap_len>>1;E>=1;E--)T(A,g,E);e=Q;do{E=A.heap[1],A.heap[1]=A.heap[A.heap_len--],T(A,g,1),i=A.heap[1],A.heap[--A.heap_max]=E,A.heap[--A.heap_max]=i,g[2*e]=g[2*E]+g[2*i],A.depth[e]=(A.depth[E]>=A.depth[i]?A.depth[E]:A.depth[i])+1,g[2*E+1]=g[2*i+1]=e,A.heap[1]=e++,T(A,g,1)}while(A.heap_len>=2);A.heap[--A.heap_max]=A.heap[1],((A,I)=>{const g=I.dyn_tree,B=I.max_code,C=I.stat_desc.static_tree,Q=I.stat_desc.has_stree,E=I.stat_desc.extra_bits,i=I.stat_desc.extra_base,e=I.stat_desc.max_length;let t,o,a,s,r,D,n=0;for(s=0;s<=15;s++)A.bl_count[s]=0;for(g[2*A.heap[A.heap_max]+1]=0,t=A.heap_max+1;t<573;t++)o=A.heap[t],s=g[2*g[2*o+1]+1]+1,s>e&&(s=e,n++),g[2*o+1]=s,o>B||(A.bl_count[s]++,r=0,o>=i&&(r=E[o-i]),D=g[2*o],A.opt_len+=D*(s+r),Q&&(A.static_len+=D*(C[2*o+1]+r)));if(0!==n){do{for(s=e-1;0===A.bl_count[s];)s--;A.bl_count[s]--,A.bl_count[s+1]+=2,A.bl_count[e]--,n-=2}while(n>0);for(s=e;0!==s;s--)for(o=A.bl_count[s];0!==o;)a=A.heap[--t],a>B||(g[2*a+1]!==s&&(A.opt_len+=(s-g[2*a+1])*g[2*a],g[2*a+1]=s),o--)}})(A,I),q(g,t,A.bl_count)},P=(A,I,g)=>{let B,C,Q=-1,E=I[1],i=0,e=7,t=4;for(0===E&&(e=138,t=3),I[2*(g+1)+1]=65535,B=0;B<=g;B++)C=E,E=I[2*(B+1)+1],++i<e&&C===E||(i<t?A.bl_tree[2*C]+=i:0!==C?(C!==Q&&A.bl_tree[2*C]++,A.bl_tree[32]++):i<=10?A.bl_tree[34]++:A.bl_tree[36]++,i=0,Q=C,0===E?(e=138,t=3):C===E?(e=6,t=3):(e=7,t=4))},v=(A,I,g)=>{let B,C,Q=-1,E=I[1],i=0,e=7,t=4;for(0===E&&(e=138,t=3),B=0;B<=g;B++)if(C=E,E=I[2*(B+1)+1],!(++i<e&&C===E)){if(i<t)do{p(A,C,A.bl_tree)}while(0!=--i);else 0!==C?(C!==Q&&(p(A,C,A.bl_tree),i--),p(A,16,A.bl_tree),H(A,i-3,2)):i<=10?(p(A,17,A.bl_tree),H(A,i-3,3)):(p(A,18,A.bl_tree),H(A,i-11,7));i=0,Q=C,0===E?(e=138,t=3):C===E?(e=6,t=3):(e=7,t=4)}};let j=!1;const W=(A,I,g,B)=>{H(A,0+(B?1:0),3),((A,I,g,B)=>{x(A),B&&(J(A,g),J(A,~g)),A.pending_buf.set(A.window.subarray(I,I+g),A.pending),A.pending+=g})(A,I,g,!0)};var V=(A,I,g,B)=>{let C,Q,E=0;A.level>0?(2===A.strm.data_type&&(A.strm.data_type=(A=>{let I,g=4093624447;for(I=0;I<=31;I++,g>>>=1)if(1&g&&0!==A.dyn_ltree[2*I])return 0;if(0!==A.dyn_ltree[18]||0!==A.dyn_ltree[20]||0!==A.dyn_ltree[26])return 1;for(I=32;I<256;I++)if(0!==A.dyn_ltree[2*I])return 1;return 0})(A)),Z(A,A.l_desc),Z(A,A.d_desc),E=(A=>{let I;for(P(A,A.dyn_ltree,A.l_desc.max_code),P(A,A.dyn_dtree,A.d_desc.max_code),Z(A,A.bl_desc),I=18;I>=3&&0===A.bl_tree[2*N[I]+1];I--);return A.opt_len+=3*(I+1)+5+5+4,I})(A),C=A.opt_len+3+7>>>3,Q=A.static_len+3+7>>>3,Q<=C&&(C=Q)):C=Q=g+5,g+4<=C&&-1!==I?W(A,I,g,B):4===A.strategy||Q===C?(H(A,2+(B?1:0),3),_(A,d,l)):(H(A,4+(B?1:0),3),((A,I,g,B)=>{let C;for(H(A,I-257,5),H(A,g-1,5),H(A,B-4,4),C=0;C<B;C++)H(A,A.bl_tree[2*N[C]+1],3);v(A,A.dyn_ltree,I-1),v(A,A.dyn_dtree,g-1)})(A,A.l_desc.max_code+1,A.d_desc.max_code+1,E+1),_(A,A.dyn_ltree,A.dyn_dtree)),b(A),B&&x(A)},z={_tr_init:A=>{j||((()=>{let A,I,g,B,C;const Q=new Array(16);for(g=0,B=0;B<28;B++)for(R[B]=g,A=0;A<1<<G[B];A++)F[g++]=B;for(F[g-1]=B,C=0,B=0;B<16;B++)for(L[B]=C,A=0;A<1<<S[B];A++)k[C++]=B;for(C>>=7;B<30;B++)for(L[B]=C<<7,A=0;A<1<<S[B]-7;A++)k[256+C++]=B;for(I=0;I<=15;I++)Q[I]=0;for(A=0;A<=143;)d[2*A+1]=8,A++,Q[8]++;for(;A<=255;)d[2*A+1]=9,A++,Q[9]++;for(;A<=279;)d[2*A+1]=7,A++,Q[7]++;for(;A<=287;)d[2*A+1]=8,A++,Q[8]++;for(q(d,287,Q),A=0;A<30;A++)l[2*A+1]=5,l[2*A]=m(A,5);f=new U(d,G,257,286,15),Y=new U(l,S,0,30,15),K=new U(new Array(0),c,0,19,7)})(),j=!0),A.l_desc=new u(A.dyn_ltree,f),A.d_desc=new u(A.dyn_dtree,Y),A.bl_desc=new u(A.bl_tree,K),A.bi_buf=0,A.bi_valid=0,b(A)},_tr_stored_block:W,_tr_flush_block:V,_tr_tally:(A,I,g)=>(A.pending_buf[A.d_buf+2*A.last_lit]=I>>>8&255,A.pending_buf[A.d_buf+2*A.last_lit+1]=255&I,A.pending_buf[A.l_buf+A.last_lit]=255&g,A.last_lit++,0===I?A.dyn_ltree[2*g]++:(A.matches++,I--,A.dyn_ltree[2*(F[g]+256+1)]++,A.dyn_dtree[2*M(I)]++),A.last_lit===A.lit_bufsize-1),_tr_align:A=>{H(A,2,3),p(A,256,d),(A=>{16===A.bi_valid?(J(A,A.bi_buf),A.bi_buf=0,A.bi_valid=0):A.bi_valid>=8&&(A.pending_buf[A.pending++]=255&A.bi_buf,A.bi_buf>>=8,A.bi_valid-=8)})(A)}};var X=(A,I,g,B)=>{let C=65535&A|0,Q=A>>>16&65535|0,E=0;for(;0!==g;){E=g>2e3?2e3:g,g-=E;do{C=C+I[B++]|0,Q=Q+C|0}while(--E);C%=65521,Q%=65521}return C|Q<<16|0};const $=new Uint32Array((()=>{let A,I=[];for(var g=0;g<256;g++){A=g;for(var B=0;B<8;B++)A=1&A?3988292384^A>>>1:A>>>1;I[g]=A}return I})());var AA=(A,I,g,B)=>{const C=$,Q=B+g;A^=-1;for(let g=B;g<Q;g++)A=A>>>8^C[255&(A^I[g])];return-1^A},IA={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},gA={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:BA,_tr_stored_block:CA,_tr_flush_block:QA,_tr_tally:EA,_tr_align:iA}=z,{Z_NO_FLUSH:eA,Z_PARTIAL_FLUSH:tA,Z_FULL_FLUSH:oA,Z_FINISH:aA,Z_BLOCK:sA,Z_OK:rA,Z_STREAM_END:DA,Z_STREAM_ERROR:nA,Z_DATA_ERROR:hA,Z_BUF_ERROR:wA,Z_DEFAULT_COMPRESSION:yA,Z_FILTERED:GA,Z_HUFFMAN_ONLY:SA,Z_RLE:cA,Z_FIXED:NA,Z_DEFAULT_STRATEGY:dA,Z_UNKNOWN:lA,Z_DEFLATED:kA}=gA,FA=(A,I)=>(A.msg=IA[I],I),RA=A=>(A<<1)-(A>4?9:0),LA=A=>{let I=A.length;for(;--I>=0;)A[I]=0};let UA=(A,I,g)=>(I<<A.hash_shift^g)&A.hash_mask;const fA=A=>{const I=A.state;let g=I.pending;g>A.avail_out&&(g=A.avail_out),0!==g&&(A.output.set(I.pending_buf.subarray(I.pending_out,I.pending_out+g),A.next_out),A.next_out+=g,I.pending_out+=g,A.total_out+=g,A.avail_out-=g,I.pending-=g,0===I.pending&&(I.pending_out=0))},YA=(A,I)=>{QA(A,A.block_start>=0?A.block_start:-1,A.strstart-A.block_start,I),A.block_start=A.strstart,fA(A.strm)},KA=(A,I)=>{A.pending_buf[A.pending++]=I},uA=(A,I)=>{A.pending_buf[A.pending++]=I>>>8&255,A.pending_buf[A.pending++]=255&I},MA=(A,I,g,B)=>{let C=A.avail_in;return C>B&&(C=B),0===C?0:(A.avail_in-=C,I.set(A.input.subarray(A.next_in,A.next_in+C),g),1===A.state.wrap?A.adler=X(A.adler,I,C,g):2===A.state.wrap&&(A.adler=AA(A.adler,I,C,g)),A.next_in+=C,A.total_in+=C,C)},JA=(A,I)=>{let g,B,C=A.max_chain_length,Q=A.strstart,E=A.prev_length,i=A.nice_match;const e=A.strstart>A.w_size-262?A.strstart-(A.w_size-262):0,t=A.window,o=A.w_mask,a=A.prev,s=A.strstart+258;let r=t[Q+E-1],D=t[Q+E];A.prev_length>=A.good_match&&(C>>=2),i>A.lookahead&&(i=A.lookahead);do{if(g=I,t[g+E]===D&&t[g+E-1]===r&&t[g]===t[Q]&&t[++g]===t[Q+1]){Q+=2,g++;do{}while(t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&t[++Q]===t[++g]&&Q<s);if(B=258-(s-Q),Q=s-258,B>E){if(A.match_start=I,E=B,B>=i)break;r=t[Q+E-1],D=t[Q+E]}}}while((I=a[I&o])>e&&0!=--C);return E<=A.lookahead?E:A.lookahead},HA=A=>{const I=A.w_size;let g,B,C,Q,E;do{if(Q=A.window_size-A.lookahead-A.strstart,A.strstart>=I+(I-262)){A.window.set(A.window.subarray(I,I+I),0),A.match_start-=I,A.strstart-=I,A.block_start-=I,B=A.hash_size,g=B;do{C=A.head[--g],A.head[g]=C>=I?C-I:0}while(--B);B=I,g=B;do{C=A.prev[--g],A.prev[g]=C>=I?C-I:0}while(--B);Q+=I}if(0===A.strm.avail_in)break;if(B=MA(A.strm,A.window,A.strstart+A.lookahead,Q),A.lookahead+=B,A.lookahead+A.insert>=3)for(E=A.strstart-A.insert,A.ins_h=A.window[E],A.ins_h=UA(A,A.ins_h,A.window[E+1]);A.insert&&(A.ins_h=UA(A,A.ins_h,A.window[E+3-1]),A.prev[E&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=E,E++,A.insert--,!(A.lookahead+A.insert<3)););}while(A.lookahead<262&&0!==A.strm.avail_in)},pA=(A,I)=>{let g,B;for(;;){if(A.lookahead<262){if(HA(A),A.lookahead<262&&I===eA)return 1;if(0===A.lookahead)break}if(g=0,A.lookahead>=3&&(A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),0!==g&&A.strstart-g<=A.w_size-262&&(A.match_length=JA(A,g)),A.match_length>=3)if(B=EA(A,A.strstart-A.match_start,A.match_length-3),A.lookahead-=A.match_length,A.match_length<=A.max_lazy_match&&A.lookahead>=3){A.match_length--;do{A.strstart++,A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart}while(0!=--A.match_length);A.strstart++}else A.strstart+=A.match_length,A.match_length=0,A.ins_h=A.window[A.strstart],A.ins_h=UA(A,A.ins_h,A.window[A.strstart+1]);else B=EA(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++;if(B&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=A.strstart<2?A.strstart:2,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2},mA=(A,I)=>{let g,B,C;for(;;){if(A.lookahead<262){if(HA(A),A.lookahead<262&&I===eA)return 1;if(0===A.lookahead)break}if(g=0,A.lookahead>=3&&(A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),A.prev_length=A.match_length,A.prev_match=A.match_start,A.match_length=2,0!==g&&A.prev_length<A.max_lazy_match&&A.strstart-g<=A.w_size-262&&(A.match_length=JA(A,g),A.match_length<=5&&(A.strategy===GA||3===A.match_length&&A.strstart-A.match_start>4096)&&(A.match_length=2)),A.prev_length>=3&&A.match_length<=A.prev_length){C=A.strstart+A.lookahead-3,B=EA(A,A.strstart-1-A.prev_match,A.prev_length-3),A.lookahead-=A.prev_length-1,A.prev_length-=2;do{++A.strstart<=C&&(A.ins_h=UA(A,A.ins_h,A.window[A.strstart+3-1]),g=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart)}while(0!=--A.prev_length);if(A.match_available=0,A.match_length=2,A.strstart++,B&&(YA(A,!1),0===A.strm.avail_out))return 1}else if(A.match_available){if(B=EA(A,0,A.window[A.strstart-1]),B&&YA(A,!1),A.strstart++,A.lookahead--,0===A.strm.avail_out)return 1}else A.match_available=1,A.strstart++,A.lookahead--}return A.match_available&&(B=EA(A,0,A.window[A.strstart-1]),A.match_available=0),A.insert=A.strstart<2?A.strstart:2,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2};function qA(A,I,g,B,C){this.good_length=A,this.max_lazy=I,this.nice_length=g,this.max_chain=B,this.func=C}const bA=[new qA(0,0,0,0,((A,I)=>{let g=65535;for(g>A.pending_buf_size-5&&(g=A.pending_buf_size-5);;){if(A.lookahead<=1){if(HA(A),0===A.lookahead&&I===eA)return 1;if(0===A.lookahead)break}A.strstart+=A.lookahead,A.lookahead=0;const B=A.block_start+g;if((0===A.strstart||A.strstart>=B)&&(A.lookahead=A.strstart-B,A.strstart=B,YA(A,!1),0===A.strm.avail_out))return 1;if(A.strstart-A.block_start>=A.w_size-262&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=0,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):(A.strstart>A.block_start&&(YA(A,!1),A.strm.avail_out),1)})),new qA(4,4,8,4,pA),new qA(4,5,16,8,pA),new qA(4,6,32,32,pA),new qA(4,4,16,16,mA),new qA(8,16,32,32,mA),new qA(8,16,128,128,mA),new qA(8,32,128,256,mA),new qA(32,128,258,1024,mA),new qA(32,258,258,4096,mA)];function xA(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=kA,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),LA(this.dyn_ltree),LA(this.dyn_dtree),LA(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),LA(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),LA(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const OA=A=>{if(!A||!A.state)return FA(A,nA);A.total_in=A.total_out=0,A.data_type=lA;const I=A.state;return I.pending=0,I.pending_out=0,I.wrap<0&&(I.wrap=-I.wrap),I.status=I.wrap?42:113,A.adler=2===I.wrap?0:1,I.last_flush=eA,BA(I),rA},TA=A=>{const I=OA(A);var g;return I===rA&&((g=A.state).window_size=2*g.w_size,LA(g.head),g.max_lazy_match=bA[g.level].max_lazy,g.good_match=bA[g.level].good_length,g.nice_match=bA[g.level].nice_length,g.max_chain_length=bA[g.level].max_chain,g.strstart=0,g.block_start=0,g.lookahead=0,g.insert=0,g.match_length=g.prev_length=2,g.match_available=0,g.ins_h=0),I},_A=(A,I,g,B,C,Q)=>{if(!A)return nA;let E=1;if(I===yA&&(I=6),B<0?(E=0,B=-B):B>15&&(E=2,B-=16),C<1||C>9||g!==kA||B<8||B>15||I<0||I>9||Q<0||Q>NA)return FA(A,nA);8===B&&(B=9);const i=new xA;return A.state=i,i.strm=A,i.wrap=E,i.gzhead=null,i.w_bits=B,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=C+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+3-1)/3),i.window=new Uint8Array(2*i.w_size),i.head=new Uint16Array(i.hash_size),i.prev=new Uint16Array(i.w_size),i.lit_bufsize=1<<C+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new Uint8Array(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=I,i.strategy=Q,i.method=g,TA(A)};var ZA={deflateInit:(A,I)=>_A(A,I,kA,15,8,dA),deflateInit2:_A,deflateReset:TA,deflateResetKeep:OA,deflateSetHeader:(A,I)=>A&&A.state?2!==A.state.wrap?nA:(A.state.gzhead=I,rA):nA,deflate:(A,I)=>{let g,B;if(!A||!A.state||I>sA||I<0)return A?FA(A,nA):nA;const C=A.state;if(!A.output||!A.input&&0!==A.avail_in||666===C.status&&I!==aA)return FA(A,0===A.avail_out?wA:nA);C.strm=A;const Q=C.last_flush;if(C.last_flush=I,42===C.status)if(2===C.wrap)A.adler=0,KA(C,31),KA(C,139),KA(C,8),C.gzhead?(KA(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),KA(C,255&C.gzhead.time),KA(C,C.gzhead.time>>8&255),KA(C,C.gzhead.time>>16&255),KA(C,C.gzhead.time>>24&255),KA(C,9===C.level?2:C.strategy>=SA||C.level<2?4:0),KA(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(KA(C,255&C.gzhead.extra.length),KA(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(A.adler=AA(A.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(KA(C,0),KA(C,0),KA(C,0),KA(C,0),KA(C,0),KA(C,9===C.level?2:C.strategy>=SA||C.level<2?4:0),KA(C,3),C.status=113);else{let I=kA+(C.w_bits-8<<4)<<8,g=-1;g=C.strategy>=SA||C.level<2?0:C.level<6?1:6===C.level?2:3,I|=g<<6,0!==C.strstart&&(I|=32),I+=31-I%31,C.status=113,uA(C,I),0!==C.strstart&&(uA(C,A.adler>>>16),uA(C,65535&A.adler)),A.adler=1}if(69===C.status)if(C.gzhead.extra){for(g=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),fA(A),g=C.pending,C.pending!==C.pending_buf_size));)KA(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(73===C.status)if(C.gzhead.name){g=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),fA(A),g=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,KA(C,B)}while(0!==B);C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),0===B&&(C.gzindex=0,C.status=91)}else C.status=91;if(91===C.status)if(C.gzhead.comment){g=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),fA(A),g=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,KA(C,B)}while(0!==B);C.gzhead.hcrc&&C.pending>g&&(A.adler=AA(A.adler,C.pending_buf,C.pending-g,g)),0===B&&(C.status=103)}else C.status=103;if(103===C.status&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&fA(A),C.pending+2<=C.pending_buf_size&&(KA(C,255&A.adler),KA(C,A.adler>>8&255),A.adler=0,C.status=113)):C.status=113),0!==C.pending){if(fA(A),0===A.avail_out)return C.last_flush=-1,rA}else if(0===A.avail_in&&RA(I)<=RA(Q)&&I!==aA)return FA(A,wA);if(666===C.status&&0!==A.avail_in)return FA(A,wA);if(0!==A.avail_in||0!==C.lookahead||I!==eA&&666!==C.status){let g=C.strategy===SA?((A,I)=>{let g;for(;;){if(0===A.lookahead&&(HA(A),0===A.lookahead)){if(I===eA)return 1;break}if(A.match_length=0,g=EA(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++,g&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=0,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2})(C,I):C.strategy===cA?((A,I)=>{let g,B,C,Q;const E=A.window;for(;;){if(A.lookahead<=258){if(HA(A),A.lookahead<=258&&I===eA)return 1;if(0===A.lookahead)break}if(A.match_length=0,A.lookahead>=3&&A.strstart>0&&(C=A.strstart-1,B=E[C],B===E[++C]&&B===E[++C]&&B===E[++C])){Q=A.strstart+258;do{}while(B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&B===E[++C]&&C<Q);A.match_length=258-(Q-C),A.match_length>A.lookahead&&(A.match_length=A.lookahead)}if(A.match_length>=3?(g=EA(A,1,A.match_length-3),A.lookahead-=A.match_length,A.strstart+=A.match_length,A.match_length=0):(g=EA(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++),g&&(YA(A,!1),0===A.strm.avail_out))return 1}return A.insert=0,I===aA?(YA(A,!0),0===A.strm.avail_out?3:4):A.last_lit&&(YA(A,!1),0===A.strm.avail_out)?1:2})(C,I):bA[C.level].func(C,I);if(3!==g&&4!==g||(C.status=666),1===g||3===g)return 0===A.avail_out&&(C.last_flush=-1),rA;if(2===g&&(I===tA?iA(C):I!==sA&&(CA(C,0,0,!1),I===oA&&(LA(C.head),0===C.lookahead&&(C.strstart=0,C.block_start=0,C.insert=0))),fA(A),0===A.avail_out))return C.last_flush=-1,rA}return I!==aA?rA:C.wrap<=0?DA:(2===C.wrap?(KA(C,255&A.adler),KA(C,A.adler>>8&255),KA(C,A.adler>>16&255),KA(C,A.adler>>24&255),KA(C,255&A.total_in),KA(C,A.total_in>>8&255),KA(C,A.total_in>>16&255),KA(C,A.total_in>>24&255)):(uA(C,A.adler>>>16),uA(C,65535&A.adler)),fA(A),C.wrap>0&&(C.wrap=-C.wrap),0!==C.pending?rA:DA)},deflateEnd:A=>{if(!A||!A.state)return nA;const I=A.state.status;return 42!==I&&69!==I&&73!==I&&91!==I&&103!==I&&113!==I&&666!==I?FA(A,nA):(A.state=null,113===I?FA(A,hA):rA)},deflateSetDictionary:(A,I)=>{let g=I.length;if(!A||!A.state)return nA;const B=A.state,C=B.wrap;if(2===C||1===C&&42!==B.status||B.lookahead)return nA;if(1===C&&(A.adler=X(A.adler,I,g,0)),B.wrap=0,g>=B.w_size){0===C&&(LA(B.head),B.strstart=0,B.block_start=0,B.insert=0);let A=new Uint8Array(B.w_size);A.set(I.subarray(g-B.w_size,g),0),I=A,g=B.w_size}const Q=A.avail_in,E=A.next_in,i=A.input;for(A.avail_in=g,A.next_in=0,A.input=I,HA(B);B.lookahead>=3;){let A=B.strstart,I=B.lookahead-2;do{B.ins_h=UA(B,B.ins_h,B.window[A+3-1]),B.prev[A&B.w_mask]=B.head[B.ins_h],B.head[B.ins_h]=A,A++}while(--I);B.strstart=A,B.lookahead=2,HA(B)}return B.strstart+=B.lookahead,B.block_start=B.strstart,B.insert=B.lookahead,B.lookahead=0,B.match_length=B.prev_length=2,B.match_available=0,A.next_in=E,A.input=i,A.avail_in=Q,B.wrap=C,rA},deflateInfo:"pako deflate (from Nodeca project)"};const PA=(A,I)=>Object.prototype.hasOwnProperty.call(A,I);var vA=function(A){const I=Array.prototype.slice.call(arguments,1);for(;I.length;){const g=I.shift();if(g){if("object"!=typeof g)throw new TypeError(g+"must be non-object");for(const I in g)PA(g,I)&&(A[I]=g[I])}}return A},jA=A=>{let I=0;for(let g=0,B=A.length;g<B;g++)I+=A[g].length;const g=new Uint8Array(I);for(let I=0,B=0,C=A.length;I<C;I++){let C=A[I];g.set(C,B),B+=C.length}return g};let WA=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(A){WA=!1}const VA=new Uint8Array(256);for(let A=0;A<256;A++)VA[A]=A>=252?6:A>=248?5:A>=240?4:A>=224?3:A>=192?2:1;VA[254]=VA[254]=1;var zA=A=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(A);let I,g,B,C,Q,E=A.length,i=0;for(C=0;C<E;C++)g=A.charCodeAt(C),55296==(64512&g)&&C+1<E&&(B=A.charCodeAt(C+1),56320==(64512&B)&&(g=65536+(g-55296<<10)+(B-56320),C++)),i+=g<128?1:g<2048?2:g<65536?3:4;for(I=new Uint8Array(i),Q=0,C=0;Q<i;C++)g=A.charCodeAt(C),55296==(64512&g)&&C+1<E&&(B=A.charCodeAt(C+1),56320==(64512&B)&&(g=65536+(g-55296<<10)+(B-56320),C++)),g<128?I[Q++]=g:g<2048?(I[Q++]=192|g>>>6,I[Q++]=128|63&g):g<65536?(I[Q++]=224|g>>>12,I[Q++]=128|g>>>6&63,I[Q++]=128|63&g):(I[Q++]=240|g>>>18,I[Q++]=128|g>>>12&63,I[Q++]=128|g>>>6&63,I[Q++]=128|63&g);return I},XA=(A,I)=>{const g=I||A.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(A.subarray(0,I));let B,C;const Q=new Array(2*g);for(C=0,B=0;B<g;){let I=A[B++];if(I<128){Q[C++]=I;continue}let E=VA[I];if(E>4)Q[C++]=65533,B+=E-1;else{for(I&=2===E?31:3===E?15:7;E>1&&B<g;)I=I<<6|63&A[B++],E--;E>1?Q[C++]=65533:I<65536?Q[C++]=I:(I-=65536,Q[C++]=55296|I>>10&1023,Q[C++]=56320|1023&I)}}return((A,I)=>{if(I<65534&&A.subarray&&WA)return String.fromCharCode.apply(null,A.length===I?A:A.subarray(0,I));let g="";for(let B=0;B<I;B++)g+=String.fromCharCode(A[B]);return g})(Q,C)},$A=(A,I)=>{(I=I||A.length)>A.length&&(I=A.length);let g=I-1;for(;g>=0&&128==(192&A[g]);)g--;return g<0||0===g?I:g+VA[A[g]]>I?g:I};var AI=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const II=Object.prototype.toString,{Z_NO_FLUSH:gI,Z_SYNC_FLUSH:BI,Z_FULL_FLUSH:CI,Z_FINISH:QI,Z_OK:EI,Z_STREAM_END:iI,Z_DEFAULT_COMPRESSION:eI,Z_DEFAULT_STRATEGY:tI,Z_DEFLATED:oI}=gA;function aI(A){this.options=vA({level:eI,method:oI,chunkSize:16384,windowBits:15,memLevel:8,strategy:tI},A||{});let I=this.options;I.raw&&I.windowBits>0?I.windowBits=-I.windowBits:I.gzip&&I.windowBits>0&&I.windowBits<16&&(I.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new AI,this.strm.avail_out=0;let g=ZA.deflateInit2(this.strm,I.level,I.method,I.windowBits,I.memLevel,I.strategy);if(g!==EI)throw new Error(IA[g]);if(I.header&&ZA.deflateSetHeader(this.strm,I.header),I.dictionary){let A;if(A="string"==typeof I.dictionary?zA(I.dictionary):"[object ArrayBuffer]"===II.call(I.dictionary)?new Uint8Array(I.dictionary):I.dictionary,g=ZA.deflateSetDictionary(this.strm,A),g!==EI)throw new Error(IA[g]);this._dict_set=!0}}aI.prototype.push=function(A,I){const g=this.strm,B=this.options.chunkSize;let C,Q;if(this.ended)return!1;for(Q=I===~~I?I:!0===I?QI:gI,"string"==typeof A?g.input=zA(A):"[object ArrayBuffer]"===II.call(A)?g.input=new Uint8Array(A):g.input=A,g.next_in=0,g.avail_in=g.input.length;;)if(0===g.avail_out&&(g.output=new Uint8Array(B),g.next_out=0,g.avail_out=B),(Q===BI||Q===CI)&&g.avail_out<=6)this.onData(g.output.subarray(0,g.next_out)),g.avail_out=0;else{if(C=ZA.deflate(g,Q),C===iI)return g.next_out>0&&this.onData(g.output.subarray(0,g.next_out)),C=ZA.deflateEnd(this.strm),this.onEnd(C),this.ended=!0,C===EI;if(0!==g.avail_out){if(Q>0&&g.next_out>0)this.onData(g.output.subarray(0,g.next_out)),g.avail_out=0;else if(0===g.avail_in)break}else this.onData(g.output)}return!0},aI.prototype.onData=function(A){this.chunks.push(A)},aI.prototype.onEnd=function(A){A===EI&&(this.result=jA(this.chunks)),this.chunks=[],this.err=A,this.msg=this.strm.msg};var sI=function(A,I){let g,B,C,Q,E,i,e,t,o,a,s,r,D,n,h,w,y,G,S,c,N,d,l,k;const F=A.state;g=A.next_in,l=A.input,B=g+(A.avail_in-5),C=A.next_out,k=A.output,Q=C-(I-A.avail_out),E=C+(A.avail_out-257),i=F.dmax,e=F.wsize,t=F.whave,o=F.wnext,a=F.window,s=F.hold,r=F.bits,D=F.lencode,n=F.distcode,h=(1<<F.lenbits)-1,w=(1<<F.distbits)-1;A:do{r<15&&(s+=l[g++]<<r,r+=8,s+=l[g++]<<r,r+=8),y=D[s&h];I:for(;;){if(G=y>>>24,s>>>=G,r-=G,G=y>>>16&255,0===G)k[C++]=65535&y;else{if(!(16&G)){if(0==(64&G)){y=D[(65535&y)+(s&(1<<G)-1)];continue I}if(32&G){F.mode=12;break A}A.msg="invalid literal/length code",F.mode=30;break A}S=65535&y,G&=15,G&&(r<G&&(s+=l[g++]<<r,r+=8),S+=s&(1<<G)-1,s>>>=G,r-=G),r<15&&(s+=l[g++]<<r,r+=8,s+=l[g++]<<r,r+=8),y=n[s&w];g:for(;;){if(G=y>>>24,s>>>=G,r-=G,G=y>>>16&255,!(16&G)){if(0==(64&G)){y=n[(65535&y)+(s&(1<<G)-1)];continue g}A.msg="invalid distance code",F.mode=30;break A}if(c=65535&y,G&=15,r<G&&(s+=l[g++]<<r,r+=8,r<G&&(s+=l[g++]<<r,r+=8)),c+=s&(1<<G)-1,c>i){A.msg="invalid distance too far back",F.mode=30;break A}if(s>>>=G,r-=G,G=C-Q,c>G){if(G=c-G,G>t&&F.sane){A.msg="invalid distance too far back",F.mode=30;break A}if(N=0,d=a,0===o){if(N+=e-G,G<S){S-=G;do{k[C++]=a[N++]}while(--G);N=C-c,d=k}}else if(o<G){if(N+=e+o-G,G-=o,G<S){S-=G;do{k[C++]=a[N++]}while(--G);if(N=0,o<S){G=o,S-=G;do{k[C++]=a[N++]}while(--G);N=C-c,d=k}}}else if(N+=o-G,G<S){S-=G;do{k[C++]=a[N++]}while(--G);N=C-c,d=k}for(;S>2;)k[C++]=d[N++],k[C++]=d[N++],k[C++]=d[N++],S-=3;S&&(k[C++]=d[N++],S>1&&(k[C++]=d[N++]))}else{N=C-c;do{k[C++]=k[N++],k[C++]=k[N++],k[C++]=k[N++],S-=3}while(S>2);S&&(k[C++]=k[N++],S>1&&(k[C++]=k[N++]))}break}}break}}while(g<B&&C<E);S=r>>3,g-=S,r-=S<<3,s&=(1<<r)-1,A.next_in=g,A.next_out=C,A.avail_in=g<B?B-g+5:5-(g-B),A.avail_out=C<E?E-C+257:257-(C-E),F.hold=s,F.bits=r};const rI=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),DI=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),nI=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),hI=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var wI=(A,I,g,B,C,Q,E,i)=>{const e=i.bits;let t,o,a,s,r,D,n=0,h=0,w=0,y=0,G=0,S=0,c=0,N=0,d=0,l=0,k=null,F=0;const R=new Uint16Array(16),L=new Uint16Array(16);let U,f,Y,K=null,u=0;for(n=0;n<=15;n++)R[n]=0;for(h=0;h<B;h++)R[I[g+h]]++;for(G=e,y=15;y>=1&&0===R[y];y--);if(G>y&&(G=y),0===y)return C[Q++]=20971520,C[Q++]=20971520,i.bits=1,0;for(w=1;w<y&&0===R[w];w++);for(G<w&&(G=w),N=1,n=1;n<=15;n++)if(N<<=1,N-=R[n],N<0)return-1;if(N>0&&(0===A||1!==y))return-1;for(L[1]=0,n=1;n<15;n++)L[n+1]=L[n]+R[n];for(h=0;h<B;h++)0!==I[g+h]&&(E[L[I[g+h]]++]=h);if(0===A?(k=K=E,D=19):1===A?(k=rI,F-=257,K=DI,u-=257,D=256):(k=nI,K=hI,D=-1),l=0,h=0,n=w,r=Q,S=G,c=0,a=-1,d=1<<G,s=d-1,1===A&&d>852||2===A&&d>592)return 1;for(;;){U=n-c,E[h]<D?(f=0,Y=E[h]):E[h]>D?(f=K[u+E[h]],Y=k[F+E[h]]):(f=96,Y=0),t=1<<n-c,o=1<<S,w=o;do{o-=t,C[r+(l>>c)+o]=U<<24|f<<16|Y|0}while(0!==o);for(t=1<<n-1;l&t;)t>>=1;if(0!==t?(l&=t-1,l+=t):l=0,h++,0==--R[n]){if(n===y)break;n=I[g+E[h]]}if(n>G&&(l&s)!==a){for(0===c&&(c=G),r+=w,S=n-c,N=1<<S;S+c<y&&(N-=R[S+c],!(N<=0));)S++,N<<=1;if(d+=1<<S,1===A&&d>852||2===A&&d>592)return 1;a=l&s,C[a]=G<<24|S<<16|r-Q|0}}return 0!==l&&(C[r+l]=n-c<<24|64<<16|0),i.bits=G,0};const{Z_FINISH:yI,Z_BLOCK:GI,Z_TREES:SI,Z_OK:cI,Z_STREAM_END:NI,Z_NEED_DICT:dI,Z_STREAM_ERROR:lI,Z_DATA_ERROR:kI,Z_MEM_ERROR:FI,Z_BUF_ERROR:RI,Z_DEFLATED:LI}=gA,UI=A=>(A>>>24&255)+(A>>>8&65280)+((65280&A)<<8)+((255&A)<<24);function fI(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const YI=A=>{if(!A||!A.state)return lI;const I=A.state;return A.total_in=A.total_out=I.total=0,A.msg="",I.wrap&&(A.adler=1&I.wrap),I.mode=1,I.last=0,I.havedict=0,I.dmax=32768,I.head=null,I.hold=0,I.bits=0,I.lencode=I.lendyn=new Int32Array(852),I.distcode=I.distdyn=new Int32Array(592),I.sane=1,I.back=-1,cI},KI=A=>{if(!A||!A.state)return lI;const I=A.state;return I.wsize=0,I.whave=0,I.wnext=0,YI(A)},uI=(A,I)=>{let g;if(!A||!A.state)return lI;const B=A.state;return I<0?(g=0,I=-I):(g=1+(I>>4),I<48&&(I&=15)),I&&(I<8||I>15)?lI:(null!==B.window&&B.wbits!==I&&(B.window=null),B.wrap=g,B.wbits=I,KI(A))},MI=(A,I)=>{if(!A)return lI;const g=new fI;A.state=g,g.window=null;const B=uI(A,I);return B!==cI&&(A.state=null),B};let JI,HI,pI=!0;const mI=A=>{if(pI){JI=new Int32Array(512),HI=new Int32Array(32);let I=0;for(;I<144;)A.lens[I++]=8;for(;I<256;)A.lens[I++]=9;for(;I<280;)A.lens[I++]=7;for(;I<288;)A.lens[I++]=8;for(wI(1,A.lens,0,288,JI,0,A.work,{bits:9}),I=0;I<32;)A.lens[I++]=5;wI(2,A.lens,0,32,HI,0,A.work,{bits:5}),pI=!1}A.lencode=JI,A.lenbits=9,A.distcode=HI,A.distbits=5},qI=(A,I,g,B)=>{let C;const Q=A.state;return null===Q.window&&(Q.wsize=1<<Q.wbits,Q.wnext=0,Q.whave=0,Q.window=new Uint8Array(Q.wsize)),B>=Q.wsize?(Q.window.set(I.subarray(g-Q.wsize,g),0),Q.wnext=0,Q.whave=Q.wsize):(C=Q.wsize-Q.wnext,C>B&&(C=B),Q.window.set(I.subarray(g-B,g-B+C),Q.wnext),(B-=C)?(Q.window.set(I.subarray(g-B,g),0),Q.wnext=B,Q.whave=Q.wsize):(Q.wnext+=C,Q.wnext===Q.wsize&&(Q.wnext=0),Q.whave<Q.wsize&&(Q.whave+=C))),0};var bI={inflateReset:KI,inflateReset2:uI,inflateResetKeep:YI,inflateInit:A=>MI(A,15),inflateInit2:MI,inflate:(A,I)=>{let g,B,C,Q,E,i,e,t,o,a,s,r,D,n,h,w,y,G,S,c,N,d,l=0;const k=new Uint8Array(4);let F,R;const L=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(!A||!A.state||!A.output||!A.input&&0!==A.avail_in)return lI;g=A.state,12===g.mode&&(g.mode=13),E=A.next_out,C=A.output,e=A.avail_out,Q=A.next_in,B=A.input,i=A.avail_in,t=g.hold,o=g.bits,a=i,s=e,d=cI;A:for(;;)switch(g.mode){case 1:if(0===g.wrap){g.mode=13;break}for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(2&g.wrap&&35615===t){g.check=0,k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0),t=0,o=0,g.mode=2;break}if(g.flags=0,g.head&&(g.head.done=!1),!(1&g.wrap)||(((255&t)<<8)+(t>>8))%31){A.msg="incorrect header check",g.mode=30;break}if((15&t)!==LI){A.msg="unknown compression method",g.mode=30;break}if(t>>>=4,o-=4,N=8+(15&t),0===g.wbits)g.wbits=N;else if(N>g.wbits){A.msg="invalid window size",g.mode=30;break}g.dmax=1<<g.wbits,A.adler=g.check=1,g.mode=512&t?10:12,t=0,o=0;break;case 2:for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(g.flags=t,(255&g.flags)!==LI){A.msg="unknown compression method",g.mode=30;break}if(57344&g.flags){A.msg="unknown header flags set",g.mode=30;break}g.head&&(g.head.text=t>>8&1),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0)),t=0,o=0,g.mode=3;case 3:for(;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.head&&(g.head.time=t),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,k[2]=t>>>16&255,k[3]=t>>>24&255,g.check=AA(g.check,k,4,0)),t=0,o=0,g.mode=4;case 4:for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.head&&(g.head.xflags=255&t,g.head.os=t>>8),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0)),t=0,o=0,g.mode=5;case 5:if(1024&g.flags){for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.length=t,g.head&&(g.head.extra_len=t),512&g.flags&&(k[0]=255&t,k[1]=t>>>8&255,g.check=AA(g.check,k,2,0)),t=0,o=0}else g.head&&(g.head.extra=null);g.mode=6;case 6:if(1024&g.flags&&(r=g.length,r>i&&(r=i),r&&(g.head&&(N=g.head.extra_len-g.length,g.head.extra||(g.head.extra=new Uint8Array(g.head.extra_len)),g.head.extra.set(B.subarray(Q,Q+r),N)),512&g.flags&&(g.check=AA(g.check,B,r,Q)),i-=r,Q+=r,g.length-=r),g.length))break A;g.length=0,g.mode=7;case 7:if(2048&g.flags){if(0===i)break A;r=0;do{N=B[Q+r++],g.head&&N&&g.length<65536&&(g.head.name+=String.fromCharCode(N))}while(N&&r<i);if(512&g.flags&&(g.check=AA(g.check,B,r,Q)),i-=r,Q+=r,N)break A}else g.head&&(g.head.name=null);g.length=0,g.mode=8;case 8:if(4096&g.flags){if(0===i)break A;r=0;do{N=B[Q+r++],g.head&&N&&g.length<65536&&(g.head.comment+=String.fromCharCode(N))}while(N&&r<i);if(512&g.flags&&(g.check=AA(g.check,B,r,Q)),i-=r,Q+=r,N)break A}else g.head&&(g.head.comment=null);g.mode=9;case 9:if(512&g.flags){for(;o<16;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(t!==(65535&g.check)){A.msg="header crc mismatch",g.mode=30;break}t=0,o=0}g.head&&(g.head.hcrc=g.flags>>9&1,g.head.done=!0),A.adler=g.check=0,g.mode=12;break;case 10:for(;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}A.adler=g.check=UI(t),t=0,o=0,g.mode=11;case 11:if(0===g.havedict)return A.next_out=E,A.avail_out=e,A.next_in=Q,A.avail_in=i,g.hold=t,g.bits=o,dI;A.adler=g.check=1,g.mode=12;case 12:if(I===GI||I===SI)break A;case 13:if(g.last){t>>>=7&o,o-=7&o,g.mode=27;break}for(;o<3;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}switch(g.last=1&t,t>>>=1,o-=1,3&t){case 0:g.mode=14;break;case 1:if(mI(g),g.mode=20,I===SI){t>>>=2,o-=2;break A}break;case 2:g.mode=17;break;case 3:A.msg="invalid block type",g.mode=30}t>>>=2,o-=2;break;case 14:for(t>>>=7&o,o-=7&o;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if((65535&t)!=(t>>>16^65535)){A.msg="invalid stored block lengths",g.mode=30;break}if(g.length=65535&t,t=0,o=0,g.mode=15,I===SI)break A;case 15:g.mode=16;case 16:if(r=g.length,r){if(r>i&&(r=i),r>e&&(r=e),0===r)break A;C.set(B.subarray(Q,Q+r),E),i-=r,Q+=r,e-=r,E+=r,g.length-=r;break}g.mode=12;break;case 17:for(;o<14;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(g.nlen=257+(31&t),t>>>=5,o-=5,g.ndist=1+(31&t),t>>>=5,o-=5,g.ncode=4+(15&t),t>>>=4,o-=4,g.nlen>286||g.ndist>30){A.msg="too many length or distance symbols",g.mode=30;break}g.have=0,g.mode=18;case 18:for(;g.have<g.ncode;){for(;o<3;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.lens[L[g.have++]]=7&t,t>>>=3,o-=3}for(;g.have<19;)g.lens[L[g.have++]]=0;if(g.lencode=g.lendyn,g.lenbits=7,F={bits:g.lenbits},d=wI(0,g.lens,0,19,g.lencode,0,g.work,F),g.lenbits=F.bits,d){A.msg="invalid code lengths set",g.mode=30;break}g.have=0,g.mode=19;case 19:for(;g.have<g.nlen+g.ndist;){for(;l=g.lencode[t&(1<<g.lenbits)-1],h=l>>>24,w=l>>>16&255,y=65535&l,!(h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(y<16)t>>>=h,o-=h,g.lens[g.have++]=y;else{if(16===y){for(R=h+2;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(t>>>=h,o-=h,0===g.have){A.msg="invalid bit length repeat",g.mode=30;break}N=g.lens[g.have-1],r=3+(3&t),t>>>=2,o-=2}else if(17===y){for(R=h+3;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=h,o-=h,N=0,r=3+(7&t),t>>>=3,o-=3}else{for(R=h+7;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=h,o-=h,N=0,r=11+(127&t),t>>>=7,o-=7}if(g.have+r>g.nlen+g.ndist){A.msg="invalid bit length repeat",g.mode=30;break}for(;r--;)g.lens[g.have++]=N}}if(30===g.mode)break;if(0===g.lens[256]){A.msg="invalid code -- missing end-of-block",g.mode=30;break}if(g.lenbits=9,F={bits:g.lenbits},d=wI(1,g.lens,0,g.nlen,g.lencode,0,g.work,F),g.lenbits=F.bits,d){A.msg="invalid literal/lengths set",g.mode=30;break}if(g.distbits=6,g.distcode=g.distdyn,F={bits:g.distbits},d=wI(2,g.lens,g.nlen,g.ndist,g.distcode,0,g.work,F),g.distbits=F.bits,d){A.msg="invalid distances set",g.mode=30;break}if(g.mode=20,I===SI)break A;case 20:g.mode=21;case 21:if(i>=6&&e>=258){A.next_out=E,A.avail_out=e,A.next_in=Q,A.avail_in=i,g.hold=t,g.bits=o,sI(A,s),E=A.next_out,C=A.output,e=A.avail_out,Q=A.next_in,B=A.input,i=A.avail_in,t=g.hold,o=g.bits,12===g.mode&&(g.back=-1);break}for(g.back=0;l=g.lencode[t&(1<<g.lenbits)-1],h=l>>>24,w=l>>>16&255,y=65535&l,!(h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(w&&0==(240&w)){for(G=h,S=w,c=y;l=g.lencode[c+((t&(1<<G+S)-1)>>G)],h=l>>>24,w=l>>>16&255,y=65535&l,!(G+h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=G,o-=G,g.back+=G}if(t>>>=h,o-=h,g.back+=h,g.length=y,0===w){g.mode=26;break}if(32&w){g.back=-1,g.mode=12;break}if(64&w){A.msg="invalid literal/length code",g.mode=30;break}g.extra=15&w,g.mode=22;case 22:if(g.extra){for(R=g.extra;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.length+=t&(1<<g.extra)-1,t>>>=g.extra,o-=g.extra,g.back+=g.extra}g.was=g.length,g.mode=23;case 23:for(;l=g.distcode[t&(1<<g.distbits)-1],h=l>>>24,w=l>>>16&255,y=65535&l,!(h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(0==(240&w)){for(G=h,S=w,c=y;l=g.distcode[c+((t&(1<<G+S)-1)>>G)],h=l>>>24,w=l>>>16&255,y=65535&l,!(G+h<=o);){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}t>>>=G,o-=G,g.back+=G}if(t>>>=h,o-=h,g.back+=h,64&w){A.msg="invalid distance code",g.mode=30;break}g.offset=y,g.extra=15&w,g.mode=24;case 24:if(g.extra){for(R=g.extra;o<R;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}g.offset+=t&(1<<g.extra)-1,t>>>=g.extra,o-=g.extra,g.back+=g.extra}if(g.offset>g.dmax){A.msg="invalid distance too far back",g.mode=30;break}g.mode=25;case 25:if(0===e)break A;if(r=s-e,g.offset>r){if(r=g.offset-r,r>g.whave&&g.sane){A.msg="invalid distance too far back",g.mode=30;break}r>g.wnext?(r-=g.wnext,D=g.wsize-r):D=g.wnext-r,r>g.length&&(r=g.length),n=g.window}else n=C,D=E-g.offset,r=g.length;r>e&&(r=e),e-=r,g.length-=r;do{C[E++]=n[D++]}while(--r);0===g.length&&(g.mode=21);break;case 26:if(0===e)break A;C[E++]=g.length,e--,g.mode=21;break;case 27:if(g.wrap){for(;o<32;){if(0===i)break A;i--,t|=B[Q++]<<o,o+=8}if(s-=e,A.total_out+=s,g.total+=s,s&&(A.adler=g.check=g.flags?AA(g.check,C,s,E-s):X(g.check,C,s,E-s)),s=e,(g.flags?t:UI(t))!==g.check){A.msg="incorrect data check",g.mode=30;break}t=0,o=0}g.mode=28;case 28:if(g.wrap&&g.flags){for(;o<32;){if(0===i)break A;i--,t+=B[Q++]<<o,o+=8}if(t!==(4294967295&g.total)){A.msg="incorrect length check",g.mode=30;break}t=0,o=0}g.mode=29;case 29:d=NI;break A;case 30:d=kI;break A;case 31:return FI;default:return lI}return A.next_out=E,A.avail_out=e,A.next_in=Q,A.avail_in=i,g.hold=t,g.bits=o,(g.wsize||s!==A.avail_out&&g.mode<30&&(g.mode<27||I!==yI))&&qI(A,A.output,A.next_out,s-A.avail_out),a-=A.avail_in,s-=A.avail_out,A.total_in+=a,A.total_out+=s,g.total+=s,g.wrap&&s&&(A.adler=g.check=g.flags?AA(g.check,C,s,A.next_out-s):X(g.check,C,s,A.next_out-s)),A.data_type=g.bits+(g.last?64:0)+(12===g.mode?128:0)+(20===g.mode||15===g.mode?256:0),(0===a&&0===s||I===yI)&&d===cI&&(d=RI),d},inflateEnd:A=>{if(!A||!A.state)return lI;let I=A.state;return I.window&&(I.window=null),A.state=null,cI},inflateGetHeader:(A,I)=>{if(!A||!A.state)return lI;const g=A.state;return 0==(2&g.wrap)?lI:(g.head=I,I.done=!1,cI)},inflateSetDictionary:(A,I)=>{const g=I.length;let B,C,Q;return A&&A.state?(B=A.state,0!==B.wrap&&11!==B.mode?lI:11===B.mode&&(C=1,C=X(C,I,g,0),C!==B.check)?kI:(Q=qI(A,I,g,g),Q?(B.mode=31,FI):(B.havedict=1,cI))):lI},inflateInfo:"pako inflate (from Nodeca project)"};var xI=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const OI=Object.prototype.toString,{Z_NO_FLUSH:TI,Z_FINISH:_I,Z_OK:ZI,Z_STREAM_END:PI,Z_NEED_DICT:vI,Z_STREAM_ERROR:jI,Z_DATA_ERROR:WI,Z_MEM_ERROR:VI}=gA;function zI(A){this.options=vA({chunkSize:65536,windowBits:15,to:""},A||{});const I=this.options;I.raw&&I.windowBits>=0&&I.windowBits<16&&(I.windowBits=-I.windowBits,0===I.windowBits&&(I.windowBits=-15)),!(I.windowBits>=0&&I.windowBits<16)||A&&A.windowBits||(I.windowBits+=32),I.windowBits>15&&I.windowBits<48&&0==(15&I.windowBits)&&(I.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new AI,this.strm.avail_out=0;let g=bI.inflateInit2(this.strm,I.windowBits);if(g!==ZI)throw new Error(IA[g]);if(this.header=new xI,bI.inflateGetHeader(this.strm,this.header),I.dictionary&&("string"==typeof I.dictionary?I.dictionary=zA(I.dictionary):"[object ArrayBuffer]"===OI.call(I.dictionary)&&(I.dictionary=new Uint8Array(I.dictionary)),I.raw&&(g=bI.inflateSetDictionary(this.strm,I.dictionary),g!==ZI)))throw new Error(IA[g])}function XI(A,I){const g=new zI(I);if(g.push(A),g.err)throw g.msg||IA[g.err];return g.result}zI.prototype.push=function(A,I){const g=this.strm,B=this.options.chunkSize,C=this.options.dictionary;let Q,E,i;if(this.ended)return!1;for(E=I===~~I?I:!0===I?_I:TI,"[object ArrayBuffer]"===OI.call(A)?g.input=new Uint8Array(A):g.input=A,g.next_in=0,g.avail_in=g.input.length;;){for(0===g.avail_out&&(g.output=new Uint8Array(B),g.next_out=0,g.avail_out=B),Q=bI.inflate(g,E),Q===vI&&C&&(Q=bI.inflateSetDictionary(g,C),Q===ZI?Q=bI.inflate(g,E):Q===WI&&(Q=vI));g.avail_in>0&&Q===PI&&g.state.wrap>0&&0!==A[g.next_in];)bI.inflateReset(g),Q=bI.inflate(g,E);switch(Q){case jI:case WI:case vI:case VI:return this.onEnd(Q),this.ended=!0,!1}if(i=g.avail_out,g.next_out&&(0===g.avail_out||Q===PI))if("string"===this.options.to){let A=$A(g.output,g.next_out),I=g.next_out-A,C=XA(g.output,A);g.next_out=I,g.avail_out=B-I,I&&g.output.set(g.output.subarray(A,A+I),0),this.onData(C)}else this.onData(g.output.length===g.next_out?g.output:g.output.subarray(0,g.next_out));if(Q!==ZI||0!==i){if(Q===PI)return Q=bI.inflateEnd(this.strm),this.onEnd(Q),this.ended=!0,!0;if(0===g.avail_in)break}}return!0},zI.prototype.onData=function(A){this.chunks.push(A)},zI.prototype.onEnd=function(A){A===ZI&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=jA(this.chunks)),this.chunks=[],this.err=A,this.msg=this.strm.msg};var $I={Inflate:zI,inflate:XI,inflateRaw:function(A,I){return(I=I||{}).raw=!0,XI(A,I)},ungzip:XI,constants:gA};const{Inflate:Ag,inflate:Ig,inflateRaw:gg,ungzip:Bg}=$I;var Cg=Ig;var Qg=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){return Cg(new Uint8Array(A)).buffer}}});var Eg,ig=Object.freeze({__proto__:null,default:class extends i{decodeBlock(A){const I=new DataView(A),g=[];for(let B=0;B<A.byteLength;++B){let A=I.getInt8(B);if(A<0){const C=I.getUint8(B+1);A=-A;for(let I=0;I<=A;++I)g.push(C);B+=1}else{for(let C=0;C<=A;++C)g.push(I.getUint8(B+C+1));B+=A+1}}return new Uint8Array(g).buffer}}}),eg={exports:{}};Eg=eg,\n/* Copyright 2015-2021 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */\nfunction(){var A,I,g,B,C,Q,E,i,e,t,o,a,s,r,D,n,h=(A={defaultNoDataValue:-34027999387901484e22,decode:function(Q,E){var i=(E=E||{}).encodedMaskData||null===E.encodedMaskData,e=C(Q,E.inputOffset||0,i),t=null!==E.noDataValue?E.noDataValue:A.defaultNoDataValue,o=I(e,E.pixelType||Float32Array,E.encodedMaskData,t,E.returnMask),a={width:e.width,height:e.height,pixelData:o.resultPixels,minValue:o.minValue,maxValue:e.pixels.maxValue,noDataValue:t};return o.resultMask&&(a.maskData=o.resultMask),E.returnEncodedMask&&e.mask&&(a.encodedMaskData=e.mask.bitset?e.mask.bitset:null),E.returnFileInfo&&(a.fileInfo=g(e),E.computeUsedBitDepths&&(a.fileInfo.bitDepths=B(e))),a}},I=function(A,I,g,B,C){var E,i,e,t=0,o=A.pixels.numBlocksX,a=A.pixels.numBlocksY,s=Math.floor(A.width/o),r=Math.floor(A.height/a),D=2*A.maxZError,n=Number.MAX_VALUE;g=g||(A.mask?A.mask.bitset:null),i=new I(A.width*A.height),C&&g&&(e=new Uint8Array(A.width*A.height));for(var h,w,y=new Float32Array(s*r),G=0;G<=a;G++){var S=G!==a?r:A.height%a;if(0!==S)for(var c=0;c<=o;c++){var N=c!==o?s:A.width%o;if(0!==N){var d,l,k,F,R=G*A.width*r+c*s,L=A.width-N,U=A.pixels.blocks[t];if(U.encoding<2?(0===U.encoding?d=U.rawData:(Q(U.stuffedData,U.bitsPerPixel,U.numValidPixels,U.offset,D,y,A.pixels.maxValue),d=y),l=0):k=2===U.encoding?0:U.offset,g)for(w=0;w<S;w++){for(7&R&&(F=g[R>>3],F<<=7&R),h=0;h<N;h++)7&R||(F=g[R>>3]),128&F?(e&&(e[R]=1),n=n>(E=U.encoding<2?d[l++]:k)?E:n,i[R++]=E):(e&&(e[R]=0),i[R++]=B),F<<=1;R+=L}else if(U.encoding<2)for(w=0;w<S;w++){for(h=0;h<N;h++)n=n>(E=d[l++])?E:n,i[R++]=E;R+=L}else for(n=n>k?k:n,w=0;w<S;w++){for(h=0;h<N;h++)i[R++]=k;R+=L}if(1===U.encoding&&l!==U.numValidPixels)throw"Block and Mask do not match";t++}}}return{resultPixels:i,resultMask:e,minValue:n}},g=function(A){return{fileIdentifierString:A.fileIdentifierString,fileVersion:A.fileVersion,imageType:A.imageType,height:A.height,width:A.width,maxZError:A.maxZError,eofOffset:A.eofOffset,mask:A.mask?{numBlocksX:A.mask.numBlocksX,numBlocksY:A.mask.numBlocksY,numBytes:A.mask.numBytes,maxValue:A.mask.maxValue}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,numBytes:A.pixels.numBytes,maxValue:A.pixels.maxValue,noDataValue:A.noDataValue}}},B=function(A){for(var I=A.pixels.numBlocksX*A.pixels.numBlocksY,g={},B=0;B<I;B++){var C=A.pixels.blocks[B];0===C.encoding?g.float32=!0:1===C.encoding?g[C.bitsPerPixel]=!0:g[0]=!0}return Object.keys(g)},C=function(A,I,g){var B={},C=new Uint8Array(A,I,10);if(B.fileIdentifierString=String.fromCharCode.apply(null,C),"CntZImage"!==B.fileIdentifierString.trim())throw"Unexpected file identifier string: "+B.fileIdentifierString;I+=10;var Q=new DataView(A,I,24);if(B.fileVersion=Q.getInt32(0,!0),B.imageType=Q.getInt32(4,!0),B.height=Q.getUint32(8,!0),B.width=Q.getUint32(12,!0),B.maxZError=Q.getFloat64(16,!0),I+=24,!g)if(Q=new DataView(A,I,16),B.mask={},B.mask.numBlocksY=Q.getUint32(0,!0),B.mask.numBlocksX=Q.getUint32(4,!0),B.mask.numBytes=Q.getUint32(8,!0),B.mask.maxValue=Q.getFloat32(12,!0),I+=16,B.mask.numBytes>0){var E=new Uint8Array(Math.ceil(B.width*B.height/8)),i=(Q=new DataView(A,I,B.mask.numBytes)).getInt16(0,!0),e=2,t=0;do{if(i>0)for(;i--;)E[t++]=Q.getUint8(e++);else{var o=Q.getUint8(e++);for(i=-i;i--;)E[t++]=o}i=Q.getInt16(e,!0),e+=2}while(e<B.mask.numBytes);if(-32768!==i||t<E.length)throw"Unexpected end of mask RLE encoding";B.mask.bitset=E,I+=B.mask.numBytes}else 0==(B.mask.numBytes|B.mask.numBlocksY|B.mask.maxValue)&&(B.mask.bitset=new Uint8Array(Math.ceil(B.width*B.height/8)));Q=new DataView(A,I,16),B.pixels={},B.pixels.numBlocksY=Q.getUint32(0,!0),B.pixels.numBlocksX=Q.getUint32(4,!0),B.pixels.numBytes=Q.getUint32(8,!0),B.pixels.maxValue=Q.getFloat32(12,!0),I+=16;var a=B.pixels.numBlocksX,s=B.pixels.numBlocksY,r=a+(B.width%a>0?1:0),D=s+(B.height%s>0?1:0);B.pixels.blocks=new Array(r*D);for(var n=0,h=0;h<D;h++)for(var w=0;w<r;w++){var y=0,G=A.byteLength-I;Q=new DataView(A,I,Math.min(10,G));var S={};B.pixels.blocks[n++]=S;var c=Q.getUint8(0);if(y++,S.encoding=63&c,S.encoding>3)throw"Invalid block encoding ("+S.encoding+")";if(2!==S.encoding){if(0!==c&&2!==c){if(c>>=6,S.offsetType=c,2===c)S.offset=Q.getInt8(1),y++;else if(1===c)S.offset=Q.getInt16(1,!0),y+=2;else{if(0!==c)throw"Invalid block offset type";S.offset=Q.getFloat32(1,!0),y+=4}if(1===S.encoding)if(c=Q.getUint8(y),y++,S.bitsPerPixel=63&c,c>>=6,S.numValidPixelsType=c,2===c)S.numValidPixels=Q.getUint8(y),y++;else if(1===c)S.numValidPixels=Q.getUint16(y,!0),y+=2;else{if(0!==c)throw"Invalid valid pixel count type";S.numValidPixels=Q.getUint32(y,!0),y+=4}}var N;if(I+=y,3!==S.encoding)if(0===S.encoding){var d=(B.pixels.numBytes-1)/4;if(d!==Math.floor(d))throw"uncompressed block has invalid length";N=new ArrayBuffer(4*d),new Uint8Array(N).set(new Uint8Array(A,I,4*d));var l=new Float32Array(N);S.rawData=l,I+=4*d}else if(1===S.encoding){var k=Math.ceil(S.numValidPixels*S.bitsPerPixel/8),F=Math.ceil(k/4);N=new ArrayBuffer(4*F),new Uint8Array(N).set(new Uint8Array(A,I,k)),S.stuffedData=new Uint32Array(N),I+=k}}else I++}return B.eofOffset=I,B},Q=function(A,I,g,B,C,Q,E){var i,e,t,o=(1<<I)-1,a=0,s=0,r=Math.ceil((E-B)/C),D=4*A.length-Math.ceil(I*g/8);for(A[A.length-1]<<=8*D,i=0;i<g;i++){if(0===s&&(t=A[a++],s=32),s>=I)e=t>>>s-I&o,s-=I;else{var n=I-s;e=(t&o)<<n&o,e+=(t=A[a++])>>>(s=32-n)}Q[i]=e<r?B+e*C:E}return Q},A),w=(E=function(A,I,g,B,C,Q,E,i){var e,t,o,a,s,r=(1<<g)-1,D=0,n=0,h=4*A.length-Math.ceil(g*B/8);if(A[A.length-1]<<=8*h,C)for(e=0;e<B;e++)0===n&&(o=A[D++],n=32),n>=g?(t=o>>>n-g&r,n-=g):(t=(o&r)<<(a=g-n)&r,t+=(o=A[D++])>>>(n=32-a)),I[e]=C[t];else for(s=Math.ceil((i-Q)/E),e=0;e<B;e++)0===n&&(o=A[D++],n=32),n>=g?(t=o>>>n-g&r,n-=g):(t=(o&r)<<(a=g-n)&r,t+=(o=A[D++])>>>(n=32-a)),I[e]=t<s?Q+t*E:i},i=function(A,I,g,B,C,Q){var E,i=(1<<I)-1,e=0,t=0,o=0,a=0,s=0,r=[],D=4*A.length-Math.ceil(I*g/8);A[A.length-1]<<=8*D;var n=Math.ceil((Q-B)/C);for(t=0;t<g;t++)0===a&&(E=A[e++],a=32),a>=I?(s=E>>>a-I&i,a-=I):(s=(E&i)<<(o=I-a)&i,s+=(E=A[e++])>>>(a=32-o)),r[t]=s<n?B+s*C:Q;return r.unshift(B),r},e=function(A,I,g,B,C,Q,E,i){var e,t,o,a,s=(1<<g)-1,r=0,D=0,n=0;if(C)for(e=0;e<B;e++)0===D&&(o=A[r++],D=32,n=0),D>=g?(t=o>>>n&s,D-=g,n+=g):(t=o>>>n&s,D=32-(a=g-D),t|=((o=A[r++])&(1<<a)-1)<<g-a,n=a),I[e]=C[t];else{var h=Math.ceil((i-Q)/E);for(e=0;e<B;e++)0===D&&(o=A[r++],D=32,n=0),D>=g?(t=o>>>n&s,D-=g,n+=g):(t=o>>>n&s,D=32-(a=g-D),t|=((o=A[r++])&(1<<a)-1)<<g-a,n=a),I[e]=t<h?Q+t*E:i}return I},t=function(A,I,g,B,C,Q){var E,i=(1<<I)-1,e=0,t=0,o=0,a=0,s=0,r=0,D=[],n=Math.ceil((Q-B)/C);for(t=0;t<g;t++)0===a&&(E=A[e++],a=32,r=0),a>=I?(s=E>>>r&i,a-=I,r+=I):(s=E>>>r&i,a=32-(o=I-a),s|=((E=A[e++])&(1<<o)-1)<<I-o,r=o),D[t]=s<n?B+s*C:Q;return D.unshift(B),D},o=function(A,I,g,B){var C,Q,E,i,e=(1<<g)-1,t=0,o=0,a=4*A.length-Math.ceil(g*B/8);for(A[A.length-1]<<=8*a,C=0;C<B;C++)0===o&&(E=A[t++],o=32),o>=g?(Q=E>>>o-g&e,o-=g):(Q=(E&e)<<(i=g-o)&e,Q+=(E=A[t++])>>>(o=32-i)),I[C]=Q;return I},a=function(A,I,g,B){var C,Q,E,i,e=(1<<g)-1,t=0,o=0,a=0;for(C=0;C<B;C++)0===o&&(E=A[t++],o=32,a=0),o>=g?(Q=E>>>a&e,o-=g,a+=g):(Q=E>>>a&e,o=32-(i=g-o),Q|=((E=A[t++])&(1<<i)-1)<<g-i,a=i),I[C]=Q;return I},s={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(A){for(var I=65535,g=65535,B=A.length,C=Math.floor(B/2),Q=0;C;){var E=C>=359?359:C;C-=E;do{I+=A[Q++]<<8,g+=I+=A[Q++]}while(--E);I=(65535&I)+(I>>>16),g=(65535&g)+(g>>>16)}return 1&B&&(g+=I+=A[Q]<<8),((g=(65535&g)+(g>>>16))<<16|(I=(65535&I)+(I>>>16)))>>>0},readHeaderInfo:function(A,I){var g=I.ptr,B=new Uint8Array(A,g,6),C={};if(C.fileIdentifierString=String.fromCharCode.apply(null,B),0!==C.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+C.fileIdentifierString;g+=6;var Q,E=new DataView(A,g,8),i=E.getInt32(0,!0);if(C.fileVersion=i,g+=4,i>=3&&(C.checksum=E.getUint32(4,!0),g+=4),E=new DataView(A,g,12),C.height=E.getUint32(0,!0),C.width=E.getUint32(4,!0),g+=8,i>=4?(C.numDims=E.getUint32(8,!0),g+=4):C.numDims=1,E=new DataView(A,g,40),C.numValidPixel=E.getUint32(0,!0),C.microBlockSize=E.getInt32(4,!0),C.blobSize=E.getInt32(8,!0),C.imageType=E.getInt32(12,!0),C.maxZError=E.getFloat64(16,!0),C.zMin=E.getFloat64(24,!0),C.zMax=E.getFloat64(32,!0),g+=40,I.headerInfo=C,I.ptr=g,i>=3&&(Q=i>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(A,g-Q,C.blobSize-14))!==C.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(A,I){var g=I.headerInfo,B=this.getDataTypeArray(g.imageType),C=g.numDims*this.getDataTypeSize(g.imageType),Q=this.readSubArray(A,I.ptr,B,C),E=this.readSubArray(A,I.ptr+C,B,C);I.ptr+=2*C;var i,e=!0;for(i=0;i<g.numDims;i++)if(Q[i]!==E[i]){e=!1;break}return g.minValues=Q,g.maxValues=E,e},readSubArray:function(A,I,g,B){var C;if(g===Uint8Array)C=new Uint8Array(A,I,B);else{var Q=new ArrayBuffer(B);new Uint8Array(Q).set(new Uint8Array(A,I,B)),C=new g(Q)}return C},readMask:function(A,I){var g,B,C=I.ptr,Q=I.headerInfo,E=Q.width*Q.height,i=Q.numValidPixel,e=new DataView(A,C,4),t={};if(t.numBytes=e.getUint32(0,!0),C+=4,(0===i||E===i)&&0!==t.numBytes)throw"invalid mask";if(0===i)g=new Uint8Array(Math.ceil(E/8)),t.bitset=g,B=new Uint8Array(E),I.pixels.resultMask=B,C+=t.numBytes;else if(t.numBytes>0){g=new Uint8Array(Math.ceil(E/8));var o=(e=new DataView(A,C,t.numBytes)).getInt16(0,!0),a=2,s=0,r=0;do{if(o>0)for(;o--;)g[s++]=e.getUint8(a++);else for(r=e.getUint8(a++),o=-o;o--;)g[s++]=r;o=e.getInt16(a,!0),a+=2}while(a<t.numBytes);if(-32768!==o||s<g.length)throw"Unexpected end of mask RLE encoding";B=new Uint8Array(E);var D=0,n=0;for(n=0;n<E;n++)7&n?(D=g[n>>3],D<<=7&n):D=g[n>>3],128&D&&(B[n]=1);I.pixels.resultMask=B,t.bitset=g,C+=t.numBytes}return I.ptr=C,I.mask=t,!0},readDataOneSweep:function(A,I,g,B){var C,Q=I.ptr,E=I.headerInfo,i=E.numDims,e=E.width*E.height,t=E.imageType,o=E.numValidPixel*s.getDataTypeSize(t)*i,a=I.pixels.resultMask;if(g===Uint8Array)C=new Uint8Array(A,Q,o);else{var r=new ArrayBuffer(o);new Uint8Array(r).set(new Uint8Array(A,Q,o)),C=new g(r)}if(C.length===e*i)I.pixels.resultPixels=B?s.swapDimensionOrder(C,e,i,g,!0):C;else{I.pixels.resultPixels=new g(e*i);var D=0,n=0,h=0,w=0;if(i>1){if(B){for(n=0;n<e;n++)if(a[n])for(w=n,h=0;h<i;h++,w+=e)I.pixels.resultPixels[w]=C[D++]}else for(n=0;n<e;n++)if(a[n])for(w=n*i,h=0;h<i;h++)I.pixels.resultPixels[w+h]=C[D++]}else for(n=0;n<e;n++)a[n]&&(I.pixels.resultPixels[n]=C[D++])}return Q+=o,I.ptr=Q,!0},readHuffmanTree:function(A,I){var g=this.HUFFMAN_LUT_BITS_MAX,B=new DataView(A,I.ptr,16);if(I.ptr+=16,B.getInt32(0,!0)<2)throw"unsupported Huffman version";var C=B.getInt32(4,!0),Q=B.getInt32(8,!0),E=B.getInt32(12,!0);if(Q>=E)return!1;var i=new Uint32Array(E-Q);s.decodeBits(A,I,i);var e,t,o,a,D=[];for(e=Q;e<E;e++)D[t=e-(e<C?0:C)]={first:i[e-Q],second:null};var n=A.byteLength-I.ptr,h=Math.ceil(n/4),w=new ArrayBuffer(4*h);new Uint8Array(w).set(new Uint8Array(A,I.ptr,n));var y,G=new Uint32Array(w),S=0,c=0;for(y=G[0],e=Q;e<E;e++)(a=D[t=e-(e<C?0:C)].first)>0&&(D[t].second=y<<S>>>32-a,32-S>=a?32===(S+=a)&&(S=0,y=G[++c]):(S+=a-32,y=G[++c],D[t].second|=y>>>32-S));var N=0,d=0,l=new r;for(e=0;e<D.length;e++)void 0!==D[e]&&(N=Math.max(N,D[e].first));d=N>=g?g:N;var k,F,R,L,U,f=[];for(e=Q;e<E;e++)if((a=D[t=e-(e<C?0:C)].first)>0)if(k=[a,t],a<=d)for(F=D[t].second<<d-a,R=1<<d-a,o=0;o<R;o++)f[F|o]=k;else for(F=D[t].second,U=l,L=a-1;L>=0;L--)F>>>L&1?(U.right||(U.right=new r),U=U.right):(U.left||(U.left=new r),U=U.left),0!==L||U.val||(U.val=k[1]);return{decodeLut:f,numBitsLUTQick:d,numBitsLUT:N,tree:l,stuffedData:G,srcPtr:c,bitPos:S}},readHuffman:function(A,I,g,B){var C,Q,E,i,e,t,o,a,r,D=I.headerInfo.numDims,n=I.headerInfo.height,h=I.headerInfo.width,w=h*n,y=this.readHuffmanTree(A,I),G=y.decodeLut,S=y.tree,c=y.stuffedData,N=y.srcPtr,d=y.bitPos,l=y.numBitsLUTQick,k=y.numBitsLUT,F=0===I.headerInfo.imageType?128:0,R=I.pixels.resultMask,L=0;d>0&&(N++,d=0);var U,f=c[N],Y=1===I.encodeMode,K=new g(w*D),u=K;if(D<2||Y){for(U=0;U<D;U++)if(D>1&&(u=new g(K.buffer,w*U,w),L=0),I.headerInfo.numValidPixel===h*n)for(a=0,t=0;t<n;t++)for(o=0;o<h;o++,a++){if(Q=0,e=i=f<<d>>>32-l,32-d<l&&(e=i|=c[N+1]>>>64-d-l),G[e])Q=G[e][1],d+=G[e][0];else for(e=i=f<<d>>>32-k,32-d<k&&(e=i|=c[N+1]>>>64-d-k),C=S,r=0;r<k;r++)if(!(C=i>>>k-r-1&1?C.right:C.left).left&&!C.right){Q=C.val,d=d+r+1;break}d>=32&&(d-=32,f=c[++N]),E=Q-F,Y?(E+=o>0?L:t>0?u[a-h]:L,E&=255,u[a]=E,L=E):u[a]=E}else for(a=0,t=0;t<n;t++)for(o=0;o<h;o++,a++)if(R[a]){if(Q=0,e=i=f<<d>>>32-l,32-d<l&&(e=i|=c[N+1]>>>64-d-l),G[e])Q=G[e][1],d+=G[e][0];else for(e=i=f<<d>>>32-k,32-d<k&&(e=i|=c[N+1]>>>64-d-k),C=S,r=0;r<k;r++)if(!(C=i>>>k-r-1&1?C.right:C.left).left&&!C.right){Q=C.val,d=d+r+1;break}d>=32&&(d-=32,f=c[++N]),E=Q-F,Y?(o>0&&R[a-1]?E+=L:t>0&&R[a-h]?E+=u[a-h]:E+=L,E&=255,u[a]=E,L=E):u[a]=E}}else for(a=0,t=0;t<n;t++)for(o=0;o<h;o++)if(a=t*h+o,!R||R[a])for(U=0;U<D;U++,a+=w){if(Q=0,e=i=f<<d>>>32-l,32-d<l&&(e=i|=c[N+1]>>>64-d-l),G[e])Q=G[e][1],d+=G[e][0];else for(e=i=f<<d>>>32-k,32-d<k&&(e=i|=c[N+1]>>>64-d-k),C=S,r=0;r<k;r++)if(!(C=i>>>k-r-1&1?C.right:C.left).left&&!C.right){Q=C.val,d=d+r+1;break}d>=32&&(d-=32,f=c[++N]),E=Q-F,u[a]=E}I.ptr=I.ptr+4*(N+1)+(d>0?4:0),I.pixels.resultPixels=K,D>1&&!B&&(I.pixels.resultPixels=s.swapDimensionOrder(K,w,D,g))},decodeBits:function(A,I,g,B,C){var Q=I.headerInfo,s=Q.fileVersion,r=0,D=A.byteLength-I.ptr>=5?5:A.byteLength-I.ptr,n=new DataView(A,I.ptr,D),h=n.getUint8(0);r++;var w=h>>6,y=0===w?4:3-w,G=(32&h)>0,S=31&h,c=0;if(1===y)c=n.getUint8(r),r++;else if(2===y)c=n.getUint16(r,!0),r+=2;else{if(4!==y)throw"Invalid valid pixel count type";c=n.getUint32(r,!0),r+=4}var N,d,l,k,F,R,L,U,f,Y=2*Q.maxZError,K=Q.numDims>1?Q.maxValues[C]:Q.zMax;if(G){for(I.counter.lut++,U=n.getUint8(r),r++,k=Math.ceil((U-1)*S/8),F=Math.ceil(k/4),d=new ArrayBuffer(4*F),l=new Uint8Array(d),I.ptr+=r,l.set(new Uint8Array(A,I.ptr,k)),L=new Uint32Array(d),I.ptr+=k,f=0;U-1>>>f;)f++;k=Math.ceil(c*f/8),F=Math.ceil(k/4),d=new ArrayBuffer(4*F),(l=new Uint8Array(d)).set(new Uint8Array(A,I.ptr,k)),N=new Uint32Array(d),I.ptr+=k,R=s>=3?t(L,S,U-1,B,Y,K):i(L,S,U-1,B,Y,K),s>=3?e(N,g,f,c,R):E(N,g,f,c,R)}else I.counter.bitstuffer++,f=S,I.ptr+=r,f>0&&(k=Math.ceil(c*f/8),F=Math.ceil(k/4),d=new ArrayBuffer(4*F),(l=new Uint8Array(d)).set(new Uint8Array(A,I.ptr,k)),N=new Uint32Array(d),I.ptr+=k,s>=3?null==B?a(N,g,f,c):e(N,g,f,c,!1,B,Y,K):null==B?o(N,g,f,c):E(N,g,f,c,!1,B,Y,K))},readTiles:function(A,I,g,B){var C=I.headerInfo,Q=C.width,E=C.height,i=Q*E,e=C.microBlockSize,t=C.imageType,o=s.getDataTypeSize(t),a=Math.ceil(Q/e),r=Math.ceil(E/e);I.pixels.numBlocksY=r,I.pixels.numBlocksX=a,I.pixels.ptr=0;var D,n,h,w,y,G,S,c,N,d,l=0,k=0,F=0,R=0,L=0,U=0,f=0,Y=0,K=0,u=0,M=0,J=0,H=0,p=0,m=0,q=new g(e*e),b=E%e||e,x=Q%e||e,O=C.numDims,T=I.pixels.resultMask,_=I.pixels.resultPixels,Z=C.fileVersion>=5?14:15,P=C.zMax;for(F=0;F<r;F++)for(L=F!==r-1?e:b,R=0;R<a;R++)for(u=F*Q*e+R*e,M=Q-(U=R!==a-1?e:x),c=0;c<O;c++){if(O>1?(d=_,u=F*Q*e+R*e,_=new g(I.pixels.resultPixels.buffer,i*c*o,i),P=C.maxValues[c]):d=null,f=A.byteLength-I.ptr,n={},m=0,Y=(D=new DataView(A,I.ptr,Math.min(10,f))).getUint8(0),m++,N=C.fileVersion>=5?4&Y:0,K=Y>>6&255,(Y>>2&Z)!=(R*e>>3&Z))throw"integrity issue";if(N&&0===c)throw"integrity issue";if((y=3&Y)>3)throw I.ptr+=m,"Invalid block encoding ("+y+")";if(2!==y)if(0===y){if(N)throw"integrity issue";if(I.counter.uncompressed++,I.ptr+=m,J=(J=L*U*o)<(H=A.byteLength-I.ptr)?J:H,h=new ArrayBuffer(J%o==0?J:J+o-J%o),new Uint8Array(h).set(new Uint8Array(A,I.ptr,J)),w=new g(h),p=0,T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=w[p++]),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u++]=w[p++];u+=M}I.ptr+=p*o}else if(G=s.getDataTypeUsed(N&&t<6?4:t,K),S=s.getOnePixel(n,m,G,D),m+=s.getDataTypeSize(G),3===y)if(I.ptr+=m,I.counter.constantoffset++,T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=N?Math.min(P,d[u]+S):S),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u]=N?Math.min(P,d[u]+S):S,u++;u+=M}else if(I.ptr+=m,s.decodeBits(A,I,q,S,c),m=0,N)if(T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=q[m++]+d[u]),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u]=q[m++]+d[u],u++;u+=M}else if(T)for(l=0;l<L;l++){for(k=0;k<U;k++)T[u]&&(_[u]=q[m++]),u++;u+=M}else for(l=0;l<L;l++){for(k=0;k<U;k++)_[u++]=q[m++];u+=M}else{if(N)if(T)for(l=0;l<L;l++)for(k=0;k<U;k++)T[u]&&(_[u]=d[u]),u++;else for(l=0;l<L;l++)for(k=0;k<U;k++)_[u]=d[u],u++;I.counter.constant++,I.ptr+=m}}O>1&&!B&&(I.pixels.resultPixels=s.swapDimensionOrder(I.pixels.resultPixels,i,O,g))},formatFileInfo:function(A){return{fileIdentifierString:A.headerInfo.fileIdentifierString,fileVersion:A.headerInfo.fileVersion,imageType:A.headerInfo.imageType,height:A.headerInfo.height,width:A.headerInfo.width,numValidPixel:A.headerInfo.numValidPixel,microBlockSize:A.headerInfo.microBlockSize,blobSize:A.headerInfo.blobSize,maxZError:A.headerInfo.maxZError,pixelType:s.getPixelType(A.headerInfo.imageType),eofOffset:A.eofOffset,mask:A.mask?{numBytes:A.mask.numBytes}:null,pixels:{numBlocksX:A.pixels.numBlocksX,numBlocksY:A.pixels.numBlocksY,maxValue:A.headerInfo.zMax,minValue:A.headerInfo.zMin,noDataValue:A.noDataValue}}},constructConstantSurface:function(A,I){var g=A.headerInfo.zMax,B=A.headerInfo.zMin,C=A.headerInfo.maxValues,Q=A.headerInfo.numDims,E=A.headerInfo.height*A.headerInfo.width,i=0,e=0,t=0,o=A.pixels.resultMask,a=A.pixels.resultPixels;if(o)if(Q>1){if(I)for(i=0;i<Q;i++)for(t=i*E,g=C[i],e=0;e<E;e++)o[e]&&(a[t+e]=g);else for(e=0;e<E;e++)if(o[e])for(t=e*Q,i=0;i<Q;i++)a[t+Q]=C[i]}else for(e=0;e<E;e++)o[e]&&(a[e]=g);else if(Q>1&&B!==g)if(I)for(i=0;i<Q;i++)for(t=i*E,g=C[i],e=0;e<E;e++)a[t+e]=g;else for(e=0;e<E;e++)for(t=e*Q,i=0;i<Q;i++)a[t+i]=C[i];else for(e=0;e<E*Q;e++)a[e]=g},getDataTypeArray:function(A){var I;switch(A){case 0:I=Int8Array;break;case 1:I=Uint8Array;break;case 2:I=Int16Array;break;case 3:I=Uint16Array;break;case 4:I=Int32Array;break;case 5:I=Uint32Array;break;case 6:default:I=Float32Array;break;case 7:I=Float64Array}return I},getPixelType:function(A){var I;switch(A){case 0:I="S8";break;case 1:I="U8";break;case 2:I="S16";break;case 3:I="U16";break;case 4:I="S32";break;case 5:I="U32";break;case 6:default:I="F32";break;case 7:I="F64"}return I},isValidPixelValue:function(A,I){if(null==I)return!1;var g;switch(A){case 0:g=I>=-128&&I<=127;break;case 1:g=I>=0&&I<=255;break;case 2:g=I>=-32768&&I<=32767;break;case 3:g=I>=0&&I<=65536;break;case 4:g=I>=-2147483648&&I<=2147483647;break;case 5:g=I>=0&&I<=4294967296;break;case 6:g=I>=-34027999387901484e22&&I<=34027999387901484e22;break;case 7:g=I>=-17976931348623157e292&&I<=17976931348623157e292;break;default:g=!1}return g},getDataTypeSize:function(A){var I=0;switch(A){case 0:case 1:I=1;break;case 2:case 3:I=2;break;case 4:case 5:case 6:I=4;break;case 7:I=8;break;default:I=A}return I},getDataTypeUsed:function(A,I){var g=A;switch(A){case 2:case 4:g=A-I;break;case 3:case 5:g=A-2*I;break;case 6:g=0===I?A:1===I?2:1;break;case 7:g=0===I?A:A-2*I+1;break;default:g=A}return g},getOnePixel:function(A,I,g,B){var C=0;switch(g){case 0:C=B.getInt8(I);break;case 1:C=B.getUint8(I);break;case 2:C=B.getInt16(I,!0);break;case 3:C=B.getUint16(I,!0);break;case 4:C=B.getInt32(I,!0);break;case 5:C=B.getUInt32(I,!0);break;case 6:C=B.getFloat32(I,!0);break;case 7:C=B.getFloat64(I,!0);break;default:throw"the decoder does not understand this pixel type"}return C},swapDimensionOrder:function(A,I,g,B,C){var Q=0,E=0,i=0,e=0,t=A;if(g>1)if(t=new B(I*g),C)for(Q=0;Q<I;Q++)for(e=Q,i=0;i<g;i++,e+=I)t[e]=A[E++];else for(Q=0;Q<I;Q++)for(e=Q,i=0;i<g;i++,e+=I)t[E++]=A[e];return t}},r=function(A,I,g){this.val=A,this.left=I,this.right=g},{decode:function(A,I){var g=(I=I||{}).noDataValue,B=0,C={};C.ptr=I.inputOffset||0,C.pixels={},s.readHeaderInfo(A,C);var Q=C.headerInfo,E=Q.fileVersion,i=s.getDataTypeArray(Q.imageType);if(E>5)throw"unsupported lerc version 2."+E;s.readMask(A,C),Q.numValidPixel===Q.width*Q.height||C.pixels.resultMask||(C.pixels.resultMask=I.maskData);var e=Q.width*Q.height;C.pixels.resultPixels=new i(e*Q.numDims),C.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0};var t,o=!I.returnPixelInterleavedDims;if(0!==Q.numValidPixel)if(Q.zMax===Q.zMin)s.constructConstantSurface(C,o);else if(E>=4&&s.checkMinMaxRanges(A,C))s.constructConstantSurface(C,o);else{var a=new DataView(A,C.ptr,2),r=a.getUint8(0);if(C.ptr++,r)s.readDataOneSweep(A,C,i,o);else if(E>1&&Q.imageType<=1&&Math.abs(Q.maxZError-.5)<1e-5){var D=a.getUint8(1);if(C.ptr++,C.encodeMode=D,D>2||E<4&&D>1)throw"Invalid Huffman flag "+D;D?s.readHuffman(A,C,i,o):s.readTiles(A,C,i,o)}else s.readTiles(A,C,i,o)}C.eofOffset=C.ptr,I.inputOffset?(t=C.headerInfo.blobSize+I.inputOffset-C.ptr,Math.abs(t)>=1&&(C.eofOffset=I.inputOffset+C.headerInfo.blobSize)):(t=C.headerInfo.blobSize-C.ptr,Math.abs(t)>=1&&(C.eofOffset=C.headerInfo.blobSize));var n={width:Q.width,height:Q.height,pixelData:C.pixels.resultPixels,minValue:Q.zMin,maxValue:Q.zMax,validPixelCount:Q.numValidPixel,dimCount:Q.numDims,dimStats:{minValues:Q.minValues,maxValues:Q.maxValues},maskData:C.pixels.resultMask};if(C.pixels.resultMask&&s.isValidPixelValue(Q.imageType,g)){var h=C.pixels.resultMask;for(B=0;B<e;B++)h[B]||(n.pixelData[B]=g);n.noDataValue=g}return C.noDataValue=g,I.returnFileInfo&&(n.fileInfo=s.formatFileInfo(C)),n},getBandCount:function(A){for(var I=0,g=0,B={ptr:0,pixels:{}};g<A.byteLength-58;)s.readHeaderInfo(A,B),g+=B.headerInfo.blobSize,I++,B.ptr=g;return I}}),y=(D=new ArrayBuffer(4),n=new Uint8Array(D),new Uint32Array(D)[0]=1,1===n[0]),G={decode:function(A,I){if(!y)throw"Big endian system is not supported.";var g,B,C=(I=I||{}).inputOffset||0,Q=new Uint8Array(A,C,10),E=String.fromCharCode.apply(null,Q);if("CntZImage"===E.trim())g=h,B=1;else{if("Lerc2"!==E.substring(0,5))throw"Unexpected file identifier string: "+E;g=w,B=2}for(var i,e,t,o,a,s,r=0,D=A.byteLength-10,n=[],G={width:0,height:0,pixels:[],pixelType:I.pixelType,mask:null,statistics:[]},S=0;C<D;){var c=g.decode(A,{inputOffset:C,encodedMaskData:i,maskData:t,returnMask:0===r,returnEncodedMask:0===r,returnFileInfo:!0,returnPixelInterleavedDims:I.returnPixelInterleavedDims,pixelType:I.pixelType||null,noDataValue:I.noDataValue||null});C=c.fileInfo.eofOffset,t=c.maskData,0===r&&(i=c.encodedMaskData,G.width=c.width,G.height=c.height,G.dimCount=c.dimCount||1,G.pixelType=c.pixelType||c.fileInfo.pixelType,G.mask=t),B>1&&(t&&n.push(t),c.fileInfo.mask&&c.fileInfo.mask.numBytes>0&&S++),r++,G.pixels.push(c.pixelData),G.statistics.push({minValue:c.minValue,maxValue:c.maxValue,noDataValue:c.noDataValue,dimStats:c.dimStats})}if(B>1&&S>1){for(s=G.width*G.height,G.bandMasks=n,(t=new Uint8Array(s)).set(n[0]),o=1;o<n.length;o++)for(e=n[o],a=0;a<s;a++)t[a]=t[a]&e[a];G.maskData=t}return G}};Eg.exports?Eg.exports=G:this.Lerc=G}();var tg=eg.exports;let og,ag,sg;const rg={env:{emscripten_notify_memory_growth:A=>{sg=new Uint8Array(ag.exports.memory.buffer)}}};const Dg="AGFzbQEAAAABoAEUYAF/AGADf39/AGACf38AYAF/AX9gBX9/f39/AX9gA39/fwF/YAR/f39/AX9gAn9/AX9gAAF/YAd/f39/f39/AX9gB39/f39/f38AYAR/f39/AX5gAn9/AX5gBn9/f39/fwBgDn9/f39/f39/f39/f39/AX9gCH9/f39/f39/AX9gCX9/f39/f39/fwF/YAN+f38BfmAFf39/f38AYAAAAicBA2Vudh9lbXNjcmlwdGVuX25vdGlmeV9tZW1vcnlfZ3Jvd3RoAAADJyYDAAMACAQJBQEHBwADBgoLBAQDBAEABgUMBQ0OAQEBDxAREgYAEwQFAXABAgIFBwEBggKAgAIGCAF/AUGgnwQLB9MBCgZtZW1vcnkCAAxaU1REX2lzRXJyb3IADRlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplABkPWlNURF9kZWNvbXByZXNzACQGbWFsbG9jAAEEZnJlZQACGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAAQcZW1zY3JpcHRlbl9zdGFja19nZXRfY3VycmVudAAFIl9fY3hhX2luY3JlbWVudF9leGNlcHRpb25fcmVmY291bnQAJQkHAQBBAQsBJgwBCgqtkgMm1ScBC38jAEEQayIKJAACQAJAAkACQAJAAkACQAJAAkACQCAAQfQBTQRAQagbKAIAIgRBECAAQQtqQfgDcSAAQQtJGyIGQQN2IgB2IgFBA3EEQAJAIAFBf3NBAXEgAGoiAkEDdCIBQdAbaiIAIAFB2BtqKAIAIgEoAggiBUYEQEGoGyAEQX4gAndxNgIADAELIAUgADYCDCAAIAU2AggLIAFBCGohACABIAJBA3QiAkEDcjYCBCABIAJqIgEgASgCBEEBcjYCBAwLCyAGQbAbKAIAIghNDQEgAQRAAkBBAiAAdCICQQAgAmtyIAEgAHRxaCIBQQN0IgBB0BtqIgIgAEHYG2ooAgAiACgCCCIFRgRAQagbIARBfiABd3EiBDYCAAwBCyAFIAI2AgwgAiAFNgIICyAAIAZBA3I2AgQgACAGaiIHIAFBA3QiASAGayIFQQFyNgIEIAAgAWogBTYCACAIBEAgCEF4cUHQG2ohAUG8GygCACECAn8gBEEBIAhBA3Z0IgNxRQRAQagbIAMgBHI2AgAgAQwBCyABKAIICyEDIAEgAjYCCCADIAI2AgwgAiABNgIMIAIgAzYCCAsgAEEIaiEAQbwbIAc2AgBBsBsgBTYCAAwLC0GsGygCACILRQ0BIAtoQQJ0QdgdaigCACICKAIEQXhxIAZrIQMgAiEBA0ACQCABKAIQIgBFBEAgASgCFCIARQ0BCyAAKAIEQXhxIAZrIgEgAyABIANJIgEbIQMgACACIAEbIQIgACEBDAELCyACKAIYIQkgAiACKAIMIgBHBEAgAigCCCIBIAA2AgwgACABNgIIDAoLIAIoAhQiAQR/IAJBFGoFIAIoAhAiAUUNAyACQRBqCyEFA0AgBSEHIAEiAEEUaiEFIAAoAhQiAQ0AIABBEGohBSAAKAIQIgENAAsgB0EANgIADAkLQX8hBiAAQb9/Sw0AIABBC2oiAUF4cSEGQawbKAIAIgdFDQBBHyEIQQAgBmshAyAAQfT//wdNBEAgBkEmIAFBCHZnIgBrdkEBcSAAQQF0a0E+aiEICwJAAkACQCAIQQJ0QdgdaigCACIBRQRAQQAhAAwBC0EAIQAgBkEZIAhBAXZrQQAgCEEfRxt0IQIDQAJAIAEoAgRBeHEgBmsiBCADTw0AIAEhBSAEIgMNAEEAIQMgASEADAMLIAAgASgCFCIEIAQgASACQR12QQRxaigCECIBRhsgACAEGyEAIAJBAXQhAiABDQALCyAAIAVyRQRAQQAhBUECIAh0IgBBACAAa3IgB3EiAEUNAyAAaEECdEHYHWooAgAhAAsgAEUNAQsDQCAAKAIEQXhxIAZrIgIgA0khASACIAMgARshAyAAIAUgARshBSAAKAIQIgEEfyABBSAAKAIUCyIADQALCyAFRQ0AIANBsBsoAgAgBmtPDQAgBSgCGCEIIAUgBSgCDCIARwRAIAUoAggiASAANgIMIAAgATYCCAwICyAFKAIUIgEEfyAFQRRqBSAFKAIQIgFFDQMgBUEQagshAgNAIAIhBCABIgBBFGohAiAAKAIUIgENACAAQRBqIQIgACgCECIBDQALIARBADYCAAwHCyAGQbAbKAIAIgVNBEBBvBsoAgAhAAJAIAUgBmsiAUEQTwRAIAAgBmoiAiABQQFyNgIEIAAgBWogATYCACAAIAZBA3I2AgQMAQsgACAFQQNyNgIEIAAgBWoiASABKAIEQQFyNgIEQQAhAkEAIQELQbAbIAE2AgBBvBsgAjYCACAAQQhqIQAMCQsgBkG0GygCACICSQRAQbQbIAIgBmsiATYCAEHAG0HAGygCACIAIAZqIgI2AgAgAiABQQFyNgIEIAAgBkEDcjYCBCAAQQhqIQAMCQtBACEAIAZBL2oiAwJ/QYAfKAIABEBBiB8oAgAMAQtBjB9CfzcCAEGEH0KAoICAgIAENwIAQYAfIApBDGpBcHFB2KrVqgVzNgIAQZQfQQA2AgBB5B5BADYCAEGAIAsiAWoiBEEAIAFrIgdxIgEgBk0NCEHgHigCACIFBEBB2B4oAgAiCCABaiIJIAhNIAUgCUlyDQkLAkBB5B4tAABBBHFFBEACQAJAAkACQEHAGygCACIFBEBB6B4hAANAIAAoAgAiCCAFTQRAIAUgCCAAKAIEakkNAwsgACgCCCIADQALC0EAEAMiAkF/Rg0DIAEhBEGEHygCACIAQQFrIgUgAnEEQCABIAJrIAIgBWpBACAAa3FqIQQLIAQgBk0NA0HgHigCACIABEBB2B4oAgAiBSAEaiIHIAVNIAAgB0lyDQQLIAQQAyIAIAJHDQEMBQsgBCACayAHcSIEEAMiAiAAKAIAIAAoAgRqRg0BIAIhAAsgAEF/Rg0BIAZBMGogBE0EQCAAIQIMBAtBiB8oAgAiAiADIARrakEAIAJrcSICEANBf0YNASACIARqIQQgACECDAMLIAJBf0cNAgtB5B5B5B4oAgBBBHI2AgALIAEQAyICQX9GQQAQAyIAQX9GciAAIAJNcg0FIAAgAmsiBCAGQShqTQ0FC0HYHkHYHigCACAEaiIANgIAQdweKAIAIABJBEBB3B4gADYCAAsCQEHAGygCACIDBEBB6B4hAANAIAIgACgCACIBIAAoAgQiBWpGDQIgACgCCCIADQALDAQLQbgbKAIAIgBBACAAIAJNG0UEQEG4GyACNgIAC0EAIQBB7B4gBDYCAEHoHiACNgIAQcgbQX82AgBBzBtBgB8oAgA2AgBB9B5BADYCAANAIABBA3QiAUHYG2ogAUHQG2oiBTYCACABQdwbaiAFNgIAIABBAWoiAEEgRw0AC0G0GyAEQShrIgBBeCACa0EHcSIBayIFNgIAQcAbIAEgAmoiATYCACABIAVBAXI2AgQgACACakEoNgIEQcQbQZAfKAIANgIADAQLIAIgA00gASADS3INAiAAKAIMQQhxDQIgACAEIAVqNgIEQcAbIANBeCADa0EHcSIAaiIBNgIAQbQbQbQbKAIAIARqIgIgAGsiADYCACABIABBAXI2AgQgAiADakEoNgIEQcQbQZAfKAIANgIADAMLQQAhAAwGC0EAIQAMBAtBuBsoAgAgAksEQEG4GyACNgIACyACIARqIQVB6B4hAAJAA0AgBSAAKAIAIgFHBEAgACgCCCIADQEMAgsLIAAtAAxBCHFFDQMLQegeIQADQAJAIAAoAgAiASADTQRAIAMgASAAKAIEaiIFSQ0BCyAAKAIIIQAMAQsLQbQbIARBKGsiAEF4IAJrQQdxIgFrIgc2AgBBwBsgASACaiIBNgIAIAEgB0EBcjYCBCAAIAJqQSg2AgRBxBtBkB8oAgA2AgAgAyAFQScgBWtBB3FqQS9rIgAgACADQRBqSRsiAUEbNgIEIAFB8B4pAgA3AhAgAUHoHikCADcCCEHwHiABQQhqNgIAQeweIAQ2AgBB6B4gAjYCAEH0HkEANgIAIAFBGGohAANAIABBBzYCBCAAQQhqIQIgAEEEaiEAIAIgBUkNAAsgASADRg0AIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgACfyACQf8BTQRAIAJBeHFB0BtqIQACf0GoGygCACIBQQEgAkEDdnQiAnFFBEBBqBsgASACcjYCACAADAELIAAoAggLIQEgACADNgIIIAEgAzYCDEEMIQJBCAwBC0EfIQAgAkH///8HTQRAIAJBJiACQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAyAANgIcIANCADcCECAAQQJ0QdgdaiEBAkACQEGsGygCACIFQQEgAHQiBHFFBEBBrBsgBCAFcjYCACABIAM2AgAMAQsgAkEZIABBAXZrQQAgAEEfRxt0IQAgASgCACEFA0AgBSIBKAIEQXhxIAJGDQIgAEEddiEFIABBAXQhACABIAVBBHFqIgQoAhAiBQ0ACyAEIAM2AhALIAMgATYCGEEIIQIgAyIBIQBBDAwBCyABKAIIIgAgAzYCDCABIAM2AgggAyAANgIIQQAhAEEYIQJBDAsgA2ogATYCACACIANqIAA2AgALQbQbKAIAIgAgBk0NAEG0GyAAIAZrIgE2AgBBwBtBwBsoAgAiACAGaiICNgIAIAIgAUEBcjYCBCAAIAZBA3I2AgQgAEEIaiEADAQLQaQbQTA2AgBBACEADAMLIAAgAjYCACAAIAAoAgQgBGo2AgQgAkF4IAJrQQdxaiIIIAZBA3I2AgQgAUF4IAFrQQdxaiIEIAYgCGoiA2shBwJAQcAbKAIAIARGBEBBwBsgAzYCAEG0G0G0GygCACAHaiIANgIAIAMgAEEBcjYCBAwBC0G8GygCACAERgRAQbwbIAM2AgBBsBtBsBsoAgAgB2oiADYCACADIABBAXI2AgQgACADaiAANgIADAELIAQoAgQiAEEDcUEBRgRAIABBeHEhCSAEKAIMIQICQCAAQf8BTQRAIAQoAggiASACRgRAQagbQagbKAIAQX4gAEEDdndxNgIADAILIAEgAjYCDCACIAE2AggMAQsgBCgCGCEGAkAgAiAERwRAIAQoAggiACACNgIMIAIgADYCCAwBCwJAIAQoAhQiAAR/IARBFGoFIAQoAhAiAEUNASAEQRBqCyEBA0AgASEFIAAiAkEUaiEBIAAoAhQiAA0AIAJBEGohASACKAIQIgANAAsgBUEANgIADAELQQAhAgsgBkUNAAJAIAQoAhwiAEECdEHYHWoiASgCACAERgRAIAEgAjYCACACDQFBrBtBrBsoAgBBfiAAd3E2AgAMAgsCQCAEIAYoAhBGBEAgBiACNgIQDAELIAYgAjYCFAsgAkUNAQsgAiAGNgIYIAQoAhAiAARAIAIgADYCECAAIAI2AhgLIAQoAhQiAEUNACACIAA2AhQgACACNgIYCyAHIAlqIQcgBCAJaiIEKAIEIQALIAQgAEF+cTYCBCADIAdBAXI2AgQgAyAHaiAHNgIAIAdB/wFNBEAgB0F4cUHQG2ohAAJ/QagbKAIAIgFBASAHQQN2dCICcUUEQEGoGyABIAJyNgIAIAAMAQsgACgCCAshASAAIAM2AgggASADNgIMIAMgADYCDCADIAE2AggMAQtBHyECIAdB////B00EQCAHQSYgB0EIdmciAGt2QQFxIABBAXRrQT5qIQILIAMgAjYCHCADQgA3AhAgAkECdEHYHWohAAJAAkBBrBsoAgAiAUEBIAJ0IgVxRQRAQawbIAEgBXI2AgAgACADNgIADAELIAdBGSACQQF2a0EAIAJBH0cbdCECIAAoAgAhAQNAIAEiACgCBEF4cSAHRg0CIAJBHXYhASACQQF0IQIgACABQQRxaiIFKAIQIgENAAsgBSADNgIQCyADIAA2AhggAyADNgIMIAMgAzYCCAwBCyAAKAIIIgEgAzYCDCAAIAM2AgggA0EANgIYIAMgADYCDCADIAE2AggLIAhBCGohAAwCCwJAIAhFDQACQCAFKAIcIgFBAnRB2B1qIgIoAgAgBUYEQCACIAA2AgAgAA0BQawbIAdBfiABd3EiBzYCAAwCCwJAIAUgCCgCEEYEQCAIIAA2AhAMAQsgCCAANgIUCyAARQ0BCyAAIAg2AhggBSgCECIBBEAgACABNgIQIAEgADYCGAsgBSgCFCIBRQ0AIAAgATYCFCABIAA2AhgLAkAgA0EPTQRAIAUgAyAGaiIAQQNyNgIEIAAgBWoiACAAKAIEQQFyNgIEDAELIAUgBkEDcjYCBCAFIAZqIgQgA0EBcjYCBCADIARqIAM2AgAgA0H/AU0EQCADQXhxQdAbaiEAAn9BqBsoAgAiAUEBIANBA3Z0IgJxRQRAQagbIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgBDYCCCABIAQ2AgwgBCAANgIMIAQgATYCCAwBC0EfIQAgA0H///8HTQRAIANBJiADQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgBCAANgIcIARCADcCECAAQQJ0QdgdaiEBAkACQCAHQQEgAHQiAnFFBEBBrBsgAiAHcjYCACABIAQ2AgAgBCABNgIYDAELIANBGSAAQQF2a0EAIABBH0cbdCEAIAEoAgAhAQNAIAEiAigCBEF4cSADRg0CIABBHXYhASAAQQF0IQAgAiABQQRxaiIHKAIQIgENAAsgByAENgIQIAQgAjYCGAsgBCAENgIMIAQgBDYCCAwBCyACKAIIIgAgBDYCDCACIAQ2AgggBEEANgIYIAQgAjYCDCAEIAA2AggLIAVBCGohAAwBCwJAIAlFDQACQCACKAIcIgFBAnRB2B1qIgUoAgAgAkYEQCAFIAA2AgAgAA0BQawbIAtBfiABd3E2AgAMAgsCQCACIAkoAhBGBEAgCSAANgIQDAELIAkgADYCFAsgAEUNAQsgACAJNgIYIAIoAhAiAQRAIAAgATYCECABIAA2AhgLIAIoAhQiAUUNACAAIAE2AhQgASAANgIYCwJAIANBD00EQCACIAMgBmoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBCyACIAZBA3I2AgQgAiAGaiIFIANBAXI2AgQgAyAFaiADNgIAIAgEQCAIQXhxQdAbaiEAQbwbKAIAIQECf0EBIAhBA3Z0IgcgBHFFBEBBqBsgBCAHcjYCACAADAELIAAoAggLIQQgACABNgIIIAQgATYCDCABIAA2AgwgASAENgIIC0G8GyAFNgIAQbAbIAM2AgALIAJBCGohAAsgCkEQaiQAIAAL3AsBCH8CQCAARQ0AIABBCGsiAyAAQQRrKAIAIgJBeHEiAGohBQJAIAJBAXENACACQQJxRQ0BIAMgAygCACIEayIDQbgbKAIASQ0BIAAgBGohAAJAAkACQEG8GygCACADRwRAIAMoAgwhASAEQf8BTQRAIAEgAygCCCICRw0CQagbQagbKAIAQX4gBEEDdndxNgIADAULIAMoAhghByABIANHBEAgAygCCCICIAE2AgwgASACNgIIDAQLIAMoAhQiAgR/IANBFGoFIAMoAhAiAkUNAyADQRBqCyEEA0AgBCEGIAIiAUEUaiEEIAEoAhQiAg0AIAFBEGohBCABKAIQIgINAAsgBkEANgIADAMLIAUoAgQiAkEDcUEDRw0DQbAbIAA2AgAgBSACQX5xNgIEIAMgAEEBcjYCBCAFIAA2AgAPCyACIAE2AgwgASACNgIIDAILQQAhAQsgB0UNAAJAIAMoAhwiBEECdEHYHWoiAigCACADRgRAIAIgATYCACABDQFBrBtBrBsoAgBBfiAEd3E2AgAMAgsCQCADIAcoAhBGBEAgByABNgIQDAELIAcgATYCFAsgAUUNAQsgASAHNgIYIAMoAhAiAgRAIAEgAjYCECACIAE2AhgLIAMoAhQiAkUNACABIAI2AhQgAiABNgIYCyADIAVPDQAgBSgCBCIEQQFxRQ0AAkACQAJAAkAgBEECcUUEQEHAGygCACAFRgRAQcAbIAM2AgBBtBtBtBsoAgAgAGoiADYCACADIABBAXI2AgQgA0G8GygCAEcNBkGwG0EANgIAQbwbQQA2AgAPC0G8GygCACIHIAVGBEBBvBsgAzYCAEGwG0GwGygCACAAaiIANgIAIAMgAEEBcjYCBCAAIANqIAA2AgAPCyAEQXhxIABqIQAgBSgCDCEBIARB/wFNBEAgBSgCCCICIAFGBEBBqBtBqBsoAgBBfiAEQQN2d3E2AgAMBQsgAiABNgIMIAEgAjYCCAwECyAFKAIYIQggASAFRwRAIAUoAggiAiABNgIMIAEgAjYCCAwDCyAFKAIUIgIEfyAFQRRqBSAFKAIQIgJFDQIgBUEQagshBANAIAQhBiACIgFBFGohBCABKAIUIgINACABQRBqIQQgASgCECICDQALIAZBADYCAAwCCyAFIARBfnE2AgQgAyAAQQFyNgIEIAAgA2ogADYCAAwDC0EAIQELIAhFDQACQCAFKAIcIgRBAnRB2B1qIgIoAgAgBUYEQCACIAE2AgAgAQ0BQawbQawbKAIAQX4gBHdxNgIADAILAkAgBSAIKAIQRgRAIAggATYCEAwBCyAIIAE2AhQLIAFFDQELIAEgCDYCGCAFKAIQIgIEQCABIAI2AhAgAiABNgIYCyAFKAIUIgJFDQAgASACNgIUIAIgATYCGAsgAyAAQQFyNgIEIAAgA2ogADYCACADIAdHDQBBsBsgADYCAA8LIABB/wFNBEAgAEF4cUHQG2ohAgJ/QagbKAIAIgRBASAAQQN2dCIAcUUEQEGoGyAAIARyNgIAIAIMAQsgAigCCAshACACIAM2AgggACADNgIMIAMgAjYCDCADIAA2AggPC0EfIQEgAEH///8HTQRAIABBJiAAQQh2ZyICa3ZBAXEgAkEBdGtBPmohAQsgAyABNgIcIANCADcCECABQQJ0QdgdaiEEAn8CQAJ/QawbKAIAIgZBASABdCICcUUEQEGsGyACIAZyNgIAIAQgAzYCAEEYIQFBCAwBCyAAQRkgAUEBdmtBACABQR9HG3QhASAEKAIAIQQDQCAEIgIoAgRBeHEgAEYNAiABQR12IQQgAUEBdCEBIAIgBEEEcWoiBigCECIEDQALIAYgAzYCEEEYIQEgAiEEQQgLIQAgAyICDAELIAIoAggiBCADNgIMIAIgAzYCCEEYIQBBCCEBQQALIQYgASADaiAENgIAIAMgAjYCDCAAIANqIAY2AgBByBtByBsoAgBBAWsiAEF/IAAbNgIACwtsAQJ/QaAbKAIAIgEgAEEHakF4cSICaiEAAkAgAkEAIAAgAU0bRQRAIAA/AEEQdE0NASAAPwBBEHRrQf//A2pBEHZAAEF/RgR/QQAFQQAQAEEBCw0BC0GkG0EwNgIAQX8PC0GgGyAANgIAIAELBgAgACQACwQAIwALuQUBDH8jAEEQayIMJAACQCAEQQdNBEAgDEIANwMIIAQEQCAMQQhqIAMgBPwKAAALQWwgACABIAIgDEEIakEIEAYiACAAIARLGyAAIABBiX9JGyEFDAELIAEoAgBBAWoiDkEBdCIIBEAgAEEAIAj8CwALIAMoAAAiBUEPcSIHQQpLBEBBVCEFDAELIAIgB0EFajYCACADIARqIgJBBGshCCACQQdrIQ0gB0EGaiEPQQQhBiAFQQR2IQVBICAHdCIJQQFyIQpBACECQQEhByADIQQDQAJAIAdBAXFFBEADQCAFQX9zQYCAgIB4cmgiB0EYSUUEQCACQSRqIQIgBCANTQR/IARBA2oFIAQgDWtBA3QgBmpBH3EhBiAICyIEKAAAIAZ2IQUMAQsLIAYgB0EecSILakECaiEGIAdBAXZBA2wgAmogBSALdkEDcWoiAiAOTw0BAn8gBCANSyAGQQN2IARqIgUgCEtxRQRAIAZBB3EhBiAFDAELIAQgCGtBA3QgBmpBH3EhBiAICyIEKAAAIAZ2IQULIAUgCUEBa3EiByAJQQF0QQFrIgsgCmsiEEkEfyAPQQFrBSAFIAtxIgUgEEEAIAUgCU4bayEHIA8LIQUgACACQQF0aiAHQQFrIgs7AQAgAkEBaiECIAUgBmohBiAJQQEgB2sgCyAHQQBKGyAKaiIKSgRAIApBAkgNAUEgIApnIgVrIQ9BASAFQR9zdCEJCyACIA5PDQAgC0EARyEHAn8gBCANSyAGQQN1IARqIgUgCEtxRQRAIAZBB3EhBiAFDAELIAYgBCAIa0EDdGpBH3EhBiAICyIEKAAAIAZ2IQUMAQsLQWwhBSAKQQFHDQAgAiAOSwRAQVAhBQwBCyAGQSBKDQAgASACQQFrNgIAIAQgBkEHakEDdWogA2shBQsgDEEQaiQAIAULrRkCEX8BfiMAQTBrIgckAEG4fyEIAkAgBUUNACAELAAAIglB/wFxIQ0CQAJAIAlBAEgEQCANQf4Aa0EBdiIGIAVPDQMgDUH/AGsiCEH/AUsNAiAEQQFqIQRBACEFA0AgBSAITwRAIAYhDQwDBSAAIAVqIg0gBCAFQQF2aiIJLQAAQQR2OgAAIA0gCS0AAEEPcToAASAFQQJqIQUMAQsACwALIAUgDU0NAiAHQf8BNgIEIAYgB0EEaiAHQQhqIARBAWoiCiANEAYiBEGIf0sEQCAEIQgMAwtBVCEIIAcoAggiC0EGSw0CIAcoAgQiBUEBdCIMQQJqrUIBIAuthiIYQQQgC3QiCUEIaq18fEILfEL8//////////8Ag0LoAlYNAkFSIQggBUH/AUsNAkHoAiAJa60gBUEBaiIQQQF0rSAYfEIIfFQNAiANIARrIRQgBCAKaiEVIAwgBkGABGoiDCAJakEEaiIWakECaiERIAZBhARqIRcgBkGGBGohE0GAgAIgC3RBEHYhCEEAIQVBASEOQQEgC3QiCkEBayISIQQDQCAFIBBGRQRAAkAgBiAFQQF0Ig9qLwEAIglB//8DRgRAIBMgBEECdGogBToAACAEQQFrIQRBASEJDAELIA5BACAIIAnBShshDgsgDyAWaiAJOwEAIAVBAWohBQwBCwsgBiAOOwGCBCAGIAs7AYAEAkAgBCASRgRAQgAhGEEAIQlBACEIA0AgCSAQRgRAIApBA3YgCkEBdmpBA2oiBkEBdCEJQQAhBEEAIQgDQCAIIApPDQQgCCARaiEQQQAhBQNAIAVBAkZFBEAgEyAFIAZsIARqIBJxQQJ0aiAFIBBqLQAAOgAAIAVBAWohBQwBCwsgCEECaiEIIAQgCWogEnEhBAwACwAFIAYgCUEBdGouAQAhBCAIIBFqIg8gGDcAAEEIIQUDQCAEIAVMRQRAIAUgD2ogGDcAACAFQQhqIQUMAQsLIBhCgYKEiJCgwIABfCEYIAlBAWohCSAEIAhqIQgMAQsACwALIApBA3YgCkEBdmpBA2ohEUEAIQhBACEFA0AgCCAQRkUEQEEAIQkgBiAIQQF0ai4BACIPQQAgD0EAShshDwNAIAkgD0ZFBEAgEyAFQQJ0aiAIOgAAA0AgBSARaiAScSIFIARLDQALIAlBAWohCQwBCwsgCEEBaiEIDAELC0F/IQggBQ0DCyALQR9rIQhBACEFA0AgBSAKRkUEQCAWIBcgBUECdGoiBC0AAkEBdGoiBiAGLwEAIgZBAWo7AQAgBCAIIAZnaiIJOgADIAQgBiAJdCAKazsBACAFQQFqIQUMAQsLAkACQCAOQf//A3EEQCAHQRxqIgQgFSAUEAgiCEGIf0sNAiAHQRRqIAQgDBAJIAdBDGogBCAMEAkgBygCICIIQSBLDQECQCAHAn8gBygCJCIEIAcoAixPBEAgByAEIAhBA3ZrIgU2AiQgCEEHcQwBCyAEIAcoAigiBUYNASAHIAQgBCAFayAIQQN2IgYgBCAGayAFSRsiBGsiBTYCJCAIIARBA3RrCyIINgIgIAcgBSgAADYCHAtBACEFA0ACQAJAIAhBIU8EQCAHQbAaNgIkDAELIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgCEEDdmsiBDYCJEEBIQkgCEEHcQwBCyAEIAcoAigiBkYNASAHIAQgCEEDdiIJIAQgBmsgBCAJayAGTyIJGyIGayIENgIkIAggBkEDdGsLNgIgIAcgBCgAADYCHCAJRSAFQfsBS3INACAAIAVqIgggB0EUaiAHQRxqIgQQCjoAACAIIAdBDGogBBAKOgABAkAgBygCICIGQSFPBEAgB0GwGjYCJAwBCyAHKAIkIgQgBygCLE8EQCAHIAZBB3E2AiAgByAEIAZBA3ZrIgQ2AiQgByAEKAAANgIcDAMLIAQgBygCKCIJRg0AIAcgBiAEIAlrIAZBA3YiBiAEIAZrIgYgCUkbIgpBA3RrNgIgIAcgBCAKayIENgIkIAcgBCgAADYCHCAGIAlPDQILIAVBAnIhBQsgAEEBaiEMAn8CQANAQbp/IQggBUH9AUsNByAAIAVqIgogB0EUaiAHQRxqEAo6AAAgBSAMaiELIAcoAiAiBkEgSw0BAkAgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAGQQN2ayIENgIkIAZBB3EMAQsgBCAHKAIoIglGDQEgByAEIAQgCWsgBkEDdiIOIAQgDmsgCUkbIglrIgQ2AiQgBiAJQQN0aws2AiAgByAEKAAANgIcCyAFQf0BRg0HIAsgB0EMaiAHQRxqEAo6AAAgBUECaiEFIAcoAiAiBkEgTQRAIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgBkEDdmsiCDYCJCAGQQdxDAELIAQgBygCKCIIRg0CIAcgBCAEIAhrIAZBA3YiCSAEIAlrIAhJGyIEayIINgIkIAYgBEEDdGsLNgIgIAcgCCgAADYCHAwBCwsgB0GwGjYCJCAAIAVqIAdBFGogB0EcahAKOgAAIApBA2oMAQsgB0GwGjYCJCALIAdBDGogB0EcahAKOgAAIApBAmoLIABrIQgMBAsgCCAHQRRqIAdBHGoiBBAKOgACIAggB0EMaiAEEAo6AAMgBUEEaiEFIAcoAiAhCAwACwALIAdBHGoiBCAVIBQQCCIIQYh/Sw0BIAdBFGogBCAMEAkgB0EMaiAEIAwQCSAHKAIgIghBIEsNAAJAIAcCfyAHKAIkIgQgBygCLE8EQCAHIAQgCEEDdmsiBTYCJCAIQQdxDAELIAQgBygCKCIFRg0BIAcgBCAEIAVrIAhBA3YiBiAEIAZrIAVJGyIEayIFNgIkIAggBEEDdGsLIgg2AiAgByAFKAAANgIcC0EAIQUDQAJAAkAgCEEhTwRAIAdBsBo2AiQMAQsgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAIQQN2ayIENgIkQQEhCSAIQQdxDAELIAQgBygCKCIGRg0BIAcgBCAIQQN2IgkgBCAGayAEIAlrIAZPIgkbIgZrIgQ2AiQgCCAGQQN0aws2AiAgByAEKAAANgIcIAlFIAVB+wFLcg0AIAAgBWoiCCAHQRRqIAdBHGoiBBALOgAAIAggB0EMaiAEEAs6AAECQCAHKAIgIgZBIU8EQCAHQbAaNgIkDAELIAcoAiQiBCAHKAIsTwRAIAcgBkEHcTYCICAHIAQgBkEDdmsiBDYCJCAHIAQoAAA2AhwMAwsgBCAHKAIoIglGDQAgByAGIAQgCWsgBkEDdiIGIAQgBmsiBiAJSRsiCkEDdGs2AiAgByAEIAprIgQ2AiQgByAEKAAANgIcIAYgCU8NAgsgBUECciEFCyAAQQFqIQwCfwJAA0BBun8hCCAFQf0BSw0GIAAgBWoiCiAHQRRqIAdBHGoQCzoAACAFIAxqIQsgBygCICIGQSBLDQECQCAHAn8gBygCJCIEIAcoAixPBEAgByAEIAZBA3ZrIgQ2AiQgBkEHcQwBCyAEIAcoAigiCUYNASAHIAQgBCAJayAGQQN2Ig4gBCAOayAJSRsiCWsiBDYCJCAGIAlBA3RrCzYCICAHIAQoAAA2AhwLIAVB/QFGDQYgCyAHQQxqIAdBHGoQCzoAACAFQQJqIQUgBygCICIGQSBNBEAgBwJ/IAcoAiQiBCAHKAIsTwRAIAcgBCAGQQN2ayIINgIkIAZBB3EMAQsgBCAHKAIoIghGDQIgByAEIAQgCGsgBkEDdiIJIAQgCWsgCEkbIgRrIgg2AiQgBiAEQQN0aws2AiAgByAIKAAANgIcDAELCyAHQbAaNgIkIAAgBWogB0EUaiAHQRxqEAs6AAAgCkEDagwBCyAHQbAaNgIkIAsgB0EMaiAHQRxqEAs6AAAgCkECagsgAGshCAwDCyAIIAdBFGogB0EcaiIEEAs6AAIgCCAHQQxqIAQQCzoAAyAFQQRqIQUgBygCICEIDAALAAtBbCEICyAIQYh/Sw0CC0EAIQUgAUEAQTT8CwAgCCEGQQAhBANAIAUgBkcEQCAAIAVqIggtAAAiCUEMSw0CIAEgCUECdGoiCSAJKAIAQQFqNgIAIAVBAWohBUEBIAgtAAB0QQF1IARqIQQMAQsLQWwhCCAERQ0BIARnIgVBHHNBC0sNASADQSAgBWsiAzYCAEGAgICAeEEBIAN0IARrIgNnIgR2IANHDQEgACAGakEgIARrIgA6AAAgASAAQQJ0aiIAIAAoAgBBAWo2AgAgASgCBCIAQQJJIABBAXFyDQEgAiAGQQFqNgIAIA1BAWohCAwBC0FsIQgLIAdBMGokACAIC/UBAQF/IAJFBEAgAEIANwIAIABBADYCECAAQgA3AghBuH8PCyAAIAE2AgwgACABQQRqNgIQIAJBBE8EQCAAIAEgAmoiAUEEayIDNgIIIAAgAygAADYCACABQQFrLQAAIgEEQCAAQQggAWdBH3NrNgIEIAIPCyAAQQA2AgRBfw8LIAAgATYCCCAAIAEtAAAiAzYCAAJAAkACQCACQQJrDgIBAAILIAAgAS0AAkEQdCADciIDNgIACyAAIAEtAAFBCHQgA2o2AgALIAEgAmpBAWstAAAiAUUEQCAAQQA2AgRBbA8LIAAgAWcgAkEDdGtBCWo2AgQgAguuAQEEfyABIAIvAQAiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQRqNgIEC0wBBH8gACgCBCAAKAIAQQJ0aiICLQACIQMgAi8BACEEIAEgASgCBCIFIAItAAMiAmo2AgQgACAEIAEoAgAgBXRBACACa3ZqNgIAIAMLVgEEfyAAKAIEIAAoAgBBAnRqIgItAAIhAyACLwEAIQQgASACLQADIgIgASgCBGoiBTYCBCAAIAQgAkECdEGwGWooAgAgASgCAEEAIAVrdnFqNgIAIAMLLwEBfyAAIAAoAgQiAUEHcTYCBCAAIAAoAgggAUEDdmsiATYCCCAAIAEoAAA2AgALCAAgAEGIf0sLxQkCDX8CfiMAQRBrIgskACALQQA2AgwgC0EANgIIAn8CQCADQdQJaiIFIAMgC0EIaiALQQxqIAEgAiADQegAahAHIhBBiH9LDQAgCygCCCEIQQogACgCACIJQf8BcSIHIAdBCk8bQQFqIgQgCygCDCIBTwRAAkAgASAETw0AIAQgAWshAkEAIQEDQCABIAhGBEAgBCEBA0AgASACTQRAA0AgAkUNBSADIAJBAnRqQQA2AgAgAkEBayECDAALAAUgAyABQQJ0aiADIAEgAmtBAnRqKAIANgIAIAFBAWshAQwBCwALAAUgASAFaiIKIAJBACAKLQAAIgobIApqOgAAIAFBAWohAQwBCwALAAsgBCEBC0FUIAEgB0EBaksNARogAEEEaiEKIAAgCUH/gYB4cSABQRB0QYCA/AdxcjYCACABQQFqIQ4gA0E0aiEEQQAhAUEAIQIDQCACIA5GRQRAIAMgAkECdCIAaigCACEHIAAgBGogATYCACACQQFqIQIgASAHaiEBDAELCyADQdQHaiEHIAhBA2shAUEAIQADQAJAQQAhAiAAIAFOBEADQCAAIAhODQIgBCAAIAVqLQAAQQJ0aiIBIAEoAgAiAUEBajYCACABIAdqIAA6AAAgAEEBaiEADAALAAUDQCACQQRGRQRAIAQgBSAAIAJyIglqLQAAQQJ0aiIMIAwoAgAiDEEBajYCACAHIAxqIAk6AAAgAkEBaiECDAELCyAAQQRqIQAMAgsACwsgAygCACEIQQAhAEEBIQkDQCAJIA5GDQEgDiAJayEEIAMgCUECdGooAgAhBQJAAkACQAJAAkACQEEBIAl0QQF1IgxBAWsOCAABBAIEBAQDBAtBACECIAVBACAFQQBKGyEGIAAhAQNAIAIgBkYNBSAKIAFBAXRqIg0gByACIAhqai0AADoAASANIAQ6AAAgAkEBaiECIAFBAWohAQwACwALQQAhAiAFQQAgBUEAShshDSAAIQEDQCACIA1GDQQgCiABQQF0aiIGIAcgAiAIamotAAAiDzoAAyAGIAQ6AAIgBiAPOgABIAYgBDoAACACQQFqIQIgAUECaiEBDAALAAtBACECIAVBACAFQQBKGyEGIARB/wFxrSERIAAhAQNAIAIgBkYNAyAKIAFBAXRqIAcgAiAIamoxAABCCIYgEYRCgYCEgJCAwAB+NwAAIAJBAWohAiABQQRqIQEMAAsAC0EAIQIgBUEAIAVBAEobIQYgBEH/AXGtIREgACEBA0AgAiAGRg0CIAogAUEBdGoiBCAHIAIgCGpqMQAAQgiGIBGEQoGAhICQgMAAfiISNwAIIAQgEjcAACACQQFqIQIgAUEIaiEBDAALAAtBACEBIAVBACAFQQBKGyENIARB/wFxrSESIAAhBANAIAEgDUYNASAKIARBAXRqIQ8gByABIAhqajEAAEIIhiAShEKBgISAkIDAAH4hEUEAIQIDQCACIAxORQRAIA8gAkEBdGoiBiARNwAYIAYgETcAECAGIBE3AAggBiARNwAAIAJBEGohAgwBCwsgAUEBaiEBIAQgDGohBAwACwALIAlBAWohCSAFIAhqIQggBSAMbCAAaiEADAALAAsgEAshAiALQRBqJAAgAgufAwIBfgF/AkACQAJAAkACQAJAQQEgBCADa3QiCEEBaw4IAAEEAgQEBAMECyAGQRh0IANBEHRqIQMDQCABIAJGDQUgACABLQAAIgQgBEEIdCAFciAGQQFGGyADcjYBACABQQFqIQEgAEEEaiEADAALAAsgBkEYdCADQRB0aiEDA0AgASACRg0EIAAgAS0AACIEIARBCHQgBXIgBkEBRhsgA3IiBDYBBCAAIAQ2AQAgAUEBaiEBIABBCGohAAwACwALA0AgASACRg0DIAAgAS0AACADIAUgBhAQIgc3AQggACAHNwEAIAFBAWohASAAQRBqIQAMAAsACwNAIAEgAkYNAiAAIAEtAAAgAyAFIAYQECIHNwEYIAAgBzcBECAAIAc3AQggACAHNwEAIAFBAWohASAAQSBqIQAMAAsACwNAIAEgAkYNASAAIAhBAnRqIQQgAS0AACADIAUgBhAQIQcDQCAAIARGRQRAIAAgBzcBGCAAIAc3ARAgACAHNwEIIAAgBzcBACAAQSBqIQAMAQsLIAFBAWohASAEIQAMAAsACwsmACADQRh0IAFBEHRqIAAgAEEIdCACciADQQFGG3KtQoGAgIAQfgu7BgEKfyMAQSBrIgUkACAELwECIQsgBUEMaiACIAMQCCIDQYh/TQRAIARBBGohCCAAIAFqIQkCQAJAAkAgAUEETwRAIAlBA2shDUEAIAtrQR9xIQwgBSgCFCEDIAUoAhghByAFKAIcIQ4gBSgCDCEGIAUoAhAhBANAIARBIEsEQEGwGiEDDAQLAkAgAyAOTwRAIARBB3EhAiAEQQN2IQZBASEEDAELIAMgB0YNBCAEIARBA3YiAiADIAdrIAMgAmsgB08iBBsiBkEDdGshAgsgAyAGayIDKAAAIQYgBEUgACANT3INAiAIIAYgAnQgDHZBAXRqIgQtAAAhCiAAIAQtAAE6AAAgCCAGIAIgCmoiAnQgDHZBAXRqIgQtAAAhCiAAIAQtAAE6AAEgAiAKaiEEIABBAmohAAwACwALIAUoAhAiBEEhTwRAIAVBsBo2AhQMAwsgBSgCFCIDIAUoAhxPBEAgBSAEQQdxIgI2AhAgBSADIARBA3ZrIgM2AhQgBSADKAAANgIMIAIhBAwDCyADIAUoAhgiAkYNAiAFIAQgAyACayAEQQN2IgQgAyAEayACSRsiAkEDdGsiBDYCECAFIAMgAmsiAjYCFCAFIAIoAAA2AgwMAgsgAiEECyAFIAQ2AhAgBSADNgIUIAUgBjYCDAtBACALa0EfcSEHA0ACQCAEQSFPBEAgBUGwGjYCFAwBCyAFAn8gBSgCFCICIAUoAhxPBEAgBSACIARBA3ZrIgM2AhRBASEGIARBB3EMAQsgAiAFKAIYIgNGDQEgBSACIARBA3YiBiACIANrIAIgBmsgA08iBhsiAmsiAzYCFCAEIAJBA3RrCyIENgIQIAUgAygAACICNgIMIAZFIAAgCU9yDQAgCCACIAR0IAd2QQF0aiICLQABIQMgBSAEIAItAABqNgIQIAAgAzoAACAAQQFqIQAgBSgCECEEDAELCwNAIAAgCU9FBEAgCCAFKAIMIAUoAhAiAnQgB3ZBAXRqIgMtAAEhBCAFIAIgAy0AAGo2AhAgACAEOgAAIABBAWohAAwBCwtBbEFsIAEgBSgCEEEgRxsgBSgCFCAFKAIYRxshAwsgBUEgaiQAIAML/SEBGX8jAEHQAGsiBSQAQWwhBgJAIAFBBkkgA0EKSXINAAJAIAMgAi8ABCIHIAIvAAAiCiACLwACIglqakEGaiILSQ0AIAAgAUEDakECdiIMaiIIIAxqIg0gDGoiDCAAIAFqIhFLDQAgBC8BAiEOIAVBPGogAkEGaiICIAoQCCIGQYh/Sw0BIAVBKGogAiAKaiICIAkQCCIGQYh/Sw0BIAVBFGogAiAJaiICIAcQCCIGQYh/Sw0BIAUgAiAHaiADIAtrEAgiBkGIf0sNASAEQQRqIQogEUEDayESAkAgESAMa0EESQRAIAwhAyANIQIgCCEEDAELQQAgDmtBH3EhBkEAIQkgDCEDIA0hAiAIIQQDQCAJQQFxIAMgEk9yDQEgACAKIAUoAjwiCSAFKAJAIgt0IAZ2QQJ0aiIHLwEAOwAAIActAAIhECAHLQADIQ8gBCAKIAUoAigiEyAFKAIsIhR0IAZ2QQJ0aiIHLwEAOwAAIActAAIhFSAHLQADIRYgAiAKIAUoAhQiFyAFKAIYIhh0IAZ2QQJ0aiIHLwEAOwAAIActAAIhGSAHLQADIRogAyAKIAUoAgAiGyAFKAIEIhx0IAZ2QQJ0aiIHLwEAOwAAIActAAIhHSAHLQADIQcgACAPaiIPIAogCSALIBBqIgl0IAZ2QQJ0aiIALwEAOwAAIAUgCSAALQACajYCQCAALQADIQkgBCAWaiIEIAogEyAUIBVqIgt0IAZ2QQJ0aiIALwEAOwAAIAUgCyAALQACajYCLCAALQADIQsgAiAaaiICIAogFyAYIBlqIhB0IAZ2QQJ0aiIALwEAOwAAIAUgECAALQACajYCGCAALQADIRAgAyAHaiIHIAogGyAcIB1qIgB0IAZ2QQJ0aiIDLwEAOwAAIAUgACADLQACajYCBCAJIA9qIQAgBCALaiEEIAIgEGohAiAHIAMtAANqIQMgBUE8ahATIAVBKGoQE3IgBUEUahATciAFEBNyQQBHIQkMAAsACyAAIAhLIAQgDUtyDQBBbCEGIAIgDEsNAQJAAkAgCCAAayIJQQRPBEAgCEEDayEQQQAgDmtBH3EhCyAFKAJAIQYDQCAGQSFPBEAgBUGwGjYCRAwDCyAFAn8gBSgCRCIHIAUoAkxPBEAgBSAHIAZBA3ZrIgk2AkRBASEHIAZBB3EMAQsgByAFKAJIIglGDQMgBSAHIAZBA3YiDyAHIAlrIAcgD2sgCU8iBxsiD2siCTYCRCAGIA9BA3RrCyIGNgJAIAUgCSgAACIJNgI8IAdFIAAgEE9yDQIgACAKIAkgBnQgC3ZBAnRqIgYvAQA7AAAgBSAFKAJAIAYtAAJqIgc2AkAgACAGLQADaiIJIAogBSgCPCAHdCALdkECdGoiAC8BADsAACAFIAUoAkAgAC0AAmoiBjYCQCAJIAAtAANqIQAMAAsACyAFKAJAIgZBIU8EQCAFQbAaNgJEDAILIAUoAkQiCyAFKAJMTwRAIAUgBkEHcSIHNgJAIAUgCyAGQQN2ayIGNgJEIAUgBigAADYCPCAHIQYMAgsgCyAFKAJIIgdGDQEgBSAGIAsgB2sgBkEDdiIGIAsgBmsgB0kbIgdBA3RrIgY2AkAgBSALIAdrIgc2AkQgBSAHKAAANgI8DAELIAggAGshCQsCQCAJQQJJDQAgCEECayELQQAgDmtBH3EhEANAAkAgBkEhTwRAIAVBsBo2AkQMAQsgBQJ/IAUoAkQiByAFKAJMTwRAIAUgByAGQQN2ayIJNgJEQQEhByAGQQdxDAELIAcgBSgCSCIJRg0BIAUgByAGQQN2Ig8gByAJayAHIA9rIAlPIgcbIg9rIgk2AkQgBiAPQQN0awsiBjYCQCAFIAkoAAAiCTYCPCAHRSAAIAtLcg0AIAAgCiAJIAZ0IBB2QQJ0aiIHLwEAOwAAIAUgBSgCQCAHLQACaiIGNgJAIAAgBy0AA2ohAAwBCwsDQCAAIAtLDQEgACAKIAUoAjwgBnQgEHZBAnRqIgcvAQA7AAAgBSAFKAJAIActAAJqIgY2AkAgACAHLQADaiEADAALAAsCQCAAIAhPDQAgACAKIAUoAjwgBnRBACAOa3ZBAnRqIgAtAAA6AAAgBQJ/IAAtAANBAUYEQCAFKAJAIAAtAAJqDAELIAUoAkAiCEEfSw0BQSAgCCAALQACaiIAIABBIE8bCzYCQAsCQAJAIA0gBGsiBkEETwRAIA1BA2shCUEAIA5rQR9xIQcgBSgCLCEAA0AgAEEhTwRAIAVBsBo2AjAMAwsgBQJ/IAUoAjAiCCAFKAI4TwRAIAUgCCAAQQN2ayIGNgIwQQEhCCAAQQdxDAELIAggBSgCNCIGRg0DIAUgCCAAQQN2IgsgCCAGayAIIAtrIAZPIggbIgtrIgY2AjAgACALQQN0awsiADYCLCAFIAYoAAAiBjYCKCAIRSAEIAlPcg0CIAQgCiAGIAB0IAd2QQJ0aiIALwEAOwAAIAUgBSgCLCAALQACaiIINgIsIAQgAC0AA2oiBiAKIAUoAiggCHQgB3ZBAnRqIgQvAQA7AAAgBSAFKAIsIAQtAAJqIgA2AiwgBiAELQADaiEEDAALAAsgBSgCLCIAQSFPBEAgBUGwGjYCMAwCCyAFKAIwIgcgBSgCOE8EQCAFIABBB3EiCDYCLCAFIAcgAEEDdmsiADYCMCAFIAAoAAA2AiggCCEADAILIAcgBSgCNCIIRg0BIAUgACAHIAhrIABBA3YiACAHIABrIAhJGyIIQQN0ayIANgIsIAUgByAIayIINgIwIAUgCCgAADYCKAwBCyANIARrIQYLAkAgBkECSQ0AIA1BAmshCUEAIA5rQR9xIQsDQAJAIABBIU8EQCAFQbAaNgIwDAELIAUCfyAFKAIwIgggBSgCOE8EQCAFIAggAEEDdmsiBjYCMEEBIQcgAEEHcQwBCyAIIAUoAjQiBkYNASAFIAggAEEDdiIHIAggBmsgCCAHayAGTyIHGyIIayIGNgIwIAAgCEEDdGsLIgA2AiwgBSAGKAAAIgg2AiggB0UgBCAJS3INACAEIAogCCAAdCALdkECdGoiCC8BADsAACAFIAUoAiwgCC0AAmoiADYCLCAEIAgtAANqIQQMAQsLA0AgBCAJSw0BIAQgCiAFKAIoIAB0IAt2QQJ0aiIILwEAOwAAIAUgBSgCLCAILQACaiIANgIsIAQgCC0AA2ohBAwACwALAkAgBCANTw0AIAQgCiAFKAIoIAB0QQAgDmt2QQJ0aiIALQAAOgAAIAUCfyAALQADQQFGBEAgBSgCLCAALQACagwBCyAFKAIsIgRBH0sNAUEgIAQgAC0AAmoiACAAQSBPGws2AiwLAkACQCAMIAJrIgZBBE8EQCAMQQNrIQdBACAOa0EfcSEIIAUoAhghAANAIABBIU8EQCAFQbAaNgIcDAMLIAUCfyAFKAIcIgQgBSgCJE8EQCAFIAQgAEEDdmsiBjYCHEEBIQkgAEEHcQwBCyAEIAUoAiAiDUYNAyAFIAQgAEEDdiIGIAQgDWsgBCAGayANTyIJGyIEayIGNgIcIAAgBEEDdGsLIgA2AhggBSAGKAAAIgQ2AhQgCUUgAiAHT3INAiACIAogBCAAdCAIdkECdGoiAC8BADsAACAFIAUoAhggAC0AAmoiBDYCGCACIAAtAANqIg0gCiAFKAIUIAR0IAh2QQJ0aiICLwEAOwAAIAUgBSgCGCACLQACaiIANgIYIA0gAi0AA2ohAgwACwALIAUoAhgiAEEhTwRAIAVBsBo2AhwMAgsgBSgCHCIIIAUoAiRPBEAgBSAAQQdxIgQ2AhggBSAIIABBA3ZrIgA2AhwgBSAAKAAANgIUIAQhAAwCCyAIIAUoAiAiBEYNASAFIAAgCCAEayAAQQN2IgAgCCAAayAESRsiBEEDdGsiADYCGCAFIAggBGsiBDYCHCAFIAQoAAA2AhQMAQsgDCACayEGCwJAIAZBAkkNACAMQQJrIQ1BACAOa0EfcSEHA0ACQCAAQSFPBEAgBUGwGjYCHAwBCyAFAn8gBSgCHCIEIAUoAiRPBEAgBSAEIABBA3ZrIgY2AhxBASEIIABBB3EMAQsgBCAFKAIgIghGDQEgBSAEIABBA3YiBiAEIAhrIAQgBmsgCE8iCBsiBGsiBjYCHCAAIARBA3RrCyIANgIYIAUgBigAACIENgIUIAhFIAIgDUtyDQAgAiAKIAQgAHQgB3ZBAnRqIgQvAQA7AAAgBSAFKAIYIAQtAAJqIgA2AhggAiAELQADaiECDAELCwNAIAIgDUsNASACIAogBSgCFCAAdCAHdkECdGoiBC8BADsAACAFIAUoAhggBC0AAmoiADYCGCACIAQtAANqIQIMAAsACwJAIAIgDE8NACACIAogBSgCFCAAdEEAIA5rdkECdGoiAC0AADoAACAFAn8gAC0AA0EBRgRAIAUoAhggAC0AAmoMAQsgBSgCGCICQR9LDQFBICACIAAtAAJqIgAgAEEgTxsLNgIYCwJAIBEgA2tBBE8EQEEAIA5rQR9xIQQgBSgCBCEAA0AgAEEhTwRAIAVBsBo2AggMAwsgBQJ/IAUoAggiAiAFKAIQTwRAIAUgAiAAQQN2ayIGNgIIQQEhAiAAQQdxDAELIAIgBSgCDCIMRg0DIAUgAiAAQQN2IgggAiAMayACIAhrIAxPIgIbIgxrIgY2AgggACAMQQN0awsiADYCBCAFIAYoAAAiDDYCACACRSADIBJPcg0CIAMgCiAMIAB0IAR2QQJ0aiIALwEAOwAAIAUgBSgCBCAALQACaiICNgIEIAMgAC0AA2oiAyAKIAUoAgAgAnQgBHZBAnRqIgIvAQA7AAAgBSAFKAIEIAItAAJqIgA2AgQgAyACLQADaiEDDAALAAsgBSgCBCIAQSFPBEAgBUGwGjYCCAwBCyAFKAIIIgQgBSgCEE8EQCAFIABBB3EiAjYCBCAFIAQgAEEDdmsiADYCCCAFIAAoAAA2AgAgAiEADAELIAQgBSgCDCICRg0AIAUgACAEIAJrIABBA3YiACAEIABrIAJJGyICQQN0ayIANgIEIAUgBCACayICNgIIIAUgAigAADYCAAsCQCARIANrQQJJDQAgEUECayEEQQAgDmtBH3EhDANAAkAgAEEhTwRAIAVBsBo2AggMAQsgBQJ/IAUoAggiAiAFKAIQTwRAIAUgAiAAQQN2ayIGNgIIQQEhCSAAQQdxDAELIAIgBSgCDCIIRg0BIAUgAiAAQQN2Ig0gAiAIayACIA1rIAhPIgkbIgJrIgY2AgggACACQQN0awsiADYCBCAFIAYoAAAiAjYCACAJRSADIARLcg0AIAMgCiACIAB0IAx2QQJ0aiICLwEAOwAAIAUgBSgCBCACLQACaiIANgIEIAMgAi0AA2ohAwwBCwsDQCADIARLDQEgAyAKIAUoAgAgAHQgDHZBAnRqIgIvAQA7AAAgBSAFKAIEIAItAAJqIgA2AgQgAyACLQADaiEDDAALAAsCQCADIBFPDQAgAyAKIAUoAgAgAHRBACAOa3ZBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAUoAgQgAi0AAmohAAwBCyAFKAIEIgBBH0sNAEEgIAAgAi0AAmoiACAAQSBPGyEAC0FsQWxBbEFsQWxBbEFsQWwgASAAQSBHGyAFKAIIIAUoAgxHGyAFKAIYQSBHGyAFKAIcIAUoAiBHGyAFKAIsQSBHGyAFKAIwIAUoAjRHGyAFKAJAQSBHGyAFKAJEIAUoAkhHGyEGDAELQWwhBgsgBUHQAGokACAGCxkAIAAoAgggACgCEEkEQEEDDwsgABAMQQAL8xwBFn8jAEHQAGsiBSQAQWwhCAJAIAFBBkkgA0EKSXINAAJAIAMgAi8ABCIGIAIvAAAiCiACLwACIglqakEGaiISSQ0AIAAgAUEDakECdiILaiIHIAtqIg4gC2oiCyAAIAFqIg9LDQAgBC8BAiEMIAVBPGogAkEGaiICIAoQCCIIQYh/Sw0BIAVBKGogAiAKaiICIAkQCCIIQYh/Sw0BIAVBFGogAiAJaiICIAYQCCIIQYh/Sw0BIAUgAiAGaiADIBJrEAgiCEGIf0sNASAEQQRqIQogD0EDayESAkAgDyALa0EESQRAIAshAyAOIQIgByEEDAELQQAgDGtBH3EhCEEAIQYgCyEDIA4hAiAHIQQDQCAGQQFxIAMgEk9yDQEgCiAFKAI8IgYgBSgCQCIJdCAIdkEBdGoiDS0AACEQIAAgDS0AAToAACAKIAUoAigiDSAFKAIsIhF0IAh2QQF0aiITLQAAIRUgBCATLQABOgAAIAogBSgCFCITIAUoAhgiFnQgCHZBAXRqIhQtAAAhFyACIBQtAAE6AAAgCiAFKAIAIhQgBSgCBCIYdCAIdkEBdGoiGS0AACEaIAMgGS0AAToAACAKIAYgCSAQaiIGdCAIdkEBdGoiCS0AASEQIAUgBiAJLQAAajYCQCAAIBA6AAEgCiANIBEgFWoiBnQgCHZBAXRqIgktAAEhDSAFIAYgCS0AAGo2AiwgBCANOgABIAogEyAWIBdqIgZ0IAh2QQF0aiIJLQABIQ0gBSAGIAktAABqNgIYIAIgDToAASAKIBQgGCAaaiIGdCAIdkEBdGoiCS0AASENIAUgBiAJLQAAajYCBCADIA06AAEgA0ECaiEDIAJBAmohAiAEQQJqIQQgAEECaiEAIAVBPGoQEyAFQShqEBNyIAVBFGoQE3IgBRATckEARyEGDAALAAsgACAHSyAEIA5Lcg0AQWwhCCACIAtLDQECQCAHIABrQQROBEAgB0EDayEQQQAgDGtBH3EhDQNAIAUoAkAiBkEhTwRAIAVBsBo2AkQMAwsgBQJ/IAUoAkQiCCAFKAJMTwRAIAUgCCAGQQN2ayIINgJEQQEhCSAGQQdxDAELIAggBSgCSCIJRg0DIAUgCCAGQQN2IhEgCCAJayAIIBFrIAlPIgkbIhFrIgg2AkQgBiARQQN0awsiBjYCQCAFIAgoAAAiCDYCPCAJRSAAIBBPcg0CIAogCCAGdCANdkEBdGoiCC0AASEJIAUgBiAILQAAajYCQCAAIAk6AAAgCiAFKAI8IAUoAkAiBnQgDXZBAXRqIggtAAEhCSAFIAYgCC0AAGo2AkAgACAJOgABIABBAmohAAwACwALIAUoAkAiBkEhTwRAIAVBsBo2AkQMAQsgBSgCRCIJIAUoAkxPBEAgBSAGQQdxIgg2AkAgBSAJIAZBA3ZrIgY2AkQgBSAGKAAANgI8IAghBgwBCyAJIAUoAkgiCEYNACAFIAYgCSAIayAGQQN2IgYgCSAGayAISRsiCEEDdGsiBjYCQCAFIAkgCGsiCDYCRCAFIAgoAAA2AjwLQQAgDGtBH3EhCANAAkAgBkEhTwRAIAVBsBo2AkQMAQsgBQJ/IAUoAkQiCSAFKAJMTwRAIAUgCSAGQQN2ayIMNgJEQQEhCSAGQQdxDAELIAkgBSgCSCIMRg0BIAUgCSAGQQN2Ig0gCSAMayAJIA1rIAxPIgkbIg1rIgw2AkQgBiANQQN0awsiBjYCQCAFIAwoAAAiDDYCPCAJRSAAIAdPcg0AIAogDCAGdCAIdkEBdGoiCS0AASEMIAUgBiAJLQAAajYCQCAAIAw6AAAgAEEBaiEAIAUoAkAhBgwBCwsDQCAAIAdPRQRAIAogBSgCPCAFKAJAIgZ0IAh2QQF0aiIJLQABIQwgBSAGIAktAABqNgJAIAAgDDoAACAAQQFqIQAMAQsLAkAgDiAEa0EETgRAIA5BA2shCQNAIAUoAiwiAEEhTwRAIAVBsBo2AjAMAwsgBQJ/IAUoAjAiByAFKAI4TwRAIAUgByAAQQN2ayIGNgIwQQEhByAAQQdxDAELIAcgBSgCNCIGRg0DIAUgByAAQQN2IgwgByAGayAHIAxrIAZPIgcbIgxrIgY2AjAgACAMQQN0awsiADYCLCAFIAYoAAAiBjYCKCAHRSAEIAlPcg0CIAogBiAAdCAIdkEBdGoiBy0AASEGIAUgACAHLQAAajYCLCAEIAY6AAAgCiAFKAIoIAUoAiwiAHQgCHZBAXRqIgctAAEhBiAFIAAgBy0AAGo2AiwgBCAGOgABIARBAmohBAwACwALIAUoAiwiAEEhTwRAIAVBsBo2AjAMAQsgBSgCMCIGIAUoAjhPBEAgBSAAQQdxIgc2AiwgBSAGIABBA3ZrIgA2AjAgBSAAKAAANgIoIAchAAwBCyAGIAUoAjQiB0YNACAFIAAgBiAHayAAQQN2IgAgBiAAayAHSRsiB0EDdGsiADYCLCAFIAYgB2siBzYCMCAFIAcoAAA2AigLA0ACQCAAQSFPBEAgBUGwGjYCMAwBCyAFAn8gBSgCMCIHIAUoAjhPBEAgBSAHIABBA3ZrIgY2AjBBASEHIABBB3EMAQsgByAFKAI0IgZGDQEgBSAHIABBA3YiCSAHIAZrIAcgCWsgBk8iBxsiCWsiBjYCMCAAIAlBA3RrCyIANgIsIAUgBigAACIGNgIoIAdFIAQgDk9yDQAgCiAGIAB0IAh2QQF0aiIHLQABIQYgBSAAIActAABqNgIsIAQgBjoAACAEQQFqIQQgBSgCLCEADAELCwNAIAQgDk9FBEAgCiAFKAIoIAUoAiwiAHQgCHZBAXRqIgctAAEhBiAFIAAgBy0AAGo2AiwgBCAGOgAAIARBAWohBAwBCwsCQCALIAJrQQROBEAgC0EDayEOA0AgBSgCGCIAQSFPBEAgBUGwGjYCHAwDCyAFAn8gBSgCHCIEIAUoAiRPBEAgBSAEIABBA3ZrIgQ2AhxBASEGIABBB3EMAQsgBCAFKAIgIgdGDQMgBSAEIABBA3YiBiAEIAdrIAQgBmsgB08iBhsiB2siBDYCHCAAIAdBA3RrCyIANgIYIAUgBCgAACIENgIUIAZFIAIgDk9yDQIgCiAEIAB0IAh2QQF0aiIELQABIQcgBSAAIAQtAABqNgIYIAIgBzoAACAKIAUoAhQgBSgCGCIAdCAIdkEBdGoiBC0AASEHIAUgACAELQAAajYCGCACIAc6AAEgAkECaiECDAALAAsgBSgCGCIAQSFPBEAgBUGwGjYCHAwBCyAFKAIcIgcgBSgCJE8EQCAFIABBB3EiBDYCGCAFIAcgAEEDdmsiADYCHCAFIAAoAAA2AhQgBCEADAELIAcgBSgCICIERg0AIAUgACAHIARrIABBA3YiACAHIABrIARJGyIEQQN0ayIANgIYIAUgByAEayIENgIcIAUgBCgAADYCFAsDQAJAIABBIU8EQCAFQbAaNgIcDAELIAUCfyAFKAIcIgQgBSgCJE8EQCAFIAQgAEEDdmsiBDYCHEEBIQYgAEEHcQwBCyAEIAUoAiAiB0YNASAFIAQgAEEDdiIOIAQgB2sgBCAOayAHTyIGGyIHayIENgIcIAAgB0EDdGsLIgA2AhggBSAEKAAAIgQ2AhQgBkUgAiALT3INACAKIAQgAHQgCHZBAXRqIgQtAAEhByAFIAAgBC0AAGo2AhggAiAHOgAAIAJBAWohAiAFKAIYIQAMAQsLA0AgAiALT0UEQCAKIAUoAhQgBSgCGCIAdCAIdkEBdGoiBC0AASEHIAUgACAELQAAajYCGCACIAc6AAAgAkEBaiECDAELCwJAIA8gA2tBBE4EQANAIAUoAgQiAEEhTwRAIAVBsBo2AggMAwsgBQJ/IAUoAggiAiAFKAIQTwRAIAUgAiAAQQN2ayIENgIIQQEhAiAAQQdxDAELIAIgBSgCDCIERg0DIAUgAiAAQQN2IgsgAiAEayACIAtrIARPIgIbIgtrIgQ2AgggACALQQN0awsiADYCBCAFIAQoAAAiBDYCACACRSADIBJPcg0CIAogBCAAdCAIdkEBdGoiAi0AASEEIAUgACACLQAAajYCBCADIAQ6AAAgCiAFKAIAIAUoAgQiAHQgCHZBAXRqIgItAAEhBCAFIAAgAi0AAGo2AgQgAyAEOgABIANBAmohAwwACwALIAUoAgQiAEEhTwRAIAVBsBo2AggMAQsgBSgCCCIEIAUoAhBPBEAgBSAAQQdxIgI2AgQgBSAEIABBA3ZrIgA2AgggBSAAKAAANgIAIAIhAAwBCyAEIAUoAgwiAkYNACAFIAAgBCACayAAQQN2IgAgBCAAayACSRsiAkEDdGsiADYCBCAFIAQgAmsiAjYCCCAFIAIoAAA2AgALA0ACQCAAQSFPBEAgBUGwGjYCCAwBCyAFAn8gBSgCCCICIAUoAhBPBEAgBSACIABBA3ZrIgQ2AghBASECIABBB3EMAQsgAiAFKAIMIgRGDQEgBSACIABBA3YiCyACIARrIAIgC2sgBE8iAhsiC2siBDYCCCAAIAtBA3RrCyIANgIEIAUgBCgAACIENgIAIAJFIAMgD09yDQAgCiAEIAB0IAh2QQF0aiICLQABIQQgBSAAIAItAABqNgIEIAMgBDoAACADQQFqIQMgBSgCBCEADAELCwNAIAMgD09FBEAgCiAFKAIAIAUoAgQiAHQgCHZBAXRqIgItAAEhBCAFIAAgAi0AAGo2AgQgAyAEOgAAIANBAWohAwwBCwtBbEFsQWxBbEFsQWxBbEFsIAEgBSgCBEEgRxsgBSgCCCAFKAIMRxsgBSgCGEEgRxsgBSgCHCAFKAIgRxsgBSgCLEEgRxsgBSgCMCAFKAI0RxsgBSgCQEEgRxsgBSgCRCAFKAJIRxshCAwBC0FsIQgLIAVB0ABqJAAgCAsaACAABEAgAQRAIAIgACABEQIADwsgABACCwtSAQN/AkAgACgCmOsBIgFFDQAgASgCACABKAK01QEiAiABKAK41QEiAxAVIAIEQCADIAEgAhECAAwBCyABEAILIABBADYCqOsBIABCADcDmOsBC5QFAgR/An4jAEEQayIGJAACQCABIAJFckUEQEF/IQQMAQsCQEEBQQUgAxsiBCACSwRAIAJFIANBAUZyDQIgBkGo6r5pNgIMIAJFIgBFBEAgBkEMaiABIAL8CgAACyAGKAIMQajqvmlGDQIgBkHQ1LTCATYCDCAARQRAIAZBDGogASAC/AoAAAsgBigCDEFwcUHQ1LTCAUYNAgwBCyAAQQBBMPwLAEEBIQUCQCADQQFGDQAgAyEFIAEoAAAiA0Go6r5pRg0AIANBcHFB0NS0wgFHDQFBCCEEIAJBCEkNAiAAQQE2AhQgASgAACECIABBCDYCGCAAIAJB0NS0wgFrNgIcIAAgATUABDcDAEEAIQQMAgsgAiABIAIgBRAYIgJJBEAgAiEEDAILIAAgAjYCGCABIARqIgVBAWstAAAiAkEIcQRAQXIhBAwCCyACQSBxIgNFBEAgBS0AACIFQacBSwRAQXAhBAwDCyAFQQdxrUIBIAVBA3ZBCmqthiIIQgOIfiAIfCEJIARBAWohBAsgAkEGdiEFIAJBAnYhBwJAAkACQAJAIAJBA3EiAkEBaw4DAAECAwsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAdBAXEhBwJ+AkACQAJAAkAgBUEBaw4DAQIDAAtCfyADRQ0DGiABIARqMQAADAMLIAEgBGozAABCgAJ8DAILIAEgBGo1AAAMAQsgASAEaikAAAshCCAAIAc2AiAgACACNgIcIAAgCDcDAEEAIQQgAEEANgIUIAAgCCAJIAMbIgg3AwggAEKAgAggCCAIQoCACFobPgIQDAELQXYhBAsgBkEQaiQAIAQLXwEBf0G4fyEDIAFBAUEFIAIbIgFPBH8gACABakEBay0AACIAQQNxQQJ0QcAaaigCACABaiAAQQR2QQxxQdAaaigCAGogAEEgcSIBRWogAUEFdiAAQcAASXFqBUG4fwsLxAICBH8CfiMAQUBqIgQkAAJAA0AgAUEFTwRAAkAgACgAAEFwcUHQ1LTCAUYEQEJ+IQYgAUEISQ0EIAAoAAQiA0F3Sw0EIANBCGoiAiABSw0EIANBgX9JDQEMBAsgBEEQaiIDIAAgAUEAEBchAkJ+IAQpAxBCACAEKAIkQQFHGyACGyIGQn1WDQMgBiAHfCIHIAZUIQJCfiEGIAINAyADIAAgAUEAEBciAkGIf0sgAnINAyABIAQoAigiA2shAiAAIANqIQMDQCADIAIgBEEEahAaIgVBiH9LDQQgAiAFQQNqIgVJDQQgAiAFayECIAMgBWohAyAEKAIIRQ0ACyAEKAIwBH8gAkEESQ0EIANBBGoFIAMLIABrIgJBiH9LDQMLIAEgAmshASAAIAJqIQAMAQsLQn4gByABGyEGCyAEQUBrJAAgBgtkAQF/Qbh/IQMCQCABQQNJDQAgAC0AAiEBIAIgAC8AACIAQQFxNgIEIAIgAEEBdkEDcSIDNgIAIAIgACABQRB0ckEDdiIANgIIAkACQCADQQFrDgMCAQABC0FsDwsgACEDCyADC7ABAAJ/IAIgACgClOsBBH8gACgC0OkBBUGAgAgLIgIgA2pBQGtLBEAgACABIAJqQSBqIgE2AvzrAUEBIQIgASADagwBCyADQYCABE0EQCAAIABBiOwBaiIBNgL86wFBACECIAEgA2oMAQsgACABIARqIgEgA2siAkHg/wNqIgQgAiAFGzYC/OsBQQIhAiADIARqQYCABGsgASAFGwshAyAAIAI2AoTsASAAIAM2AoDsAQuyBwIEfwF+IwBBgAFrIg4kACAOIAM2AnwCQAJAAkACQAJAAkAgAkEBaw4DAAMCAQsgBkUEQEG4fyEKDAULIAMgBS0AACICSQ0DIAIgCGotAAAhAyAHIAJBAnRqKAIAIQIgAEEAOgALIABCADcCACAAIAI2AgwgACADOgAKIABBADsBCCABIAA2AgBBASEKDAQLIAEgCTYCAEEAIQoMAwsgCkUNAUEAIQogC0UgDEEZSXINAkEIIAR0QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgNBiH9LDQEgDigCeCICIARLDQEgAEEMaiEMIA4oAnxBAWohEUGAgAIgAnRBEHYhEEEAIQRBASEFQQEgAnQiCkEBayILIQkDQCAEIBFHBEACQCAOIARBAXQiD2ovAQAiBkH//wNGBEAgDCAJQQN0aiAENgIAIAlBAWshCUEBIQYMAQsgBUEAIBAgBsFKGyEFCyANIA9qIAY7AQAgBEEBaiEEDAELCyAAIAI2AgQgACAFNgIAAkAgCSALRgRAIA1B6gBqIRBBACEJQQAhBQNAIAkgEUYEQCAKQQN2IApBAXZqQQNqIglBAXQhEUEAIQZBACEFA0AgBSAKTw0EIAUgEGohD0EAIQQDQCAEQQJHBEAgDCAEIAlsIAZqIAtxQQN0aiAEIA9qLQAANgIAIARBAWohBAwBCwsgBUECaiEFIAYgEWogC3EhBgwACwAFIA4gCUEBdGouAQAhBiAFIBBqIg8gEjcAAEEIIQQDQCAEIAZIBEAgBCAPaiASNwAAIARBCGohBAwBCwsgEkKBgoSIkKDAgAF8IRIgCUEBaiEJIAUgBmohBQwBCwALAAsgCkEDdiAKQQF2akEDaiEQQQAhBUEAIQYDQCAFIBFGDQFBACEEIA4gBUEBdGouAQAiD0EAIA9BAEobIQ8DQCAEIA9HBEAgDCAGQQN0aiAFNgIAA0AgBiAQaiALcSIGIAlLDQALIARBAWohBAwBCwsgBUEBaiEFDAALAAsgAEEIaiEJIAJBH2shC0EAIQYDQCAGIApHBEAgDSAJIAZBA3RqIgIoAgQiBEEBdGoiBSAFLwEAIgVBAWo7AQAgAiALIAVnaiIMOgADIAIgBSAMdCAKazsBACACIAQgCGotAAA6AAIgAiAHIARBAnRqKAIANgIEIAZBAWohBgwBCwsgASAANgIAIAMhCgwBC0FsIQoLIA5BgAFqJAAgCgtwAQR/IABCADcCACACBEAgAUEKaiEGIAEoAgQhBEEAIQJBACEBA0AgASAEdkUEQCACIAYgAUEDdGotAAAiBSACIAVLGyECIAFBAWohASADIAVBFktqIQMMAQsLIAAgAjYCBCAAIANBCCAEa3Q2AgALC64BAQR/IAEgAigCBCIDIAEoAgRqIgQ2AgQgACADQQJ0QbAZaigCACABKAIAQQAgBGt2cTYCAAJAIARBIU8EQCABQbAaNgIIDAELIAEoAggiAyABKAIQTwRAIAEQDAwBCyADIAEoAgwiBUYNACABIAMgAyAFayAEQQN2IgYgAyAGayAFSRsiA2siBTYCCCABIAQgA0EDdGs2AgQgASAFKAAANgIACyAAIAJBCGo2AgQLjQICA38BfiAAIAJqIQQCQAJAIAJBCE4EQCAAIAFrIgJBeUgNAQsDQCAAIARPDQIgACABLQAAOgAAIABBAWohACABQQFqIQEMAAsACwJAAkAgAkFvSw0AIAAgBEEgayICSw0AIAEpAAAhBiAAIAEpAAg3AAggACAGNwAAIAIgAGsiBUERTgRAIABBEGohACABIQMDQCADKQAQIQYgACADKQAYNwAIIAAgBjcAACADKQAgIQYgACADKQAoNwAYIAAgBjcAECADQSBqIQMgAEEgaiIAIAJJDQALCyABIAVqIQEMAQsgACECCwNAIAIgBE8NASACIAEtAAA6AAAgAkEBaiECIAFBAWohAQwACwALC98BAQZ/Qbp/IQoCQCACKAIEIgggAigCACIJaiINIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQIgACABQSBrIgEgCyAJQQAQIyADIAkgC2o2AgACQAJAIAQgBWsgDE8EQCACIQUMAQsgDCAEIAZrSw0CIAcgByACIAVrIgNqIgIgCGpPBEAgCEUNAiAEIAIgCPwKAAAMAgtBACADayIABEAgBCACIAD8CgAACyADIAhqIQggBCADayEECyAEIAEgBSAIQQEQIwsgDSEKCyAKC+sBAQZ/Qbp/IQsCQCADKAIEIgkgAygCACIKaiINIAEgAGtLDQAgBSAEKAIAIgVrIApJBEBBbA8LIAMoAgghDCAAIAVLIAUgCmoiDiAAS3ENACAAIApqIgMgDGshASAAIAUgChAfIAQgDjYCAAJAAkAgAyAGayAMTwRAIAEhBgwBC0FsIQsgDCADIAdrSw0CIAggCCABIAZrIgBqIgEgCWpPBEAgCUUNAiADIAEgCfwKAAAMAgtBACAAayIEBEAgAyABIAT8CgAACyAAIAlqIQkgAyAAayEDCyADIAIgBiAJQQEQIwsgDSELCyALC6sCAQJ/IAJBH3EhAyABIQQDQCADQQhJRQRAIANBCGshAyAEKQAAQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef34gAIVCG4lCh5Wvr5i23puef35CnaO16oOxjYr6AH0hACAEQQhqIQQMAQsLIAEgAkEYcWohASACQQdxIgNBBEkEfyABBSADQQRrIQMgATUAAEKHla+vmLbem55/fiAAhUIXiULP1tO+0ser2UJ+Qvnz3fGZ9pmrFnwhACABQQRqCyEEA0AgAwRAIANBAWshAyAEMQAAQsXP2bLx5brqJ34gAIVCC4lCh5Wvr5i23puef34hACAEQQFqIQQMAQsLIABCIYggAIVCz9bTvtLHq9lCfiIAQh2IIACFQvnz3fGZ9pmrFn4iAEIgiCAAhQvhBAIBfgJ/IAAgA2ohBwJAIANBB0wEQANAIAAgB08NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwACwALIAQEQAJAIAAgAmsiBkEHTQRAIAAgAi0AADoAACAAIAItAAE6AAEgACACLQACOgACIAAgAi0AAzoAAyAAIAIgBkECdCIGQeAaaigCAGoiAigAADYABCACIAZBgBtqKAIAayECDAELIAAgAikAADcAAAsgA0EIayEDIAJBCGohAiAAQQhqIQALIAEgB08EQCAAIANqIQEgBEUgACACa0EPSnJFBEADQCAAIAIpAAA3AAAgAkEIaiECIABBCGoiACABSQ0ADAMLAAsgAikAACEFIAAgAikACDcACCAAIAU3AAAgA0ERSQ0BIABBEGohAANAIAIpABAhBSAAIAIpABg3AAggACAFNwAAIAIpACAhBSAAIAIpACg3ABggACAFNwAQIAJBIGohAiAAQSBqIgAgAUkNAAsMAQsCQCAAIAFLBEAgACEBDAELIAEgAGshBgJAIARFIAAgAmtBD0pyRQRAIAIhAwNAIAAgAykAADcAACADQQhqIQMgAEEIaiIAIAFJDQALDAELIAIpAAAhBSAAIAIpAAg3AAggACAFNwAAIAZBEUgNACAAQRBqIQAgAiEDA0AgAykAECEFIAAgAykAGDcACCAAIAU3AAAgAykAICEFIAAgAykAKDcAGCAAIAU3ABAgA0EgaiEDIABBIGoiACABSQ0ACwsgAiAGaiECCwNAIAEgB08NASABIAItAAA6AAAgAUEBaiEBIAJBAWohAgwACwALC6HFAQI2fwV+IwBBEGsiMSQAAkBBwOwFEAEiCEUEQEFAIQYMAQsgCEIANwL86gEgCEEANgKc6wEgCEEANgKQ6wEgCEEANgLU6wEgCEEANgLE6wEgCEIANwKk6wEgCEEANgK46QEgCEEANgK87AUgCEIANwK86wEgCEEANgKs6wEgCEIBNwKU6wEgCEIANwPo6wEgCEGBgIDAADYCzOsBIAhCADcC7OoBIAhCADcDsOsBIAhBADYCuOsBIAhBhOsBakEANgIAIAgQFiAIQbjqAWohNCAIQcDpAWohNiAIQZDqAWohNyAAISwCQAJAAkACQANAQQFBBSAIKALs6gEiCxshEwJAA0AgAyATSQ0BAkAgA0EESSALcg0AIAIoAABBcHFB0NS0wgFHDQBBuH8hBiADQQhJDQcgAigABCIHQXdLBEBBciEGDAgLIAMgB0EIaiIESQ0HIAdBgH9LBEAgBCEGDAgLIAMgBGshAyACIARqIQIMAQsLIAhCADcCrOkBIAhCADcD8OkBIAhBjICA4AA2AqhQIAhBADYCoOsBIAhCADcDiOoBIAhBATYClOsBIAhCAzcDgOoBIAhBtOkBakIANwIAIAhB+OkBakIANwMAIAhB9A4pAgA3AqzQASAIQbTQAWpB/A4oAgA2AgAgCCAIQRBqNgIAIAggCEGgMGo2AgQgCCAIQZggajYCCCAIIAhBqNAAajYCDCAIQQFBBSAIKALs6gEbNgK86QECQCABRQ0AICwgCCgCrOkBIgZGDQAgCCAGNgK46QEgCCAsNgKs6QEgCCgCsOkBIQQgCCAsNgKw6QEgCCAsIAQgBmtqNgK06QELQbh/IQYgA0EFQQkgCCgC7OoBIhMbSQ0FIAJBAUEFIBMbIBMQGCIEQYh/Sw0EIAMgBEEDakkNBSA2IAIgBCATEBciBkGIf0sEQCAGIQQMBQsgBg0DAkACQCAIKAKw6wFBAUcNACAIKAKs6wEiC0UNACAIKAKc6wFFDQAgCygCBCEGIDEgCCgC3OkBIgo2AgQgBkEBayIHQsnP2bLx5brqJyAxQQRqQQQQIqdxIRMgCygCACELA0AgCiALIBNBAnRqKAIAIgwEfyAMKAKo1QEFQQALIgZHBEAgByATcUEBaiETIAYNAQsLIAxFDQAgCBAWIAhBfzYCqOsBIAggDDYCnOsBIAggCCgC3OkBIhM2AqDrAQwBCyAIKALc6QEhEwsCQCATRQ0AIAgoAqDrASATRg0AQWAhBAwFCwJAIAgoAuDpAQRAIAggCCgC8OoBIgZFNgL06gEgBg0BIDdBAEHYAPwLACAIQvnq0NDnyaHk4QA3A7DqASAIQs/W077Sx6vZQjcDoOoBIAhC1uuC7ur9ifXgADcDmOoBDAELIAhBADYC9OoBCyAIIAgpA/DpASAErXw3A/DpASAIKAK46wEiEwRAIAggCCgC0OkBIgYgEyAGIBNJGzYC0OkBCyABICxqITUgAyAEayEDIAIgBGohAiAsIRMDQCACIAMgMUEEahAaIiBBiH9LBEAgICEEDAYLIANBA2siOCAgSQ0EIAJBA2oiHSA1IB0gNUkbIDUgEyAdTRshAkFsIQQCQAJAAkACQAJAAkACQAJAIDEoAgQOAwECAA0LIAIgE2shFEEAITMjAEHQAmsiBSQAAkACQCAIKAKU6wEiAgR/IAgoAtDpAQVBgIAICyAgSQ0AAkAgIEECSQ0AIB0tAAAiA0EDcSEaIAIEfyAIKALQ6QEFQYCACAshBgJAAkACQAJAAkACQAJAAkACQAJAIBpBAWsOAwMBAAILIAgoAojqAQ0AQWIhAwwLCyAgQQVJDQhBAyEMIB0oAAAhBAJ/An8CQAJAAkAgA0ECdkEDcSICQQJrDgIBAgALIARBDnZB/wdxIQ0gBEEEdkH/B3EhECACQQBHDAMLIARBEnYhDSAEQQR2Qf//AHEhEEEEDAELIB0tAARBCnQgBEEWdnIhDSAEQQR2Qf//D3EhEEEFCyEMQQELIQRBun8hAyATQQEgEBtFDQogBiAQSQ0IIBBBBkkgBHEEQEFoIQMMCwsgDCANaiIKICBLDQggBiAUIAYgFEkbIgIgEEkNCiAIIBMgFCAQIAJBABAbAkAgCCgCpOsBRSAQQYEGSXINAEEAIQMDQCADQYOAAUsNASADQUBrIQMMAAsACyAaQQNGBEAgDCAdaiEGIAgoAgwiCy0AAUEIdCECIAgoAvzrASEDIARFBEAgAgRAIAVB4AFqIAYgDRAIIg5BiH9LDQkgC0EEaiEZIAMgEGohESALLwECIQkgEEEETwRAIBFBA2shBkEAIAlrQR9xIQcgBSgC6AEhDCAFKALsASEPIAUoAvABIQQgBSgC4AEhDSAFKALkASEOA0AgDkEgSwRAQbAaIQwMCgsCQCAEIAxNBEAgDkEHcSESIA5BA3YhDUEBIQ4MAQsgDCAPRg0KIA4gDkEDdiICIAwgD2sgDCACayAPTyIOGyINQQN0ayESCyAMIA1rIgwoAAAhDSAORSADIAZPcg0IIAMgGSANIBJ0IAd2QQJ0aiICLwEAOwAAIAMgAi0AA2oiAyAZIA0gEiACLQACaiICdCAHdkECdGoiCy8BADsAACADIAstAANqIQMgAiALLQACaiEODAALAAsgBSgC5AEiDkEhTwRAIAVBsBo2AugBDAkLIAUoAugBIgYgBSgC8AFPBEAgBSAOQQdxIgI2AuQBIAUgBiAOQQN2ayIENgLoASAFIAQoAAA2AuABIAIhDgwJCyAGIAUoAuwBIgRGDQggBSAOIAYgBGsgDkEDdiICIAYgAmsgBEkbIgJBA3RrIg42AuQBIAUgBiACayICNgLoASAFIAIoAAA2AuABDAgLIAMgECAGIA0gCxARIQ4MCAsgAgRAIAMgECAGIA0gCxASIQ4MCAsgAyAQIAYgDSALEBQhDgwHCyAIQazVAWohFyAMIB1qISEgCEGo0ABqIQcgCCgC/OsBIRYgBEUEQCAHICEgDSAXEA4iDkGIf0sNByANIA5NDQMgFiAQIA4gIWogDSAOayAHEBEhDgwHCyAQRQRAQbp/IQ4MBwsgDUUEQEFsIQ4MBwsgEEEIdiIDIA0gEEkEfyANQQR0IBBuBUEPC0EEdCIEQYwIaigCAGwgBEGICGooAgBqIgJBBXYgAmogBEGACGooAgAgBEGECGooAgAgA2xqSQRAIwBBEGsiLSQAIAcoAgAhESAXQfAEaiIeQQBB8AD8CwBBVCEDAkAgEUH/AXEiL0EMSw0AIBdB4AdqIgkgHiAtQQhqIC1BDGogISANIBdB4AlqEAciBEGIf00EQCAtKAIMIgsgL0sNASAXQagFaiEZIBdBpAVqITAgB0EEaiEbIBFBgICAeHEhJCALQQFqIjIhAyALIQYDQCADIgJBAWshAyAGIgxBAWshBiAeIAxBAnRqKAIARQ0AC0EBIAIgAkEBTRshDkEAIQZBASEDA0AgAyAORwRAIB4gA0ECdCIPaigCACECIA8gGWogBjYCACADQQFqIQMgAiAGaiEGDAELCyAXIAY2AqgFIBkgDEEBaiIfQQJ0aiAGNgIAIBdB4AVqISZBACEDIC0oAgghBgNAIAMgBkcEQCAZIAMgCWotAABBAnRqIgIgAigCACICQQFqNgIAIAIgJmogAzoAACADQQFqIQMMAQsLQQAhBiAZQQA2AgBBCyAvIBFB/wFxQQxGGyAvIAtBDEkbIikgC0F/c2ohD0EBIQMDQCADIA5HBEAgHiADQQJ0IgtqKAIAIQIgCyAXaiAGNgIAIAIgAyAPanQgBmohBiADQQFqIQMMAQsLICkgMiAMayILa0EBaiEJIAshBgNAIAYgCUkEQCAXIAZBNGxqIQ9BASEDA0AgAyAORwRAIA8gA0ECdCICaiACIBdqKAIAIAZ2NgIAIANBAWohAwwBCwsgBkEBaiEGDAELCyAyIClrIRUgDEEAIAxBAEobQQFqISdBASEuA0AgJyAuRwRAIDIgLmshBiAXIC5BAnQiAmooAgAhJSACIDBqKAIAISogMCAuQQFqIi5BAnRqKAIAIRggCyApIAZrIgNNBEAgHyAGIBVqIgJBASACQQFKIhIbIgIgAiAfSBshHCAXIAZBNGxqIh4gAkECdGohGSAGIDJqIREgBkEQdEGAgIAIaiEOQQEgA3QiCUECayEPA0AgGCAqRg0DIBsgJUECdGohKCAmICpqLQAAISsgAiEDIBIEQCAOICtyrUKBgICAEH4hOiAZKAIAIQZBACEDAkACQAJAAkAgDw4DAQIAAgsgKCA6NwEICyAoIDo3AQAMAQsDQCADIAZODQEgKCADQQJ0aiIMIDo3ARggDCA6NwEQIAwgOjcBCCAMIDo3AQAgA0EIaiEDDAALAAsgAiEDCwNAIAMgHEcEQCARIANrIQwgKCAeIANBAnQiBmooAgBBAnRqICYgBiAwaigCAGogJiAwIANBAWoiA0ECdGooAgBqIAwgKSArQQIQDwwBCwsgKkEBaiEqIAkgJWohJQwACwAFIBsgJUECdGogJiAqaiAYICZqIAYgKUEAQQEQDwwCCwALCyAHIClBEHQgJHIgL3JBgAJyNgIACyAEIQMLIC1BEGokACADIg5BiH9LDQcgAyANTw0DIBYgECADICFqIA0gA2sgBxASIQ4MBwsgByAhIA0gFxAOIg5BiH9LDQYgDSAOTQ0CIBYgECAOICFqIA0gDmsgBxAUIQ4MBgtBAiEQAn8CQAJAAkAgA0ECdkEDcUEBaw4DAQACAAtBASEQIANBA3YMAgsgHS8AAEEEdgwBCyAgQQJGDQhBAyEQIB0vAAAgHS0AAkEQdHJBBHYLIQtBun8hAyATQQEgCxtFDQkgBiALSQ0HIAsgFEsNCSAIIBMgFCALIAYgFCAGIBRJG0EBEBsgICALIBBqIgpBIGpJBEAgCiAgSw0IIBAgHWohBCAIKAL86wEhAwJAIAgoAoTsAUECRgRAIAtBgIAEayICBEAgAyAEIAL8CgAACyAIQYjsAWogAiAEakGAgAT8CgAADAELIAtFDQAgAyAEIAv8CgAACyAIIAs2AojrASAIIAgoAvzrATYC+OoBDAcLIAhBADYChOwBIAggCzYCiOsBIAggECAdaiICNgL46gEgCCACIAtqNgKA7AEMBgsCfwJAAkACQCADQQJ2QQNxQQFrDgMBAAIAC0EBIRAgA0EDdgwCCyAgQQJGDQhBAiEQIB0vAABBBHYMAQsgIEEESQ0HQQMhECAdLwAAIB0tAAJBEHRyQQR2CyELQbp/IQMgE0EBIAsbRQ0IIAYgC0kNBiALIBRLDQggCCATIBQgCyAGIBQgBiAUSRtBARAbIBAgHWoiAy0AACEGIAgoAvzrASEEAkAgCCgChOwBQQJGBEAgC0GAgARrIgIEQCAEIAYgAvwLAAsgCEGI7AFqIAMtAABBgIAE/AsADAELIAtFDQAgBCAGIAv8CwALIAggCzYCiOsBIAggCCgC/OsBNgL46gEgEEEBaiEKDAULQbh/IQ4MAwsgEiEOCyAFIA42AuQBIAUgDDYC6AEgBSANNgLgAQsCQCARIANrQQJJDQAgEUECayELQQAgCWtBH3EhBgNAAkAgDkEhTwRAIAVBsBo2AugBDAELIAUCfyAFKALoASIHIAUoAvABTwRAIAUgByAOQQN2ayIMNgLoAUEBISUgDkEHcQwBCyAHIAUoAuwBIgRGDQEgBSAHIA5BA3YiAiAHIARrIAcgAmsgBE8iJRsiAmsiDDYC6AEgDiACQQN0awsiDjYC5AEgBSAMKAAAIgI2AuABICVFIAMgC0tyDQAgAyAZIAIgDnQgBnZBAnRqIgIvAQA7AAAgBSAFKALkASACLQACaiIONgLkASADIAItAANqIQMMAQsLA0AgAyALSw0BIAMgGSAFKALgASAOdCAGdkECdGoiAi8BADsAACAFIAUoAuQBIAItAAJqIg42AuQBIAMgAi0AA2ohAwwACwALAkAgAyARTw0AIAMgGSAFKALgASAOdEEAIAlrdkECdGoiAi0AADoAACACLQADQQFGBEAgBSgC5AEgAi0AAmohDgwBCyAFKALkASIOQR9LDQBBICAOIAItAAJqIgIgAkEgTxshDgtBbEFsIBAgDkEgRxsgBSgC6AEgBSgC7AFHGyEOCyAIKAKE7AFBAkYEQCAIQYjsAWogCCgCgOwBQYCABGtBgIAE/AoAACAQQYCABGsiAwRAIAgoAvzrASICQeD/A2ogAiAD/AoAAAsgCCAIKAL86wFB4P8DajYC/OsBIAggCCgCgOwBQSBrNgKA7AELIA5BiH9LDQEgCCAQNgKI6wEgCEEBNgKI6gEgCCAIKAL86wE2AvjqASAaQQJGBEAgCCAIQajQAGo2AgwLIAoiA0GIf0sNAwsgCCgClOsBBH8gCCgC0OkBBUGAgAgLIQwgCiAgRg0BICAgCmshCSAIKAK06QEhCyAdICBqIQ0gCCgCpOsBIQYCfwJAAn8gCiAdaiIRLQAAIg7AIgJBAE4EQCARQQFqDAELIAJBf0YEQCAJQQNJDQUgEUEDaiEEIBEvAAFBgP4BaiEODAILIAlBAUYNBCARLQABIA5BCHRyQYCAAmshDiARQQJqCyEEIA4NAEFsIQMgBCANRw0EQQAhDiAJDAELQbh/IQMgBEEBaiIPIA1LDQMgBC0AACIKQQNxDQEgCEEQaiAIIApBBnZBI0EJIA8gDSAPa0HADUHQDkGADyAIKAKM6gEgBiAOIAhBrNUBaiIHEBwiAkGIf0sNASAIQZggaiAIQQhqIApBBHZBA3FBH0EIIAIgD2oiBCANIARrQYAKQYALQZATIAgoAozqASAIKAKk6wEgDiAHEBwiAkGIf0sNAUFsIQMgCEGgMGogCEEEaiAKQQJ2QQNxQTRBCSACIARqIgQgDSAEa0GgC0GADUGgFSAIKAKM6gEgCCgCpOsBIA4gBxAcIgJBiH9LDQMgAiAEaiARawsiA0GIf0sNAgJAIBNBAEcgFEEAR3FFIA5BAEpxDQACQAJAIBMgFCAMIAwgFEsbIgJBACACQQBKG2ogC2siAkH8//8fTQRAIAYgAkGBgIAISXIgDkEJSHINAiAFQeABaiAIKAIIIA4QHQwBCyAFQeABaiAIKAIIIA4QHSAFKALkAUEZSyEzIAYNAQsgBSgC4AFBE0shBgsgCSADayEHIAMgEWohBCAIQQA2AqTrASAIKAKE7AEhAgJAIAYEQAJ/IAJBAUYEQCAIKAL86wEMAQsgEyAUQQAgFEEAShtqCyEUIAUgCCgC+OoBIgM2AswCIAgoAoDsASEcIA5FBEAgEyEJDAILIAgoArjpASEiIAgoArTpASEXIAgoArDpASELIAhBATYCjOoBIAhBrNABaiEyIAVB1AFqISZBACECA0AgAkEDRwRAICYgAkECdCIDaiADIDJqKAIANgIAIAJBAWohAgwBCwtBbCEDIAVBqAFqIgIgBCAHEAhBiH9LDQUgBUG8AWogAiAIKAIAEB4gBUHEAWogAiAIKAIIEB4gBUHMAWogAiAIKAIEEB5BCCAOIA5BCE4bIihBACAoQQBKGyElIA5BAWshGiATIAtrIS0gBSgCsAEhAiAFKALYASEGIAUoAtQBIRIgBSgCrAEhBCAFKAK0ASEjIAUoArgBISkgBSgCyAEhGCAFKALQASErIAUoAsABISQgBSgCqAEhCSAFKALEASEhIAUoAswBISogBSgCvAEhMCAzRSEVQQAhEANAIBIhESAQICVGBEAgBSAqNgLMASAFIDA2ArwBIAUgAjYCsAEgBSAhNgLEASAFIAk2AqgBIAhBmOwBaiEeIAhBiOwFaiEZIAhBiOwBaiEWIBRBIGshGyAzRSEnIBMhCQNAIA4gJUcEQCAFKALAASAFKAK8AUEDdGoiBi0AAiEfIAUoAtABIAUoAswBQQN0aiIELQACIRggBSgCyAEgBSgCxAFBA3RqIgItAAMhKyAELQADISQgBi0AAyEVIAIvAQAhEiAELwEAIREgBi8BACEKIAIoAgQhByAGKAIEIRAgBCgCBCEMAkAgAi0AAiINQQJPBEACQCAnIA1BGUlyRQRAIAcgBSgCqAEiDyAFKAKsASICdEEFIA1rdkEFdGohBwJAIAIgDWpBBWsiAkEhTwRAIAVBsBo2ArABDAELIAUoArABIgYgBSgCuAFPBEAgBSACQQdxIgQ2AqwBIAUgBiACQQN2ayICNgKwASAFIAIoAAAiDzYCqAEgBCECDAELIAYgBSgCtAEiBEYNACAFIAIgBiAEayACQQN2IgIgBiACayAESRsiBEEDdGsiAjYCrAEgBSAGIARrIgQ2ArABIAUgBCgAACIPNgKoAQsgBSACQQVqIgY2AqwBIAcgDyACdEEbdmohDQwBCyAFIAUoAqwBIgIgDWoiBjYCrAEgBSgCqAEgAnRBACANa3YgB2ohDSAGQSFPBEAgBUGwGjYCsAEMAQsgBSgCsAEiByAFKAK4AU8EQCAFIAZBB3EiAjYCrAEgBSAHIAZBA3ZrIgQ2ArABIAUgBCgAADYCqAEgAiEGDAELIAcgBSgCtAEiBEYNACAFIAYgByAEayAGQQN2IgIgByACayAESRsiAkEDdGsiBjYCrAEgBSAHIAJrIgI2ArABIAUgAigAADYCqAELIAUpAtQBITogBSANNgLUASAFIDo3AtgBDAELIBBFIQQgDUUEQCAmIBBBAEdBAnRqKAIAIQIgBSAmIARBAnRqKAIAIg02AtQBIAUgAjYC2AEgBSgCrAEhBgwBCyAFIAUoAqwBIgJBAWoiBjYCrAECQAJAIAQgB2ogBSgCqAEgAnRBH3ZqIgRBA0YEQCAFKALUAUEBayICQX8gAhshDQwBCyAmIARBAnRqKAIAIgJBfyACGyENIARBAUYNAQsgBSAFKALYATYC3AELIAUgBSgC1AE2AtgBIAUgDTYC1AELIBggH2ohBAJAIBhFBEAgBiECDAELIAUgBiAYaiICNgKsASAFKAKoASAGdEEAIBhrdiAMaiEMCwJAIARBFEkNACACQSFPBEAgBUGwGjYCsAEMAQsgBSgCsAEiBiAFKAK4AU8EQCAFIAJBB3EiBDYCrAEgBSAGIAJBA3ZrIgI2ArABIAUgAigAADYCqAEgBCECDAELIAYgBSgCtAEiBEYNACAFIAIgBiAEayACQQN2IgIgBiACayAESRsiBEEDdGsiAjYCrAEgBSAGIARrIgQ2ArABIAUgBCgAADYCqAELAkAgH0UEQCACIQQMAQsgBSACIB9qIgQ2AqwBIAUoAqgBIAJ0QQAgH2t2IBBqIRALAkAgBEEhTwRAQbAaIQIgBUGwGjYCsAEMAQsgBSgCsAEiAiAFKAK4AU8EQCAFIARBB3EiBjYCrAEgBSACIARBA3ZrIgI2ArABIAUgAigAADYCqAEgBiEEDAELIAIgBSgCtAEiB0YNACAFIAIgAiAHayAEQQN2IgYgAiAGayAHSRsiBmsiAjYCsAEgBSAEIAZBA3RrIgQ2AqwBIAUgAigAADYCqAELAkAgGiAlRg0AIAUgFUECdEGwGWooAgAgBSgCqAEiB0EAIAQgFWoiBGt2cSAKajYCvAEgBSAkQQJ0QbAZaigCACAHQQAgBCAkaiIEa3ZxIBFqNgLMAQJAIARBIU8EQEGwGiECIAVBsBo2ArABDAELIAUoArgBIAJNBEAgBSAEQQdxIgY2AqwBIAUgAiAEQQN2ayICNgKwASAFIAIoAAAiBzYCqAEgBiEEDAELIAIgBSgCtAEiCkYNACAFIAIgAiAKayAEQQN2IgYgAiAGayAKSRsiBmsiAjYCsAEgBSAEIAZBA3RrIgQ2AqwBIAUgAigAACIHNgKoAQsgBSAEICtqIgQ2AqwBIAUgK0ECdEGwGWooAgAgB0EAIARrdnEgEmo2AsQBIARBIU8EQCAFQbAaNgKwAQwBCyAFKAK4ASACTQRAIAUgBEEHcTYCrAEgBSACIARBA3ZrIgI2ArABIAUgAigAADYCqAEMAQsgAiAFKAK0ASIGRg0AIAUgBCACIAZrIARBA3YiBCACIARrIAZJGyIEQQN0azYCrAEgBSACIARrIgI2ArABIAUgAigAADYCqAELAkACQCAIKAKE7AFBAkYEQCAFKALMAiIHIAVB4AFqICVBB3FBDGxqIhUoAgAiAmoiCiAIKAKA7AEiBEsEQCAEIAdHBEAgBCAHayIEIBQgCWtLDQsgCSAHIAQQHyAVIAIgBGsiAjYCACAEIAlqIQkLIAUgFjYCzAIgCEEANgKE7AECQAJAAkAgAkGAgARKDQAgCSAVKAIEIhIgAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgFSgCCDYCgAEgBSAVKQIANwN4IAkgFCAFQfgAaiAFQcwCaiAZIAsgFyAiECAhBgwBCyACIBZqIQcgAiAJaiEEIBUoAgghESAWKQAAITogCSAWKQAINwAIIAkgOjcAAAJAIAJBEUkNACAeKQAAITogCSAeKQAINwAYIAkgOjcAECACQRBrQRFIDQAgCUEgaiECIB4hDwNAIA8pABAhOiACIA8pABg3AAggAiA6NwAAIA8pACAhOiACIA8pACg3ABggAiA6NwAQIA9BIGohDyACQSBqIgIgBEkNAAsLIAQgEWshAiAFIAc2AswCIAQgC2sgEUkEQCARIAQgF2tLDQ8gIiAiIAIgC2siCmoiByASak8EQCASRQ0CIAQgByAS/AoAAAwCC0EAIAprIgIEQCAEIAcgAvwKAAALIAogEmohEiAEIAprIQQgCyECCyARQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgEkERSA0BIAQgEmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgEUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgEUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgEkEJSQ0AIAQgEmohCiAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgCkkNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIBJBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIApJDQALCyAGQYh/SwRAIAYhAwwOCyAVIA02AgggFSAMNgIEIBUgEDYCACAZIRwMAwsgCkEgayEEAkACQCAKIBxLDQAgCSAVKAIEIhEgAmoiBmogBEsNACAGQSBqIBQgCWtNDQELIAUgFSgCCDYCkAEgBSAVKQIANwOIASAJIBQgBCAFQYgBaiAFQcwCaiAcIAsgFyAiECEhBgwCCyACIAlqIQQgFSgCCCEPIAcpAAAhOiAJIAcpAAg3AAggCSA6NwAAAkAgAkERSQ0AIAcpABAhOiAJIAcpABg3ABggCSA6NwAQIAJBEGtBEUgNACAHQRBqIQIgCUEgaiEHA0AgAikAECE6IAcgAikAGDcACCAHIDo3AAAgAikAICE6IAcgAikAKDcAGCAHIDo3ABAgAkEgaiECIAdBIGoiByAESQ0ACwsgBCAPayECIAUgCjYCzAIgBCALayAPSQRAIA8gBCAXa0sNDSAiICIgAiALayIKaiIHIBFqTwRAIBFFDQMgBCAHIBH8CgAADAMLQQAgCmsiAgRAIAQgByAC/AoAAAsgCiARaiERIAQgCmshBCALIQILIA9BEE8EQCACKQAAITogBCACKQAINwAIIAQgOjcAACARQRFIDQIgBCARaiEHIARBEGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgB0kNAAsMAgsCQCAPQQdNBEAgBCACLQAAOgAAIAQgAi0AAToAASAEIAItAAI6AAIgBCACLQADOgADIAQgAiAPQQJ0IgdB4BpqKAIAaiICKAAANgAEIAIgB0GAG2ooAgBrIQIMAQsgBCACKQAANwAACyARQQlJDQEgBCARaiEKIARBCGoiByACQQhqIgJrQQ9MBEADQCAHIAIpAAA3AAAgAkEIaiECIAdBCGoiByAKSQ0ADAMLAAsgAikAACE6IAcgAikACDcACCAHIDo3AAAgEUEZSA0BIARBGGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgCkkNAAsMAQsCQAJAIAUoAswCIhEgBUHgAWogJUEHcUEMbGoiDygCACICaiIHIBxLDQAgCSAPKAIEIgogAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgDygCCDYCoAEgBSAPKQIANwOYASAJIBQgBUGYAWogBUHMAmogHCALIBcgIhAgIQYMAQsgAiAJaiEEIA8oAgghFSARKQAAITogCSARKQAINwAIIAkgOjcAAAJAIAJBEUkNACARKQAQITogCSARKQAYNwAYIAkgOjcAECACQRBrQRFIDQAgEUEQaiECIAlBIGohEgNAIAIpABAhOiASIAIpABg3AAggEiA6NwAAIAIpACAhOiASIAIpACg3ABggEiA6NwAQIAJBIGohAiASQSBqIhIgBEkNAAsLIAQgFWshAiAFIAc2AswCIAQgC2sgFUkEQCAVIAQgF2tLDQwgIiAiIAIgC2siD2oiByAKak8EQCAKRQ0CIAQgByAK/AoAAAwCC0EAIA9rIgIEQCAEIAcgAvwKAAALIAogD2ohCiAEIA9rIQQgCyECCyAVQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgCkERSA0BIAQgCmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgFUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgFUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgCkEJSQ0AIAQgCmohDyAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgD0kNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIApBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIA9JDQALCyAGQYh/SwRAIAYhAwwLCyAFQeABaiAlQQdxQQxsaiICIA02AgggAiAMNgIEIAIgEDYCAAsgBiAJaiEJICVBAWohJSAQIC1qIAxqIS0MAQsLIAUoArABIAUoArQBRw0HIAUoAqwBQSBHDQcgDiAoayEQA0ACQCAOIBBMBEBBACECA0AgAkEDRg0CIDIgAkECdCIDaiADICZqKAIANgIAIAJBAWohAgwACwALIAVB4AFqIBBBB3FBDGxqIQoCfwJAIAgoAoTsAUECRgRAIAUoAswCIg8gCigCACIEaiIHIAgoAoDsASICSwRAIAIgD0cEQCACIA9rIgIgFCAJa0sNCyAJIA8gAhAfIAogBCACayIENgIAIAIgCWohCQsgBSAWNgLMAiAIQQA2AoTsAQJAAkACQCAEQYCABEoNACAJIAooAgQiDSAEaiIGaiAbSw0AIAZBIGogFCAJa00NAQsgBSAKKAIINgJQIAUgCikCADcDSCAJIBQgBUHIAGogBUHMAmogGSALIBcgIhAgIQYMAQsgBCAWaiEHIAQgCWohDCAKKAIIIQogFikAACE6IAkgFikACDcACCAJIDo3AAACQCAEQRFJDQAgHikAACE6IAkgHikACDcAGCAJIDo3ABAgBEEQa0ERSA0AIAlBIGohAiAeIQQDQCAEKQAQITogAiAEKQAYNwAIIAIgOjcAACAEKQAgITogAiAEKQAoNwAYIAIgOjcAECAEQSBqIQQgAkEgaiICIAxJDQALCyAMIAprIQIgBSAHNgLMAiAMIAtrIApJBEAgCiAMIBdrSw0PICIgIiACIAtrIgdqIgQgDWpPBEAgDUUNAiAMIAQgDfwKAAAMAgtBACAHayICBEAgDCAEIAL8CgAACyAHIA1qIQ0gDCAHayEMIAshAgsgCkEQTwRAIAIpAAAhOiAMIAIpAAg3AAggDCA6NwAAIA1BEUgNASAMIA1qIQcgDEEQaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwwBCwJAIApBB00EQCAMIAItAAA6AAAgDCACLQABOgABIAwgAi0AAjoAAiAMIAItAAM6AAMgDCACIApBAnQiBEHgGmooAgBqIgIoAAA2AAQgAiAEQYAbaigCAGshAgwBCyAMIAIpAAA3AAALIA1BCUkNACAMIA1qIQcgDEEIaiIEIAJBCGoiAmtBD0wEQANAIAQgAikAADcAACACQQhqIQIgBEEIaiIEIAdJDQAMAgsACyACKQAAITogBCACKQAINwAIIAQgOjcAACANQRlIDQAgDEEYaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwsgBkGJf08EQCAGIQMMDgsgGSEcIAYgCWoMAwsgB0EgayECAkACQCAHIBxLDQAgCSAKKAIEIhIgBGoiDGogAksNACAMQSBqIBQgCWtNDQELIAUgCigCCDYCYCAFIAopAgA3A1ggCSAUIAIgBUHYAGogBUHMAmogHCALIBcgIhAhIQwMAgsgBCAJaiEGIAooAgghCiAPKQAAITogCSAPKQAINwAIIAkgOjcAAAJAIARBEUkNACAPKQAQITogCSAPKQAYNwAYIAkgOjcAECAEQRBrQRFIDQAgD0EQaiECIAlBIGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgBkkNAAsLIAYgCmshAiAFIAc2AswCIAYgC2sgCkkEQCAKIAYgF2tLDQ0gIiAiIAIgC2siB2oiBCASak8EQCASRQ0DIAYgBCAS/AoAAAwDC0EAIAdrIgIEQCAGIAQgAvwKAAALIAcgEmohEiAGIAdrIQYgCyECCyAKQRBPBEAgAikAACE6IAYgAikACDcACCAGIDo3AAAgEkERSA0CIAYgEmohByAGQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAILAkAgCkEHTQRAIAYgAi0AADoAACAGIAItAAE6AAEgBiACLQACOgACIAYgAi0AAzoAAyAGIAIgCkECdCIEQeAaaigCAGoiAigAADYABCACIARBgBtqKAIAayECDAELIAYgAikAADcAAAsgEkEJSQ0BIAYgEmohByAGQQhqIgQgAkEIaiICa0EPTARAA0AgBCACKQAANwAAIAJBCGohAiAE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",ng={BYTE:1,ASCII:2,SHORT:3,LONG:4,RATIONAL:5,SBYTE:6,UNDEFINED:7,SSHORT:8,SLONG:9,SRATIONAL:10,FLOAT:11,DOUBLE:12,IFD:13,LONG8:16,SLONG8:17,IFD8:18},hg={NewSubfileType:{tag:254,type:ng.LONG,eager:!0},SubfileType:{tag:255,type:ng.SHORT,eager:!0},ImageWidth:{tag:256,type:ng.SHORT,eager:!0},ImageLength:{tag:257,type:ng.SHORT,eager:!0},BitsPerSample:{tag:258,type:ng.SHORT,isArray:!0,eager:!0},Compression:{tag:259,type:ng.SHORT,eager:!0},PhotometricInterpretation:{tag:262,type:ng.SHORT,eager:!0},Threshholding:{tag:263,type:ng.SHORT},CellWidth:{tag:264,type:ng.SHORT},CellLength:{tag:265,type:ng.SHORT},FillOrder:{tag:266,type:ng.SHORT},DocumentName:{tag:269,type:ng.ASCII},ImageDescription:{tag:270,type:ng.ASCII},Make:{tag:271,type:ng.ASCII},Model:{tag:272,type:ng.ASCII},StripOffsets:{tag:273,type:ng.SHORT,isArray:!0},Orientation:{tag:274,type:ng.SHORT},SamplesPerPixel:{tag:277,type:ng.SHORT,eager:!0},RowsPerStrip:{tag:278,type:ng.SHORT,eager:!0},StripByteCounts:{tag:279,type:ng.LONG,isArray:!0},MinSampleValue:{tag:280,type:ng.SHORT,isArray:!0},MaxSampleValue:{tag:281,type:ng.SHORT,isArray:!0},XResolution:{tag:282,type:ng.RATIONAL},YResolution:{tag:283,type:ng.RATIONAL},PlanarConfiguration:{tag:284,type:ng.SHORT,eager:!0},PageName:{tag:285,type:ng.ASCII},XPosition:{tag:286,type:ng.RATIONAL},YPosition:{tag:287,type:ng.RATIONAL},FreeOffsets:{tag:288,type:ng.LONG},FreeByteCounts:{tag:289,type:ng.LONG},GrayResponseUnit:{tag:290,type:ng.SHORT},GrayResponseCurve:{tag:291,type:ng.SHORT,isArray:!0},T4Options:{tag:292,type:ng.LONG},T6Options:{tag:293,type:ng.LONG},ResolutionUnit:{tag:296,type:ng.SHORT},PageNumber:{tag:297,type:ng.SHORT,isArray:!0},TransferFunction:{tag:301,type:ng.SHORT,isArray:!0},Software:{tag:305,type:ng.ASCII},DateTime:{tag:306,type:ng.ASCII},Artist:{tag:315,type:ng.ASCII},HostComputer:{tag:316,type:ng.ASCII},Predictor:{tag:317,type:ng.SHORT},WhitePoint:{tag:318,type:ng.RATIONAL,isArray:!0},PrimaryChromaticities:{tag:319,type:ng.RATIONAL,isArray:!0},ColorMap:{tag:320,type:ng.SHORT,isArray:!0},HalftoneHints:{tag:321,type:ng.SHORT,isArray:!0},TileWidth:{tag:322,type:ng.SHORT,eager:!0},TileLength:{tag:323,type:ng.SHORT,eager:!0},TileOffsets:{tag:324,type:ng.LONG,isArray:!0},TileByteCounts:{tag:325,type:ng.SHORT,isArray:!0},InkSet:{tag:332,type:ng.SHORT},InkNames:{tag:333,type:ng.ASCII},NumberOfInks:{tag:334,type:ng.SHORT},DotRange:{tag:336,type:ng.BYTE,isArray:!0},TargetPrinter:{tag:337,type:ng.ASCII},ExtraSamples:{tag:338,type:ng.BYTE,isArray:!0,eager:!0},SampleFormat:{tag:339,type:ng.SHORT,isArray:!0,eager:!0},SMinSampleValue:{tag:340,isArray:!0},SMaxSampleValue:{tag:341,isArray:!0},TransferRange:{tag:342,type:ng.SHORT,isArray:!0},JPEGProc:{tag:512,type:ng.SHORT},JPEGInterchangeFormat:{tag:513,type:ng.LONG},JPEGInterchangeFormatLngth:{tag:514,type:ng.LONG},JPEGRestartInterval:{tag:515,type:ng.SHORT},JPEGLosslessPredictors:{tag:517,type:ng.SHORT,isArray:!0},JPEGPointTransforms:{tag:518,type:ng.SHORT,isArray:!0},JPEGQTables:{tag:519,type:ng.LONG,isArray:!0},JPEGDCTables:{tag:520,type:ng.LONG,isArray:!0},JPEGACTables:{tag:521,type:ng.LONG,isArray:!0},YCbCrCoefficients:{tag:529,type:ng.RATIONAL,isArray:!0},YCbCrSubSampling:{tag:530,type:ng.SHORT,isArray:!0},YCbCrPositioning:{tag:531,type:ng.SHORT},ReferenceBlackWhite:{tag:532,type:ng.LONG,isArray:!0},Copyright:{tag:33432,type:ng.ASCII},BadFaxLines:{tag:326},CleanFaxData:{tag:327},ClipPath:{tag:343},ConsecutiveBadFaxLines:{tag:328},Decode:{tag:433},DefaultImageColor:{tag:434},Indexed:{tag:346},JPEGTables:{tag:347,isArray:!0,eager:!0},StripRowCounts:{tag:559,isArray:!0},SubIFDs:{tag:330,isArray:!0},XClipPathUnits:{tag:344},YClipPathUnits:{tag:345},ApertureValue:{tag:37378},ColorSpace:{tag:40961},DateTimeDigitized:{tag:36868},DateTimeOriginal:{tag:36867},ExifIFD:{tag:34665,name:"Exif IFD",type:ng.LONG},ExifVersion:{tag:36864},ExposureTime:{tag:33434},FileSource:{tag:41728},Flash:{tag:37385},FlashpixVersion:{tag:40960},FNumber:{tag:33437},ImageUniqueID:{tag:42016},LightSource:{tag:37384},MakerNote:{tag:37500},ShutterSpeedValue:{tag:37377},UserComment:{tag:37510},IPTC:{tag:33723},CZ_LSMINFO:{tag:34412},ICCProfile:{tag:34675,name:"ICC Profile"},XMP:{tag:700},GDAL_METADATA:{tag:42112},GDAL_NODATA:{tag:42113,type:ng.ASCII,eager:!0},Photoshop:{tag:34377},ModelPixelScale:{tag:33550,type:ng.DOUBLE,isArray:!0,eager:!0},ModelTiepoint:{tag:33922,type:ng.DOUBLE,isArray:!0,eager:!0},ModelTransformation:{tag:34264,type:ng.DOUBLE,isArray:!0,eager:!0},GeoKeyDirectory:{tag:34735,type:ng.SHORT,isArray:!0,eager:!0},GeoDoubleParams:{tag:34736,type:ng.DOUBLE,isArray:!0,eager:!0},GeoAsciiParams:{tag:34737,type:ng.ASCII,eager:!0},LercParameters:{tag:50674,eager:!0}},wg={},yg={};function Gg(A,I,g,B=!1,C=!1){wg[I]=A,yg[A]={tag:A,name:I,type:"string"==typeof g?ng[g]:g,isArray:B,eager:C}}for(const[A,I]of Object.entries(hg)){const g=I;Gg(g.tag,g.name||A,g.type,g.isArray,g.eager)}const Sg=1,cg=0,Ng=1,dg=2,lg={1024:"GTModelTypeGeoKey",1025:"GTRasterTypeGeoKey",1026:"GTCitationGeoKey",2048:"GeographicTypeGeoKey",2049:"GeogCitationGeoKey",2050:"GeogGeodeticDatumGeoKey",2051:"GeogPrimeMeridianGeoKey",2052:"GeogLinearUnitsGeoKey",2053:"GeogLinearUnitSizeGeoKey",2054:"GeogAngularUnitsGeoKey",2055:"GeogAngularUnitSizeGeoKey",2056:"GeogEllipsoidGeoKey",2057:"GeogSemiMajorAxisGeoKey",2058:"GeogSemiMinorAxisGeoKey",2059:"GeogInvFlatteningGeoKey",2060:"GeogAzimuthUnitsGeoKey",2061:"GeogPrimeMeridianLongGeoKey",2062:"GeogTOWGS84GeoKey",3072:"ProjectedCSTypeGeoKey",3073:"PCSCitationGeoKey",3074:"ProjectionGeoKey",3075:"ProjCoordTransGeoKey",3076:"ProjLinearUnitsGeoKey",3077:"ProjLinearUnitSizeGeoKey",3078:"ProjStdParallel1GeoKey",3079:"ProjStdParallel2GeoKey",3080:"ProjNatOriginLongGeoKey",3081:"ProjNatOriginLatGeoKey",3082:"ProjFalseEastingGeoKey",3083:"ProjFalseNorthingGeoKey",3084:"ProjFalseOriginLongGeoKey",3085:"ProjFalseOriginLatGeoKey",3086:"ProjFalseOriginEastingGeoKey",3087:"ProjFalseOriginNorthingGeoKey",3088:"ProjCenterLongGeoKey",3089:"ProjCenterLatGeoKey",3090:"ProjCenterEastingGeoKey",3091:"ProjCenterNorthingGeoKey",3092:"ProjScaleAtNatOriginGeoKey",3093:"ProjScaleAtCenterGeoKey",3094:"ProjAzimuthAngleGeoKey",3095:"ProjStraightVertPoleLongGeoKey",3096:"ProjRectifiedGridAngleGeoKey",4096:"VerticalCSTypeGeoKey",4097:"VerticalCitationGeoKey",4098:"VerticalDatumGeoKey",4099:"VerticalUnitsGeoKey"},kg={};for(const[A,I]of Object.entries(lg))kg[I]=parseInt(A,10);const Fg=new class{init(){return og||(og="undefined"!=typeof fetch?fetch(`data:application/wasm;base64,${Dg}`).then((A=>A.arrayBuffer())).then((A=>WebAssembly.instantiate(A,rg))).then(this._init):WebAssembly.instantiate(Buffer.from(Dg,"base64"),rg).then(this._init),og)}_init(A){ag=A.instance,rg.env.emscripten_notify_memory_growth(0)}decode(A,I=0){if(!ag)throw new Error("ZSTDDecoder: Await .init() before decoding.");const g=A.byteLength,B=ag.exports.malloc(g);sg.set(A,B),I=I||Number(ag.exports.ZSTD_findDecompressedSize(B,g));const C=ag.exports.malloc(I),Q=ag.exports.ZSTD_decompress(C,I,B,g),E=sg.slice(C,C+Q);return ag.exports.free(B),ag.exports.free(C),E}};var Rg=Object.freeze({__proto__:null,zstd:Fg,default:class extends i{decodeBlock(A){const I=this.parameters.LercParameters?.[Sg];let g=A;switch(I){case cg:break;case Ng:g=Cg(new Uint8Array(g)).buffer;break;case dg:g=Fg.decode(new Uint8Array(g)).buffer;break;default:throw new Error(`Unsupported LERC additional compression method identifier: ${I}`)}return tg.decode(g,{returnPixelInterleavedDims:1===this.parameters.planarConfiguration}).pixels[0].buffer}}});let Lg,Ug,fg,Yg;const Kg={env:{emscripten_notify_memory_growth:A=>{fg=new Uint8Array(Ug.exports.memory.buffer),Yg=new DataView(fg.buffer)}}};const ug="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QQhyIQBBACEDA0AgACADTQ0DIANBQGshAwwACwALQWwhCiAOIA5B/ABqIA5B+ABqIAUgBhAGIgJBiH9LDQEgDigCeCIDIARLDQEgACAOIA4oAnwgByAIIAMgDRAlIAEgADYCACACIQoMAQtBbCEKCyAOQYABaiQAIAoLcAEEfyAAQgA3AgAgAgRAIAFBCmohBiABKAIEIQRBACECQQAhAQNAIAEgBHZFBEAgAiAGIAFBA3RqLQAAIgUgAiAFSxshAiABQQFqIQEgAyAFQRZLaiEDDAELCyAAIAI2AgQgACADQQggBGt0NgIACwuuAQEEfyABIAIoAgQiAyABKAIEaiIENgIEIAAgA0ECdEGwGWooAgAgASgCAEEAIARrdnE2AgACQCAEQSFPBEAgAUGwGjYCCAwBCyABKAIIIgMgASgCEE8EQCABEAwMAQsgAyABKAIMIgVGDQAgASADIAMgBWsgBEEDdiIGIAMgBmsgBUkbIgNrIgU2AgggASAEIANBA3RrNgIEIAEgBSgAADYCAAsgACACQQhqNgIEC40CAgN/AX4gACACaiEEAkACQCACQQhOBEAgACABayICQXlIDQELA0AgACAETw0CIAAgAS0AADoAACAAQQFqIQAgAUEBaiEBDAALAAsCQAJAIAJBb0sNACAAIARBIGsiAksNACABKQAAIQYgACABKQAINwAIIAAgBjcAACACIABrIgVBEU4EQCAAQRBqIQAgASEDA0AgAykAECEGIAAgAykAGDcACCAAIAY3AAAgAykAICEGIAAgAykAKDcAGCAAIAY3ABAgA0EgaiEDIABBIGoiACACSQ0ACwsgASAFaiEBDAELIAAhAgsDQCACIARPDQEgAiABLQAAOgAAIAJBAWohAiABQQFqIQEMAAsACwvfAQEGf0G6fyEKAkAgAigCBCIIIAIoAgAiCWoiDSABIABrSw0AQWwhCiAJIAQgAygCACILa0sNACAAIAlqIgQgAigCCCIMayECIAAgAUEgayIBIAsgCUEAEDMgAyAJIAtqNgIAAkACQCAEIAVrIAxPBEAgAiEFDAELIAwgBCAGa0sNAiAHIAcgAiAFayIDaiICIAhqTwRAIAhFDQIgBCACIAj8CgAADAILQQAgA2siAARAIAQgAiAA/AoAAAsgAyAIaiEIIAQgA2shBAsgBCABIAUgCEEBEDML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",Mg=new class{init(){return Lg||(Lg="undefined"!=typeof fetch?fetch(`data:application/wasm;base64,${ug}`).then((A=>A.arrayBuffer())).then((A=>WebAssembly.instantiate(A,Kg))).then(this._init):WebAssembly.instantiate(Buffer.from(ug,"base64"),Kg).then(this._init),Lg)}_init(A){Ug=A.instance,Kg.env.emscripten_notify_memory_growth(0)}decode(A,I=0){if(!Ug)throw new Error("ZSTDDecoder: Await .init() before decoding.");const g=A.byteLength,B=Ug.exports.malloc(g);if(fg.set(A,B),0===I&&(I=Number(Ug.exports.ZSTD_findDecompressedSize(B,g))),-1===I){Ug.exports.free(B);const I=[];for(const g of this.decodeStreaming([A]))I.push(g);if(1===I.length)return I[0];const g=I.reduce(((A,I)=>A+I.byteLength),0),C=new Uint8Array(g);let Q=0;for(const A of I)C.set(A,Q),Q+=A.byteLength;return C}const C=Ug.exports.malloc(I),Q=Ug.exports.ZSTD_decompress(C,I,B,g),E=fg.slice(C,C+Q);return Ug.exports.free(B),Ug.exports.free(C),E}*decodeStreaming(A){if(!Ug)throw new Error("ZSTDDecoder: Await .init() before decoding.");const I=Ug.exports.ZSTD_DStreamInSize(),g=Ug.exports.malloc(I),B=Ug.exports.ZSTD_DStreamOutSize(),C=Ug.exports.malloc(B),Q=Ug.exports.ZSTD_createDCtx(),E=Ug.exports.malloc(12),i=Ug.exports.malloc(12);let e=0;for(const I of A){const A=Ug.exports.malloc(I.byteLength);for(fg.set(I,A),Yg.setInt32(E,A,!0),Yg.setInt32(E+4,I.byteLength,!0),Yg.setInt32(E+4+4,0,!0);Yg.getUint32(E+4+4,!0)<Yg.getUint32(E+4,!0);){Yg.setInt32(i,C,!0),Yg.setInt32(i+4,B,!0),Yg.setInt32(i+4+4,0,!0),e=Ug.exports.ZSTD_decompressStream(Q,i,E);const A=Yg.getUint32(i+4+4,!0);yield fg.slice(C,C+A)}Ug.exports.free(A)}if(Ug.exports.ZSTD_freeDCtx(Q),Ug.exports.free(g),Ug.exports.free(C),Ug.exports.free(E),Ug.exports.free(i),0!==e)throw new Error("Incomplete stream, more data expected.")}};var Jg=Object.freeze({__proto__:null,zstd:Mg,default:class extends i{decodeBlock(A){return Mg.decode(new Uint8Array(A)).buffer}}});var Hg=Object.freeze({__proto__:null,default:class extends i{constructor(A){if(super(A),"undefined"==typeof createImageBitmap)throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");if("undefined"==typeof document&&"undefined"==typeof OffscreenCanvas)throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available")}async decodeBlock(A){const I=new Blob([A]),g=await createImageBitmap(I);let B;"undefined"!=typeof document?(B=document.createElement("canvas"),B.width=g.width,B.height=g.height):B=new OffscreenCanvas(g.width,g.height);const C=B.getContext("2d");C.drawImage(g,0,0);const Q=C.getImageData(0,0,g.width,g.height).data,E=this.parameters.samplesPerPixel||4;if(4===E)return Q.buffer;if(3===E){const A=new Uint8ClampedArray(g.width*g.height*3);for(let I=0,g=0;I<A.length;I+=3,g+=4)A[I]=Q[g],A[I+1]=Q[g+1],A[I+2]=Q[g+2];return A.buffer}throw new Error(`Unsupported SamplesPerPixel value: ${E}`)}}});';
  return new Worker(typeof Buffer !== "undefined" ? "data:application/javascript;base64," + Buffer.from(source, "binary").toString("base64") : URL.createObjectURL(new Blob([source], { type: "application/javascript" })));
}
const defaultPoolSize = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 2 : 2;
class WorkerWrapper {
  /**
   * @param {Worker} worker the worker to wrap
   */
  constructor(worker) {
    this.worker = worker;
    this.worker.addEventListener("message", (e) => this._onWorkerMessage(e));
    this.jobIdCounter = 0;
    this.jobs = /* @__PURE__ */ new Map();
  }
  /**
   * Get a new job id
   * @returns {Number} the new job id
   */
  newJobId() {
    return this.jobIdCounter++;
  }
  /**
   * Get the number of jobs currently running
   * @returns {Number} the number of jobs currently running
   */
  getJobCount() {
    return this.jobs.size;
  }
  /** @param {MessageEvent} e */
  _onWorkerMessage(e) {
    const _a = e.data, { jobId, error: error2 } = _a, result = __objRest(_a, ["jobId", "error"]);
    const job = this.jobs.get(jobId);
    this.jobs.delete(jobId);
    if (error2) {
      job.reject(new Error(error2));
    } else {
      job.resolve(result);
    }
  }
  /**
   * Submit a job to the worker
   * @param {Record<string, unknown>} message the message to send to the worker. A "jobId" property will be added to this object.
   * @param {Array<Transferable>} [transferables] an optional array of transferable objects to transfer to the worker.
   * @returns {Promise<{decoded: ArrayBuffer}>} a promise that gets resolved/rejected when a message with the same jobId is
   * received from the worker.
   */
  submitJob(message, transferables) {
    const jobId = this.newJobId();
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    this.jobs.set(jobId, { resolve, reject });
    if (transferables) {
      this.worker.postMessage(__spreadProps(__spreadValues({}, message), { jobId }), transferables);
    } else {
      this.worker.postMessage(__spreadProps(__spreadValues({}, message), { jobId }));
    }
    return promise;
  }
  terminate() {
    this.worker.terminate();
  }
}
const finalizationRegistry = new FinalizationRegistry((worker) => {
  worker.terminate();
});
class Pool {
  /**
   * @constructor
   * @param {Number} [size] The size of the pool. Defaults to the number of CPUs
   *                      available. When this parameter is `null` or 0, then the
   *                      decoding will be done in the main thread.
   * @param {function(): Worker} [createWorker] A function that creates the decoder worker.
   * Defaults to a worker with all decoders that ship with geotiff.js. The `createWorker()`
   * function is expected to return a `Worker` compatible with Web Workers. For code that
   * runs in Node, [web-worker](https://www.npmjs.com/package/web-worker) is a good choice.
   *
   * A worker that uses a custom lzw decoder would look like this `my-custom-worker.js` file:
   * ```js
   * import { addDecoder, getDecoder } from 'geotiff';
   * addDecoder(5, () => import ('./my-custom-lzw').then((m) => m.default));
   * self.addEventListener('message', async (e) => {
   *   const { id, fileDirectory, buffer } = e.data;
   *   const decoder = await getDecoder(fileDirectory);
   *   const decoded = await decoder.decode(fileDirectory, buffer);
   *   self.postMessage({ decoded, id }, [decoded]);
   * });
   * ```
   * The way the above code is built into a worker by the `createWorker()` function
   * depends on the used bundler. For most bundlers, something like this will work:
   * ```js
   * function createWorker() {
   *   return new Worker(new URL('./my-custom-worker.js', import.meta.url));
   * }
   * ```
   */
  constructor(size = defaultPoolSize, createWorker = create) {
    this.workerWrappers = null;
    if (size) {
      this.workerWrappers = (() => __async(this, null, function* () {
        const workerWrappers = [];
        for (let i = 0; i < size; i++) {
          const worker = createWorker();
          const wrapper = new WorkerWrapper(worker);
          workerWrappers.push(wrapper);
          finalizationRegistry.register(wrapper, worker, wrapper);
        }
        return workerWrappers;
      }))();
    }
  }
  /**
   * @param {number} compression
   * @param {import('./compression/basedecoder.js').BaseDecoderParameters} decoderParameters
   * @returns {import('./geotiff.js').DecoderWorker}
   */
  bindParameters(compression, decoderParameters) {
    return {
      decode: (buffer) => __async(this, null, function* () {
        if (preferWorker(compression) && this.workerWrappers) {
          const workerWrapper = (yield this.workerWrappers).reduce((a, b) => {
            return a.getJobCount() < b.getJobCount() ? a : b;
          });
          const { decoded } = yield workerWrapper.submitJob({ compression, decoderParameters, buffer }, [buffer]);
          return decoded;
        } else {
          const decoder = yield getDecoder(compression, decoderParameters);
          return decoder.decode(buffer);
        }
      })
    };
  }
  destroy() {
    return __async(this, null, function* () {
      if (this.workerWrappers) {
        (yield this.workerWrappers).forEach((worker) => {
          worker.terminate();
        });
        this.workerWrappers = null;
      }
    });
  }
}
const CRLFCRLF = "\r\n\r\n";
function itemsToObject(items) {
  if (typeof Object.fromEntries !== "undefined") {
    return Object.fromEntries(items);
  }
  const obj = {};
  for (const [key, value] of items) {
    obj[key.toLowerCase()] = value;
  }
  return obj;
}
function parseHeaders(text) {
  const items = text.split("\r\n").map((line) => {
    const kv = (
      /** @type {[string, string]} */
      line.split(":").map((str) => str.trim())
    );
    kv[0] = kv[0].toLowerCase();
    return kv;
  });
  return itemsToObject(items);
}
function parseContentType(rawContentType) {
  if (!rawContentType) {
    return { type: null, params: {} };
  }
  const [type, ...rawParams] = rawContentType.split(";").map((s) => s.trim());
  const paramsItems = (
    /** @type {Array<[string, string]>} */
    rawParams.map((param) => param.split("="))
  );
  return { type, params: itemsToObject(paramsItems) };
}
function parseContentRange(rawContentRange) {
  let start = NaN;
  let end = NaN;
  let total = NaN;
  if (rawContentRange) {
    [, start, end, total] = (rawContentRange.match(/bytes (\d+)-(\d+)\/(\d+)/) || []).map(Number);
  }
  return { start, end, total };
}
function parseByteRanges(responseArrayBuffer, boundary) {
  let offset = -1;
  const decoder = new TextDecoder("ascii");
  const out = [];
  const startBoundary = `--${boundary}`;
  const endBoundary = `${startBoundary}--`;
  for (let i = 0; i < 10; ++i) {
    const text = decoder.decode(new Uint8Array(responseArrayBuffer, i, startBoundary.length));
    if (text === startBoundary) {
      offset = i;
    }
  }
  if (offset === -1) {
    throw new Error("Could not find initial boundary");
  }
  while (offset < responseArrayBuffer.byteLength) {
    const text = decoder.decode(new Uint8Array(responseArrayBuffer, offset, Math.min(startBoundary.length + 1024, responseArrayBuffer.byteLength - offset)));
    if (text.length === 0 || text.startsWith(endBoundary)) {
      break;
    }
    if (!text.startsWith(startBoundary)) {
      throw new Error("Part does not start with boundary");
    }
    const innerText = text.substr(startBoundary.length + 2);
    if (innerText.length === 0) {
      break;
    }
    const endOfHeaders = innerText.indexOf(CRLFCRLF);
    const headers = parseHeaders(innerText.substr(0, endOfHeaders));
    const { start, end, total } = parseContentRange(headers["content-range"]);
    const startOfData = offset + startBoundary.length + endOfHeaders + CRLFCRLF.length;
    const length = end + 1 - start;
    out.push({
      headers,
      data: responseArrayBuffer.slice(startOfData, startOfData + length),
      offset: start,
      length,
      fileSize: total
    });
    offset = startOfData + length + 4;
  }
  return out;
}
class BaseSource {
  /**
   * @param {Array<Slice>} slices
   * @param {AbortSignal} [signal]
   * @returns {Promise<ArrayBufferLike[]>}
   */
  fetch(slices, signal) {
    return __async(this, null, function* () {
      return Promise.all(slices.map((slice) => __async(this, null, function* () {
        return (yield this.fetchSlice(slice, signal)).data;
      })));
    });
  }
  /**
   * @param {Slice} slice
   * @param {AbortSignal} [_signal]
   * @returns {Promise<SliceWithData>}
   */
  fetchSlice(slice, _signal) {
    return __async(this, null, function* () {
      throw new Error(`fetching of slice ${slice} not possible, not implemented`);
    });
  }
  /**
   * Returns the filesize if already determined and null otherwise
   * @returns {number|null}
   */
  get fileSize() {
    return null;
  }
  close() {
    return __async(this, null, function* () {
    });
  }
}
function wait(milliseconds) {
  return __async(this, null, function* () {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  });
}
function zip(a, b) {
  const A = Array.isArray(a) ? a : Array.from(a);
  const B = Array.isArray(b) ? b : Array.from(b);
  return A.map((k, i) => [k, B[i]]);
}
class AbortError extends Error {
  constructor(...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AbortError);
    }
    this.name = "AbortError";
    this.signal = void 0;
  }
}
class CustomAggregateError extends Error {
  constructor(errors, message) {
    super(message);
    this.errors = errors;
    this.message = message;
    this.name = "AggregateError";
  }
}
const AggregateError = CustomAggregateError;
class Block {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} data
   */
  constructor(offset, length, data) {
    this.offset = offset;
    this.length = length;
    this.data = data;
  }
  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
}
class BlockGroup {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(offset, length, blockIds) {
    this.offset = offset;
    this.length = length;
    this.blockIds = blockIds;
  }
}
class BlockedSource extends BaseSource {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {Object} options
   * @param {number} [options.blockSize=65536] Block size.
   * @param {number} [options.cacheSize=100] The number of blocks to cache.
   */
  constructor(source, { blockSize = 65536, cacheSize = 100 } = {}) {
    super();
    this.source = source;
    this.blockSize = blockSize;
    this.blockCache = new QuickLRU({
      maxSize: cacheSize,
      onEviction: (blockId, block) => {
        this.evictedBlocks.set(blockId, block);
      }
    });
    this.evictedBlocks = /* @__PURE__ */ new Map();
    this.blockRequests = /* @__PURE__ */ new Map();
    this.blockIdsToFetch = /* @__PURE__ */ new Set();
    this.abortedBlockIds = /* @__PURE__ */ new Set();
  }
  get fileSize() {
    return this.source.fileSize;
  }
  /**
   * @param {import("./basesource.js").Slice[]} slices
   * @param {AbortSignal} [signal]
   * @return {Promise<ArrayBuffer[]>}
   */
  fetch(slices, signal) {
    return __async(this, null, function* () {
      const blockRequests = [];
      const missingBlockIds = [];
      const allBlockIds = [];
      this.evictedBlocks.clear();
      for (const { offset, length } of slices) {
        let top = offset + length;
        const { fileSize } = this;
        if (fileSize !== null) {
          top = Math.min(top, fileSize);
        }
        const firstBlockOffset = Math.floor(offset / this.blockSize) * this.blockSize;
        for (let current = firstBlockOffset; current < top; current += this.blockSize) {
          const blockId = Math.floor(current / this.blockSize);
          if (!this.blockCache.has(blockId) && !this.blockRequests.has(blockId)) {
            this.blockIdsToFetch.add(blockId);
            missingBlockIds.push(blockId);
          }
          if (this.blockRequests.has(blockId)) {
            blockRequests.push(this.blockRequests.get(blockId));
          }
          allBlockIds.push(blockId);
        }
      }
      yield wait();
      this.fetchBlocks(signal);
      const missingRequests = [];
      for (const blockId of missingBlockIds) {
        if (this.blockRequests.has(blockId)) {
          missingRequests.push(this.blockRequests.get(blockId));
        }
      }
      yield Promise.allSettled(blockRequests);
      yield Promise.allSettled(missingRequests);
      const abortedBlockRequests = [];
      const abortedBlockIds = allBlockIds.filter((id) => this.abortedBlockIds.has(id) || !this.blockCache.has(id));
      abortedBlockIds.forEach((id) => this.blockIdsToFetch.add(id));
      if (abortedBlockIds.length > 0 && signal && !signal.aborted) {
        this.fetchBlocks();
        for (const blockId of abortedBlockIds) {
          const block = this.blockRequests.get(blockId);
          if (!block) {
            throw new Error(`Block ${blockId} is not in the block requests`);
          }
          abortedBlockRequests.push(block);
        }
        yield Promise.allSettled(abortedBlockRequests);
      }
      if (signal && signal.aborted) {
        throw new AbortError("Request was aborted");
      }
      const blocks = allBlockIds.map((id) => this.blockCache.get(id) || this.evictedBlocks.get(id));
      const failedBlocks = blocks.filter((i) => !i);
      if (failedBlocks.length) {
        throw new AggregateError(failedBlocks, "Request failed");
      }
      const requiredBlocks = new Map(zip(allBlockIds, blocks));
      return this.readSliceData(slices, requiredBlocks);
    });
  }
  /**
   * @param {AbortSignal} [signal]
   */
  fetchBlocks(signal) {
    if (this.blockIdsToFetch.size > 0) {
      const groups = this.groupBlocks(this.blockIdsToFetch);
      const groupRequests = groups.map((group) => __async(this, null, function* () {
        return __spreadValues(__spreadValues({}, group), yield this.source.fetchSlice(group, signal));
      }));
      for (let groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
        const group = groups[groupIndex];
        for (const blockId of group.blockIds) {
          this.blockRequests.set(blockId, (() => __async(this, null, function* () {
            try {
              const response = (yield Promise.all(groupRequests))[groupIndex];
              const blockOffset = blockId * this.blockSize;
              const o = blockOffset - response.offset;
              const t = Math.min(o + this.blockSize, response.data.byteLength);
              const data = response.data.slice(o, t);
              const block = new Block(
                blockOffset,
                data.byteLength,
                /** @type {ArrayBuffer} */
                data
              );
              this.blockCache.set(blockId, block);
              this.abortedBlockIds.delete(blockId);
            } catch (err) {
              if (err instanceof AbortError && err.name === "AbortError") {
                err.signal = signal;
                this.blockCache.delete(blockId);
                this.abortedBlockIds.add(blockId);
              } else {
                throw err;
              }
            } finally {
              this.blockRequests.delete(blockId);
            }
          }))());
        }
      }
      this.blockIdsToFetch.clear();
    }
  }
  /**
   *
   * @param {Set<number>} blockIds
   * @returns {BlockGroup[]}
   */
  groupBlocks(blockIds) {
    const sortedBlockIds = Array.from(blockIds).sort((a, b) => a - b);
    if (sortedBlockIds.length === 0) {
      return [];
    }
    let current = [];
    let lastBlockId = null;
    const groups = [];
    for (const blockId of sortedBlockIds) {
      if (lastBlockId === null || lastBlockId + 1 === blockId) {
        current.push(blockId);
        lastBlockId = blockId;
      } else {
        groups.push(new BlockGroup(current[0] * this.blockSize, current.length * this.blockSize, current));
        current = [blockId];
        lastBlockId = blockId;
      }
    }
    groups.push(new BlockGroup(current[0] * this.blockSize, current.length * this.blockSize, current));
    return groups;
  }
  /**
   * @param {import("./basesource.js").Slice[]} slices
   * @param {Map<number, Block>} blocks
   * @returns {ArrayBuffer[]}
   */
  readSliceData(slices, blocks) {
    return slices.map((slice) => {
      let top = slice.offset + slice.length;
      if (this.fileSize !== null) {
        top = Math.min(this.fileSize, top);
      }
      const blockIdLow = Math.floor(slice.offset / this.blockSize);
      const blockIdHigh = Math.floor((top - 1) / this.blockSize);
      const sliceData = new ArrayBuffer(slice.length);
      const sliceView = new Uint8Array(sliceData);
      for (let blockId = blockIdLow; blockId <= blockIdHigh; ++blockId) {
        const block = blocks.get(blockId);
        if (!block) {
          continue;
        }
        const delta = block.offset - slice.offset;
        const topDelta = block.top - top;
        let blockInnerOffset = 0;
        let rangeInnerOffset = 0;
        let usedBlockLength;
        if (delta < 0) {
          blockInnerOffset = -delta;
        } else if (delta > 0) {
          rangeInnerOffset = delta;
        }
        if (topDelta < 0) {
          usedBlockLength = block.length - blockInnerOffset;
        } else {
          usedBlockLength = top - block.offset - blockInnerOffset;
        }
        const blockView = new Uint8Array(block.data, blockInnerOffset, usedBlockLength);
        sliceView.set(blockView, rangeInnerOffset);
      }
      return sliceData;
    });
  }
}
class BaseResponse {
  /**
   * Returns whether the response has an ok'ish status code
   */
  get ok() {
    return this.status >= 200 && this.status <= 299;
  }
  /**
   * Returns the status code of the response
   * @returns {number} the status code
   */
  get status() {
    throw new Error("not implemented");
  }
  /**
   * Returns the value of the specified header
   * @param {string} _headerName the header name
   * @returns {string|undefined} the header value
   */
  getHeader(_headerName) {
    throw new Error("not implemented");
  }
  /**
   * @returns {Promise<ArrayBuffer>} the response data of the request
   */
  getData() {
    return __async(this, null, function* () {
      throw new Error("not implemented");
    });
  }
}
class BaseClient {
  /** @param {string} url */
  constructor(url) {
    this.url = url;
  }
  /**
   * Send a request with the options
   * @param {RequestInit} [_options={}]
   * @returns {Promise<BaseResponse>}
   */
  request(_options) {
    return __async(this, null, function* () {
      throw new Error("request is not implemented");
    });
  }
}
class FetchResponse extends BaseResponse {
  /**
   * BaseResponse facade for fetch API Response
   * @param {Response} response
   */
  constructor(response) {
    super();
    this.response = response;
  }
  get status() {
    return this.response.status;
  }
  /**
   * @param {string} name
   * @returns {string|undefined}
   */
  getHeader(name) {
    return this.response.headers.get(name) || void 0;
  }
  getData() {
    return __async(this, null, function* () {
      const data = this.response.arrayBuffer ? yield this.response.arrayBuffer() : (yield (
        /** @type {*} */
        this.response.buffer()
      )).buffer;
      return data;
    });
  }
}
class FetchClient extends BaseClient {
  /**
   * @param {string} url
   * @param {RequestCredentials} [credentials]
   */
  constructor(url, credentials) {
    super(url);
    this.credentials = credentials;
  }
  /**
   * @param {RequestInit} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  request() {
    return __async(this, arguments, function* ({ headers, signal } = {}) {
      const response = yield fetch(this.url, {
        headers,
        credentials: this.credentials,
        signal
      });
      return new FetchResponse(response);
    });
  }
}
class XHRResponse extends BaseResponse {
  /**
   * BaseResponse facade for XMLHttpRequest
   * @param {XMLHttpRequest} xhr
   * @param {ArrayBuffer} data
   */
  constructor(xhr, data) {
    super();
    this.xhr = xhr;
    this.data = data;
  }
  get status() {
    return this.xhr.status;
  }
  /**
   * @param {string} name
   * @returns {string|undefined}
   */
  getHeader(name) {
    return this.xhr.getResponseHeader(name) || void 0;
  }
  getData() {
    return __async(this, null, function* () {
      return this.data;
    });
  }
}
class XHRClient extends BaseClient {
  /**
   * @param {Object<string, string>} headers
   * @param {AbortSignal} [signal]
   * @returns {Promise<XHRResponse>}
   */
  constructRequest(headers, signal) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", this.url);
      xhr.responseType = "arraybuffer";
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
      xhr.onload = () => {
        const data = xhr.response;
        resolve(new XHRResponse(xhr, data));
      };
      xhr.onerror = reject;
      xhr.onabort = () => reject(new AbortError("Request aborted"));
      xhr.send();
      if (signal) {
        if (signal.aborted) {
          xhr.abort();
        }
        signal.addEventListener("abort", () => xhr.abort());
      }
    });
  }
  request() {
    return __async(this, arguments, function* ({ headers = {}, signal = void 0 } = {}) {
      const response = yield this.constructRequest(headers, signal);
      return response;
    });
  }
}
const fs = {};
class HttpResponse extends BaseResponse {
  /**
   * BaseResponse facade for node HTTP/HTTPS API Response
   * @param {import('http').IncomingMessage} response
   * @param {Promise<ArrayBuffer>} dataPromise
   */
  constructor(response, dataPromise) {
    super();
    this.response = response;
    this.dataPromise = dataPromise;
  }
  get status() {
    return (
      /** @type {number} */
      this.response.statusCode
    );
  }
  /**
   * @param {string} name
   * @returns {string|undefined}
   */
  getHeader(name) {
    const value = this.response.headers[name];
    return Array.isArray(value) ? value.join(", ") : value;
  }
  getData() {
    return __async(this, null, function* () {
      const data = yield this.dataPromise;
      return data;
    });
  }
}
class HttpClient extends BaseClient {
  /** @param {string} url */
  constructor(url) {
    super(url);
    this.parsedUrl = fs.parse(this.url);
    this.httpApi = this.parsedUrl.protocol === "http:" ? fs : fs;
  }
  /**
   * @param {Object<string, string>} headers
   * @param {AbortSignal} [signal]
   * @returns {Promise<HttpResponse>}
   */
  constructRequest(headers, signal) {
    return new Promise((resolve, reject) => {
      const request = this.httpApi.get(__spreadProps(__spreadValues({}, this.parsedUrl), {
        headers
      }), (response) => {
        const dataPromise = new Promise((resolveData) => {
          const chunks = [];
          response.on("data", (chunk) => {
            chunks.push(chunk);
          });
          response.on("end", () => {
            const data = Buffer.concat(chunks).buffer;
            resolveData(data);
          });
          response.on("error", reject);
        });
        resolve(new HttpResponse(response, dataPromise));
      });
      request.on("error", reject);
      if (signal) {
        if (signal.aborted) {
          request.destroy(new AbortError("Request aborted"));
        }
        signal.addEventListener("abort", () => request.destroy(new AbortError("Request aborted")));
      }
    });
  }
  request() {
    return __async(this, arguments, function* ({ headers = {}, signal = void 0 } = {}) {
      const response = yield this.constructRequest(headers, signal);
      return response;
    });
  }
}
class RemoteSource extends BaseSource {
  /**
   * @param {import("../geotiff.js").BaseClient} client
   * @param {RemoteSourceOptions} options
   */
  constructor(client, { headers, maxRanges = 0, allowFullFile } = {}) {
    super();
    this.client = client;
    this.headers = headers;
    this.maxRanges = maxRanges;
    this.allowFullFile = allowFullFile;
    this._fileSize = null;
  }
  /**
   * @param {import('./basesource.js').Slice[]} slices
   * @param {AbortSignal} [signal]
   * @returns {Promise<ArrayBufferLike[]>}
   */
  fetch(slices, signal) {
    return __async(this, null, function* () {
      if (this.maxRanges >= slices.length) {
        return this.fetchSlices(slices, signal).then((results) => results.map((r) => r.data));
      } else if (this.maxRanges > 0 && slices.length > 1) ;
      return Promise.all(slices.map((slice) => __async(this, null, function* () {
        return (yield this.fetchSlice(slice, signal)).data;
      })));
    });
  }
  /**
   * @param {Array<import('./basesource.js').Slice>} slices
   * @param {AbortSignal} [signal]
   * @returns {Promise<Array<import('./basesource.js').SliceWithData>>}
   */
  fetchSlices(slices, signal) {
    return __async(this, null, function* () {
      const response = yield this.client.request({
        headers: __spreadProps(__spreadValues({}, this.headers), {
          Range: `bytes=${slices.map(({ offset, length }) => `${offset}-${offset + length - 1}`).join(",")}`
        }),
        signal
      });
      if (!response.ok) {
        throw new Error("Error fetching data.");
      } else if (response.status === 206) {
        const { type, params } = parseContentType(response.getHeader("content-type"));
        if (type === "multipart/byteranges") {
          const byteRanges = parseByteRanges(yield response.getData(), params.boundary);
          this._fileSize = byteRanges[0].fileSize || null;
          return byteRanges;
        }
        const data = yield response.getData();
        const { start, end, total } = parseContentRange(response.getHeader("content-range"));
        this._fileSize = total || null;
        const first = [{
          data,
          offset: start,
          length: end + 1 - start
        }];
        if (slices.length > 1) {
          const others = yield Promise.all(slices.slice(1).map((slice) => this.fetchSlice(slice, signal)));
          return first.concat(others);
        }
        return first;
      } else {
        if (!this.allowFullFile) {
          throw new Error("Server responded with full file");
        }
        const data = yield response.getData();
        this._fileSize = data.byteLength;
        return [{
          data,
          offset: 0,
          length: data.byteLength
        }];
      }
    });
  }
  /**
   * @param {import('./basesource.js').Slice} slice
   * @param {AbortSignal} [signal]
   * @returns {Promise<import('./basesource.js').SliceWithData>}
   */
  fetchSlice(slice, signal) {
    return __async(this, null, function* () {
      const { offset, length } = slice;
      const response = yield this.client.request({
        headers: __spreadProps(__spreadValues({}, this.headers), {
          Range: `bytes=${offset}-${offset + length - 1}`
        }),
        signal
      });
      if (!response.ok) {
        throw new Error("Error fetching data.");
      } else if (response.status === 206) {
        const data = yield response.getData();
        const { total } = parseContentRange(response.getHeader("content-range"));
        this._fileSize = total || null;
        return {
          data,
          offset,
          length
        };
      } else {
        if (!this.allowFullFile) {
          throw new Error("Server responded with full file");
        }
        const data = yield response.getData();
        this._fileSize = data.byteLength;
        return {
          data,
          offset: 0,
          length: data.byteLength
        };
      }
    });
  }
  get fileSize() {
    return this._fileSize;
  }
}
function maybeWrapInBlockedSource(source, { blockSize, cacheSize }) {
  if (blockSize === void 0) {
    return source;
  }
  return new BlockedSource(source, { blockSize, cacheSize });
}
function makeFetchSource(url, _a = {}) {
  var _b = _a, { headers = {}, credentials, maxRanges = 0, allowFullFile = false } = _b, blockOptions = __objRest(_b, ["headers", "credentials", "maxRanges", "allowFullFile"]);
  const client = new FetchClient(url, credentials);
  const source = new RemoteSource(client, { headers, maxRanges, allowFullFile });
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeXHRSource(url, _c = {}) {
  var _d = _c, { headers = {}, maxRanges = 0, allowFullFile = false } = _d, blockOptions = __objRest(_d, ["headers", "maxRanges", "allowFullFile"]);
  const client = new XHRClient(url);
  const source = new RemoteSource(client, { headers, maxRanges, allowFullFile });
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeHttpSource(url, _e = {}) {
  var _f = _e, { headers = {}, maxRanges = 0, allowFullFile = false } = _f, blockOptions = __objRest(_f, ["headers", "maxRanges", "allowFullFile"]);
  const client = new HttpClient(url);
  const source = new RemoteSource(client, { headers, maxRanges, allowFullFile });
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeCustomSource(client, _g = {}) {
  var _h = _g, { headers = {}, maxRanges = 0, allowFullFile = false } = _h, blockOptions = __objRest(_h, ["headers", "maxRanges", "allowFullFile"]);
  const source = new RemoteSource(client, { headers, maxRanges, allowFullFile });
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeRemoteSource(url, _i = {}) {
  var _j = _i, { forceXHR = false } = _j, clientOptions = __objRest(_j, ["forceXHR"]);
  if (typeof fetch === "function" && !forceXHR) {
    return makeFetchSource(url, clientOptions);
  }
  if (typeof XMLHttpRequest !== "undefined") {
    return makeXHRSource(url, clientOptions);
  }
  return makeHttpSource(url, clientOptions);
}
class FileReaderSource extends BaseSource {
  /**
   * @param {Blob} file
   */
  constructor(file) {
    super();
    this.file = file;
  }
  /**
   * @param {import('./basesource.js').Slice} slice
   * @param {AbortSignal} signal
   * @returns {Promise<import('./basesource.js').SliceWithData>}
   */
  fetchSlice(slice, signal) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const blob = this.file.slice(slice.offset, slice.offset + slice.length);
        const reader = new FileReader();
        reader.onload = () => resolve({
          data: (
            /** @type {ArrayBuffer} */
            reader.result
          ),
          offset: slice.offset,
          length: slice.length
        });
        reader.onerror = reject;
        reader.onabort = reject;
        reader.readAsArrayBuffer(blob);
        if (signal) {
          signal.addEventListener("abort", () => reader.abort());
        }
      });
    });
  }
}
function makeFileReaderSource(file) {
  return new FileReaderSource(file);
}
function getArrayForSamples(fieldType, count) {
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.UNDEFINED:
      return new Uint8Array(count);
    case fieldTypes.SBYTE:
      return new Int8Array(count);
    case fieldTypes.SHORT:
      return new Uint16Array(count);
    case fieldTypes.SSHORT:
      return new Int16Array(count);
    case fieldTypes.LONG:
    case fieldTypes.IFD:
      return new Uint32Array(count);
    case fieldTypes.SLONG:
      return new Int32Array(count);
    case fieldTypes.LONG8:
    case fieldTypes.IFD8:
      return new Array(count);
    case fieldTypes.SLONG8:
      return new Array(count);
    case fieldTypes.RATIONAL:
      return new Uint32Array(count * 2);
    case fieldTypes.SRATIONAL:
      return new Int32Array(count * 2);
    case fieldTypes.FLOAT:
      return new Float32Array(count);
    case fieldTypes.DOUBLE:
      return new Float64Array(count);
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
}
function getDataSliceReader(dataSlice, fieldType) {
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.UNDEFINED:
      return dataSlice.readUint8;
    case fieldTypes.SBYTE:
      return dataSlice.readInt8;
    case fieldTypes.SHORT:
      return dataSlice.readUint16;
    case fieldTypes.SSHORT:
      return dataSlice.readInt16;
    case fieldTypes.LONG:
    case fieldTypes.IFD:
      return dataSlice.readUint32;
    case fieldTypes.SLONG:
      return dataSlice.readInt32;
    case fieldTypes.LONG8:
    case fieldTypes.IFD8:
      return dataSlice.readUint64;
    case fieldTypes.SLONG8:
      return dataSlice.readInt64;
    case fieldTypes.RATIONAL:
      return dataSlice.readUint32;
    case fieldTypes.SRATIONAL:
      return dataSlice.readInt32;
    case fieldTypes.FLOAT:
      return dataSlice.readFloat32;
    case fieldTypes.DOUBLE:
      return dataSlice.readFloat64;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
}
function getValues$1(outValues = null, readMethod, dataSlice, fieldType, count, offset, isArray = false) {
  const fieldTypeLength = getFieldTypeSize(fieldType);
  const values = outValues || getArrayForSamples(fieldType, count);
  const isRational = fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL;
  if (!isRational) {
    for (let i = 0; i < count; ++i) {
      values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
    }
  } else {
    for (let i = 0; i < count; i += 2) {
      values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
      values[i + 1] = readMethod.call(dataSlice, offset + (i * fieldTypeLength + 4));
    }
  }
  if (fieldType === fieldTypes.ASCII) {
    return new TextDecoder("utf-8").decode(
      /** @type {Uint8Array} */
      values
    );
  }
  if (count === 1 && !isArray && !isRational) {
    return values[0];
  }
  return values;
}
class DeferredArray {
  /**
   * Creates a DeferredArray for lazy-loading of large TIFF field arrays.
   * @param {import("./source/basesource.js").BaseSource} source - Data source for fetching
   * @param {number} arrayOffset - Byte offset where the array data starts
   * @param {boolean} littleEndian - Endianness of the data
   * @param {import('./globals.js').FieldType} fieldType - TIFF field type constant
   * @param {number} length - Number of elements in the array
   */
  constructor(source, arrayOffset, littleEndian, fieldType, length) {
    this.source = source;
    this.arrayOffset = arrayOffset;
    this.littleEndian = littleEndian;
    this.fieldType = fieldType;
    this.length = length;
    this.data = getArrayForSamples(fieldType, length);
    this.itemSize = getFieldTypeSize(fieldType);
    this.maskBitmap = new Uint8Array(Math.ceil(length / 8));
    this.fetchIndexPromises = /* @__PURE__ */ new Map();
    this.fullFetchPromise = null;
  }
  /**
   * Loads all values in the deferred array at once.
   * Subsequent calls return the same promise to avoid redundant fetches.
   * @returns {Promise<import('./geotiff.js').TypedArray|Array<number>>} Promise resolving to the fully loaded array
   */
  loadAll() {
    return __async(this, null, function* () {
      if (!this.fullFetchPromise) {
        this.fullFetchPromise = this.source.fetch([{
          offset: this.arrayOffset,
          length: this.itemSize * this.length
        }]).then((data) => {
          const dataSlice = new DataSlice(data[0], this.arrayOffset, true, false);
          const result = getValues$1(this.data, getDataSliceReader(dataSlice, this.fieldType), dataSlice, this.fieldType, this.length, this.arrayOffset, true);
          this.maskBitmap.fill(255);
          this.fetchIndexPromises.clear();
          return result;
        });
      }
      return this.fullFetchPromise;
    });
  }
  /**
   * Loads and returns a single value at the specified index.
   * If the value is already loaded, returns it immediately. Otherwise, fetches it
   * from the source. Multiple calls for the same index reuse the same promise.
   * @param {number} index - Zero-based index of the value to load
   * @returns {Promise<number|bigint>} Promise resolving to the value at the given index
   * @throws {RangeError} If index is out of bounds
   */
  get(index) {
    return __async(this, null, function* () {
      if (index < 0 || index >= this.data.length) {
        throw new RangeError(`Index ${index} out of bounds for length ${this.data.length}`);
      }
      const byteIndex = Math.floor(index / 8);
      const bitMask = 1 << index % 8;
      const offset = this.arrayOffset + index * this.itemSize;
      if ((this.maskBitmap[byteIndex] & bitMask) === 0) {
        if (!this.fetchIndexPromises.has(index)) {
          const fetchPromise = this.source.fetch([{
            offset,
            length: this.itemSize
          }]).then((data) => {
            const dataSlice = new DataSlice(data[0], this.arrayOffset + index * this.itemSize, true, false);
            const readMethod = getDataSliceReader(dataSlice, this.fieldType);
            const value = readMethod.call(dataSlice, offset);
            this.data[index] = value;
            this.maskBitmap[byteIndex] |= bitMask;
            this.fetchIndexPromises.delete(index);
            return value;
          });
          this.fetchIndexPromises.set(index, fetchPromise);
        }
        return this.fetchIndexPromises.get(index);
      }
      return this.data[index];
    });
  }
}
class ImageFileDirectory {
  /**
   * Create an ImageFileDirectory.
   * @param {Map<string|number, number|string|Array<number|string>>} actualizedFields the file directory,
   * mapping tag names to values
   * @param {Map<string|number, Function>} deferredFields the deferred fields, mapping tag names to async functions
   * @param {Map<string|number, DeferredArray>} deferredArrays the deferred arrays, mapping tag names to
   * DeferredArray objects
   * @param {number} nextIFDByteOffset the byte offset to the next IFD
   */
  constructor(actualizedFields, deferredFields, deferredArrays, nextIFDByteOffset) {
    this.actualizedFields = actualizedFields;
    this.deferredFields = deferredFields;
    this.deferredFieldsBeingResolved = /* @__PURE__ */ new Map();
    this.deferredArrays = deferredArrays;
    this.nextIFDByteOffset = nextIFDByteOffset;
  }
  /**
   * @param {import('./globals.js').TagName|number} tagIdentifier The field tag ID or name
   * @returns {boolean} whether the field exists (actualized or deferred)
   */
  hasTag(tagIdentifier) {
    const tag = resolveTag(tagIdentifier);
    return this.actualizedFields.has(tag) || this.deferredFields.has(tag) || this.deferredArrays.has(tag);
  }
  /**
   * Synchronously retrieves the value for a given tag. If it is deferred, an error is thrown.
   * @template {import('./globals.js').EagerTagName | import('./globals.js').EagerTag} [T=any]
   * @param {T} tagIdentifier The field tag ID or name
   * @returns {T extends import('./globals.js').TagName ? (import('./globals.js').TagValue<T> | undefined) : any}
   * the field value,
   * or undefined if it does not exist
   * @throws {Error} If the tag is deferred and requires asynchronous loading
   */
  getValue(tagIdentifier) {
    const tag = resolveTag(tagIdentifier);
    if (this.deferredFields.has(tag) || this.deferredArrays.has(tag)) {
      const tagDef = tagDefinitions[tag];
      const tagName = (tagDef == null ? void 0 : tagDef.name) || `Tag${tag}`;
      throw new Error(`Field '${tagName}' (${tag}) is deferred. Use loadValue() to load it asynchronously.`);
    }
    if (!this.actualizedFields.has(tag)) {
      return (
        /** @type {any} */
        void 0
      );
    }
    return (
      /** @type {any} */
      this.actualizedFields.get(tag)
    );
  }
  /**
   * Retrieves the value for a given tag. If it is deferred, it will be loaded first.
   * @template {import('./globals.js').TagName} [T=any]
   * @param {T|number} tagIdentifier The field tag ID or name
   * @returns {Promise<T extends import('./globals.js').TagName ? (import('./globals.js').TagValue<T> | undefined) : any>}
   *   the field value, or undefined if it does not exist
   */
  loadValue(tagIdentifier) {
    return __async(this, null, function* () {
      const tag = resolveTag(tagIdentifier);
      if (this.actualizedFields.has(tag)) {
        return (
          /** @type {any} */
          this.actualizedFields.get(tag)
        );
      }
      if (this.deferredFieldsBeingResolved.has(tag)) {
        return (
          /** @type {any} */
          this.deferredFieldsBeingResolved.get(tag)
        );
      }
      const loaderFn = this.deferredFields.get(tag);
      if (loaderFn) {
        this.deferredFields.delete(tag);
        const valuePromise = (() => __async(this, null, function* () {
          try {
            const value = yield loaderFn();
            this.actualizedFields.set(tag, value);
            return value;
          } finally {
            this.deferredFieldsBeingResolved.delete(tag);
          }
        }))();
        this.deferredFieldsBeingResolved.set(tag, valuePromise);
        return (
          /** @type {any} */
          valuePromise
        );
      }
      const deferredArray = this.deferredArrays.get(tag);
      if (deferredArray) {
        return (
          /** @type {any} */
          deferredArray.loadAll()
        );
      }
      return (
        /** @type {any} */
        void 0
      );
    });
  }
  /**
   * Retrieves the value at a given index for a tag that is an array. If it is deferred, it will be loaded first.
   * @param {number|string} tagIdentifier The field tag ID or name
   * @param {number} index The index within the array
   * @returns {Promise<number|string|bigint|undefined>} the field value at the given index, or undefined if it does not exist
   */
  loadValueIndexed(tagIdentifier, index) {
    return __async(this, null, function* () {
      const tag = resolveTag(tagIdentifier);
      if (this.actualizedFields.has(tag)) {
        const value = this.actualizedFields.get(tag);
        return (
          /** @type {any} */
          value[index]
        );
      } else if (this.deferredArrays.has(tag)) {
        const deferredArray = (
          /** @type {DeferredArray} */
          this.deferredArrays.get(tag)
        );
        return deferredArray.get(index);
      } else if (this.hasTag(tag)) {
        const value = yield this.loadValue(tag);
        if (value && typeof value !== "number") {
          return value[index];
        }
      }
      return void 0;
    });
  }
  /**
   * Parses the GeoTIFF GeoKeyDirectory tag into a structured object.
   * The GeoKeyDirectory is a special TIFF tag that contains geographic metadata
   * in a key-value format as defined by the GeoTIFF specification.
   * @returns {Partial<Record<import('./globals.js').GeoKeyName, *>>|null} Parsed geo key directory
   *     mapping key names to values, or null if not present
   * @throws {Error} If a referenced geo key value cannot be retrieved
   */
  parseGeoKeyDirectory() {
    const rawGeoKeyDirectory = this.getValue("GeoKeyDirectory");
    if (!rawGeoKeyDirectory) {
      return null;
    }
    const geoKeyDirectory = {};
    for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
      const key = (
        /** @type {Record<number, import('./globals.js').GeoKeyName>} */
        geoKeyNames[rawGeoKeyDirectory[i]]
      );
      const location = (
        /** @type {import('./globals.js').EagerTag} */
        rawGeoKeyDirectory[i + 1] || null
      );
      const count = rawGeoKeyDirectory[i + 2];
      const offset = rawGeoKeyDirectory[i + 3];
      let value = null;
      if (!location) {
        value = offset;
      } else {
        value = this.getValue(location);
        if (typeof value === "undefined" || value === null) {
          throw new Error(`Could not get value of geoKey '${key}'.`);
        } else if (typeof value === "string") {
          value = value.substring(offset, offset + count - 1);
        } else if (value.subarray) {
          value = value.subarray(offset, offset + count);
          if (count === 1) {
            value = value[0];
          }
        }
      }
      geoKeyDirectory[key] = value;
    }
    return geoKeyDirectory;
  }
  toObject() {
    const obj = {};
    for (const [tag, value] of this.actualizedFields.entries()) {
      const tagDefinition = typeof tag === "number" ? tagDefinitions[tag] : void 0;
      const tagName = tagDefinition ? tagDefinition.name : `Tag${tag}`;
      obj[tagName] = value;
    }
    return obj;
  }
}
class ImageFileDirectoryParser {
  /**
   * @param {import("./source/basesource.js").BaseSource} source the data source to fetch from
   * @param {boolean} littleEndian the endianness of the file
   * @param {boolean} bigTiff whether the file is a BigTIFF
   * @param {boolean} [eager=false] whether to eagerly fetch deferred fields.
   *                                 When false (default), tags are loaded lazily on-demand.
   *                                 When true, all tags are loaded immediately during parsing.
   */
  constructor(source, littleEndian, bigTiff, eager = false) {
    this.source = source;
    this.littleEndian = littleEndian;
    this.bigTiff = bigTiff;
    this.eager = eager;
  }
  /**
   * Helper function to retrieve a DataSlice from the source.
   * @param {number} offset Byte offset of the slice
   * @param {number} [length] Length of the slice
   * @returns {Promise<DataSlice>}
   */
  getSlice(offset, length) {
    return __async(this, null, function* () {
      const fallbackLength = this.bigTiff ? 4048 : 1024;
      return new DataSlice((yield this.source.fetch([
        {
          offset,
          length: typeof length !== "undefined" ? length : fallbackLength
        }
      ]))[0], offset, this.littleEndian, this.bigTiff);
    });
  }
  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  parseFileDirectoryAt(offset) {
    return __async(this, null, function* () {
      var _a, _b;
      const entrySize = this.bigTiff ? 20 : 12;
      const offsetSize = this.bigTiff ? 8 : 2;
      let dataSlice = yield this.getSlice(offset);
      const numDirEntries = this.bigTiff ? dataSlice.readUint64(offset) : dataSlice.readUint16(offset);
      const byteSize = numDirEntries * (entrySize + (this.bigTiff ? 16 : 6));
      if (!dataSlice.covers(offset, byteSize)) {
        dataSlice = yield this.getSlice(offset, byteSize);
      }
      const actualizedFields = /* @__PURE__ */ new Map();
      const deferredFields = /* @__PURE__ */ new Map();
      const deferredArrays = /* @__PURE__ */ new Map();
      let i = offset + (this.bigTiff ? 8 : 2);
      for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
        const fieldTag = dataSlice.readUint16(i);
        const fieldType = (
          /** @type {import('./globals.js').FieldType} */
          dataSlice.readUint16(i + 2)
        );
        const typeCount = this.bigTiff ? dataSlice.readUint64(i + 4) : dataSlice.readUint32(i + 4);
        let fieldValues = null;
        let deferredFieldValues = null;
        let deferredArray = null;
        const fieldTypeLength = getFieldTypeSize(fieldType);
        const valueOffset = i + (this.bigTiff ? 12 : 8);
        const isArray = (_a = tagDefinitions[fieldTag]) == null ? void 0 : _a.isArray;
        const eager = ((_b = tagDefinitions[fieldTag]) == null ? void 0 : _b.eager) || this.eager;
        if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
          fieldValues = getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(dataSlice, fieldType), dataSlice, fieldType, typeCount, valueOffset, isArray);
        } else {
          const actualOffset = dataSlice.readOffset(valueOffset);
          const length = getFieldTypeSize(fieldType) * typeCount;
          if (dataSlice.covers(actualOffset, length)) {
            fieldValues = getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(dataSlice, fieldType), dataSlice, fieldType, typeCount, actualOffset, isArray);
          } else if (eager) {
            const fieldDataSlice = yield this.getSlice(actualOffset, length);
            fieldValues = getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(fieldDataSlice, fieldType), fieldDataSlice, fieldType, typeCount, actualOffset, isArray);
          } else if (isArray) {
            deferredArray = new DeferredArray(this.source, actualOffset, this.littleEndian, fieldType, typeCount);
          } else {
            deferredFieldValues = () => __async(this, null, function* () {
              const fieldDataSlice = yield this.getSlice(actualOffset, length);
              return getValues$1(getArrayForSamples(fieldType, typeCount), getDataSliceReader(fieldDataSlice, fieldType), fieldDataSlice, fieldType, typeCount, actualOffset, isArray);
            });
          }
        }
        if (fieldValues !== null) {
          actualizedFields.set(fieldTag, fieldValues);
        } else if (deferredFieldValues !== null) {
          deferredFields.set(fieldTag, deferredFieldValues);
        } else if (deferredArray !== null) {
          deferredArrays.set(fieldTag, deferredArray);
        }
      }
      const nextIFDByteOffset = dataSlice.readOffset(offset + offsetSize + entrySize * numDirEntries);
      return new ImageFileDirectory(actualizedFields, deferredFields, deferredArrays, nextIFDByteOffset);
    });
  }
}
function decodeRowAcc(row, stride) {
  let length = row.length - stride;
  let offset = 0;
  do {
    for (let i = stride; i > 0; i--) {
      row[offset + stride] += row[offset];
      offset++;
    }
    length -= stride;
  } while (length > 0);
}
function decodeRowFloatingPoint(row, stride, bytesPerSample) {
  let index = 0;
  let count = row.length;
  const wc = count / bytesPerSample;
  while (count > stride) {
    for (let i = stride; i > 0; --i) {
      row[index + stride] += row[index];
      ++index;
    }
    count -= stride;
  }
  const copy = row.slice();
  for (let i = 0; i < wc; ++i) {
    for (let b = 0; b < bytesPerSample; ++b) {
      row[bytesPerSample * i + b] = copy[(bytesPerSample - b - 1) * wc + i];
    }
  }
}
function applyPredictor(block, predictor, width, height, bitsPerSample, planarConfiguration) {
  if (!predictor || predictor === 1) {
    return block;
  }
  for (let i = 0; i < bitsPerSample.length; ++i) {
    if (bitsPerSample[i] % 8 !== 0) {
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    }
    if (bitsPerSample[i] !== bitsPerSample[0]) {
      throw new Error("When decoding with predictor, all samples must have the same size.");
    }
  }
  const bytesPerSample = bitsPerSample[0] / 8;
  const stride = planarConfiguration === 2 ? 1 : bitsPerSample.length;
  for (let i = 0; i < height; ++i) {
    if (i * stride * width * bytesPerSample >= block.byteLength) {
      break;
    }
    let row;
    if (predictor === 2) {
      switch (bitsPerSample[0]) {
        case 8:
          row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
          break;
        case 16:
          row = new Uint16Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 2);
          break;
        case 32:
          row = new Uint32Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4);
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${bitsPerSample[0]} bits per sample.`);
      }
      decodeRowAcc(row, stride);
    } else if (predictor === 3) {
      row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
      decodeRowFloatingPoint(row, stride, bytesPerSample);
    }
  }
  return block;
}
class BaseDecoder {
  /**
   * @param {BaseDecoderParameters} parameters
   */
  constructor(parameters) {
    this.parameters = parameters;
  }
  /**
   * @abstract
   * @param {ArrayBufferLike} _buffer
   * @returns {Promise<ArrayBufferLike>|ArrayBufferLike}
   */
  decodeBlock(_buffer) {
    throw new Error("decodeBlock not implemented");
  }
  /**
   * @param {ArrayBufferLike} buffer
   * @returns {Promise<ArrayBufferLike>}
   */
  decode(buffer) {
    return __async(this, null, function* () {
      const decoded = yield this.decodeBlock(buffer);
      const { tileWidth, tileHeight, predictor, bitsPerSample, planarConfiguration } = this.parameters;
      if (predictor !== 1) {
        const isBitsPerSampleArray = Array.isArray(bitsPerSample) || ArrayBuffer.isView(bitsPerSample);
        const adaptedBitsPerSample = isBitsPerSampleArray ? Array.from(bitsPerSample) : [bitsPerSample];
        return applyPredictor(decoded, predictor, tileWidth, tileHeight, adaptedBitsPerSample, planarConfiguration);
      }
      return decoded;
    });
  }
}
function getValues(dataSlice, fieldType, count, offset) {
  let values = null;
  let readMethod = null;
  const fieldTypeLength = getFieldTypeSize(fieldType);
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.UNDEFINED:
      values = new Uint8Array(count);
      readMethod = dataSlice.readUint8;
      break;
    case fieldTypes.SBYTE:
      values = new Int8Array(count);
      readMethod = dataSlice.readInt8;
      break;
    case fieldTypes.SHORT:
      values = new Uint16Array(count);
      readMethod = dataSlice.readUint16;
      break;
    case fieldTypes.SSHORT:
      values = new Int16Array(count);
      readMethod = dataSlice.readInt16;
      break;
    case fieldTypes.LONG:
    case fieldTypes.IFD:
      values = new Uint32Array(count);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SLONG:
      values = new Int32Array(count);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.LONG8:
    case fieldTypes.IFD8:
      values = new Array(count);
      readMethod = dataSlice.readUint64;
      break;
    case fieldTypes.SLONG8:
      values = new Array(count);
      readMethod = dataSlice.readInt64;
      break;
    case fieldTypes.RATIONAL:
      values = new Uint32Array(count * 2);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SRATIONAL:
      values = new Int32Array(count * 2);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.FLOAT:
      values = new Float32Array(count);
      readMethod = dataSlice.readFloat32;
      break;
    case fieldTypes.DOUBLE:
      values = new Float64Array(count);
      readMethod = dataSlice.readFloat64;
      break;
  }
  if (values === null || readMethod === null) {
    throw new RangeError(`Invalid field type: ${fieldType}`);
  }
  {
    for (let i = 0; i < count; ++i) {
      values[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
    }
  }
  {
    return new TextDecoder("utf-8").decode(
      /** @type {Uint8Array} */
      values
    );
  }
}
class GeoTIFFImageIndexError extends Error {
  /**
   * @param {number} index
   */
  constructor(index) {
    super(`No image at index ${index}`);
    this.index = index;
  }
}
class GeoTIFFBase {
  /**
   * @param {number} [_index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  getImage(_index = 0) {
    return __async(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  /**
   * @returns {Promise<number>} the number of internal subfile images
   */
  getImageCount() {
    return __async(this, null, function* () {
      throw new Error("Not implemented");
    });
  }
  /**
   * @typedef {Object} ReadRastersWindowOptions
   * @property {number} [resX] desired Y resolution (world units per pixel)
   * @property {number} [resY] desired X resolution (world units per pixel)
   * @property {Array<number>} [bbox] the subset to read data from in
   *     geographical coordinates. Whole image if not specified.
   */
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {ReadRastersOptions & ReadRastersWindowOptions} options optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  readRasters() {
    return __async(this, arguments, function* (options = {}) {
      const { window: imageWindow, width, height } = options;
      let { resX, resY, bbox } = options;
      const firstImage = yield this.getImage();
      let usedImage = firstImage;
      const imageCount = yield this.getImageCount();
      const imgBBox = firstImage.getBoundingBox();
      if (imageWindow && bbox) {
        throw new Error('Both "bbox" and "window" passed.');
      }
      if (width || height) {
        if (imageWindow) {
          const [oX, oY] = firstImage.getOrigin();
          const [rX, rY] = firstImage.getResolution();
          bbox = [
            oX + imageWindow[0] * rX,
            oY + imageWindow[1] * rY,
            oX + imageWindow[2] * rX,
            oY + imageWindow[3] * rY
          ];
        }
        const usedBBox = bbox || imgBBox;
        if (width) {
          if (resX) {
            throw new Error("Both width and resX passed");
          }
          resX = (usedBBox[2] - usedBBox[0]) / width;
        }
        if (height) {
          if (resY) {
            throw new Error("Both width and resY passed");
          }
          resY = (usedBBox[3] - usedBBox[1]) / height;
        }
      }
      if (resX || resY) {
        const allImages = [];
        for (let i = 0; i < imageCount; ++i) {
          const image = yield this.getImage(i);
          const subfileType = image.fileDirectory.getValue("SubfileType");
          const newSubfileType = image.fileDirectory.getValue("NewSubfileType");
          if (i === 0 || subfileType === 2 || (newSubfileType || 0) & 1) {
            allImages.push(image);
          }
        }
        allImages.sort((a, b) => a.getWidth() - b.getWidth());
        for (let i = 0; i < allImages.length; ++i) {
          const image = allImages[i];
          const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
          const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();
          usedImage = image;
          if (resX && resX > imgResX || resY && resY > imgResY) {
            break;
          }
        }
      }
      let wnd = imageWindow;
      if (bbox) {
        const [oX, oY] = firstImage.getOrigin();
        const [imageResX, imageResY] = usedImage.getResolution(firstImage);
        wnd = [
          Math.round((bbox[0] - oX) / imageResX),
          Math.round((bbox[1] - oY) / imageResY),
          Math.round((bbox[2] - oX) / imageResX),
          Math.round((bbox[3] - oY) / imageResY)
        ];
        wnd = [
          Math.min(wnd[0], wnd[2]),
          Math.min(wnd[1], wnd[3]),
          Math.max(wnd[0], wnd[2]),
          Math.max(wnd[1], wnd[3])
        ];
      }
      return usedImage.readRasters(__spreadProps(__spreadValues({}, options), { window: wnd }));
    });
  }
}
let GeoTIFF$1 = class GeoTIFF extends GeoTIFFBase {
  /**
   * @constructor
   * @param {BaseSource} source The datasource to read from.
   * @param {boolean} littleEndian Whether the image uses little endian.
   * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
   *                                to the first IFD.
   * @param {GeoTIFFOptions} [options] further options.
   */
  constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
    super();
    this.source = source;
    this.parser = new ImageFileDirectoryParser(source, littleEndian, bigTiff, false);
    this.littleEndian = littleEndian;
    this.bigTiff = bigTiff;
    this.firstIFDOffset = firstIFDOffset;
    this.cache = options.cache || false;
    this.ifdRequests = [];
    this.ghostValues = null;
  }
  /**
   * @param {number} offset
   * @param {number} [size]
   * @returns {Promise<DataSlice>}
   */
  getSlice(offset, size) {
    return __async(this, null, function* () {
      const fallbackSize = this.bigTiff ? 4048 : 1024;
      return new DataSlice((yield this.source.fetch([{
        offset,
        length: typeof size !== "undefined" ? size : fallbackSize
      }]))[0], offset, this.littleEndian, this.bigTiff);
    });
  }
  /**
   * @param {number} index
   * @return {Promise<import('./imagefiledirectory.js').ImageFileDirectory>}
   */
  requestIFD(index) {
    return __async(this, null, function* () {
      if (this.ifdRequests[index]) {
        return this.ifdRequests[index];
      } else if (index === 0) {
        this.ifdRequests[index] = this.parser.parseFileDirectoryAt(this.firstIFDOffset);
        return this.ifdRequests[index];
      } else if (!this.ifdRequests[index - 1]) {
        try {
          this.ifdRequests[index - 1] = this.requestIFD(index - 1);
        } catch (e) {
          if (e instanceof GeoTIFFImageIndexError) {
            throw new GeoTIFFImageIndexError(index);
          }
          throw e;
        }
      }
      this.ifdRequests[index] = (() => __async(this, null, function* () {
        const previousPromise = this.ifdRequests[index - 1];
        if (!previousPromise) {
          throw new Error("Previous IFD request missing");
        }
        const previousIfd = yield previousPromise;
        if (previousIfd.nextIFDByteOffset === 0) {
          throw new GeoTIFFImageIndexError(index);
        }
        return this.parser.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
      }))();
      return this.ifdRequests[index];
    });
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  getImage(index = 0) {
    return __async(this, null, function* () {
      return new GeoTIFFImage(yield this.requestIFD(index), this.littleEndian, this.cache, this.source);
    });
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  getImageCount() {
    return __async(this, null, function* () {
      let index = 0;
      let hasNext = true;
      while (hasNext) {
        try {
          yield this.requestIFD(index);
          ++index;
        } catch (e) {
          if (e instanceof GeoTIFFImageIndexError) {
            hasNext = false;
          } else {
            throw e;
          }
        }
      }
      return index;
    });
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Record<string, unknown>|null>} the parsed ghost area or null, if no such area was found
   */
  getGhostValues() {
    return __async(this, null, function* () {
      const offset = this.bigTiff ? 16 : 8;
      if (this.ghostValues !== null) {
        return this.ghostValues;
      }
      const detectionString = "GDAL_STRUCTURAL_METADATA_SIZE=";
      const heuristicAreaSize = detectionString.length + 100;
      let slice = yield this.getSlice(offset, heuristicAreaSize);
      if (detectionString === getValues(slice, fieldTypes.ASCII, detectionString.length, offset)) {
        const valuesString = getValues(slice, fieldTypes.ASCII, heuristicAreaSize, offset);
        const firstLine = valuesString.split("\n")[0];
        const metadataSize = Number(firstLine.split("=")[1].split(" ")[0]) + firstLine.length;
        if (metadataSize > heuristicAreaSize) {
          slice = yield this.getSlice(offset, metadataSize);
        }
        const fullString = getValues(slice, fieldTypes.ASCII, metadataSize, offset);
        const ghostValues = {};
        fullString.split("\n").filter((line) => line.length > 0).map((line) => line.split("=")).forEach(([key, value]) => {
          ghostValues[key] = value;
        });
        this.ghostValues = ghostValues;
      }
      return this.ghostValues;
    });
  }
  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {BaseSource} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static fromSource(source, options, signal) {
    return __async(this, null, function* () {
      const headerData = (yield source.fetch([{ offset: 0, length: 1024 }], signal))[0];
      const dataView = new DataView64(headerData);
      const BOM = dataView.getUint16(0, false);
      let littleEndian;
      if (BOM === 18761) {
        littleEndian = true;
      } else if (BOM === 19789) {
        littleEndian = false;
      } else {
        throw new TypeError("Invalid byte order value.");
      }
      const magicNumber = dataView.getUint16(2, littleEndian);
      let bigTiff;
      if (magicNumber === 42) {
        bigTiff = false;
      } else if (magicNumber === 43) {
        bigTiff = true;
        const offsetByteSize = dataView.getUint16(4, littleEndian);
        if (offsetByteSize !== 8) {
          throw new Error("Unsupported offset byte-size.");
        }
      } else {
        throw new TypeError("Invalid magic number.");
      }
      const firstIFDOffset = bigTiff ? dataView.getUint64(8, littleEndian) : dataView.getUint32(4, littleEndian);
      return new GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
    });
  }
  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    if (typeof this.source.close === "function") {
      return this.source.close();
    }
    return false;
  }
};
class MultiGeoTIFF extends GeoTIFFBase {
  /**
   * Construct a new MultiGeoTIFF from a main and several overview files.
   * @param {GeoTIFF} mainFile The main GeoTIFF file.
   * @param {GeoTIFF[]} overviewFiles An array of overview files.
   */
  constructor(mainFile, overviewFiles) {
    super();
    this.mainFile = mainFile;
    this.overviewFiles = overviewFiles;
    this.imageFiles = [mainFile].concat(overviewFiles);
    this.fileDirectoriesPerFile = null;
    this.fileDirectoriesPerFileParsing = null;
    this.imageCount = null;
  }
  parseFileDirectoriesPerFile() {
    return __async(this, null, function* () {
      const requests = [this.mainFile.parser.parseFileDirectoryAt(this.mainFile.firstIFDOffset)].concat(this.overviewFiles.map((file) => file.parser.parseFileDirectoryAt(file.firstIFDOffset)));
      this.fileDirectoriesPerFile = yield Promise.all(requests);
      return this.fileDirectoriesPerFile;
    });
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  getImage(index = 0) {
    return __async(this, null, function* () {
      yield this.getImageCount();
      if (!this.imageCounts) {
        throw new Error("Image counts not available");
      }
      yield this.parseFileDirectoriesPerFile();
      let visited = 0;
      let relativeIndex = 0;
      for (let i = 0; i < this.imageFiles.length; i++) {
        const imageFile = this.imageFiles[i];
        for (let ii = 0; ii < this.imageCounts[i]; ii++) {
          if (index === visited) {
            return new GeoTIFFImage(yield imageFile.requestIFD(relativeIndex), imageFile.littleEndian, imageFile.cache, imageFile.source);
          }
          visited++;
          relativeIndex++;
        }
        relativeIndex = 0;
      }
      throw new RangeError("Invalid image index");
    });
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  getImageCount() {
    return __async(this, null, function* () {
      if (this.imageCount !== null) {
        return this.imageCount;
      }
      const requests = [this.mainFile.getImageCount()].concat(this.overviewFiles.map((file) => file.getImageCount()));
      this.imageCounts = yield Promise.all(requests);
      this.imageCount = this.imageCounts.reduce((count, ifds) => count + ifds, 0);
      return this.imageCount;
    });
  }
}
function fromUrl(_0) {
  return __async(this, arguments, function* (url, options = {}, signal) {
    const remoteOptions = __spreadValues({ blockSize: 65536 }, options);
    return GeoTIFF$1.fromSource(makeRemoteSource(url, remoteOptions), void 0, signal);
  });
}
function fromCustomClient(_0) {
  return __async(this, arguments, function* (client, options = {}, signal) {
    const customOptions = __spreadValues({ blockSize: 65536 }, options);
    return GeoTIFF$1.fromSource(makeCustomSource(client, customOptions), void 0, signal);
  });
}
function fromBlob(blob, signal) {
  return __async(this, null, function* () {
    return GeoTIFF$1.fromSource(makeFileReaderSource(blob), void 0, signal);
  });
}
function fromUrls(_0) {
  return __async(this, arguments, function* (mainUrl, overviewUrls = [], options = {}, signal) {
    const remoteOptions = __spreadValues({ blockSize: 65536 }, options);
    const mainFile = yield GeoTIFF$1.fromSource(makeRemoteSource(mainUrl, remoteOptions), void 0, signal);
    const overviewFiles = yield Promise.all(overviewUrls.map((url) => GeoTIFF$1.fromSource(makeRemoteSource(url, remoteOptions), void 0, signal)));
    return new MultiGeoTIFF(mainFile, overviewFiles);
  });
}
function isMask(image) {
  const type = image.fileDirectory.getValue("NewSubfileType") || 0;
  return (type & 4) === 4;
}
function readRGB(preference, image) {
  if (!preference) {
    return false;
  }
  if (preference === true) {
    return true;
  }
  if (image.getSamplesPerPixel() !== 3) {
    return false;
  }
  const interpretation = image.fileDirectory.getValue(
    "PhotometricInterpretation"
  );
  const interpretations = photometricInterpretations;
  return interpretation === interpretations.CMYK || interpretation === interpretations.YCbCr || interpretation === interpretations.CIELab || interpretation === interpretations.ICCLab;
}
const STATISTICS_MAXIMUM = "STATISTICS_MAXIMUM";
const STATISTICS_MINIMUM = "STATISTICS_MINIMUM";
const defaultTileSize = 256;
let workerPool;
function getWorkerPool() {
  if (!workerPool) {
    workerPool = new Pool();
  }
  return workerPool;
}
function getBoundingBox(image) {
  try {
    return image.getBoundingBox(true);
  } catch (e) {
    return [0, 0, image.getWidth(), image.getHeight()];
  }
}
function getOrigin(image) {
  try {
    return image.getOrigin().slice(0, 2);
  } catch (e) {
    return [0, image.getHeight()];
  }
}
function getResolutions(image, referenceImage) {
  try {
    return image.getResolution(referenceImage);
  } catch (e) {
    return [
      referenceImage.getWidth() / image.getWidth(),
      referenceImage.getHeight() / image.getHeight()
    ];
  }
}
function getProjectionFromKeys(geoKeys, geoKey, unitKey, loadMissingProjection) {
  return __async(this, null, function* () {
    const value = geoKeys[geoKey];
    if (value && value !== 32767) {
      const code = "EPSG:" + value;
      let projection = get(code);
      if (!projection && loadMissingProjection) {
        projection = yield fromProjectionCode(code);
      }
      if (!projection) {
        const units = fromCode(geoKeys[unitKey]);
        if (units) {
          projection = new Projection({
            code,
            units
          });
        }
      }
      return projection || null;
    }
  });
}
function getProjection(image, loadMissingProjection) {
  return __async(this, null, function* () {
    const geoKeys = image.getGeoKeys();
    if (!geoKeys) {
      return null;
    }
    const projection = yield getProjectionFromKeys(
      geoKeys,
      "ProjectedCSTypeGeoKey",
      "ProjLinearUnitsGeoKey",
      loadMissingProjection
    );
    if (projection) {
      return projection;
    }
    return yield getProjectionFromKeys(
      geoKeys,
      "GeographicTypeGeoKey",
      "GeogAngularUnitsGeoKey",
      loadMissingProjection
    );
  });
}
function getImagesForTIFF(tiff) {
  return tiff.getImageCount().then(function(count) {
    const requests = new Array(count);
    for (let i = 0; i < count; ++i) {
      requests[i] = tiff.getImage(i);
    }
    return Promise.all(requests);
  });
}
const createCustomClient = (url, loader) => ({
  url,
  request: (options) => __async(void 0, null, function* () {
    const response = Object.assign(
      yield loader(url, options == null ? void 0 : options.headers, options == null ? void 0 : options.signal),
      {
        getHeader: (name) => response.headers.get(name),
        getData: () => response.arrayBuffer()
      }
    );
    return response;
  })
});
function getImagesForSource(source, options) {
  let request;
  if (source.blob) {
    request = fromBlob(source.blob);
  } else if (source.loader) {
    if (source.overviews) {
      throw new Error(
        "Source overviews are not supported when using a custom loader"
      );
    }
    const client = createCustomClient(source.url, source.loader);
    request = fromCustomClient(client, options);
  } else if (source.overviews) {
    request = fromUrls(source.url, source.overviews, options);
  } else {
    request = fromUrl(source.url, options);
  }
  return request.then(getImagesForTIFF).then(function(images) {
    const image = images[0];
    if (source.url && !source.blob && image.getTileWidth() !== image.getTileHeight() && image.getTileHeight() < defaultTileSize) {
      const bytesPerPixel = image.getBytesPerPixel();
      const blockSize = image.getWidth() * bytesPerPixel * defaultTileSize;
      const reopenOptions = Object.assign({}, options, { blockSize });
      let reopened;
      if (source.loader) {
        const client = createCustomClient(source.url, source.loader);
        reopened = fromCustomClient(client, reopenOptions);
      } else if (source.overviews) {
        reopened = fromUrls(source.url, source.overviews, reopenOptions);
      } else {
        reopened = fromUrl(source.url, reopenOptions);
      }
      return reopened.then(getImagesForTIFF);
    }
    return images;
  });
}
function assertEqual(expected, got, tolerance, message, rejector) {
  if (Array.isArray(expected)) {
    const length = expected.length;
    if (!Array.isArray(got) || length != got.length) {
      const error2 = new Error(message);
      rejector(error2);
      throw error2;
    }
    for (let i = 0; i < length; ++i) {
      assertEqual(expected[i], got[i], tolerance, message, rejector);
    }
    return;
  }
  got = /** @type {number} */
  got;
  if (Math.abs(expected - got) > tolerance * expected) {
    throw new Error(message);
  }
}
function getMinForDataType(array) {
  if (array instanceof Int8Array) {
    return -128;
  }
  if (array instanceof Int16Array) {
    return -32768;
  }
  if (array instanceof Int32Array) {
    return -2147483648;
  }
  if (array instanceof Float32Array) {
    return 12e-39;
  }
  return 0;
}
function getMaxForDataType(array) {
  if (array instanceof Int8Array) {
    return 127;
  }
  if (array instanceof Uint8Array) {
    return 255;
  }
  if (array instanceof Uint8ClampedArray) {
    return 255;
  }
  if (array instanceof Int16Array) {
    return 32767;
  }
  if (array instanceof Uint16Array) {
    return 65535;
  }
  if (array instanceof Int32Array) {
    return 2147483647;
  }
  if (array instanceof Uint32Array) {
    return 4294967295;
  }
  if (array instanceof Float32Array) {
    return 34e37;
  }
  return 255;
}
class GeoTIFFSource extends DataTileSource {
  /**
   * @param {Options} options Data tile options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      state: "loading",
      tileGrid: null,
      projection: options.projection || null,
      transition: options.transition,
      interpolate: options.interpolate !== false,
      wrapX: options.wrapX
    });
    this.sourceInfo_ = options.sources;
    const numSources = this.sourceInfo_.length;
    this.sourceOptions_ = options.sourceOptions;
    this.sourceImagery_ = new Array(numSources);
    this.sourceMasks_ = new Array(numSources);
    this.resolutionFactors_ = new Array(numSources);
    this.samplesPerPixel_;
    this.nodataValues_;
    this.metadata_;
    this.normalize_ = options.normalize !== false;
    this.addAlpha_ = false;
    this.error_ = null;
    this.convertToRGB_ = options.convertToRGB || false;
    this.loadMissingProjection_ = options.loadMissingProjection || false;
    this.setKey(this.sourceInfo_.map((source) => source.url).join(","));
    const self = this;
    const requests = new Array(numSources);
    for (let i = 0; i < numSources; ++i) {
      requests[i] = getImagesForSource(
        this.sourceInfo_[i],
        this.sourceOptions_
      );
    }
    Promise.all(requests).then(function(sources) {
      self.configure_(sources);
    }).catch(function(error$1) {
      error(error$1);
      self.error_ = error$1;
      self.setState("error");
    });
  }
  /**
   * @return {Error} A source loading error. When the source state is `error`, use this function
   * to get more information about the error. To debug a faulty configuration, you may want to use
   * a listener like
   * ```js
   * geotiffSource.on('change', () => {
   *   if (geotiffSource.getState() === 'error') {
   *     console.error(geotiffSource.getError());
   *   }
   * });
   * ```
   */
  getError() {
    return this.error_;
  }
  /**
   * Determine the projection of the images in this GeoTIFF.
   * The default implementation looks at the ProjectedCSTypeGeoKey and the GeographicTypeGeoKey
   * of each image in turn.
   * You can override this method in a subclass to support more projections.
   *
   * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
   * from a single GeoTIFF.
   */
  determineProjection(sources) {
    return __async(this, null, function* () {
      const firstSource = sources[0];
      for (let i = firstSource.length - 1; i >= 0; --i) {
        const image = firstSource[i];
        const projection = yield getProjection(
          image,
          this.loadMissingProjection_
        );
        if (projection) {
          this.projection = projection;
          break;
        }
      }
    });
  }
  /**
   * Determine any transform matrix for the images in this GeoTIFF.
   *
   * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
   * from a single GeoTIFF.
   */
  determineTransformMatrix(sources) {
    const firstSource = sources[0];
    for (let i = firstSource.length - 1; i >= 0; --i) {
      const image = firstSource[i];
      const modelTransformation = image.fileDirectory.getValue(
        "ModelTransformation"
      );
      if (modelTransformation) {
        const [a, b, c, d, e, f, g, h] = modelTransformation;
        const matrix = multiply(
          multiply(
            [
              1 / Math.sqrt(a * a + e * e),
              0,
              0,
              -1 / Math.sqrt(b * b + f * f),
              d,
              h
            ],
            [a, e, b, f, 0, 0]
          ),
          [1, 0, 0, 1, -d, -h]
        );
        this.transformMatrix = matrix;
        this.addAlpha_ = true;
        break;
      }
    }
  }
  /**
   * Configure the tile grid based on images within the source GeoTIFFs.  Each GeoTIFF
   * must have the same internal tiled structure.
   * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
   * from a single GeoTIFF.
   * @private
   */
  configure_(sources) {
    return __async(this, null, function* () {
      let extent;
      let origin;
      let commonRenderTileSizes;
      let commonSourceTileSizes;
      let resolutions;
      const samplesPerPixel = new Array(sources.length);
      const nodataValues = new Array(sources.length);
      const metadata = new Array(sources.length);
      let minZoom = 0;
      const sourceCount = sources.length;
      for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
        const images = [];
        const masks = [];
        sources[sourceIndex].forEach((item) => {
          if (isMask(item)) {
            masks.push(item);
          } else {
            images.push(item);
          }
        });
        const imageCount = images.length;
        if (masks.length > 0 && masks.length !== imageCount) {
          throw new Error(
            `Expected one mask per image found ${masks.length} masks and ${imageCount} images`
          );
        }
        let sourceExtent;
        let sourceOrigin;
        const sourceTileSizes = new Array(imageCount);
        const renderTileSizes = new Array(imageCount);
        const sourceResolutions = new Array(imageCount);
        nodataValues[sourceIndex] = new Array(imageCount);
        metadata[sourceIndex] = new Array(imageCount);
        for (let imageIndex = 0; imageIndex < imageCount; ++imageIndex) {
          const image = images[imageIndex];
          const nodataValue = image.getGDALNoData();
          metadata[sourceIndex][imageIndex] = yield image.getGDALMetadata(0);
          nodataValues[sourceIndex][imageIndex] = nodataValue;
          const wantedSamples = this.sourceInfo_[sourceIndex].bands;
          samplesPerPixel[sourceIndex] = wantedSamples ? wantedSamples.length : image.getSamplesPerPixel();
          const level = imageCount - (imageIndex + 1);
          if (!sourceExtent) {
            sourceExtent = getBoundingBox(image);
          }
          if (!sourceOrigin) {
            sourceOrigin = getOrigin(image);
          }
          const imageResolutions = getResolutions(image, images[0]);
          sourceResolutions[level] = imageResolutions[0];
          const sourceTileSize = [image.getTileWidth(), image.getTileHeight()];
          if (sourceTileSize[0] !== sourceTileSize[1] && sourceTileSize[1] < defaultTileSize) {
            sourceTileSize[0] = defaultTileSize;
            sourceTileSize[1] = defaultTileSize;
          }
          sourceTileSizes[level] = sourceTileSize;
          const aspectRatio = imageResolutions[0] / Math.abs(imageResolutions[1]);
          renderTileSizes[level] = [
            sourceTileSize[0],
            sourceTileSize[1] / aspectRatio
          ];
        }
        if (!extent) {
          extent = sourceExtent;
        } else {
          getIntersection(extent, sourceExtent, extent);
        }
        if (!origin) {
          origin = sourceOrigin;
        } else {
          const message = `Origin mismatch for source ${sourceIndex}, got [${sourceOrigin}] but expected [${origin}]`;
          assertEqual(origin, sourceOrigin, 0, message, this.viewRejector);
        }
        if (!resolutions) {
          resolutions = sourceResolutions;
          this.resolutionFactors_[sourceIndex] = 1;
        } else {
          if (resolutions.length - minZoom > sourceResolutions.length) {
            minZoom = resolutions.length - sourceResolutions.length;
          }
          const resolutionFactor = resolutions[resolutions.length - 1] / sourceResolutions[sourceResolutions.length - 1];
          this.resolutionFactors_[sourceIndex] = resolutionFactor;
          const scaledSourceResolutions = sourceResolutions.map(
            (resolution) => resolution *= resolutionFactor
          );
          const message = `Resolution mismatch for source ${sourceIndex}, got [${scaledSourceResolutions}] but expected [${resolutions}]`;
          assertEqual(
            resolutions.slice(minZoom, resolutions.length),
            scaledSourceResolutions,
            0.02,
            message,
            this.viewRejector
          );
        }
        if (!commonRenderTileSizes) {
          commonRenderTileSizes = renderTileSizes;
        } else {
          assertEqual(
            commonRenderTileSizes.slice(minZoom, commonRenderTileSizes.length),
            renderTileSizes,
            0.01,
            `Tile size mismatch for source ${sourceIndex}`,
            this.viewRejector
          );
        }
        if (!commonSourceTileSizes) {
          commonSourceTileSizes = sourceTileSizes;
        } else {
          assertEqual(
            commonSourceTileSizes.slice(minZoom, commonSourceTileSizes.length),
            sourceTileSizes,
            0,
            `Tile size mismatch for source ${sourceIndex}`,
            this.viewRejector
          );
        }
        this.sourceImagery_[sourceIndex] = images.reverse();
        this.sourceMasks_[sourceIndex] = masks.reverse();
      }
      for (let i = 0, ii = this.sourceImagery_.length; i < ii; ++i) {
        const sourceImagery = this.sourceImagery_[i];
        while (sourceImagery.length < resolutions.length) {
          sourceImagery.unshift(void 0);
        }
      }
      if (!this.getProjection()) {
        yield this.determineProjection(sources);
      }
      this.determineTransformMatrix(sources);
      this.samplesPerPixel_ = samplesPerPixel;
      this.nodataValues_ = nodataValues;
      this.metadata_ = metadata;
      outer: for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
        const sourceNodata = this.sourceInfo_[sourceIndex].nodata;
        if (sourceNodata !== void 0) {
          if (!Array.isArray(sourceNodata) || sourceNodata.some((v) => v !== void 0)) {
            this.addAlpha_ = true;
            break;
          }
        }
        if (this.sourceMasks_[sourceIndex].length) {
          this.addAlpha_ = true;
          break;
        }
        const values = nodataValues[sourceIndex];
        const bands = this.sourceInfo_[sourceIndex].bands;
        if (bands) {
          for (let i = 0; i < bands.length; ++i) {
            if (values[bands[i] - 1] !== null) {
              this.addAlpha_ = true;
              break outer;
            }
          }
          continue;
        }
        for (let imageIndex = 0; imageIndex < values.length; ++imageIndex) {
          if (values[imageIndex] !== null) {
            this.addAlpha_ = true;
            break outer;
          }
        }
      }
      let bandCount = this.addAlpha_ ? 1 : 0;
      for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
        bandCount += samplesPerPixel[sourceIndex];
      }
      this.bandCount = bandCount;
      const tileGrid = new TileGrid({
        extent,
        minZoom,
        origin,
        resolutions,
        tileSizes: commonRenderTileSizes
      });
      this.tileGrid = tileGrid;
      this.setTileSizes(commonSourceTileSizes);
      this.setLoader(this.loadTile_.bind(this));
      this.setState("ready");
      const zoom = 1;
      if (resolutions.length === 2) {
        resolutions = [resolutions[0], resolutions[1], resolutions[1] / 2];
      } else if (resolutions.length === 1) {
        resolutions = [resolutions[0] * 2, resolutions[0], resolutions[0] / 2];
      }
      let viewExtent = extent;
      if (this.transformMatrix) {
        const matrix = makeInverse(create$1(), this.transformMatrix.slice());
        const transformFn = createTransformFromCoordinateTransform(
          (input) => apply(matrix, input)
        );
        viewExtent = applyTransform(extent, transformFn);
      }
      this.viewResolver({
        showFullExtent: true,
        projection: this.projection,
        resolutions,
        center: toUserCoordinate(getCenter(viewExtent), this.projection),
        extent: toUserExtent(viewExtent, this.projection),
        zoom
      });
    });
  }
  /**
   * @param {number} z The z tile index.
   * @param {number} x The x tile index.
   * @param {number} y The y tile index.
   * @param {import('./DataTile.js').LoaderOptions} options The loader options.
   * @return {Promise} The composed tile data.
   * @private
   */
  loadTile_(z, x, y, options) {
    const sourceTileSize = this.getTileSize(z);
    const sourceCount = this.sourceImagery_.length;
    const requests = new Array(sourceCount * 2);
    const nodataValues = this.nodataValues_;
    const sourceInfo = this.sourceInfo_;
    const pool = getWorkerPool();
    for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
      const source = sourceInfo[sourceIndex];
      const resolutionFactor = this.resolutionFactors_[sourceIndex];
      const pixelBounds = [
        Math.round(x * (sourceTileSize[0] * resolutionFactor)),
        Math.round(y * (sourceTileSize[1] * resolutionFactor)),
        Math.round((x + 1) * (sourceTileSize[0] * resolutionFactor)),
        Math.round((y + 1) * (sourceTileSize[1] * resolutionFactor))
      ];
      const image = this.sourceImagery_[sourceIndex][z];
      let samples;
      if (source.bands) {
        samples = source.bands.map(function(bandNumber) {
          return bandNumber - 1;
        });
      }
      let fillValue;
      if ("nodata" in source && source.nodata !== null) {
        if (Array.isArray(source.nodata)) {
          if (samples) {
            fillValue = samples.map(function(sampleIndex) {
              const v = source.nodata[sampleIndex];
              return v !== void 0 ? v : nodataValues[sourceIndex][sampleIndex];
            });
          } else {
            fillValue = source.nodata.map(function(v, i) {
              return v !== void 0 ? v : nodataValues[sourceIndex][i];
            });
          }
        } else {
          fillValue = source.nodata;
        }
      } else {
        if (!samples) {
          fillValue = nodataValues[sourceIndex];
        } else {
          fillValue = samples.map(function(sampleIndex) {
            return nodataValues[sourceIndex][sampleIndex];
          });
        }
      }
      const readOptions = {
        window: pixelBounds,
        width: sourceTileSize[0],
        height: sourceTileSize[1],
        samples,
        fillValue,
        pool,
        interleave: false,
        signal: options.signal
      };
      if (readRGB(this.convertToRGB_, image)) {
        requests[sourceIndex] = image.readRGB(readOptions);
      } else {
        requests[sourceIndex] = image.readRasters(readOptions);
      }
      const maskIndex = sourceCount + sourceIndex;
      const mask = this.sourceMasks_[sourceIndex][z];
      if (!mask) {
        requests[maskIndex] = Promise.resolve(null);
        continue;
      }
      requests[maskIndex] = mask.readRasters({
        window: pixelBounds,
        width: sourceTileSize[0],
        height: sourceTileSize[1],
        samples: [0],
        pool,
        interleave: false
      });
    }
    return Promise.all(requests).then(this.composeTile_.bind(this, sourceTileSize)).catch(function(error$1) {
      error(error$1);
      throw error$1;
    });
  }
  /**
   * @param {import("../size.js").Size} sourceTileSize The source tile size.
   * @param {Array} sourceSamples The source samples.
   * @return {import("../DataTile.js").Data} The composed tile data.
   * @private
   */
  composeTile_(sourceTileSize, sourceSamples) {
    const metadata = this.metadata_;
    const sourceInfo = this.sourceInfo_;
    const sourceCount = this.sourceImagery_.length;
    const bandCount = this.bandCount;
    const samplesPerPixel = this.samplesPerPixel_;
    const nodataValues = this.nodataValues_;
    const normalize = this.normalize_;
    const addAlpha = this.addAlpha_;
    const pixelCount = sourceTileSize[0] * sourceTileSize[1];
    const dataLength = pixelCount * bandCount;
    let data;
    if (normalize) {
      data = new Uint8Array(dataLength);
    } else {
      data = new Float32Array(dataLength);
    }
    const sourceGains = new Array(sourceCount);
    const sourceBiases = new Array(sourceCount);
    const sourceNodatas = new Array(sourceCount);
    for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
      const source = sourceInfo[sourceIndex];
      const numSamples = samplesPerPixel[sourceIndex];
      if (normalize) {
        const gains = new Array(numSamples);
        const biases = new Array(numSamples);
        const stats = metadata[sourceIndex][0];
        for (let sampleIndex = 0; sampleIndex < numSamples; ++sampleIndex) {
          let bandIndex;
          if (source.bands) {
            bandIndex = source.bands[sampleIndex] - 1;
          } else {
            bandIndex = sampleIndex;
          }
          let min = Array.isArray(source.min) ? source.min[bandIndex] : source.min;
          let max = Array.isArray(source.max) ? source.max[bandIndex] : source.max;
          if (min === void 0) {
            if (stats && STATISTICS_MINIMUM in stats) {
              min = parseFloat(stats[STATISTICS_MINIMUM]);
            } else {
              min = getMinForDataType(sourceSamples[sourceIndex][0]);
            }
          }
          if (max === void 0) {
            if (stats && STATISTICS_MAXIMUM in stats) {
              max = parseFloat(stats[STATISTICS_MAXIMUM]);
            } else {
              max = getMaxForDataType(sourceSamples[sourceIndex][0]);
            }
          }
          gains[sampleIndex] = 255 / (max - min);
          biases[sampleIndex] = -min * gains[sampleIndex];
        }
        sourceGains[sourceIndex] = gains;
        sourceBiases[sourceIndex] = biases;
      }
      if (addAlpha) {
        const nodatas = new Array(numSamples);
        for (let sampleIndex = 0; sampleIndex < numSamples; ++sampleIndex) {
          let bandIndex;
          if (source.bands) {
            bandIndex = source.bands[sampleIndex] - 1;
          } else {
            bandIndex = sampleIndex;
          }
          if (Array.isArray(source.nodata)) {
            const nd = source.nodata[bandIndex];
            nodatas[sampleIndex] = nd !== void 0 ? nd : nodataValues[sourceIndex][bandIndex];
          } else if (source.nodata !== void 0) {
            nodatas[sampleIndex] = source.nodata;
          } else {
            nodatas[sampleIndex] = nodataValues[sourceIndex][bandIndex];
          }
        }
        sourceNodatas[sourceIndex] = nodatas;
      }
    }
    let dataIndex = 0;
    for (let pixelIndex = 0; pixelIndex < pixelCount; ++pixelIndex) {
      let transparent = addAlpha;
      for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
        for (let sampleIndex = 0; sampleIndex < samplesPerPixel[sourceIndex]; ++sampleIndex) {
          const sourceValue = sourceSamples[sourceIndex][sampleIndex][pixelIndex];
          let value;
          if (normalize) {
            value = clamp(
              sourceGains[sourceIndex][sampleIndex] * sourceValue + sourceBiases[sourceIndex][sampleIndex],
              0,
              255
            );
          } else {
            value = sourceValue;
          }
          if (!addAlpha) {
            data[dataIndex] = value;
          } else {
            const nodata = sourceNodatas[sourceIndex][sampleIndex];
            const nodataIsNaN = isNaN(nodata);
            if (!nodataIsNaN && sourceValue !== nodata || nodataIsNaN && !isNaN(sourceValue)) {
              transparent = false;
              data[dataIndex] = value;
            }
          }
          dataIndex++;
        }
        if (!transparent) {
          const maskIndex = sourceCount + sourceIndex;
          const mask = sourceSamples[maskIndex];
          if (mask && !mask[0][pixelIndex]) {
            transparent = true;
          }
        }
      }
      if (addAlpha) {
        if (!transparent) {
          data[dataIndex] = 255;
        }
        dataIndex++;
      }
    }
    return data;
  }
}
GeoTIFFSource.prototype.getView;
const GeoTIFF2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GeoTIFFSource
}, Symbol.toStringTag, { value: "Module" }));
class RawDecoder extends BaseDecoder {
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    return buffer;
  }
}
const raw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RawDecoder
}, Symbol.toStringTag, { value: "Module" }));
const MIN_BITS = 9;
const CLEAR_CODE = 256;
const EOI_CODE = 257;
const MAX_BYTELENGTH = 12;
function getByte(array, position, length) {
  const d = position % 8;
  const a = Math.floor(position / 8);
  const de = 8 - d;
  const ef = position + length - (a + 1) * 8;
  let fg = 8 * (a + 2) - (position + length);
  const dg = (a + 2) * 8 - position;
  fg = Math.max(0, fg);
  if (a >= array.length) {
    console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)");
    return EOI_CODE;
  }
  let chunk1 = array[a] & __pow(2, 8 - d) - 1;
  chunk1 <<= length - de;
  let chunks = chunk1;
  if (a + 1 < array.length) {
    let chunk2 = array[a + 1] >>> fg;
    chunk2 <<= Math.max(0, length - dg);
    chunks += chunk2;
  }
  if (ef > 8 && a + 2 < array.length) {
    const hi = (a + 3) * 8 - (position + length);
    const chunk3 = array[a + 2] >>> hi;
    chunks += chunk3;
  }
  return chunks;
}
function appendReversed(dest, source) {
  for (let i = source.length - 1; i >= 0; i--) {
    dest.push(source[i]);
  }
  return dest;
}
function decompress(input) {
  const dictionaryIndex = new Uint16Array(4093);
  const dictionaryChar = new Uint8Array(4093);
  for (let i = 0; i <= 257; i++) {
    dictionaryIndex[i] = 4096;
    dictionaryChar[i] = i;
  }
  let dictionaryLength = 258;
  let byteLength = MIN_BITS;
  let position = 0;
  function initDictionary() {
    dictionaryLength = 258;
    byteLength = MIN_BITS;
  }
  function getNext(array2) {
    const byte = getByte(array2, position, byteLength);
    position += byteLength;
    return byte;
  }
  function addToDictionary(i, c) {
    dictionaryChar[dictionaryLength] = c;
    dictionaryIndex[dictionaryLength] = i;
    dictionaryLength++;
    return dictionaryLength - 1;
  }
  function getDictionaryReversed(n) {
    const rev = [];
    for (let i = n; i !== 4096; i = dictionaryIndex[i]) {
      rev.push(dictionaryChar[i]);
    }
    return rev;
  }
  const result = [];
  initDictionary();
  const array = new Uint8Array(input);
  let code = getNext(array);
  let oldCode;
  while (code !== EOI_CODE) {
    if (code === CLEAR_CODE) {
      initDictionary();
      code = getNext(array);
      while (code === CLEAR_CODE) {
        code = getNext(array);
      }
      if (code === EOI_CODE) {
        break;
      } else if (code > CLEAR_CODE) {
        throw new Error(`corrupted code at scanline ${code}`);
      } else {
        const val = getDictionaryReversed(code);
        appendReversed(result, val);
        oldCode = code;
      }
    } else if (code < dictionaryLength) {
      const val = getDictionaryReversed(code);
      appendReversed(result, val);
      if (oldCode !== void 0) {
        addToDictionary(oldCode, val[val.length - 1]);
      }
      oldCode = code;
    } else {
      if (oldCode === void 0) {
        throw new Error(`Invalid LZW code: ${code} with no previous code`);
      }
      const oldVal = getDictionaryReversed(oldCode);
      if (!oldVal) {
        throw new Error(`Bogus entry. Not in dictionary, ${oldCode} / ${dictionaryLength}, position: ${position}`);
      }
      appendReversed(result, oldVal);
      result.push(oldVal[oldVal.length - 1]);
      addToDictionary(oldCode, oldVal[oldVal.length - 1]);
      oldCode = code;
    }
    if (dictionaryLength + 1 >= __pow(2, byteLength)) {
      if (byteLength === MAX_BYTELENGTH) {
        oldCode = void 0;
      } else {
        byteLength++;
      }
    }
    code = getNext(array);
  }
  return new Uint8Array(result);
}
class LZWDecoder extends BaseDecoder {
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    return decompress(buffer).buffer;
  }
}
const lzw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LZWDecoder
}, Symbol.toStringTag, { value: "Module" }));
const dctZigZag = new Int32Array([
  0,
  1,
  8,
  16,
  9,
  2,
  3,
  10,
  17,
  24,
  32,
  25,
  18,
  11,
  4,
  5,
  12,
  19,
  26,
  33,
  40,
  48,
  41,
  34,
  27,
  20,
  13,
  6,
  7,
  14,
  21,
  28,
  35,
  42,
  49,
  56,
  57,
  50,
  43,
  36,
  29,
  22,
  15,
  23,
  30,
  37,
  44,
  51,
  58,
  59,
  52,
  45,
  38,
  31,
  39,
  46,
  53,
  60,
  61,
  54,
  47,
  55,
  62,
  63
]);
const dctCos1 = 4017;
const dctSin1 = 799;
const dctCos3 = 3406;
const dctSin3 = 2276;
const dctCos6 = 1567;
const dctSin6 = 3784;
const dctSqrt2 = 5793;
const dctSqrt1d2 = 2896;
function buildHuffmanTable(codeLengths, values) {
  let k = 0;
  const code = [];
  let length = 16;
  while (length > 0 && !codeLengths[length - 1]) {
    --length;
  }
  code.push({ children: [], index: 0 });
  let p = code[0];
  let q;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < codeLengths[i]; j++) {
      p = code.pop();
      if (!p) {
        throw new Error("buildHuffmanTable: codeLength mismatch");
      }
      p.children[p.index] = values[k];
      while (p.index > 0) {
        p = code.pop();
        if (!p) {
          throw new Error("buildHuffmanTable: codeLength mismatch");
        }
      }
      p.index++;
      code.push(p);
      while (code.length <= i) {
        code.push(q = { children: [], index: 0 });
        p.children[p.index] = q.children;
        p = q;
      }
      k++;
    }
    if (i + 1 < length) {
      code.push(q = { children: [], index: 0 });
      p.children[p.index] = q.children;
      p = q;
    }
  }
  return code[0].children;
}
function decodeScan(data, initialOffset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
  const { mcusPerLine, progressive } = frame;
  if (components.length > 1 && (mcusPerLine === void 0 || frame.mcusPerColumn === void 0)) {
    throw new Error("Missing MCU dimensions");
  }
  if (components.length === 1 && (components[0].blocksPerLine === void 0 || components[0].blocksPerColumn === void 0)) {
    throw new Error("Missing block dimensions");
  }
  const startOffset = initialOffset;
  let offset = initialOffset;
  let bitsData = 0;
  let bitsCount = 0;
  function readBit() {
    if (bitsCount > 0) {
      bitsCount--;
      return bitsData >> bitsCount & 1;
    }
    bitsData = data[offset++];
    if (bitsData === 255) {
      const nextByte = data[offset++];
      if (nextByte) {
        throw new Error(`unexpected marker: ${(bitsData << 8 | nextByte).toString(16)}`);
      }
    }
    bitsCount = 7;
    return bitsData >>> 7;
  }
  function decodeHuffman(tree) {
    if (!tree) {
      throw new Error("Huffman table not found");
    }
    let node = tree;
    let bit;
    while ((bit = readBit()) !== null) {
      const next = node[bit];
      if (typeof next === "number") {
        return next;
      }
      if (typeof next !== "object") {
        throw new Error("invalid huffman sequence");
      }
      node = next;
    }
    return null;
  }
  function receive(initialLength) {
    let length = initialLength;
    let n2 = 0;
    while (length > 0) {
      const bit = readBit();
      if (bit === null) {
        return void 0;
      }
      n2 = n2 << 1 | bit;
      --length;
    }
    return n2;
  }
  function receiveAndExtend(length) {
    const n2 = receive(length);
    if (n2 === void 0) {
      return void 0;
    }
    if (n2 >= 1 << length - 1) {
      return n2;
    }
    return n2 + (-1 << length) + 1;
  }
  function decodeBaseline(component2, zz) {
    const t = decodeHuffman(component2.huffmanTableDC);
    if (t === null) {
      throw new Error("Huffman error");
    }
    const diff = t === 0 ? 0 : receiveAndExtend(t);
    if (diff === void 0) {
      throw new Error("Unexpected end of stream");
    }
    if (component2.pred === void 0) {
      component2.pred = 0;
    }
    component2.pred += diff;
    zz[0] = component2.pred;
    let k2 = 1;
    while (k2 < 64) {
      const rs = decodeHuffman(component2.huffmanTableAC);
      if (rs === null) {
        throw new Error("Unexpected end of data in AC coefficient decoding");
      }
      const s = rs & 15;
      const r = rs >> 4;
      if (s === 0) {
        if (r < 15) {
          break;
        }
        k2 += 16;
      } else {
        k2 += r;
        const z = dctZigZag[k2];
        const val = receiveAndExtend(s);
        if (val === void 0) {
          throw new Error("Unexpected end of stream");
        }
        zz[z] = val;
        k2++;
      }
    }
  }
  function decodeDCFirst(component2, zz) {
    const t = decodeHuffman(component2.huffmanTableDC);
    if (t === null) {
      throw new Error("Huffman error");
    }
    const value = receiveAndExtend(t);
    if (value === void 0) {
      throw new Error("Unexpected end of data in DC coefficient decoding");
    }
    const diff = t === 0 ? 0 : value << successive;
    if (component2.pred === void 0) {
      component2.pred = 0;
    }
    component2.pred += diff;
    zz[0] = component2.pred;
  }
  function decodeDCSuccessive(_, zz) {
    const bit = readBit();
    if (bit === null) {
      throw new Error("Unexpected end of data in DC coefficient decoding");
    }
    zz[0] |= bit << successive;
  }
  let eobrun = 0;
  function decodeACFirst(component2, zz) {
    if (eobrun > 0) {
      eobrun--;
      return;
    }
    let k2 = spectralStart;
    const e = spectralEnd;
    while (k2 <= e) {
      const rs = decodeHuffman(component2.huffmanTableAC);
      if (rs === null) {
        throw new Error("Unexpected end of data in AC coefficient decoding");
      }
      const s = rs & 15;
      const r = rs >> 4;
      if (s === 0) {
        if (r < 15) {
          const value = receive(r);
          if (value === void 0) {
            throw new Error("Unexpected end of data in AC coefficient decoding");
          }
          eobrun = value + (1 << r) - 1;
          break;
        }
        k2 += 16;
      } else {
        k2 += r;
        const z = dctZigZag[k2];
        const value = receiveAndExtend(s);
        if (value === void 0) {
          throw new Error("Unexpected end of data in AC coefficient decoding");
        }
        zz[z] = value * (1 << successive);
        k2++;
      }
    }
  }
  let successiveACState = 0;
  let successiveACNextValue;
  function decodeACSuccessive(component2, zz) {
    let k2 = spectralStart;
    const e = spectralEnd;
    let r = 0;
    while (k2 <= e) {
      const z = dctZigZag[k2];
      const direction = zz[z] < 0 ? -1 : 1;
      switch (successiveACState) {
        case 0: {
          const rs = decodeHuffman(component2.huffmanTableAC);
          if (rs === null) {
            throw new Error("Unexpected end of data in AC coefficient decoding");
          }
          const s = rs & 15;
          r = rs >> 4;
          if (s === 0) {
            if (r < 15) {
              const value = receive(r);
              if (value === void 0) {
                throw new Error("Unexpected end of data in AC coefficient decoding");
              }
              eobrun = value + (1 << r);
              successiveACState = 4;
            } else {
              r = 16;
              successiveACState = 1;
            }
          } else {
            if (s !== 1) {
              throw new Error("invalid ACn encoding");
            }
            const nextVal = receiveAndExtend(s);
            if (nextVal === void 0) {
              throw new Error("Unexpected end of data in AC coefficient decoding");
            }
            successiveACNextValue = nextVal;
            successiveACState = r ? 2 : 3;
          }
          continue;
        }
        case 1:
        case 2:
          if (zz[z]) {
            const bit = readBit();
            if (bit === null) {
              throw new Error("Unexpected end of data in AC coefficient decoding");
            }
            zz[z] += (bit << successive) * direction;
          } else {
            r--;
            if (r === 0) {
              successiveACState = successiveACState === 2 ? 3 : 0;
            }
          }
          break;
        case 3:
          if (zz[z]) {
            const bit = readBit();
            if (bit === null) {
              throw new Error("Unexpected end of data in AC coefficient decoding");
            }
            zz[z] += (bit << successive) * direction;
          } else {
            zz[z] = successiveACNextValue << successive;
            successiveACState = 0;
          }
          break;
        case 4:
          if (zz[z]) {
            const bit = readBit();
            if (bit === null) {
              throw new Error("Unexpected end of data in AC coefficient decoding");
            }
            zz[z] += (bit << successive) * direction;
          }
          break;
      }
      k2++;
    }
    if (successiveACState === 4) {
      eobrun--;
      if (eobrun === 0) {
        successiveACState = 0;
      }
    }
  }
  function decodeMcu(component2, decodeFunction, mcu2, row, col) {
    const mcuRow = mcu2 / mcusPerLine | 0;
    const mcuCol = mcu2 % mcusPerLine;
    const blockRow = mcuRow * component2.v + row;
    const blockCol = mcuCol * component2.h + col;
    if (!component2.blocks) {
      throw new Error("Missing blocks");
    }
    decodeFunction(component2, component2.blocks[blockRow][blockCol]);
  }
  function decodeBlock(component2, decodeFunction, mcu2) {
    const blockRow = mcu2 / component2.blocksPerLine | 0;
    const blockCol = mcu2 % component2.blocksPerLine;
    if (!component2.blocks) {
      throw new Error("Missing blocks");
    }
    decodeFunction(component2, component2.blocks[blockRow][blockCol]);
  }
  const componentsLength = components.length;
  let component;
  let i;
  let j;
  let k;
  let n;
  let decodeFn;
  if (progressive) {
    if (spectralStart === 0) {
      decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
    } else {
      decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
    }
  } else {
    decodeFn = decodeBaseline;
  }
  let mcu = 0;
  let marker;
  let mcuExpected;
  if (componentsLength === 1) {
    mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
  } else {
    mcuExpected = mcusPerLine * frame.mcusPerColumn;
  }
  const usedResetInterval = resetInterval || mcuExpected;
  while (mcu < mcuExpected) {
    for (i = 0; i < componentsLength; i++) {
      components[i].pred = 0;
    }
    eobrun = 0;
    if (componentsLength === 1) {
      component = components[0];
      for (n = 0; n < usedResetInterval; n++) {
        decodeBlock(component, decodeFn, mcu);
        mcu++;
      }
    } else {
      for (n = 0; n < usedResetInterval; n++) {
        for (i = 0; i < componentsLength; i++) {
          component = components[i];
          const { h, v } = component;
          for (j = 0; j < v; j++) {
            for (k = 0; k < h; k++) {
              decodeMcu(component, decodeFn, mcu, j, k);
            }
          }
        }
        mcu++;
        if (mcu === mcuExpected) {
          break;
        }
      }
    }
    bitsCount = 0;
    marker = data[offset] << 8 | data[offset + 1];
    if (marker < 65280) {
      throw new Error("marker was not found");
    }
    if (marker >= 65488 && marker <= 65495) {
      offset += 2;
    } else {
      break;
    }
  }
  return offset - startOffset;
}
function buildComponentData(component) {
  const lines = [];
  const { blocksPerLine, blocksPerColumn } = component;
  if (!blocksPerLine || !blocksPerColumn || !component.blocks) {
    throw new Error("Missing component data");
  }
  const samplesPerLine = blocksPerLine << 3;
  const R = new Int32Array(64);
  const r = new Uint8Array(64);
  function quantizeAndInverse(zz, dataOut, dataIn) {
    const qt = component.quantizationTable;
    if (!qt) {
      throw new Error("No quantization table found");
    }
    let v0;
    let v1;
    let v2;
    let v3;
    let v4;
    let v5;
    let v6;
    let v7;
    let t;
    const p = dataIn;
    let i;
    for (i = 0; i < 64; i++) {
      p[i] = zz[i] * qt[i];
    }
    for (i = 0; i < 8; ++i) {
      const row = 8 * i;
      if (p[1 + row] === 0 && p[2 + row] === 0 && p[3 + row] === 0 && p[4 + row] === 0 && p[5 + row] === 0 && p[6 + row] === 0 && p[7 + row] === 0) {
        t = dctSqrt2 * p[0 + row] + 512 >> 10;
        p[0 + row] = t;
        p[1 + row] = t;
        p[2 + row] = t;
        p[3 + row] = t;
        p[4 + row] = t;
        p[5 + row] = t;
        p[6 + row] = t;
        p[7 + row] = t;
        continue;
      }
      v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
      v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
      v2 = p[2 + row];
      v3 = p[6 + row];
      v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
      v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
      v5 = p[3 + row] << 4;
      v6 = p[5 + row] << 4;
      t = v0 - v1 + 1 >> 1;
      v0 = v0 + v1 + 1 >> 1;
      v1 = t;
      t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
      v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
      v3 = t;
      t = v4 - v6 + 1 >> 1;
      v4 = v4 + v6 + 1 >> 1;
      v6 = t;
      t = v7 + v5 + 1 >> 1;
      v5 = v7 - v5 + 1 >> 1;
      v7 = t;
      t = v0 - v3 + 1 >> 1;
      v0 = v0 + v3 + 1 >> 1;
      v3 = t;
      t = v1 - v2 + 1 >> 1;
      v1 = v1 + v2 + 1 >> 1;
      v2 = t;
      t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
      v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
      v7 = t;
      t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
      v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
      v6 = t;
      p[0 + row] = v0 + v7;
      p[7 + row] = v0 - v7;
      p[1 + row] = v1 + v6;
      p[6 + row] = v1 - v6;
      p[2 + row] = v2 + v5;
      p[5 + row] = v2 - v5;
      p[3 + row] = v3 + v4;
      p[4 + row] = v3 - v4;
    }
    for (i = 0; i < 8; ++i) {
      const col = i;
      if (p[1 * 8 + col] === 0 && p[2 * 8 + col] === 0 && p[3 * 8 + col] === 0 && p[4 * 8 + col] === 0 && p[5 * 8 + col] === 0 && p[6 * 8 + col] === 0 && p[7 * 8 + col] === 0) {
        t = dctSqrt2 * dataIn[i + 0] + 8192 >> 14;
        p[0 * 8 + col] = t;
        p[1 * 8 + col] = t;
        p[2 * 8 + col] = t;
        p[3 * 8 + col] = t;
        p[4 * 8 + col] = t;
        p[5 * 8 + col] = t;
        p[6 * 8 + col] = t;
        p[7 * 8 + col] = t;
        continue;
      }
      v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
      v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
      v2 = p[2 * 8 + col];
      v3 = p[6 * 8 + col];
      v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
      v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
      v5 = p[3 * 8 + col];
      v6 = p[5 * 8 + col];
      t = v0 - v1 + 1 >> 1;
      v0 = v0 + v1 + 1 >> 1;
      v1 = t;
      t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
      v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
      v3 = t;
      t = v4 - v6 + 1 >> 1;
      v4 = v4 + v6 + 1 >> 1;
      v6 = t;
      t = v7 + v5 + 1 >> 1;
      v5 = v7 - v5 + 1 >> 1;
      v7 = t;
      t = v0 - v3 + 1 >> 1;
      v0 = v0 + v3 + 1 >> 1;
      v3 = t;
      t = v1 - v2 + 1 >> 1;
      v1 = v1 + v2 + 1 >> 1;
      v2 = t;
      t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
      v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
      v7 = t;
      t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
      v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
      v6 = t;
      p[0 * 8 + col] = v0 + v7;
      p[7 * 8 + col] = v0 - v7;
      p[1 * 8 + col] = v1 + v6;
      p[6 * 8 + col] = v1 - v6;
      p[2 * 8 + col] = v2 + v5;
      p[5 * 8 + col] = v2 - v5;
      p[3 * 8 + col] = v3 + v4;
      p[4 * 8 + col] = v3 - v4;
    }
    for (i = 0; i < 64; ++i) {
      const sample = 128 + (p[i] + 8 >> 4);
      if (sample < 0) {
        dataOut[i] = 0;
      } else if (sample > 255) {
        dataOut[i] = 255;
      } else {
        dataOut[i] = sample;
      }
    }
  }
  for (let blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
    const scanLine = blockRow << 3;
    for (let i = 0; i < 8; i++) {
      lines.push(new Uint8Array(samplesPerLine));
    }
    for (let blockCol = 0; blockCol < blocksPerLine; blockCol++) {
      quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
      let offset = 0;
      const sample = blockCol << 3;
      for (let j = 0; j < 8; j++) {
        const line = lines[scanLine + j];
        for (let i = 0; i < 8; i++) {
          line[sample + i] = r[offset++];
        }
      }
    }
  }
  return lines;
}
class JpegStreamReader {
  constructor() {
    this.jfif = null;
    this.adobe = null;
    this.resetInterval = 0;
    this.quantizationTables = [];
    this.huffmanTablesAC = [];
    this.huffmanTablesDC = [];
    this.frames = [];
  }
  resetFrames() {
    this.frames = [];
  }
  /** @param {Uint8Array} data */
  parse(data) {
    let offset = 0;
    function readUint16() {
      const value = data[offset] << 8 | data[offset + 1];
      offset += 2;
      return value;
    }
    function readDataBlock() {
      const length = readUint16();
      const array = data.subarray(offset, offset + length - 2);
      offset += array.length;
      return array;
    }
    function prepareComponents(frame) {
      let maxH = 0;
      let maxV = 0;
      let component;
      let componentId;
      for (componentId in frame.components) {
        if (frame.components.hasOwnProperty(componentId)) {
          component = frame.components[componentId];
          if (maxH < component.h) {
            maxH = component.h;
          }
          if (maxV < component.v) {
            maxV = component.v;
          }
        }
      }
      const mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
      const mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);
      for (componentId in frame.components) {
        if (frame.components.hasOwnProperty(componentId)) {
          component = frame.components[componentId];
          const blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
          const blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / maxV);
          const blocksPerLineForMcu = mcusPerLine * component.h;
          const blocksPerColumnForMcu = mcusPerColumn * component.v;
          const blocks = [];
          for (let i = 0; i < blocksPerColumnForMcu; i++) {
            const row = [];
            for (let j = 0; j < blocksPerLineForMcu; j++) {
              row.push(new Int32Array(64));
            }
            blocks.push(row);
          }
          component.blocksPerLine = blocksPerLine;
          component.blocksPerColumn = blocksPerColumn;
          component.blocks = blocks;
        }
      }
      frame.maxH = maxH;
      frame.maxV = maxV;
      frame.mcusPerLine = mcusPerLine;
      frame.mcusPerColumn = mcusPerColumn;
    }
    let fileMarker = readUint16();
    if (fileMarker !== 65496) {
      throw new Error("SOI not found");
    }
    fileMarker = readUint16();
    while (fileMarker !== 65497) {
      switch (fileMarker) {
        case 65280:
          break;
        case 65504:
        case 65505:
        case 65506:
        case 65507:
        case 65508:
        case 65509:
        case 65510:
        case 65511:
        case 65512:
        case 65513:
        case 65514:
        case 65515:
        case 65516:
        case 65517:
        case 65518:
        case 65519:
        case 65534: {
          const appData = readDataBlock();
          if (fileMarker === 65504) {
            if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
              this.jfif = {
                version: { major: appData[5], minor: appData[6] },
                densityUnits: appData[7],
                xDensity: appData[8] << 8 | appData[9],
                yDensity: appData[10] << 8 | appData[11],
                thumbWidth: appData[12],
                thumbHeight: appData[13],
                thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
              };
            }
          }
          if (fileMarker === 65518) {
            if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
              this.adobe = {
                version: appData[6],
                flags0: appData[7] << 8 | appData[8],
                flags1: appData[9] << 8 | appData[10],
                transformCode: appData[11]
              };
            }
          }
          break;
        }
        case 65499: {
          const quantizationTablesLength = readUint16();
          const quantizationTablesEnd = quantizationTablesLength + offset - 2;
          while (offset < quantizationTablesEnd) {
            const quantizationTableSpec = data[offset++];
            const tableData = new Int32Array(64);
            if (quantizationTableSpec >> 4 === 0) {
              for (let j = 0; j < 64; j++) {
                const z = dctZigZag[j];
                tableData[z] = data[offset++];
              }
            } else if (quantizationTableSpec >> 4 === 1) {
              for (let j = 0; j < 64; j++) {
                const z = dctZigZag[j];
                tableData[z] = readUint16();
              }
            } else {
              throw new Error("DQT: invalid table spec");
            }
            this.quantizationTables[quantizationTableSpec & 15] = tableData;
          }
          break;
        }
        case 65472:
        case 65473:
        case 65474: {
          readUint16();
          const frame = {
            extended: fileMarker === 65473,
            progressive: fileMarker === 65474,
            precision: data[offset++],
            scanLines: readUint16(),
            samplesPerLine: readUint16(),
            /** @type {Object.<string, JpegComponent>} */
            components: {},
            /** @type {number[]} */
            componentsOrder: [],
            maxH: 0,
            maxV: 0,
            mcusPerLine: 0,
            mcusPerColumn: 0
          };
          const componentsCount = data[offset++];
          let componentId;
          for (let i = 0; i < componentsCount; i++) {
            componentId = data[offset];
            const h = data[offset + 1] >> 4;
            const v = data[offset + 1] & 15;
            const qId = data[offset + 2];
            frame.componentsOrder.push(componentId);
            frame.components[componentId] = {
              h,
              v,
              quantizationIdx: qId,
              blocksPerLine: 0,
              blocksPerColumn: 0,
              blocks: []
            };
            offset += 3;
          }
          prepareComponents(frame);
          this.frames.push(frame);
          break;
        }
        case 65476: {
          const huffmanLength = readUint16();
          for (let i = 2; i < huffmanLength; ) {
            const huffmanTableSpec = data[offset++];
            const codeLengths = new Uint8Array(16);
            let codeLengthSum = 0;
            for (let j = 0; j < 16; j++, offset++) {
              codeLengths[j] = data[offset];
              codeLengthSum += codeLengths[j];
            }
            const huffmanValues = new Uint8Array(codeLengthSum);
            for (let j = 0; j < codeLengthSum; j++, offset++) {
              huffmanValues[j] = data[offset];
            }
            i += 17 + codeLengthSum;
            if (huffmanTableSpec >> 4 === 0) {
              this.huffmanTablesDC[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
            } else {
              this.huffmanTablesAC[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
            }
          }
          break;
        }
        case 65501:
          readUint16();
          this.resetInterval = readUint16();
          break;
        case 65498: {
          readUint16();
          const selectorsCount = data[offset++];
          const components = [];
          const frame = this.frames[0];
          for (let i = 0; i < selectorsCount; i++) {
            const component = frame.components[data[offset++]];
            const tableSpec = data[offset++];
            component.huffmanTableDC = this.huffmanTablesDC[tableSpec >> 4];
            component.huffmanTableAC = this.huffmanTablesAC[tableSpec & 15];
            components.push(component);
          }
          const spectralStart = data[offset++];
          const spectralEnd = data[offset++];
          const successiveApproximation = data[offset++];
          const processed = decodeScan(data, offset, frame, components, this.resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
          offset += processed;
          break;
        }
        case 65535:
          if (data[offset] !== 255) {
            offset--;
          }
          break;
        default:
          if (data[offset - 3] === 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
            offset -= 3;
            break;
          }
          throw new Error(`unknown JPEG marker ${fileMarker.toString(16)}`);
      }
      fileMarker = readUint16();
    }
  }
  getResult() {
    const { frames } = this;
    if (this.frames.length === 0) {
      throw new Error("no frames were decoded");
    } else if (this.frames.length > 1) {
      console.warn("more than one frame is not supported");
    }
    for (let i = 0; i < this.frames.length; i++) {
      const cp = this.frames[i].components;
      for (const j of Object.keys(cp)) {
        const qIdx = cp[j].quantizationIdx;
        if (typeof qIdx === "number") {
          cp[j].quantizationTable = this.quantizationTables[qIdx];
          delete cp[j].quantizationIdx;
        }
      }
    }
    const frame = frames[0];
    if (!frame.maxH || !frame.maxV) {
      throw new Error("Invalid frame dimensions");
    }
    const { components, componentsOrder } = frame;
    const outComponents = [];
    const width = frame.samplesPerLine;
    const height = frame.scanLines;
    for (let i = 0; i < componentsOrder.length; i++) {
      const component = components[componentsOrder[i]];
      outComponents.push({
        lines: buildComponentData(component),
        scaleX: component.h / frame.maxH,
        scaleY: component.v / frame.maxV
      });
    }
    const out = new Uint8Array(width * height * outComponents.length);
    let oi = 0;
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        for (let i = 0; i < outComponents.length; ++i) {
          const component = outComponents[i];
          out[oi] = component.lines[0 | y * component.scaleY][0 | x * component.scaleX];
          ++oi;
        }
      }
    }
    return out;
  }
}
class JpegDecoder extends BaseDecoder {
  /**
   * @param {import('./basedecoder.js').BaseDecoderParameters & { JPEGTables?: Uint8Array }} parameters
   */
  constructor(parameters) {
    super(parameters);
    this.reader = new JpegStreamReader();
    if (parameters.JPEGTables) {
      this.reader.parse(parameters.JPEGTables);
    }
  }
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    this.reader.resetFrames();
    this.reader.parse(new Uint8Array(buffer));
    return this.reader.getResult().buffer;
  }
}
const jpeg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: JpegDecoder
}, Symbol.toStringTag, { value: "Module" }));
class DeflateDecoder extends BaseDecoder {
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
}
const deflate = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeflateDecoder
}, Symbol.toStringTag, { value: "Module" }));
class PackbitsDecoder extends BaseDecoder {
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    const dataView = new DataView(buffer);
    const out = [];
    for (let i = 0; i < buffer.byteLength; ++i) {
      let header = dataView.getInt8(i);
      if (header < 0) {
        const next = dataView.getUint8(i + 1);
        header = -header;
        for (let j = 0; j <= header; ++j) {
          out.push(next);
        }
        i += 1;
      } else {
        for (let j = 0; j <= header; ++j) {
          out.push(dataView.getUint8(i + j + 1));
        }
        i += header + 1;
      }
    }
    return new Uint8Array(out).buffer;
  }
}
const packbits = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PackbitsDecoder
}, Symbol.toStringTag, { value: "Module" }));
const zstd$2 = new ZSTDDecoder();
class LercDecoder extends BaseDecoder {
  /**
   * @param {ArrayBufferLike} buffer
   * @returns {ArrayBufferLike}
   */
  decodeBlock(buffer) {
    var _a;
    const params = (
      /** @type {LercDecoderParameters} */
      this.parameters
    );
    const addCompression = (_a = params.LercParameters) == null ? void 0 : _a[LercParameters.AddCompression];
    let decoded = buffer;
    switch (addCompression) {
      case LercAddCompression.None:
        break;
      case LercAddCompression.Deflate:
        decoded = inflate_1(new Uint8Array(decoded)).buffer;
        break;
      case LercAddCompression.Zstandard:
        decoded = zstd$2.decode(new Uint8Array(decoded)).buffer;
        break;
      default:
        throw new Error(`Unsupported LERC additional compression method identifier: ${addCompression}`);
    }
    const lercResult = Lerc.decode(decoded, { returnPixelInterleavedDims: this.parameters.planarConfiguration === 1 });
    const lercData = lercResult.pixels[0];
    return lercData.buffer;
  }
}
const lerc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LercDecoder,
  zstd: zstd$2
}, Symbol.toStringTag, { value: "Module" }));
const zstd = new ZSTDDecoder$1();
class ZstdDecoder extends BaseDecoder {
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    return (
      /** @type {ArrayBuffer} */
      zstd.decode(new Uint8Array(buffer)).buffer
    );
  }
}
const zstd$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ZstdDecoder,
  zstd
}, Symbol.toStringTag, { value: "Module" }));
class WebImageDecoder extends BaseDecoder {
  /**
   * @param {import('./basedecoder.js').BaseDecoderParameters} parameters
   */
  constructor(parameters) {
    super(parameters);
    if (typeof createImageBitmap === "undefined") {
      throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
    } else if (typeof document === "undefined" && typeof OffscreenCanvas === "undefined") {
      throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
    }
  }
  /** @param {ArrayBuffer} buffer */
  decodeBlock(buffer) {
    return __async(this, null, function* () {
      const blob = new Blob([buffer]);
      const imageBitmap = yield createImageBitmap(blob);
      let canvas;
      if (typeof document !== "undefined") {
        canvas = document.createElement("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
      } else {
        canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
      }
      const ctx = (
        /** @type {CanvasRenderingContext2D} */
        canvas.getContext("2d")
      );
      ctx.drawImage(imageBitmap, 0, 0);
      const imageData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height).data;
      const samplesPerPixel = this.parameters.samplesPerPixel || 4;
      if (samplesPerPixel === 4) {
        return imageData.buffer;
      } else if (samplesPerPixel === 3) {
        const rgb = new Uint8ClampedArray(imageBitmap.width * imageBitmap.height * 3);
        for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
          rgb[i] = imageData[j];
          rgb[i + 1] = imageData[j + 1];
          rgb[i + 2] = imageData[j + 2];
        }
        return rgb.buffer;
      } else {
        throw new Error(`Unsupported SamplesPerPixel value: ${samplesPerPixel}`);
      }
    });
  }
}
const webimage = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WebImageDecoder
}, Symbol.toStringTag, { value: "Module" }));
export {
  GeoTIFF2 as G,
  __vitePreload as _
};
//# sourceMappingURL=geotiff-debug.js.map
