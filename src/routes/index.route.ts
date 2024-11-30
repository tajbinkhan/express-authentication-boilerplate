import { Express } from "express";

export default function indexRouter(app: Express) {
	app.get("/", (req, res) => {
		res.status(200).send(`
				<!DOCTYPE html>
				<html lang="en">
				<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Welcome Page</title>
						<style>
								body {
										font-family: Arial, sans-serif;
										background-color: #f4f4f9;
										color: #333;
										margin: 0;
										padding: 0;
										display: flex;
										justify-content: center;
										align-items: center;
										height: 100vh;
								}
								.container {
										text-align: center;
										background: white;
										padding: 20px;
										border-radius: 10px;
										box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
								}
								h1 {
										color: #4CAF50;
								}
								p {
										font-size: 1.2em;
								}
						</style>
				</head>
				<body>
						<div class="container">
								<h1>Welcome to the Application</h1>
								<p>All the API routes start with <code>/api</code></p>
								<p>For example: <code>/api/auth/login</code></p>
						</div>
				</body>
				</html>
    `);
	});
}
