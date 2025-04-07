import { and, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

import DrizzleService from "@/databases/drizzle/service";
import { TokenType, UserSchemaType } from "@/databases/drizzle/types";
import { verificationToken } from "@/models/drizzle/authentication.model";
import AppHelpers from "@/utils/appHelpers";
import { ServiceResponse } from "@/utils/serviceApi";

export default class OTPService extends DrizzleService {
	private async limitOTPRequest(
		user: Partial<UserSchemaType>,
		tokenType: TokenType,
		timeLimit: number = 5
	) {
		try {
			const otpRequestCount = await this.db.query.verificationToken.findFirst({
				where: and(
					eq(verificationToken.identifier, user.email!),
					eq(verificationToken.tokenType, tokenType)
				)
			});

			const currentMinute = new Date().getTime();
			const otpRequestUpdateTime = new Date(otpRequestCount?.updatedAt!).getTime();
			const timeDifference = currentMinute - otpRequestUpdateTime;
			// Convert it to human readable time
			const timeDifferenceInMinutes = Math.floor(timeDifference / 60000);
			console.log("Time difference in minutes: ", timeDifferenceInMinutes);

			if (otpRequestCount && timeDifferenceInMinutes < timeLimit) {
				const message = `You can only request OTP per ${timeLimit} minute(s). Please wait for ${timeLimit - timeDifferenceInMinutes} minute(s)`;
				return ServiceResponse.createRejectResponse(StatusCodes.TOO_MANY_REQUESTS, message);
			}

			return Promise.resolve(true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async saveOTPToDatabase(
		user: Partial<UserSchemaType>,
		tokenType: TokenType,
		expiresAt: Date = AppHelpers.OTPExpiry()
	) {
		try {
			if (!user.email)
				return ServiceResponse.createRejectResponse(
					StatusCodes.NOT_FOUND,
					"Email is not registered"
				);

			await this.limitOTPRequest(user, tokenType);

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
				return ServiceResponse.createRejectResponse(StatusCodes.BAD_REQUEST, "Invalid OTP");

			if (tokenRecord?.expires && tokenRecord.expires < new Date()) {
				await this.deleteOTPFromDatabase(user, tokenType);
				return ServiceResponse.createRejectResponse(StatusCodes.BAD_REQUEST, "OTP expired");
			}

			await this.deleteOTPFromDatabase(user, tokenType);

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
