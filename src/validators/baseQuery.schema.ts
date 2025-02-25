import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { z } from "zod";

import { SortingHelper } from "@/utils/sortingHelper";
import { validatePositiveNumber, validateString } from "@/validators/commonRules";

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

// Date validation helper
export const dateRangeSchema = z
	.object({
		from: z
			.string()
			.optional()
			.refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
				message: "Date must be in YYYY-MM-DD format"
			})
			.transform(val => (val ? new Date(val) : undefined)),
		to: z
			.string()
			.optional()
			.refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
				message: "Date must be in YYYY-MM-DD format"
			})
			.transform(val => (val ? new Date(val) : undefined))
	})
	.refine(
		data => {
			// If both dates are provided, ensure 'from' is not after 'to'
			if (data.from && data.to) {
				return data.from <= data.to;
			}
			return true;
		},
		{
			message: "Start date cannot be after end date",
			path: ["from"]
		}
	);

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
				search: searchSchema.parse(data.search),
				from: data.from,
				to: data.to
			};
		},
		z.object({
			page: validatePositiveNumber("Page").optional(),
			limit: validatePositiveNumber("Limit").optional(),
			sortingMethod: validateString("Sorting Method").optional(),
			sortBy: validateString("Sort By").optional(),
			search: validateString("Search").optional(),
			from: validateString("From Date").optional(),
			to: validateString("To Date").optional()
		})
	);
};
