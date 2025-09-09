import { useNavigate } from "react-router-dom"

export default function BackButton() {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex flex-row items-center gap-6 mx-5 my-10 font-semibold dark:text-white hover:text-[var(custom-color-7)] cursor-pointer"
        >
            <span><img src="/assets/icon-arrow-left.svg" alt="" /></span>
            Go back
        </button>
    )
}