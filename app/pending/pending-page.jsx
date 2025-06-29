import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // adjust if your auth config is elsewhere

export default async function PendingPage() {
  const session = await getServerSession(authOptions);
  const username = session?.user?.username || "User";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-bold text-gray-900">Account Pending Approval</h1>
      <p className="text-muted-foreground mt-2">
        Hello 👋, <span className="font-semibold">{username}</span>. Your account is not yet active. <br />
        Please wait while we reviews and activates your account.
      </p>
    </div>
  );
}
