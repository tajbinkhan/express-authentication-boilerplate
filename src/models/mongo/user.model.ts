import { Schema } from "mongoose";

import { IUser } from "@/databases/mongo/types";

export const userSchema = new Schema<IUser>(
	{
		originalUserId: { type: Number, required: true, unique: true },
		email: { type: String, required: false, unique: true },
		username: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		image: { type: String, required: false },
		role: { type: String, required: true }
	},
	{ timestamps: true }
);
