"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/multer/globalConfig.ts
var globalConfig_exports = {};
__export(globalConfig_exports, {
  default: () => globalConfig_default,
  fileUrl: () => fileUrl,
  originalDir: () => originalDir,
  uploadDir: () => uploadDir
});
module.exports = __toCommonJS(globalConfig_exports);
var import_fs = __toESM(require("fs"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_path = __toESM(require("path"), 1);

// src/multer/fileTypes.ts
var ALLOWED_DOCUMENT_TYPES = {
  "application/pdf": "pdf",
  // Adobe Portable Document Format
  "application/msword": "doc",
  // Microsoft Word (Legacy)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  // Modern Word
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  // Modern Excel
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  // Modern PowerPoint
  "application/vnd.ms-excel": "xls",
  // Microsoft Excel (Legacy)
  "application/vnd.ms-powerpoint": "ppt",
  // Microsoft PowerPoint (Legacy)
  "text/plain": "txt",
  // Plain text files
  "text/csv": "csv"
  // Comma-separated values
};
var ALLOWED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  // JPEG images
  "image/png": "png",
  // PNG images
  "image/gif": "gif",
  // GIF images
  "image/webp": "webp",
  // WebP images
  "image/svg+xml": "svg",
  // Scalable Vector Graphics
  "image/bmp": "bmp"
  // Bitmap images
};
var ALLOWED_AUDIO_TYPES = {
  "audio/mpeg": "mp3"
  // MP3 audio
};
var ALLOWED_VIDEO_TYPES = {
  "video/mp4": "mp4",
  // MP4 video
  "video/webm": "webm"
  // WebM video
};

// src/multer/globalConfig.ts
var ALLOWED_FILE_TYPES = {
  ...ALLOWED_DOCUMENT_TYPES,
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_AUDIO_TYPES,
  ...ALLOWED_VIDEO_TYPES
};
var uploadDir = "uploads";
var originalDir = import_path.default.join(uploadDir, "original");
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    if (!import_fs.default.existsSync(originalDir)) import_fs.default.mkdirSync(originalDir, { recursive: true });
    cb(null, originalDir);
  },
  filename: (req, file, cb) => {
    const fileExt = import_path.default.extname(file.originalname);
    const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
    cb(null, fileName + fileExt);
  }
});
var fileFilter = (req, file, cb) => {
  if (!file.mimetype || !(file.mimetype in ALLOWED_FILE_TYPES)) {
    cb(new Error("Invalid file type"));
    return;
  }
  cb(null, true);
};
var globalUpload = (0, import_multer.default)({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    // 5MB file size limit
    files: 5
    // Maximum 5 files per upload
  }
});
var fileUrl = (req, directory = originalDir, fileName = req.file?.filename) => {
  const normalizedDirectory = directory.replace(/\\/g, "/");
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}/${normalizedDirectory}/${fileName}`;
};
var globalConfig_default = globalUpload;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileUrl,
  originalDir,
  uploadDir
});
//# sourceMappingURL=globalConfig.cjs.map