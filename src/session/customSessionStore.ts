import { eq } from "drizzle-orm";
import { SessionData, Store } from "express-session";

import db from "@/databases/drizzle/connection";
import { sessions } from "@/models/drizzle/authentication.model";
import AppHelpers from "@/utils/appHelpers";

interface ExtendedSessionData extends SessionData {
	passport?: {
		user?: number;
	};
}

export default class DrizzleSessionStore extends Store {
	private sessionTimeout: number;

	constructor() {
		super();
		this.sessionTimeout = AppHelpers.sessionTimeout;
	}

	async get(id: string, callback: (err: any, session?: SessionData | null) => void): Promise<void> {
		try {
			const result = await db.select().from(sessions).where(eq(sessions.sessionId, id)).execute();

			if (!result || result.length === 0) {
				return callback(null, null);
			}

			const session = result[0];
			if (new Date(session.expires) < new Date()) {
				await this.destroy(id);
				return callback(null, null);
			}

			return callback(null, JSON.parse(session.sessionCookie!));
		} catch (err) {
			return callback(err);
		}
	}

	async set(
		id: string,
		session: ExtendedSessionData,
		callback?: (err?: any) => void
	): Promise<void> {
		try {
			if (!session) {
				return callback?.();
			}

			const sessionString = JSON.stringify(session);
			const expire = session.cookie.expires || new Date(Date.now() + this.sessionTimeout);

			// get session user from cookie
			const userId = session?.passport?.user || null;

			await db
				.insert(sessions)
				.values({
					sessionId: id,
					sessionCookie: sessionString,
					userId,
					expires: expire
				})
				.onConflictDoUpdate({
					target: sessions.sessionId,
					set: {
						sessionCookie: sessionString,
						userId,
						expires: expire
					}
				})
				.returning();

			callback?.();
		} catch (err) {
			callback?.(err);
		}
	}

	async destroy(id: string, callback?: (err?: any) => void): Promise<void> {
		try {
			await db.delete(sessions).where(eq(sessions.sessionId, id)).execute();

			callback?.();
		} catch (err) {
			callback?.(err);
		}
	}

	async touch(id: string, session: SessionData, callback?: () => void): Promise<void> {
		try {
			const expire = session.cookie.expires || new Date(Date.now() + this.sessionTimeout);

			await db
				.update(sessions)
				.set({
					expires: expire
				})
				.where(eq(sessions.sessionId, id))
				.execute();

			callback?.();
		} catch (err) {
			callback?.();
		}
	}
}
