import { z } from "zod";

import {
	validateConfirmPassword,
	validateEmail,
	validatePassword,
	validateString,
	validateUsername
} from "@/validators/commonRules";

export const UsernameLoginSchema = z.object({
	username: validateString("Username"),
	password: validatePassword
});

export const UserRegisterSchema = z
	.object({
		username: validateUsername,
		email: validateEmail,
		password: validatePassword,
		confirmPassword: validateConfirmPassword
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

export type UsernameLoginSchemaType = z.infer<typeof UsernameLoginSchema>;
export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;
