export const ALLOWED_DOCUMENT_TYPES = {
	"application/pdf": "pdf", // Adobe Portable Document Format
	"application/msword": "doc", // Microsoft Word (Legacy)
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx", // Modern Word
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx", // Modern Excel
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx", // Modern PowerPoint
	"application/vnd.ms-excel": "xls", // Microsoft Excel (Legacy)
	"application/vnd.ms-powerpoint": "ppt", // Microsoft PowerPoint (Legacy)
	"text/plain": "txt", // Plain text files
	"text/csv": "csv" // Comma-separated values
};

export const ALLOWED_IMAGE_TYPES = {
	"image/jpeg": "jpg", // JPEG images
	"image/png": "png", // PNG images
	"image/gif": "gif", // GIF images
	"image/webp": "webp", // WebP images
	"image/svg+xml": "svg", // Scalable Vector Graphics
	"image/bmp": "bmp" // Bitmap images
};

export const ALLOWED_AUDIO_TYPES = {
	"audio/mpeg": "mp3" // MP3 audio
};

export const ALLOWED_VIDEO_TYPES = {
	"video/mp4": "mp4", // MP4 video
	"video/webm": "webm" // WebM video
};
