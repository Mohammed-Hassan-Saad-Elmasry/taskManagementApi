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
exports.Users = void 0;
const errorhandleing_1 = require("../../../utils/errorhandleing");
const user_model_1 = __importDefault(require("../../../../db/models/user.model"));
class Users {
    constructor() {
        this.getUser = (0, errorhandleing_1.asynchandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(req.user.id);
            if (!user) {
                const error = new Error("User not found");
                error.cause = 400;
                return next(new error());
            }
            return res.status(200).json({ message: "Done", user });
        }));
    }
}
exports.Users = Users;
