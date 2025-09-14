import data from "../../data/data.json"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../../components/Back_button/BackButton";
import { FaCircle } from "react-icons/fa6";
import DeleteButton from "../../components/Delete_button/DeleteButton";
import EditButton from "../../components/Edit_button/EditButton";
import PaidButton from "../../components/Paid_button/PaidButton";
import useIsMobile from "../../hooks/isMobile";
import InvoiceForm from "../../components/Invoice_form/InvoiceForm";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { Toast } from "../../components/Toast/Toast";


export default function InvoiceView() {

    const { id } = useParams();
    const location = useLocation();
    const { toast, showToast } = useToast();

    const isMobile = useIsMobile()
    const [isActive, setIsActive] = useState(false);
    const [invoice, setInvoice] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false);
    const [statusIsChanged, setStatusIsChanged] = useState(false);

    const statuesClass = {
        pending: "text-[#FF8F00] bg-[#FF8F00]/20",
        paid: "text-[#33D69F] bg-[#33D69F]/20",
        draft: "text-white bg-black/20",
    }

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: { 'Content-type': "application/json" }
                };
                const response = await fetch(`http://localhost:3000/api/invoice/${id}`, options);
                const data = await response.json();
                setInvoice(data.invoice)
            } catch (error) {
                console.log(error)
            }
        }
        fetchInvoice();

    }, [id, isUpdated, statusIsChanged])

    useEffect(() => {
        if (location.state?.toast) {
            const { message, type, extra } = location.state?.toast
            showToast(message, type, extra);
        }
        window.history.replaceState({}, document.title);

    }, [location])

    if (!invoice) return <p>...loading</p>

    return (
        <article className="flex flex-col bg-[var(--custom-color-11)] dark:bg-[var(--custom-color-12)] lg:px-80">
            <BackButton />
            <Toast toast={toast} />
            <div className="flex flex-row items-center justify-between mx-5 bg-white dark:bg-[var(--custom-dark-color)] h-24 px-5 rounded-lg mb-10 lg:min-w-[600px]">
                <div className="flex flex-row items-center justify-between md:justify-normal gap-5 w-full lg:w-fit">
                    <p className="text-[var(--custom-color-7)] dark:text-[var(--custom-color-6)]">Status</p>
                    <p
                        className={`flex justify-center items-center gap-2 px-5 py-2 text-center rounded-lg font-semibold w-[104px] h-[40px] ${statuesClass[invoice.status]}`}
                    >
                        <span className="text-[0.6rem]"><FaCircle /></span>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
                        <DeleteButton id={invoice.invoiceId} />
                        <PaidButton id={invoice.invoiceId} showToast={showToast} setStatusIsChanged={setStatusIsChanged} />
                    </div>
                }
            </div>
            <section className="flex flex-col gap-10 bg-white dark:bg-[var(--custom-dark-color)] dark:text-white mx-5 px-5 lg:px-14 lg:py-10 py-5 rounded-lg lg:min-w-[600px]">
                <div className="md:flex flex-row justify-between">
                    <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold"><span className="text-[#858BB2]">#</span>{invoice.invoiceId}</h3>
                        <p>{invoice.invoiceInfo.description}</p>
                    </div>
                    <address className="not-italic">
                        {Object.values(invoice.senderInfo).map((val, i) => (
                            <p key={i}>{val}</p>
                        ))}
                    </address>
                </div>
                <div className="flex flex-col md:flex-row justify-between pr-5">
                    <dl className="flex flex-col justify-between md:w-1/3 gap-8">
                        <div>
                            <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Invoice Date</dt>
                            <dd className="text-[15px] font-bold">
                                {new Date(invoice.invoiceInfo.date).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                }).replace(/\./g, '')}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Payment Due</dt>
                            <dd className="text-[15px] font-bold">
                                {new Date(invoice.paymentDue).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                }).replace(/\./g, '')}</dd>
                        </div>
                    </dl>
                    <div className="flex flex-col absolute right-10 md:w-1/3 md:relative md:right-0">
                        <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Bill To</dt>
                        <dd className="text-[15px] font-bold pb-1">{invoice.clientInfo.name}</dd>
                        <address className="not-italic">
                            {Object.keys(invoice.clientInfo).filter(key => key !== "name" && key !== "email").map((key, i) => (
                                <p key={i}>{invoice.clientInfo[key]}</p>
                            ))}
                        </address>
                    </div>
                    <dl className="md:w-1/3 mt-5 md:mt-0">
                        <dt className="text-[13px] text-[#858BB2] font-medium pb-2">Sent To</dt>
                        <dd className="text-[15px] font-bold">{invoice.clientInfo.email}</dd>
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
                        {invoice.itemInfo.map((i) => (
                            <div
                                key={i.invoiceId}
                                className="flex flex-col md:flex-row items-start md:items-center justify-between py-3"
                            >
                                <span className="md:w-2/5 font-bold">{i.name}</span>
                                <div className="flex flex-row gap-2 mt-2 md:mt-0 md:w-3/5 justify-between text-[var(--custom-color-6)] md:text-white font-semibold w-full">
                                    <div className="md:flex flex-row justify-between">
                                        <span className="md:w-1/5 md:text-center">{i.quantity} <span className="md:hidden">x</span></span>
                                        <span className="md:w-1/5 md:text-right md:whitespace-nowrap">£ {i.price}</span>
                                    </div>
                                    <span className="md:w-1/5 md:text-right font-bold md:whitespace-nowrap text-white">£ {i.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row justify-between bg-[var(--custom-header-color)] dark:bg-[var(--custom-color-12)] text-white px-5 py-5 rounded-b-lg">
                        <dt>Grand Total</dt>
                        <dd className="font-bold text-2xl">£ {invoice.totalAmount}</dd>
                    </div>
                </div>

            </section>
            {isMobile &&
                <div className="flex flex-row justify-between bg-white dark:bg-[var(--custom-color-3)] px-5 py-5 mt-10 w-full">
                    <EditButton id={invoice.invoiceId} />
                    <DeleteButton id={invoice.invoiceId} />
                    <PaidButton id={invoice.invoiceId} showToast={showToast} setStatusIsChanged={setStatusIsChanged} />
                </div>
            }
            <AnimatePresence>
                {isActive &&
                    <div className="fixed inset-0 md:top-[72px] lg:top-0 bg-black/50 w-full overflow-scroll">
                        <motion.div
                            key="invoice-modal"
                            initial={{ x: -800 }}
                            animate={{ x: 0 }}
                            exit={{ x: -800 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute flex flex-row items-baseline bg-white dark:bg-[var(--custom-color-12)] lg:pl-40 lg:pr-10 pt-20 top-0"
                        >
                            <InvoiceForm
                                invoice_id={invoice.invoiceId}
                                mode="edit"
                                setIsActive={setIsActive}
                                showToast={showToast}
                                setIsUpdated={setIsUpdated}
                            />
                        </motion.div>
                    </div >
                }
            </AnimatePresence>
        </article >
    )
}