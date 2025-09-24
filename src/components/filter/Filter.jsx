import { useState, useEffect } from "react"

export default function Filter({ filterTag, setFilterTag }) {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className="relative dark:text-white text-[1.1rem] font-bold cursor-pointer">
            <button
                onClick={() => !isActive ? setIsActive(true) : setIsActive(false)}
                className="flex flex-row  items-center gap-2 lg:gap-4"
            >
                <span className="flex flex-row gap-1">filter <span className="hidden md:block">by status</span></span>
                <span><img src="./assets/icon-arrow-down.svg" alt="" /></span></button>
            {isActive &&
                <div className="flex flex-col gap-2 absolute top-10 right-16 translate-x-1/2 w-[200px] px-5 py-5 bg-white dark:bg-[var(--custom-dark-color)] shadow-2xl rounded-lg z-50">
                    <div className="flex flex-row items-center gap-3">
                        <input
                            type="checkbox"
                            value="draft"
                            checked={filterTag === "draft"}
                            onChange={(e) => setFilterTag(e.target.checked ? "draft" : null)}
                            className="w-5 h-5 cursor-pointer accent-[var(--custom-color-1)]"
                        />
                        <p className="font-bold">Draft</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <input
                            checked={filterTag === "pending"}
                            onChange={(e) => setFilterTag(e.target.checked ? "pending" : null)}
                            type="checkbox"
                            value="pending"
                            className="w-5 h-5 cursor-pointer accent-[var(--custom-color-1)]"
                        />
                        <p>Pending</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <input
                            checked={filterTag === "paid"}
                            onChange={(e) => setFilterTag(e.target.checked ? "paid" : null)}
                            type="checkbox"
                            value="paid"
                            className="w-5 h-5 cursor-pointer accent-[var(--custom-color-1)]"
                        />
                        <p>Paid</p>
                    </div>
                </div>
            }
        </div>
    )
}