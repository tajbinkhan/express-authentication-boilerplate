import db from "@/config/db";

export default abstract class DrizzleBaseRepository {
	protected db: typeof db;

	constructor() {
		this.db = db;
	}
}
