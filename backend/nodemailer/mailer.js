const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sakaue",
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  }
  console.log("Conectado ao banco de dados MySQL com sucesso.");
});

// Criar a tabela, se não existir
const createTableQuery = `
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  password VARCHAR(255) NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
db.query(createTableQuery, (err) => {
  if (err) {
    console.error("Erro ao criar tabela:", err);
    process.exit(1);
  }
  console.log("Tabela 'usuarios' pronta.");
});

// Função para enviar email
function sendEmail({ email, subject }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "y.official.communication@gmail.com",
        pass: "hfsp gyyi mmli iied",
      },
    });

    const mail_configs = {
      from: "y.official.communication@gmail.com",
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
          <h1 style="color: red; font-size: 36px; text-align: center;">Bem-vindo!</h1>
          <p style="font-size: 18px; color: #333;">Olá,</p>
          <p style="font-size: 16px; color: #333;">Seu cadastro foi realizado com sucesso.</p>
          <p style="font-size: 18px; color: #333;">Atenciosamente,</p>
          <p style="font-size: 18px; color: #333;"><strong>Equipe Y.com</strong></p>
        </div>
      `,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `Erro ao enviar email.` });
      }
      return resolve({ message: "Email enviado com sucesso." });
    });
  });
}

// Rota POST para registrar um usuário e enviar email
app.post("/usuario", (req, res) => {
  const { name, email, phone, address, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Os campos name, email e password são obrigatórios." });
  }

  // Inserir dados no banco de dados
  const insertQuery = "INSERT INTO usuarios (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)";
  db.query(insertQuery, [name, email, phone, address, password], (err, results) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
      return res.status(500).json({ message: "Erro ao registrar no banco de dados." });
    }

    // Enviar email após registrar
    sendEmail({ email, subject: "Cadastro realizado com sucesso!" })
      .then(() => res.json({ message: "Usuário registrado e email enviado com sucesso." }))
      .catch((error) => res.status(500).json({ message: "Erro ao enviar email.", error }));
  });
});

// Rota GET para retornar todos os usuários
app.get("/usuario", (req, res) => {
  const selectQuery = "SELECT id, name, email, phone, address, timestamp FROM usuarios ORDER BY timestamp DESC";
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ message: "Erro ao buscar usuários." });
    }
    res.json(results);
  });
});

app.put("/usuario/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, password } = req.body;

  const updateQuery = `
    UPDATE usuarios SET name = ?, email = ?, phone = ?, address = ?, password = ?
    WHERE id = ?
  `;
  db.query(updateQuery, [name, email, phone, address, password, id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
    res.json({ message: "Usuário atualizado com sucesso." });
  });
});

app.delete("/usuario/:id", (req, res) => {
  const { id } = req.params;

  const deleteQuery = "DELETE FROM usuarios WHERE id = ?";
  db.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir usuário:", err);
      return res.status(500).json({ message: "Erro ao excluir usuário." });
    }
    res.json({ message: "Usuário excluído com sucesso." });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Os campos email e password são obrigatórios." });
  }

  const loginQuery = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  db.query(loginQuery, [email, password], (err, results) => {
    if (err) {
      console.error("Erro ao fazer login:", err);
      return res.status(500).json({ message: "Erro ao fazer login." });
    }

    if (results.length > 0) {
      res.json({ message: "Login bem-sucedido.", user: results[0] });
    } else {
      res.status(401).json({ message: "Credenciais inválidas." });
    }
  });
});

const createTermsTableQuery = `
CREATE TABLE IF NOT EXISTS termos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
db.query(createTermsTableQuery, (err) => {
  if (err) {
    console.error("Erro ao criar tabela de termos:", err);
  }
});

app.post("/termo", (req, res) => {
  const { descricao } = req.body;

  const insertQuery = "INSERT INTO termos (descricao) VALUES (?)";
  db.query(insertQuery, [descricao], (err, results) => {
    if (err) {
      console.error("Erro ao criar termo:", err);
      return res.status(500).json({ message: "Erro ao criar termo." });
    }
    res.json({ message: "Termo criado com sucesso." });
  });
});

app.get("/termo", (req, res) => {
  const selectQuery = "SELECT * FROM termos ORDER BY timestamp DESC";
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Erro ao buscar termos:", err);
      return res.status(500).json({ message: "Erro ao buscar termos." });
    }
    res.json(results);
  });
});

const createAcceptanceTableQuery = `
CREATE TABLE IF NOT EXISTS aceitacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  termo_id INT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (termo_id) REFERENCES termos(id)
);
`;
db.query(createAcceptanceTableQuery, (err) => {
  if (err) {
    console.error("Erro ao criar tabela de aceitações:", err);
  }
});

app.post("/aceitacao", (req, res) => {
  const { usuario_id, termo_id } = req.body;

  const insertQuery = "INSERT INTO aceitacoes (usuario_id, termo_id) VALUES (?, ?)";
  db.query(insertQuery, [usuario_id, termo_id], (err, results) => {
    if (err) {
      console.error("Erro ao registrar aceitação:", err);
      return res.status(500).json({ message: "Erro ao registrar aceitação." });
    }
    res.json({ message: "Aceitação registrada com sucesso." });
  });
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
