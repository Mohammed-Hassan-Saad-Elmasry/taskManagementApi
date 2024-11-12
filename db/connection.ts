import { log } from "console";
import mongoose from "mongoose";
export class ConnectDB {
  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(
        "mongodb+srv://elmasry:ol320BYG7TwqWT3g@cluster0.knzr2ur.mongodb.net/taskmanagement?retryWrites=true&w=majority&appName=Cluster0"
      );
      log("Database connected successfully");
    } catch (err) {
      log("Database connection error:", err);
    }
  }
}
