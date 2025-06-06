import { LogoutButton } from '@/components/Logout-button/logout-button';
import React from 'react'

const DashboardPage = () => {
   return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <LogoutButton />
    </div>
  );
}

export default DashboardPage