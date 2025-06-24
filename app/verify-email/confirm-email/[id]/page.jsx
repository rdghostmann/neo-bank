import React from "react";
import Link from "next/link";
import Image from "next/image";
import mailSentImg from "../../../../public/mail-sent.gif";

const page = ({ params }) => {
  const { id } = params; // Get email ID from route
  const decodedEmail = decodeURIComponent(id); // Decode the email


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <div className="relative flex justify-center mb-6">
          {/* Envelope icon */}
          <div className="bg-purple-400 rounded-full w-24 h-24 flex items-center justify-center z-10">
            <Image src={mailSentImg} alt="Mail sent" priority />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Check your inbox, please!</h1>
          <p className="text-gray-600 mb-8">
          We've already sent the email verification link to <strong>{decodedEmail}</strong>. Please check it and confirm it's really you to continue.
          </p>

          <Link href="/login" className="bg-cyan-400 hover:bg-cyan-500 text-white font-medium py-2 px-12 rounded-full mb-6 transition-colors">
            Sure!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
