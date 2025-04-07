import { Response } from "express";
import { StatusCodes } from "http-status-codes";

// Create a type from the status object values
type HttpStatusCode = number;

// Stricter Pagination interface with required fields
export interface Pagination {
	totalItems: number;
	limit: number;
	offset: number;
	currentPage: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

// Base interface for API responses
interface BaseApiResponse {
	status: HttpStatusCode;
	message: string;
}

// Generic response interfaces with strict typing
export interface ServiceApiResponse<T> extends BaseApiResponse {
	data: T;
	pagination?: Pagination;
}

export interface ServiceSendApiResponse<T> extends BaseApiResponse {
	data?: T;
	pagination?: Pagination;
}

// Error type definitions
export interface ApiError extends BaseApiResponse {
	error?: string;
}

const isApiError = (error: unknown): error is ApiError => {
	return (
		error !== null &&
		typeof error === "object" &&
		"status" in error &&
		typeof (error as ApiError).status === "number" &&
		"message" in error &&
		typeof (error as ApiError).message === "string"
	);
};

const NO_CONTENT_STATUSES = new Set([StatusCodes.NO_CONTENT]);

export class ServiceResponse {
	static async createResponse<T>(
		status: HttpStatusCode,
		message: string,
		data: T,
		pagination?: Pagination
	): Promise<ServiceApiResponse<T>> {
		if (NO_CONTENT_STATUSES.has(status)) {
			return Promise.resolve({ status, message, data: undefined as T });
		}
		return Promise.resolve({ status, message, data, pagination });
	}

	static async createRejectResponse<T>(
		status: HttpStatusCode,
		message: string
	): Promise<ServiceApiResponse<T>> {
		return Promise.reject({ status, message });
	}

	static createErrorResponse(error: unknown): Promise<never> {
		console.error("Error:", error instanceof Error ? error.message : error);

		if (isApiError(error)) return Promise.reject(error);

		return Promise.reject({
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error"
		});
	}
}

export class ApiResponse {
	private readonly response: Response;

	constructor(response: Response) {
		this.response = response;
	}

	successResponse<T>(message: string, data?: T, pagination?: Pagination) {
		return this.sendResponse<T>({
			status: StatusCodes.OK,
			message,
			data,
			pagination
		});
	}

	unauthorizedResponse(message: string) {
		return this.sendResponse({
			status: StatusCodes.UNAUTHORIZED,
			message
		});
	}

	forbiddenResponse(message: string) {
		return this.sendResponse({
			status: StatusCodes.FORBIDDEN,
			message
		});
	}

	badResponse(message: string) {
		return this.sendResponse({
			status: StatusCodes.BAD_REQUEST,
			message
		});
	}

	internalServerError(message: string = "Internal Server Error") {
		return this.sendResponse({
			status: StatusCodes.INTERNAL_SERVER_ERROR,
			message
		});
	}

	sendResponse<T>({ status, message, data, pagination }: ServiceSendApiResponse<T>): Response {
		if (NO_CONTENT_STATUSES.has(status)) {
			return this.response.status(status).json({});
		}

		const responseBody: Partial<ServiceSendApiResponse<T>> = { status, message };

		if (data !== undefined) {
			responseBody.data = data;
		}

		if (pagination) {
			responseBody.pagination = pagination;
		}

		return this.response.status(status).json(responseBody);
	}
}
