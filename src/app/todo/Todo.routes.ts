import express, { Router } from "express";

import TodoController from "@/app/todo/Todo.controller";

export const todoRouter: Router = (() => {
	const router = express.Router();

	router
		.route("/")
		.get((req, res) => {
			new TodoController(req, res).retrieveAllTodo();
		})
		.post(async (req, res) => {
			new TodoController(req, res).createTodo();
		});

	router
		.route("/:id")
		.get((req, res) => {
			new TodoController(req, res).retrieveTodo();
		})
		.put(async (req, res) => {
			new TodoController(req, res).updateTodo();
		});

	return router;
})();
