import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";

export const emailTemplates = pgTable("email_templates", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).unique().notNull(),
	subject: text("subject").notNull(),
	html: text("html").notNull(),
	...timestamps
});
