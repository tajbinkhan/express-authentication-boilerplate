import { SQL, asc, desc } from "drizzle-orm";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

export class SortingHelper<T extends PgTableWithColumns<any>> {
	private model: T;
	private sortableFields: Record<string, SQL>;

	constructor(model: T) {
		this.model = model;
		this.sortableFields = this.getDynamicSortFields();
	}

	private getDynamicSortFields(): Record<string, SQL> {
		const fields: Record<string, SQL> = {};

		for (const [key, column] of Object.entries(this.model)) {
			if (typeof column === "object" && "name" in column) {
				fields[key] = column;
			}
		}

		return fields;
	}

	public getValidSortFields(): string[] {
		return Object.keys(this.sortableFields);
	}

	public applySorting(sortMethod?: string, sortBy?: string): SQL | undefined {
		if (!sortMethod) return desc(this.model.id);

		const sortField = this.sortableFields[sortMethod];

		if (!sortField) return desc(this.model.id);

		const sortDirection = sortBy?.toLowerCase() === "asc" ? asc : desc;
		return sortDirection(sortField);
	}

	public isValidSortMethod(sortMethod: string): boolean {
		return sortMethod in this.sortableFields;
	}

	public isValidSortDirection(sortBy: string): boolean {
		return ["asc", "desc"].includes(sortBy.toLowerCase());
	}
}
