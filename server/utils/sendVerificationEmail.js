const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const verificationLink = `${process.env.SERVER_URL}/verify/${verificationToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<h3>Click the link below to verify your email:</h3>
               <a href="${verificationLink}">${verificationLink}</a>`,
    });

    console.log(`Verification email sent to ${email}`);

  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

module.exports = sendVerificationEmail;
