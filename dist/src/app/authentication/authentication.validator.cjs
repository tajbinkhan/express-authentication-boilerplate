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

// src/app/authentication/authentication.validator.ts
var authentication_validator_exports = {};
__export(authentication_validator_exports, {
  UserChangePasswordSchema: () => UserChangePasswordSchema,
  UserPasswordResetSchema: () => UserPasswordResetSchema,
  UserRegisterSchema: () => UserRegisterSchema,
  UserReverificationSchema: () => UserReverificationSchema,
  UserVerificationSchema: () => UserVerificationSchema,
  UsernameLoginSchema: () => UsernameLoginSchema,
  UsernameLoginWithOTPSchema: () => UsernameLoginWithOTPSchema
});
module.exports = __toCommonJS(authentication_validator_exports);
var import_zod2 = require("zod");

// src/core/messages.ts
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

// src/validators/commonRules.ts
var import_zod = require("zod");
var validateString = (name) => {
  return import_zod.z.string({
    required_error: zodMessages.error.required.fieldIsRequired(name),
    invalid_type_error: zodMessages.error.invalid.invalidString(name)
  }).min(1, zodMessages.error.required.fieldIsRequired(name));
};
var validatePositiveNumber = (name) => {
  return import_zod.z.number({
    required_error: zodMessages.error.required.fieldIsRequired(name),
    invalid_type_error: zodMessages.error.invalid.invalidNumber(name)
  }).min(1, zodMessages.error.required.fieldIsRequired(name)).int().positive();
};
var validateUsername = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Username")
}).min(1, zodMessages.error.required.fieldIsRequired("Username")).max(20, zodMessages.error.limit.stringMax("Username", 20)).regex(new RegExp("^[a-zA-Z0-9_]*$"), zodMessages.error.invalid.invalidUsername("Username"));
var validateEmail = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Email")
}).min(1, zodMessages.error.required.fieldIsRequired("Email")).email(zodMessages.error.invalid.invalidEmail("Email"));
var validateUsernameOrEmail = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Username or email"),
  invalid_type_error: zodMessages.error.invalid.invalidString("Username or email")
}).min(1, zodMessages.error.required.fieldIsRequired("Username or email")).max(255, zodMessages.error.limit.numberMax("Username or email", 255)).refine((value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]*$/;
  if (value.includes("@")) {
    return emailRegex.test(value);
  }
  return usernameRegex.test(value) && value.length >= 1 && value.length <= 20;
}, zodMessages.error.invalid.invalidUsernameOrEmail("Username or email"));
var validatePassword = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Password")
}).min(1, zodMessages.error.required.fieldIsRequired("Password")).min(6, zodMessages.error.limit.stringMin("Password", 6)).regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("Password")).regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("Password")).regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("Password"));
var validateNewPassword = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("New Password")
}).min(1, zodMessages.error.required.fieldIsRequired("New Password")).min(6, zodMessages.error.limit.stringMin("New Password", 6)).regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("New Password")).regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("New Password")).regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("New Password"));
var validateConfirmPassword = import_zod.z.string({
  required_error: zodMessages.error.required.fieldIsRequired("Confirm Password")
}).min(1, zodMessages.error.required.fieldIsRequired("Confirm Password")).min(6, zodMessages.error.limit.stringMin("Confirm Password", 6)).regex(new RegExp(".*[A-Z].*"), zodMessages.error.invalid.invalidUpperCase("Confirm Password")).regex(new RegExp(".*[a-z].*"), zodMessages.error.invalid.invalidLowerCase("Confirm Password")).regex(new RegExp(".*\\d.*"), zodMessages.error.invalid.invalidNumericCase("Confirm Password"));

// src/app/authentication/authentication.validator.ts
var UsernameLoginSchema = import_zod2.z.object({
  username: validateUsernameOrEmail,
  password: validatePassword,
  otp: import_zod2.z.boolean({
    invalid_type_error: zodMessages.error.invalid.invalidBoolean("OTP")
  }).optional()
});
var UsernameLoginWithOTPSchema = import_zod2.z.object({
  username: validateUsernameOrEmail,
  password: validatePassword,
  otp: validatePositiveNumber("OTP")
});
var UserRegisterSchema = import_zod2.z.object({
  name: validateString("Name"),
  username: validateUsername,
  email: validateEmail,
  password: validatePassword
});
var UserVerificationSchema = import_zod2.z.object({
  username: validateUsernameOrEmail,
  otp: validatePositiveNumber("OTP")
});
var UserReverificationSchema = import_zod2.z.object({
  username: validateUsernameOrEmail
});
var UserPasswordResetSchema = import_zod2.z.object({
  email: validateEmail,
  otp: validatePositiveNumber("OTP"),
  password: validatePassword
});
var UserChangePasswordSchema = import_zod2.z.object({
  oldPassword: validatePassword,
  newPassword: validateNewPassword
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserChangePasswordSchema,
  UserPasswordResetSchema,
  UserRegisterSchema,
  UserReverificationSchema,
  UserVerificationSchema,
  UsernameLoginSchema,
  UsernameLoginWithOTPSchema
});
//# sourceMappingURL=authentication.validator.cjs.map