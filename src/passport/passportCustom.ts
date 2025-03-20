import { Request } from "express";
import passport from "passport";
import { Strategy as CustomStrategy, VerifiedCallback } from "passport-custom";

import { decode } from "@/app/authentication/authentication.JWT";
import AuthenticationService from "@/app/authentication/authentication.service";

import { status } from "@/utils/statusCodes";

const authenticationService = new AuthenticationService();
const jwtTokenName = process.env.JWT_COOKIE_NAME;

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
	"jwtAuthentication",
	new CustomStrategy(async (req: Request, done: VerifiedCallback) => {
		try {
			const token = req.cookies[jwtTokenName];
			if (!token)
				return done({ status: status.HTTP_403_FORBIDDEN, message: "Token not found" }, false);

			const decodeToken = await decode({ token });

			if (!decodeToken)
				return done({ status: status.HTTP_403_FORBIDDEN, message: "Token not found" }, false);

			const findUser = await authenticationService.findUserByUsername(String(decodeToken.username));

			done(null, findUser.data);
		} catch (error) {
			done(error, false);
		}
	})
);
