import db from "@/databases/drizzle/connection";

export default abstract class DrizzleService {
	protected db: typeof db;

	constructor() {
		this.db = db;
	}
}
