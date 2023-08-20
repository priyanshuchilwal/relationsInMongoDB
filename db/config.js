import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/Animes");
    console.log("Database Connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error: " + error);
  }
}

export default connectDB;
