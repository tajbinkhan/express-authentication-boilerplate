import { Socket } from "socket.io";

import AuthenticationService from "@/app/authentication/authentication.service";
import ChatMongo from "@/app/chat/chat.mongo";

import { UserSchemaType } from "@/databases/drizzle/types";
import { IConversation, IUser, UserModelSchemaType } from "@/databases/mongo/types";

export default class ChatService {
	protected socket: Socket;
	protected authService: AuthenticationService;
	protected chatMongo: ChatMongo;

	constructor(socket: Socket) {
		this.socket = socket;
		this.authService = new AuthenticationService();
		this.chatMongo = new ChatMongo();
	}

	async createChat(data: any) {
		try {
			console.log("User connected id:", this.socket.data.userId);
			const userId = this.socket.data.userId;

			const retrieveUser = await this.authService.findUserById(userId);

			const user = await this.createUserIfNotExists(retrieveUser.data);

			const conversationObject: IConversation = {
				name: "Solo Chat",
				participants: [user._id],
				type: "SOLO",
				createdBy: user._id,
				isActive: true
			};

			// TODO: Uncomment the following code after implementing the createConversation, createParticipant, and createMessage methods in ChatMongo

			// const createConversation = await this.chatMongo.createConversation(conversationObject);

			// const createParticipant = await this.chatMongo.createParticipant({
			// 	userId: user._id,
			// 	conversationId: createConversation._id,
			// 	isMuted: false,
			// 	joinedAt: new Date()
			// });

			// const createMessage = await this.chatMongo.createMessage({
			// 	content: data.content,
			// 	senderId: user._id,
			// 	conversationId: createConversation._id,
			// 	readBy: []
			// });

			return Promise.resolve(user);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async createUserIfNotExists(data: UserSchemaType): Promise<UserModelSchemaType> {
		try {
			// Check if user exists
			let findUser = await this.chatMongo.findUserById(data.id);

			if (!findUser) {
				// Create user object for mongoDB
				const chatUser: IUser = {
					originalUserId: data.id,
					name: data.name,
					username: data.username,
					email: data.email,
					image: data.image,
					role: data.role
				};
				// Create the user in mongoDB
				findUser = await this.chatMongo.createUser(chatUser);
			}

			return Promise.resolve(findUser);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
