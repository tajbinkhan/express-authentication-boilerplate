import express, { Router } from "express";

import MediaController from "@/app/media/media.controller";

import globalUpload from "@/multer/globalConfig";

export const mediaRouter: Router = (() => {
	const router = express.Router();

	router.post("/", globalUpload.single("file"), async (req, res) => {
		new MediaController(req, res).createMedia();
	});

	return router;
})();
