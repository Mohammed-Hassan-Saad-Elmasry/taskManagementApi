import { log } from "console";
import mongoose from "mongoose";
export class ConnectDB {
  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect("mongodb://localhost:27017/taskmanagement");
      log("Database connected successfully");
    } catch (err) {
      log("Database connection error:", err);
    }
  }
}
