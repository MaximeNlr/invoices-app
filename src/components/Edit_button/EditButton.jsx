import { Link } from "react-router-dom"
import { useState } from "react"

export default function EditButton({ id }) {

    return (
        <Link
            to={`/edit/invoice/${id}`}
            className="bg-[#F9FAFE] text-[var(--custom-color-7)] hover:bg-[var(--custom-color-5)] transition-colors font-semibold rounded-3xl px-8 py-3 cursor-pointer"
        >
            Edit
        </Link>
    )
}