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

// src/app/user/user.validator.ts
var user_validator_exports = {};
__export(user_validator_exports, {
  UserQuerySchema: () => UserQuerySchema
});
module.exports = __toCommonJS(user_validator_exports);
var import_zod2 = require("zod");

// src/validators/baseQuery.schema.ts
var import_zod = require("zod");
var createSortingSchemas = (sortingHelper) => {
  const sortMethodSchema = (pageValue) => import_zod.z.string().optional().transform((val) => {
    if (val && sortingHelper.isValidSortMethod(val)) return String(val);
    return pageValue ? "id" : void 0;
  }).pipe(import_zod.z.string().optional());
  const sortBySchema = (pageValue) => import_zod.z.string().optional().transform((val) => {
    if (val && sortingHelper.isValidSortDirection(val)) return String(val).toLowerCase();
    return pageValue ? "desc" : void 0;
  }).pipe(import_zod.z.string().optional());
  return { sortMethodSchema, sortBySchema };
};
var limitSchema = (pageValue) => import_zod.z.string().optional().transform((val) => {
  return val ? isNaN(Number(val)) ? 10 : Number(val) : pageValue ? 10 : void 0;
}).pipe(import_zod.z.number().optional());
var searchSchema = import_zod.z.string().optional().transform((val) => val ? String(val) : void 0);
var BaseQuerySchema = (sortingHelper) => {
  const { sortMethodSchema, sortBySchema } = createSortingSchemas(sortingHelper);
  return import_zod.z.preprocess(
    (data) => {
      const page = data.page ? isNaN(data.page) ? 1 : Number(data.page) : void 0;
      const hasPage = !!page;
      return {
        page,
        limit: limitSchema(hasPage).parse(data.limit),
        sortingMethod: sortMethodSchema(hasPage).parse(data.sortingMethod),
        sortBy: sortBySchema(hasPage).parse(data.sortBy),
        search: searchSchema.parse(data.search)
      };
    },
    import_zod.z.object({
      page: import_zod.z.number().optional(),
      limit: import_zod.z.number().optional(),
      sortingMethod: import_zod.z.string().optional(),
      sortBy: import_zod.z.string().optional(),
      search: import_zod.z.string().optional()
    })
  );
};

// src/app/user/user.validator.ts
var UserQuerySchema = (sortingHelper) => {
  const baseSchema = BaseQuerySchema(sortingHelper);
  return import_zod2.z.preprocess(
    (data) => ({
      ...baseSchema.parse(data),
      roleQuery: data.roleQuery ? String(data.roleQuery).split(",") : void 0
    }),
    import_zod2.z.object({
      page: import_zod2.z.number().optional(),
      limit: import_zod2.z.number().optional(),
      sortingMethod: import_zod2.z.string().optional(),
      sortBy: import_zod2.z.string().optional(),
      search: import_zod2.z.string().optional(),
      roleQuery: import_zod2.z.array(import_zod2.z.string()).optional()
    })
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserQuerySchema
});
//# sourceMappingURL=user.validator.cjs.map