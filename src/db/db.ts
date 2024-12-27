import mongoose from "mongoose";

const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
};

export default ConnectDB;
