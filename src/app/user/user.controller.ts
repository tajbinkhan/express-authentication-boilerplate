import { Request, Response } from "express";

import UserService from "@/app/user/user.service";
import { UserCreateSchema, UserDeleteSchema, UserQuerySchema } from "@/app/user/user.validator";

import { ApiController } from "@/controllers/base/api.controller";
import { UserSchemaType } from "@/databases/drizzle/types";
import { users } from "@/models/drizzle/authentication.model";
import { ServiceApiResponse } from "@/utils/serviceApi";
import { SortingHelper } from "@/utils/sortingHelper";

export default class UserController extends ApiController {
	protected userService: UserService;
	private sortingHelper: SortingHelper<typeof users>;

	/**
	 * Constructor
	 * @param request
	 * @param response
	 */
	constructor(request: Request, response: Response) {
		super(request, response);
		this.userService = new UserService();
		this.sortingHelper = new SortingHelper(users);
	}

	async index() {
		try {
			const { query } = this.request;

			const check = UserQuerySchema(this.sortingHelper).safeParse(query);
			if (!check.success) {
				return this.apiResponse.badResponse(
					check.error.errors.map(error => error.message).join(", ")
				);
			}

			const data = await this.userService.retrieveUsers(check.data);

			return this.apiResponse.sendResponse(data);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async create() {
		try {
			const { body } = this.request;

			const check = UserCreateSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(
					check.error.errors.map(error => error.message).join(", ")
				);
			}
			const mergedData: Omit<UserSchemaType, "id" | "createdAt" | "updatedAt"> = {
				...check.data,
				image: null,
				emailVerified: check.data.emailVerified ? new Date() : null
			};

			const data = await this.userService.createUser(mergedData);

			return this.apiResponse.sendResponse(data);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async delete() {
		try {
			const { body } = this.request;

			const check = UserDeleteSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(
					check.error.errors.map(error => error.message).join(", ")
				);
			}

			if (check.data.ids.length > 0) {
				const data = await this.userService.deleteUserByIds(body.ids);

				return this.apiResponse.sendResponse(data);
			} else {
				const data = await this.userService.deleteAllUsers();

				return this.apiResponse.sendResponse(data);
			}
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async export() {
		try {
			const data = await this.userService.exportUsersToCSV();

			return this.apiResponse.sendResponse(data);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
