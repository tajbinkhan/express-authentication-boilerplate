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

// src/app/media/media.controller.ts
var media_controller_exports = {};
__export(media_controller_exports, {
  default: () => MediaController
});
module.exports = __toCommonJS(media_controller_exports);

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

// src/app/media/media.service.ts
var MediaService = class extends DrizzleService {
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

// src/multer/processImage.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path3 = __toESM(require("path"), 1);
var import_sharp2 = __toESM(require("sharp"), 1);

// src/multer/converter.ts
var import_path = __toESM(require("path"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var convertToWebP = async (filePath, outputDir, fileName) => {
  const outputFilePath = import_path.default.join(outputDir, `${fileName}.webp`);
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
var import_path2 = __toESM(require("path"), 1);
var ALLOWED_FILE_TYPES = {
  ...ALLOWED_DOCUMENT_TYPES,
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_AUDIO_TYPES,
  ...ALLOWED_VIDEO_TYPES
};
var uploadDir = "uploads";
var originalDir = import_path2.default.join(uploadDir, "original");
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    if (!import_fs.default.existsSync(originalDir)) import_fs.default.mkdirSync(originalDir, { recursive: true });
    cb(null, originalDir);
  },
  filename: (req, file, cb) => {
    const fileExt = import_path2.default.extname(file.originalname);
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

// src/multer/processImage.ts
var sizes = [
  { name: "thumbnail", width: 150, height: 150 },
  { name: "medium", width: 300, height: 300 },
  { name: "large", width: 1024, height: 1024 }
];
var convertedDir = import_path3.default.join(uploadDir, "converted");
var processImage = async (req) => {
  try {
    const fileName = req.file?.filename;
    const originalFilePath = import_path3.default.join(originalDir, fileName);
    const baseName = fileName.replace(import_path3.default.extname(fileName), "");
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
          const sizeDir = import_path3.default.join(uploadDir, `${size.width}x${size.height}`);
          if (!import_fs2.default.existsSync(sizeDir)) {
            import_fs2.default.mkdirSync(sizeDir, { recursive: true });
          }
          const outputFileName = `${baseName}-${size.width}x${size.height}.webp`;
          const outputFilePath = import_path3.default.join(sizeDir, outputFileName);
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
//# sourceMappingURL=media.controller.cjs.map