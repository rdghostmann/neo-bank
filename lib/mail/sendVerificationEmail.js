import nodemailer from "nodemailer";

export async function sendVerificationEmail({ to, name, verificationUrl, otp }) {
  // Configure your SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: `"NeoBank" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Verify your NeoBank account",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering with NeoBank.</p>
        <p>Your verification code is:</p>
        <div style="font-size:2rem;font-weight:bold;letter-spacing:8px;margin:16px 0;">${otp}</div>
        <p>Or click the link below to verify your email:</p>
        <a href="${verificationUrl}" style="color:#10b981;">Verify Email</a>
        <p style="color:#888;font-size:0.9rem;">This code will expire in 4 minutes.</p>
      </div>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}