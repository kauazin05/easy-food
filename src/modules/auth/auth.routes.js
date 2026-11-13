const { Router } = require("express");
const controller = require("./auth.controller");
const { asyncHandler } = require("../../shared/errors");

const router = Router();

router.post("/register", asyncHandler(controller.register));
router.post("/login", asyncHandler(controller.login));

module.exports = router;
