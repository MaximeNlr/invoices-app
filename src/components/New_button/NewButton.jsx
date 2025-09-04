import { Link } from "react-router-dom"

export default function NewButton() {
    return (
        <Link
            to='/create/invoice'
            className="flex flex-row items-center gap-2 rounded-3xl bg-[var(--custom-color-2)] text-white px-3 py-2"
        >
            <span className="bg-white rounded-full px-3 py-3"><img src="./assets/icon-plus.svg" alt="" /></span>
            New
        </Link>
    )
}