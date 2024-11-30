import { z } from "zod";

import { validatePassword, validateString } from "@/validators/commonRules";

export const UsernameLoginSchema = z.object({
	username: validateString("Username"),
	password: validatePassword
});

export type UsernameLoginSchemaType = z.infer<typeof UsernameLoginSchema>;
