'use client'

import { useEffect, useState } from 'react'
import { Table } from '../../types/table'
import { TableItem } from './table-item'
import { TableStatusDialog } from './table-status-dialog'
import { Button } from '@/components/ui/button'
import { decodeJwtToUserid } from '@/hooks/decode'
import axios from 'axios'
import { BACKEND_URL } from '@/config'

export function TableLayout() {
  const [restroName, setrestroName] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [tables, setTables] = useState<Table[]>([])
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null)

  const fetchTables = async (decoded: string) => {
    // try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/table/get/${decoded}`)
    console.log("REs", response);
    console.log("Res Name", response.data.tables.restaurants[0].name);

    setrestroName(response.data.tables.restaurants[0].name);
    setTables(response.data.tables.restaurants[0].tables);

    // } catch (error) {
    //   console.log('Error fetching tables:', error);
    // } finally {
    //   setLoading(false);
    // }
  }

  const jwt = localStorage.getItem('token');
  if (!jwt) {
    window.location.href = '/signin';
  }
  const decoded = jwt ? decodeJwtToUserid(jwt) : null;

  useEffect(() => {
    if (decoded) {
      fetchTables(decoded).finally(() => setLoading(false));
    }
  }, [decoded]);


  // if (decoded) {
  //   const intervalId = setInterval(() => {
  //     fetchTables(decoded)
  //   }, 6000) // 60000 ms = 1 minute
  //   return () => clearInterval(intervalId)
  // }

  const handleTableUpdate = async (tableId: number, update: Partial<Table>) => {
    // setTables(tables.map(table =>
    //   table.id === tableId ? { ...table, ...update } : table
    // ))
    axios.put(`${BACKEND_URL}/api/v1/table/update`, { id: tableId, ...update })
    setSelectedTable(null)

    if (decoded) {
      setTimeout(() => fetchTables(decoded), 1000)
    }
  }

  const filteredTables = capacityFilter
    ? tables.filter(table => table.capacity === capacityFilter)
    : tables

  return (
    <div className="space-y-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='text-xl font-semibold mb-4'>{restroName}</div>
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
            <Button
              variant="outline"
              className="hover:bg-primary/10"
              onClick={() => {
                if (decoded) {
                  fetchTables(decoded)
                }
                setCapacityFilter(null)
              }}
            >
              Refresh
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTables
              .sort((a, b) => a.id - b.id)
              .map(table => (
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
        </>
      )}
    </div>
  )
}
