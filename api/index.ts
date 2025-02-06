import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "../db";
import { recipes } from "../db/schema";
import { schema } from "../validators/recipe";
import { parse } from "valibot";
import { eq } from "drizzle-orm";

export const config = {
	runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/recipes", async (c) => {
	const allRecipes = await db.select().from(recipes);
	return c.json(allRecipes);
});

app.get("/recipes/:id", async (c) => {
	const id = Number.parseInt(c.req.param("id"), 10);
	const r = await db.select().from(recipes).where(eq(recipes.id, id)).get();
	if (!r) c.status(404);
	return c.json(r);
});

app.delete("/recipes/:id", async (c) => {
	const id = Number.parseInt(c.req.param("id"), 10);
	const r = await db.select().from(recipes).where(eq(recipes.id, id)).get();
	console.log({ r });

	if (!r) return c.status(404);
	await db.delete(recipes).where(eq(recipes.id, id));
	return c.json({ message: "OK" });
});

app.post("/recipes", async (c) => {
	const requestBody = await c.req.json();
	try {
		const validatedData = parse(schema, requestBody);
		const withId = await db
			.insert(recipes)
			.values(validatedData)
			.returning()
			.get();
		return c.json(withId);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (e: any) {
		c.status(422);
		if (e.code === "SQLITE_CONSTRAINT")
			return c.json({ error: "a recipe with this title already exists" });
		return c.json(e);
	}
});

export default handle(app);
