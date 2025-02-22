import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { z } from "zod";

import { zodMessages } from "@/core/messages";
import { ROLE_LIST } from "@/databases/drizzle/lists";
import { SortingHelper } from "@/utils/sortingHelper";
import { BaseQuerySchema } from "@/validators/baseQuery.schema";
import {
	validateEmail,
	validatePassword,
	validatePositiveNumber,
	validateString,
	validateUsername
} from "@/validators/commonRules";

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

export const UserCreateSchema = z.object({
	name: validateString("Name"),
	email: validateEmail,
	username: validateUsername,
	password: validatePassword,
	role: z.enum(ROLE_LIST.enumValues, {
		required_error: zodMessages.error.required.fieldIsRequired("Role"),
		invalid_type_error: zodMessages.error.invalid.invalidEnum("Role", ROLE_LIST.enumValues)
	}),
	emailVerified: z.boolean({
		invalid_type_error: zodMessages.error.invalid.invalidBoolean("Email Verified"),
		required_error: zodMessages.error.required.fieldIsRequired("Email Verified")
	})
});

export const UserDeleteSchema = z.object({
	ids: z.array(validatePositiveNumber("User ID"))
});
