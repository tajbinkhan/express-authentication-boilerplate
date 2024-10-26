import { Request, Response } from "express";

import { ApiController } from "@/controllers/base/api.controller";
import TodoService from "@/services/todo.service";
import { ServiceApiResponse } from "@/utils/serviceApi";
import { TodoServerSchema } from "@/validators/todo.validators";

export default class TodoController extends ApiController {
	protected todoService: TodoService;
	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: Request, response: Response) {
		super(request, response);
		this.todoService = new TodoService();
	}

	async createTodo() {
		try {
			const body = this.request.body;
			const check = TodoServerSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join("\n"));

			const response = await this.todoService.createTodo(check.data);

			return this.apiResponse.sendResponse(response);
		} catch (error: unknown) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async retrieveTodo() {
		try {
			const response = await this.todoService.retrieveTodo();
			return this.apiResponse.sendResponse(response);
		} catch (error: unknown) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
