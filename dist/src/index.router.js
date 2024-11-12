"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const express_1 = require("graphql-http/lib/use/express");
const schema_1 = require("../src/modules/task/schema");
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const user_router_1 = __importDefault(require("./modules/user/user.router"));
const task_router_1 = __importDefault(require("./modules/task/task.router"));
const errorhandleing_1 = require("./utils/errorhandleing");
const auth_1 = require("./middleware/auth");
class Bootstrap {
    constructor(app) {
        this.app = app;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.app.use("/auth", auth_router_1.default);
        this.app.use("/user", user_router_1.default);
        this.app.use("/task", task_router_1.default);
        this.app.use("/graphql", auth_1.auth, (req, res, next) => {
            const handler = (0, express_1.createHandler)({
                schema: schema_1.schema,
                context: { req },
            });
            return handler(req, res, next);
        });
        this.app.use(errorhandleing_1.errorhandling);
    }
}
exports.Bootstrap = Bootstrap;
