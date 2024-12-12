'use client'

import { useState } from 'react'
import { Table } from '../../types/table'
import { TableItem } from './table-item'
import { TableStatusDialog } from './table-status-dialog'
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

export function TableLayout() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null)

  const handleTableUpdate = (tableId: number, update: Partial<Table>) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, ...update } : table
    ))
    setSelectedTable(null)
  }

  const filteredTables = capacityFilter
    ? tables.filter(table => table.capacity === capacityFilter)
    : tables

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={capacityFilter === null ? "default" : "outline"}
          className={capacityFilter === null ? "bg-primary" : "hover:bg-primary/10"}
          onClick={() => setCapacityFilter(null)}
        >
          All
        </Button>
        {[1, 2, 4, 6, 8].map(capacity => (
          <Button
            key={capacity}
            variant={capacityFilter === capacity ? "default" : "outline"}
            className={capacityFilter === capacity ? "bg-primary" : "hover:bg-primary/10"}
            onClick={() => setCapacityFilter(capacity)}
          >
            {capacity}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTables.map(table => (
          <TableItem 
            key={table.id} 
            table={table} 
            onStatusChange={() => setSelectedTable(table)}
          />
        ))}
      </div>
      <TableStatusDialog
        table={selectedTable}
        onTableUpdate={handleTableUpdate}
        open={!!selectedTable}
        onOpenChange={() => setSelectedTable(null)}
      />
    </div>
  )
}

