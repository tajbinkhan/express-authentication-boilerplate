"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/sortingHelper.ts
var sortingHelper_exports = {};
__export(sortingHelper_exports, {
  SortingHelper: () => SortingHelper
});
module.exports = __toCommonJS(sortingHelper_exports);
var import_drizzle_orm = require("drizzle-orm");
var SortingHelper = class {
  model;
  sortableFields;
  constructor(model) {
    this.model = model;
    this.sortableFields = this.getDynamicSortFields();
  }
  getDynamicSortFields() {
    const fields = {};
    for (const [key, column] of Object.entries(this.model)) {
      if (typeof column === "object" && "name" in column) {
        fields[key] = column;
      }
    }
    return fields;
  }
  getValidSortFields() {
    return Object.keys(this.sortableFields);
  }
  applySorting(sortMethod, sortBy) {
    if (!sortMethod) return (0, import_drizzle_orm.desc)(this.model.id);
    const sortField = this.sortableFields[sortMethod];
    if (!sortField) return (0, import_drizzle_orm.desc)(this.model.id);
    const sortDirection = sortBy?.toLowerCase() === "asc" ? import_drizzle_orm.asc : import_drizzle_orm.desc;
    return sortDirection(sortField);
  }
  isValidSortMethod(sortMethod) {
    return sortMethod in this.sortableFields;
  }
  isValidSortDirection(sortBy) {
    return ["asc", "desc"].includes(sortBy.toLowerCase());
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SortingHelper
});
//# sourceMappingURL=sortingHelper.cjs.map