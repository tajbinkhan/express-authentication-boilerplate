import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

import { status } from "@/utils/statusCodes";

export interface SocketError {
	code: number;
	message: string;
	details?: any;
}

export const SocketErrors = {
	UNAUTHORIZED: {
		code: status.HTTP_401_UNAUTHORIZED,
		message: "Unauthorized"
	}
} as const;

export const socketAuthMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
	try {
		const session = socket.request.session;

		// Check if session exists
		if (!session) {
			const error: SocketError = {
				...SocketErrors.UNAUTHORIZED
			};
			return next(new Error(JSON.stringify(error)));
		}

		// Check if session has expired
		if (session.cookie.expires && new Date() > session.cookie.expires) {
			const error: SocketError = {
				...SocketErrors.UNAUTHORIZED
			};
			return next(new Error(JSON.stringify(error)));
		}

		// Check if user is authenticated
		if (!session.passport?.user) {
			const error: SocketError = {
				...SocketErrors.UNAUTHORIZED
			};
			return next(new Error(JSON.stringify(error)));
		}

		// Attach user data to socket
		socket.data.userId = session.passport.user;
		socket.data.sessionId = session.id;

		next();
	} catch (err) {
		console.error("Socket authentication error:", err);
		const error: SocketError = {
			code: status.HTTP_500_INTERNAL_SERVER_ERROR,
			message: "Internal server error",
			details:
				process.env.NODE_ENV === "development"
					? err instanceof Error
						? err.message
						: String(err)
					: undefined
		};
		next(new Error(JSON.stringify(error)));
	}
};
