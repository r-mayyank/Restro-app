import { Table, TableAvailability, TableStatus } from '../../types/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {    
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface AdminTableDialogProps {
  table: Table | null
  onTableUpdate: (tableId: number, update: Partial<Table>) => void
  onAddTable: (newTable: Omit<Table, 'id' | 'number'>) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  isAddingTable: boolean
}

export function AdminTableDialog({ 
  table, 
  onTableUpdate, 
  onAddTable,
  open, 
  onOpenChange,
  isAddingTable
}: AdminTableDialogProps) {
  const [status, setStatus] = useState<TableStatus>(table?.status || 'empty')
  const [capacity, setCapacity] = useState(table?.capacity || 2)
  const [availability, setAvailability] = useState<TableAvailability>(table?.availability || 'available')

  useEffect(() => {
    if (table) {
      setStatus(table.status)
      setCapacity(table.capacity)
    } else {
      setStatus('empty')
      setCapacity(2)
    }
  }, [table])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAddingTable) {
      onAddTable({ status, capacity, availability })
    } else if (table) {
      onTableUpdate(table.id, { status, capacity, availability })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAddingTable ? 'Add New Table' : `Edit Table ${table?.number}`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value: TableStatus) => setStatus(value)} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empty">Empty</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Availability</Label>
            <Select onValueChange={(value: TableAvailability) => setAvailability(value)} value={availability}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {isAddingTable ? 'Add Table' : 'Update Table'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

