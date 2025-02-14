import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { z } from "zod";

import { SortingHelper } from "@/utils/sortingHelper";

// We'll create a function that generates the schemas with a SortingHelper instance
export const createSortingSchemas = <T extends PgTableWithColumns<any>>(
	sortingHelper: SortingHelper<T>
) => {
	const sortMethodSchema = (pageValue: boolean) =>
		z
			.string()
			.optional()
			.transform(val => {
				if (val && sortingHelper.isValidSortMethod(val)) return String(val);
				return pageValue ? "id" : undefined;
			})
			.pipe(z.string().optional());

	const sortBySchema = (pageValue: boolean) =>
		z
			.string()
			.optional()
			.transform(val => {
				if (val && sortingHelper.isValidSortDirection(val)) return String(val).toLowerCase();
				return pageValue ? "desc" : undefined;
			})
			.pipe(z.string().optional());

	return { sortMethodSchema, sortBySchema };
};

export const limitSchema = (pageValue: boolean) =>
	z
		.string()
		.optional()
		.transform(val => {
			return val ? (isNaN(Number(val)) ? 10 : Number(val)) : pageValue ? 10 : undefined;
		})
		.pipe(z.number().optional());

export const searchSchema = z
	.string()
	.optional()
	.transform(val => (val ? String(val) : undefined));

// Function to create the complete query schema
export const BaseQuerySchema = <T extends PgTableWithColumns<any>>(
	sortingHelper: SortingHelper<T>
) => {
	const { sortMethodSchema, sortBySchema } = createSortingSchemas(sortingHelper);

	return z.preprocess(
		(data: any) => {
			const page = data.page ? (isNaN(data.page) ? 1 : Number(data.page)) : undefined;
			const hasPage = !!page;

			return {
				page,
				limit: limitSchema(hasPage).parse(data.limit),
				sortingMethod: sortMethodSchema(hasPage).parse(data.sortingMethod),
				sortBy: sortBySchema(hasPage).parse(data.sortBy),
				search: searchSchema.parse(data.search)
			};
		},
		z.object({
			page: z.number().optional(),
			limit: z.number().optional(),
			sortingMethod: z.string().optional(),
			sortBy: z.string().optional(),
			search: z.string().optional()
		})
	);
};
