import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: number;
    email: string;
    role: string;
}

export function getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.role;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

