import { InferSelectModel } from "drizzle-orm";

import { users } from "@/models/drizzle/authentication.model";

export type UserSchemaType = InferSelectModel<typeof users>;
