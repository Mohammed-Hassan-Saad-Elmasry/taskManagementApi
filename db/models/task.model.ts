import mongoose, { Schema, Types, model } from "mongoose";
interface Task {
  title: string;
  completed: boolean;
  description?: string;
  createdBy: mongoose.ObjectId;
  updatedBy?: mongoose.ObjectId;
}

const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.models.task || model("task", taskSchema);
export default taskModel;
