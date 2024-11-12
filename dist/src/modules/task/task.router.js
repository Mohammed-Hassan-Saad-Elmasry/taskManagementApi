"use strict";
// import { Router } from "express";
// import { Task } from "./controller/task";
// import { auth } from "../../middleware/auth";
// const taskController = new Task();
// const router = Router();
// router.post("/", auth, taskController.createTask);
// router.patch("/compled/:taskId", auth, taskController.completedTask);
// router.put("/updatetask/:taskId", auth, taskController.Modifytask);
// router.delete("/:taskId", auth, taskController.deletetask);
// router.get("/:taskId", auth, taskController.gettaskById);
// router.get("/", auth, taskController.alltasks);
// export default router;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("./controller/task");
const auth_1 = require("../../middleware/auth");
const taskController = new task_1.Task();
const router = (0, express_1.Router)();
/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad Request
 */
router.post("/", auth_1.auth, taskController.createTask);
/**
 * @swagger
 * /task/compled/{taskId}:
 *   patch:
 *     summary: Mark a task as completed
 *     description: Updates the status of a task to completed.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to mark as completed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as completed
 *       404:
 *         description: Task not found
 */
router.patch("/compled/:taskId", auth_1.auth, taskController.completedTask);
/**
 * @swagger
 * /task/updatetask/{taskId}:
 *   put:
 *     summary: Update a task
 *     description: Modifies an existing task.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put("/updatetask/:taskId", auth_1.auth, taskController.Modifytask);
/**
 * @swagger
 * /task/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Removes a task from the system.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:taskId", auth_1.auth, taskController.deletetask);
/**
 * @swagger
 * /task/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieves a task by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 */
// router.get("/:taskId", auth, taskController.gettaskById);
/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves a list of all tasks.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get("/", auth_1.auth, taskController.alltasks);
exports.default = router;
