import { NextFunction, Request, Response } from "express";

import originStore from "@/utils/originStore";

const domainStore = (req: Request, res: Response, next: NextFunction) => {
	const protocol = req.secure ? "https" : "http";
	// Prefer origin header, fallback to referer, or "Unknown"
	const rawClientDomain = req.headers.origin || req.headers.referer || "Unknown";
	const clientDomain =
		rawClientDomain !== "Unknown" ? new URL(rawClientDomain.toString()).origin : "Unknown";
	const serverDomain = req.headers.host ? `${protocol}://${req.headers.host}` : "Unknown";

	originStore.setClientDomain(clientDomain);
	originStore.setServerDomain(serverDomain);

	next();
};

export default domainStore;
