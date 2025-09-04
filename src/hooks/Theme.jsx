import { useState, useEffect } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState("");

    const handleLightMode = () => {
        setTheme("light")
        localStorage.setItem('mode', "light")
    }
    const handleDarkMode = () => {
        setTheme('dark')
        localStorage.setItem('mode', 'dark')
    }

    useEffect(() => {
        const localState = localStorage.getItem('mode');
        if (localState === "dark") {
            setTheme(localState)
            document.documentElement.classList.add('dark')
        }
        if (localState === "light") {
            setTheme(localState)
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return { theme, handleDarkMode, handleLightMode }
}