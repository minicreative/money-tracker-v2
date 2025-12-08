interface MongoConfig {
  user: string;
  password: string;
  host: string;
  name: string;
}

function getOptionalString(name: string, defaultString: string): string {
  const value = process.env[name];
  if (!value) {
    return defaultString;
  }
  return value;
}

function getRequiredString(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required and missing.`);
  }
  return value;
}

function getNumericValue(name: string): number {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is required and missing.`);
  }

  const num = parseInt(value, 10);
  if (isNaN(num)) {
    throw new Error(
      `Environment variable ${name} must be a number, but got "${value}".`,
    );
  }

  return num;
}

export default {
  getEnviornment: () => getOptionalString("NODE_ENV", "development"),
  getPort: () => getNumericValue("PORT"),
  getMongoConfig: () => {
    const mongoConfig: MongoConfig = {
      user: getRequiredString("MONGO_USER"),
      password: getRequiredString("MONGO_PASS"),
      host: getRequiredString("MONGO_HOST"),
      name: getRequiredString("MONGO_NAME"),
    }
    return mongoConfig;
  }
};
export type { MongoConfig };
