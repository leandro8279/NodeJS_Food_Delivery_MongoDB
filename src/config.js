global.SALT_KEY = process.env.SALT_KEY;
global.EMAIL_TMPL = "Olá, <strong>{0}</strong>, seja bem vindo à Node Store!";
const uri = process.env.MONGODB_URI;

console.log("Variavel: " + uri);
module.exports = {
  connectionString: uri,
  sendgridKey: "SUA CHAVE",
  containerConnectionString: "SUA CONNECTION STRING",
};
