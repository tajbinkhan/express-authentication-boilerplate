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

// src/core/pagination.ts
var pagination_exports = {};
__export(pagination_exports, {
  default: () => PaginationManager
});
module.exports = __toCommonJS(pagination_exports);
var PaginationManager = class {
  page;
  limit;
  totalItems;
  constructor(page, limit, totalItems) {
    this.page = page;
    this.limit = limit;
    this.totalItems = totalItems;
  }
  createPagination() {
    const totalPages = Math.ceil(this.totalItems / this.limit);
    let conditionalPage = this.page;
    if (this.page > totalPages && totalPages > 0) {
      conditionalPage = totalPages;
    }
    const offset = (conditionalPage - 1) * this.limit;
    const pagination = {
      totalItems: this.totalItems,
      limit: this.limit,
      offset,
      currentPage: conditionalPage,
      totalPages,
      hasPrevPage: conditionalPage > 1,
      hasNextPage: conditionalPage < totalPages,
      prevPage: conditionalPage > 1 ? conditionalPage - 1 : null,
      nextPage: conditionalPage < totalPages ? conditionalPage + 1 : null
    };
    return { pagination, offset };
  }
};
//# sourceMappingURL=pagination.cjs.map