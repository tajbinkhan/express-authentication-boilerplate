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

// src/middlewares/authentication.middleware.ts
var authentication_middleware_exports = {};
__export(authentication_middleware_exports, {
  authenticationMiddleware: () => authenticationMiddleware
});
module.exports = __toCommonJS(authentication_middleware_exports);

// src/app/authentication/authentication.JWT.ts
var import_hkdf = require("@panva/hkdf");
var import_jose = require("jose");

// src/core/constants.ts
var sessionTimeout = 1e3 * 60 * 60 * 24 * 7;
var csrfTimeout = 1e3 * 60 * 60;

// src/app/authentication/authentication.JWT.ts
var DEFAULT_MAX_AGE = sessionTimeout;
var now = () => Date.now() / 1e3 | 0;
var alg = "dir";
var enc = "A256CBC-HS512";
async function encode(params) {
  const {
    token,
    secret = process.env.SECRET,
    maxAge = DEFAULT_MAX_AGE,
    salt = process.env.SESSION_COOKIE_NAME
  } = params;
  const secrets = Array.isArray(secret) ? secret : [secret];
  const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);
  const thumbprint = await (0, import_jose.calculateJwkThumbprint)(
    { kty: "oct", k: import_jose.base64url.encode(encryptionSecret) },
    `sha${encryptionSecret.byteLength << 3}`
  );
  const generatedToken = await new import_jose.EncryptJWT(token).setProtectedHeader({ alg, enc, kid: thumbprint }).setIssuedAt().setExpirationTime(now() + maxAge).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
  return generatedToken;
}
async function decode(params) {
  const { token, secret = process.env.SECRET, salt = process.env.SESSION_COOKIE_NAME } = params;
  const secrets = Array.isArray(secret) ? secret : [secret];
  if (!token) return null;
  const { payload } = await (0, import_jose.jwtDecrypt)(
    token,
    async ({ kid, enc: enc2 }) => {
      for (const secret2 of secrets) {
        const encryptionSecret = await getDerivedEncryptionKey(enc2, secret2, salt);
        if (kid === void 0) return encryptionSecret;
        const thumbprint = await (0, import_jose.calculateJwkThumbprint)(
          { kty: "oct", k: import_jose.base64url.encode(encryptionSecret) },
          `sha${encryptionSecret.byteLength << 3}`
        );
        if (kid === thumbprint) return encryptionSecret;
      }
      throw new Error("no matching decryption secret");
    },
    {
      clockTolerance: 15,
      keyManagementAlgorithms: [alg],
      contentEncryptionAlgorithms: [enc, "A256GCM"]
    }
  );
  return payload;
}
async function getDerivedEncryptionKey(enc2, keyMaterial, salt) {
  let length;
  switch (enc2) {
    case "A256CBC-HS512":
      length = 64;
      break;
    case "A256GCM":
      length = 32;
      break;
    default:
      throw new Error("Unsupported JWT Content Encryption Algorithm");
  }
  return await (0, import_hkdf.hkdf)(
    "sha256",
    keyMaterial,
    salt,
    `Express.js Generated Encryption Key (${salt})`,
    length
  );
}

// src/utils/appHelpers.ts
var crypto2 = __toESM(require("crypto"), 1);
var AppHelpers = class {
  /**
   * Encodes a buffer into a base32 string.
   * @param buffer - The buffer to encode.
   * @returns The base32 encoded string.
   */
  base32Encode(buffer) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let result = "";
    let bits = 0;
    let value = 0;
    for (let i = 0; i < buffer.length; i++) {
      value = value << 8 | buffer[i];
      bits += 8;
      while (bits >= 5) {
        result += alphabet[value >>> bits - 5 & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      result += alphabet[value << 5 - bits & 31];
    }
    return result;
  }
  /**
   * Generates a token using the user information and a secret key.
   * @param userInfo - The user information to encrypt.
   * @param secretKey - The secret key to encrypt the user information.
   * @returns The generated token.
   */
  generateToken(userId, secretKey) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const data = `${timestamp}:${userId}`;
    const buffer = Buffer.from(data, "utf-8");
    const algorithm = "aes-256-cbc";
    const iv = crypto2.randomBytes(16);
    const key = crypto2.createHash("sha256").update(secretKey).digest();
    const cipher = crypto2.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    const encryptedBuffer = Buffer.concat([iv, encrypted]);
    return this.base32Encode(encryptedBuffer);
  }
  /**
   * Determines if the input is an email or a username.
   * @param input - The user-provided input.
   * @returns "email" if the input is an email, "username" otherwise.
   */
  static detectInputType(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) ? "EMAIL" : "USERNAME";
  }
  /**
   * Generates a random OTP of the specified length.
   * @param length - The length of the OTP to generate.
   * @returns The generated OTP.
   * @throws An error if the length is less than 4.
   */
  static OTPGenerator(length = 4) {
    if (length < 4) {
      throw new Error("The OTP length must be at least 4.");
    }
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /**
   * Generate OTP expiry time.
   * @param expiryTime - The expiry time in minutes.
   * @returns The expiry time in Date format.
   */
  static OTPExpiry(expiryTime = 5) {
    const now2 = /* @__PURE__ */ new Date();
    return new Date(now2.getTime() + expiryTime * 6e4);
  }
  /**
   * Determines the appropriate SameSite and secure settings for cookies based on the provided URLs.
   * @returns The SameSite and secure settings for cookies.
   */
  static sameSiteCookieConfig() {
    try {
      const appUrl = process.env.APP_URL;
      const apiUrl = true ? process.env.API_URL : `http://localhost:${process.env.PORT}`;
      const appUrlObj = new URL(appUrl);
      const apiUrlObj = new URL(apiUrl);
      const getBaseDomain = (hostname) => {
        const parts = hostname.split(".");
        return parts.slice(-2).join(".");
      };
      const appBaseDomain = getBaseDomain(appUrlObj.hostname);
      const apiBaseDomain = getBaseDomain(apiUrlObj.hostname);
      const isSecure = appUrlObj.protocol === "https:" || apiUrlObj.protocol === "https:";
      let domain;
      if (appBaseDomain === apiBaseDomain && !appUrlObj.hostname.includes("localhost")) {
        domain = "." + appBaseDomain;
      }
      if (apiUrlObj.hostname.includes("localhost")) {
        domain = apiUrlObj.hostname;
      }
      let sameSite;
      if (appBaseDomain === apiBaseDomain) {
        sameSite = "strict";
      } else if (appUrlObj.hostname.includes("localhost") && apiUrlObj.hostname.includes("localhost")) {
        sameSite = "lax";
      } else {
        sameSite = "none";
      }
      return {
        sameSite,
        secure: isSecure,
        domain
      };
    } catch (error) {
      return {
        sameSite: "lax",
        secure: true
      };
    }
  }
};

// src/service/cookieService.ts
var CookieService = class {
  request;
  response;
  jwtCookieName;
  sessionCookieName;
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.jwtCookieName = process.env.JWT_COOKIE_NAME;
    this.sessionCookieName = process.env.SESSION_COOKIE_NAME;
  }
  async saveCookieToBrowser(user) {
    try {
      const accessToken = await encode({
        token: user
      });
      this.response.cookie(this.jwtCookieName, accessToken, {
        httpOnly: true,
        maxAge: sessionTimeout,
        sameSite: AppHelpers.sameSiteCookieConfig().sameSite,
        secure: AppHelpers.sameSiteCookieConfig().secure,
        ...AppHelpers.sameSiteCookieConfig().domain && {
          domain: AppHelpers.sameSiteCookieConfig().domain
        }
      });
      return Promise.resolve(accessToken);
    } catch (error) {
      return Promise.resolve(null);
    }
  }
  async clearCookieFromBrowser() {
    this.response.clearCookie(this.jwtCookieName);
    this.response.clearCookie(this.sessionCookieName);
  }
};

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
var NO_CONTENT_STATUSES = /* @__PURE__ */ new Set([status.HTTP_204_NO_DATA]);
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

// src/middlewares/authentication.middleware.ts
var jwtTokenName = process.env.JWT_COOKIE_NAME;
var sessionCookieName = process.env.SESSION_COOKIE_NAME;
var authenticationMiddleware = async (req, res, next) => {
  const apiResponse = new ApiResponse(res);
  try {
    const token = req.cookies[jwtTokenName];
    if (!token) {
      res.clearCookie(jwtTokenName);
      res.clearCookie(sessionCookieName);
      apiResponse.unauthorizedResponse("Unauthorized: No token provided");
      return;
    }
    const decodeToken = await decode({ token });
    if (!decodeToken) {
      res.clearCookie(jwtTokenName);
      res.clearCookie(sessionCookieName);
      apiResponse.unauthorizedResponse("Unauthorized: Invalid token");
      return;
    }
    if (!req.isAuthenticated()) {
      res.clearCookie(jwtTokenName);
      res.clearCookie(sessionCookieName);
      apiResponse.unauthorizedResponse("Unauthorized: Not authenticated");
      return;
    }
    const { iat, jti, exp, password, ...rest } = decodeToken;
    const cookieService = new CookieService(req, res);
    await cookieService.saveCookieToBrowser(rest);
    next();
  } catch (error) {
    res.clearCookie(jwtTokenName);
    res.clearCookie(sessionCookieName);
    console.error("Authentication middleware error:", error);
    apiResponse.unauthorizedResponse("Unauthorized");
    return;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticationMiddleware
});
//# sourceMappingURL=authentication.middleware.cjs.map