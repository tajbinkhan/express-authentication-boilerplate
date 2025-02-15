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
var __copyProps = (to, from, except, desc3) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc3 = __getOwnPropDesc(from, key)) || desc3.enumerable });
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

// src/routes/routes.config.ts
var routes_config_exports = {};
__export(routes_config_exports, {
  default: () => appRouter
});
module.exports = __toCommonJS(routes_config_exports);

// src/app/authentication/authentication.routes.ts
var import_express = __toESM(require("express"), 1);
var import_passport = __toESM(require("passport"), 1);

// src/app/authentication/authentication.controller.ts
var import_bcrypt2 = __toESM(require("bcrypt"), 1);

// src/app/authentication/authentication.service.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_drizzle_orm3 = require("drizzle-orm");

// src/core/constants.ts
var sessionTimeout = 1e3 * 60 * 60 * 24 * 7;
var csrfTimeout = 1e3 * 60 * 60;

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

// src/app/authentication/authentication.validator.ts
var import_zod2 = require("zod");

// src/core/messages.ts
var zodMessages = {
  error: {
    required: {
      fieldIsRequired: (field) => `${field} is required.`
    },
    limit: {
      stringMin: (field, limit) => `${field} must be at least ${limit} characters.`,
      stringMax: (field, limit) => `${field} must not exceed ${limit} characters.`,
      arrayMin: (field, limit) => `${field} must have at least ${limit} items.`,
      arrayMax: (field, limit) => `${field} must not exceed ${limit} items.`,
      numberMin: (field, limit) => `${field} must be at least ${limit}.`,
      numberMax: (field, limit) => `${field} must not exceed ${limit}.`
    },
    invalid: {
      invalidString: (field) => `${field} must be a string.`,
      invalidEmail: (field) => `${field} must be a valid email address.`,
      invalidNumber: (field) => `${field} must be a number.`,
      invalidBoolean: (field) => `${field} must be a boolean.`,
      invalidDate: (field) => `${field} must be a date.`,
      invalidArray: (field) => `${field} must be an array.`,
      invalidObject: (field) => `${field} must be an object.`,
      invalidEnum: (field, values) => `${field} must be one of the following values: ${values.join(", ")}.`,
      invalidUnion: (field) => `${field} must be one of the specified types.`,
      invalidIntersection: (field) => `${field} must be a combination of the specified types.`,
      invalidTuple: (field) => `${field} must be a tuple.`,
      invalidRecord: (field) => `${field} must be a record.`,
      invalidLiteral: (field, value) => `${field} must be the literal value: ${value}.`,
      invalidNull: (field) => `${field} must be null.`,
      invalidUndefined: (field) => `${field} must be undefined.`,
      invalidOptional: (field) => `${field} must be optional.`,
      invalidNullable: (field) => `${field} must be nullable.`,
      invalidPromise: (field) => `${field} must be a promise.`,
      invalidFunction: (field) => `${field} must be a function.`,
      invalidClass: (field) => `${field} must be a class.`,
      invalidUnknown: (field) => `${field} must be unknown.`,
      invalidNever: (field) => `${field} must be never.`,
      invalidVoid: (field) => `${field} must be void.`,
      invalidAny: (field) => `${field} must be any.`,
      invalidUnknownKeys: (field) => `${field} must have unknown keys.`,
      invalidFile: (field) => `${field} must be a file.`,
      invalidFileSize: (field, limit) => `${field} must not exceed ${limit} bytes.`,
      invalidFileType: (field, type) => `${field} must be of type ${type}.`,
      invalidUpperCase: (field) => `${field} must be at least one upper case.`,
      invalidLowerCase: (field) => `${field} must be at least one lower case.`,
      invalidNumericCase: (field) => `${field} must be at least one number.`,
      invalidUsername: (field) => `${field} must contain only letters, numbers, and underscores.`,
      invalidUsernameOrEmail: (field) => `${field} must be a valid username or email address.`
    }
  }
};

// src/validators/commonRules.ts
var import_zod = require("zod");
var validateString = (name) => {
  return import_zod.z.string({
    required_error: zodMessages.error.required.fieldIsRequired(name),
    invalid_type_error: zodMessages.error.invalid.invalidString(name)
  }).min(1, zodMessages.error.required.fieldIsRequired(name));
};
var validatePositiveNumber = (name) => {
  return import_zod.z.number({
    required_error: zodMessages.error.required.fieldIsRequired(name),
    invalid_type_error: zodMessages.error.invalid.invalidNumber(name)
  }).min(1, zodMessages.error.required.fieldIsRequired(name)).int().positive();
};
var validateUsername = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Username")
}).min(1, zodMessages.error.required.fieldIsRequired("Username")).max(20, zodMessages.error.limit.stringMax("Username", 20)).regex(new RegExp("^[a-zA-Z0-9_]*$"), zodMessages.error.invalid.invalidUsername("Username"));
var validateEmail = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Email")
}).min(1, zodMessages.error.required.fieldIsRequired("Email")).email(zodMessages.error.invalid.invalidEmail("Email"));
var validateUsernameOrEmail = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Username or email"),
  invalid_type_error: zodMessages.error.invalid.invalidString("Username or email")
}).min(1, zodMessages.error.required.fieldIsRequired("Username or email")).max(255, zodMessages.error.limit.numberMax("Username or email", 255)).refine((value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]*$/;
  if (value.includes("@")) {
    return emailRegex.test(value);
  }
  return usernameRegex.test(value) && value.length >= 1 && value.length <= 20;
}, zodMessages.error.invalid.invalidUsernameOrEmail("Username or email"));
var validatePassword = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Password")
}).min(1, zodMessages.error.required.fieldIsRequired("Password")).min(6, zodMessages.error.limit.stringMin("Password", 6)).regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("Password")).regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("Password")).regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("Password"));
var validateNewPassword = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("New Password")
}).min(1, zodMessages.error.required.fieldIsRequired("New Password")).min(6, zodMessages.error.limit.stringMin("New Password", 6)).regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("New Password")).regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("New Password")).regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("New Password"));
var validateConfirmPassword = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Confirm Password")
}).min(1, zodMessages.error.required.fieldIsRequired("Confirm Password")).min(6, zodMessages.error.limit.stringMin("Confirm Password", 6)).regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("Confirm Password")).regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("Confirm Password")).regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("Confirm Password"));

// src/app/authentication/authentication.validator.ts
var UsernameLoginSchema = import_zod2.z.object({
  username: validateUsernameOrEmail,
  password: validatePassword,
  otp: import_zod2.z.boolean({
    invalid_type_error: zodMessages.error.invalid.invalidBoolean("OTP")
  }).optional()
});
var UsernameLoginWithOTPSchema = import_zod2.z.object({
  username: validateUsernameOrEmail,
  password: validatePassword,
  otp: validatePositiveNumber("OTP")
});
var UserRegisterSchema = import_zod2.z.object({
  name: validateString("Name"),
  username: validateUsername,
  email: validateEmail,
  password: validatePassword
});
var UserVerificationSchema = import_zod2.z.object({
  username: validateUsernameOrEmail,
  otp: validatePositiveNumber("OTP")
});
var UserReverificationSchema = import_zod2.z.object({
  username: validateUsernameOrEmail
});
var UserPasswordResetSchema = import_zod2.z.object({
  email: validateEmail,
  otp: validatePositiveNumber("OTP"),
  password: validatePassword
});
var UserChangePasswordSchema = import_zod2.z.object({
  oldPassword: validatePassword,
  newPassword: validateNewPassword
});

// src/controllers/base/api.controller.ts
var ApiController = class {
  request;
  response;
  searchParams;
  apiResponse;
  constructor(req, res) {
    this.request = req;
    this.response = res;
    this.apiResponse = new ApiResponse(res);
    this.searchParams = this.getQueryParam(req);
  }
  getReqBody() {
    return this.request.body;
  }
  getQueryParam(request) {
    const queryParams = request.query;
    const handler = {
      get: (target, prop) => {
        return target[prop] || null;
      }
    };
    return new Proxy(queryParams, handler);
  }
};

// src/app/authentication/authentication.JWT.ts
var import_hkdf = require("@panva/hkdf");
var import_jose = require("jose");
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

// src/service/emailService.ts
var import_ejs = __toESM(require("ejs"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_path = __toESM(require("path"), 1);
var __dirname = process.cwd();
var templatesPath = import_path.default.join(__dirname, "public/templates");
var sendEmail = async ({
  email,
  emailSubject,
  template,
  data,
  user = process.env.EMAIL_SERVER_USER,
  password = process.env.EMAIL_SERVER_PASSWORD,
  emailFrom = process.env.EMAIL_FROM
}) => {
  const transporter = import_nodemailer.default.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user,
      pass: password
    },
    secure: false
  });
  const html = await import_ejs.default.renderFile(import_path.default.join(templatesPath, `${template}.ejs`), data, {
    async: true
  });
  const mailOptions = {
    from: emailFrom,
    to: email,
    reply_to: emailFrom,
    subject: emailSubject,
    html
  };
  try {
    const report = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", report.messageId);
    return Promise.resolve(report);
  } catch (error) {
    return Promise.reject(error);
  }
};
var emailService_default = sendEmail;

// src/app/authentication/authentication.controller.ts
var AuthenticationController = class extends ApiController {
  authenticationService;
  otpService;
  cookieService;
  /**
   * Construct the controller
   *
   * @param request
   * @param response
   */
  constructor(request, response) {
    super(request, response);
    this.authenticationService = new AuthenticationService();
    this.otpService = new OTPService();
    this.cookieService = new CookieService(request, response);
  }
  async register() {
    try {
      const body = this.getReqBody();
      const check = UserRegisterSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      const extendedData = {
        ...check.data,
        image: null,
        emailVerified: null,
        password: import_bcrypt2.default.hashSync(check.data.password, 10)
      };
      const user = await this.authenticationService.createUser(extendedData);
      const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.EMAIL_VERIFICATION);
      if (otp && user.data.email) {
        emailService_default({
          email: user.data.email,
          emailSubject: "Your account verification OTP",
          template: "otpEmailTemplate",
          data: {
            username: user.data.username,
            otp,
            otpExpirationTime: 5
          }
        });
      }
      return this.apiResponse.sendResponse(user);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async loginWithUsername() {
    try {
      const body = this.getReqBody();
      const check = UsernameLoginSchema.safeParse(body);
      if (!check.success) {
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      }
      const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
      await this.authenticationService.checkAccountVerification(user.data.id);
      await this.authenticationService.passwordChecker(check.data.password, user.data.password);
      const { password, ...userData } = user.data;
      const accessToken = await this.cookieService.saveCookieToBrowser(userData);
      this.request.login(user.data, (err) => {
        if (err) {
          return this.apiResponse.sendResponse({
            status: status.HTTP_500_INTERNAL_SERVER_ERROR,
            message: "Login failed"
          });
        }
        const { password: password2, ...userData2 } = user.data;
        return this.apiResponse.successResponse("Login successful", {
          user: userData2,
          token: accessToken
        });
      });
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async loginWithUsernameAndOTP() {
    try {
      const body = this.getReqBody();
      const check = UsernameLoginWithOTPSchema.safeParse(body);
      if (!check.success) {
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      }
      const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
      await this.authenticationService.checkAccountVerification(user.data.id);
      await this.authenticationService.passwordChecker(check.data.password, user.data.password);
      const { password, ...userData } = user.data;
      await this.otpService.verifyOTPFromDatabase(
        userData,
        String(check.data.otp),
        TOKEN_LIST.LOGIN_OTP
      );
      const accessToken = await this.cookieService.saveCookieToBrowser(userData);
      this.request.login(user.data, (err) => {
        if (err) {
          return this.apiResponse.sendResponse({
            status: status.HTTP_500_INTERNAL_SERVER_ERROR,
            message: "Login failed"
          });
        }
        const { password: password2, ...userData2 } = user.data;
        return this.apiResponse.successResponse("Login successful", {
          user: userData2,
          token: accessToken
        });
      });
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async loginWithGoogle() {
    try {
      const user = this.request.user;
      await this.cookieService.saveCookieToBrowser(user);
      const appUrl = process.env.APP_URL + "?success=Google";
      return this.response.redirect(appUrl);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async logout() {
    try {
      this.request.session.destroy((err) => {
        if (err) {
          return this.apiResponse.sendResponse({
            status: status.HTTP_500_INTERNAL_SERVER_ERROR,
            message: "Error logging out"
          });
        }
        this.cookieService.clearCookieFromBrowser();
        return this.apiResponse.successResponse("Logged out");
      });
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async getSession() {
    try {
      const { user } = this.request;
      if (!user) return this.apiResponse.unauthorizedResponse("Unauthorized: Not authenticated");
      return this.apiResponse.successResponse("Authorized", user);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async verifySession() {
    try {
      return this.apiResponse.successResponse("Authorized");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async checkAccountVerification() {
    try {
      const { user } = this.request;
      if (!user?.emailVerified) {
        this.request.session.destroy((err) => {
          if (err) {
            return this.apiResponse.sendResponse({
              status: status.HTTP_500_INTERNAL_SERVER_ERROR,
              message: "Error logging out"
            });
          }
          this.cookieService.clearCookieFromBrowser();
          return this.apiResponse.unauthorizedResponse("Unauthorized: Account is not verified");
        });
        return this.apiResponse.unauthorizedResponse("Unauthorized: Account is not verified");
      }
      return this.apiResponse.successResponse("User is verified");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async checkUser() {
    try {
      const { body } = this.request;
      const check = UsernameLoginSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
      await this.authenticationService.passwordChecker(check.data.password, user.data.password);
      if (check.data.otp) {
        await this.authenticationService.checkAccountVerification(user.data.id);
        const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.LOGIN_OTP);
        if (otp && user.data.email) {
          emailService_default({
            email: user.data.email,
            emailSubject: "Login OTP",
            template: "otpEmailTemplate",
            data: {
              username: user.data.username,
              otp,
              otpExpirationTime: 5
            }
          });
        }
      }
      return this.apiResponse.successResponse("User found");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async verifyUser() {
    try {
      const { body } = this.request;
      const check = UserVerificationSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
      await this.otpService.verifyOTPFromDatabase(
        user.data,
        String(check.data.otp),
        TOKEN_LIST.EMAIL_VERIFICATION
      );
      await this.authenticationService.accountVerification(user.data.id);
      return this.apiResponse.successResponse("User verified");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async resetPassword() {
    try {
      const { body } = this.request;
      if (!body.email) return this.apiResponse.badResponse("Email is required");
      const user = await this.authenticationService.findUserByEmail(body.email);
      const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.PASSWORD_RESET);
      if (otp && user.data.email) {
        emailService_default({
          email: user.data.email,
          emailSubject: "Your password reset OTP",
          template: "otpEmailTemplate",
          data: {
            username: user.data.username,
            otp,
            otpExpirationTime: 5
          }
        });
      }
      return this.apiResponse.successResponse("Password reset OTP sent");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async resetPasswordConfirm() {
    try {
      const { body } = this.request;
      const check = UserPasswordResetSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      const user = await this.authenticationService.findUserByEmail(check.data.email);
      await this.otpService.verifyOTPFromDatabase(
        user.data,
        String(check.data.otp),
        TOKEN_LIST.PASSWORD_RESET
      );
      await this.authenticationService.changePassword(user.data.id, check.data.password);
      return this.apiResponse.successResponse("User password reset");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async changePassword() {
    try {
      const { body, user: UserData } = this.request;
      const check = UserChangePasswordSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      const user = await this.authenticationService.findUserById(UserData?.id, true);
      await this.authenticationService.passwordChecker(check.data.oldPassword, user.data.password);
      const response = await this.authenticationService.changePassword(
        user.data.id,
        check.data.newPassword
      );
      return this.apiResponse.sendResponse(response);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async requestOTPForUnverifiedUser() {
    try {
      const { body } = this.request;
      const check = UserReverificationSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join(", "));
      const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
      if (user.data.emailVerified) return this.apiResponse.badResponse("User is already verified");
      const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.EMAIL_VERIFICATION);
      if (otp && user.data.email) {
        emailService_default({
          email: user.data.email,
          emailSubject: "Your account verification OTP",
          template: "otpEmailTemplate",
          data: {
            username: user.data.username,
            otp,
            otpExpirationTime: 5
          }
        });
      }
      return this.apiResponse.successResponse("OTP sent");
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
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

// src/app/authentication/authentication.routes.ts
var authenticationRouter = (() => {
  const router = import_express.default.Router();
  router.get("/me", authenticationMiddleware, (req, res) => {
    new AuthenticationController(req, res).getSession();
  });
  router.get("/session", authenticationMiddleware, (req, res) => {
    new AuthenticationController(req, res).verifySession();
  });
  router.get("/account-verification", authenticationMiddleware, (req, res) => {
    new AuthenticationController(req, res).checkAccountVerification();
  });
  router.post("/register", (req, res) => {
    new AuthenticationController(req, res).register();
  });
  router.post("/request-otp", (req, res) => {
    new AuthenticationController(req, res).requestOTPForUnverifiedUser();
  });
  router.post("/login", async (req, res) => {
    new AuthenticationController(req, res).loginWithUsername();
  });
  router.post("/login/otp", async (req, res) => {
    new AuthenticationController(req, res).loginWithUsernameAndOTP();
  });
  router.get("/login/google", import_passport.default.authenticate("google", { scope: ["profile", "email"] }));
  router.get(
    "/google/callback",
    import_passport.default.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      new AuthenticationController(req, res).loginWithGoogle();
    }
  );
  router.post("/verify-user", (req, res) => {
    new AuthenticationController(req, res).verifyUser();
  });
  router.post("/check-user", (req, res) => {
    new AuthenticationController(req, res).checkUser();
  });
  router.post("/reset-password", (req, res) => {
    new AuthenticationController(req, res).resetPassword();
  });
  router.post("/reset-password/confirm", (req, res) => {
    new AuthenticationController(req, res).resetPasswordConfirm();
  });
  router.post("/change-password", authenticationMiddleware, (req, res) => {
    new AuthenticationController(req, res).changePassword();
  });
  router.post("/logout", authenticationMiddleware, (req, res) => {
    new AuthenticationController(req, res).logout();
  });
  router.get("/google", (req, res) => {
    res.status(200).send(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Google Login</title>
				<style>
					body {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100vh;
						margin: 0;
						font-family: Arial, sans-serif;
						background-color: #f1f1f1;
					}

					.google-login-btn {
						max-width: 200px;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #4285F4;
						color: white;
						font-family: Arial, sans-serif;
						font-size: 16px;
						font-weight: bold;
						padding: 10px 20px;
						border-radius: 4px;
						text-decoration: none;
						border: none;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
						cursor: pointer;
						transition: background-color 0.3s ease, box-shadow 0.3s ease;
					}

					.google-login-btn:hover {
						background-color: #357AE8;
						box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
					}
				</style>
			</head>
			<body>
				<a href="http://localhost:8080/api/auth/login/google" class="google-login-btn">
					Sign in with Google
				</a>
			</body>
			</html>
			`);
  });
  return router;
})();

// src/app/media/media.routes.ts
var import_express2 = __toESM(require("express"), 1);

// src/app/media/media.service.ts
var MediaService = class extends DrizzleService {
};

// src/multer/processImage.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path4 = __toESM(require("path"), 1);
var import_sharp2 = __toESM(require("sharp"), 1);

// src/multer/converter.ts
var import_path2 = __toESM(require("path"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var convertToWebP = async (filePath, outputDir, fileName) => {
  const outputFilePath = import_path2.default.join(outputDir, `${fileName}.webp`);
  await (0, import_sharp.default)(filePath).webp({ quality: 80 }).toFile(outputFilePath);
  return outputFilePath;
};

// src/multer/fileTypes.ts
var ALLOWED_DOCUMENT_TYPES = {
  "application/pdf": "pdf",
  // Adobe Portable Document Format
  "application/msword": "doc",
  // Microsoft Word (Legacy)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  // Modern Word
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  // Modern Excel
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  // Modern PowerPoint
  "application/vnd.ms-excel": "xls",
  // Microsoft Excel (Legacy)
  "application/vnd.ms-powerpoint": "ppt",
  // Microsoft PowerPoint (Legacy)
  "text/plain": "txt",
  // Plain text files
  "text/csv": "csv"
  // Comma-separated values
};
var ALLOWED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  // JPEG images
  "image/png": "png",
  // PNG images
  "image/gif": "gif",
  // GIF images
  "image/webp": "webp",
  // WebP images
  "image/svg+xml": "svg",
  // Scalable Vector Graphics
  "image/bmp": "bmp"
  // Bitmap images
};
var ALLOWED_AUDIO_TYPES = {
  "audio/mpeg": "mp3"
  // MP3 audio
};
var ALLOWED_VIDEO_TYPES = {
  "video/mp4": "mp4",
  // MP4 video
  "video/webm": "webm"
  // WebM video
};

// src/multer/globalConfig.ts
var import_fs = __toESM(require("fs"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_path3 = __toESM(require("path"), 1);
var ALLOWED_FILE_TYPES = {
  ...ALLOWED_DOCUMENT_TYPES,
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_AUDIO_TYPES,
  ...ALLOWED_VIDEO_TYPES
};
var uploadDir = "uploads";
var originalDir = import_path3.default.join(uploadDir, "original");
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    if (!import_fs.default.existsSync(originalDir)) import_fs.default.mkdirSync(originalDir, { recursive: true });
    cb(null, originalDir);
  },
  filename: (req, file, cb) => {
    const fileExt = import_path3.default.extname(file.originalname);
    const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
    cb(null, fileName + fileExt);
  }
});
var fileFilter = (req, file, cb) => {
  if (!file.mimetype || !(file.mimetype in ALLOWED_FILE_TYPES)) {
    cb(new Error("Invalid file type"));
    return;
  }
  cb(null, true);
};
var globalUpload = (0, import_multer.default)({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    // 5MB file size limit
    files: 5
    // Maximum 5 files per upload
  }
});
var fileUrl = (req, directory = originalDir, fileName = req.file?.filename) => {
  const normalizedDirectory = directory.replace(/\\/g, "/");
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}/${normalizedDirectory}/${fileName}`;
};
var globalConfig_default = globalUpload;

// src/multer/processImage.ts
var sizes = [
  { name: "thumbnail", width: 150, height: 150 },
  { name: "medium", width: 300, height: 300 },
  { name: "large", width: 1024, height: 1024 }
];
var convertedDir = import_path4.default.join(uploadDir, "converted");
var processImage = async (req) => {
  try {
    const fileName = req.file?.filename;
    const originalFilePath = import_path4.default.join(originalDir, fileName);
    const baseName = fileName.replace(import_path4.default.extname(fileName), "");
    const urls = [
      fileUrl(req, originalDir)
      // Original file URL
    ];
    if (req.file?.mimetype in ALLOWED_IMAGE_TYPES) {
      urls.push(fileUrl(req, convertedDir, `${baseName}-original.webp`));
      if (!import_fs2.default.existsSync(convertedDir)) {
        import_fs2.default.mkdirSync(convertedDir, { recursive: true });
      }
      const webpFilePath = await convertToWebP(originalFilePath, convertedDir, baseName);
      const metadata = await (0, import_sharp2.default)(originalFilePath).metadata();
      for (const size of sizes) {
        if (metadata.width && metadata.height && (metadata.width > size.width || metadata.height > size.height)) {
          const sizeDir = import_path4.default.join(uploadDir, `${size.width}x${size.height}`);
          if (!import_fs2.default.existsSync(sizeDir)) {
            import_fs2.default.mkdirSync(sizeDir, { recursive: true });
          }
          const outputFileName = `${baseName}-${size.width}x${size.height}.webp`;
          const outputFilePath = import_path4.default.join(sizeDir, outputFileName);
          await (0, import_sharp2.default)(webpFilePath).resize(size.width, size.height, { fit: "inside" }).toFile(outputFilePath);
          urls.push(fileUrl(req, sizeDir, outputFileName));
        }
      }
    }
    return urls;
  } catch (error) {
    return null;
  }
};

// src/app/media/media.controller.ts
var MediaController = class extends ApiController {
  mediaService;
  /**
   * Construct the controller
   *
   * @param request
   * @param response
   */
  constructor(request, response) {
    super(request, response);
    this.mediaService = new MediaService();
  }
  async createMedia() {
    try {
      const urls = await processImage(this.request);
      return this.apiResponse.sendResponse({
        status: status.HTTP_200_OK,
        message: "Media uploaded successfully",
        data: urls
      });
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
};

// src/app/media/media.routes.ts
var mediaRouter = (() => {
  const router = import_express2.default.Router();
  router.post("/", globalConfig_default.single("file"), async (req, res) => {
    new MediaController(req, res).createMedia();
  });
  return router;
})();

// src/app/todo/todo.routes.ts
var import_express3 = __toESM(require("express"), 1);

// src/app/todo/todo.service.ts
var import_drizzle_orm4 = require("drizzle-orm");
var TodoService = class extends DrizzleService {
  async createTodo(data) {
    try {
      const createdData = await this.db.insert(todo).values(data).returning();
      if (!createdData.length) {
        return ServiceResponse.createResponse(
          status.HTTP_406_NOT_ACCEPTABLE,
          "Invalid todo data",
          createdData[0]
        );
      }
      return ServiceResponse.createResponse(
        status.HTTP_201_CREATED,
        "Todo created successfully",
        createdData[0]
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async retrieveTodo(id) {
    try {
      const retrieveData = await this.db.query.todo.findFirst({ where: (0, import_drizzle_orm4.eq)(todo.id, id) });
      if (!retrieveData) {
        return ServiceResponse.createRejectResponse(status.HTTP_404_NOT_FOUND, "Todo not found");
      }
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "Todo retrieved successfully",
        retrieveData
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async updateTodo(id, data) {
    try {
      const updatedData = await this.db.update(todo).set(data).where((0, import_drizzle_orm4.eq)(todo.id, id)).returning();
      if (!updatedData.length) {
        return ServiceResponse.createResponse(
          status.HTTP_406_NOT_ACCEPTABLE,
          "Invalid todo id",
          updatedData[0]
        );
      }
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "Todo updated successfully",
        updatedData[0]
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async retrieveAllTodo() {
    try {
      const retrieveData = await this.db.query.todo.findMany({
        orderBy: (0, import_drizzle_orm4.desc)(todo.createdAt)
      });
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "Todo retrieved successfully",
        retrieveData
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async testTodo(id) {
    try {
      return ServiceResponse.createRejectResponse(
        status.HTTP_406_NOT_ACCEPTABLE,
        "Todo not accept"
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
};

// src/app/todo/todo.validators.ts
var import_zod3 = require("zod");
var TodoServerSchema = import_zod3.z.object({
  title: validateString("Title"),
  description: validateString("")
});

// src/app/todo/todo.controller.ts
var TodoController = class extends ApiController {
  todoService;
  /**
   * Construct the controller
   *
   * @param request
   * @param response
   */
  constructor(request, response) {
    super(request, response);
    this.todoService = new TodoService();
  }
  async createTodo() {
    try {
      const body = this.request.body;
      const check = TodoServerSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join("\n"));
      const response = await this.todoService.createTodo(check.data);
      return this.apiResponse.sendResponse(response);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async retrieveTodo() {
    try {
      const id = Number(this.request.params.id);
      const response = await this.todoService.retrieveTodo(id);
      return this.apiResponse.sendResponse(response);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async updateTodo() {
    try {
      const id = Number(this.request.params.id);
      const body = this.request.body;
      const check = TodoServerSchema.safeParse(body);
      if (!check.success)
        return this.apiResponse.badResponse(check.error.errors.map((err) => err.message).join("\n"));
      const response = await this.todoService.updateTodo(id, check.data);
      return this.apiResponse.sendResponse(response);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
  async retrieveAllTodo() {
    try {
      const response = await this.todoService.retrieveAllTodo();
      return this.apiResponse.sendResponse(response);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
};

// src/app/todo/todo.routes.ts
var todoRouter = (() => {
  const router = import_express3.default.Router();
  router.route("/").get((req, res) => {
    new TodoController(req, res).retrieveAllTodo();
  }).post(async (req, res) => {
    new TodoController(req, res).createTodo();
  });
  router.route("/:id").get((req, res) => {
    new TodoController(req, res).retrieveTodo();
  }).put(async (req, res) => {
    new TodoController(req, res).updateTodo();
  });
  return router;
})();

// src/app/user/user.routes.ts
var import_express4 = __toESM(require("express"), 1);

// src/app/user/user.service.ts
var import_drizzle_orm6 = require("drizzle-orm");

// src/core/pagination.ts
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

// src/utils/sortingHelper.ts
var import_drizzle_orm5 = require("drizzle-orm");
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
    if (!sortMethod) return (0, import_drizzle_orm5.desc)(this.model.id);
    const sortField = this.sortableFields[sortMethod];
    if (!sortField) return (0, import_drizzle_orm5.desc)(this.model.id);
    const sortDirection = sortBy?.toLowerCase() === "asc" ? import_drizzle_orm5.asc : import_drizzle_orm5.desc;
    return sortDirection(sortField);
  }
  isValidSortMethod(sortMethod) {
    return sortMethod in this.sortableFields;
  }
  isValidSortDirection(sortBy) {
    return ["asc", "desc"].includes(sortBy.toLowerCase());
  }
};

// src/app/user/user.service.ts
var UserService = class extends DrizzleService {
  sortingHelper;
  constructor() {
    super();
    this.sortingHelper = new SortingHelper(users);
  }
  async retrieveUsers(filter) {
    try {
      const orderBy = this.sortingHelper.applySorting(filter.sortingMethod, filter.sortBy);
      if (!filter.page || !filter.limit) {
        return await this.retrieveAllUsers(filter.sortingMethod, filter.sortBy);
      }
      const conditions = [
        filter.search ? (0, import_drizzle_orm6.ilike)(users.name, `%${filter.search}%`) : void 0,
        filter.roleQuery ? (0, import_drizzle_orm6.inArray)(users.role, filter.roleQuery) : void 0
      ].filter(Boolean);
      const whereClause = conditions.length > 0 ? (0, import_drizzle_orm6.and)(...conditions) : void 0;
      const totalItems = await this.db.select({
        count: (0, import_drizzle_orm6.count)()
      }).from(users).where(whereClause).then((result) => result[0].count);
      const { pagination, offset } = new PaginationManager(
        filter.page,
        filter.limit,
        totalItems
      ).createPagination();
      const data = await this.db.query.users.findMany({
        columns: { password: false },
        where: whereClause,
        limit: filter.limit ? filter.limit : void 0,
        offset: filter.limit ? offset : void 0,
        orderBy
      });
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "Users retrieved successfully",
        data,
        pagination
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
  async retrieveAllUsers(sortingMethod, sortBy) {
    try {
      const orderBy = this.sortingHelper.applySorting(sortingMethod, sortBy);
      const data = await this.db.query.users.findMany({
        columns: { password: false },
        orderBy
      });
      return ServiceResponse.createResponse(
        status.HTTP_200_OK,
        "Users retrieved successfully",
        data
      );
    } catch (error) {
      return ServiceResponse.createErrorResponse(error);
    }
  }
};

// src/app/user/user.validator.ts
var import_zod5 = require("zod");

// src/validators/baseQuery.schema.ts
var import_zod4 = require("zod");
var createSortingSchemas = (sortingHelper) => {
  const sortMethodSchema = (pageValue) => import_zod4.z.string().optional().transform((val) => {
    if (val && sortingHelper.isValidSortMethod(val)) return String(val);
    return pageValue ? "id" : void 0;
  }).pipe(import_zod4.z.string().optional());
  const sortBySchema = (pageValue) => import_zod4.z.string().optional().transform((val) => {
    if (val && sortingHelper.isValidSortDirection(val)) return String(val).toLowerCase();
    return pageValue ? "desc" : void 0;
  }).pipe(import_zod4.z.string().optional());
  return { sortMethodSchema, sortBySchema };
};
var limitSchema = (pageValue) => import_zod4.z.string().optional().transform((val) => {
  return val ? isNaN(Number(val)) ? 10 : Number(val) : pageValue ? 10 : void 0;
}).pipe(import_zod4.z.number().optional());
var searchSchema = import_zod4.z.string().optional().transform((val) => val ? String(val) : void 0);
var BaseQuerySchema = (sortingHelper) => {
  const { sortMethodSchema, sortBySchema } = createSortingSchemas(sortingHelper);
  return import_zod4.z.preprocess(
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
    import_zod4.z.object({
      page: import_zod4.z.number().optional(),
      limit: import_zod4.z.number().optional(),
      sortingMethod: import_zod4.z.string().optional(),
      sortBy: import_zod4.z.string().optional(),
      search: import_zod4.z.string().optional()
    })
  );
};

// src/app/user/user.validator.ts
var UserQuerySchema = (sortingHelper) => {
  const baseSchema = BaseQuerySchema(sortingHelper);
  return import_zod5.z.preprocess(
    (data) => ({
      ...baseSchema.parse(data),
      roleQuery: data.roleQuery ? String(data.roleQuery).split(",") : void 0
    }),
    import_zod5.z.object({
      page: import_zod5.z.number().optional(),
      limit: import_zod5.z.number().optional(),
      sortingMethod: import_zod5.z.string().optional(),
      sortBy: import_zod5.z.string().optional(),
      search: import_zod5.z.string().optional(),
      roleQuery: import_zod5.z.array(import_zod5.z.string()).optional()
    })
  );
};

// src/app/user/user.controller.ts
var UserController = class extends ApiController {
  userService;
  sortingHelper;
  /**
   * Constructor
   * @param request
   * @param response
   */
  constructor(request, response) {
    super(request, response);
    this.userService = new UserService();
    this.sortingHelper = new SortingHelper(users);
  }
  async index() {
    try {
      const { query } = this.request;
      const check = UserQuerySchema(this.sortingHelper).safeParse(query);
      if (!check.success) {
        return this.apiResponse.badResponse(
          check.error.errors.map((error) => error.message).join(", ")
        );
      }
      const data = await this.userService.retrieveUsers({
        page: check.data.page,
        limit: check.data.limit,
        sortingMethod: check.data.sortingMethod,
        sortBy: check.data.sortBy,
        search: check.data.search,
        roleQuery: check.data.roleQuery
      });
      return this.apiResponse.sendResponse(data);
    } catch (error) {
      return this.apiResponse.sendResponse(error);
    }
  }
};

// src/app/user/user.routes.ts
var userRouter = (() => {
  const router = import_express4.default.Router();
  router.route("/").get((req, res) => {
    new UserController(req, res).index();
  });
  return router;
})();

// src/routes/csrf.route.ts
var import_express5 = __toESM(require("express"), 1);

// src/utils/csrf.ts
var import_csrf_csrf = require("csrf-csrf");
var {
  generateToken,
  // Use this in your routes to generate tokens
  validateRequest,
  // Use this as middleware to validate tokens
  doubleCsrfProtection,
  // This is the express middleware
  invalidCsrfTokenError
  // This is the error thrown when the token is invalid
} = (0, import_csrf_csrf.doubleCsrf)({
  getSecret: () => process.env.SECRET,
  // Secret for generating tokens
  cookieName: "csrf-token",
  // Cookie name for the token
  cookieOptions: {
    maxAge: csrfTimeout,
    sameSite: AppHelpers.sameSiteCookieConfig().sameSite,
    secure: AppHelpers.sameSiteCookieConfig().secure,
    ...AppHelpers.sameSiteCookieConfig().domain && {
      domain: AppHelpers.sameSiteCookieConfig().domain
    }
  },
  size: 32,
  // The size of the generated tokens
  errorConfig: {
    message: "Invalid CSRF token"
  },
  getTokenFromRequest: (req) => req.headers["x-csrf-token"]
  // Get the token from the request
});

// src/routes/csrf.route.ts
var csrfRouter = (() => {
  const router = import_express5.default.Router();
  router.get("/", (req, res) => {
    new ApiResponse(res).successResponse("CSRF token generated", generateToken(req, res));
  });
  return router;
})();

// src/routes/app.routes.ts
var routes = [
  { path: "/todo", router: todoRouter },
  { path: "/media", router: mediaRouter },
  { path: "/auth", router: authenticationRouter },
  { path: "/users", router: userRouter },
  { path: "/csrf-token", router: csrfRouter }
];

// src/routes/routes.config.ts
function appRouter(app, initialRoute = "") {
  const allRoutes = [];
  for (const { path: path5, router } of routes) {
    const basePath = `${initialRoute}${path5}`;
    app.use(basePath, router);
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        const methods = Object.keys(middleware.route.methods);
        methods.forEach((method) => {
          allRoutes.push({
            method: method.toUpperCase(),
            path: `${basePath}${middleware.route.path}`
          });
        });
      }
    });
  }
  if (false) {
    fs.writeFileSync("routes.json", JSON.stringify(allRoutes, null, 2));
  }
}
//# sourceMappingURL=routes.config.cjs.map