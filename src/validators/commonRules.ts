import { z } from "zod";

import { zodMessages } from "@/core/messages";

const convertBytesToMB = (bytes: number): number => {
	return bytes / 1024 / 1024;
};

export const MAX_FILE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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

export const validateFile = (
	name: string,
	maxFileSize: number = MAX_FILE_SIZE,
	acceptedImageTypes: string[] = ACCEPTED_IMAGE_TYPES
) => {
	return z
		.any()
		.refine(files => {
			if (typeof files === "object") {
				return files?.length === 1;
			}
			return true;
		}, zodMessages.error.required.fieldIsRequired(name))
		.refine(
			files => {
				if (typeof files === "object") {
					return files?.[0]?.size <= maxFileSize;
				}
				return true;
			},
			`Max file size is ${convertBytesToMB(maxFileSize)}MB`
		)
		.refine(files => {
			if (typeof files === "object") {
				return acceptedImageTypes.includes(files?.[0]?.type);
			}
			return true;
		}, ".jpg, .jpeg, .png and .webp files are accepted");
};

export const validateFiles = (
	name: string,
	limit: number,
	maxFileSize: number = MAX_FILE_SIZE,
	acceptedImageTypes: string[] = ACCEPTED_IMAGE_TYPES
) => {
	return z
		.any()
		.refine(files => files?.length >= 1, zodMessages.error.required.fieldIsRequired(name))
		.refine(files => files?.length <= 5, zodMessages.error.limit.arrayMax(name, limit))
		.refine(
			files => {
				return Object.keys(files).every(key => {
					return files[key].size <= maxFileSize;
				});
			},
			`Max file size is ${convertBytesToMB(maxFileSize)}MB`
		)
		.refine(files => {
			return Object.keys(files).every(key => {
				return acceptedImageTypes.includes(files[key].type);
			});
		}, ".jpg, .jpeg, .png and .webp files are accepted");
};
