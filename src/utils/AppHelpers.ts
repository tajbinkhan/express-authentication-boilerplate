export default class AppHelpers {
	// The session timeout in milliseconds
	static sessionTimeout = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds

	/**
	 * Determines if the input is an email or a username.
	 * @param input - The user-provided input.
	 * @returns "email" if the input is an email, "username" otherwise.
	 */
	static detectInputType(input: string): "EMAIL" | "USERNAME" {
		// Regular expression to validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(input) ? "EMAIL" : "USERNAME";
	}
}
