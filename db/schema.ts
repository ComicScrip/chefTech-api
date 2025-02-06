import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipes = sqliteTable("recipes", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text().notNull().unique(),
	timeMinutes: int().notNull(),
	picture: text().notNull(),
	description: text(),
});
