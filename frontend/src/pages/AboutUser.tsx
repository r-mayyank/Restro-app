import { useParams } from "react-router-dom";
import { useGetUserDetail } from "../hooks";
import { Calender } from "../components/Calender";

export const AboutUser = () => {
    const { id } = useParams<{ id: string }>();

    const { user } = useGetUserDetail(Number(id));

    return (
        <div className="grid-cols-2 pt-10">

            <a href="#" className="flex col-span-1 flex-col items-center bg-gray-200 border border-gray-400 rounded-lg shadow md:flex-row md:w-96 hover:bg-gray-100">
                <div className="flex flex-col justify-between p-4 leading-normal w-full px-10">
                    <h2 className="mb-2 text-7xl font-bold tracking-tight text-gray-900 ">{user?.name}</h2>
                    <p className="pt-4 mb-3 font-medium text-gray-700">Email: {user?.email}</p>
                    <p className="mb-3 font-medium text-gray-700">Phone Number: {user?.phoneNo}</p>
                    <p className="mb-3 font-medium text-gray-700">Role: {user?.role}</p>
                    <p className="mb-3 font-medium text-gray-700">Role: {formatDateToDDMMYY(user?.createdAt ?? '')}</p>
                </div>
            </a>

            <div className="col-span-2">
                <Calender />
            </div>

        </div>
    )
}

function formatDateToDDMMYY(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}