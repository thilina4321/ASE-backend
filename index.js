const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const {  email, status, userEmail } = req.body;

  let config = {
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: 'fuelincompany@gmail.com', 
        pass: 'axkuqvmoeejoonni',  
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

  if(status){
    // change the things according to the status
  }


  const mailInfo = await transporter.sendMail({
    from: 'fuelincompany@gmail.com', 
    to: 'dilshanthilina53@gmail.com',
    subject: "subject",
    text: "text",
    html: "text",
  });

  return res.status(200).send({data : mailInfo.messageId});

}
)

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});