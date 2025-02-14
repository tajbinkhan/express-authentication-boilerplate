import { and, count, ilike, inArray } from "drizzle-orm";

import PaginationManager from "@/core/pagination";
import DrizzleService from "@/databases/drizzle/service";
import { RoleType } from "@/databases/drizzle/types";
import { users } from "@/models/drizzle/authentication.model";
import { ServiceResponse } from "@/utils/serviceApi";
import { SortingHelper } from "@/utils/sortingHelper";
import { status } from "@/utils/statusCodes";

export default class UserService extends DrizzleService {
	private sortingHelper: SortingHelper<typeof users>;

	constructor() {
		super();
		this.sortingHelper = new SortingHelper(users);
	}

	async retrieveUsers(filter: UserFilter) {
		try {
			const orderBy = this.sortingHelper.applySorting(filter.sortingMethod, filter.sortBy);

			if (!filter.page || !filter.limit) {
				return await this.retrieveAllUsers(filter.sortingMethod, filter.sortBy);
			}

			const conditions = [
				filter.search ? ilike(users.name, `%${filter.search}%`) : undefined,
				filter.roleQuery ? inArray(users.role, filter.roleQuery as RoleType[]) : undefined
			].filter(Boolean);

			const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

			const totalItems = await this.db
				.select({
					count: count()
				})
				.from(users)
				.where(whereClause)
				.then(result => result[0].count);

			const { pagination, offset } = new PaginationManager(
				filter.page,
				filter.limit,
				totalItems
			).createPagination();

			const data = await this.db.query.users.findMany({
				columns: { password: false },
				where: whereClause,
				limit: filter.limit ? filter.limit : undefined,
				offset: filter.limit ? offset : undefined,
				orderBy
			});

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"Users retrieved successfully",
				data,
				pagination
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	private async retrieveAllUsers(sortingMethod?: string, sortBy?: string) {
		try {
			const orderBy = this.sortingHelper.applySorting(sortingMethod, sortBy);

			const data = await this.db.query.users.findMany({
				columns: { password: false },
				orderBy
			});

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"Users retrieved successfully",
				data
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
