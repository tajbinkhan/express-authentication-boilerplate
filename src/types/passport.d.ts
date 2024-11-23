import "express-session";

import { UserSchemaType } from "@/databases/drizzle/types";

declare global {
	namespace Express {
		interface User extends UserSchemaType {}
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
