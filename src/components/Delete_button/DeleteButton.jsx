import { useState, useEffect } from "react"

export default function DeleteButton({ id }) {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll";
        }
    }, [isActive])

    return (
        <div>
            <button
                onClick={() => setIsActive(true)}
                className="bg-[var(--custom-color-9)] hover:bg-[var(--custom-color-10)] transition-colors rounded-3xl px-8 py-3 text-white"
            >
                Delete
            </button>
            {isActive &&
                <div className="fixed inset-0 flex items-center h-full w-full bg-black/70 z-50">
                    <div className="bg-white dark:bg-[var(--custom-dark-color)] px-5 py-5 m-auto mx-10 rounded-lg">
                        <h3 className="text-2xl dark:text-white font-semibold">Confirm Deletion</h3>
                        <p className="text-[var(--custom-color-6)] py-2">
                            Are you sure you want to delete invoice #{id}? This action cannot be undone.
                        </p>
                        <div className="flex flex-row justify-end pt-5 font-semibold">
                            <button
                                onClick={() => setIsActive(false)}
                                className="bg-[#F9FAFE] text-[var(--custom-color-7)] hover:bg-[var(--custom-color-5)] transition-colors rounded-3xl px-8 py-3"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[var(--custom-color-9)] hover:bg-[var(--custom-color-10)] transition-colors rounded-3xl px-8 py-3 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}