import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";

export const users = pgTable("user", {
	id: serial("id").primaryKey(),
	name: text("name"),
	username: text("username").unique(),
	email: text("email").unique(),
	password: text("password"),
	emailVerified: timestamp("email_verified", { withTimezone: true }),
	image: text("image"),
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

export const verificationTokens = pgTable("verificationToken", {
	id: serial("id").primaryKey(),
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { withTimezone: true }).notNull(),
	...timestamps
});

export const authenticators = pgTable("authenticator", {
	id: serial("id").primaryKey(),
	credentialID: text("credential_iD").notNull().unique(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	providerAccountId: text("provider_account_id").notNull(),
	credentialPublicKey: text("credential_public_key").notNull(),
	counter: integer("counter").notNull(),
	credentialDeviceType: text("credential_device_type").notNull(),
	credentialBackedUp: boolean("credential_backed_up").notNull(),
	transports: text("transports"),
	...timestamps
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	authenticators: many(authenticators)
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

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
	user: one(users, {
		fields: [authenticators.userId],
		references: [users.id]
	})
}));
