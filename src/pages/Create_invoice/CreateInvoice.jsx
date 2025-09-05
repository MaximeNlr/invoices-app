import BackButton from "../../components/Back_button/BackButton"
import InvoiceForm from "../../components/Invoice_form/InvoiceForm"
export default function CreateInvoice() {
    return (
        <section className="bg-white dark:bg-[var(--custom-color-12)]">
            <BackButton />
            <InvoiceForm
                mode={'create'}
            />
        </section>
    )
}