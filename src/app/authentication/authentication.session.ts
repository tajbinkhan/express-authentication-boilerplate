import { eq } from "drizzle-orm";

import DrizzleService from "@/databases/drizzle/service";
import { sessions } from "@/models/drizzle/authentication.model";
import AppHelpers from "@/utils/appHelpers";

export default class AuthenticationSession extends DrizzleService {
	private userId: number;
	private maxAge: number;

	constructor(userId: number) {
		super();
		this.userId = userId;
		this.maxAge = AppHelpers.sessionTimeout;
	}

	async createSession(jwtToken: string) {
		try {
			const sessionId = new AppHelpers().generateToken(this.userId, process.env.SECRET);
			const expireDate = new Date(Date.now() + this.maxAge);

			const createdData = await this.db
				.insert(sessions)
				.values({
					userId: this.userId,
					expires: expireDate,
					sessionCookie: jwtToken,
					sessionId: sessionId
				})
				.returning();

			if (!createdData.length) return Promise.reject("Session not created");

			return Promise.resolve(createdData[0]);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async verifySession(jwtToken: string) {
		try {
			const sessionData = await this.db.query.sessions.findFirst({
				where: (table, { eq }) => eq(table.sessionCookie, jwtToken)
			});

			if (!sessionData) return Promise.reject("Session not found");

			return Promise.resolve(sessionData);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async updateSession(jwtToken: string) {
		try {
			const expireDate = new Date(Date.now() + this.maxAge);

			const updatedData = await this.db
				.update(sessions)
				.set({ expires: expireDate })
				.where(eq(sessions.sessionCookie, jwtToken))
				.returning();

			if (!updatedData.length) return Promise.reject("Session not updated");

			return Promise.resolve(updatedData[0]);
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async destroySession(jwtToken: string) {
		try {
			const deletedData = await this.db
				.delete(sessions)
				.where(eq(sessions.sessionCookie, jwtToken))
				.returning();

			return Promise.resolve(deletedData);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}
