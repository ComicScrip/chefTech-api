import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "../db";
import { recipes } from "../db/schema";

export const config = {
	runtime: "edge",
};

/*
const recipes = [
	{
		id: 1,
		title: "Crêpes",
		picture:
			"https://img.cuisineaz.com/660x495/2015/01/29/i113699-photo-de-crepe-facile.jpeg",
		timeMinutes: 5,
	},
	{
		id: 2,
		title: "Lasagnes",
		picture:
			"https://assets.afcdn.com/recipe/20200408/109520_w1024h1024c1cx1866cy2800cxt0cyt0cxb3732cyb5600.jpg",
		timeMinutes: 60,
	},
];
*/

const app = new Hono().basePath("/api");

app.get("/recipes", async (c) => {
	return c.json(await db.select().from(recipes));
});

app.post("/recipes", async (c) => {
	const recipe: typeof recipes.$inferInsert = {
		...(await c.req.json()),
	};
	const withId = await db.insert(recipes).values(recipe).returning().get();
	return c.json(withId);
});

export default handle(app);
