export const authMessages = {
	success: {
		registration: "Registration successful. Welcome!",
		login: "Login successful. Welcome back!",
		logout: "Logout successful. See you again!",
		passwordReset: "Password reset successful. You can now log in with your new password.",
		emailVerification: "Email verification successful. Your account is now active.",
		accountVerification: "Account verification successful. Your account is active.",
		passwordChange: "Password change successful. Your password has been updated.",
		tokenRefresh: "Token refresh successful. You are still logged in.",
		tokenValid: "Token is valid. You are authenticated.",
		authorizationGranted: "Access granted. You have the necessary permissions.",
		emailVerificationSent: "Email verification sent. Please check your inbox.",
		sessionUpdated: "Session updated. You are still logged in."
	},
	error: {
		registration: {
			emailInUse: "Registration failed. The email is already in use.",
			weakPassword: "Registration failed. The password is too weak.",
			invalidEmail: "Registration failed. The email address is invalid.",
			missingFields: "Registration failed. Please fill in all required fields.",
			serverError: "Registration failed. Server error occurred."
		},
		login: {
			invalidCredentials: "Login failed. Invalid email or password.",
			accountLocked: "Login failed. Your account is locked.",
			accountNotVerified: "Login failed. Please verify your email address.",
			missingFields: "Login failed. Please provide both email and password.",
			serverError: "Login failed. Server error occurred.",
			twoFactorRequired: "Login failed. Two-factor authentication is required.",
			twoFactorFailed: "Login failed. Two-factor authentication failed.",
			sessionExpired: "Login failed. Your session has expired."
		},
		logout: {
			notLoggedIn: "Logout failed. You are not logged in.",
			serverError: "Logout failed. Server error occurred."
		},
		passwordReset: {
			invalidToken: "Password reset failed. The reset token is invalid or expired.",
			userNotFound: "Password reset failed. No user found with this email address.",
			weakPassword: "Password reset failed. The new password is too weak.",
			serverError: "Password reset failed. Server error occurred."
		},
		emailVerification: {
			invalidToken: "Email verification failed. The verification token is invalid or expired.",
			alreadyVerified: "Email verification failed. The email is already verified.",
			serverError: "Email verification failed. Server error occurred."
		},
		passwordChange: {
			incorrectPassword: "Password change failed. The current password is incorrect.",
			weakNewPassword: "Password change failed. The new password is too weak.",
			serverError: "Password change failed. Server error occurred."
		},
		tokenRefresh: {
			invalidToken: "Token refresh failed. The refresh token is invalid or expired.",
			serverError: "Token refresh failed. Server error occurred."
		},
		authorization: {
			insufficientRole: "Access denied. You do not have the necessary role.",
			insufficientRoles: "Access denied. You do not have the necessary roles.",
			insufficientPermissions: "Access denied. You do not have the necessary permissions.",
			sessionExpired: "Access denied. Your session has expired.",
			notAuthenticated: "Access denied. You are not authenticated.",
			serverError: "Access denied. Server error occurred."
		}
	}
};

export const crudMessages = {
	success: {
		create: (item: string) => `${item} created successfully.`,
		read: (item: string) => `${item} retrieved successfully.`,
		update: (item: string) => `${item} updated successfully.`,
		delete: (item: string) => `${item} deleted successfully.`
	},
	error: {
		create: {
			validationError: (item: string) => `Creation of ${item} failed. Validation error occurred.`,
			alreadyExists: (item: string) => `Creation of ${item} failed. ${item} already exists.`,
			missingFields: (item: string) => `Creation of ${item} failed. Missing required fields.`,
			serverError: (item: string) => `Creation of ${item} failed. Server error occurred.`,
			duplicateEntry: (item: string) => `Creation of ${item} failed. Duplicate entry detected.`,
			invalidData: (item: string) => `Creation of ${item} failed. Invalid data provided.`,
			quotaExceeded: (item: string) => `Creation of ${item} failed. Quota exceeded.`
		},
		read: {
			notFound: (item: string) => `Retrieval of ${item} failed. ${item} not found.`,
			unauthorized: (item: string) =>
				`Retrieval of ${item} failed. You do not have the necessary permissions.`,
			serverError: (item: string) => `Retrieval of ${item} failed. Server error occurred.`,
			noData: (item: string) => `Retrieval of ${item} failed. No data available.`,
			forbidden: (item: string) => `Retrieval of ${item} failed. Forbidden access.`,
			timeout: (item: string) => `Retrieval of ${item} failed. Operation timed out.`
		},
		update: {
			notFound: (item: string) => `Update of ${item} failed. ${item} not found.`,
			validationError: (item: string) => `Update of ${item} failed. Validation error occurred.`,
			missingFields: (item: string) => `Update of ${item} failed. Missing required fields.`,
			serverError: (item: string) => `Update of ${item} failed. Server error occurred.`,
			conflict: (item: string) => `Update of ${item} failed. Conflict with existing data.`,
			unauthorized: (item: string) => `Update of ${item} failed. Unauthorized access.`,
			noChanges: (item: string) => `Update of ${item} failed. No changes detected.`,
			locked: (item: string) => `Update of ${item} failed. The item is locked.`
		},
		delete: {
			notFound: (item: string) => `Deletion of ${item} failed. ${item} not found.`,
			unauthorized: (item: string) =>
				`Deletion of ${item} failed. You do not have the necessary permissions.`,
			serverError: (item: string) => `Deletion of ${item} failed. Server error occurred.`,
			conflict: (item: string) => `Deletion of ${item} failed. Conflict with related data.`,
			protected: (item: string) => `Deletion of ${item} failed. ${item} is protected.`,
			dependencyError: (item: string) => `Deletion of ${item} failed. Dependency error occurred.`,
			timeout: (item: string) => `Deletion of ${item} failed. Operation timed out.`
		}
	}
};

export const zodMessages = {
	error: {
		required: {
			fieldIsRequired: (field: string) => `${field} is required.`
		},
		limit: {
			stringMin: (field: string, limit: number) => `${field} must be at least ${limit} characters.`,
			stringMax: (field: string, limit: number) => `${field} must not exceed ${limit} characters.`,
			arrayMin: (field: string, limit: number) => `${field} must have at least ${limit} items.`,
			arrayMax: (field: string, limit: number) => `${field} must not exceed ${limit} items.`,
			numberMin: (field: string, limit: number) => `${field} must be at least ${limit}.`,
			numberMax: (field: string, limit: number) => `${field} must not exceed ${limit}.`
		},
		invalid: {
			invalidString: (field: string) => `${field} must be a string.`,
			invalidEmail: (field: string) => `${field} must be a valid email address.`,
			invalidNumber: (field: string) => `${field} must be a number.`,
			invalidBoolean: (field: string) => `${field} must be a boolean.`,
			invalidDate: (field: string) => `${field} must be a date.`,
			invalidArray: (field: string) => `${field} must be an array.`,
			invalidObject: (field: string) => `${field} must be an object.`,
			invalidEnum: (field: string, values: string[]) =>
				`${field} must be one of the following values: ${values.join(", ")}.`,
			invalidUnion: (field: string) => `${field} must be one of the specified types.`,
			invalidIntersection: (field: string) =>
				`${field} must be a combination of the specified types.`,
			invalidTuple: (field: string) => `${field} must be a tuple.`,
			invalidRecord: (field: string) => `${field} must be a record.`,
			invalidLiteral: (field: string, value: string) =>
				`${field} must be the literal value: ${value}.`,
			invalidNull: (field: string) => `${field} must be null.`,
			invalidUndefined: (field: string) => `${field} must be undefined.`,
			invalidOptional: (field: string) => `${field} must be optional.`,
			invalidNullable: (field: string) => `${field} must be nullable.`,
			invalidPromise: (field: string) => `${field} must be a promise.`,
			invalidFunction: (field: string) => `${field} must be a function.`,
			invalidClass: (field: string) => `${field} must be a class.`,
			invalidUnknown: (field: string) => `${field} must be unknown.`,
			invalidNever: (field: string) => `${field} must be never.`,
			invalidVoid: (field: string) => `${field} must be void.`,
			invalidAny: (field: string) => `${field} must be any.`,
			invalidUnknownKeys: (field: string) => `${field} must have unknown keys.`,
			invalidFile: (field: string) => `${field} must be a file.`,
			invalidFileSize: (field: string, limit: number) => `${field} must not exceed ${limit} bytes.`,
			invalidFileType: (field: string, type: string) => `${field} must be of type ${type}.`,
			invalidUpperCase: (field: string) => `${field} must be at least one upper case.`,
			invalidLowerCase: (field: string) => `${field} must be at least one lower case.`,
			invalidNumericCase: (field: string) => `${field} must be at least one number.`,
			invalidUsername: (field: string) =>
				`${field} must contain only letters, numbers, and underscores.`
		}
	}
};
