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
          <h3 className="text-lg font-semibold">Table {table.tno}</h3>
          <span className="text-sm font-medium underline">{table.capacity} seats</span>
        </div>
        <div className='flex justify-between pt-4'>
          <p className="text-base font-semibold capitalize mt-1">{table.status}</p>
            {(table.status === 'occupied' || table.status === 'reserved') && 
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => window.location.href = `/torder/${table.tno}`}
            >
              Orders
            </button>
      }
      </div>
    </CardContent>
    </Card >
  )
}

