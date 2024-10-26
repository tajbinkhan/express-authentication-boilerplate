import express, { Router } from "express";

import TodoController from "@/controllers/todo.controller";

export const todoRouter: Router = (() => {
	const router = express.Router();

	router
		.route("/")
		.get((req, res) => {
			new TodoController(req, res).retrieveTodo();
		})
		.post(async (req, res) => {
			new TodoController(req, res).createTodo();
		});

	return router;
})();
