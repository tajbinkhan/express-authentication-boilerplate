import { Response } from "express";

import { status } from "@/utils/statusCodes";

const noContentStatus = [status.HTTP_204_NO_DATA];

export interface Pagination {
	totalItems?: number;
	limit?: number;
	offset?: number;
	currentPage?: number;
	prevPage?: number;
	nextPage?: number;
	totalPages?: number;
	hasPrevPage?: boolean;
	hasNextPage?: boolean;
}

export interface ServiceApiResponse<T> {
	status: number;
	message: string;
	data?: T;
	pagination?: Pagination;
}

export class ServiceResponse {
	static async createResponse<T>(
		status: number,
		message: string,
		data?: T,
		pagination?: Pagination
	): Promise<ServiceApiResponse<T>> {
		if (status >= 400) return Promise.reject({ status, message });
		if (noContentStatus.includes(status)) {
			return Promise.resolve({ status, message });
		}
		return Promise.resolve({ status, message, data, pagination });
	}

	static createErrorResponse(error: any) {
		console.log("Error: ", error.message);
		if (error.status) return Promise.reject(error);
		return Promise.reject({
			status: status.HTTP_500_INTERNAL_SERVER_ERROR,
			message: "Internal Server Error"
		});
	}
}

export class ApiResponse {
	private response: Response;

	constructor(response: Response) {
		this.response = response;
	}

	successResponse(message: string, data?: any, pagination?: Pagination) {
		return this.sendResponse({
			status: status.HTTP_200_OK,
			message,
			data,
			pagination
		});
	}

	unauthorizedResponse(message: string) {
		return this.sendResponse({
			status: status.HTTP_401_UNAUTHORIZED,
			message
		});
	}

	badResponse(message: string) {
		return this.sendResponse({
			status: status.HTTP_400_BAD_REQUEST,
			message
		});
	}

	internalServerError() {
		return this.sendResponse({
			status: status.HTTP_500_INTERNAL_SERVER_ERROR,
			message: "Internal Server Error"
		});
	}

	sendResponse<T>({ status, message, data, pagination }: ServiceApiResponse<T>) {
		if (noContentStatus.includes(status)) {
			return this.response.status(status).json({});
		}
		return this.response.status(status).json({ status, message, data, pagination });
	}
}
