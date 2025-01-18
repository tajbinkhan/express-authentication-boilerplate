import mongoose from "mongoose";

export default class MongoDBClient {
	private readonly MONGO_DATABASE_URL: string;

	constructor() {
		this.MONGO_DATABASE_URL = process.env.MONGO_DATABASE_URL;
	}

	// create mongoose connection
	public async connect() {
		try {
			await mongoose.connect(this.MONGO_DATABASE_URL);
			console.log("Connected to MongoDB");
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
			process.exit(1);
		}
	}
}
