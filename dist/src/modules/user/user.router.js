"use strict";
// import { Router } from "express";
// import { auth } from "../../middleware/auth";
// import {Users} from "./controller/user";
// const usercontroller = new Users()
// const router = Router();
// router.get("/", auth, usercontroller.getUser);
// export default router;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const user_1 = require("./controller/user");
const usercontroller = new user_1.Users();
const router = (0, express_1.Router)();
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user details
 *     description: Retrieves the details of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid token
 */
router.get("/", auth_1.auth, usercontroller.getUser);
exports.default = router;
