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

// src/passport/passportCustom.ts
var passportCustom_exports = {};
__export(passportCustom_exports, {
  default: () => passportCustom_default
});
module.exports = __toCommonJS(passportCustom_exports);
var import_passport = __toESM(require("passport"), 1);
var import_passport_custom = require("passport-custom");

// src/app/authentication/authentication.JWT.ts
var import_hkdf = require("@panva/hkdf");
var import_jose = require("jose");

// src/core/constants.ts
var sessionTimeout = 1e3 * 60 * 60 * 24 * 7;
var csrfTimeout = 1e3 * 60 * 60;

// src/app/authentication/authentication.JWT.ts
var alg = "dir";
var enc = "A256CBC-HS512";
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

// src/app/authentication/authentication.service.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_drizzle_orm3 = require("drizzle-orm");

// src/databases/drizzle/connection.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_postgres_js = require("drizzle-orm/postgres-js");
var import_postgres = __toESM(require("postgres"), 1);

// src/models/drizzle/authentication.model.ts
var authentication_model_exports = {};
__export(authentication_model_exports, {
  ROLE_TYPE: () => ROLE_TYPE,
  TOKEN_TYPE: () => TOKEN_TYPE,
  accounts: () => accounts,
  accountsRelations: () => accountsRelations,
  sessions: () => sessions,
  sessionsRelations: () => sessionsRelations,
  users: () => users,
  usersRelations: () => usersRelations,
  verificationToken: () => verificationToken
});
var import_drizzle_orm = require("drizzle-orm");
var import_pg_core2 = require("drizzle-orm/pg-core");

// src/databases/drizzle/helpers.ts
var import_pg_core = require("drizzle-orm/pg-core");
var timestamps = {
  createdAt: (0, import_pg_core.timestamp)("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
};

// src/databases/drizzle/lists.ts
var ROLE_LIST = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMINISTRATOR: "ADMINISTRATOR",
  EDITOR: "EDITOR",
  AUTHOR: "AUTHOR",
  CONTRIBUTOR: "CONTRIBUTOR",
  SUBSCRIBER: "SUBSCRIBER",
  enumValues: ["SUPER_ADMIN", "ADMINISTRATOR", "EDITOR", "AUTHOR", "CONTRIBUTOR", "SUBSCRIBER"]
};
var TOKEN_LIST = {
  PASSWORD_RESET: "PASSWORD_RESET",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
  LOGIN_OTP: "LOGIN_OTP",
  enumValues: ["PASSWORD_RESET", "EMAIL_VERIFICATION", "LOGIN_OTP"]
};

// src/models/drizzle/authentication.model.ts
var ROLE_TYPE = (0, import_pg_core2.pgEnum)("role_type", ROLE_LIST.enumValues);
var TOKEN_TYPE = (0, import_pg_core2.pgEnum)("token_type", TOKEN_LIST.enumValues);
var users = (0, import_pg_core2.pgTable)("user", {
  id: (0, import_pg_core2.serial)("id").primaryKey(),
  name: (0, import_pg_core2.text)("name"),
  username: (0, import_pg_core2.text)("username").unique(),
  email: (0, import_pg_core2.text)("email").unique(),
  password: (0, import_pg_core2.text)("password"),
  emailVerified: (0, import_pg_core2.timestamp)("email_verified", { withTimezone: true }),
  image: (0, import_pg_core2.text)("image"),
  role: ROLE_TYPE("role").default("SUBSCRIBER"),
  ...timestamps
});
var accounts = (0, import_pg_core2.pgTable)("account", {
  id: (0, import_pg_core2.serial)("id").primaryKey(),
  userId: (0, import_pg_core2.integer)("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: (0, import_pg_core2.text)("type").notNull(),
  provider: (0, import_pg_core2.text)("provider").notNull(),
  providerAccountId: (0, import_pg_core2.text)("provider_account_id").notNull(),
  refreshToken: (0, import_pg_core2.text)("refresh_token"),
  accessToken: (0, import_pg_core2.text)("access_token"),
  expiresAt: (0, import_pg_core2.integer)("expires_at"),
  tokenType: (0, import_pg_core2.text)("token_type"),
  scope: (0, import_pg_core2.text)("scope"),
  idToken: (0, import_pg_core2.text)("id_token"),
  sessionState: (0, import_pg_core2.text)("session_state"),
  ...timestamps
});
var sessions = (0, import_pg_core2.pgTable)("session", {
  id: (0, import_pg_core2.serial)("id").primaryKey(),
  sessionId: (0, import_pg_core2.text)("session_id").notNull().unique(),
  sessionCookie: (0, import_pg_core2.text)("session_cookie").unique(),
  userId: (0, import_pg_core2.integer)("user_id").references(() => users.id, { onDelete: "cascade" }),
  expires: (0, import_pg_core2.timestamp)("expires", { withTimezone: true }).notNull(),
  ...timestamps
});
var verificationToken = (0, import_pg_core2.pgTable)(
  "verification_token",
  {
    id: (0, import_pg_core2.serial)("id").primaryKey(),
    identifier: (0, import_pg_core2.text)("identifier").notNull(),
    token: (0, import_pg_core2.text)("token").notNull(),
    tokenType: TOKEN_TYPE("token_type").notNull(),
    expires: (0, import_pg_core2.timestamp)("expires", { withTimezone: true }).notNull(),
    ...timestamps
  },
  (table) => ({
    identifierTypeIdx: (0, import_pg_core2.uniqueIndex)("identifier_type_idx").on(table.identifier, table.tokenType)
  })
);
var usersRelations = (0, import_drizzle_orm.relations)(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions)
}));
var accountsRelations = (0, import_drizzle_orm.relations)(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id]
  })
}));
var sessionsRelations = (0, import_drizzle_orm.relations)(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}));

// src/models/drizzle/todo.model.ts
var todo_model_exports = {};
__export(todo_model_exports, {
  todo: () => todo
});
var import_pg_core3 = require("drizzle-orm/pg-core");
var todo = (0, import_pg_core3.pgTable)("todo", {
  id: (0, import_pg_core3.serial)("id").primaryKey(),
  title: (0, import_pg_core3.varchar)("title", { length: 255 }).notNull(),
  description: (0, import_pg_core3.text)("description").notNull(),
  ...timestamps
});

// src/databases/drizzle/schema.ts
var schema = {
  ...todo_model_exports,
  ...authentication_model_exports
};
var schema_default = schema;

// src/databases/drizzle/connection.ts
import_dotenv.default.config();
var sql = (0, import_postgres.default)(process.env.DATABASE_URL);
var db = (0, import_postgres_js.drizzle)(sql, { schema: schema_default });
var pool = (0, import_postgres.default)(process.env.DATABASE_URL, { max: 1 });
var dbPool = (0, import_postgres_js.drizzle)(pool);
var connection_default = db;

// src/databases/drizzle/service.ts
var DrizzleService = class {
  db;
  constructor() {
    this.db = connection_default;
  }
};

// src/service/otpService.ts
var import_drizzle_orm2 = require("drizzle-orm");

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
    const timestamp3 = (/* @__PURE__ */ new Date()).toISOString();
    const data = `${timestamp3}:${userId}`;
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

// src/service/otpService.ts
var OTPService = class extends DrizzleService {
  async limitOTPRequest(user, tokenType, timeLimit = 5) {
    try {
      const otpRequestCount = await this.db.query.verificationToken.findFirst({
        where: (0, import_drizzle_orm2.and)(
          (0, import_drizzle_orm2.eq)(verificationToken.identifier, user.email),
          (0, import_drizzle_orm2.eq)(verificationToken.tokenType, tokenType)
        )
      });
      const currentMinute = (/* @__PURE__ */ new Date()).getTime();
      const otpRequestUpdateTime = new Date(otpRequestCount?.updatedAt).getTime();
      const timeDifference = currentMinute - otpRequestUpdateTime;
      const timeDifferenceInMinutes = Math.floor(timeDifference / 6e4);
      console.log("Time difference in minutes: ", timeDifferenceInMinutes);
      if (otpRequestCount && timeDifferenceInMinutes < timeLimit) {
        const message = `You can only request OTP per ${timeLimit} minute(s). Please wait for ${timeLimit - timeDifferenceInMinutes} minute(s)`;
        return ServiceResponse.createRejectResponse(status.HTTP_429_TOO_MANY_REQUESTS, message);
      }
      return Promise.resolve(true);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async saveOTPToDatabase(user, tokenType, expiresAt = AppHelpers.OTPExpiry()) {
    try {
      if (!user.email)
        return ServiceResponse.createRejectResponse(
          status.HTTP_404_NOT_FOUND,
          "Email is not registered"
        );
      await this.limitOTPRequest(user, tokenType);
      const generatedOTP = AppHelpers.OTPGenerator();
      await this.db.insert(verificationToken).values({
        identifier: user.email,
        token: String(generatedOTP),
        tokenType,
        expires: expiresAt
      }).onConflictDoUpdate({
        target: [verificationToken.identifier, verificationToken.tokenType],
        set: {
          token: String(generatedOTP),
          expires: expiresAt
        }
      });
      return Promise.resolve(generatedOTP);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async verifyOTPFromDatabase(user, otp, tokenType) {
    try {
      const tokenRecord = await this.db.query.verificationToken.findFirst({
        where: (0, import_drizzle_orm2.and)(
          (0, import_drizzle_orm2.eq)(verificationToken.identifier, user.email),
          (0, import_drizzle_orm2.eq)(verificationToken.token, otp),
          (0, import_drizzle_orm2.eq)(verificationToken.tokenType, tokenType)
        )
      });
      if (!tokenRecord)
        return ServiceResponse.createRejectResponse(status.HTTP_400_BAD_REQUEST, "Invalid OTP");
      if (tokenRecord?.expires && tokenRecord.expires < /* @__PURE__ */ new Date()) {
        await this.deleteOTPFromDatabase(user, tokenType);
        return ServiceResponse.createRejectResponse(status.HTTP_400_BAD_REQUEST, "OTP expired");
      }
      await this.deleteOTPFromDatabase(user, tokenType);
      return Promise.resolve(true);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async deleteOTPFromDatabase(user, tokenType) {
    try {
      await this.db.delete(verificationToken).where(
        (0, import_drizzle_orm2.and)(
          (0, import_drizzle_orm2.eq)(verificationToken.identifier, user.email),
          (0, import_drizzle_orm2.eq)(verificationToken.tokenType, tokenType)
        )
      );
      return Promise.resolve(true);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
};

// src/app/authentication/authentication.service.ts
var AuthenticationService = class extends DrizzleService {
  otpService;
  /**
   * Constructor for AuthenticationService
   */
  constructor() {
    super();
    this.otpService = new OTPService();
  }
  async createUser(data) {
    try {
      data.username && await this.duplicateUserCheckByUsername(data.username);
      data.email && await this.duplicateUserCheckByEmail(data.email);
      const createdUser = await this.db.insert(users).values(data).returning();
      const { password, ...user } = createdUser[0];
      return ServiceResponse.createResponse(
        status.HTTP_201_CREATED,
        "User created successfully",
        user
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async createGoogleAccount(userId, data, accessToken) {
    try {
      const createdGoogleAccount = await this.db.insert(accounts).values({
        userId,
        type: "oauth",
        provider: "google",
        providerAccountId: data.id,
        accessToken,
        refreshToken: null,
        expiresAt: sessionTimeout,
        tokenType: "access_token",
        scope: "profile",
        idToken: data.id,
        sessionState: null
      }).returning();
      return ServiceResponse.createResponse(
        status.HTTP_201_CREATED,
        "Google account created successfully",
        createdGoogleAccount[0]
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async createUserFromGoogle(data, accessToken) {
    try {
      const checkUserExistence = await this.db.query.users.findFirst({
        where: (0, import_drizzle_orm3.eq)(users.email, data._json.email),
        with: {
          accounts: {
            where: (0, import_drizzle_orm3.and)((0, import_drizzle_orm3.eq)(accounts.providerAccountId, data.id), (0, import_drizzle_orm3.eq)(accounts.provider, "google"))
          }
        }
      });
      if (checkUserExistence) {
        if (checkUserExistence.accounts.length > 0) {
          await this.db.update(accounts).set({ accessToken }).where((0, import_drizzle_orm3.eq)(accounts.providerAccountId, data.id));
          if (!checkUserExistence.emailVerified)
            await this.accountVerification(checkUserExistence.id);
          const { accounts: userAccounts, ...user } = checkUserExistence;
          return ServiceResponse.createResponse(
            status.HTTP_200_OK,
            "Google account updated successfully",
            user
          );
        } else {
          await this.createGoogleAccount(checkUserExistence.id, data, accessToken);
          const { accounts: userAccounts, ...user } = checkUserExistence;
          return ServiceResponse.createResponse(
            status.HTTP_201_CREATED,
            "Google account created successfully",
            user
          );
        }
      }
      const createdUser = await this.createUser({
        name: data._json.name,
        email: data._json.email,
        username: data._json.email.split("@")[0],
        password: null,
        emailVerified: /* @__PURE__ */ new Date(),
        image: data._json.picture
      });
      await this.createGoogleAccount(createdUser.data?.id, data, accessToken);
      return ServiceResponse.createResponse(
        status.HTTP_201_CREATED,
        "User created successfully",
        createdUser.data
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async findUserByUsernameOrEmail(username) {
    try {
      const inputType = AppHelpers.detectInputType(username);
      let findUser = {};
      if (inputType === "EMAIL") {
        const user = await this.findUserByEmail(username, true);
        findUser = user.data;
        return ServiceResponse.createResponse(
          status.HTTP_200_OK,
          "User found successfully",
          findUser
        );
      } else if (inputType === "USERNAME") {
        const user = await this.findUserByUsername(username, true);
        findUser = user.data;
        return ServiceResponse.createResponse(
          status.HTTP_200_OK,
          "User found successfully",
          findUser
        );
      }
      return ServiceResponse.createResponse(
        status.HTTP_400_BAD_REQUEST,
        "Invalid input type",
        findUser
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async findUserById(id, withPassword = false) {
    try {
      const user = await this.db.query.users.findFirst({
        where: (0, import_drizzle_orm3.eq)(users.id, id)
      });
      if (!user)
        return ServiceResponse.createRejectResponse(status.HTTP_404_NOT_FOUND, "User not found");
      if (withPassword)
        return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);
      const { password, ...userData } = user;
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "User found successfully",
        userData
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async findUserByEmail(email, withPassword = false) {
    try {
      const user = await this.db.query.users.findFirst({
        where: (0, import_drizzle_orm3.eq)(users.email, email)
      });
      if (!user)
        return ServiceResponse.createRejectResponse(status.HTTP_404_NOT_FOUND, "User not found");
      if (withPassword)
        return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);
      const { password, ...userData } = user;
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "User found successfully",
        userData
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async findUserByUsername(username, withPassword = false) {
    try {
      const user = await this.db.query.users.findFirst({
        where: (0, import_drizzle_orm3.eq)(users.username, username)
      });
      if (!user)
        return ServiceResponse.createRejectResponse(status.HTTP_404_NOT_FOUND, "User not found");
      if (withPassword)
        return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);
      const { password, ...userData } = user;
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "User found successfully",
        userData
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async duplicateUserCheckByEmail(email) {
    try {
      const user = await this.db.query.users.findFirst({
        where: (0, import_drizzle_orm3.eq)(users.email, email)
      });
      if (user)
        return ServiceResponse.createRejectResponse(
          status.HTTP_409_CONFLICT,
          "User already exists"
        );
      return ServiceResponse.createResponse(status.HTTP_200_OK, "User does not exist", false);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async duplicateUserCheckByUsername(username) {
    try {
      const user = await this.db.query.users.findFirst({
        where: (0, import_drizzle_orm3.eq)(users.username, username)
      });
      if (user)
        return ServiceResponse.createRejectResponse(
          status.HTTP_409_CONFLICT,
          "User already exists"
        );
      return ServiceResponse.createResponse(status.HTTP_200_OK, "User does not exist", false);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async passwordChecker(password, hashedPassword) {
    try {
      if (!hashedPassword) {
        return ServiceResponse.createRejectResponse(
          status.HTTP_400_BAD_REQUEST,
          "User account has no password"
        );
      }
      const check = await import_bcrypt.default.compare(password, hashedPassword);
      if (!check)
        return ServiceResponse.createRejectResponse(
          status.HTTP_400_BAD_REQUEST,
          "Password incorrect"
        );
      return ServiceResponse.createResponse(status.HTTP_200_OK, "Password checked", check);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async accountVerification(id) {
    try {
      await this.db.update(users).set({
        emailVerified: /* @__PURE__ */ new Date()
      }).where((0, import_drizzle_orm3.eq)(users.id, id));
      return ServiceResponse.createResponse(status.HTTP_200_OK, "User verified", true);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async checkAccountVerification(id) {
    try {
      const user = await this.findUserById(id);
      if (!user.data?.emailVerified)
        return ServiceResponse.createRejectResponse(
          status.HTTP_400_BAD_REQUEST,
          "User is not verified"
        );
      return ServiceResponse.createResponse(status.HTTP_200_OK, "User is verified", true);
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async changePassword(id, newPassword) {
    try {
      const hashedPassword = await import_bcrypt.default.hash(newPassword, 10);
      await this.db.update(users).set({
        password: hashedPassword
      }).where((0, import_drizzle_orm3.eq)(users.id, id));
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "Password changed successfully",
        true
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
};

// src/passport/passportCustom.ts
var authenticationService = new AuthenticationService();
var jwtTokenName = process.env.SESSION_COOKIE_NAME;
import_passport.default.serializeUser(async (user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error, false);
  }
});
import_passport.default.deserializeUser(async (id, done) => {
  try {
    const user = await authenticationService.findUserById(id);
    done(null, user.data);
  } catch (error) {
    done(error, false);
  }
});
var passportCustom_default = import_passport.default.use(
  "jwtAuthentication",
  new import_passport_custom.Strategy(async (req, done) => {
    try {
      const token = req.cookies[jwtTokenName];
      if (!token)
        return done({ status: status.HTTP_403_FORBIDDEN, message: "Token not found" }, false);
      const decodeToken = await decode({ token });
      if (!decodeToken)
        return done({ status: status.HTTP_403_FORBIDDEN, message: "Token not found" }, false);
      const findUser = await authenticationService.findUserByUsername(String(decodeToken.username));
      done(null, findUser.data);
    } catch (error) {
      done(error, false);
    }
  })
);
//# sourceMappingURL=passportCustom.cjs.map