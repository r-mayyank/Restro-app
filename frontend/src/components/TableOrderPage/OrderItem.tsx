import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  const [status, setStatus] = useState(order.status);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order #{order.id}</span>
            <Select value={status} onValueChange={(value) => setStatus(value as Order['status'])}>
              <SelectTrigger className="w-[130px]">
                <SelectValue>{status}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            {order.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${order.total.toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}

