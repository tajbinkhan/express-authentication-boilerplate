import {
	ConversationModel,
	MessageModel,
	ParticipantModel,
	UserModel
} from "@/databases/mongo/schema";
import {
	ConversationModelSchemaType,
	IConversation,
	IMessage,
	IParticipant,
	IUser,
	MessageModelSchemaType,
	ParticipantModelSchemaType,
	UserModelSchemaType
} from "@/databases/mongo/types";

export default class ChatMongo {
	protected userModel = UserModel;
	protected messageModel = MessageModel;
	protected participantModel = ParticipantModel;
	protected conversationModel = ConversationModel;

	async createUser(user: IUser): Promise<UserModelSchemaType> {
		try {
			const chatUser = await this.userModel.create(user);
			return Promise.resolve(chatUser);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async createMessage(message: IMessage): Promise<MessageModelSchemaType> {
		try {
			const chatMessage = await this.messageModel.create(message);
			return Promise.resolve(chatMessage);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async createParticipant(participant: IParticipant): Promise<ParticipantModelSchemaType> {
		try {
			const chatParticipant = await this.participantModel.create(participant);
			return Promise.resolve(chatParticipant);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async createConversation(conversation: IConversation): Promise<ConversationModelSchemaType> {
		try {
			const chatConversation = await this.conversationModel.create(conversation);
			return Promise.resolve(chatConversation);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async preventDuplicateUser(email: string): Promise<boolean> {
		try {
			const chatUser = await this.userModel.findOne({ email });
			if (chatUser) {
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async findUserById(id: number): Promise<UserModelSchemaType | null> {
		try {
			const chatUser = await this.userModel.findOne({
				originalUserId: id
			});
			return Promise.resolve(chatUser);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async findConversationByParticipantId(
		participantId: string
	): Promise<ConversationModelSchemaType | null> {
		try {
			const chatConversation = await this.conversationModel.findOne({
				participants: participantId
			});
			return Promise.resolve(chatConversation);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
