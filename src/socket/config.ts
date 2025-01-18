import { Server } from "http";
import passport from "passport";
import { ExtendedError, Socket, Server as SocketServer } from "socket.io";

import { socketCorsConfig } from "@/cors";
import sessionConfig from "@/session";
import SocketEventHandlers from "@/socket/handlers";
import { socketAuthMiddleware } from "@/socket/middleware";

export default function initializeSocket(server: Server) {
	const io = new SocketServer(server, {
		cors: socketCorsConfig,
		cookie: true
	});

	// Wrap socket with session middleware
	const wrap = (middleware: any) => (socket: Socket, next: (err?: ExtendedError) => void) => {
		middleware(socket.request, socket.request.res || {}, next);
	};

	io.use(wrap(sessionConfig));
	io.use(wrap(passport.initialize()));
	io.use(wrap(passport.session()));

	// Authentication middleware
	io.use(socketAuthMiddleware);

	// Handle connection
	io.on("connection", socket => {
		const socketHandler = new SocketEventHandlers(socket);

		socketHandler.onConnection();
	});

	return io;
}
