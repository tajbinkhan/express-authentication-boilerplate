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

// src/utils/appHelpers.ts
var appHelpers_exports = {};
__export(appHelpers_exports, {
  default: () => AppHelpers
});
module.exports = __toCommonJS(appHelpers_exports);
var crypto = __toESM(require("crypto"), 1);
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
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash("sha256").update(secretKey).digest();
    const cipher = crypto.createCipheriv(algorithm, key, iv);
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
    const now = /* @__PURE__ */ new Date();
    return new Date(now.getTime() + expiryTime * 6e4);
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
//# sourceMappingURL=appHelpers.cjs.map