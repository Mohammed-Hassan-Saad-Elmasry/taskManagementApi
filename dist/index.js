"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const connection_1 = require("./db/connection");
const express_1 = __importDefault(require("express"));
const index_router_1 = require("./src/index.router");
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
new index_router_1.Bootstrap(app);
new connection_1.ConnectDB();
(0, swagger_1.setupSwagger)(app);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
