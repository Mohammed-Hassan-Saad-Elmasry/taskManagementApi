import { Bootstrap } from "../src/index.router";
import mongoose from "mongoose";
import request from "supertest";
import express from "express";

const app = express();
new Bootstrap(app);

let server: any;

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("User API", () => {
  describe("Signup", () => {
    test("should create a new user", async () => {
      const userdata = {
        name: "adg",
        email: "alaa@gmail.com",
        password: "234567",
      };

      const res = await request(app).post("/auth/signup").send(userdata);
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toBe("User created successfully");
    });

    test("should return an error when trying to create an existing user", async () => {
      const userdata = {
        name: "alaa",
        email: "alaa@gmail.com",
        password: "234567",
      };

      const res = await request(app).post("/auth/signup").send(userdata);
      expect(res.statusCode).toEqual(409);
      expect(res.body.message).toBe("User already exists");
    });

    test("should return an error for missing password", async () => {
      const userdata = {
        name: "alaa",
        email: "alaa@gmail.com",
      };

      const res = await request(app).post("/auth/signup").send(userdata);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("Invalid data");
    });
  });

  describe("Login", () => {
    test("should return an error for missing password", async () => {
      const userdata = {
        email: "alaa@gmail.com",
      };

      const res = await request(app).post("/auth/login").send(userdata);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe("Invalid data");
    });

    test("should return an error for user not found", async () => {
      const userdata = {
        email: "notfound@gmail.com",
        password: "234567",
      };

      const res = await request(app).post("/auth/login").send(userdata);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe("User not found");
    });

    test("should return an error for invalid login data", async () => {
      const userdata = {
        email: "alaa@gmail.com",
        password: "wrongpassword",
      };

      const res = await request(app).post("/auth/login").send(userdata);
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toBe("Invalid login data");
    });

    test("should return success with access token on valid login", async () => {
      const userdata = {
        email: "alaa@gmail.com",
        password: "234567",
      };

      const res = await request(app).post("/auth/login").send(userdata);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe("done");
      expect(res.body.accessToken).toEqual(expect.any(String));
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close(); // التأكد من إغلاق الاتصال
  server.close();
});
