import { useState, useEffect } from "react"
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useIsMobile from "../../hooks/isMobile";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function InvoiceForm({ invoice_id, mode, setIsActive, showToast, setIsCreated, setIsUpdated }) {

    const isMobile = useIsMobile();
    const { id } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState({});
    const [formData, setFormData] = useState(mode === "create"
        ? {
            senderInfo: { address: "", city: "", postCode: "", country: "" },
            clientInfo: { name: "", email: "", address: "", city: "", postCode: "", country: "" },
            itemInfo: [{ name: "", quantity: 0, price: 0, total: 0 }],
            invoiceInfo: { terms: "", date: "", description: "" },
            totalAmount: 0,
            paymentDue: "",
            status: ""
        }
        : null);
    let finalId = id || invoice_id;

    const validateForm = (formData) => {

        let newErrors = {}

        Object.keys(formData.senderInfo).forEach((key) => {
            if (!formData.senderInfo[key]) {
                newErrors[`sender${key}`] = `${key} is required`
            }
        })

        Object.keys(formData.clientInfo).forEach((key) => {
            if (!formData.clientInfo[key]) {
                newErrors[`client${key}`] = `Client's ${key} is required`
            }
        })

        Object.keys(formData.invoiceInfo).forEach((key) => {
            if (!formData.invoiceInfo[key]) {
                newErrors[key] = `${key} is required`
            }
        })

        formData.itemInfo.forEach((item, index) => {
            if (item.name.trim() === "") {
                newErrors[`item_${index}`] = "All fields of the item must be filled";
            }
            if (item.quantity <= 0) {
                newErrors[`item_${index}`] = "All fields of the item must be filled";
            }
            if (item.price <= 0) {
                newErrors[`item_${index}`] = "All fields of the item must be filled";
            }
        });

        return newErrors
    };
    useEffect(() => {
        const fetchInvoice = async () => {
            if (!finalId) {
                return
            }
            try {
                const options = {
                    method: 'GET',
                    headers: { 'Content-type': "application/json" }
                };
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invoice/${finalId}`, options);
                const data = await response.json();
                if (data.success) {
                    setFormData({
                        senderInfo: data.invoice.senderInfo,
                        clientInfo: data.invoice.clientInfo,
                        itemInfo: data.invoice.itemInfo,
                        invoiceInfo: data.invoice.invoiceInfo,
                        totalAmount: data.invoice.totalAmount,
                        paymentDue: data.invoice.paymentDue,
                        status: data.invoice.status
                    })
                    console.log(data.invoice);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchInvoice();

    }, [finalId])

    const updateItem = (index, field, value) => {
        const newItems = [...formData.itemInfo];
        newItems[index] = {
            ...newItems[index],
            [field]: value,
        };
        if (field === "quantity" || field === "price") {
            const qty = parseFloat(newItems[index].quantity) || 0;
            const price = parseFloat(newItems[index].price) || 0;
            newItems[index].total = qty * price;
        }
        setFormData(prev => ({ ...prev, itemInfo: newItems }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            itemInfo: [...prev.itemInfo, { name: "", quantity: 0, price: 0, total: 0 }]
        }));
    };

    const removeItem = (index) => {
        const newItems = formData.itemInfo.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, itemInfo: newItems }));
    };

    const createInvoice = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrorMessage(newErrors);
        console.log(newErrors);
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData)
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create/invoice`, options);
            const data = await response.json();
            if (data.success) {
                if (!isMobile) {
                    setIsActive(false);
                    setIsCreated(true);
                    showToast("Invoice Created succefully", "success", data.data.invoiceId);
                } else {
                    navigate("/", { state: { toast: { message: "Invoice Created!", type: "success", extra: data.data.invoiceId } } });
                }

            } else {
                if (!isMobile) {
                    showToast("Error creating invoice", "error", invoice_id)
                }
            }
        } catch (error) {
            showToast("Unexpected error while creating invoice", "error", invoice_id);
        }

    };
    const updateInvoice = async (e, finalId) => {
        e.preventDefault();
        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData)
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/update/invoice/${finalId}`, options);
            const data = await response.json();
            if (data.success) {
                if (!isMobile) {
                    setIsActive(false);
                    setIsUpdated(true);
                    showToast("Invoice Updated", "success", finalId)
                } else {
                    navigate(`/invoice/${finalId}`, { state: { toast: { message: "Invoice Updated!", type: "success", extra: finalId } } });
                }
            } else {
                showToast("Error updating invoice", "error", finalId)
            }
        } catch (error) {
            showToast("Unexpected error while updating invoice", "error", finalId);
        }
    };

    if (!formData && mode === 'edit')
        return (
            <div className="w-[600px]">
                <div className="w-full text-right">
                    <button
                        type="button"
                        onClick={() => setIsActive(false)}
                        className="text-3xl text-[var(--custom-color-7)] hover:text-black transition-colors"
                    >
                        <IoMdClose />
                    </button>
                </div>
                <Loading />
            </div>);

    return (
        <form onSubmit={mode === 'create' ? (e) => createInvoice(e) : (e) => updateInvoice(e, finalId)}>
            <div className="flex flex-col gap-5 px-5 pb-24 bg-white dark:bg-[var(--custom-color-12)] lg:pl-40 lg:pr-10">
                <div className="md:flex flex-row justify-between">
                    {mode === "edit" ?
                        <h1
                            className="font-bold dark:text-white text-2xl pb-6"
                        >
                            Edit
                            <span className="text-[#858BB2] pl-2">#</span>{finalId}</h1>
                        :
                        <h1 className="font-bold dark:text-white text-2xl pb-6"
                        >
                            New Invoice
                        </h1>
                    }
                    {!isMobile &&
                        <button
                            type="button"
                            onClick={() => setIsActive(false)}
                            className="text-3xl text-[var(--custom-color-7)] hover:text-black transition-colors cursor-pointer"
                        >
                            <IoMdClose />
                        </button>
                    }
                </div>
                <h2 className="text-[var(--custom-color-1)] font-semibold">Bill From</h2>
                <legend className="flex flex-col">
                    <div className="flex flex-row justify-between w-full">
                        <label htmlFor="address">Street Address</label>
                        <span className="text-[13px] text-red-700">{errorMessage.senderaddress}</span>
                    </div>
                    <input
                        type="text"
                        value={formData.senderInfo.address}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                senderInfo: { ...prev.senderInfo, address: e.target.value }
                            }))
                        }
                    />
                </legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
                    <legend className="flex flex-col">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="city">City</label>
                            <span className="text-[13px] text-red-700">{errorMessage.sendercity}</span>
                        </div>
                        <input
                            type="text"
                            value={formData.senderInfo.city}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    senderInfo: { ...prev.senderInfo, city: e.target.value }
                                }))
                            }
                            className="w-full"
                        />
                    </legend>
                    <legend className="flex flex-col">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="postCode">Post Code</label>
                            <span className="text-[13px] text-red-700">{errorMessage.senderpostCode}</span>
                        </div>
                        <input
                            type="text"
                            value={formData.senderInfo.postCode}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    senderInfo: { ...prev.senderInfo, postCode: e.target.value }
                                }))
                            }
                            className="w-full"
                        />
                    </legend>
                    <legend className="flex flex-col col-span-2 md:col-auto">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="country">Country</label>
                            <span className="text-[13px] text-red-700">{errorMessage.sendercountry}</span>
                        </div>
                        <input
                            type="text"
                            value={formData.senderInfo.country}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    senderInfo: { ...prev.senderInfo, country: e.target.value }
                                }))
                            }
                            className="w-full"
                        />
                    </legend>
                </div>
                <h2 className="text-[var(--custom-color-1)] font-semibold">Bill To</h2>
                <legend className="flex flex-col">
                    <div className="flex flex-row justify-between w-full">
                        <label htmlFor="name">Client's Name</label>
                        <span className="text-[13px] text-red-700">{errorMessage.clientname}</span>
                    </div>
                    <input
                        type="text"
                        value={formData.clientInfo.name}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                clientInfo: { ...prev.clientInfo, name: e.target.value }
                            }))
                        }
                    />
                </legend>
                <legend className="flex flex-col">
                    <div className="flex flex-row justify-between w-full">
                        <label htmlFor="email">Client's Email</label>
                        <span className="text-[13px] text-red-700">{errorMessage.clientemail}</span>
                    </div>
                    <input
                        type="text"
                        name="email"
                        value={formData.clientInfo.email}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                clientInfo: { ...prev.clientInfo, email: e.target.value }
                            }))
                        }
                    />
                </legend>
                <legend className="flex flex-col">
                    <div className="flex flex-row justify-between w-full">
                        <label htmlFor="address">Street Address</label>
                        <span className="text-[13px] text-red-700">{errorMessage.clientaddress}</span>
                    </div>
                    <input
                        type="text"
                        value={formData.clientInfo.address}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                clientInfo: { ...prev.clientInfo, address: e.target.value }
                            }))
                        }
                    />
                </legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    <legend className="flex flex-col">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="city">City</label>
                            <span className="text-[13px] text-red-700">{errorMessage.clientcity}</span>
                        </div>
                        <input
                            type="text"
                            value={formData.clientInfo.city}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    clientInfo: { ...prev.clientInfo, city: e.target.value }
                                }))
                            }
                            className="w-full"
                        />
                    </legend>
                    <legend className="flex flex-col">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="postCode">Post Code</label>
                            <span className="text-[13px] text-red-700">{errorMessage.clientpostCode}</span>
                        </div>
                        <input
                            type="text"
                            value={formData.clientInfo.postCode}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    clientInfo: { ...prev.clientInfo, postCode: e.target.value }
                                }))
                            }
                            className="w-full"
                        />
                    </legend>
                    <legend className="flex flex-col col-span-2 md:col-auto">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="country">Country</label>
                            <span className="text-[13px] text-red-700">{errorMessage.clientcountry}</span>
                        </div>
                        <input
                            type="text"
                            value={formData.clientInfo.country}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    clientInfo: { ...prev.clientInfo, country: e.target.value }
                                }))
                            }
                        />
                    </legend>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:w-full lg:gap-10">
                    <legend className="flex flex-col lg:w-full">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="invoiceDate">Invoice Date</label>
                            <span className="text-[13px] text-red-700">{errorMessage.date}</span>
                        </div>
                        <input
                            type="date"
                            name="date"
                            value={formData.invoiceInfo.date ? new Date(formData.invoiceInfo.date).toISOString().split("T")[0] : ""}
                            onChange={(e) =>
                                setFormData(prev =>
                                    ({ ...prev, invoiceInfo: { ...prev.invoiceInfo, [e.target.name]: e.target.value } }))}
                        />
                    </legend>
                    <legend className="flex flex-col pt-5 lg:pt-0 lg:w-full">
                        <div className="flex flex-row justify-between w-full">
                            <label htmlFor="paymentTerms">Payment Terms</label>
                            <span className="text-[13px] text-red-700">{errorMessage.terms}</span>
                        </div>
                        <select
                            id="paymentTerms"
                            value={formData.invoiceInfo.terms}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    invoiceInfo: { ...prev.invoiceInfo, terms: e.target.value }
                                }))
                            }
                            className="border rounded px-2 py-1 min-h-[48px]"
                        >
                            <option value="">Select payment terms</option>
                            <option value="1">Net 1 Day</option>
                            <option value="7">Net 7 Days</option>
                            <option value="14">Net 14 Days</option>
                            <option value="30">Net 30 Days</option>
                            <option value="60">Net 60 Days</option>
                        </select>
                    </legend>
                </div>
                <legend className="flex flex-col">
                    <div className="flex flex-row justify-between w-full">
                        <label htmlFor="description">Project Description</label>
                        <span className="text-[13px] text-red-700">{errorMessage.description}</span>
                    </div>
                    <input
                        type="text"
                        value={formData.invoiceInfo.description}
                        onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                invoiceInfo: { ...prev.invoiceInfo, description: e.target.value }
                            }))
                        }
                    />
                </legend>
                <h2 className="text-[#858BB2] font-semibold">Item List</h2>
                <div>
                    {formData.itemInfo.map((info, index) => (
                        <div
                            key={index}
                        >
                            <span className="text-[13px] text-red-700 text-right">{errorMessage[`item_${index}`]}</span>
                            <div className="flex flex-col md:flex-row gap-10 pt-5">

                                <legend className="flex flex-col">

                                    <label htmlFor="itemName">Item Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={info.name}
                                        onChange={(e) => updateItem(index, "name", e.target.value)}
                                    />
                                </legend>
                                <div className="flex flex-row items-center gap-5 w-full">
                                    <legend className="flex flex-col w-1/4">
                                        <label htmlFor="quantity">Qty</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={info.quantity}
                                            onChange={(e) => updateItem(index, "quantity", e.target.value)}
                                        />
                                    </legend>
                                    <legend className="flex flex-col w-1/4">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={info.price}
                                            onBlur={() => {
                                                const parsed = parseFloat(info.price.replace(",", "."));
                                                if (!isNaN(parsed)) {
                                                    updateItem(index, "price", (parsed).toFixed(2));
                                                }
                                            }}
                                            onChange={(e) => updateItem(index, "price", e.target.value)}
                                        />
                                    </legend>
                                    <dl className="flex flex-col w-1/4">
                                        <dt className="text-[var(--custom-color-7)] dark:text-[var(--custom-color-6)] text-[13px]">Total</dt>
                                        <dd className="text-[#858BB2] font-semibold">{info.total}</dd>
                                    </dl>
                                    <button
                                        onClick={() => removeItem(index)}
                                        className="text-[var(--custom-color-6)] hover:text-[var(--custom-color-9)] transition-colors w-10 cursor-pointer"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addItem}
                    className="bg-[#F9FAFE] text-[#858BB2] rounded-3xl py-2 font-semibold w-full mt-5 cursor-pointer"
                >
                    + Add New Item
                </button>
            </div>
            {mode === 'edit' ?
                <div className="flex flex-row justify-end gap-2 shadow-[0px_21px_55px_21px_#757575]
                                dark:shadow-none py-5 px-5 sticky bottom-0 w-full bg-white dark:bg-[var(--custom-color-12)]">
                    {!isMobile ?
                        <button
                            onClick={() => setIsActive(false)}
                            type="button"
                            className="bg-[#F9FAFE] text-[var(--custom-color-7)]  hover:bg-[var(--custom-color-5)] dark:bg-[var(--custom-color-4)]
                                dark:text-[var(--custom-color-5)] dark:hover:bg-[#F9FAFE] cursor-pointer
                                dark:hover:text-[var(--custom-color-7)] rounded-3xl px-5 py-3 transition-colors"
                        >
                            Cancel
                        </button>
                        :
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="bg-[#F9FAFE] text-[var(--custom-color-7)]  hover:bg-[var(--custom-color-5)] dark:bg-[var(--custom-color-4)]
                                    dark:text-[var(--custom-color-5)] dark:hover:bg-[#F9FAFE] cursor-pointer
                                    dark:hover:text-[var(--custom-color-7)] rounded-3xl px-5 py-3 transition-colors"
                        >
                            Cancel
                        </button>
                    }
                    <button
                        className="bg-[var(--custom-color-1)] hover:bg-[var(--custom-color-2)] cursor-pointer
                            transition-colors rounded-3xl px-6 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap"
                    >
                        Save Changes
                    </button>
                </div>
                :
                <div
                    className="flex flex-row md:justify-between gap-2 shadow-[0px_21px_55px_21px_#757575]
                    dark:shadow-none py-5 px-5 whitespace-nowrap sticky bottom-0 w-full bg-white dark:bg-[var(--custom-color-12)] lg:pl-40"
                >
                    {!isMobile ?
                        <button
                            onClick={() => setIsActive(false)}
                            type="button"
                            className="bg-[#F9FAFE] text-[var(--custom-color-7)]  hover:bg-[var(--custom-color-5)] dark:bg-[var(--custom-color-4)]
                    dark:text-[var(--custom-color-5)] dark:hover:bg-[#F9FAFE] cursor-pointer
                    dark:hover:text-[var(--custom-color-7)] rounded-3xl px-5 py-3 transition-colors"
                        >
                            Discard
                        </button>
                        :
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="bg-[#F9FAFE] text-[var(--custom-color-7)]  hover:bg-[var(--custom-color-5)] dark:bg-[var(--custom-color-4)]
                        dark:text-[var(--custom-color-5)] dark:hover:bg-[#F9FAFE] cursor-pointer
                        dark:hover:text-[var(--custom-color-7)] rounded-3xl px-5 py-3 transition-colors"
                        >
                            Discard
                        </button>
                    }
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, status: "draft" }))}
                            className="bg-[#373B53] rounded-3xl text-[var(--custom-color-6)] hover:bg-[var(--custom-color-8)] dark:text-[var(--custom-color-5)]
                             dark:hover:bg-[var(--custom-color-3)] px-3 py-3 w-fit transition-colors cursor-pointer"
                        >
                            Save as Draft
                        </button>
                        <button
                            disabled={!validateForm}
                            onClick={() => setFormData(prev => ({ ...prev, status: "pending" }))}
                            className={`bg-[var(--custom-color-1)] transition-colors rounded-3xl px-3 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap
                                ${validateForm === true ? 'hover:bg-[var(--custom-color-2)] cursor-pointer' : 'cursor-not-allowed opacity-50 hover:bg-[var(--custom-color-1)]'}
                                `}
                        >
                            Save & Send
                        </button>
                    </div>
                </div>
            }
        </form>
    )
}