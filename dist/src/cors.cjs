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

// src/cors.ts
var cors_exports = {};
__export(cors_exports, {
  corsOptions: () => corsOptions,
  socketCorsConfig: () => socketCorsConfig
});
module.exports = __toCommonJS(cors_exports);
var corsOptions = {
  origin: function(origin, callback) {
    if (!origin || process.env.ORIGIN_URL.split(",").includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token", "ngrok-skip-browser-warning"],
  maxAge: 3600
};
var socketCorsConfig = {
  origin: function(origin, callback) {
    if (!origin || process.env.ORIGIN_URL.split(",").includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  corsOptions,
  socketCorsConfig
});
//# sourceMappingURL=cors.cjs.map