const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  try {
    const link = `${process.env.CLIENT_URL}/verify/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Verify Your Email for Sigma coin`,
      html: `<h3>Click to verify email:</h3>
             <p><a href="${link}">Account sublimation</a></p>`,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log(` Email sent to ${email}`, info.response);
    return true;
  } catch (error) {
    console.error(" Email send failed:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendVerificationEmail;