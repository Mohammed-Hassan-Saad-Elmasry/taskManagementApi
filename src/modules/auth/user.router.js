"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// يجب إعطاء مسار للمسار
router.get("/user", function (req, res) {
    res.send("User route is working!"); // رد عند الوصول إلى مسار المستخدم
});
exports.default = router; // تصدير الرواتر بشكل صحيح
