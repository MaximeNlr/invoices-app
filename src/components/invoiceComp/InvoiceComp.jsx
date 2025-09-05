import data from "../../data/data.json"
import { FaCircle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function InvoiceComp() {

    const navigate = useNavigate();

    const statuesClass = {
        pending: "text-[#FF8F00] bg-[#FF8F00]/20",
        paid: "text-[#33D69F] bg-[#33D69F]/20",
        draft: "text-[var(custom-color-5)] bg-black/20",
    }

    if (!data) {
        return (
            <div className="flex flex-col dark:bg-[var(--custom-dark-color)] dark:text-white gap-5 items-center pt-10 h-screen">
                <img src="./assets/illustration-empty.svg" alt="" />
                <h2 className="font-semibold text-2xl">There is nothing here</h2>
                <p className="flex flex-col text-center text-[#858BB2] text-[13px]">Create an invoice by clicking the
                    <span><strong>New</strong> button and get started</span>
                </p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-5 px-5 pt-5">
                {data.map((i) => (
                    <article
                        key={i.id}
                        onClick={() => navigate(`/invoice/${i.id}`)}
                        className="flex flex-row justify-between bg-white border-2 border-transparent hover:border-[var(--custom-color-1)] dark:bg-[var(--custom-dark-color)]
                         dark:text-white dark:hover:border-2  rounded-lg px-5 py-5 cursor-pointer hover:scale-110 transition-transform"
                    >
                        <div className="flex flex-col gap-5">
                            <h3 className="font-semibold"><span className="text-[#858BB2]">#</span>{i.id}</h3>
                            <div>
                                <p className="text-[#858BB2] text-[13px]"><span>Due </span>{i.paymentDue}</p>
                                <span className="font-semibold text-[15px]">£ {i.total}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <p
                                className="text-end text-[#858BB2] text-[13px]"
                            >
                                {i.clientName}
                            </p>
                            <p
                                aria-label={i.status === "paid" ? "paid" : "pending"}
                                className={`flex justify-center items-center gap-2 px-5 py-2 text-center rounded-lg font-semibold w-[104px] h-[40px] ${statuesClass[i.status]}`}
                            >
                                <span className="text-[0.6rem]"><FaCircle /></span>
                                {i.status.charAt(0).toUpperCase() + i.status.slice(1)}
                            </p>
                        </div>
                    </article>
                ))
                }
            </div >
        )
    }
}