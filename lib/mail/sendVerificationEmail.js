import transporter from "./transporter";

export async function sendVerificationEmail({ to, name, verificationUrl }) {
  const mailOptions = {
    from: `"NeoBank" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: "Verify your NeoBank account",
    html: `
      <h2>Hello ${name || ""},</h2>
      <p>Thank you for registering at NeoBank.</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}" target="_blank">Verify Email</a>
      <p>If you did not create this account, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}