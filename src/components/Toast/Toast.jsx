import { AnimatePresence, motion } from "framer-motion";
import { MdDone, MdError } from "react-icons/md";

export function Toast({ toast }) {
    if (!toast) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`fixed top-20 md:top-5 right-5 px-5 py-4 flex items-center gap-3 rounded-lg shadow-xl border-l-4 dark:text-white
        ${toast.type === "success" ? "bg-white dark:bg-gray-800 border-green-500" : "bg-white dark:bg-gray-800 border-red-500"}`}
            >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    {toast.type === "success" ? (
                        <MdDone className="text-green-500 text-2xl" />
                    ) : (
                        <MdError className="text-red-500 text-2xl" />
                    )}
                </div>
                <div>
                    <p className="font-semibold">{toast.message}</p>
                    {toast.extra && (
                        <p className="text-sm opacity-80">#{toast.extra}</p>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
