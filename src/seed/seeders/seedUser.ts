import { hash } from "bcrypt";
import { readFile } from "fs/promises";
import path from "path";

import db from "@/databases/drizzle/connection";
import { RoleType } from "@/databases/drizzle/types";
import { users } from "@/models/drizzle/authentication.model";

interface SeedUser {
	name: string;
	username: string;
	email: string;
	image: string;
	role: RoleType;
}

const seedUsers = async () => {
	try {
		// Read the seed data from JSON file
		const jsonPath = path.join(process.cwd(), "src/seed/data/users.json");
		const seedData: SeedUser[] = JSON.parse(await readFile(jsonPath, "utf-8"));

		// Create hashed password for all users
		const hashedPassword = await hash("password123", 10);

		// Prepare the user data with additional fields
		const userData = seedData.map(user => ({
			...user,
			password: hashedPassword,
			emailVerified: new Date(),
			createdAt: new Date(),
			updatedAt: new Date()
		}));

		// Insert all users
		await db.insert(users).values(userData);

		console.log("Users seeded successfully!");
	} catch (error) {
		console.error("Error seeding users:", error);
	}
};

export default seedUsers;
