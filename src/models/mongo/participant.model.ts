import { Schema } from "mongoose";

import { IParticipant } from "@/databases/mongo/types";

export const participantSchema = new Schema<IParticipant>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		conversationId: {
			type: Schema.Types.ObjectId,
			ref: "Conversation",
			required: true
		},
		lastRead: {
			type: Date
		},
		isMuted: {
			type: Boolean,
			default: false
		},
		joinedAt: {
			type: Date,
			default: Date.now
		},
		leftAt: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);
