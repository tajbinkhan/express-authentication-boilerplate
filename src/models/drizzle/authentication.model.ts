import { relations } from "drizzle-orm";
import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex
} from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";

export const ROLE_LIST = {
	SUPER_ADMIN: "SUPER_ADMIN",
	ADMINISTRATOR: "ADMINISTRATOR",
	EDITOR: "EDITOR",
	AUTHOR: "AUTHOR",
	CONTRIBUTOR: "CONTRIBUTOR",
	SUBSCRIBER: "SUBSCRIBER",
	enumValues: ["SUPER_ADMIN", "ADMINISTRATOR", "EDITOR", "AUTHOR", "CONTRIBUTOR", "SUBSCRIBER"]
} as const;

export const ROLE_TYPE = pgEnum("role_type", ROLE_LIST.enumValues);

export const TOKEN_LIST = {
	PASSWORD_RESET: "PASSWORD_RESET",
	EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
	LOGIN_OTP: "LOGIN_OTP",
	enumValues: ["PASSWORD_RESET", "EMAIL_VERIFICATION", "LOGIN_OTP"]
} as const;

export const TOKEN_TYPE = pgEnum("token_type", TOKEN_LIST.enumValues);

export const users = pgTable("user", {
	id: serial("id").primaryKey(),
	name: text("name"),
	username: text("username").unique(),
	email: text("email").unique(),
	password: text("password"),
	emailVerified: timestamp("email_verified", { withTimezone: true }),
	image: text("image"),
	role: ROLE_TYPE("role").default("SUBSCRIBER"),
	...timestamps
});

export const accounts = pgTable("account", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
	...timestamps
});

export const sessions = pgTable("session", {
	id: serial("id").primaryKey(),
	sessionId: text("session_id").notNull().unique(),
	sessionCookie: text("session_cookie").unique(),
	userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { withTimezone: true }).notNull(),
	...timestamps
});

export const verificationToken = pgTable(
	"verification_token",
	{
		id: serial("id").primaryKey(),
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		tokenType: TOKEN_TYPE("token_type").notNull(),
		expires: timestamp("expires", { withTimezone: true }).notNull(),
		...timestamps
	},
	table => ({
		identifierTypeIdx: uniqueIndex("identifier_type_idx").on(table.identifier, table.tokenType)
	})
);

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions)
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));
