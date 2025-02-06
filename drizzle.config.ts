import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
	out: "./drizzle",
	schema: "./db/schema.ts",
	dialect: "turso",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		url: process.env.TURSO_DATABASE_URL!,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
