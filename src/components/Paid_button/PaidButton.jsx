export default function PaidButton({ id }) {

    const paidButton = async () => {
        try {
            const options = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
            }
            const response = await fetch(`http://localhost:3000/api/invoice/${id}/paid`, options);
            const data = await response.json();
            console.log(data);
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