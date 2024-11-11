"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_router_1 = require("./src/index.router"); // تأكد من مسار الاستيراد الصحيح
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
new index_router_1.Bootstrap(app);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(PORT, function () {
    console.log("Server is running on ".concat(PORT));
});
