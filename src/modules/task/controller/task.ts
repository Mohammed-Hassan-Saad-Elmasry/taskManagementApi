import { NextFunction, Request, Response } from "express";
import taskModel from "../../../../db/models/task.model";
import { asynchandler } from "../../../utils/errorhandleing";
import { ObjectId } from "mongoose";
export class Task {
  createTask = asynchandler(
    async (
      req: any,
      res: Response,
      next: NextFunction
    ): Promise<Response | any> => {
      const { title, description } = req.body;
      if (!title) {
        const error = new Error("title is required") as any;
        error.cause = 400;
        return next(error);
      }
      const task = await taskModel.create({
        title,
        description,
        createdBy: req.user.id,
      });
      if (!task) {
        const error = new Error("Invalid task creation") as any;
        error.cause = 400;
        return next(error);
      }
      return res
        .status(201)
        .json({ message: "Task created successfully", task });
    }
  );

  completedTask = asynchandler(
    async (req: any, res: Response, next: NextFunction) => {
      const { taskId } = req.params;
      const task = await taskModel.findById({ _id: taskId });
      if (!task) {
        const error = new Error("Invalid taskId") as any;
        error.cause = 400;
        return next(error);
      }
      task.completed = true;
      task.updatedBy = req.user.id;
      task.save();
      return res
        .status(200)
        .json({ message: "Task marked as completed", task });
    }
  );
  Modifytask = asynchandler(
    async (req: any, res: Response, next: NextFunction) => {
      const { taskId } = req.params;
      const { title, description } = req.body;
      const task = await taskModel.findById({ _id: taskId });
      if (!task) {
        const error = new Error("Invalid taskId") as any;
        error.cause = 400;
        return next(error);
      }
      if (!title && !description) {
        const error = new Error(
          "Invalid data: Title or description is required"
        ) as any;
        error.cause = 400;
        return next(error);
      }

      const updateData: any = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      updateData.updatedBy = req.user.id;

      const updatedTask = await taskModel.findOneAndUpdate(
        { _id: taskId },
        updateData,
        { new: true }
      );
      if (!updatedTask) {
        const error = new Error("Failed to update task") as any;
        error.cause = 400;
        return next(error);
      }
      return res.status(200).json({
        message: "Task updated successfully",
        task: updatedTask,
      });
    }
  );
  deletetask = asynchandler(
    async (req: any, res: Response, next: NextFunction) => {
      const { taskId } = req.params;
      const task = await taskModel.findById({
        _id: taskId,
        createdBy: req.user.id,
      });
      if (!task) {
        const error = new Error("Invalid taskId") as any;
        error.cause = 400;
        return next(error);
      }
      const deletedTask = await taskModel.findByIdAndDelete(taskId);
      if (!deletedTask) {
        const error = new Error("Failed to delete task") as any;
        error.cause = 500;
        return next(error);
      }
      return res.status(200).json({
        message: "Task deleted successfully",
        deletedTask,
      });
    }
  );
  gettaskById = async (
    { taskId }: { taskId: ObjectId },
    userId: { req: any }
  ) => {
    try {
      const task = await taskModel.findOne({
        _id: taskId,
        createdBy: userId,
      });

      if (!task) {
        const error = new Error("Invalid taskId") as any;
        error.cause = 400;
        throw error;
      }

      return task;
    } catch (error: any) {
      throw error.message;
    }
  };

  alltasks = asynchandler(
    async (req: any, res: Response, next: NextFunction) => {
      const task = await taskModel.find({
        createdBy: req.user.id,
      });
      if (!task) {
        const error = new Error("Invalid taskId") as any;
        error.cause = 400;
        return next(error);
      }
      return res.status(200).json({ Task: task });
    }
  );
}
