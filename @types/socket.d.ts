// types/custom.d.ts (create this file if it doesn't exist)
import { Session } from "express-session";
import "http";
import { Server as SocketServer } from "socket.io";

declare global {
	namespace Express {
		interface Application {
			io: SocketServer;
		}
	}
}

declare module "http" {
	interface IncomingMessage {
		session: Session & {
			passport?: {
				user?: number;
			};
		};
		res?: any;
	}
}
