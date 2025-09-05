import { Link } from "react-router-dom"
import useIsMobile from "../../hooks/isMobile"

export default function NewButton({ setIsActive }) {

    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Link
                className="flex flex-row items-center rounded-3xl bg-[var(--custom-color-1)]
                    hover:bg-[var(--custom-color-2)] transition-colors text-white px-3 py-2 font-semibold"
            >
                <span className="bg-white rounded-full px-3 mr-2 py-3"><img src="./assets/icon-plus.svg" alt="" /></span>
                New <span className="hidden lg:flex pl-1">Invoice</span>
            </Link>
        )
    } else {
        return (
            <button
                onClick={() => setIsActive(true)}
                className="flex flex-row items-center rounded-3xl bg-[var(--custom-color-1)]
                    hover:bg-[var(--custom-color-2)] transition-colors text-white px-3 py-2 font-semibold"
            >
                <span className="bg-white rounded-full px-3 mr-2 py-3"><img src="./assets/icon-plus.svg" alt="" /></span>
                New <span className="hidden lg:flex pl-1">Invoice</span>
            </button>
        )
    }
}