import {
	url,
	type InferInput,
	type InferOutput,
	maxLength,
	minLength,
	minValue,
	nullish,
	number,
	object,
	pipe,
	string,
} from "valibot";

const attributes = {
	title: pipe(string(), minLength(3), maxLength(100)),
	timeMinutes: pipe(number(), minValue(0)),
	description: nullish(pipe(string(), maxLength(2000))),
	picture: pipe(string(), url(), minLength(3), maxLength(255)),
};

export const schema = object(attributes);

export type InputData = InferInput<typeof schema>;
export type OutputData = InferOutput<typeof schema>;
