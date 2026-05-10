import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  try {

    await transporter.verify();
    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<h2>Your verification code is ${otp}</h2>`,
    });

    console.log("EMAIL SENT:", info.response);

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};