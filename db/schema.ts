import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipes = sqliteTable("recipes", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
	timeMinutes: int().notNull(),
	picture: text().notNull(),
});
