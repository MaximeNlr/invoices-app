import data from "../../data/data.json"
import { FaCircle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading/Loading";

export default function InvoiceComp({ invoices }) {

    const navigate = useNavigate();
    const statuesClass = {
        pending: "text-[#FF8F00] bg-[#FF8F00]/20",
        paid: "text-[#33D69F] bg-[#33D69F]/20",
        draft: "text-[var(custom-color-5)] bg-black/20",
    }

    if (invoices.length === 0) {
        return (
            <div className="flex flex-col dark:bg-[var(--custom-dark-color)] dark:md:bg-transparent md:bg-transparent dark:text-white gap-5 items-center md:mt-20 pt-10 h-screen">
                <img src="./assets/illustration-empty.svg" alt="" />
                <h2 className="font-semibold text-2xl">There is nothing here</h2>
                <p className="flex flex-col text-center text-[#858BB2] text-[13px]">Create an invoice by clicking the
                    <span><strong>New</strong> button and get started</span>
                </p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-5 px-5 pt-5 h-fit min-h-screen lg:min-w-[800px] md:whitespace-nowrap">
                {invoices.map((i) => (
                    <article
                        key={i.invoiceId}
                        onClick={() => navigate(`/invoice/${i.invoiceId}`)}
                        className="flex flex-row justify-between bg-white border-2 border-transparent hover:border-[var(--custom-color-1)] dark:bg-[var(--custom-dark-color)]
                         dark:text-white dark:hover:border-2  rounded-lg px-5 py-5 cursor-pointer hover:scale-110 transition-transform"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-20">
                            <h3 className="font-semibold"><span className="text-[#858BB2]">#</span>{i.invoiceId}</h3>
                            <div className="md:flex flex-row items-center justify-between gap-20">
                                <p className="text-[#858BB2] text-[13px]"><span>Due </span> {new Date(i.paymentDue).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                }).replace(/\./g, '')}</p>
                                <span className="md:hidden font-semibold text-[15px]">£ {(i.totalAmount / 100).toFixed(2)}</span>
                                <p className="hidden md:block text-end text-[#858BB2] dark:text-white">{i.clientInfo.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-20 justify-between">
                            <p className=" md:hidden text-[#858BB2] dark:text-white text-end">{i.clientInfo.name}</p>
                            <span className="hidden md:block font-semibold text-[15px]">£ {(i.totalAmount / 100).toFixed(2)}</span>
                            <p
                                aria-label={i.status}
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