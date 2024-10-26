import { Request, Response } from "express";

import { ApiResponse } from "@/utils/serviceApi";

type QueryParamsProxy = {
	[key: string]: string | null;
};

export abstract class ApiController {
	protected request: Request;
	protected response: Response;
	protected searchParams: QueryParamsProxy;
	protected apiResponse: ApiResponse;

	protected constructor(req: Request, res: Response) {
		this.request = req;
		this.response = res;
		this.apiResponse = new ApiResponse(res);

		this.searchParams = this.getQueryParam(req);
	}

	async getReqBody() {
		return this.request.body;
	}

	getQueryParam(request: Request): QueryParamsProxy {
		const queryParams = request.query;
		const handler = {
			get: (target: Record<string, any>, prop: string) => {
				return target[prop] || null;
			}
		};
		return new Proxy(queryParams, handler) as QueryParamsProxy;
	}
}

export interface ApiCrudController {
	index(): unknown;
	create(): unknown;
	show(id: number | string): unknown;
	update(id: number | string): unknown;
	delete(id: number | string): unknown;
}
