const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

router.post("/register", (req, res) => {
  const { participantEmail, senderEmail } = req.body;

  const mailOptions = {
    from: `"Example Team" ${senderEmail}`,
    to: `${participantEmail}`,
    subject: "Nice Nodemailer test",
    text: "Hey there, it’s our first message sent with Nodemailer 😉 ",
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
  };

  try {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
  } catch (error) {}
});

module.exports = router;
