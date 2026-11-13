const { Router } = require("express");
const controller = require("./restaurant.controller");
const authMiddleware = require("../auth/auth.middleware");
const { asyncHandler } = require("../../shared/errors");

const router = Router();

router.get("/", asyncHandler(controller.list));                      // público
router.post("/", authMiddleware, asyncHandler(controller.create));   // exige login

module.exports = router;
