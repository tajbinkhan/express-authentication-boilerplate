import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "@/databases/drizzle/helpers";

export const media = pgTable("media", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	originalFileUrl: text("original_url").notNull(),
	webpImageUrl: text("webp_url"),
	smallImageUrl: text("small_url"),
	mediumImageUrl: text("medium_url"),
	largeImageUrl: text("large_url"),
	...timestamps
});
