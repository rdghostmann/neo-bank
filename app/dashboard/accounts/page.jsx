import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getAccountByUserId } from "@/controllers/getAccount";
import AccountsPage from "./AccountsPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div>Please sign in to view your accounts.</div>;
  }

  // Fetch all accounts for the user using the server action
  const accounts = await getAccountByUserId(user.id);

  return <AccountsPage accounts={accounts} />;
}