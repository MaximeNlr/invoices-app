import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";

export default function DeleteButton({ id }) {

    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isActive])

    const deleteInvoice = async () => {
        try {
            const options = {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            };
            const response = await fetch(`http://localhost:3000/api/invoice/${id}`, options)
            const data = await response.json()
            if (data.success) {
                setIsActive(false);
                navigate("/", { state: { toast: { message: "Invoice Deleted!", type: "success", extra: id } } });

            } else {
                showToast("Error deleting invoice", "error", data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button
                onClick={() => setIsActive(true)}
                className="bg-[var(--custom-color-9)] hover:bg-[var(--custom-color-10)] transition-colors rounded-3xl px-6 lg:px-8 py-3 text-white"
            >
                Delete
            </button>
            <AnimatePresence>
                {isActive &&
                    <div className="fixed inset-0 flex items-center md:justify-center h-full w-full bg-black/70 z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="bg-white dark:bg-[var(--custom-dark-color)] px-5 py-5 m-auto mx-10 rounded-lg"
                        >
                            <h3 className="text-2xl dark:text-white font-semibold">Confirm Deletion</h3>
                            <p className="text-[var(--custom-color-6)] py-2">
                                Are you sure you want to delete invoice #{id}? This action cannot be undone.
                            </p>
                            <div className="flex flex-row justify-end gap-2 pt-5 font-semibold">
                                <button
                                    onClick={() => setIsActive(false)}
                                    className="bg-[#F9FAFE] text-[var(--custom-color-7)] hover:bg-[var(--custom-color-5)] transition-colors rounded-3xl px-8 py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteInvoice}
                                    className="bg-[var(--custom-color-9)] hover:bg-[var(--custom-color-10)] transition-colors rounded-3xl px-8 py-3 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                }
            </AnimatePresence>
        </div>
    )
}