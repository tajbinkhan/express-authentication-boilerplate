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

// src/app/authentication/authentication.JWT.ts
var authentication_JWT_exports = {};
__export(authentication_JWT_exports, {
  decode: () => decode,
  encode: () => encode
});
module.exports = __toCommonJS(authentication_JWT_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decode,
  encode
});
//# sourceMappingURL=authentication.JWT.cjs.map