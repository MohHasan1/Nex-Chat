import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
