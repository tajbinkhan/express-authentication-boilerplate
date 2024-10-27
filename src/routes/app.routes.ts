import { Router } from "express";

import { todoRouter } from "@/app/todo/Todo.routes";

interface RouteConfig {
	path: string;
	router: Router;
}

export const routes: RouteConfig[] = [{ path: "/todo", router: todoRouter }];
