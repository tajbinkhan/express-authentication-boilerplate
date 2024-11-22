import { eq } from "drizzle-orm";

import DrizzleService from "@/databases/drizzle/service";
import { users } from "@/models/Authentication.model";
import { ServiceResponse } from "@/utils/ServiceApi";
import { status } from "@/utils/StatusCodes";

export default class AuthenticationService extends DrizzleService {
	async findUserById(id: number) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.id, id)
			});

			if (!user) {
				return ServiceResponse.createResponse(
					status.HTTP_406_NOT_ACCEPTABLE,
					"User not found",
					user
				);
			}

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async findUserByEmail(email: string) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.email, email)
			});

			if (!user) {
				return ServiceResponse.createResponse(
					status.HTTP_406_NOT_ACCEPTABLE,
					"User not found",
					user
				);
			}

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async findUserByUsername(username: string) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.username, username)
			});

			if (!user) {
				return ServiceResponse.createResponse(status.HTTP_404_NOT_FOUND, "User not found", user);
			}

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
