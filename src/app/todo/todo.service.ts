import { InferSelectModel, desc, eq } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

import { TodoServerSchemaType } from "@/app/todo/todo.validators";

import DrizzleService from "@/databases/drizzle/service";
import { todo } from "@/models/drizzle/todo.model";
import { ServiceApiResponse, ServiceResponse } from "@/utils/serviceApi";

export type TodoSchemaType = InferSelectModel<typeof todo>;

export default class TodoService extends DrizzleService {
	async createTodo(data: TodoServerSchemaType) {
		try {
			const createdData = await this.db.insert(todo).values(data).returning();

			if (!createdData.length) {
				return ServiceResponse.createResponse(
					StatusCodes.BAD_REQUEST,
					"Invalid todo data",
					createdData[0]
				);
			}

			return ServiceResponse.createResponse(
				StatusCodes.CREATED,
				"Todo created successfully",
				createdData[0]
			);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async retrieveTodo(id: number): Promise<ServiceApiResponse<TodoSchemaType>> {
		try {
			const retrieveData = await this.db.query.todo.findFirst({ where: eq(todo.id, id) });

			if (!retrieveData) {
				return ServiceResponse.createRejectResponse(StatusCodes.NOT_FOUND, "Todo not found");
			}

			return ServiceResponse.createResponse(
				StatusCodes.OK,
				"Todo retrieved successfully",
				retrieveData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async updateTodo(id: number, data: TodoServerSchemaType) {
		try {
			const updatedData = await this.db.update(todo).set(data).where(eq(todo.id, id)).returning();

			if (!updatedData.length) {
				return ServiceResponse.createResponse(
					StatusCodes.BAD_REQUEST,
					"Invalid todo id",
					updatedData[0]
				);
			}

			return ServiceResponse.createResponse(
				StatusCodes.OK,
				"Todo updated successfully",
				updatedData[0]
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async retrieveAllTodo() {
		try {
			const retrieveData = await this.db.query.todo.findMany({
				orderBy: desc(todo.createdAt)
			});

			return ServiceResponse.createResponse(
				StatusCodes.OK,
				"Todo retrieved successfully",
				retrieveData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async testTodo(id: number) {
		try {
			return ServiceResponse.createRejectResponse(StatusCodes.BAD_REQUEST, "Todo not accept");
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
