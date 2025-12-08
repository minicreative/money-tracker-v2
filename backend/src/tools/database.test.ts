import { vi, beforeEach, describe, expect, test } from "vitest";
import mongoose from "mongoose";
import database from "./database.js";

describe("database.connect", () => {

  beforeEach(() => {
    vi.stubEnv("MONGO_USER", "testuser");
    vi.stubEnv("MONGO_PASS", "testpass");
    vi.stubEnv("MONGO_HOST", "localhost:27017");
    vi.stubEnv("MONGO_NAME", "testdb");
  });

  test("catches a missing enviornment variable", async () => {
    vi.stubEnv("MONGO_USER", "");
    await expect(database.connect()).rejects.toThrowError("Environment variable MONGO_USER is required and missing");
  });

  test("successful connection", async () => {
    const mongooseConnectMock = vi
      .spyOn(mongoose, "connect")
      .mockResolvedValueOnce({} as any);

    await database.connect();

    expect(mongooseConnectMock).toHaveBeenCalledWith(
      "mongodb://testuser:testpass@localhost:27017/testdb",
    );
  });

  test("failed connection", async () => {
    const mongooseConnectMock = vi
      .spyOn(mongoose, "connect")
      .mockRejectedValueOnce(new Error("Connection failed"));

    await expect(() => database.connect()).rejects.toThrowError("Connection failed");

    expect(mongooseConnectMock).toHaveBeenCalledWith(
      "mongodb://testuser:testpass@localhost:27017/testdb",
    );
  });

});