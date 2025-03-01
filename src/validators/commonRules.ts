import { z } from "zod";

import { zodMessages } from "@/core/messages";

export const phoneWithCountryCodeRegex = /^\+?[1-9]\d{1,14}$/;

export const validateString = (name: string) => {
	return z
		.string({
			required_error: zodMessages.error.required.fieldIsRequired(name),
			invalid_type_error: zodMessages.error.invalid.invalidString(name)
		})
		.min(1, zodMessages.error.required.fieldIsRequired(name));
};

export const validateNumber = (name: string) => {
	return z.coerce
		.number({
			required_error: zodMessages.error.required.fieldIsRequired(name),
			invalid_type_error: zodMessages.error.invalid.invalidNumber(name)
		})
		.min(1, zodMessages.error.required.fieldIsRequired(name));
};

export const validateClientNumber = (name: string, min: number = 1) => {
	return z
		.string({
			required_error: zodMessages.error.required.fieldIsRequired(name),
			invalid_type_error: zodMessages.error.invalid.invalidNumber(name)
		})
		.min(1, zodMessages.error.required.fieldIsRequired(name))
		.refine(value => {
			return !isNaN(Number(value));
		}, zodMessages.error.invalid.invalidNumber(name))
		.or(
			z.coerce
				.number({
					required_error: zodMessages.error.required.fieldIsRequired(name),
					invalid_type_error: zodMessages.error.invalid.invalidNumber(name)
				})
				.min(min, zodMessages.error.required.fieldIsRequired(name))
		);
};

export const validatePositiveNumber = (name: string) => {
	return z
		.number({
			required_error: zodMessages.error.required.fieldIsRequired(name),
			invalid_type_error: zodMessages.error.invalid.invalidNumber(name)
		})
		.min(1, zodMessages.error.required.fieldIsRequired(name))
		.int()
		.positive();
};

export const validateSelectObject = (name: string) => {
	return z
		.object(
			{
				value: validateString(name),
				label: validateString(name)
			},
			{
				required_error: zodMessages.error.required.fieldIsRequired(name),
				invalid_type_error: zodMessages.error.invalid.invalidObject(name)
			}
		)
		.or(z.null());
};

export const validateEnum = <T extends readonly [string, ...string[]]>(name: string, values: T) => {
	return z.enum(values, {
		required_error: zodMessages.error.required.fieldIsRequired(name),
		invalid_type_error: zodMessages.error.invalid.invalidEnum(name, values)
	});
};

export const validateUsername = z
	.string({
		required_error: zodMessages.error.required.fieldIsRequired("Username")
	})
	.min(1, zodMessages.error.required.fieldIsRequired("Username"))
	.max(20, zodMessages.error.limit.stringMax("Username", 20))
	.regex(new RegExp("^[a-zA-Z0-9_]*$"), zodMessages.error.invalid.invalidUsername("Username"));

export const validateEmail = z
	.string({
		required_error: zodMessages.error.required.fieldIsRequired("Email")
	})
	.min(1, zodMessages.error.required.fieldIsRequired("Email"))
	.email(zodMessages.error.invalid.invalidEmail("Email"));

export const validatePhoneNumber = (name: string) => {
	return z
		.string({
			required_error: zodMessages.error.required.fieldIsRequired(name),
			invalid_type_error: zodMessages.error.invalid.invalidString(name)
		})
		.min(1, zodMessages.error.required.fieldIsRequired(name))
		.refine(
			value => phoneWithCountryCodeRegex.test(value),
			zodMessages.error.invalid.invalidPhoneNumber(name)
		)
		.transform(value => String(value).trim());
};

export const validateUsernameOrEmail = z
	.string({
		required_error: zodMessages.error.required.fieldIsRequired("Username or email"),
		invalid_type_error: zodMessages.error.invalid.invalidString("Username or email")
	})
	.min(1, zodMessages.error.required.fieldIsRequired("Username or email"))
	.max(255, zodMessages.error.limit.numberMax("Username or email", 255))
	.refine(value => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const usernameRegex = /^[a-zA-Z0-9_]*$/;

		// Check if it's a valid email
		if (value.includes("@")) {
			return emailRegex.test(value);
		}

		// Check if it's a valid username
		return usernameRegex.test(value) && value.length >= 1 && value.length <= 20;
	}, zodMessages.error.invalid.invalidUsernameOrEmail("Username or email"));

export const validatePassword = z
	.string({
		required_error: zodMessages.error.required.fieldIsRequired("Password")
	})
	.min(1, zodMessages.error.required.fieldIsRequired("Password"))
	.min(6, zodMessages.error.limit.stringMin("Password", 6))
	.regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("Password"))
	.regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("Password"))
	.regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("Password"));

export const validateNewPassword = z
	.string({
		required_error: zodMessages.error.required.fieldIsRequired("New Password")
	})
	.min(1, zodMessages.error.required.fieldIsRequired("New Password"))
	.min(6, zodMessages.error.limit.stringMin("New Password", 6))
	.regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("New Password"))
	.regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("New Password"))
	.regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("New Password"));

export const validateConfirmPassword = z
	.string({
		required_error: zodMessages.error.required.fieldIsRequired("Confirm Password")
	})
	.min(1, zodMessages.error.required.fieldIsRequired("Confirm Password"))
	.min(6, zodMessages.error.limit.stringMin("Confirm Password", 6))
	.regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("Confirm Password"))
	.regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("Confirm Password"))
	.regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("Confirm Password"));

export const validateBoolean = (name: string) => {
	return z.boolean({
		required_error: zodMessages.error.required.fieldIsRequired(name),
		invalid_type_error: zodMessages.error.invalid.invalidBoolean(name)
	});
};
