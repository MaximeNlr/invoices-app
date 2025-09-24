export default function PaidButton({ id, showToast, status, setStatusIsChanged }) {

    const paidButton = async () => {
        try {
            const options = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invoice/${id}/paid`, options);
            const data = await response.json();
            if (data.success) {
                showToast("New status : paid", "success", id);
                setStatusIsChanged(true);
            } else {
                showToast("Error changing invoice status", "error", id)
            }
        } catch (error) {

        }
    }

    return (
        <button
            disabled={status === "paid"}
            onClick={paidButton}
            className={`
            bg-[var(--custom-color-1)] transition-colors rounded-3xl px-6 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap
            ${status === "paid" ? "cursor-not-allowed opacity-50 hover:bg-[var(--custom-color-1)]" : "hover:bg-[var(--custom-color-2)] cursor-pointer"}
        `}
        >
            Mark as Paid
        </button>
    )
}