import { Request } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

import { convertToWebP } from "@/multer/converter";
import { ALLOWED_IMAGE_TYPES } from "@/multer/fileTypes";
import { fileUrl, originalDir, uploadDir } from "@/multer/globalConfig";

// Image sizes to generate
const sizes = [
	{ name: "thumbnail", width: 150, height: 150 },
	{ name: "medium", width: 300, height: 300 },
	{ name: "large", width: 1024, height: 1024 }
];

export const convertedDir = path.join(uploadDir, "converted");

// Optimize and save images in size-based folders
export const processImage = async (req: Request) => {
	try {
		const fileName = req.file?.filename!;
		const originalFilePath = path.join(originalDir, fileName);
		const baseName = fileName.replace(path.extname(fileName), "");

		// Generate URL for the original and converted files
		const urls = [
			fileUrl(req, originalDir) // Original file URL
		];

		if (req.file?.mimetype! in ALLOWED_IMAGE_TYPES) {
			urls.push(fileUrl(req, convertedDir, `${baseName}-original.webp`));

			// Ensure "uploads/converted" directory exists
			if (!fs.existsSync(convertedDir)) {
				fs.mkdirSync(convertedDir, { recursive: true });
			}

			// Convert to WebP and save in "uploads/converted"
			const webpFilePath = await convertToWebP(originalFilePath, convertedDir, baseName);

			// Get the dimensions of the original image
			const metadata = await sharp(originalFilePath).metadata();

			for (const size of sizes) {
				if (
					metadata.width &&
					metadata.height &&
					(metadata.width > size.width || metadata.height > size.height)
				) {
					const sizeDir = path.join(uploadDir, `${size.width}x${size.height}`);
					if (!fs.existsSync(sizeDir)) {
						fs.mkdirSync(sizeDir, { recursive: true });
					}

					// Resize WebP file to the required sizes
					const outputFileName = `${baseName}-${size.width}x${size.height}.webp`;
					const outputFilePath = path.join(sizeDir, outputFileName);
					await sharp(webpFilePath)
						.resize(size.width, size.height, { fit: "inside" })
						.toFile(outputFilePath);

					// Add resized image URL to the list
					urls.push(fileUrl(req, sizeDir, outputFileName));
				}
			}
		}

		return urls;
	} catch (error) {
		return null;
	}
};
