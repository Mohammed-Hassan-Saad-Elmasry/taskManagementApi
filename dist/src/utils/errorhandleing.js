"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorhandling = exports.asynchandler = void 0;
class Handler {
    asynchandler(fun) {
        return (req, res, next) => {
            fun(req, res, next).catch((err) => {
                next(err);
            });
        };
    }
    errorhandling(error, req, res, next) {
        const response = {
            message: error.message || "Something went wrong",
        };
        res.status(error.cause || 400).json(response);
    }
}
exports.asynchandler = new Handler().asynchandler;
exports.errorhandling = new Handler().errorhandling;
