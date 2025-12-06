import express, { type Request, type Response } from "express";
import environment from "./tools/environment.js";
import database from "./tools/database.js";

// Load environment variables
const { PORT } = environment;

// Setup Express server
const app = express();

// Connect to database
await database.connect();

// Setup welcome router
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Money Tracker API!");
});

// Listen on provided port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
