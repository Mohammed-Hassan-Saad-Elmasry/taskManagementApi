"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const task_model_1 = __importDefault(require("../../../../db/models/task.model"));
const errorhandleing_1 = require("../../../utils/errorhandleing");
class Task {
    constructor() {
        this.createTask = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            if (!title) {
                const error = new Error("title is required");
                error.cause = 400;
                return next(error);
            }
            const task = yield task_model_1.default.create({
                title,
                description,
                createdBy: req.user.id,
            });
            if (!task) {
                const error = new Error("Invalid task creation");
                error.cause = 400;
                return next(error);
            }
            return res
                .status(201)
                .json({ message: "Task created successfully", task });
        }));
        this.completedTask = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            const task = yield task_model_1.default.findById({ _id: taskId });
            if (!task) {
                const error = new Error("Invalid taskId");
                error.cause = 400;
                return next(error);
            }
            task.completed = true;
            task.updatedBy = req.user.id;
            task.save();
            return res
                .status(200)
                .json({ message: "Task marked as completed", task });
        }));
        this.Modifytask = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            const { title, description } = req.body;
            const task = yield task_model_1.default.findById({ _id: taskId });
            if (!task) {
                const error = new Error("Invalid taskId");
                error.cause = 400;
                return next(error);
            }
            if (!title && !description) {
                const error = new Error("Invalid data: Title or description is required");
                error.cause = 400;
                return next(error);
            }
            const updateData = {};
            if (title)
                updateData.title = title;
            if (description)
                updateData.description = description;
            updateData.updatedBy = req.user.id;
            const updatedTask = yield task_model_1.default.findOneAndUpdate({ _id: taskId }, updateData, { new: true });
            if (!updatedTask) {
                const error = new Error("Failed to update task");
                error.cause = 400;
                return next(error);
            }
            return res.status(200).json({
                message: "Task updated successfully",
                task: updatedTask,
            });
        }));
        this.deletetask = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            const task = yield task_model_1.default.findById({
                _id: taskId,
                createdBy: req.user.id,
            });
            if (!task) {
                const error = new Error("Invalid taskId");
                error.cause = 400;
                return next(error);
            }
            const deletedTask = yield task_model_1.default.findByIdAndDelete(taskId);
            if (!deletedTask) {
                const error = new Error("Failed to delete task");
                error.cause = 500;
                return next(error);
            }
            return res.status(200).json({
                message: "Task deleted successfully",
                deletedTask,
            });
        }));
        this.gettaskById = (_a, userId_1) => __awaiter(this, [_a, userId_1], void 0, function* ({ taskId }, userId) {
            try {
                const task = yield task_model_1.default.findOne({
                    _id: taskId,
                    createdBy: userId,
                });
                if (!task) {
                    const error = new Error("Invalid taskId");
                    error.cause = 400;
                    throw error;
                }
                return task;
            }
            catch (error) {
                throw error.message;
            }
        });
        this.alltasks = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const task = yield task_model_1.default.find({
                createdBy: req.user.id,
            });
            if (!task) {
                const error = new Error("Invalid taskId");
                error.cause = 400;
                return next(error);
            }
            return res.status(200).json({ Task: task });
        }));
    }
}
exports.Task = Task;
