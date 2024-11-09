import { Link, useNavigate } from "react-router-dom"

export const TopBar = () => {
    const navigate = useNavigate()

    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
            <div className="flex ">
                <div className="font-semibold text-xl pr-8">
                    <Link to={'/home'}>
                        RestroApp
                    </Link>
                </div>
                <div onClick={() => navigate("/")} className="pr-4">
                    Home
                </div>
                <div onClick={() => navigate("/users")} className="pr-4">
                    User
                </div>
                <div className="pr-4">
                    
                </div>
            </div>
        </div>
        <div className="flex">
            <div className="pr-4">
                Order
            </div>
        </div>
    </div>
}