
import mongoose, { Schema, model, Document } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Offline",
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || model<IUser>("User", UserSchema);

export default UserModel;
