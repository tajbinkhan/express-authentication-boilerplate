import { Pagination } from "@/utils/serviceApi";

export default class PaginationManager {
	page: number;
	limit: number;
	totalItems: number;

	constructor(page: number, limit: number, totalItems: number) {
		this.page = page;
		this.limit = limit;
		this.totalItems = totalItems;
	}

	public createPagination() {
		const totalPages = Math.ceil(this.totalItems / this.limit);

		let conditionalPage = this.page;
		if (this.page > totalPages && totalPages > 0) {
			conditionalPage = totalPages;
		}

		const offset = (conditionalPage! - 1) * this.limit!;

		const pagination: Pagination = {
			totalItems: this.totalItems,
			limit: this.limit,
			offset,
			currentPage: conditionalPage!,
			totalPages,
			hasPrevPage: conditionalPage! > 1,
			hasNextPage: conditionalPage! < totalPages,
			prevPage: conditionalPage! > 1 ? conditionalPage! - 1 : null,
			nextPage: conditionalPage! < totalPages ? conditionalPage! + 1 : null
		};

		return { pagination, offset };
	}
}
