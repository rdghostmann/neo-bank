"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CircleX, SquareCheckBig } from "lucide-react";
import { verifyEmail } from "@/lib/verifyEmail"; // Import the server action
import { toast } from "sonner";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyToken = searchParams.get("verifyToken");
  const id = searchParams.get("id");

  useEffect(() => {
    if (verifyToken && id) {
      verifyEmailHandler();
    } else {
      setError(true);
      toast({
        variant: "destructive",
        title: "Invalid Verification Link",
        description: "The verification link is invalid or incomplete.",
      });
    }
  }, [verifyToken, id]);

  const verifyEmailHandler = async () => {
    setLoading(true);

    try {
      // Call the server action to verify the email
      const result = await verifyEmail({ verificationToken: verifyToken, userId: id });

      if (result.success) {
        setVerified(true);
        toast({ title: "Email Verified Successfully!" });

        // Redirect to OTP verification page
        setTimeout(() => {
          router.push(`/verify-email/verify-otp/?id=${id}`);
        }, 2000);
      } else {
        setError(true);
        toast({
          variant: "destructive",
          title: "Email Verification Failed",
          description: result.message || "Failed to verify email.",
        });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setError(true);
      toast({
        variant: "destructive",
        title: "Error Verifying Email",
        description: "An error occurred while verifying your email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="font-semibold">Verifying your email. Please wait...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full flex items-center justify-center max-w-md mx-auto">
        {verified ? (
          <div className="text-center">
            <SquareCheckBig color="green" size={48} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Email Verified!</h1>
            <p className="text-gray-600 mb-8">
              Your email has been successfully verified. Redirecting to OTP verification...
            </p>
          </div>
        ) : error ? (
          <div className="text-center">
            <CircleX color="red" size={48} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-8">
              The verification link is invalid or expired. Please try again.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-semibold">Please wait while we verify your email...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;