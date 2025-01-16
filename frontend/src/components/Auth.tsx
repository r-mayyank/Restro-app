import { SignupInput } from "@r_mayyank/restroapp-common";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL, JWT_SECRET } from "../config";
import { jwtVerify } from 'jose';

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const secretKey = new TextEncoder().encode(JWT_SECRET); // Replace with your secret key
    let currentUserId: string;
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        phoneNo: "",
        password: "",
        role: "",
        addedById: ""
    });

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
                    currentUserId = userId as string;
                    setPostInputs({
                        ...postInputs,
                        addedById: currentUserId
                    })
                } catch (error) {
                    console.error('Invalid token or verification failed:', error);
                }
            }

            verifyToken();
        }
    }, [token]);

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data.jwt;
            if (type === "signin" && jwt) {
                localStorage.setItem("token", jwt)
            }
            navigate("/")
        } catch (error) {
            //ALERT THE USER IF THE REQ FAILED
            console.log(error);
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div>
                        <div className="flex justify-center text-4xl font-extrabold">
                            {type === "signup" ? "Add employee" : "Login"}
                        </div>
                    </div>

                    <div className="pt-6">
                        {type === "signup" ? (<LabelledInput label={"Username"} placeholder={"Enter your username"} onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} />) : null}
                        <LabelledInput label={"Email"} placeholder={"abc@gmail.com"} onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))
                        }} />
                        {type === "signup" ? <LabelledInput label={"Phone Number"} placeholder="934xxxx738" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                phoneNo: e.target.value
                            }))
                        }} /> : null}
                        <LabelledInput label={"Password"} type="password" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} />
                    </div>


                    <div>

                    {type === "signup" ? <form className="max-w-full pr-2 mx-auto">
                            <label htmlFor="roles" className="block mb-2 text-md font-bold text-gray-900 pt-3 ">User role</label>
                            <select id="roles" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black hover:ring-black block w-full p-2.5" value={postInputs.role} onChange={(e) => setPostInputs({
                                ...postInputs,
                                role: e.target.value
                            })}>
                                <option selected>Add Role</option>
                                <option value="manager">Manager</option>
                                <option value="waiter">Waiter</option>
                                <option value="cook">Cook</option>
                                <option value="user">User</option>
                            </select>
                        </form> : null}

                    </div>


                    <div className="pt-4">
                        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-96 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{
                            type === "signup" ? "Sign up" : "Log in"
                        }</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

interface LabelledInputProps {
    label: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputProps) {
    return <div>
        <div className="pt-4">
            <label className="block mb-2 text-md font-bold text-gray-900">{label}</label>
            <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" placeholder={placeholder || " "} required onChange={onChange} />
        </div>
    </div>
}