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

// src/multer/processImage.ts
var processImage_exports = {};
__export(processImage_exports, {
  convertedDir: () => convertedDir,
  processImage: () => processImage
});
module.exports = __toCommonJS(processImage_exports);
var import_fs2 = __toESM(require("fs"), 1);
var import_path3 = __toESM(require("path"), 1);
var import_sharp2 = __toESM(require("sharp"), 1);

// src/multer/converter.ts
var import_path = __toESM(require("path"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var convertToWebP = async (filePath, outputDir, fileName) => {
  const outputFilePath = import_path.default.join(outputDir, `${fileName}.webp`);
  await (0, import_sharp.default)(filePath).webp({ quality: 80 }).toFile(outputFilePath);
  return outputFilePath;
};

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
var import_fs = __toESM(require("fs"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_path2 = __toESM(require("path"), 1);
var ALLOWED_FILE_TYPES = {
  ...ALLOWED_DOCUMENT_TYPES,
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_AUDIO_TYPES,
  ...ALLOWED_VIDEO_TYPES
};
var uploadDir = "uploads";
var originalDir = import_path2.default.join(uploadDir, "original");
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    if (!import_fs.default.existsSync(originalDir)) import_fs.default.mkdirSync(originalDir, { recursive: true });
    cb(null, originalDir);
  },
  filename: (req, file, cb) => {
    const fileExt = import_path2.default.extname(file.originalname);
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

// src/multer/processImage.ts
var sizes = [
  { name: "thumbnail", width: 150, height: 150 },
  { name: "medium", width: 300, height: 300 },
  { name: "large", width: 1024, height: 1024 }
];
var convertedDir = import_path3.default.join(uploadDir, "converted");
var processImage = async (req) => {
  try {
    const fileName = req.file?.filename;
    const originalFilePath = import_path3.default.join(originalDir, fileName);
    const baseName = fileName.replace(import_path3.default.extname(fileName), "");
    const urls = [
      fileUrl(req, originalDir)
      // Original file URL
    ];
    if (req.file?.mimetype in ALLOWED_IMAGE_TYPES) {
      urls.push(fileUrl(req, convertedDir, `${baseName}-original.webp`));
      if (!import_fs2.default.existsSync(convertedDir)) {
        import_fs2.default.mkdirSync(convertedDir, { recursive: true });
      }
      const webpFilePath = await convertToWebP(originalFilePath, convertedDir, baseName);
      const metadata = await (0, import_sharp2.default)(originalFilePath).metadata();
      for (const size of sizes) {
        if (metadata.width && metadata.height && (metadata.width > size.width || metadata.height > size.height)) {
          const sizeDir = import_path3.default.join(uploadDir, `${size.width}x${size.height}`);
          if (!import_fs2.default.existsSync(sizeDir)) {
            import_fs2.default.mkdirSync(sizeDir, { recursive: true });
          }
          const outputFileName = `${baseName}-${size.width}x${size.height}.webp`;
          const outputFilePath = import_path3.default.join(sizeDir, outputFileName);
          await (0, import_sharp2.default)(webpFilePath).resize(size.width, size.height, { fit: "inside" }).toFile(outputFilePath);
          urls.push(fileUrl(req, sizeDir, outputFileName));
        }
      }
    }
    return urls;
  } catch (error) {
    return null;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertedDir,
  processImage
});
//# sourceMappingURL=processImage.cjs.map