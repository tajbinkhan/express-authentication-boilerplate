import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import AuthenticationService from "@/app/authentication/authentication.service";

const authenticationService = new AuthenticationService();

passport.serializeUser(async (user, done) => {
	try {
		done(null, user.id);
	} catch (error) {
		done(error, false);
	}
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await authenticationService.findUserById(id);
		done(null, user.data);
	} catch (error) {
		done(error, false);
	}
});

export default passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGlE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL
		},
		async (accessToken, _, profile, done) => {
			try {
				const user = await authenticationService.createUserFromGoogle(profile, accessToken);

				done(null, user.data);
			} catch (error) {
				console.error("Google strategy error:", error);
				done(error, false);
			}
		}
	)
);
