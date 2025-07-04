"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react"; // Spinner icon

const AllUsersList = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const handleToggle = async (userId) => {
    setLoadingUserId(userId); // show loader for this user

    try {
      const res = await fetch("/api/admin/toggle-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isActive: data.status === "active" } : user
          )
        );
      } else {
        console.error("Toggle failed:", data.message);
      }
    } catch (err) {
      console.error("Error toggling user:", err);
    } finally {
      setLoadingUserId(null); // hide loader
    }
  };

  return (
    <Card className="shadow-lg border-green-100 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          User Accounts ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-white via-white to-green-50 border border-green-100 hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-medium text-slate-800">{user.name}</h3>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className={`text-xs px-2 py-1 rounded-full ${
                  user.isActive ? "bg-green-500 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </Badge>

              {loadingUserId === user.id ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              ) : (
                <Switch
                  checked={user.isActive}
                  onCheckedChange={() => handleToggle(user.id)}
                  className={`border border-gray-400 rounded-full transition-colors duration-300 
                    ${user.isActive ? "bg-green-500" : "bg-gray-300"}
                  `}
                />
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AllUsersList;
