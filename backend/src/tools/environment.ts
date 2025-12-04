interface EnvironmentValues {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  SECRET: string;
  MONGO_HOST: string;
  MONGO_NAME: string;
  MONGO_USER: string;
  MONGO_PASS: string;
}

function getOptionalString(name: string, defaultString?: string): string {
  const value = process.env[name];
  if (!value) {
    return defaultString || '';
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
    throw new Error(`Environment variable ${name} must be a number, but got "${value}".`);
  }

  return num;
}

const environment: EnvironmentValues = {
  NODE_ENV: getOptionalString('NODE_ENV', "development") as EnvironmentValues['NODE_ENV'],
  PORT: getNumericValue('PORT') as EnvironmentValues['PORT'],
  SECRET: getRequiredString('SECRET') as EnvironmentValues['SECRET'],
  MONGO_HOST: getRequiredString('MONGO_HOST') as EnvironmentValues['MONGO_HOST'],
  MONGO_NAME: getRequiredString('MONGO_NAME') as EnvironmentValues['MONGO_NAME'],
  MONGO_USER: getRequiredString('MONGO_USER') as EnvironmentValues['MONGO_USER'],
  MONGO_PASS: getRequiredString('MONGO_PASS') as EnvironmentValues['MONGO_PASS'],
};

Object.freeze(environment);
export default environment;