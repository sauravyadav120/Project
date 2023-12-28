import mongoose from "mongoose";
export const connectToDb = async () => {
  let isConnected = false;

  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) return console.log("MongoDb url not found");
  if (isConnected) return console.log("Already connected to mongodb");
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("error");
    isConnected = false;
  }
};
