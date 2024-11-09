import { HomeCard } from "../components/HomeCard"
import { TopBar } from "../components/TopBar"

export const Home = () => {
    return (
        <div>
            <TopBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10">
            <HomeCard title={"Add User"} navi={"signup"} />
            <HomeCard title={"Add User"} navi={"signup"} />
            <HomeCard title={"Add User"} navi={"signup"} />
            </div>
        </div>
    )
}