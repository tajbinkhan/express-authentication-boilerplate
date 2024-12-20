import { and, eq } from "drizzle-orm";

import DrizzleService from "@/databases/drizzle/service";
import { TokenType, UserSchemaType } from "@/databases/drizzle/types";
import { verificationToken } from "@/models/drizzle/authentication.model";
import AppHelpers from "@/utils/appHelpers";
import { ServiceResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class OTPService extends DrizzleService {
	async saveOTPToDatabase(
		user: Partial<UserSchemaType>,
		tokenType: TokenType,
		expiresAt: Date = AppHelpers.OTPExpiry()
	) {
		try {
			if (!user.email)
				return ServiceResponse.createResponse(status.HTTP_404_NOT_FOUND, "Email is not registered");

			const generatedOTP = AppHelpers.OTPGenerator();
			await this.db
				.insert(verificationToken)
				.values({
					identifier: user.email,
					token: String(generatedOTP),
					tokenType,
					expires: expiresAt
				})
				.onConflictDoUpdate({
					target: [verificationToken.identifier, verificationToken.tokenType],
					set: {
						token: String(generatedOTP),
						expires: expiresAt
					}
				});

			return Promise.resolve(generatedOTP);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async verifyOTPFromDatabase(user: Partial<UserSchemaType>, otp: string, tokenType: TokenType) {
		try {
			const tokenRecord = await this.db.query.verificationToken.findFirst({
				where: and(
					eq(verificationToken.identifier, user.email!),
					eq(verificationToken.token, otp),
					eq(verificationToken.tokenType, tokenType)
				)
			});

			if (!tokenRecord)
				return ServiceResponse.createResponse(status.HTTP_400_BAD_REQUEST, "Invalid OTP");

			if (tokenRecord?.expires && tokenRecord.expires < new Date()) {
				await this.deleteOTPFromDatabase(user, tokenType);
				return ServiceResponse.createResponse(status.HTTP_400_BAD_REQUEST, "OTP expired");
			}

			return Promise.resolve(true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async deleteOTPFromDatabase(user: Partial<UserSchemaType>, tokenType: TokenType) {
		try {
			await this.db
				.delete(verificationToken)
				.where(
					and(
						eq(verificationToken.identifier, user.email!),
						eq(verificationToken.tokenType, tokenType)
					)
				);

			return Promise.resolve(true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
