// app/admin/customers/page.jsx
import CustomersPage from "./customer-page";

import { getAllcustomer } from "@/controllers/getAllcustomer";
export default async function Page() {
    // ✅ Call the server function to fetch all customers
  const users = await getAllcustomer(getAllcustomer); // ✅ call the server function

  // console.log("Customers:", users);
  return <CustomersPage customers={users} />; // ✅ pass as props
}
