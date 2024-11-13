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
exports.ConnectDB = void 0;
const console_1 = require("console");
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectDB {
    constructor() {
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect("mongodb+srv://elmasry:ol320BYG7TwqWT3g@cluster0.knzr2ur.mongodb.net/taskmanagement?retryWrites=true&w=majority&appName=Cluster0");
                (0, console_1.log)("Database connected successfully");
            }
            catch (err) {
                (0, console_1.log)("Database connection error:", err);
            }
        });
    }
}
exports.ConnectDB = ConnectDB;
