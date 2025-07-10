"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AllUsersList = ({ users: initialUsers }) => {
  const [users] = useState(initialUsers);

  return (
    <Card className="shadow-lg border-green-900 bg-black/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          User Accounts ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between border-b border-gray-800 py-2">
            <div>
              <div className="font-semibold text-white">{user.name || user.username || user.email}</div>
              <div className="text-xs text-gray-400">{user.email}</div>
            </div>
            <div>
              <span className="text-xs font-mono text-blue-400">
                MIF Code: {user.mifCode ? user.mifCode : <span className="text-gray-600">N/A</span>}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AllUsersList;