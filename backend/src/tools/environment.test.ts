import { vi, beforeEach, describe, expect, test } from "vitest";
import enviornment from "./environment.js";

describe("environment.getEnviornment", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
  });

  test("returns the NODE_ENV value when set", () => {
    expect(enviornment.getEnviornment()).toBe("production");
  });

  test("returns 'development' when NODE_ENV is not set", () => {
    vi.stubEnv("NODE_ENV", "");
    expect(enviornment.getEnviornment()).toBe("development");
  });

  test("returns 'development' when NODE_ENV is not an allowed value", () => {
    vi.stubEnv("NODE_ENV", "foobar");
    expect(() => enviornment.getEnviornment()).toThrowError(
      "Environment variable NODE_ENV must be one of [development, production], but got \"foobar\".",
    );
  });
});

describe("environment.getPort", () => {
  beforeEach(() => {
    vi.stubEnv("PORT", "8080");
  });

  test("successful retrieval of PORT", () => {
    expect(enviornment.getPort()).toBe(8080);
  });

  test("missing PORT throws error", () => {
    vi.stubEnv("PORT", "");
    expect(() => enviornment.getPort()).toThrowError(
      "Environment variable PORT is required and missing.",
    );
  });

  test("non-numeric PORT throws error", () => {
    vi.stubEnv("PORT", "not-a-number");
    expect(() => enviornment.getPort()).toThrowError(
      'Environment variable PORT must be a number, but got "not-a-number".',
    );
  });
});

describe("environment.getMongoConfig", () => {

  beforeEach(() => {
    vi.stubEnv("MONGO_USER", "testuser");
    vi.stubEnv("MONGO_PASS", "testpass");
    vi.stubEnv("MONGO_HOST", "localhost:27017");
    vi.stubEnv("MONGO_NAME", "testdb");
  });

  test("successful retrieval of Mongo config", () => {
    const mongoConfig = enviornment.getMongoConfig();
    expect(mongoConfig).toEqual({
      user: "testuser",
      password: "testpass",
      host: "localhost:27017",
      name: "testdb",
    });
  });

  test("missing MONGO_USER throws error", () => {
    vi.stubEnv("MONGO_USER", "");
    expect(() => enviornment.getMongoConfig()).toThrowError(
      "Environment variable MONGO_USER is required and missing.",
    );
  });

  test("missing MONGO_PASS throws error", () => {
    vi.stubEnv("MONGO_PASS", "");
    expect(() => enviornment.getMongoConfig()).toThrowError(
      "Environment variable MONGO_PASS is required and missing.",
    );
  });

  test("missing MONGO_HOST throws error", () => {
    vi.stubEnv("MONGO_HOST", "");
    expect(() => enviornment.getMongoConfig()).toThrowError(
      "Environment variable MONGO_HOST is required and missing.",
    );
  });

  test("missing MONGO_NAME throws error", () => {
    vi.stubEnv("MONGO_NAME", "");
    expect(() => enviornment.getMongoConfig()).toThrowError(
      "Environment variable MONGO_NAME is required and missing.",
    );
  });

});