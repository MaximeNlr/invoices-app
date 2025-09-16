import { button } from "motion/react-client";

export default function ResetDemo({ setIsReseted }) {

    const fetchDemo = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'GET',
                headers: { 'Content-type': "application/json" }
            }
            const response = await fetch(${`import.meta.env.VITE_API_URL}/api/reset/demo`, options);
            const data = await response.json();
            if (data.success) {
                setIsReseted(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button
            onClick={fetchDemo}
            className=" fixed left-28 bottom-5 px-4 py-2 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500
             text-white font-semibold hover:from-purple-600 hover:to-indigo-600 active:scale-95 transition-all duration-200
        "
        >
            Reset Demo
        </button>
    )
}