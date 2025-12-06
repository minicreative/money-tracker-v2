import mongoose from "mongoose";
import environment from "./environment.js";

export default {
  async connect(): Promise<void> {
    const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_NAME } = environment;

    process.stdout.write(`Connecting to Mongo at ${MONGO_HOST}...`);

    return mongoose
      .connect(
        `mongodb://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@${MONGO_HOST}/${MONGO_NAME}`,
      )
      .then(() => {
        process.stdout.write(" done!\n");
      })
      .catch((err) => {
        process.stderr.write("Database error: " + err.stack + "\n");
        process.exit(0);
      });
  },
};
