import { z } from "zod";

import { validateString } from "@/validators/commonRules";

export const TodoServerSchema = z.object({
	title: validateString("Title"),
	description: validateString("")
});

export type TodoServerSchemaType = z.infer<typeof TodoServerSchema>;
