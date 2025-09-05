import Filter from "../../components/filter/Filter"
import NewButton from "../../components/New_button/NewButton"
import InvoiceComp from "../../components/invoiceComp/InvoiceComp"
import InvoiceForm from "../../components/Invoice_form/InvoiceForm";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Home() {

    const [isActive, setIsActive] = useState(false);

    return (
        <section className="h-fit pb-32 bg-[var(--custom-color-11)] dark:bg-[var(--custom-color-12)] lg:px-80">
            <div className="flex flex-row items-center justify-between px-5 py-5">
                <h1 className="font-bold dark:text-white text-2xl">Invoices</h1>
                <div className="flex flex-row items-center gap-5">
                    <Filter />
                    <NewButton setIsActive={setIsActive} />
                </div>
            </div>
            <InvoiceComp />
            {isActive &&
                <div className="fixed inset-0 bg-black/50 w-full overflow-scroll">
                    <div className="absolute flex flex-row items-baseline bg-white dark:bg-[var(--custom-color-12)] pl-40 pt-20 top-0" >
                        <InvoiceForm mode="create" />
                        <button
                            onClick={() => setIsActive(false)}
                            className="text-3xl mr-10 text-[var(--custom-color-7)] hover:text-black transition-colors"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                </div >
            }
        </section>
    )
}