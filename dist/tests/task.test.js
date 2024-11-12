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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_router_1 = require("../src/index.router");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
new index_router_1.Bootstrap(app);
const index_1 = require("../index");
describe("Task API - Authentication", () => {
    test("should return an error for missing bearer token", () => __awaiter(void 0, void 0, void 0, function* () {
        const taskdata = {
            title: "task seven ali",
            description: "this is task seven",
        };
        const res = yield (0, supertest_1.default)(app).post("/task").send(taskdata);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("In-valid Bearer Key");
    }));
    test("should create a new task with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const taskdata = {
            title: "task seven ali",
            description: "this is task seven",
        };
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM3M2U3YjViOGM1MTMyMDRkOWNmOCIsIm5hbWUiOiJhaG1lZCBoYXNzYW4iLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzMwNDcxMTUzLCJleHAiOjE3MzA0NzQ3NTN9.cjyB4PU1WzXEgdXo2XtnzKpETSNJvUMftYResZijjRg";
        const res = yield (0, supertest_1.default)(app)
            .post("/task")
            .set("Authorization", `Bearer ${token}`)
            .send(taskdata);
        expect(res.statusCode).toBe(201);
    }));
    test("should return an error for missing title", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = {
            description: "this is ",
        };
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM3M2U3YjViOGM1MTMyMDRkOWNmOCIsIm5hbWUiOiJhaG1lZCBoYXNzYW4iLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzMwNTI4NjA2LCJleHAiOjE3MzA1MzIyMDZ9.BOhvJx4z35kZat84H9-Zxs7WhRDs2-aniOUooml3Koc";
        const res = yield (0, supertest_1.default)(app)
            .post("/task")
            .set("Authorization", `Bearer ${token}`)
            .send(task);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("title is required");
    }));
    test("should mark task as completed", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            id: "672373e7b5b8c513204d9cf8",
            name: "ahmed hassan",
            email: "ahmed@gmail.com",
            role: "User",
        }, "Hamo", { expiresIn: 60 * 60 });
        const res = yield (0, supertest_1.default)(app)
            .patch("/task/compled/6724928142fc0ddd6ec78102")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task marked as completed");
    }));
    test("should modify an existing task with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            id: "672373e7b5b8c513204d9cf8",
            name: "ahmed hassan",
            email: "ahmed@gmail.com",
            role: "User",
        }, "Hamo", { expiresIn: 60 * 60 });
        const modifiedData = {
            title: "Updated Task Title",
            description: "Updated task description",
        };
        const res = yield (0, supertest_1.default)(app)
            .put("/task/updatetask/6724928142fc0ddd6ec78102")
            .set("Authorization", `Bearer ${token}`)
            .send(modifiedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task updated successfully");
        expect(res.body.task.title).toBe(modifiedData.title);
        expect(res.body.task.description).toBe(modifiedData.description);
    }));
    test("should get all tasks created by the user with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            id: "672373e7b5b8c513204d9cf8",
            name: "ahmed hassan",
            email: "ahmed@gmail.com",
            role: "User",
        }, "Hamo", { expiresIn: 60 * 60 });
        const res = yield (0, supertest_1.default)(app)
            .get("/task")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.Task).toBeInstanceOf(Array);
        res.body.Task.forEach((task) => {
            expect(task).toHaveProperty("title");
            expect(task).toHaveProperty("_id");
        });
    }));
    test("should get task details by taskId with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            id: "672373e7b5b8c513204d9cf8",
            name: "ahmed hassan",
            email: "ahmed@gmail.com",
            role: "User",
        }, "Hamo", { expiresIn: 60 * 60 });
        const res = yield (0, supertest_1.default)(app)
            .get("/task/6724928142fc0ddd6ec78102")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.Task).toBeDefined();
    }));
    test("should delete an existing task with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({
            id: "672373e7b5b8c513204d9cf8",
            name: "ahmed hassan",
            email: "ahmed@gmail.com",
            role: "User",
        }, "Hamo", { expiresIn: 60 * 60 });
        const res = yield (0, supertest_1.default)(app)
            .delete("/task/6724928142fc0ddd6ec78102")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task deleted successfully");
    }));
});
test("should verify task properties", () => {
    const task = {
        title: "taskone",
        description: "this is ",
    };
    expect(task).not.toEqual(Array);
    expect(task).toHaveProperty("title");
    expect(task).toEqual(expect.objectContaining({ title: expect.any(String) }));
});
afterAll((done) => {
    mongoose_1.default.connection.close();
    index_1.server.close(done);
});
