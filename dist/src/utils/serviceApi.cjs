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

// src/utils/serviceApi.ts
var serviceApi_exports = {};
__export(serviceApi_exports, {
  ApiResponse: () => ApiResponse,
  ServiceResponse: () => ServiceResponse
});
module.exports = __toCommonJS(serviceApi_exports);

// src/utils/statusCodes.ts
var status = {
  HTTP_100_CONTINUE: 100,
  HTTP_101_SWITCHING_PROTOCOLS: 101,
  HTTP_102_PROCESSING: 102,
  HTTP_103_EARLY_HINTS: 103,
  HTTP_200_OK: 200,
  HTTP_201_CREATED: 201,
  HTTP_202_ACCEPTED: 202,
  HTTP_203_NON_AUTHORITATIVE_INFORMATION: 203,
  HTTP_204_NO_DATA: 204,
  HTTP_205_RESET_DATA: 205,
  HTTP_206_PARTIAL_DATA: 206,
  HTTP_207_MULTI_STATUS: 207,
  HTTP_208_ALREADY_REPORTED: 208,
  HTTP_226_IM_USED: 226,
  HTTP_300_MULTIPLE_CHOICES: 300,
  HTTP_301_MOVED_PERMANENTLY: 301,
  HTTP_302_FOUND: 302,
  HTTP_303_SEE_OTHER: 303,
  HTTP_304_NOT_MODIFIED: 304,
  HTTP_305_USE_PROXY: 305,
  HTTP_306_SWITCH_PROXY: 306,
  HTTP_307_TEMPORARY_REDIRECT: 307,
  HTTP_308_PERMANENT_REDIRECT: 308,
  HTTP_400_BAD_REQUEST: 400,
  HTTP_401_UNAUTHORIZED: 401,
  HTTP_402_PAYMENT_REQUIRED: 402,
  HTTP_403_FORBIDDEN: 403,
  HTTP_404_NOT_FOUND: 404,
  HTTP_405_METHOD_NOT_ALLOWED: 405,
  HTTP_406_NOT_ACCEPTABLE: 406,
  HTTP_407_PROXY_AUTHENTICATION_REQUIRED: 407,
  HTTP_408_REQUEST_TIMEOUT: 408,
  HTTP_409_CONFLICT: 409,
  HTTP_410_GONE: 410,
  HTTP_411_LENGTH_REQUIRED: 411,
  HTTP_412_PRECONDITION_FAILED: 412,
  HTTP_413_PAYLOAD_TOO_LARGE: 413,
  HTTP_414_URI_TOO_LONG: 414,
  HTTP_415_UNSUPPORTED_MEDIA_TYPE: 415,
  HTTP_416_RANGE_NOT_SATISFIABLE: 416,
  HTTP_417_EXPECTATION_FAILED: 417,
  HTTP_418_IM_A_TEAPOT: 418,
  HTTP_421_MISDIRECTED_REQUEST: 421,
  HTTP_422_UNPROCESSABLE_ENTITY: 422,
  HTTP_423_LOCKED: 423,
  HTTP_424_FAILED_DEPENDENCY: 424,
  HTTP_425_TOO_EARLY: 425,
  HTTP_426_UPGRADE_REQUIRED: 426,
  HTTP_428_PRECONDITION_REQUIRED: 428,
  HTTP_429_TOO_MANY_REQUESTS: 429,
  HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  HTTP_500_INTERNAL_SERVER_ERROR: 500,
  HTTP_501_NOT_IMPLEMENTED: 501,
  HTTP_502_BAD_GATEWAY: 502,
  HTTP_503_SERVICE_UNAVAILABLE: 503,
  HTTP_504_GATEWAY_TIMEOUT: 504,
  HTTP_505_HTTP_VERSION_NOT_SUPPORTED: 505,
  HTTP_506_VARIANT_ALSO_NEGOTIATES: 506,
  HTTP_507_INSUFFICIENT_STORAGE: 507,
  HTTP_508_LOOP_DETECTED: 508,
  HTTP_510_NOT_EXTENDED: 510,
  HTTP_511_NETWORK_AUTHENTICATION_REQUIRED: 511
};

// src/utils/serviceApi.ts
var isApiError = (error) => {
  return error !== null && typeof error === "object" && "status" in error && typeof error.status === "number" && "message" in error && typeof error.message === "string";
};
var NO_CONTENT_STATUSES = /* @__PURE__ */ new Set([status.HTTP_204_NO_DATA]);
var ServiceResponse = class {
  static async createResponse(status2, message, data, pagination) {
    if (NO_CONTENT_STATUSES.has(status2)) {
      return Promise.resolve({ status: status2, message, data: void 0 });
    }
    return Promise.resolve({ status: status2, message, data, pagination });
  }
  static async createRejectResponse(status2, message) {
    return Promise.reject({ status: status2, message });
  }
  static createErrorResponse(error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    if (isApiError(error)) return Promise.reject(error);
    return Promise.reject({
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: "Internal Server Error"
    });
  }
};
var ApiResponse = class {
  response;
  constructor(response) {
    this.response = response;
  }
  successResponse(message, data, pagination) {
    return this.sendResponse({
      status: status.HTTP_200_OK,
      message,
      data,
      pagination
    });
  }
  unauthorizedResponse(message) {
    return this.sendResponse({
      status: status.HTTP_401_UNAUTHORIZED,
      message
    });
  }
  forbiddenResponse(message) {
    return this.sendResponse({
      status: status.HTTP_403_FORBIDDEN,
      message
    });
  }
  badResponse(message) {
    return this.sendResponse({
      status: status.HTTP_400_BAD_REQUEST,
      message
    });
  }
  internalServerError(message = "Internal Server Error") {
    return this.sendResponse({
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message
    });
  }
  sendResponse({ status: status2, message, data, pagination }) {
    if (NO_CONTENT_STATUSES.has(status2)) {
      return this.response.status(status2).json({});
    }
    const responseBody = { status: status2, message };
    if (data !== void 0) {
      responseBody.data = data;
    }
    if (pagination) {
      responseBody.pagination = pagination;
    }
    return this.response.status(status2).json(responseBody);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiResponse,
  ServiceResponse
});
//# sourceMappingURL=serviceApi.cjs.map