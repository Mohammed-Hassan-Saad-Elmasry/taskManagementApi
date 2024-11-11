// import { Router } from "express";
// import { Auth } from "./controller/auth";
// const router = Router();
// const authcontroller = new Auth();
// router.post("/", authcontroller.singup);
// router.post("/login", authcontroller.Login);
// export default router;


import { Router } from "express";
import { Auth } from "./controller/auth";

const router = Router();
const authcontroller = new Auth();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Creates a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad Request
 *       409:
 *         description: User already exists
 */
router.post("/signup", authcontroller.singup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post("/login", authcontroller.Login);

export default router;
