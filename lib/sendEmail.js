import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendMagicLink = async (userEmail, subject, message) => {

  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    // Verify the SMTP connection configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.log(error)
      return;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: userEmail,
      subject,
      html: message,
    };

    try {
      const sendMessage = await transporter.sendMail(mailOptions);
      console.log(sendMessage)

    } catch (error) {
      console.log(error)

    }

  } catch (error) {
    return NextResponse.json(
      {  message: "Something went wrong" + error, },  {  status: 500, }
    );
  }
};