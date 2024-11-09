import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { UpdateInput, UserDetails } from "@r_mayyank/restroapp-common";

const getCurrentDateInIndia = () => {
    return new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const useUsers = (id: Number) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState<string | null>(null); // Add error state


    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/getUsers`, {
                    params: {
                        id
                    }
                });

                setUsers(response.data.users);
            } catch (error) {
                console.log('Error fetching users:', error);
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [id]);

    return { loading, users, error };
}

export const useGetUser = (id: Number) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UpdateInput>();
    const [error, setError] = useState<string | null>(null); // Add error state


    useEffect(() => {
        if (!id) {
            console.log("No id");
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/get-user/${id}`);
                console.log(id);

                console.log(response.data.users);

                setUser(response.data.users);
            } catch (error) {
                console.log('Error fetching users:', error);
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [id]);

    return { loading, user, error };
}

export const useGetUserDetail = (id: Number) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserDetails>();
    const [error, setError] = useState<string | null>(null); // Add error state


    useEffect(() => {
        if (!id) {
            console.log("No id");
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/get-user/${id}`);
                console.log(id);

                console.log(response.data.users);

                setUser(response.data.users);
            } catch (error) {
                console.log('Error fetching users:', error);
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [id]);

    return { loading, user, error };
}

export const useSaveChange = (id: Number) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [error, setError] = useState<string | null>(null); // Add error state


    useEffect(() => {
        if (!id) {
            console.log("No id");
            return;
        }

        const updateUser = async () => {
            try {
                const response = await axios.put(`${BACKEND_URL}/api/v1/user/edit-user/${id}`);

                console.log(response.data.id);

                setUser(response.data.id);
            } catch (error) {
                console.log('Error updating user:', error);
                setError('Error updating error');
            } finally {
                setLoading(false);
            }
        };

        updateUser();
    }, [id]);

    return { loading, user, error };
}

export const useGetStatus = () => {
    const [attendance, setAttendance] = useState([]);




    const currentDateInIndia = getCurrentDateInIndia();

    // return { currentDateInIndia };

    useEffect(() => {
        console.log(currentDateInIndia);
        const getAttendance = async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/user/attendance/get-date`, {
                    date: currentDateInIndia
                });

                setAttendance(response.data.attendance);
            } catch (error) {
                console.log('Error updating attendance:', error);
                // setError('Error updating attendance');
            }
        };

        getAttendance();
    }, []);

    return { attendance };
}

export const useUpdateStatus = (userId: number, postStatus: string) => {
    console.log(userId, postStatus);
    const date = getCurrentDateInIndia();
    const getAttendance = async () => {
        try {
            await axios.put(`${BACKEND_URL}/api/v1/user/attendance/update-status`, {
                userId: userId,
                status: postStatus,
                date: date
            });
        } catch (error) {
            console.log('Error updating attendance:', error);
            // setError('Error updating attendance');
        }
    };

    getAttendance();
}

export const useCreateStatus = (userId: number, postStatus: string) => {
    console.log(userId, postStatus);
    const getAttendance = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/user/attendance/create`, {
                userId: userId,
                status: postStatus
            });
        } catch (error) {
            console.log('Error updating attendance:', error);
            // setError('Error updating attendance');
        }
    };

    getAttendance();
}