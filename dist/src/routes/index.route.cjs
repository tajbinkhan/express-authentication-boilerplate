"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/index.route.ts
var index_route_exports = {};
__export(index_route_exports, {
  default: () => indexRouter
});
module.exports = __toCommonJS(index_route_exports);
function indexRouter(app) {
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
//# sourceMappingURL=index.route.cjs.map