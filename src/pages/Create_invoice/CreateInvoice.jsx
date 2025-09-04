import BackButton from "../../components/Back_button/BackButton"
import InvoiceForm from "../../components/Invoice_form/InvoiceForm"
export default function CreateInvoice() {
    return (
        <section>
            <BackButton />
            <InvoiceForm
                mode={'create'}
            />
        </section>
    )
}