export default function PaidButton({ id, showToast, setStatusIsChanged }) {

    const paidButton = async () => {
        try {
            const options = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invoice/${id}/paid`, options);
            const data = await response.json();
            if (data.success) {
                showToast("Invoice new status : paid", "success", id);
                setStatusIsChanged(true);
            } else {
                showToast("Error changing invoice status", "error", id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button
            onClick={paidButton}
            className="bg-[var(--custom-color-1)] hover:bg-[var(--custom-color-2)]
             transition-colors rounded-3xl px-6 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap"
        >
            Mark as Paid
        </button>
    )
}