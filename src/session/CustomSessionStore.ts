import { eq } from "drizzle-orm";
import session, { SessionData } from "express-session";

import { dbPool } from "@/databases/drizzle/connection";
import { sessions } from "@/models/Authentication.model";
import AppHelpers from "@/utils/AppHelpers";

const sessionTimeout = AppHelpers.sessionTimeout;

export default class DrizzleSessionStore extends session.Store {
	async get(id: string, callback: (err: any, session?: SessionData | null | undefined) => void) {
		try {
			const newUpdatedTime = new Date(Date.now() + sessionTimeout);
			const result = await dbPool
				.select()
				.from(sessions)
				.where(eq(sessions.sessionId, id))
				.execute();

			const sessionData = result[0];

			if (sessionData) {
				// extend the session
				await dbPool
					.update(sessions)
					.set({
						expires: newUpdatedTime
					})
					.where(eq(sessions.sessionId, id))
					.execute();
				callback(null, JSON.parse(sessionData.sessionCookie));
			} else {
				callback(null);
			}
		} catch (err) {
			callback(err);
		}
	}

	async set(id: string, session: SessionData, callback?: (err?: any) => void) {
		try {
			const sessionString = JSON.stringify(session);
			const expire = session.cookie.expires || new Date(sessionTimeout);

			await dbPool
				.insert(sessions)
				.values({
					sessionId: id,
					sessionCookie: sessionString,
					expires: expire
				})
				.onConflictDoUpdate({
					target: sessions.sessionId,
					set: {
						sessionCookie: sessionString,
						expires: expire
					}
				})
				.execute();

			callback && callback();
		} catch (err) {
			callback && callback(err);
		}
	}

	async destroy(id: string, callback?: ((err?: any) => void) | undefined) {
		try {
			await dbPool.delete(sessions).where(eq(sessions.sessionId, id)).execute();

			callback && callback();
		} catch (err) {
			callback && callback(err);
		}
	}
}
