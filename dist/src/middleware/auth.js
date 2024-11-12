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
exports.auth = exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../db/models/user.model"));
class Auth {
    constructor() {
        this.auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (!authorization || !authorization.startsWith("Bearer ")) {
                const error = new Error("In-valid Bearer Key");
                error.cause = 400;
                return next(error);
            }
            const token = authorization.split("Bearer ")[1];
            if (!token) {
                const error = new Error("In-valid Token");
                error.cause = 400;
                return next(error);
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, "Hamo");
                if (typeof decoded === "string" || !(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
                    const error = new Error("invalid token payload ");
                    error.cause = 400;
                    return next(error);
                }
                const user = yield user_model_1.default.findById({ _id: decoded.id });
                if (!user) {
                    const error = new Error("User not found");
                    error.cause = 404;
                    return next(error);
                }
                req.user = user;
                next();
            }
            catch (error) {
                const message = error instanceof jsonwebtoken_1.default.TokenExpiredError
                    ? "JWT token has expired"
                    : "Invalid Token";
                const jwtError = new Error(message);
                jwtError.cause = 400;
                return next(jwtError);
            }
        });
    }
}
exports.Auth = Auth;
exports.auth = new Auth().auth;
