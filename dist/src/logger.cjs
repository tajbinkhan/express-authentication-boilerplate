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

// src/logger.ts
var logger_exports = {};
__export(logger_exports, {
  default: () => appLogger
});
module.exports = __toCommonJS(logger_exports);
var import_picocolors = __toESM(require("picocolors"), 1);
function appLogger(app) {
  app.use((req, res, next) => {
    const { method, url } = req;
    const start = Date.now();
    console.log(`${import_picocolors.default.green("\u2713")} ${method} ${url}`);
    res.on("finish", () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      let coloredStatusCode;
      if (statusCode >= 500) coloredStatusCode = import_picocolors.default.red(statusCode.toString());
      else if (statusCode >= 400) coloredStatusCode = import_picocolors.default.yellow(statusCode.toString());
      else if (statusCode >= 300) coloredStatusCode = import_picocolors.default.cyan(statusCode.toString());
      else if (statusCode >= 200) coloredStatusCode = import_picocolors.default.green(statusCode.toString());
      else coloredStatusCode = import_picocolors.default.red("500");
      console.log(`${import_picocolors.default.green("\u2713")} ${method} ${url} ${coloredStatusCode} in ${duration}ms`);
    });
    next();
  });
}
//# sourceMappingURL=logger.cjs.map