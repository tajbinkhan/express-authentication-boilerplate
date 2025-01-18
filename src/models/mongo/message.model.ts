import { Schema } from "mongoose";

import { IMessage } from "@/databases/mongo/types";

export const messageSchema = new Schema<IMessage>(
	{
		content: { type: String, required: true },
		senderId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		conversationId: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
			required: true
		},
		readBy: [
			{
				type: Schema.Types.ObjectId,
				ref: "User"
			}
		],
		attachments: [
			{
				type: String
			}
		]
	},
	{ timestamps: true }
);
