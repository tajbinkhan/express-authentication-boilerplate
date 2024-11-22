import passport from "passport";
import { Strategy } from "passport-local";

import AuthenticationService from "@/app/authentication/Authentication.service";

import db from "@/databases/drizzle/connection";
import { sessions } from "@/models/Authentication.model";
import AppHelpers from "@/utils/AppHelpers";

const authenticationService = new AuthenticationService();

passport.serializeUser(async (user, done) => {
	// TODO: The session update function is not working
	await db
		.insert(sessions)
		.values({
			sessionId: String(user.id),
			sessionCookie: JSON.stringify(user),
			userId: user.id,
			expires: new Date(Date.now() + AppHelpers.sessionTimeout)
		})
		.onConflictDoUpdate({
			target: sessions.sessionId,
			set: {
				sessionCookie: JSON.stringify(user),
				userId: user.id,
				expires: new Date(Date.now() + AppHelpers.sessionTimeout)
			}
		})
		.execute();

	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	const user = await authenticationService.findUserById(id);

	done(null, user.data);
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const inputType = AppHelpers.detectInputType(username);

			if (inputType === "EMAIL") {
				const user = await authenticationService.findUserByEmail(username);

				if (!user.data) return done(null, false, { message: "Incorrect email." });

				return done(null, user.data);
			} else {
				const user = await authenticationService.findUserByUsername(username);

				if (!user.data) return done(null, false, { message: "Incorrect username." });

				return done(null, user.data);
			}
		} catch (error) {
			return done(error);
		}
	})
);
