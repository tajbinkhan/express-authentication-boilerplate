import { Socket } from "socket.io";

import ChatService from "@/app/chat/chat.service";

export default class SocketEventHandlers {
	protected socket: Socket;

	/**
	 * Constructor
	 * @param socket - Socket.io instance
	 */
	constructor(socket: Socket) {
		this.socket = socket;
	}

	onConnection() {
		console.log("Client connected:", this.socket.id);

		const chatService = new ChatService(this.socket);

		// Handle disconnection
		this.socket.on("disconnect", () => {
			console.log("Client disconnected:", this.socket.id);
		});

		this.socket.on("message", data => chatService.createChat(data));
	}
}
