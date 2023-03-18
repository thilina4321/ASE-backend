const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { email, status, date, station } = req.body;

  let config = {
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
      user: "fuelincompany@gmail.com",
      pass: "axkuqvmoeejoonni",
    },
  };

  let transporter = nodemailer.createTransport(config);

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error.message, "verify error");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let html = "";
  if (status) {
    // change the things according to the status
    html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Email Title</title>
      </head>
      <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; margin: 0; padding: 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center" bgcolor="#f4f4f4" style="padding: 20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #fff; border-radius: 5px;">
                <tr>
                  <td align="center" style="padding: 20px;">
                    <h1 style="color: #333333; font-size: 28px;">Fuel Request</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <p> Hello your fuel request on ${date} has ${status}. </p>
                    <p> Have a look from the app.  </p>
                    <div></div>
                    <p> Have a nice day </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px;">
                    <a href="#" style="background-color: #4CAF50; border-radius: 4px; color: #ffffff; display: inline-block; font-size: 16px; line-height: 40px; text-align: center; text-decoration: none; width: 200px;">${station}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
  }

  console.log(email);

  const mailInfo = await transporter.sendMail({
    from: "fuelincompany@gmail.com",
    to: "dilshanthilina53@gmail.com",
    subject: "Fuel Request",
    text: "",
    html,
  });

  return res.status(200).send({ data: mailInfo.messageId });
});

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
