import { Request, Response } from "express";

import UserService from "@/app/user/user.service";
import { UserQuerySchema } from "@/app/user/user.validator";

import { ApiController } from "@/controllers/base/api.controller";
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

			const data = await this.userService.retrieveUsers({
				page: check.data.page,
				limit: check.data.limit,
				sortingMethod: check.data.sortingMethod,
				sortBy: check.data.sortBy,
				search: check.data.search,
				roleQuery: check.data.roleQuery
			});

			return this.apiResponse.sendResponse(data);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
