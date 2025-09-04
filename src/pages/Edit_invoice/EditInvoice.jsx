import InvoiceForm from "../../components/Invoice_form/InvoiceForm"
import { useParams } from "react-router-dom"
import data from "../../data/data.json"
import BackButton from "../../components/Back_button/BackButton"

export default function EditInvoice() {

    const pathname = useParams();

    const item = data.find((i) => i.id === pathname.id);

    return (
        <section className="bg-white dark:bg-[var(--custom-color-12)]">
            <BackButton />
            <InvoiceForm item={item} mode={"edit"} />
        </section>
    )
}