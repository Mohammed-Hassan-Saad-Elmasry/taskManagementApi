import Jwt from "jsonwebtoken";
import { Bootstrap } from "../src/index.router";
import mongoose from "mongoose";
import request from "supertest";
import express from "express";

const app = express();
new Bootstrap(app);
import { server } from "../index";

describe("Task API - Authentication", () => {
  test("should return an error for missing bearer token", async () => {
    const taskdata = {
      title: "task seven ali",
      description: "this is task seven",
    };
    const res = await request(app).post("/task").send(taskdata);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("In-valid Bearer Key");
  });

  test("should create a new task with valid token", async () => {
    const taskdata = {
      title: "task seven ali",
      description: "this is task seven",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM3M2U3YjViOGM1MTMyMDRkOWNmOCIsIm5hbWUiOiJhaG1lZCBoYXNzYW4iLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzMwNDcxMTUzLCJleHAiOjE3MzA0NzQ3NTN9.cjyB4PU1WzXEgdXo2XtnzKpETSNJvUMftYResZijjRg";
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send(taskdata);
    expect(res.statusCode).toBe(201);
  });

  test("should return an error for missing title", async () => {
    const task = {
      description: "this is ",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM3M2U3YjViOGM1MTMyMDRkOWNmOCIsIm5hbWUiOiJhaG1lZCBoYXNzYW4iLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzMwNTI4NjA2LCJleHAiOjE3MzA1MzIyMDZ9.BOhvJx4z35kZat84H9-Zxs7WhRDs2-aniOUooml3Koc";
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send(task);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("title is required");
  });

  test("should mark task as completed", async () => {
    const token = Jwt.sign(
      {
        id: "672373e7b5b8c513204d9cf8",
        name: "ahmed hassan",
        email: "ahmed@gmail.com",
        role: "User",
      },
      "Hamo",
      { expiresIn: 60 * 60 }
    );
    const res = await request(app)
      .patch("/task/compled/6724928142fc0ddd6ec78102")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task marked as completed");
  });

  test("should modify an existing task with valid token", async () => {
    const token = Jwt.sign(
      {
        id: "672373e7b5b8c513204d9cf8",
        name: "ahmed hassan",
        email: "ahmed@gmail.com",
        role: "User",
      },
      "Hamo",
      { expiresIn: 60 * 60 }
    );

    const modifiedData = {
      title: "Updated Task Title",
      description: "Updated task description",
    };

    const res = await request(app)
      .put("/task/updatetask/6724928142fc0ddd6ec78102")
      .set("Authorization", `Bearer ${token}`)
      .send(modifiedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task updated successfully");
    expect(res.body.task.title).toBe(modifiedData.title);
    expect(res.body.task.description).toBe(modifiedData.description);
  });

  test("should get all tasks created by the user with valid token", async () => {
    const token = Jwt.sign(
      {
        id: "672373e7b5b8c513204d9cf8",
        name: "ahmed hassan",
        email: "ahmed@gmail.com",
        role: "User",
      },
      "Hamo",
      { expiresIn: 60 * 60 }
    );

    const res = await request(app)
      .get("/task")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.Task).toBeInstanceOf(Array);
    res.body.Task.forEach((task: any) => {
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("_id");
    });
  });

  test("should get task details by taskId with valid token", async () => {
    const token = Jwt.sign(
      {
        id: "672373e7b5b8c513204d9cf8",
        name: "ahmed hassan",
        email: "ahmed@gmail.com",
        role: "User",
      },
      "Hamo",
      { expiresIn: 60 * 60 }
    );

    const res = await request(app)
      .get("/task/6724928142fc0ddd6ec78102")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.Task).toBeDefined();
  });

  test("should delete an existing task with valid token", async () => {
    const token = Jwt.sign(
      {
        id: "672373e7b5b8c513204d9cf8",
        name: "ahmed hassan",
        email: "ahmed@gmail.com",
        role: "User",
      },
      "Hamo",
      { expiresIn: 60 * 60 }
    );

    const res = await request(app)
      .delete("/task/6724928142fc0ddd6ec78102")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
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
  mongoose.connection.close();
  server.close(done);
});
