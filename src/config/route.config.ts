import { Router } from "express";

import { todoRouter } from "@/routes/todo.routes";

interface RouteConfig {
	path: string;
	router: Router;
}

export const routes: RouteConfig[] = [{ path: "/todo", router: todoRouter }];
