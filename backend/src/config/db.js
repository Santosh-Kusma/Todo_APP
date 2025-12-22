import mongoose from "mongoose";

export const connectToDb = async () => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    console.error("DB_URL not found in environment variables");
    process.exit(1);
  }
  
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Stop the server if DB fails
  }
};
