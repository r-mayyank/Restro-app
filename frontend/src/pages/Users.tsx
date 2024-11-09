import { useEffect, useState } from "react";
import { JWT_SECRET } from "../config";
import { useNavigate } from "react-router-dom";
import { jwtVerify } from "jose";
import { useCreateStatus, useGetStatus, useUpdateStatus, useUsers } from "../hooks";
import { TopBar } from "../components/TopBar"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export const Users = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const secretKey = new TextEncoder().encode(JWT_SECRET); // Replace with your secret key
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [time, setTime] = useState('');
    const [open, setOpen] = useState(false)
    const [postUserId, setPostUserId] = useState<number>();
    const [postStatus, setPostStatus] = useState<string>();
    const [createStatus, setcreateStatus] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
        else {
            const verifyToken = async () => {
                try {
                    const { payload } = await jwtVerify(token, secretKey);

                    // Extract userId from the payload
                    const userId = (payload as { userId: string }).userId;

                    console.log('Current userId:', userId);
                    setCurrentUserId(userId);
                } catch (error) {
                    console.error('Invalid token or verification failed:', error);
                    navigate("/signin");
                }
            }

            verifyToken();
        }
    }, [token]);

    const { loading, users, error } = useUsers(Number(currentUserId));
    if (error) {
        console.log('Error fetching users:', error);
    }

    const { attendance }: { attendance: { id: number, userId: number, date: string, status: string }[] } = useGetStatus() || { attendance: [] };
    console.log(attendance.map((user: { id: number, userId: number, date: string, status: string }) => {
        console.log(user.userId);
        console.log(user.status);
    }));
    // console.log(attendance);


    const IndiaTime = () => {

        useEffect(() => {
            const updateTime = () => {
                const indiaTime = new Date().toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                });
                setTime(indiaTime);
            };

            updateTime(); // Initialize with current time immediately
            const timerId = setInterval(updateTime, 1000); // Update every second

            return () => clearInterval(timerId); // Clean up on component unmount
        }, []);
    }

    IndiaTime();

    const getStatus = (userId: string) => {
        console.log(userId);

        return <div>
            <div>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900 pt-1.5">
                                                Edit User Attendance
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <div>

                                                    <form className="max-w-full pr-2 mx-auto">
                                                        <label htmlFor="status" className="block mb-2 text-md font-bold text-gray-900 pt-3 ">Status</label>
                                                        <select onChange={(e) => setPostStatus(e.target.value)} id="roles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black hover:ring-black block w-full p-2.5">
                                                            <option selected>{postStatus}</option>
                                                            <option value="PRESENT">Present</option>
                                                            <option value="ABSENT">Absent</option>
                                                            <option value="LEAVE">On Leave</option>
                                                            <option value="HOLIDAY">Holiday</option>
                                                            <option value="LATE">Late</option>
                                                        </select>
                                                    </form>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!createStatus) {
                                                if (postUserId && postStatus) {
                                                    useUpdateStatus(postUserId, postStatus)
                                                } else {
                                                    console.log("Invalid data")
                                                }
                                            } else {
                                                if (postUserId && postStatus) {
                                                    useCreateStatus(postUserId, postStatus)
                                                } else {
                                                    console.log("Invalid data in creating status")
                                                }
                                            }
                                            setOpen(false);
                                        }}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Edit Status
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setOpen(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

            {attendance.map((user: { id: number, userId: number, date: string, status: string }) => {
                if (user.userId == Number(userId)) {
                    if (user.status == "PRESENT") {
                        return <div>
                            <div className="flex items-center text-green-500" key={user.id}>
                                <div className="text-4xl font-extrabold pb-2.5 ">•</div>
                                <span className="text-base font-medium px-1.5 pr-3">Present</span>
                                <div onClick={() => {
                                    setOpen(true)
                                    setPostUserId(user.userId)
                                    setPostStatus("Present")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-300 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                    else if (user.status == "HOLIDAY") {
                        return <div>
                            <div className="flex items-center text-blue-900" key={user.id}>
                                <div className="text-4xl font-extrabold pb-2.5">•</div>
                                <span className="text-base font-medium px-1.5 pr-3">Holiday</span>
                                <div onClick={() => {
                                    setOpen(true)
                                    setPostUserId(user.userId)
                                    setPostStatus("Holiday")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-300 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                    else if (user.status == "LEAVE") {
                        return <div>
                            <div className="flex items-center text-blue-400" key={user.id}>
                                <div className="text-4xl font-extrabold pb-2.5">•</div>
                                <span className="text-base font-medium px-1.5 pr-3">On Leave</span>
                                <div onClick={() => {
                                    setOpen(true)
                                    setPostUserId(user.userId)
                                    setPostStatus("On Leave")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-300 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                    else if (user.status == "ABSENT") {
                        return <div>
                            <div className="flex items-center text-red-700" key={user.id}>
                                <div className="text-4xl font-extrabold pb-2.5">•</div>
                                <span className="text-base font-medium px-1.5 pr-3">Absent</span>
                                <div onClick={() => {
                                    setOpen(true)
                                    setPostUserId(user.userId)
                                    setPostStatus("Absent")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-300 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                    else if (user.status == "LATE") {
                        return <div>
                            <div className="flex items-center text-orange-400" key={user.id}>
                                <div className="text-4xl font-extrabold pb-2.5">•</div>
                                <span className="text-base font-medium px-1.5 pr-3">LATE</span>
                                <div onClick={() => {
                                    setOpen(true)
                                    setPostUserId(user.userId)
                                    setPostStatus("Late")
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-300 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    }
                }
                else if (!attendance.some((att) => att.userId === Number(userId))) {
                    return (<div>
                        <div className="flex items-center text-gray-600" key={user.id}>
                            <div className="text-4xl font-extrabold pb-2.5">•</div>
                            <span className="text-base font-medium px-1.5 pr-3">Pending</span>
                            <div onClick={() => {
                                setcreateStatus(true)
                                setOpen(true)
                                setPostUserId(Number(userId))
                                setPostStatus("Pending")
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-red-300 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </div>

                        </div>
                    </div>
                    )
                }

            })}
        </div>
    }

    return (

        <div>
            <TopBar />
            {loading ? <div>Loading...</div>
                : <div className="p-10">
                    <div className="flex justify-between pb-5">
                        <div className="bg-gray-200 rounded-md p-2 shadow-md font-medium">
                            {time}
                        </div>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add User
                        </button>
                    </div>
                    < div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                                <tr className="text-base">
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Joined On
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user: { id: string, name: string, email: string, phoneNo: string, createdAt: string, role: string }) => (
                                    <tr key={user.id} className="bg-white border-b text-base hover:bg-gray-50 ">
                                        <th onClick={() => navigate(`/user/${user.id}`)} scope="row" className="px-6 py-4 cursor-pointer font-medium text-gray-900 whitespace-nowrap underline">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.phoneNo}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDateToDDMMYY(user.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatus(user.id)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" onClick={() => navigate(`/edit-user/${user.id}`)} className="font-medium text-blue-600 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div >
    )
}

function formatDateToDDMMYY(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}
