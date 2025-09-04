import { useState } from "react"
import { FaTrash } from "react-icons/fa";

export default function InvoiceForm({ item, mode }) {

    const [formData, setFormData] = useState({
        senderInfo: {
            address: item ? item.senderAddress.street : "",
            city: item ? item.senderAddress.city : "",
            postCode: item ? item.senderAddress.postCode : "",
            country: item ? item.senderAddress.country : "",
        },
        clientInfo: {
            name: item ? item.clientName : "",
            email: item ? item.clientEmail : "",
            address: item ? item.clientAddress.address : "",
            city: item ? item.clientAddress.city : "",
            postCode: item ? item.clientAddress.postCode : "",
            country: item ? item.clientAddress.country : "",
        },
        itemInfo: item ? item.items : [],
        invoiceInfo: {
            terms: item ? item.paymentTerms : "",
            date: item ? item.createdAt : "",
            description: item ? item.description : "",
        }
    })

    return (
        <form action="">
            <div className="flex flex-col gap-5 px-5 pb-24 bg-white dark:bg-[var(--custom-color-12)]">
                {mode === "edit" ?
                    <h1
                        className="font-bold dark:text-white text-2xl pb-6"
                    >
                        Edit
                        <span className="text-[#858BB2] pl-2">#</span>{item.id}</h1>
                    :
                    <h1 className="font-bold text-2xl pb-6">
                        New Invoice
                    </h1>
                }
                <h2 className="text-[var(--custom-color-1)] font-semibold">Bill From</h2>
                <legend className="flex flex-col">
                    <label className="text-[#858BB2] text-[13px]" htmlFor="address">Street Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.senderInfo.address}
                        onChange={(e) =>
                            setFormData(prev =>
                                ({ ...prev, senderInfo: { ...prev.senderInfo, [e.target.name]: e.target.value } }))}
                    />
                </legend>
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="flex flex-row justify-between gap-5">
                        <legend className="flex flex-col">
                            <label className="text-[#858BB2] text-[13px]" htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.senderInfo.city}
                                onChange={(e) =>
                                    setFormData(prev =>
                                        ({ ...prev, senderInfo: { ...prev.senderInfo, [e.target.name]: e.target.value } }))}
                            />
                        </legend>
                        <legend className="flex flex-col">
                            <label className="text-[#858BB2] text-[13px]" htmlFor="postCode">Post Code</label>
                            <input
                                type="text"
                                name="postCode"
                                value={formData.senderInfo.postCode}
                                onChange={(e) =>
                                    setFormData(prev =>
                                        ({ ...prev, senderInfo: { ...prev.senderInfo, [e.target.name]: e.target.value } }))}
                            />
                        </legend>
                    </div>
                    <div>
                        <legend className="flex flex-col">
                            <label className="text-[#858BB2] text-[13px]" htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.senderInfo.country}
                                onChange={(e) =>
                                    setFormData(prev =>
                                        ({ ...prev, senderInfo: { ...prev.senderInfo, [e.target.name]: e.target.value } }))}
                            />
                        </legend>
                    </div>
                </div>
                <h2 className="text-[var(--custom-color-1)] font-semibold">Bill From</h2>
                <legend className="flex flex-col">
                    <label className="text-[#858BB2] text-[13px]" htmlFor="name">Client's Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.clientInfo.name}
                        onChange={(e) =>
                            setFormData(prev =>
                                ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                    />
                </legend>
                <legend className="flex flex-col">
                    <label className="text-[#858BB2] text-[13px]" htmlFor="email">Client's Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.clientInfo.email}
                        onChange={(e) =>
                            setFormData(prev =>
                                ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                    />
                </legend>
                <legend className="flex flex-col">
                    <label className="text-[#858BB2] text-[13px]" htmlFor="address">Street Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.clientInfo.address}
                        onChange={(e) =>
                            setFormData(prev =>
                                ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                    />
                </legend>
                <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex flex-row justify-between gap-5">
                        <legend className="flex flex-col">
                            <label className="text-[#858BB2] text-[13px]" htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.clientInfo.city}
                                onChange={(e) =>
                                    setFormData(prev =>
                                        ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                            />
                        </legend>
                        <legend>
                            <label className="text-[#858BB2] text-[13px]" htmlFor="postCode">Post Code</label>
                            <input
                                type="text"
                                name="postCode"
                                value={formData.clientInfo.postCode}
                                onChange={(e) =>
                                    setFormData(prev =>
                                        ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                            />
                        </legend>
                    </div>
                    <div>
                        <legend className="flex flex-col">
                            <label className="text-[#858BB2] text-[13px]" htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.clientInfo.country}
                                onChange={(e) =>
                                    setFormData(prev =>
                                        ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                            />
                        </legend>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center">
                    <legend className="flex flex-col">
                        <label className="text-[#858BB2] text-[13px]" htmlFor="invoiceDate">Invoice Date</label>
                        <input
                            type="date"
                            name="invoiceDate"
                            value={formData.invoiceInfo.date}
                            onChange={(e) =>
                                setFormData(prev =>
                                    ({ ...prev, clientInfo: { ...prev.clientInfo, [e.target.name]: e.target.value } }))}
                        />
                    </legend>
                    <legend className="flex flex-col pt-5">
                        <label className="text-[#858BB2] text-[13px]" htmlFor="paymentTerms">
                            Payment Terms
                        </label>
                        <select
                            name="terms"
                            id="paymentTerms"
                            value={formData.invoiceInfo.terms}
                            onChange={(e) =>
                                setFormData(prev =>
                                    ({ ...prev, invoiceInfo: { ...prev.invoiceInfo, [e.target.name]: e.target.value } }))}
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
                    <label className="text-[#858BB2] text-[13px]" htmlFor="description">Project Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.invoiceInfo.description}
                        onChange={(e) =>
                            setFormData(prev =>
                                ({ ...prev, invoiceInfo: { ...prev.invoiceInfo, [e.target.name]: e.target.value } }))}
                    />
                </legend>
                <h2 className="text-[#858BB2] font-semibold">Item List</h2>
                <div>
                    {formData.itemInfo.map((info, index) => (
                        <div
                            key={index}
                        >
                            <legend className="flex flex-col">

                                <label className="text-[#858BB2] text-[13px]" htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={info.name}
                                    onChange={(e) =>
                                        setFormData(prev =>
                                            ({ ...prev, itemInfo: { ...prev.invoiceInfo, [e.target.name]: e.target.value } }))}
                                />
                            </legend>
                            <div className="flex flex-row items-center gap-10 pt-5">
                                <div className="flex flex-row items-center gap-5">
                                    <legend className="flex flex-col">
                                        <label className="text-[#858BB2] text-[13px]" htmlFor="quantity">Qty</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={info.quantity}
                                            onChange={(e) =>
                                                setFormData(prev =>
                                                    ({ ...prev, itemInfo: { ...prev.invoiceInfo, [e.target.name]: e.target.value } }))}
                                        />
                                    </legend>
                                    <legend className="flex flex-col">
                                        <label className="text-[#858BB2] text-[13px]" htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={info.price}
                                            onChange={(e) =>
                                                setFormData(prev =>
                                                    ({ ...prev, itemInfo: { ...prev.invoiceInfo, [e.target.name]: e.target.value } }))}
                                        />
                                    </legend>
                                    <dl className="flex flex-col">
                                        <dt className="text-[#858BB2] text-[13px]">Total</dt>
                                        <dd className="text-[#858BB2] font-semibold">{info.total}</dd>
                                    </dl>
                                </div>

                                <button className="text-[var(--custom-color-6)]">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="bg-[#F9FAFE] text-[#858BB2] rounded-3xl py-2 font-semibold w-full mt-5"
                >
                    + Add New Item
                </button>
            </div>
            {mode === 'edit' ?
                <div className="flex flex-row justify-end shadow-[0px_21px_85px_43px_#757575] dark:shadow-none py-5 px-5">
                    <button
                        className="bg-[#F9FAFE] text-[var(--custom-color-7)] rounded-3xl px-8 py-3"

                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[var(--custom-color-1)] rounded-3xl px-5 py-2 text-white"
                    >
                        Save Changes
                    </button>
                </div>
                :
                <div
                    className="flex flex-row justify-center gap-2 shadow-[0px_21px_85px_43px_#757575] py-5 px-5 whitespace-nowrap"
                >
                    <button
                        className="bg-[#F9FAFE] text-[var(--custom-color-7)] rounded-3xl px-5 py-3 w-fit"

                    >
                        Discard
                    </button>
                    <button
                        className="bg-[#373B53] rounded-3xl text-[var(--custom-color-6)] px-5 py-3 w-fit"
                    >
                        Save as Draft
                    </button>
                    <button
                        className="bg-[var(--custom-color-1)] rounded-3xl text-white px-5 py-3 w-fit"
                    >
                        Save & Send
                    </button>
                </div>
            }
        </form>
    )
}