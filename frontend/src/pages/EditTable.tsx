import { AdminTableLayout } from '@/components/Table/admin-table-layout'
import { TopBar } from '@/components/TopBar'

export default function AdminTablePage() {
    return (
        <div>
            <TopBar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Table Management - Admin</h1>
                <AdminTableLayout />
            </div>
        </div>
    )
}

