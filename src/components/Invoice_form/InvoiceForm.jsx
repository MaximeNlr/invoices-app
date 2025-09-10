import { useState } from "react"
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useIsMobile from "../../hooks/isMobile";

export default function InvoiceForm({ item, invoice_id, mode, setIsActive, showToast }) {

    const isMobile = useIsMobile();

    const [formData, setFormData] = useState({
        senderInfo: {
            address: item ? item.senderInfo.address : "",
            city: item ? item.senderInfo.city : "",
            postCode: item ? item.senderInfo.postCode : "",
            country: item ? item.senderInfo.country : "",
        },
        clientInfo: {
            name: item ? item.clientInfo.name : "",
            email: item ? item.clientInfo.email : "",
            address: item ? item.clientInfo.address : "",
            city: item ? item.clientInfo.city : "",
            postCode: item ? item.clientInfo.postCode : "",
            country: item ? item.clientInfo.country : "",
        },
        itemInfo: item
            ? item.itemInfo
            : [
                { name: "", quantity: 1, price: 0, total: 0 }
            ],
        invoiceInfo: {
            terms: item ? item.invoiceInfo.terms : "",
            date: item ? item.invoiceInfo.date : "",
            description: item ? item.invoiceInfo.description : "",
        },
        status: ""
    });

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
            itemInfo: [...prev.itemInfo, { name: "", quantity: 1, price: 0, total: 0 }]
        }));
    };

    const removeItem = (index) => {
        const newItems = formData.itemInfo.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, itemInfo: newItems }));
    };

    const createInvoice = async (e) => {
        e.preventDefault();
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData)
        };
        try {
            const response = await fetch("http://localhost:3000/api/create/invoice", options);
            const data = await response.json();
            if (data.success) {
                setIsActive(false);
                showToast("Invoice Created succefully", "success", data.invoice.invoiceId)
            }
        } catch (error) {
            console.error(error);
        }
    };
    const updateInvoice = async (e, invoice_id) => {
        e.preventDefault();
        console.log(invoice_id);

        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData)
        }
        try {
            const response = await fetch(`http://localhost:3000/api/update/invoice/${invoice_id}`, options);
            const data = await response.json();
            if (data.success) {
                setIsActive(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={mode === 'create' ? (e) => createInvoice(e) : (e) => updateInvoice(e, invoice_id)}>
            <div className="flex flex-col gap-5 px-5 pb-24 bg-white dark:bg-[var(--custom-color-12)]">
                <div className="md:flex flex-row justify-between">
                    {mode === "edit" ?
                        <h1
                            className="font-bold dark:text-white text-2xl pb-6"
                        >
                            Edit
                            <span className="text-[#858BB2] pl-2">#</span>{item.invoiceId}</h1>
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
                            className="text-3xl text-[var(--custom-color-7)] hover:text-black transition-colors"
                        >
                            <IoMdClose />
                        </button>
                    }
                </div>
                <h2 className="text-[var(--custom-color-1)] font-semibold">Bill From</h2>
                <legend className="flex flex-col">
                    <label htmlFor="address">Street Address</label>
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
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="flex flex-row md:justify-between gap-5">
                        <legend className="flex flex-col">
                            <label htmlFor="city">City</label>
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
                            <label htmlFor="postCode">Post Code</label>
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
                    </div>
                    <div>
                        <legend className="flex flex-col">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                value={formData.senderInfo.country}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        senderInfo: { ...prev.senderInfo, country: e.target.value }
                                    }))
                                }
                            />
                        </legend>
                    </div>
                </div>
                <h2 className="text-[var(--custom-color-1)] font-semibold">Bill To</h2>
                <legend className="flex flex-col">
                    <label htmlFor="name">Client's Name</label>
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
                    <label htmlFor="email">Client's Email</label>
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
                    <label htmlFor="address">Street Address</label>
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
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex flex-row justify-between gap-5">
                        <legend className="flex flex-col">
                            <label htmlFor="city">City</label>
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
                            <label htmlFor="postCode">Post Code</label>
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
                    </div>
                    <div>
                        <legend className="flex flex-col">
                            <label htmlFor="country">Country</label>
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
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:w-full lg:gap-10">
                    <legend className="flex flex-col lg:w-full">
                        <label htmlFor="invoiceDate">Invoice Date</label>
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
                        <label htmlFor="paymentTerms">
                            Payment Terms
                        </label>
                        <select
                            id="paymentTerms"
                            value={formData.invoiceInfo.terms}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    invoiceInfo: { ...prev.invoiceInfo, terms: e.target.value }
                                }))
                            }
                            className="border rounded px-2 py-1"
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
                    <label htmlFor="description">Project Description</label>
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
                            <legend className="flex flex-col">

                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={info.name}
                                    onChange={(e) => updateItem(index, "name", e.target.value)}
                                />
                            </legend>
                            <div className="flex flex-row items-center gap-10 pt-5">
                                <div className="flex flex-row items-center gap-5">
                                    <legend className="flex flex-col">
                                        <label htmlFor="quantity">Qty</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={info.quantity}
                                            onChange={(e) => updateItem(index, "quantity", e.target.value)}
                                        />
                                    </legend>
                                    <legend className="flex flex-col">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={info.price}
                                            onChange={(e) => updateItem(index, "price", e.target.value)}
                                        />
                                    </legend>
                                    <dl className="flex flex-col">
                                        <dt className="text-[var(--custom-color-7)] dark:text-[var(--custom-color-6)] text-[13px]">Total</dt>
                                        <dd className="text-[#858BB2] font-semibold">{info.total}</dd>
                                    </dl>
                                </div>

                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-[var(--custom-color-6)]"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addItem}
                    className="bg-[#F9FAFE] text-[#858BB2] rounded-3xl py-2 font-semibold w-full mt-5"
                >
                    + Add New Item
                </button>
            </div>
            {mode === 'edit' ?
                <div className="flex flex-row justify-end gap-2 shadow-[0px_21px_85px_43px_#757575] lg:shadow-none dark:shadow-none py-5 px-5">
                    <button
                        onClick={() => setIsActive(false)}
                        type="button"
                        className="bg-[#F9FAFE] text-[var(--custom-color-7)]  hover:bg-[var(--custom-color-5)] dark:bg-[var(--custom-color-4)]
                        dark:text-[var(--custom-color-5)] dark:hover:bg-[#F9FAFE]
                        dark:hover:text-[var(--custom-color-7)] rounded-3xl px-5 py-3 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[var(--custom-color-1)] hover:bg-[var(--custom-color-2)]
                            transition-colors rounded-3xl px-6 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap"
                    >
                        Save Changes
                    </button>
                </div>
                :
                <div
                    className="flex flex-row md:justify-between gap-2 shadow-[0px_21px_85px_43px_#757575] lg:shadow-none dark:shadow-none py-5 px-5 whitespace-nowrap"
                >
                    <button
                        type="button"
                        className="bg-[#F9FAFE] text-[var(--custom-color-7)]  hover:bg-[var(--custom-color-5)] dark:bg-[var(--custom-color-4)]
                        dark:text-[var(--custom-color-5)] dark:hover:bg-[#F9FAFE]
                        dark:hover:text-[var(--custom-color-7)] rounded-3xl px-5 py-3 transition-colors"
                    >
                        Discard
                    </button>
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, status: "draft" }))}
                            className="bg-[#373B53] rounded-3xl text-[var(--custom-color-6)] hover:bg-[var(--custom-color-8)] dark:text-[var(--custom-color-5)]
                             dark:hover:bg-[var(--custom-color-3)] px-3 py-3 w-fit transition-colors"
                        >
                            Save as Draft
                        </button>
                        <button
                            onClick={() => setFormData(prev => ({ ...prev, status: "pending" }))}
                            className="bg-[var(--custom-color-1)] hover:bg-[var(--custom-color-2)]
                            transition-colors rounded-3xl px-3 lg:px-8 py-2 text-white overflow-hidden whitespace-nowrap"
                        >
                            Save & Send
                        </button>
                    </div>
                </div>
            }
        </form>
    )
}