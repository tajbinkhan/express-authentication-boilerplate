import { Document, Types } from "mongoose";

import { RoleType } from "@/databases/drizzle/types";

/**
 * Extending the Document type to include the required fields
 * for the schema
 * @template T
 */
type DocumentType<T> = Document<unknown, {}, T> &
	T &
	Required<{
		_id: Types.ObjectId;
	}> & {
		__v: number;
	};

interface Timestamps {
	_id?: Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IUser extends Timestamps {
	originalUserId: number;
	email: string | null;
	username: string | null;
	name: string | null;
	image: string | null;
	role: RoleType | null;
}

export interface IMessage extends Timestamps {
	content: string;
	senderId: Types.ObjectId; // Reference to User ID
	conversationId: Types.ObjectId; // Reference to Conversation ID
	readBy: string[]; // Array of User IDs
	attachments?: string[]; // Optional file URLs
}

export interface IParticipant extends Timestamps {
	userId: Types.ObjectId; // Reference to User ID
	conversationId: Types.ObjectId; // Reference to Conversation ID
	lastRead?: Date;
	isMuted: boolean;
	joinedAt: Date;
	leftAt?: Date;
}

export interface IConversation extends Timestamps {
	name?: string; // Optional for group chats
	participants: Types.ObjectId[]; // Array of User IDs
	lastMessage?: IMessage; // Reference to last Message ID
	type: "SOLO" | "GROUP";
	createdBy: Types.ObjectId; // Reference to User ID
	isActive: boolean;
}

// Schema Types

export type UserModelSchemaType = IUser & DocumentType<IUser>;
export type MessageModelSchemaType = IMessage & DocumentType<IMessage>;
export type ParticipantModelSchemaType = IParticipant & DocumentType<IParticipant>;
export type ConversationModelSchemaType = IConversation & DocumentType<IConversation>;
