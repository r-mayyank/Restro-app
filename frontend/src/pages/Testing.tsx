import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';

type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE' | 'HOLIDAY';

interface Attendance {
    date: string; // 'YYYY-MM-DD' format
    status: AttendanceStatus;
}

export const Testing: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/attendance/create`); // Replace with your endpoint
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceData();

        // Calculate the days in the current month
        const daysArray = Array.from(
            { length: dayjs().daysInMonth() },
            (_, i) => i + 1
        );
        setDaysInMonth(daysArray);
    }, []);

    const getDayStatusColor = (day: number): string => {
        const dateStr = dayjs().date(day).format('YYYY-MM-DD');
        const attendance = attendanceData.find(item => item.date === dateStr);

        switch (attendance?.status) {
            case 'PRESENT':
                return 'bg-green-500';
            case 'ABSENT':
                return 'bg-red-500';
            case 'LATE':
                return 'bg-orange-500';
            case 'LEAVE':
                return 'bg-blue-500';
            case 'HOLIDAY':
                return 'bg-green-900';
            default:
                return 'bg-gray-200'; // No attendance record
        }
    };

    return (
        <div className="grid grid-cols-7 gap-2 p-4">
            {daysInMonth.map(day => (
                <div
                    key={day}
                    className={`h-12 w-12 flex items-center justify-center text-black ${getDayStatusColor(day)} rounded-md`}
                >
                    {day}
                </div>
            ))}
        </div>
    );
};