import { UserSchemaType } from "@/databases/drizzle/types";

declare global {
	namespace Express {
		interface User extends UserSchemaType {}
	}
}
