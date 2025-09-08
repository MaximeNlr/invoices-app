import data from "../../data/data.json"
import { useParams } from "react-router-dom";
import { useState } from "react";
import BackButton from "../../components/Back_button/BackButton";
import { FaCircle } from "react-icons/fa6";
import DeleteButton from "../../components/Delete_button/DeleteButton";
import EditButton from "../../components/Edit_button/EditButton";
import PaidButton from "../../components/Paid_button/PaidButton";
import useIsMobile from "../../hooks/isMobile";
import InvoiceForm from "../../components/Invoice_form/InvoiceForm";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";


export default function InvoiceView() {

    const pathname = useParams();
    const item = data.find((i) => i.id === pathname.id)
    const isMobile = useIsMobile()
    const [isActive, setIsActive] = useState(false);

    const statuesClass = {
        pending: "text-[#FF8F00] bg-[#FF8F00]/20",
        paid: "text-[#33D69F] bg-[#33D69F]/20",
        draft: "text-white bg-black/20",
    }

    return (
        <article className="flex flex-col bg-[var(--custom-color-11)] dark:bg-[var(--custom-color-12)] lg:px-80 lg:h-screen">
            <BackButton />
            <div className="flex flex-row items-center justify-between mx-5 bg-white dark:bg-[var(--custom-dark-color)] h-24 px-5 rounded-lg mb-10 lg:min-w-[600px]">
                <div className="flex flex-row items-center justify-between md:justify-normal gap-5 w-full lg:w-fit">
                    <p className="text-[var(--custom-color-7)] dark:text-[var(--custom-color-6)]">Status</p>
                    <p
                        className={`flex justify-center items-center gap-2 px-5 py-2 text-center rounded-lg font-semibold w-[104px] h-[40px] ${statuesClass[item.status]}`}
                    >
                        <span className="text-[0.6rem]"><FaCircle /></span>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </p>
                </div>
                {!isMobile &&
                    <div className="md:flex flex-row justify-normal gap-2 px-5 py-5 mt-0">
                        <button
                            onClick={() => setIsActive(true)}
                            className="bg-[#F9FAFE] text-[var(--custom-color-7)] hover:bg-[var(--custom-color-5)]
                             transition-colors font-semibold rounded-3xl px-8 py-3 cursor-pointer"
                        >
                            Edit
                        </button>
                        <DeleteButton id={item.id} />
                        <PaidButton id={item.id} />
                    </div>
                }
            </div>
            <section className="flex flex-col gap-10 bg-white dark:bg-[var(--custom-dark-color)] dark:text-white mx-5 px-5 lg:px-14 lg:py-10 py-5 rounded-lg lg:min-w-[600px]">
                <div className="md:flex flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold"><span className="text-[#858BB2]">#</span>{item.id}</h3>
                        <p>{item.description}</p>
                    </div>
                    <address className="not-italic">
                        {Object.values(item.senderAddress).map((val, i) => (
                            <p key={i}>{val}</p>
                        ))}
                    </address>
                </div>
                <div className="flex flex-col md:flex-row justify-between pr-5">
                    <dl className="flex flex-col justify-between md:w-1/3">
                        <div>
                            <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Invoice Date</dt>
                            <dd className="text-[15px] font-bold">{new Date(item.createdAt).toLocaleDateString('fr-FR').replace('/', ' ')}</dd>
                        </div>
                        <div>
                            <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Payment Due</dt>
                            <dd className="text-[15px] font-bold">{item.paymentDue}</dd>
                        </div>
                    </dl>
                    <div className="md:w-1/3">
                        <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Bill To</dt>
                        <dd className="text-[15px] font-bold pb-1">{item.clientName}</dd>
                        <address className="not-italic">
                            {Object.values(item.clientAddress).map((val, i) => (
                                <p key={i}>{val}</p>
                            ))}
                        </address>
                    </div>
                    <dl className="md:w-1/3 mt-5 md:mt-0">
                        <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Sent To</dt>
                        <dd className="text-[15px] font-bold">{item.clientEmail}</dd>
                    </dl>
                </div>
                <div className="flex flex-col bg-[#F9FAFE] dark:bg-[var(--custom-color-4)] rounded-lg md:mt-10">
                    <div className="hidden md:flex flex-row justify-between px-5 py-3 text-[#858BB2] text-[13px] font-medium">
                        <span className="w-2/5">Item Name</span>
                        <span className="w-1/5 text-center">Qty</span>
                        <span className="w-1/5 text-right">Price</span>
                        <span className="w-1/5 text-right">Total</span>
                    </div>
                    <div className="flex flex-col px-5">
                        {item.items.map((i) => (
                            <div key={i.name} className="flex flex-row items-center justify-between py-3">
                                <span className="w-2/5 font-bold">{i.name}</span>
                                <span className="w-1/5 text-center">{i.quantity}</span>
                                <span className="w-1/5 text-right">£ {i.price}</span>
                                <span className="w-1/5 text-right font-bold">£ {i.total}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-between bg-[var(--custom-header-color)] dark:bg-[var(--custom-color-12)] text-white px-5 py-5 rounded-b-lg">
                        <dt>Grand Total</dt>
                        <dd className="font-bold text-2xl">£ {item.total}</dd>
                    </div>
                </div>
            </section>
            {isMobile &&
                <div className="flex flex-row justify-between bg-white dark:bg-[var(--custom-dark-color)] px-5 py-5 mt-10 w-full">
                    <EditButton id={item.id} />
                    <DeleteButton id={item.id} />
                    <PaidButton id={item.id} />
                </div>
            }
            <AnimatePresence>
                {isActive &&
                    <div className="fixed inset-0 bg-black/50 w-full overflow-scroll">
                        <motion.div
                            key="invoice-modal"
                            initial={{ x: -800 }}
                            animate={{ x: 0 }}
                            exit={{ x: -800 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute flex flex-row items-baseline bg-white dark:bg-[var(--custom-color-12)] pl-40 pt-20 top-0"
                        >
                            <InvoiceForm item={item} mode="edit" />
                            <button
                                onClick={() => setIsActive(false)}
                                className="text-3xl mr-10 text-[var(--custom-color-7)] hover:text-black transition-colors"
                            >
                                <IoMdClose />
                            </button>
                        </motion.div>
                    </div >
                }
            </AnimatePresence>
        </article >
    )
}