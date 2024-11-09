import { useEffect, useState } from "react";
import { TopBar } from "../components/TopBar"
import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks";
import { UpdateInput } from "@r_mayyank/restroapp-common";
import { DialogDefault } from "../components/Confirm";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const EditUser = () => {
    const { id } = useParams<{ id: string }>();

    const { loading, user, error } = useGetUser(Number(id));

    if (error) {
        console.log('Error fetching user:', error);
    }

    const [postInputs, setPostInputs] = useState<UpdateInput>({
        name: "",
        email: "",
        phoneNo: "",
        role: ""
    });

    useEffect(() => {
        if (user) {
            setPostInputs({
                name: user.name,
                email: user.email,
                phoneNo: user.phoneNo,
                role: user.role
            })
        }
    }, [user])

    async function handleSave() {
        try {
            const response = await axios.put(`${BACKEND_URL}/api/v1/user/edit-user/${id}`, postInputs)
            console.log(response.data); 
        } catch (error) {
            //ALERT THE USER IF THE REQ FAILED
            console.log(error);
        }
    }

    return (
        <div>
            <TopBar />
            {loading ? <div>Loading...</div>
                :
                <div>
                    <div className="h-screen flex justify-center flex-col">
                        <div className="flex justify-center">
                            <div>
                                <div>
                                    <div className="flex justify-center text-4xl font-extrabold">
                                        Update user
                                    </div>
                                </div>

                                <div className="pt-6">

                                    <LabelledInput label={"Name"} placeholder={"John Cena"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPostInputs(c => ({
                                            ...c,
                                            name: e.target.value
                                        }))
                                    }} user={postInputs.name} />
                                    <LabelledInput label={"Email"} placeholder={"abc@gmail.com"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPostInputs(c => ({
                                            ...c,
                                            email: e.target.value
                                        }))
                                    }} user={postInputs.email} />
                                    <LabelledInput label={"Phone Number"} placeholder="934xxxx738" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setPostInputs(c => ({
                                            ...c,
                                            phoneNo: e.target.value
                                        }))
                                    }} user={postInputs.phoneNo} />
                                </div>


                                <div>

                                    <form className="max-w-full pr-2 mx-auto">
                                        <label htmlFor="roles" className="block mb-2 text-md font-bold text-gray-900 pt-3 ">User role</label>
                                        <select id="roles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black hover:ring-black block w-full p-2.5" value={postInputs.role} onChange={(e) => setPostInputs({
                                            ...postInputs,
                                            role: e.target.value
                                        })}>
                                            <option selected>{postInputs.role}</option>
                                            <option value="manager">Manager</option>
                                            <option value="waiter">Waiter</option>
                                            <option value="cook">Cook</option>
                                            <option value="user">User</option>
                                        </select>
                                    </form>

                                    <div className="flex justify-between pt-6">
                                        <DialogDefault />
                                        <div>
                                            <button onClick={handleSave} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Save Changes</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

interface LabelledInputProps {
    label: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    user: string;
}

function LabelledInput({ label, placeholder, onChange, type, user }: LabelledInputProps) {
    return <div>
        <div className="pt-4">
            <label className="block mb-2 text-md font-bold text-gray-900">{label}</label>
            <input value={user} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" placeholder={placeholder || " "} required onChange={onChange} />
        </div>
    </div>
}