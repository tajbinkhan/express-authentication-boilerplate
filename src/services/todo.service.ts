import DrizzleBaseRepository from "@/config/drizzleRepo";
import { todo } from "@/models/todo.model";
import { ServiceResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";
import { TodoServerSchemaType } from "@/validators/todo.validators";

export default class TodoService extends DrizzleBaseRepository {
	async createTodo(data: TodoServerSchemaType) {
		try {
			const createdData = await this.db.insert(todo).values(data).returning();

			if (!createdData) {
				return ServiceResponse.createResponse(
					status.HTTP_406_NOT_ACCEPTABLE,
					"Todo not created",
					createdData
				);
			}

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
				"Todo created successfully",
				createdData
			);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async retrieveTodo() {
		try {
			const retrieveData = await this.db.query.todo.findMany();

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"Todo retrieved successfully",
				retrieveData
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
