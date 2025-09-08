import { useState, useEffect } from "react";

export default function useIsMobile() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 770);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 770) {
                setIsMobile(true)
            }
            if (window.innerWidth > 770) {
                setIsMobile(false)
            }
        };
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return isMobile
} 