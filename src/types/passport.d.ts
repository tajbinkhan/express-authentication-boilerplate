import "express-session";

import { UserSchemaType } from "@/databases/drizzle/types";

declare global {
	namespace Express {
		interface User extends Omit<UserSchemaType, "password"> {}
	}
}

declare module "express-session" {
	interface Session {
		passport?: {
			user?: {
				id: number;
			};
		};
	}
}
