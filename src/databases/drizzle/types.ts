import { InferSelectModel } from "drizzle-orm";

import { users } from "@/models/Authentication.model";

export type UserSchemaType = InferSelectModel<typeof users>;
