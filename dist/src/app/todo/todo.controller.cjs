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
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
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

// src/app/todo/todo.controller.ts
var todo_controller_exports = {};
__export(todo_controller_exports, {
  default: () => TodoController
});
module.exports = __toCommonJS(todo_controller_exports);

// src/app/todo/todo.service.ts
var import_drizzle_orm2 = require("drizzle-orm");

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

// src/app/todo/todo.service.ts
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
      const retrieveData = await this.db.query.todo.findFirst({ where: (0, import_drizzle_orm2.eq)(todo.id, id) });
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
      const updatedData = await this.db.update(todo).set(data).where((0, import_drizzle_orm2.eq)(todo.id, id)).returning();
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
        orderBy: (0, import_drizzle_orm2.desc)(todo.createdAt)
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
var import_zod2 = require("zod");

// src/validators/commonRules.ts
var import_zod = require("zod");

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
var validateString = (name) => {
  return import_zod.z.string({
    required_error: zodMessages.error.required.fieldIsRequired(name),
    invalid_type_error: zodMessages.error.invalid.invalidString(name)
  }).min(1, zodMessages.error.required.fieldIsRequired(name));
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

// src/app/todo/todo.validators.ts
var TodoServerSchema = import_zod2.z.object({
  title: validateString("Title"),
  description: validateString("")
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
//# sourceMappingURL=todo.controller.cjs.map