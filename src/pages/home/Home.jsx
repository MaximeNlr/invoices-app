import Filter from "../../components/filter/Filter"
import NewButton from "../../components/New_button/NewButton"
import InvoiceComp from "../../components/invoiceComp/InvoiceComp"
import InvoiceForm from "../../components/Invoice_form/InvoiceForm";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import data from "../../data/data.json"
import { motion, AnimatePresence } from "motion/react";

export default function Home() {

    const [isActive, setIsActive] = useState(false);
    const [filteredInvoice, setFilteredInvoice] = useState([]);
    const [filterTags, setFilterTags] = useState({
        draft: false,
        paid: false,
        pending: false
    });

    useEffect(() => {

        const hasActiveFilter = Object.values(filterTags).some(Boolean);
        setFilteredInvoice(hasActiveFilter
            ? data.filter((i) => filterTags[i.status])
            : data);

    }, [filterTags])

    return (
        <section className="h-fit pb-32 bg-[var(--custom-color-11)] dark:bg-[var(--custom-color-12)] lg:px-80">
            <div className="flex flex-row items-center justify-between px-5 py-5 lg:py-10 lg:min-w-[600px]">
                <h1 className="font-bold dark:text-white text-2xl">Invoices</h1>
                <div className="flex flex-row items-center gap-5 lg:gap-10">
                    <Filter filterTags={filterTags} setFilterTags={setFilterTags} />
                    <NewButton setIsActive={setIsActive} />
                </div>
            </div>
            <InvoiceComp invoices={filteredInvoice} />
            <AnimatePresence>
                {isActive && (
                    <div className="fixed inset-0 bg-black/50 w-full overflow-scroll">
                        <motion.div
                            key="invoice-modal"
                            initial={{ x: -800 }}
                            animate={{ x: 0 }}
                            exit={{ x: -800 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            className="absolute flex flex-row items-start bg-white dark:bg-[var(--custom-color-12)] pl-40 pt-20 top-0"
                        >
                            <InvoiceForm mode="create" />
                            <button
                                onClick={() => setIsActive(false)}
                                className="text-3xl mr-10 text-[var(--custom-color-7)] hover:text-black transition-colors"
                            >
                                <IoMdClose />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}