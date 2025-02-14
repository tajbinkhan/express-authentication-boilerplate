import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { z } from "zod";

import { SortingHelper } from "@/utils/sortingHelper";
import { BaseQuerySchema } from "@/validators/baseQuery.schema";

export const UserQuerySchema = <T extends PgTableWithColumns<any>>(
	sortingHelper: SortingHelper<T>
) => {
	const baseSchema = BaseQuerySchema(sortingHelper);

	return z.preprocess(
		(data: any) => ({
			...baseSchema.parse(data),
			roleQuery: data.roleQuery ? String(data.roleQuery).split(",") : undefined
		}),
		z.object({
			page: z.number().optional(),
			limit: z.number().optional(),
			sortingMethod: z.string().optional(),
			sortBy: z.string().optional(),
			search: z.string().optional(),
			roleQuery: z.array(z.string()).optional()
		})
	);
};
