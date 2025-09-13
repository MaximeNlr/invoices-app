import Filter from "../../components/filter/Filter"
import NewButton from "../../components/New_button/NewButton"
import InvoiceComp from "../../components/invoiceComp/InvoiceComp"
import InvoiceForm from "../../components/Invoice_form/InvoiceForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Toast } from "../../components/Toast/Toast";
import useToast from "../../hooks/useToast";

export default function Home() {

    const location = useLocation();
    const { toast, showToast } = useToast();

    const [isActive, setIsActive] = useState(false);
    const [invoicesData, setInvoicesData] = useState([]);
    const [filteredInvoice, setFilteredInvoice] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [filterTags, setFilterTags] = useState({
        draft: false,
        paid: false,
        pending: false
    });

    useEffect(() => {

        const hasActiveFilter = Object.values(filterTags).some(Boolean);
        setFilteredInvoice(hasActiveFilter
            ? invoicesData.filter((i) => filterTags[i.status])
            : invoicesData);

    }, [filterTags])

    useEffect(() => {
        if (location.state?.toast) {
            const { message, type, extra } = location.state?.toast
            showToast(message, type, extra);
        }
        window.history.replaceState({}, document.title);

    }, [location])

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' }
                }
                const response = await fetch('http://localhost:3000/api/invoices', options);
                const data = await response.json();
                setInvoicesData(data.data)
            } catch (error) {

            }
        }
        fetchInvoices();
    }, [isCreated])

    return (
        <section className="h-fit pb-32 lg:px-80 md:pt-10">
            <Toast toast={toast} />
            <div className="flex flex-row items-center justify-between px-5 py-5 lg:py-10 lg:min-w-[800px]">
                <div>
                    <h1 className="font-bold dark:text-white text-2xl md:text-4xl">Invoices</h1>
                    {invoicesData.length > 0 ?
                        <p className="dark:text-[var(--custom-color-5)] md:flex flexrow gap-1.5"> <span className="hidden md:flex">There are </span>{invoicesData.length} <span className="hidden md:flex">total</span> invoices</p>
                        :
                        <p className="dark:text-[var(--custom-color-5)]">No invoices</p>
                    }
                </div>
                <div className="flex flex-row items-center gap-5 lg:gap-10">
                    <Filter filterTags={filterTags} setFilterTags={setFilterTags} />
                    <NewButton setIsActive={setIsActive} />
                </div>
            </div>
            <InvoiceComp invoices={invoicesData} />
            <AnimatePresence>
                {isActive && (
                    <div className="fixed inset-0 md:top-[72px] lg:top-0 bg-black/50 w-full overflow-scroll">
                        <motion.div
                            key="invoice-modal"
                            initial={{ x: -800 }}
                            animate={{ x: 0 }}
                            exit={{ x: -800 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute lg:top-0 flex flex-row items-start bg-white dark:bg-[var(--custom-color-12)] md:pl-5 lg:pl-40 lg:pr-10 pt-20"
                        >
                            <InvoiceForm
                                mode="create"
                                setIsActive={setIsActive}
                                showToast={showToast}
                                setIsCreated={setIsCreated}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}