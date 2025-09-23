import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react"

export default function Filter({ setInvoicesData, setFilterTag }) {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className="relative dark:text-white text-[1.1rem] font-bold cursor-pointer">
            <button
                onClick={() => !isActive ? setIsActive(true) : setIsActive(false)}
                className="flex flex-row  items-center gap-2 lg:gap-4"
            >
                filter
                <span><img src="./assets/icon-arrow-down.svg" alt="" /></span></button>
            {isActive &&
                <div className="absolute right-0 translate-x-1/2 w-[200px] px-5 py-5 bg-white dark:bg-[var(--custom-dark-color)] shadow-2xl rounded-lg">
                    <div className="flex flex-row gap-2">
                        <input

                            onChange={(e) => setFilterTag(e.target.checked ? "draft" : null)}
                            value="draft"
                            type="checkbox"
                        />
                        <p>Draft</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input

                            onChange={(e) => setFilterTag(e.target.checked ? "pending" : null)}
                            type="checkbox"
                            value="pending"
                        />
                        <p>Pending</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input

                            onChange={(e) => setFilterTag(e.target.checked ? "paid" : null)}
                            type="checkbox"
                            value="paid"
                        />
                        <p>Paid</p>
                    </div>
                </div>
            }
        </div>
    )
}