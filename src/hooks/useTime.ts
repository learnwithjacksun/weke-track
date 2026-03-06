import { useState, useEffect } from "react";
export default function useTime() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = () => {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
       
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
    }

    const padZero = (value: number) => {
        return value.toString().padStart(2, '0');
    }

    return formatTime();
}
