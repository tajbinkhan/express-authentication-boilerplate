import { doubleCsrf } from "csrf-csrf";

import { csrfTimeout } from "@/core/constants";
import AppHelpers from "@/utils/appHelpers";

const { generateCsrfToken, validateRequest, doubleCsrfProtection, invalidCsrfTokenError } =
	doubleCsrf({
		getSecret: () => process.env.SECRET,
		getSessionIdentifier: () => process.env.SECRET,
		cookieName: "csrf-token",
		cookieOptions: {
			maxAge: csrfTimeout,
			sameSite: AppHelpers.sameSiteCookieConfig().sameSite,
			secure: AppHelpers.sameSiteCookieConfig().secure,
			...(AppHelpers.sameSiteCookieConfig().domain && {
				domain: AppHelpers.sameSiteCookieConfig().domain
			})
		},
		size: 32,
		errorConfig: {
			message: "Invalid CSRF token"
		},
		getCsrfTokenFromRequest: req => req.headers["x-csrf-token"]
	});

export { doubleCsrfProtection, generateCsrfToken, invalidCsrfTokenError, validateRequest };
