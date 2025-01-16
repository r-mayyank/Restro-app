import { TopBar } from '@/components/TopBar'
import { TableLayout } from '../components/Table/table-layout'

export const TableManagement = () => {

    return (
        <div>
            <TopBar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 underline">Table Management</h1>
                <TableLayout />
            </div>
        </div>
    )
}

