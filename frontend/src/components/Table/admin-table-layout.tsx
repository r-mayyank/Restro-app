import { useState } from 'react'
import { Table } from '../../types/table'
import { AdminTableItem } from './admin-table-item'
import { AdminTableDialog } from './admin-table-dialog'
import { Button } from '@/components/ui/button'

const initialTables: Table[] = [
  { id: 1, number: 1, status: 'empty', capacity: 2 },
  { id: 2, number: 2, status: 'occupied', capacity: 4 },
  { id: 3, number: 3, status: 'reserved', capacity: 6 },
  { id: 4, number: 4, status: 'empty', capacity: 2 },
  { id: 5, number: 5, status: 'occupied', capacity: 4 },
  { id: 6, number: 6, status: 'empty', capacity: 6 },
  { id: 7, number: 7, status: 'reserved', capacity: 8 },
  { id: 8, number: 8, status: 'empty', capacity: 4 },
]

export function AdminTableLayout() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [isAddingTable, setIsAddingTable] = useState(false)

  const handleTableUpdate = (tableId: number, update: Partial<Table>) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, ...update } : table
    ))
    setSelectedTable(null)
  }

  const handleAddTable = (newTable: Omit<Table, 'id' | 'number'>) => {
    const id = Math.max(...tables.map(t => t.id), 0) + 1
    const number = Math.max(...tables.map(t => t.number), 0) + 1
    setTables([...tables, { ...newTable, id, number }])
    setIsAddingTable(false)
  }

  const handleDeleteTable = (tableId: number) => {
    setTables(tables.filter(table => table.id !== tableId))
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsAddingTable(true)} variant="default">Add New Table</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map(table => (
          <AdminTableItem 
            key={table.id} 
            table={table} 
            onEdit={() => setSelectedTable(table)}
            onDelete={() => handleDeleteTable(table.id)}
          />
        ))}
      </div>
      <AdminTableDialog
        table={selectedTable}
        onTableUpdate={handleTableUpdate}
        onAddTable={handleAddTable}
        open={!!selectedTable || isAddingTable}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTable(null)
            setIsAddingTable(false)
          }
        }}
        isAddingTable={isAddingTable}
      />
    </div>
  )
}

