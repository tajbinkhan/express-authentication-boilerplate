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
module.exports = __toCommonJS(authentication_model_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ROLE_TYPE,
  TOKEN_TYPE,
  accounts,
  accountsRelations,
  sessions,
  sessionsRelations,
  users,
  usersRelations,
  verificationToken
});
//# sourceMappingURL=authentication.model.cjs.map