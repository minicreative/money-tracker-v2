import express, { type Request, type Response } from "express";
import environment from "./tools/environment.js";
import database from "./tools/database.js";

export default async function index() {
  // Load environment variables
  const PORT = environment.getPort();

  // Setup Express server
  const app = express();

  // Connect to database
  console.log("Connecting to database...");
  await database.connect().then(() => {
    console.log("Database connection successful.");
  }).catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

  // Setup welcome router
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Money Tracker API!");
  });

  // Listen on provided port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
}

index();


