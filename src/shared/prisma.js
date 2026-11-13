// Instância única do Prisma Client, compartilhada por todos os módulos.
const { PrismaClient } = require("@prisma/client");

module.exports = new PrismaClient();
