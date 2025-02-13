import seedUsers from "@/seed/seeders/seedUser";

async function runSeeders() {
	try {
		console.log("Seeding started...\n\n");

		console.log("Seeding users...");
		await seedUsers();
		console.log("Seeding users completed.\n");
		process.exit(0); // Exit with success status
	} catch (error) {
		console.error("Error during seeding:", error);
		process.exit(1); // Exit with error status
	}
}

runSeeders();
