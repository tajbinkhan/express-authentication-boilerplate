import session from "express-session";

import { sessionTimeout } from "@/core/constants";
import DrizzleSessionStore from "@/session/customSessionStore";
import AppHelpers from "@/utils/appHelpers";

const sessionConfig = session({
	name: "session-id",
	secret: process.env.SECRET,
	saveUninitialized: false,
	resave: false,
	store: new DrizzleSessionStore(),
	// cookie: {
	// 	sameSite: "lax",
	// 	secure: false,
	// 	maxAge: sessionTimeout,
	// 	domain: "localhost"
	// }
	cookie: {
		sameSite: AppHelpers.sameSiteCookieConfig().sameSite,
		secure: AppHelpers.sameSiteCookieConfig().secure,
		maxAge: sessionTimeout,
		...(AppHelpers.sameSiteCookieConfig().domain && {
			domain: AppHelpers.sameSiteCookieConfig().domain
		})
	}
});

export default sessionConfig;
