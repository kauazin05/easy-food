// Serviço genérico de e-mail (shared).
// NÃO conhece regra de negócio: recebe destinatário, assunto e texto.
// Hoje apenas registra no console (simulação). Para enviar de verdade,
// troque o corpo de sendEmail por Nodemailer/SES/SendGrid sem alterar quem o usa.
async function sendEmail({ to, subject, text }) {
  if (!to || !subject) {
    throw new Error("E-mail precisa de destinatário e assunto");
  }
  console.log(`[email] para=${to} | assunto="${subject}"\n${text || ""}`);
  return { delivered: true };
}

module.exports = { sendEmail };
