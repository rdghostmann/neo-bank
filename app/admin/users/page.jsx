import { getAllUsers } from "@/controllers/getAllUsers";
import AllUsersList from "./UsersList";
import { Layout } from "@/components/DashboardLayout/DashboardLayout";

export default async function UsersPage() {
  const users = await getAllUsers(); // Server Action: fetch users from DB
  console.log("Fetched Users:", users);
  if (!users || users.length === 0) {
    return <div className="p-4">No users found.</div>;
  }

  return (
    <Layout isAdmin>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <p className="text-gray-600 mb-6">
          Manage your users here. You can view, edit, and delete user accounts.
        </p>

        <AllUsersList users={users} />
      </div>


    </Layout>
  );
}
