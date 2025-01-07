import { InferSelectModel } from "drizzle-orm";

import { ROLE_LIST, TOKEN_LIST, accounts, users } from "@/models/drizzle/authentication.model";

export type UserSchemaType = InferSelectModel<typeof users>;
export type AccountSchemaType = InferSelectModel<typeof accounts>;

/**
 * Enum Schema Types
 */
export type RoleType = (typeof ROLE_LIST.enumValues)[number];
export type TokenType = (typeof TOKEN_LIST.enumValues)[number];
