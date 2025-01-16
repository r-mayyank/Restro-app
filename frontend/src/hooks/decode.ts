import { JWT_SECRET } from "@/config";
import { jwtVerify } from "jose";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const secretKey = new TextEncoder().encode(JWT_SECRET); // Replace with your secret key


export const decodeJwtToUserid = (token: string) => {
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
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
    return currentUserId;
}