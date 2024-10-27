import { Request, Response } from "express";

import TodoService from "@/app/todo/Todo.service";
import { TodoServerSchema } from "@/app/todo/Todo.validators";

import { ApiController } from "@/controllers/base/api.controller";
import { ServiceApiResponse } from "@/utils/serviceApi";

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
			const id = Number(this.request.params.id);
			const response = await this.todoService.retrieveTodo(id);

			return this.apiResponse.sendResponse(response);
		} catch (error: unknown) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async updateTodo() {
		try {
			const id = Number(this.request.params.id);
			const body = this.request.body;
			const check = TodoServerSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join("\n"));

			const response = await this.todoService.updateTodo(id, check.data);

			return this.apiResponse.sendResponse(response);
		} catch (error: unknown) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async retrieveAllTodo() {
		try {
			const response = await this.todoService.retrieveAllTodo();
			return this.apiResponse.sendResponse(response);
		} catch (error: unknown) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
