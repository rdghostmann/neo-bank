// app/admin/page.jsx
import { getServerSession } from "next-auth";
import AdminDashboard from "./AdminPage";
import getRecentCustomers from "@/controllers/getRecentCustomers";
import getRecentActivity from "@/controllers/getRecentActivity";
import { authOptions } from "@/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Optional: redirect or show unauthorized
    return <div>Unauthorized</div>;
  }

  const role = session.user.role || "admin";

  const recentCustomers = await getRecentCustomers();
  const recentActivity = await getRecentActivity();

  return (
    <AdminDashboard
      role={role}
      recentActivity={recentActivity}
      recentCustomers={recentCustomers}
    />
  );
}
