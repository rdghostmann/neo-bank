import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// components/admin/StatCard.jsx
export default function StatCard({ title, value, change, Icon, color }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
