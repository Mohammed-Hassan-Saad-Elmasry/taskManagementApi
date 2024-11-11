"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
var user_router_1 = require("./modules/user/user.router");
var Bootstrap = /** @class */ (function () {
    function Bootstrap(_app) {
        this._app = _app;
        this.initializeRoutes();
    }
    Bootstrap.prototype.initializeRoutes = function () {
        this._app.use("/users", user_router_1.default);
    };
    return Bootstrap;
}());
exports.Bootstrap = Bootstrap;
