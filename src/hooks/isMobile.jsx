import { useState, useEffect } from "react";

export default function useIsMobile() {

    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsMobile(true)
            }
            if (window.innerWidth > 640) {
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