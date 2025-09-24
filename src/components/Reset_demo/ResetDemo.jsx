import { GrPowerReset } from "react-icons/gr";

export default function ResetDemo({ setIsReseted }) {

    const fetchDemo = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-type': "application/json" }
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reset/demo`, options);
            const data = await response.json();
            if (data.success) {
                setIsReseted(true)
            }
        } catch (error) {

        }
    }

    return (
        <button
            onClick={fetchDemo}
            className="flex flex-row items-center rounded-3xl bg-[var(--custom-color-1)]
                    hover:bg-[var(--custom-color-2)] transition-colors text-white px-3 py-2 font-semibold cursor-pointer"
        >
            <GrPowerReset />

        </button>
    )
}