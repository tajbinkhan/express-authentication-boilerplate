"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/messages.ts
var messages_exports = {};
__export(messages_exports, {
  authMessages: () => authMessages,
  crudMessages: () => crudMessages,
  zodMessages: () => zodMessages
});
module.exports = __toCommonJS(messages_exports);
var authMessages = {
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
var crudMessages = {
  success: {
    create: (item) => `${item} created successfully.`,
    read: (item) => `${item} retrieved successfully.`,
    update: (item) => `${item} updated successfully.`,
    delete: (item) => `${item} deleted successfully.`
  },
  error: {
    create: {
      validationError: (item) => `Creation of ${item} failed. Validation error occurred.`,
      alreadyExists: (item) => `Creation of ${item} failed. ${item} already exists.`,
      missingFields: (item) => `Creation of ${item} failed. Missing required fields.`,
      serverError: (item) => `Creation of ${item} failed. Server error occurred.`,
      duplicateEntry: (item) => `Creation of ${item} failed. Duplicate entry detected.`,
      invalidData: (item) => `Creation of ${item} failed. Invalid data provided.`,
      quotaExceeded: (item) => `Creation of ${item} failed. Quota exceeded.`
    },
    read: {
      notFound: (item) => `Retrieval of ${item} failed. ${item} not found.`,
      unauthorized: (item) => `Retrieval of ${item} failed. You do not have the necessary permissions.`,
      serverError: (item) => `Retrieval of ${item} failed. Server error occurred.`,
      noData: (item) => `Retrieval of ${item} failed. No data available.`,
      forbidden: (item) => `Retrieval of ${item} failed. Forbidden access.`,
      timeout: (item) => `Retrieval of ${item} failed. Operation timed out.`
    },
    update: {
      notFound: (item) => `Update of ${item} failed. ${item} not found.`,
      validationError: (item) => `Update of ${item} failed. Validation error occurred.`,
      missingFields: (item) => `Update of ${item} failed. Missing required fields.`,
      serverError: (item) => `Update of ${item} failed. Server error occurred.`,
      conflict: (item) => `Update of ${item} failed. Conflict with existing data.`,
      unauthorized: (item) => `Update of ${item} failed. Unauthorized access.`,
      noChanges: (item) => `Update of ${item} failed. No changes detected.`,
      locked: (item) => `Update of ${item} failed. The item is locked.`
    },
    delete: {
      notFound: (item) => `Deletion of ${item} failed. ${item} not found.`,
      unauthorized: (item) => `Deletion of ${item} failed. You do not have the necessary permissions.`,
      serverError: (item) => `Deletion of ${item} failed. Server error occurred.`,
      conflict: (item) => `Deletion of ${item} failed. Conflict with related data.`,
      protected: (item) => `Deletion of ${item} failed. ${item} is protected.`,
      dependencyError: (item) => `Deletion of ${item} failed. Dependency error occurred.`,
      timeout: (item) => `Deletion of ${item} failed. Operation timed out.`
    }
  }
};
var zodMessages = {
  error: {
    required: {
      fieldIsRequired: (field) => `${field} is required.`
    },
    limit: {
      stringMin: (field, limit) => `${field} must be at least ${limit} characters.`,
      stringMax: (field, limit) => `${field} must not exceed ${limit} characters.`,
      arrayMin: (field, limit) => `${field} must have at least ${limit} items.`,
      arrayMax: (field, limit) => `${field} must not exceed ${limit} items.`,
      numberMin: (field, limit) => `${field} must be at least ${limit}.`,
      numberMax: (field, limit) => `${field} must not exceed ${limit}.`
    },
    invalid: {
      invalidString: (field) => `${field} must be a string.`,
      invalidEmail: (field) => `${field} must be a valid email address.`,
      invalidNumber: (field) => `${field} must be a number.`,
      invalidBoolean: (field) => `${field} must be a boolean.`,
      invalidDate: (field) => `${field} must be a date.`,
      invalidArray: (field) => `${field} must be an array.`,
      invalidObject: (field) => `${field} must be an object.`,
      invalidEnum: (field, values) => `${field} must be one of the following values: ${values.join(", ")}.`,
      invalidUnion: (field) => `${field} must be one of the specified types.`,
      invalidIntersection: (field) => `${field} must be a combination of the specified types.`,
      invalidTuple: (field) => `${field} must be a tuple.`,
      invalidRecord: (field) => `${field} must be a record.`,
      invalidLiteral: (field, value) => `${field} must be the literal value: ${value}.`,
      invalidNull: (field) => `${field} must be null.`,
      invalidUndefined: (field) => `${field} must be undefined.`,
      invalidOptional: (field) => `${field} must be optional.`,
      invalidNullable: (field) => `${field} must be nullable.`,
      invalidPromise: (field) => `${field} must be a promise.`,
      invalidFunction: (field) => `${field} must be a function.`,
      invalidClass: (field) => `${field} must be a class.`,
      invalidUnknown: (field) => `${field} must be unknown.`,
      invalidNever: (field) => `${field} must be never.`,
      invalidVoid: (field) => `${field} must be void.`,
      invalidAny: (field) => `${field} must be any.`,
      invalidUnknownKeys: (field) => `${field} must have unknown keys.`,
      invalidFile: (field) => `${field} must be a file.`,
      invalidFileSize: (field, limit) => `${field} must not exceed ${limit} bytes.`,
      invalidFileType: (field, type) => `${field} must be of type ${type}.`,
      invalidUpperCase: (field) => `${field} must be at least one upper case.`,
      invalidLowerCase: (field) => `${field} must be at least one lower case.`,
      invalidNumericCase: (field) => `${field} must be at least one number.`,
      invalidUsername: (field) => `${field} must contain only letters, numbers, and underscores.`,
      invalidUsernameOrEmail: (field) => `${field} must be a valid username or email address.`
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authMessages,
  crudMessages,
  zodMessages
});
//# sourceMappingURL=messages.cjs.map