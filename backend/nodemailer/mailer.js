const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({ email, subject}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
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
          <h1 style="color: red; font-size: 36px; text-align: center;">ALERTA!</h1>
          <p style="font-size: 18px; color: #333;">Atenção,</p>
          <p style="font-size: 16px; color: #333;">Sua conta com o Email: <strong>${email}</strong> teve seus dados vazados.</p>
          <p style="font-size: 16px; color: #333;">Recomenda-se que verifique suas contas e altere suas senhas imediatamente para garantir a segurança.</p>
          <p style="font-size: 18px; color: #333;">Atenciosamente,</p>
          <p style="font-size: 18px; color: #333;"><strong>Sua Equipe de Segurança Y.com </strong></p>
        </div>
        `,
      };
      
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}

app.get("/", (req, res) => {
  sendEmail({
    email: 'juliopm142@gmail.com',
    subject: 'Vazamento de dados!',
  })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
