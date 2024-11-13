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
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../../../db/models/user.model"));
const errorhandleing_1 = require("../../../utils/errorhandleing");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Auth {
    constructor() {
        this.singup = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                const error = new Error("Invalid data");
                error.cause = 400;
                return next(error);
            }
            const existUser = yield user_model_1.default.findOne({ email });
            if (existUser) {
                const error = new Error("User already exists");
                error.cause = 409;
                return next(error);
            }
            const hashpassword = bcrypt_1.default.hashSync(password, 6);
            const user = yield user_model_1.default.create({
                name,
                email,
                password: hashpassword,
            });
            return res
                .status(201)
                .json({ message: "User created successfully", user });
        }));
        this.Login = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                const error = new Error("Invalid data");
                error.cause = 400;
                return next(error);
            }
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                const error = new Error("User not found");
                error.cause = 404;
                return next(error);
            }
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match) {
                const error = new Error("Invalid login data");
                error.cause = 401;
                return next(error);
            }
            user.status = "Online";
            user.save();
            const accessToken = jsonwebtoken_1.default.sign({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, "Hamo", { expiresIn: 60 * 60 });
            const refreshToken = jsonwebtoken_1.default.sign({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, "ALI", { expiresIn: 60 * 60 });
            res.status(200).json({ message: "done", accessToken, refreshToken });
        }));
    }
}
exports.Auth = Auth;
