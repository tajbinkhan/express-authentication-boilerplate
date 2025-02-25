import { and, count, gte, ilike, inArray, lte } from "drizzle-orm";
import { Json2CsvOptions, json2csv } from "json-2-csv";

import AuthenticationService from "@/app/authentication/authentication.service";

import PaginationManager from "@/core/pagination";
import DrizzleService from "@/databases/drizzle/service";
import { RoleType, UserSchemaType } from "@/databases/drizzle/types";
import { users } from "@/models/drizzle/authentication.model";
import { ServiceApiResponse, ServiceResponse } from "@/utils/serviceApi";
import { SortingHelper } from "@/utils/sortingHelper";
import { status } from "@/utils/statusCodes";

export default class UserService extends DrizzleService {
	private sortingHelper: SortingHelper<typeof users>;
	private authenticationService: AuthenticationService;

	constructor() {
		super();
		this.sortingHelper = new SortingHelper(users);
		this.authenticationService = new AuthenticationService();
	}

	async createUser(
		data: Omit<UserSchemaType, "id" | "createdAt" | "updatedAt">
	): Promise<ServiceApiResponse<Omit<UserSchemaType, "password">>> {
		try {
			data.email && (await this.authenticationService.duplicateUserCheckByEmail(data.email));
			data.username &&
				(await this.authenticationService.duplicateUserCheckByUsername(data.username));

			const user = await this.db.insert(users).values(data).returning();

			const { password, ...userData } = user[0];

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
				"User created successfully",
				userData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async retrieveUsers(
		filter: UserFilter
	): Promise<ServiceApiResponse<Omit<UserSchemaType, "password">[]>> {
		try {
			const orderBy = this.sortingHelper.applySorting(filter.sortingMethod, filter.sortBy);

			if (!filter.page || !filter.limit) {
				return await this.retrieveAllUsers(filter.sortingMethod, filter.sortBy);
			}

			// Create date objects from string inputs if they exist
			const fromDate = filter.from ? new Date(filter.from) : undefined;
			const toDate = filter.to ? new Date(filter.to) : undefined;

			// If toDate exists, set it to the end of the day
			if (toDate) {
				toDate.setHours(23, 59, 59, 999);
			}

			const conditions = [
				filter.search ? ilike(users.name, `%${filter.search}%`) : undefined,
				filter.roleQuery ? inArray(users.role, filter.roleQuery as RoleType[]) : undefined,
				fromDate ? gte(users.createdAt, fromDate) : undefined,
				toDate ? lte(users.createdAt, toDate) : undefined
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

	async deleteUserByIds(ids: number[]): Promise<ServiceApiResponse<boolean>> {
		try {
			await this.db.delete(users).where(inArray(users.id, ids));

			return ServiceResponse.createResponse(status.HTTP_200_OK, "Users deleted successfully", true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async deleteAllUsers(): Promise<ServiceApiResponse<boolean>> {
		try {
			await this.db.delete(users);

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"All users deleted successfully",
				true
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async exportUsersToCSV(): Promise<ServiceApiResponse<string>> {
		try {
			const usersResponse = await this.retrieveAllUsers("id", "asc");

			const options: Json2CsvOptions = {
				delimiter: {
					field: ",",
					wrap: '"'
				},
				prependHeader: true
			};

			const csvContent = json2csv(usersResponse.data, options);

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"CSV file generated successfully",
				csvContent
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	private async retrieveAllUsers(
		sortingMethod?: string,
		sortBy?: string
	): Promise<ServiceApiResponse<Omit<UserSchemaType, "password">[]>> {
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
