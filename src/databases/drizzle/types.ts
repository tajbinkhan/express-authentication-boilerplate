import { InferSelectModel } from "drizzle-orm";

import { ROLE_LIST, TOKEN_LIST } from "@/databases/drizzle/lists";
import { accounts, users } from "@/models/drizzle/authentication.model";
import { emailTemplates } from "@/models/drizzle/emailTemplate.model";

export type UserSchemaType = InferSelectModel<typeof users>;
export type AccountSchemaType = InferSelectModel<typeof accounts>;
export type EmailTemplateSchemaType = InferSelectModel<typeof emailTemplates>;

/**
 * Enum Schema Types
 */
export type RoleType = (typeof ROLE_LIST.enumValues)[number];
export type TokenType = (typeof TOKEN_LIST.enumValues)[number];
