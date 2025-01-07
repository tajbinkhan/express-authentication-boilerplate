import { InferSelectModel, desc, eq } from "drizzle-orm";

import { TodoServerSchemaType } from "@/app/todo/todo.validators";

import DrizzleService from "@/databases/drizzle/service";
import { todo } from "@/models/drizzle/todo.model";
import { ServiceApiResponse, ServiceResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export type TodoSchemaType = InferSelectModel<typeof todo>;

export default class TodoService extends DrizzleService {
	async createTodo(data: TodoServerSchemaType) {
		try {
			const createdData = await this.db.insert(todo).values(data).returning();

			if (!createdData.length) {
				return ServiceResponse.createResponse(
					status.HTTP_406_NOT_ACCEPTABLE,
					"Invalid todo data",
					createdData[0]
				);
			}

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
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
				return ServiceResponse.createRejectResponse(status.HTTP_404_NOT_FOUND, "Todo not found");
			}

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
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
					status.HTTP_406_NOT_ACCEPTABLE,
					"Invalid todo id",
					updatedData[0]
				);
			}

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
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
				status.HTTP_200_OK,
				"Todo retrieved successfully",
				retrieveData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async testTodo(id: number) {
		try {
			return ServiceResponse.createRejectResponse(
				status.HTTP_406_NOT_ACCEPTABLE,
				"Todo not accept"
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
