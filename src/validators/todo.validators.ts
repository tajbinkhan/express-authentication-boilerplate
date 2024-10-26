import { z } from "zod";

import { validateString } from "@/validators/CommonRules";

export const TodoServerSchema = z.object({
	title: validateString("Title"),
	description: validateString("")
});

export type TodoServerSchemaType = z.infer<typeof TodoServerSchema>;
