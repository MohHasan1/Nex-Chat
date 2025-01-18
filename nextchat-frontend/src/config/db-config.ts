/* eslint-disable @typescript-eslint/no-explicit-any */
import { logError, logInfo } from "@/utils/log";
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    logInfo("connected to mongoDB");
  } catch (error:any) {
    logError("Failed to connect to mongoDB" + error);
  }
};

export function checkMongoDBEnvVar() {
  const mongodbUri = process.env.MONGO_URL;

  if (!mongodbUri) {
    throw new Error(
      "Missing MongoDB URI. Please set NEXT_MONGO_URL in your .env.local file."
    );
  }
}
