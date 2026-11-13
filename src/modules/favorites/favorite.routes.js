const { Router } = require("express");
const controller = require("./favorite.controller");
const authMiddleware = require("../auth/auth.middleware");
const { asyncHandler } = require("../../shared/errors");

const router = Router();

// Todas as rotas de favoritos exigem autenticação.
router.use(authMiddleware);

router.get("/", asyncHandler(controller.list));
router.post("/:restaurantId", asyncHandler(controller.add));
router.delete("/:restaurantId", asyncHandler(controller.remove));

module.exports = router;
