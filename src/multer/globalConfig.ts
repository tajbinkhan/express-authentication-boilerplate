import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

import {
	ALLOWED_AUDIO_TYPES,
	ALLOWED_DOCUMENT_TYPES,
	ALLOWED_IMAGE_TYPES,
	ALLOWED_VIDEO_TYPES
} from "@/multer/fileTypes";

// Define allowed file types - adjust based on your needs
const ALLOWED_FILE_TYPES = {
	...ALLOWED_DOCUMENT_TYPES,
	...ALLOWED_IMAGE_TYPES,
	...ALLOWED_AUDIO_TYPES,
	...ALLOWED_VIDEO_TYPES
};

export const uploadDir = "uploads";
export const originalDir = path.join(uploadDir, "original");

// Define storage configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Ensure "uploads/original" directory exists
		if (!fs.existsSync(originalDir)) fs.mkdirSync(originalDir, { recursive: true });

		cb(null, originalDir);
	},
	filename: (req, file, cb) => {
		const fileExt = path.extname(file.originalname);
		const fileName =
			file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();

		cb(null, fileName + fileExt);
	}
});

// File filter function to validate uploads
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	if (!file.mimetype || !(file.mimetype in ALLOWED_FILE_TYPES)) {
		cb(new Error("Invalid file type"));
		return;
	}
	cb(null, true);
};

// Create multer instance with configuration
const globalUpload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB file size limit
		files: 5 // Maximum 5 files per upload
	}
});

export const fileUrl = (
	req: Request,
	directory: string = originalDir,
	fileName: string = req.file?.filename!
) => {
	const normalizedDirectory = directory.replace(/\\/g, "/");
	const host = req.get("host");
	const protocol = req.protocol;
	return `${protocol}://${host}/${normalizedDirectory}/${fileName}`;
};

export default globalUpload;
