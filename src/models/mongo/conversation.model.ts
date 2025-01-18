import { Schema } from "mongoose";

import { IConversation } from "@/databases/mongo/types";

export const conversationSchema = new Schema<IConversation>(
	{
		name: {
			type: String,
			required: false
		},
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				required: true
			}
		],
		lastMessage: {
			type: Schema.Types.ObjectId,
			ref: "Message"
		},
		type: {
			type: String,
			enum: ["direct", "group"],
			required: true
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		isActive: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);
