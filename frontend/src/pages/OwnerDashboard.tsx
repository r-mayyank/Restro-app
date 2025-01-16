import { TopBar } from "@/components/TopBar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Grid, DollarSign, Utensils } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export function OwnerDashboard() {
    const navigate = useNavigate()
    return (
        <div>
            <TopBar />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-8 pt-10">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25</div>
                    </CardContent>
                    <CardFooter onClick={() => navigate("/users")} className="flex flex-row bg-blue-600 rounded-b-lg items-center justify-between space-y-0 pt-3">
                        <div className="text-base font-medium text-white cursor-pointer">Manage Employees→</div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
                        <Grid className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                    </CardContent>
                    <CardFooter onClick={() => navigate("/edittable")} className="flex flex-row bg-blue-600 rounded-b-lg items-center justify-between space-y-0 pt-3">
                        <div className="text-base font-medium text-white cursor-pointer">Manage Tables→</div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234</div>
                    </CardContent>
                    <CardFooter onClick={() => navigate("/users")} className="flex flex-row bg-blue-600 rounded-b-lg items-center justify-between space-y-0 pt-3">
                        <div className="text-base font-medium text-white cursor-pointer">Check analytics →</div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                    </CardContent>
                    <CardFooter onClick={() => navigate("/users")} className="flex flex-row bg-blue-600 rounded-b-lg items-center justify-between space-y-0 pt-3">
                        <div className="text-base font-medium text-white cursor-pointer">Manage orders →</div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

