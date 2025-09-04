import Filter from "../../components/filter/filter"
import NewButton from "../../components/New_button/NewButton"
import InvoiceComp from "../../components/invoiceComp/InvoiceComp"

export default function Home() {

    return (
        <section className="h-fit pb-32 bg-[var(--custom-color-11)] dark:bg-[var(--custom-color-12)] lg:px-80">
            <div className="flex flex-row items-center justify-between px-5 py-5">
                <h1 className="font-bold dark:text-white text-2xl">Invoices</h1>
                <div className="flex flex-row items-center gap-5">
                    <Filter />
                    <NewButton />
                </div>
            </div>
            <InvoiceComp />
        </section>
    )
}