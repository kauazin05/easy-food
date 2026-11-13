const authService = require("./auth.service");
const { AppError } = require("../../shared/errors");

// Protege rotas: exige "Authorization: Bearer <token>" e preenche req.user.
function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new AppError(401, "Token não informado"));
  }

  try {
    req.user = authService.verifyToken(token);
    next();
  } catch (err) {
    next(new AppError(401, "Token inválido ou expirado"));
  }
}

module.exports = authMiddleware;
