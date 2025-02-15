"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/multer/fileTypes.ts
var fileTypes_exports = {};
__export(fileTypes_exports, {
  ALLOWED_AUDIO_TYPES: () => ALLOWED_AUDIO_TYPES,
  ALLOWED_DOCUMENT_TYPES: () => ALLOWED_DOCUMENT_TYPES,
  ALLOWED_IMAGE_TYPES: () => ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES: () => ALLOWED_VIDEO_TYPES
});
module.exports = __toCommonJS(fileTypes_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_DOCUMENT_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES
});
//# sourceMappingURL=fileTypes.cjs.map