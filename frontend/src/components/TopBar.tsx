import { Link, useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut } from 'lucide-react'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Users, Grid } from 'lucide-react'
import { getUserRole } from '../utils/auth';


export const TopBar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const userRole = getUserRole();

    // const router = useRouter()

    const handleLogout = () => {
        localStorage.setItem("token", '')
        navigate('/signin') // Assuming you want to redirect to login page after logout
    }

    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
            <div className="flex ">
                <div className="font-semibold text-xl pr-8">
                    <Link to={'/home'}>
                        RestroApp
                    </Link>
                </div>
                <nav className="space-x-4">
                    <Button variant="ghost" asChild>
                        <Link to="/users" className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>Manage Users</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="/table" className="flex items-center space-x-2">
                            <Grid className="h-4 w-4" />
                            <span>Manage Tables</span>
                        </Link>
                    </Button>
                    {userRole === 'owner' && (
                        <Button variant="ghost" asChild>
                            <Link to="/dashboard" className="flex items-center space-x-2">
                                <Grid className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </Button>
                    )}
                </nav>
            </div>
        </div>
        <div className="flex">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <User className="h-6 w-6" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        <Link to="/settings" className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
}