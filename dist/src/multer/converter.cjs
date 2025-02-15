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

// src/multer/converter.ts
var converter_exports = {};
__export(converter_exports, {
  convertToWebP: () => convertToWebP
});
module.exports = __toCommonJS(converter_exports);
var import_path = __toESM(require("path"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var convertToWebP = async (filePath, outputDir, fileName) => {
  const outputFilePath = import_path.default.join(outputDir, `${fileName}.webp`);
  await (0, import_sharp.default)(filePath).webp({ quality: 80 }).toFile(outputFilePath);
  return outputFilePath;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertToWebP
});
//# sourceMappingURL=converter.cjs.map