import * as AuthenticationSchema from "@/models/drizzle/authentication.model";
import * as TodoSchema from "@/models/drizzle/todo.model";

const schema = {
	...TodoSchema,
	...AuthenticationSchema
};

export default schema;
