import { Table } from '../../types/table'
import { Card, CardContent } from '@/components/ui/card'

interface TableItemProps {
  table: Table
  onStatusChange: () => void
}

export function TableItem({ table, onStatusChange }: TableItemProps) {
  const statusColors = {    
    empty: 'bg-green-100 hover:bg-green-200 border-green-300',
    occupied: 'bg-red-100 hover:bg-red-200 border-red-300',
    reserved: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300',
  }

  return (
    <Card 
      className={`${statusColors[table.status]} cursor-pointer border-2`} 
      onClick={onStatusChange}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Table {table.number}</h3>
          <span className="text-sm font-medium">{table.capacity} seats</span>
        </div>
        <p className="text-sm capitalize mt-1">{table.status}</p>
      </CardContent>
    </Card>
  )
}

