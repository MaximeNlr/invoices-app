export default function PaidButton() {
    return (
        <button
            className="bg-[var(--custom-color-1)] hover:bg-[var(--custom-color-2)]
             transition-colors rounded-3xl px-6 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap"
        >
            Mark as Paid
        </button>
    )
}