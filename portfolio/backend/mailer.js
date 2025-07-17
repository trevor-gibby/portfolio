const nodemailer = require('nodemailer');

async function sendEmail(subject, html) {
  try {
    console.log('mailer called');
    const to = process.env.MY_EMAIL
    const from = process.env.SMTP_EMAIL
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: from,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: from,
      to,
      subject,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = { sendEmail };
