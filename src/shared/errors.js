// Erro de negócio com status HTTP. Os services lançam, o errorHandler responde.
class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Permite usar async/await nos controllers sem try/catch em todo lugar (Express 4).
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
}

module.exports = { AppError, asyncHandler, errorHandler };
