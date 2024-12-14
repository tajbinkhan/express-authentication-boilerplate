import { z } from "zod";

import {
	validateEmail,
	validatePassword,
	validateString,
	validateUsername
} from "@/validators/commonRules";

export const UsernameLoginSchema = z.object({
	username: validateString("Username"),
	password: validatePassword
});

export const UserRegisterSchema = z.object({
	username: validateUsername,
	email: validateEmail,
	password: validatePassword
});

export type UsernameLoginSchemaType = z.infer<typeof UsernameLoginSchema>;
export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;
