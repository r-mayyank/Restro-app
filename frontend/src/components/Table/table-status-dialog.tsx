import { Table, TableStatus } from '../../types/table'
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
import { Label } from '@/components/ui/label'

interface TableStatusDialogProps {
  table: Table | null
  onTableUpdate: (tableId: number, update: Partial<Table>) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TableStatusDialog({ table, onTableUpdate, open, onOpenChange }: TableStatusDialogProps) {
  if (!table) return null

  const handleStatusChange = (newStatus: TableStatus) => {
    onTableUpdate(table.id, { status: newStatus })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Status for Table {table.tno}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} defaultValue={table.status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empty">Empty</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

