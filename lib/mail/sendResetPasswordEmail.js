import nodemailer from "nodemailer"

export async function sendResetPasswordEmail({ to, name, otp }) {
  // Setup SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: `"NeoBank" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Reset Your NeoBank Password",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2>Hello${name ? `, ${name}` : ""}!</h2>
        <p>We received a request to reset your NeoBank password.</p>
        <p>Your reset code is:</p>
        <div style="font-size:2rem;font-weight:bold;letter-spacing:8px;margin:16px 0;">${otp}</div>
        <p>This code will expire in <strong>4 minutes</strong>.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <hr/>
        <p style="color:#888;font-size:0.9rem;">NeoBank — Secure. Simple. Fast.</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
