import path from "path";
import sharp from "sharp";

export const convertToWebP = async (filePath: string, outputDir: string, fileName: string) => {
	const outputFilePath = path.join(outputDir, `${fileName}.webp`);

	// Use sharp to convert the image
	await sharp(filePath)
		.webp({ quality: 80 }) // Adjust quality as needed
		.toFile(outputFilePath);

	return outputFilePath;
};
