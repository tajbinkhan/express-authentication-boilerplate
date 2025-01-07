import { UserSchemaType } from "@/databases/drizzle/types";

export type CreateUserType = Omit<UserSchemaType, "id" | "role" | "createdAt" | "updatedAt">;
