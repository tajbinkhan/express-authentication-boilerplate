import * as AuthenticationSchema from "@/models/drizzle/authentication.model";
import * as EmailTemplateSchema from "@/models/drizzle/emailTemplate.model";
import * as TodoSchema from "@/models/drizzle/todo.model";

const schema = {
	...TodoSchema,
	...AuthenticationSchema,
	...EmailTemplateSchema
};

export default schema;
