import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import MediaService from "@/app/media/media.service";

import { ApiController } from "@/controllers/base/api.controller";
import { processImage } from "@/multer/processImage";
import { ServiceApiResponse } from "@/utils/serviceApi";

export default class MediaController extends ApiController {
	protected mediaService: MediaService;
	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: Request, response: Response) {
		super(request, response);
		this.mediaService = new MediaService();
	}

	async createMedia() {
		try {
			const urls = await processImage(this.request);

			return this.apiResponse.sendResponse({
				status: StatusCodes.CREATED,
				message: "Media uploaded successfully",
				data: urls
			});
		} catch (error: unknown) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
