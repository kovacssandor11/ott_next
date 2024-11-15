import * as mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
      await mongoose.connect(process.env.DATABASE_URL!);
      console.log("Connecting to db...")
  } catch (error) {
      console.log(error);
  }
}