import { model } from "mongoose";

import { IConversation, IMessage, IParticipant, IUser } from "@/databases/mongo/types";
import { conversationSchema } from "@/models/mongo/conversation.model";
import { messageSchema } from "@/models/mongo/message.model";
import { participantSchema } from "@/models/mongo/participant.model";
import { userSchema } from "@/models/mongo/user.model";

export const UserModel = model<IUser>("users", userSchema);
export const MessageModel = model<IMessage>("messages", messageSchema);
export const ParticipantModel = model<IParticipant>("participants", participantSchema);
export const ConversationModel = model<IConversation>("conversations", conversationSchema);
