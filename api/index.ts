import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
	runtime: "edge",
};

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

const app = new Hono().basePath("/api");

app.get("/recipes", (c) => {
	return c.json(recipes);
});

app.post("/recipes", async (c) => {
	const newRecipe = {
		id: recipes.length,
		...(await c.req.json()),
	};

	return c.json(newRecipe);
});

export default handle(app);
