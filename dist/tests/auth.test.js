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
const index_router_1 = require("../src/index.router");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
new index_router_1.Bootstrap(app);
describe("User API", () => {
    describe("Signup", () => {
        test("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                name: "adg",
                email: "alaa@gmail.com",
                password: "234567",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/signup").send(userdata);
            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toBe("User created successfully");
        }));
        test("should return an error when trying to create an existing user", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                name: "alaa",
                email: "alaa@gmail.com",
                password: "234567",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/signup").send(userdata);
            expect(res.statusCode).toEqual(409);
            expect(res.body.message).toBe("User already exists");
        }));
        test("should return an error for missing password", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                name: "alaa",
                email: "alaa@gmail.com",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/signup").send(userdata);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe("Invalid data");
        }));
    });
    describe("Login", () => {
        test("should return an error for missing password", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                email: "alaa@gmail.com",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/login").send(userdata);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe("Invalid data");
        }));
        test("should return an error for user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                email: "notfound@gmail.com",
                password: "234567",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/login").send(userdata);
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toBe("User not found");
        }));
        test("should return an error for invalid login data", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                email: "alaa@gmail.com",
                password: "wrongpassword",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/login").send(userdata);
            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe("Invalid login data");
        }));
        test("should return success with access token on valid login", () => __awaiter(void 0, void 0, void 0, function* () {
            const userdata = {
                email: "alaa@gmail.com",
                password: "234567",
            };
            const res = yield (0, supertest_1.default)(app).post("/auth/login").send(userdata);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe("done");
            expect(res.body.accessToken).toEqual(expect.any(String));
        }));
    });
});
