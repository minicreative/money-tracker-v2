import mongoose from "mongoose";
import environment from "./environment.js";

async function connect(): Promise<mongoose.Mongoose> {

  // Attempt to get Mongo configuration from environment variables
  let mongoConfig
  try {
    mongoConfig = environment.getMongoConfig();
  } catch (err) {
    return Promise.reject(err);
  }
  const { user, password, host, name } = mongoConfig;

  // Attempt to connect to MongoDB
  return mongoose.connect(`mongodb://${user}:${encodeURIComponent(password)}@${host}/${name}`)
}

export default {
  connect,
};
