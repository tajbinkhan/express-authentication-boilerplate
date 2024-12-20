import { hkdf } from "@panva/hkdf";
import { EncryptJWT, JWTPayload, base64url, calculateJwkThumbprint, jwtDecrypt } from "jose";

import { sessionTimeout } from "@/core/constants";

type Awaitable<T> = T | PromiseLike<T>;
const DEFAULT_MAX_AGE = sessionTimeout;

const now = () => (Date.now() / 1000) | 0;

const alg = "dir";
const enc = "A256CBC-HS512";
type Digest = Parameters<typeof calculateJwkThumbprint>[1];

/** Issues a JWT. By default, the JWT is encrypted using "A256CBC-HS512". */
export async function encode<Payload = JWT>(params: JWTEncodeParams<Payload>) {
	const {
		token,
		secret = process.env.SECRET,
		maxAge = DEFAULT_MAX_AGE,
		salt = process.env.SESSION_COOKIE_NAME
	} = params;

	const secrets = Array.isArray(secret) ? secret : [secret];
	const encryptionSecret = await getDerivedEncryptionKey(enc, secrets[0], salt);

	const thumbprint = await calculateJwkThumbprint(
		{ kty: "oct", k: base64url.encode(encryptionSecret) },
		`sha${encryptionSecret.byteLength << 3}` as Digest
	);

	const generatedToken = await new EncryptJWT(token as JWTPayload)
		.setProtectedHeader({ alg, enc, kid: thumbprint })
		.setIssuedAt()
		.setExpirationTime(now() + maxAge)
		.setJti(crypto.randomUUID())
		.encrypt(encryptionSecret);

	return generatedToken;
}

/** Decodes an Express.js issued JWT. */
export async function decode<Payload = JWT>(params: JWTDecodeParams): Promise<Payload | null> {
	const { token, secret = process.env.SECRET, salt = process.env.SESSION_COOKIE_NAME } = params;
	const secrets = Array.isArray(secret) ? secret : [secret];
	if (!token) return null;
	const { payload } = await jwtDecrypt(
		token,
		async ({ kid, enc }) => {
			for (const secret of secrets) {
				const encryptionSecret = await getDerivedEncryptionKey(enc, secret, salt);
				if (kid === undefined) return encryptionSecret;

				const thumbprint = await calculateJwkThumbprint(
					{ kty: "oct", k: base64url.encode(encryptionSecret) },
					`sha${encryptionSecret.byteLength << 3}` as Digest
				);
				if (kid === thumbprint) return encryptionSecret;
			}

			throw new Error("no matching decryption secret");
		},
		{
			clockTolerance: 15,
			keyManagementAlgorithms: [alg],
			contentEncryptionAlgorithms: [enc, "A256GCM"]
		}
	);
	return payload as Payload;
}

async function getDerivedEncryptionKey(
	enc: string,
	keyMaterial: Parameters<typeof hkdf>[1],
	salt: Parameters<typeof hkdf>[2]
) {
	let length: number;
	switch (enc) {
		case "A256CBC-HS512":
			length = 64;
			break;
		case "A256GCM":
			length = 32;
			break;
		default:
			throw new Error("Unsupported JWT Content Encryption Algorithm");
	}
	return await hkdf(
		"sha256",
		keyMaterial,
		salt,
		`Express.js Generated Encryption Key (${salt})`,
		length
	);
}

export interface DefaultJWT extends Record<string, unknown> {
	name?: string | null;
	email?: string | null;
	picture?: string | null;
	sub?: string;
	iat?: number;
	exp?: number;
	jti?: string;
}

/**
 * Returned by the `jwt` callback when using JWT sessions
 *
 * [`jwt` callback](https://authjs.dev/reference/core/types#jwt)
 */
export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams<Payload = JWT> {
	/**
	 * The maximum age of the Express.js issued JWT in seconds.
	 *
	 * @default 30 * 24 * 60 * 60 // 30 days
	 */
	maxAge?: number;
	/** Used in combination with `secret`, to derive the encryption secret for JWTs. */
	salt?: string;
	/** Used in combination with `salt`, to derive the encryption secret for JWTs. */
	secret?: string | string[];
	/** The JWT payload. */
	token: Payload;
}

export interface JWTDecodeParams {
	/** Used in combination with `secret`, to derive the encryption secret for JWTs. */
	salt?: string;
	/**
	 * Used in combination with `salt`, to derive the encryption secret for JWTs.
	 *
	 * @note
	 * You can also pass an array of secrets, in which case the first secret that successfully
	 * decrypts the JWT will be used. This is useful for rotating secrets without invalidating existing sessions.
	 * The newer secret should be added to the start of the array, which will be used for all new sessions.
	 */
	secret?: string | string[];
	/** The Express.js issued JWT to be decoded */
	token?: string;
}

export interface JWTOptions {
	/**
	 * The secret used to encode/decode the Express.js issued JWT.
	 * It can be an array of secrets, in which case the first secret that successfully
	 * decrypts the JWT will be used. This is useful for rotating secrets without invalidating existing sessions.
	 * @internal
	 */
	secret: string | string[];
	/**
	 * The maximum age of the Express.js issued JWT in seconds.
	 *
	 * @default 30 * 24 * 60 * 60 // 30 days
	 */
	maxAge: number;
	/** Override this method to control the Express.js issued JWT encoding. */
	encode: (params: JWTEncodeParams) => Awaitable<string>;
	/** Override this method to control the Express.js issued JWT decoding. */
	decode: (params: JWTDecodeParams) => Awaitable<JWT | null>;
}
