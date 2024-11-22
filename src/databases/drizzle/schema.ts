import * as AuthenticationSchema from "@/models/Authentication.model";
import * as TodoSchema from "@/models/Todo.model";

const schema = {
	...TodoSchema,
	...AuthenticationSchema
};

export default schema;
