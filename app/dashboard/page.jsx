import { getServerSession } from "next-auth";
import DashboardPage from "./DashboardPage";
import { authOptions } from "@/auth";
import { getTransactionsByUserId } from "@/controllers/getTransaction";
import { getNotificationsByUserId } from "@/controllers/getNotification";
import { getCardsByUserId } from "@/controllers/getCard";
import { getBalance } from "@/controllers/getBalance"; // ✅ Import balance function

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  // Fetch everything in parallel
  const [transactionsResult, notificationsResult, cardsResult, balanceResult] = await Promise.allSettled([
    getTransactionsByUserId(user.id),
    getNotificationsByUserId(user.id),
    getCardsByUserId(user.id),
    getBalance(user.id), // ✅ Fetch balance
  ]);

  const transactions =
    transactionsResult.status === "fulfilled" ? transactionsResult.value : [];
  const notifications =
    notificationsResult.status === "fulfilled" ? notificationsResult.value : [];
  const cards =
    cardsResult.status === "fulfilled" ? cardsResult.value : [];
  const balance =
    balanceResult.status === "fulfilled" ? balanceResult.value : 0.00; // ✅ Safe fallback

  return (
    <DashboardPage
      user={user}
      transactions={transactions}
      notifications={notifications}
      cards={cards}
      balance={balance} // ✅ Pass balance to DashboardPage
    />
  );
}
