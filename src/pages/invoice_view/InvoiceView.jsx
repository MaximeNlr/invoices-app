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


export default function InvoiceView() {

    const pathname = useParams();
    const item = data.find((i) => i.id === pathname.id)
    const isMobile = useIsMobile()
    const [isActive, setIsActive] = useState(false);
    console.log(isMobile);


    const statuesClass = {
        pending: "text-[#FF8F00] bg-[#FF8F00]/20",
        paid: "text-[#33D69F] bg-[#33D69F]/20",
        draft: "text-white bg-black/20",
    }

    return (
        <article className="flex flex-col bg-[var(--custom-color-11)] dark:bg-[var(--custom-color-12)] lg:px-80 lg:h-screen">
            <BackButton />
            <div className="flex flex-row items-center justify-between mx-5 bg-white dark:bg-[var(--custom-dark-color)] h-24 px-5 rounded-lg mb-10">
                <div className="flex flex-row items-center justify-between lg:justify-normal gap-5 w-full lg:w-fit">
                    <p className="text-[13px] text-[#858BB2]">Status</p>
                    <p
                        className={`flex justify-center items-center gap-2 px-5 py-2 text-center rounded-lg font-semibold w-[104px] h-[40px] ${statuesClass[item.status]}`}
                    >
                        <span className="text-[0.6rem]"><FaCircle /></span>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </p>
                </div>
                {!isMobile &&
                    <div className="lg:flex flex-row justify-normal gap-2 px-5 py-5 mt-0">
                        <button
                            onClick={() => setIsActive(true)}
                            className="bg-[#F9FAFE] text-[var(--custom-color-7)] hover:bg-[var(--custom-color-5)] transition-colors font-semibold rounded-3xl px-8 py-3 cursor-pointer"
                        >
                            Edit
                        </button>
                        <DeleteButton id={item.id} />
                        <PaidButton id={item.id} />
                    </div>
                }
            </div>
            <section className="flex flex-col gap-10 bg-white dark:bg-[var(--custom-dark-color)] dark:text-white mx-5 px-5 lg:px-14 lg:py-10 py-5 rounded-lg">
                <div>
                    <h3 className="font-semibold"><span className="text-[#858BB2]">#</span>{item.id}</h3>
                    <p className="text-[#858BB2]">{item.description}</p>
                </div>
                <address className="">
                    {Object.values(item.senderAddress).map((val, i) => (
                        <p key={i} className="text-[#858BB2]">{val}</p>
                    ))}
                </address>
                <div className="flex flex-row justify-between pr-5">
                    <dl className="flex flex-col justify-between">
                        <div>
                            <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Invoice Date</dt>
                            <dd className="text-[15px] font-bold">{new Date(item.createdAt).toLocaleDateString('fr-FR').replace('/', ' ')}</dd>
                        </div>
                        <div>
                            <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Payment Due</dt>
                            <dd className="text-[15px] font-bold">{item.paymentDue}</dd>
                        </div>
                    </dl>
                    <div>
                        <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Bill To</dt>
                        <dd className="text-[15px] font-bold pb-1">{item.clientName}</dd>
                        <address>
                            {Object.values(item.clientAddress).map((val, i) => (
                                <p
                                    key={i}
                                    className="text-[#858BB2]"
                                >
                                    {val}
                                </p>
                            ))}
                        </address>
                    </div>
                </div>
                <dl>
                    <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Sent To</dt>
                    <dd className="text-[15px] font-bold">{item.clientEmail}</dd>
                </dl>
                <div className="flex flex-col bg-[#F9FAFE] dark:bg-[var(--custom-color-4)] rounded-lg">
                    <div className="flex flex-col gap-5 px-5 py-5">
                        {item.items.map((i) => (
                            <div
                                key={i.name}
                                className="flex flex-row items-center justify-between"
                            >
                                <dl>
                                    <dt className="text-[15px] font-bold">{i.name}</dt>
                                    <dd className="text-[13px] text-[#858BB2] font-bold"><span>x {i.quantity}</span> £ {i.price}</dd>
                                </dl>
                                <p className="text-[15px] font-bold">£ {i.total}</p>
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
            {isActive &&
                <div className="fixed inset-0 bg-black/50 w-full overflow-scroll">
                    <div className="absolute flex flex-row items-baseline bg-white dark:bg-[var(--custom-color-12)] pl-40 pt-20 top-0" >
                        <InvoiceForm item={item} mode="edit" />
                        <button
                            onClick={() => setIsActive(false)}
                            className="text-3xl mr-10 text-[var(--custom-color-7)] hover:text-black transition-colors"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                </div >
            }
        </article >
    )
}