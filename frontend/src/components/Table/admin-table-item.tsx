import { Table } from '../../types/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

interface AdminTableItemProps {
  table: Table
  onEdit: () => void
  onDelete: () => void
}

export function AdminTableItem({ table, onEdit, onDelete }: AdminTableItemProps) {
  const statusColors = {
    empty: 'bg-green-100 border-green-300',
    occupied: 'bg-red-100 border-red-300',
    reserved: 'bg-yellow-100 border-yellow-300',
  }

  return (
    <Card className={`${statusColors[table.status]} border-2`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Table {table.number}</h3>
          <span className="text-sm font-medium">{table.capacity} seats</span>
        </div>
        <p className="text-sm capitalize mb-4">{table.status}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

