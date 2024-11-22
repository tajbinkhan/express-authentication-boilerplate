import { Router } from "express";

import { authenticationRouter } from "@/app/authentication/Authentication.routes";
import { todoRouter } from "@/app/todo/Todo.routes";

interface RouteConfig {
	path: string;
	router: Router;
}

export const routes: RouteConfig[] = [
	{ path: "/todo", router: todoRouter },
	{ path: "/auth", router: authenticationRouter }
];
