import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import OrderItem from './OrderItem';
import { TopBar } from '../TopBar';

interface Order {
  id: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export default function TableOrderPrompt() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const { tableId } = useParams<{ tableId: string }>();

  useEffect(() => {
    // Fetch orders for this table from your HonoJS + Prisma backend
    // This is a placeholder and should be replaced with actual API call
    const fetchOrders = async () => {
      // const response = await fetch(`/api/tables/${tableId}/orders`);
      // const data = await response.json();
      // setOrders(data);

      // Placeholder data
      setOrders([
        { id: '1', items: ['Pizza', 'Coke'], total: 15.99, status: 'pending' },
        { id: '2', items: ['Burger', 'Fries'], total: 12.99, status: 'completed' },
      ]);
    };

    fetchOrders();
  }, [tableId]);

  const handleCreateNewOrder = () => {
    setIsNewOrderDialogOpen(true);
    // Implement new order creation logic here
  };

  const handleBilling = () => {
    // Implement billing logic here
    console.log('Billing for table', tableId);
  };

  return (
    <div>
      <TopBar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Orders for Table {tableId}</h2>
        <div className="mt-6 flex justify-end space-x-6 pb-8">
          <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreateNewOrder} className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
              </DialogHeader>
              {/* Add form for creating new order here */}
              <p>New order form goes here</p>
            </DialogContent>
          </Dialog>
          <Button onClick={handleBilling} className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Billing
          </Button>
        </div>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

      </div>
    </div>
  );
}

