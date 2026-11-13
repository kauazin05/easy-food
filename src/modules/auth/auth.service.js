const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../shared/prisma");
const emailService = require("../../shared/email.service");
const { AppError } = require("../../shared/errors");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-nao-use-em-producao";

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

async function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new AppError(400, "name, email e password são obrigatórios");
  }
  if (password.length < 6) {
    throw new AppError(400, "A senha precisa ter pelo menos 6 caracteres");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (exists) throw new AppError(409, "E-mail já cadastrado");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name: name.trim(), email: normalizedEmail, passwordHash }
  });

  // Ação secundária: se o e-mail falhar, o cadastro (objetivo principal) continua válido.
  try {
    await emailService.sendEmail({
      to: user.email,
      subject: "Bem-vindo à EasyFood!",
      text: `Olá, ${user.name}! Sua conta foi criada.`
    });
  } catch (err) {
    console.warn("Falha ao enviar e-mail de boas-vindas:", err.message);
  }

  return { user: publicUser(user), token: signToken(user) };
}

async function login({ email, password }) {
  if (!email || !password) throw new AppError(400, "email e password são obrigatórios");

  const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) throw new AppError(401, "E-mail ou senha inválidos");

  return { user: publicUser(user), token: signToken(user) };
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { register, login, verifyToken };
