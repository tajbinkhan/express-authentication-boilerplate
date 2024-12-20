import * as crypto from "crypto";

export default class AppHelpers {
	/**
	 * Encodes a buffer into a base32 string.
	 * @param buffer - The buffer to encode.
	 * @returns The base32 encoded string.
	 */
	private base32Encode(buffer: Buffer): string {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; // Base32 alphabet
		let result = "";
		let bits = 0;
		let value = 0;

		for (let i = 0; i < buffer.length; i++) {
			value = (value << 8) | buffer[i];
			bits += 8;

			while (bits >= 5) {
				result += alphabet[(value >>> (bits - 5)) & 31];
				bits -= 5;
			}
		}

		if (bits > 0) {
			result += alphabet[(value << (5 - bits)) & 31];
		}

		return result;
	}

	/**
	 * Generates a token using the user information and a secret key.
	 * @param userInfo - The user information to encrypt.
	 * @param secretKey - The secret key to encrypt the user information.
	 * @returns The generated token.
	 */
	public generateToken(userId: number, secretKey: string): string {
		// 1. Generate a timestamp
		const timestamp = new Date().toISOString();

		// 2. Combine timestamp and user information
		const data = `${timestamp}:${userId}`;
		const buffer = Buffer.from(data, "utf-8");

		// 3. Encrypt the data using AES
		const algorithm = "aes-256-cbc";
		const iv = crypto.randomBytes(16); // Initialization vector
		const key = crypto.createHash("sha256").update(secretKey).digest(); // Derive a 256-bit key
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

		// 4. Combine IV and encrypted data
		const encryptedBuffer = Buffer.concat([iv, encrypted]);

		// 5. Encode to Base32
		return this.base32Encode(encryptedBuffer);
	}

	// The session timeout in milliseconds
	static sessionTimeout = 1000 * 60 * 60 * 24 * 7; // 1 week in milliseconds

	// CSRF token timeout in milliseconds
	static csrfTimeout = 1000 * 60 * 60; // 5 seconds in milliseconds

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

	/**
	 * Generates a random OTP of the specified length.
	 * @param length - The length of the OTP to generate.
	 * @returns The generated OTP.
	 * @throws An error if the length is less than 4.
	 */
	static OTPGenerator(length: number = 4): number {
		if (length < 4) {
			throw new Error("The OTP length must be at least 4.");
		}

		const min = Math.pow(10, length - 1);
		const max = Math.pow(10, length) - 1;
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * Generate OTP expiry time.
	 * @param expiryTime - The expiry time in minutes.
	 * @returns The expiry time in Date format.
	 */
	static OTPExpiry(expiryTime: number = 5): Date {
		const now = new Date();
		return new Date(now.getTime() + expiryTime * 60000);
	}
}
