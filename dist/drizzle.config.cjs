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

// drizzle.config.ts
var drizzle_config_exports = {};
__export(drizzle_config_exports, {
  default: () => drizzle_config_default
});
module.exports = __toCommonJS(drizzle_config_exports);
var connectionString = process.env.DATABASE_URL;
var schemaPath = ["./src/models/drizzle"];
var migrationPath = "./.drizzle/migrations/";
var drizzle_config_default = {
  dialect: "postgresql",
  schema: schemaPath,
  out: migrationPath,
  dbCredentials: { url: connectionString },
  verbose: true,
  strict: true
};
//# sourceMappingURL=drizzle.config.cjs.map