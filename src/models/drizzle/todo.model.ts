import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";

export const todo = pgTable("todo", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	...timestamps
});
