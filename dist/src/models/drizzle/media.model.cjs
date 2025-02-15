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

// src/models/drizzle/media.model.ts
var media_model_exports = {};
__export(media_model_exports, {
  media: () => media
});
module.exports = __toCommonJS(media_model_exports);
var import_pg_core2 = require("drizzle-orm/pg-core");

// src/databases/drizzle/helpers.ts
var import_pg_core = require("drizzle-orm/pg-core");
var timestamps = {
  createdAt: (0, import_pg_core.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
};

// src/models/drizzle/media.model.ts
var media = (0, import_pg_core2.pgTable)("media", {
  id: (0, import_pg_core2.serial)("id").primaryKey(),
  name: (0, import_pg_core2.varchar)("name", { length: 255 }).notNull(),
  title: (0, import_pg_core2.varchar)("title", { length: 255 }).notNull(),
  originalFileUrl: (0, import_pg_core2.text)("original_url").notNull(),
  webpImageUrl: (0, import_pg_core2.text)("webp_url"),
  smallImageUrl: (0, import_pg_core2.text)("small_url"),
  mediumImageUrl: (0, import_pg_core2.text)("medium_url"),
  largeImageUrl: (0, import_pg_core2.text)("large_url"),
  ...timestamps
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  media
});
//# sourceMappingURL=media.model.cjs.map