"use client"

import { motion } from "framer-motion"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"


const RecentActivityCard = ({ recentActivity }) => {
    console.log(recentActivity);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                    <motion.div
                        key={activity._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent"
                    >
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                                {activity.user
                                    ? `${activity.user?.firstName} ${activity.user?.lastName}`
                                        .trim()
                                        .split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                    : "?"}
                            </AvatarFallback>

                            {/* <p>{activity.user?.firstName} {activity.user?.lastName}</p> */}

                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.user}</p>
                            <p className="text-xs text-muted-foreground">{activity.title}</p>
                        </div>
                        <div className="text-right">
                            <Badge
                                variant={
                                    activity.type === "success"
                                        ? "default"
                                        : activity.type === "error"
                                            ? "destructive"
                                            : activity.type === "warning"
                                                ? "secondary"
                                                : "outline"
                                }
                                className="text-xs"
                            >
                                {activity.type}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                    </motion.div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                    View All Activity
                </Button>
            </CardContent>
        </Card>
    )
}

export default RecentActivityCard
