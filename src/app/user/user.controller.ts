import { Request, Response } from "express";

import UserService from "@/app/user/user.service";

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
			const { page, limit, sortingMethod, sortBy, search } = this.request.query;

			const pageQuery = page ? Number(page) : undefined;
			const limitQuery = limit ? Number(limit) : pageQuery ? 10 : undefined;

			const sortMethodQuery =
				sortingMethod && this.sortingHelper.isValidSortMethod(String(sortingMethod))
					? String(sortingMethod)
					: pageQuery
						? "id"
						: undefined;

			const sortByQuery =
				sortBy && this.sortingHelper.isValidSortDirection(String(sortBy))
					? String(sortBy).toLowerCase()
					: pageQuery
						? "desc"
						: undefined;

			const searchQuery = search ? String(search) : undefined;

			const data = await this.userService.retrieveUsers({
				page: pageQuery,
				limit: limitQuery,
				sortingMethod: sortMethodQuery,
				sortBy: sortByQuery,
				search: searchQuery
			});

			return this.apiResponse.sendResponse(data);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
