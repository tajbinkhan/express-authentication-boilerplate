import { z } from "zod";

import { zodMessages } from "@/core/messages";
import {
	validateEmail,
	validateNewPassword,
	validatePassword,
	validatePositiveNumber,
	validateString,
	validateUsername,
	validateUsernameOrEmail
} from "@/validators/commonRules";

export const UsernameLoginSchema = z.object({
	username: validateUsernameOrEmail,
	password: validatePassword,
	otp: z
		.boolean({
			invalid_type_error: zodMessages.error.invalid.invalidBoolean("OTP")
		})
		.optional()
});

export const UsernameLoginWithOTPSchema = z.object({
	username: validateUsernameOrEmail,
	password: validatePassword,
	otp: validatePositiveNumber("OTP")
});

export const UserRegisterSchema = z.object({
	name: validateString("Name"),
	username: validateUsername,
	email: validateEmail,
	password: validatePassword
});

export const UserVerificationSchema = z.object({
	email: validateEmail,
	otp: validatePositiveNumber("OTP")
});

export const UserPasswordResetSchema = z.object({
	email: validateEmail,
	otp: validatePositiveNumber("OTP"),
	password: validatePassword
});

export const UserChangePasswordSchema = z.object({
	oldPassword: validatePassword,
	newPassword: validateNewPassword
});

export type UsernameLoginSchemaType = z.infer<typeof UsernameLoginSchema>;
export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;
