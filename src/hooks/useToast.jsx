import { useState, useEffect } from "react";

export default function useToast() {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success", extra = null) => {
        setToast({ message, type, extra });
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return { toast, showToast };
}